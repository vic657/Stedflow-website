param(
    [Parameter(Mandatory=$true)][ValidateSet('GET','POST','PATCH','PUT')][string]$Method,
    [Parameter(Mandatory=$true)][string]$ApiPath,
    [string]$BodyFile,
    [string]$OutputFile = '.release/cloudflare-result.json'
)
$ErrorActionPreference = 'Stop'
$ProgressPreference = 'SilentlyContinue'
$taskRoot = Split-Path -Parent $PSScriptRoot
$outputRoot = [System.IO.Path]::GetFullPath((Join-Path $taskRoot '.release'))
$outputTarget = [System.IO.Path]::GetFullPath((Join-Path $taskRoot $OutputFile))
if (-not $outputTarget.StartsWith($outputRoot + [System.IO.Path]::DirectorySeparatorChar, [System.StringComparison]::OrdinalIgnoreCase)) { throw 'Output must stay in the ignored .release directory.' }
if (-not $ApiPath.StartsWith('/') -or $ApiPath.StartsWith('//') -or $ApiPath.Contains('#')) { throw 'Invalid Cloudflare API path.' }

function Protect-Response($node) {
    if ($node -is [System.Collections.IDictionary]) {
        foreach ($key in @($node.Keys)) {
            if ($key -match '^(env_vars|token|api_token|api_key|secret|password|authorization|private_key)$') {
                $node[$key] = '[redacted]'
            } else {
                Protect-Response $node[$key]
            }
        }
    } elseif ($node -is [System.Collections.IEnumerable] -and $node -isnot [string]) {
        foreach ($item in $node) { Protect-Response $item }
    }
}

$credentialJson = $null
$credential = $null
$authHeaders = $null
try {
    # stdout is captured in memory; never print or persist the credential object.
    $credentialJson = (& npx.cmd --yes wrangler@4.163.0 auth token --json 2>$null | Out-String)
    if ($LASTEXITCODE -ne 0) { throw 'Cloudflare login is unavailable.' }
    try { $credential = $credentialJson | ConvertFrom-Json -AsHashtable } catch { throw 'Could not read the Cloudflare login safely.' }
    $accessToken = $credential['token']
    if (-not ($accessToken -is [string]) -or $accessToken.Length -lt 20) {
        throw ('Unexpected credential format. Field names only: ' + ($credential.Keys -join ', '))
    }
    $authHeaders = @{ Authorization = 'Bearer ' + $accessToken }
    $requestArguments = @{
        Uri = 'https://api.cloudflare.com/client/v4' + $ApiPath
        Method = $Method
        Headers = $authHeaders
        SkipHttpErrorCheck = $true
        TimeoutSec = 60
    }
    if ($BodyFile) {
        $requestArguments['ContentType'] = 'application/json'
        $requestArguments['Body'] = Get-Content -LiteralPath $BodyFile -Raw
    }
    $httpResponse = Invoke-WebRequest @requestArguments
    try { $apiResponse = $httpResponse.Content | ConvertFrom-Json -AsHashtable } catch { throw ('Cloudflare returned a non-JSON response, HTTP ' + $httpResponse.StatusCode) }
    Protect-Response $apiResponse
    $apiResponse | ConvertTo-Json -Depth 60 | Set-Content -LiteralPath $outputTarget -Encoding utf8
    Write-Output ('Cloudflare ' + $Method + ' ' + $ApiPath + ': HTTP ' + $httpResponse.StatusCode + ', success=' + $apiResponse['success'])
    Write-Output ('Sanitized response saved to ' + $outputTarget)
    if (-not $apiResponse['success']) {
        foreach ($apiError in $apiResponse['errors']) {
            Write-Output ('Cloudflare error ' + $apiError['code'] + ': ' + $apiError['message'])
        }
        exit 1
    }
} finally {
    $accessToken = $null
    $credentialJson = $null
    $credential = $null
    if ($authHeaders) { $authHeaders.Clear() }
}
