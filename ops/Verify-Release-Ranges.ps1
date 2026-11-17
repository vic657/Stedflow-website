param([Parameter(Mandatory=$true)][string]$BaseUrl)
$ErrorActionPreference = 'Stop'
$ProgressPreference = 'SilentlyContinue'
$taskRoot = Split-Path -Parent $PSScriptRoot
$origin = [Uri]$BaseUrl
if ($origin.Scheme -ne 'https' -or ($origin.Host -ne 'stedflo.com' -and $origin.Host -notmatch '^(?:[a-z0-9-]+\.)?stedflo\.pages\.dev$')) { throw 'Unexpected release origin.' }
$releaseUrl = $BaseUrl.TrimEnd('/') + '/downloads/stedflo-1.0.0-4c9f975ac05d.apk'
$expectedSize = 40054269
$expectedHash = '4c9f975ac05d8ae510b71b3f08f0b7c6473bc2a5afcabf81bd1d6a9ed90fbe02'
$sourcePath = Join-Path $taskRoot '.release/stedflo-1.0.0.apk'
if ((Get-FileHash -LiteralPath $sourcePath -Algorithm SHA256).Hash.ToLowerInvariant() -ne $expectedHash) { throw 'Source APK changed.' }
$chunkSize = 1048576
$partCount = [int][Math]::Ceiling($expectedSize / $chunkSize)
$partsDirectory = Join-Path $taskRoot ('.release/verify-parts-' + $origin.Host)
[void](New-Item -ItemType Directory -Path $partsDirectory -Force)
$specifications = @()
$sourceStream = [System.IO.File]::OpenRead($sourcePath)
try {
    for ($part=0; $part -lt $partCount; $part++) {
        $offset = [long]$part * $chunkSize
        $length = [int][Math]::Min($chunkSize, $expectedSize-$offset)
        $buffer = [byte[]]::new($length)
        $read = $sourceStream.Read($buffer,0,$length)
        if ($read -ne $length) { throw 'Could not read source APK.' }
        $partHash = [Convert]::ToHexString([System.Security.Cryptography.SHA256]::HashData($buffer)).ToLowerInvariant()
        $specifications += [pscustomobject]@{Part=$part; Offset=$offset; Length=$length; Hash=$partHash}
    }
} finally { $sourceStream.Dispose() }
Write-Output ('Verifying all ' + $expectedSize + ' APK bytes in ' + $partCount + ' resumable parts; reusing only checksum-verified parts.')
$partResults = $specifications | ForEach-Object -Parallel {
    $ErrorActionPreference = 'Stop'
    $ProgressPreference = 'SilentlyContinue'
    $spec = $_
    $partPath = Join-Path $using:partsDirectory ('part-' + $spec.Part.ToString('D3') + '.bin')
    $valid = $false
    if (Test-Path -LiteralPath $partPath) {
        $valid = (Get-Item -LiteralPath $partPath).Length -eq $spec.Length -and (Get-FileHash -LiteralPath $partPath -Algorithm SHA256).Hash.ToLowerInvariant() -eq $spec.Hash
    }
    for ($attempt=1; -not $valid -and $attempt -le 4; $attempt++) {
        try {
            $end = $spec.Offset + $spec.Length - 1
            $result = Invoke-WebRequest -Uri $using:releaseUrl -Headers @{Range=('bytes=' + $spec.Offset + '-' + $end)} -OutFile $partPath -PassThru -DisableKeepAlive -TimeoutSec 60
            if ($result.StatusCode -ne 206 -or (Get-Item -LiteralPath $partPath).Length -ne $spec.Length) { throw 'Incomplete range.' }
            $valid = (Get-FileHash -LiteralPath $partPath -Algorithm SHA256).Hash.ToLowerInvariant() -eq $spec.Hash
            if (-not $valid) { throw 'Range checksum mismatch.' }
        } catch {
            if ($attempt -eq 4) { throw ('Could not verify part ' + $spec.Part + ' after bounded retries.') }
            Start-Sleep -Seconds 2
        }
    }
    Write-Host ('Verified part ' + ($spec.Part+1) + '/39')
    [pscustomobject]@{Part=$spec.Part; Bytes=$spec.Length}
} -ThrottleLimit 2
if (@($partResults).Count -ne $partCount) { throw 'Some download ranges failed.' }
$completePath = Join-Path $taskRoot ('.release/verified-resumed-' + $origin.Host + '.apk')
$completeStream = [System.IO.File]::Create($completePath)
try {
    for ($part=0; $part -lt $partCount; $part++) {
        $partStream = [System.IO.File]::OpenRead((Join-Path $partsDirectory ('part-' + $part.ToString('D3') + '.bin')))
        try { $partStream.CopyTo($completeStream) } finally { $partStream.Dispose() }
    }
} finally { $completeStream.Dispose() }
$actualSize = (Get-Item -LiteralPath $completePath).Length
$actualHash = (Get-FileHash -LiteralPath $completePath -Algorithm SHA256).Hash.ToLowerInvariant()
if ($actualSize -ne $expectedSize -or $actualHash -ne $expectedHash) { throw 'Remote APK integrity check failed.' }
Write-Output ('PASS: all ' + $actualSize + ' bytes downloaded; SHA-256 matches the verified signed APK.')
$head = Invoke-WebRequest -Uri $releaseUrl -Method Head -TimeoutSec 30
if (($head.Headers['X-Checksum-SHA256'] -join '') -ne $actualHash -or ($head.Headers['X-Content-Type-Options'] -join '') -ne 'nosniff') { throw 'Download metadata/security headers missing.' }
$unknown = Invoke-WebRequest -Uri ($BaseUrl.TrimEnd('/') + '/downloads/private.key') -SkipHttpErrorCheck -TimeoutSec 30
if ($unknown.StatusCode -ne 404) { throw 'Unknown file was not rejected.' }
$unsupported = Invoke-WebRequest -Uri $releaseUrl -Method Options -SkipHttpErrorCheck -TimeoutSec 30
if ($unsupported.StatusCode -ne 405) { throw 'Unsupported method was not rejected.' }
$homepageResponse = Invoke-WebRequest -Uri $BaseUrl -Method Head -TimeoutSec 30
if (-not $homepageResponse.Headers['Content-Security-Policy'] -or -not $homepageResponse.Headers['Strict-Transport-Security']) { throw 'Website security headers missing.' }
Write-Output 'PASS: HEAD metadata, resumable ranges, rejected filenames/methods, CSP, HSTS, and nosniff.'
