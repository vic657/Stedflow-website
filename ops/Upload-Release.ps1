$ErrorActionPreference = 'Stop'
$ProgressPreference = 'SilentlyContinue'
$taskRoot = Split-Path -Parent $PSScriptRoot
$apkPath = Join-Path $taskRoot '.release/stedflo-1.0.0.apk'
$expectedHash = '4c9f975ac05d8ae510b71b3f08f0b7c6473bc2a5afcabf81bd1d6a9ed90fbe02'
if ((Get-FileHash -LiteralPath $apkPath -Algorithm SHA256).Hash.ToLowerInvariant() -ne $expectedHash) { throw 'The staged APK changed; upload refused.' }
$tokenJson = $null
$tokenData = $null
$uploadHeaders = $null
try {
    $tokenJson = (& npx.cmd --yes wrangler@4.163.0 auth token --json 2>$null | Out-String)
    if ($LASTEXITCODE -ne 0) { throw 'Existing Cloudflare credentials could not be read.' }
    try { $tokenData = $tokenJson | ConvertFrom-Json -AsHashtable } catch { throw 'Unexpected credential response.' }
    $uploadToken = $tokenData['token']
    if ($uploadToken -isnot [string] -or $uploadToken.Length -lt 20) { throw 'Cloudflare token unavailable.' }
    $uploadHeaders = @{
        Authorization = 'Bearer ' + $uploadToken
        'Content-Disposition' = 'attachment; filename="stedflo-1.0.0.apk"'
        'Cache-Control' = 'public, max-age=31536000, immutable'
        'cf-r2-data-catalog-check' = 'true'
    }
    $uploadUrl = 'https://api.cloudflare.com/client/v4/accounts/2b5bc38315d20c292cc30abf248225c2/r2/buckets/stedflo-releases/objects/android/1.0.0/' + $expectedHash + '/stedflo-1.0.0.apk'
    Write-Output 'Uploading the verified APK using the same R2 PUT endpoint as Wrangler.'
    $response = Invoke-WebRequest -Uri $uploadUrl -Method Put -InFile $apkPath -Headers $uploadHeaders -ContentType 'application/vnd.android.package-archive' -TimeoutSec 600 -SkipHttpErrorCheck
    Write-Output ('R2 upload HTTP ' + $response.StatusCode)
    if ($response.StatusCode -lt 200 -or $response.StatusCode -ge 300) { throw ('R2 upload failed, HTTP ' + $response.StatusCode) }
    Write-Output 'Upload accepted. Verify the complete download before connecting the domain.'
} finally {
    $uploadToken = $null
    $tokenJson = $null
    $tokenData = $null
    if ($uploadHeaders) { $uploadHeaders.Clear() }
}
