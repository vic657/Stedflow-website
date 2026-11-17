param([Parameter(Mandatory=$true)][string]$BaseUrl)
$ErrorActionPreference = 'Stop'
$ProgressPreference = 'SilentlyContinue'
$taskRoot = Split-Path -Parent $PSScriptRoot
$base = [Uri]$BaseUrl
if ($base.Scheme -ne 'https' -or ($base.Host -ne 'stedflo.com' -and $base.Host -notmatch '^(?:[a-z0-9-]+\.)?stedflo\.pages\.dev$')) { throw 'Unexpected release origin.' }
$downloadPath = '/downloads/stedflo-1.0.0-4c9f975ac05d.apk'
$expectedHash = '4c9f975ac05d8ae510b71b3f08f0b7c6473bc2a5afcabf81bd1d6a9ed90fbe02'
$downloadUrl = $BaseUrl.TrimEnd('/') + $downloadPath
$head = Invoke-WebRequest -Uri $downloadUrl -Method Head -SkipHttpErrorCheck -TimeoutSec 45
Write-Output ('Download HEAD HTTP ' + $head.StatusCode)
if ($head.StatusCode -ne 200) { throw 'The remote release is not ready.' }
if (($head.Headers['X-Checksum-SHA256'] -join '') -ne $expectedHash) { throw 'Checksum header does not match.' }
if (($head.Headers['X-Content-Type-Options'] -join '') -ne 'nosniff') { throw 'Missing download security header.' }
$downloadedFile = Join-Path $taskRoot ('.release/verified-' + $base.Host + '.apk')
$response = Invoke-WebRequest -Uri $downloadUrl -OutFile $downloadedFile -PassThru -TimeoutSec 600
if ($response.StatusCode -ne 200) { throw 'APK download failed.' }
$size = (Get-Item -LiteralPath $downloadedFile).Length
$hash = (Get-FileHash -LiteralPath $downloadedFile -Algorithm SHA256).Hash.ToLowerInvariant()
if ($size -ne 40054269 -or $hash -ne $expectedHash) { throw 'Downloaded APK failed integrity verification.' }
Write-Output ('Complete APK verified: ' + $size + ' bytes; SHA-256 matches.')
$rangeFile = Join-Path $taskRoot '.release/range-check.bin'
$range = Invoke-WebRequest -Uri $downloadUrl -Headers @{Range='bytes=0-15'} -OutFile $rangeFile -PassThru -TimeoutSec 45
if ($range.StatusCode -ne 206 -or (Get-Item -LiteralPath $rangeFile).Length -ne 16) { throw 'Resumable download verification failed.' }
Write-Output 'Range request verified: HTTP 206, 16 bytes.'
$missing = Invoke-WebRequest -Uri ($BaseUrl.TrimEnd('/') + '/downloads/private.key') -SkipHttpErrorCheck -TimeoutSec 45
if ($missing.StatusCode -ne 404) { throw 'Unknown files are not rejected.' }
$method = Invoke-WebRequest -Uri $downloadUrl -Method Options -SkipHttpErrorCheck -TimeoutSec 45
if ($method.StatusCode -ne 405) { throw 'Unexpected request methods are not rejected.' }
$homepageResponse = Invoke-WebRequest -Uri $BaseUrl -Method Head -TimeoutSec 45
if (-not $homepageResponse.Headers['Content-Security-Policy'] -or -not $homepageResponse.Headers['Strict-Transport-Security']) { throw 'Site security headers missing.' }
Write-Output 'Unknown file: HTTP 404. Unsupported method: HTTP 405. Site security headers present.'
