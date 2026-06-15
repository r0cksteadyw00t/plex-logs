param(
  [ValidateSet("Status", "ApplyHostsBlock", "RollbackHostsBlock")]
  [string]$Mode = "Status",
  [string]$PublicRoot = "D:\PlexTools\public\latest\scarflix_v2",
  [string]$StateRoot = "D:\PlexTools\state\jasonos_prime\iptv\cutover_ready",
  [string]$BackupRoot = "D:\PlexTools\Backups",
  [string]$HostsPath = "C:\Windows\System32\drivers\etc\hosts"
)

$ErrorActionPreference = "Stop"

$markerBegin = "# JASONOS_MISSION002_PLEX_ONLINE_CHANNELS_BLOCK_BEGIN"
$markerEnd = "# JASONOS_MISSION002_PLEX_ONLINE_CHANNELS_BLOCK_END"
$blockedHosts = @("epg.provider.plex.tv")

function Ensure-Dir {
  param([string]$Path)
  if (![string]::IsNullOrWhiteSpace($Path) -and !(Test-Path -LiteralPath $Path)) {
    New-Item -ItemType Directory -Path $Path -Force | Out-Null
  }
}

function Write-Json {
  param($Object, [string]$Path)
  $json = $Object | ConvertTo-Json -Depth 20
  $enc = New-Object System.Text.UTF8Encoding($false)
  [IO.File]::WriteAllText($Path, $json, $enc)
}

function Write-Text {
  param([string]$Text, [string]$Path)
  $enc = New-Object System.Text.UTF8Encoding($false)
  [IO.File]::WriteAllText($Path, $Text, $enc)
}

function Test-HostsWriteAccess {
  param([string]$Path)
  try {
    $fs = [IO.File]::Open($Path, [IO.FileMode]::Open, [IO.FileAccess]::ReadWrite, [IO.FileShare]::ReadWrite)
    $fs.Close()
    return [ordered]@{ ok = $true; error = "" }
  } catch {
    return [ordered]@{ ok = $false; error = $_.Exception.Message }
  }
}

function Get-HostsBlockState {
  param([string]$Path)
  $exists = Test-Path -LiteralPath $Path
  $text = ""
  if ($exists) {
    try { $text = [IO.File]::ReadAllText($Path) } catch { $text = "" }
  }
  $hasMarker = $false
  if ($text.Contains($markerBegin) -and $text.Contains($markerEnd)) {
    $hasMarker = $true
  }
  return [ordered]@{
    exists = $exists
    has_mission002_marker = $hasMarker
    blocks = @($blockedHosts)
  }
}

function Remove-HostsBlockText {
  param([string]$Text)
  $escapedBegin = [regex]::Escape($markerBegin)
  $escapedEnd = [regex]::Escape($markerEnd)
  $pattern = "(?ms)`r?`n?$escapedBegin.*?$escapedEnd`r?`n?"
  return [regex]::Replace($Text, $pattern, "`r`n").TrimEnd() + "`r`n"
}

function New-HostsBlockText {
  $lines = New-Object System.Collections.ArrayList
  [void]$lines.Add($markerBegin)
  foreach ($name in $blockedHosts) {
    [void]$lines.Add(("0.0.0.0 {0}" -f $name))
    [void]$lines.Add(("::1 {0}" -f $name))
  }
  [void]$lines.Add($markerEnd)
  return ($lines.ToArray() -join "`r`n")
}

function Flush-Dns {
  try {
    $output = & ipconfig /flushdns 2>&1
    return [ordered]@{ ok = $true; output = (($output | Out-String).Trim()) }
  } catch {
    return [ordered]@{ ok = $false; output = $_.Exception.Message }
  }
}

function Test-ProviderEndpoint {
  param([string]$HostName)
  $dns = New-Object System.Collections.ArrayList
  try {
    $records = Resolve-DnsName -Name $HostName -ErrorAction Stop | Select-Object -First 10
    foreach ($record in $records) {
      [void]$dns.Add([ordered]@{
        name = "" + $record.Name
        type = "" + $record.Type
        ip_address = "" + $record.IPAddress
        name_host = "" + $record.NameHost
      })
    }
  } catch {
    [void]$dns.Add([ordered]@{ error = $_.Exception.Message })
  }

  $httpStatus = 0
  $httpOk = $false
  $httpError = ""
  $httpOutput = ""
  $curl = "curl.exe"
  try {
    $curlOutput = & $curl --silent --show-error --noproxy "*" -I --connect-timeout 5 --max-time 8 ("https://{0}/" -f $HostName) 2>&1
    $httpOutput = (($curlOutput | Out-String).Trim())
    foreach ($line in $curlOutput) {
      $lineText = "" + $line
      if ($lineText -match "^HTTP/\S+\s+(\d+)") {
        $httpStatus = [int]$matches[1]
        $httpOk = $true
        break
      }
    }
    if (!$httpOk -and $LASTEXITCODE -ne 0) {
      $httpError = "curl exit code " + $LASTEXITCODE
      if ($httpOutput.Length -gt 0) {
        $httpError = $httpError + ": " + $httpOutput
      }
    }
  } catch {
    $httpError = $_.Exception.Message
  }

  return [ordered]@{
    host = $HostName
    dns = @($dns.ToArray())
    http_ok = $httpOk
    http_status = $httpStatus
    http_error = $httpError
    http_probe = "curl_no_proxy_head"
    http_output_excerpt = $(if ($httpOutput.Length -gt 500) { $httpOutput.Substring(0, 500) } else { $httpOutput })
  }
}

function Read-ExistingJson {
  param([string]$Path)
  if (!(Test-Path -LiteralPath $Path)) {
    return $null
  }
  try {
    return ([IO.File]::ReadAllText($Path) | ConvertFrom-Json)
  } catch {
    return $null
  }
}

Ensure-Dir $PublicRoot
Ensure-Dir $StateRoot
Ensure-Dir $BackupRoot

$updatedUtc = (Get-Date).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ")
$statusJson = Join-Path $PublicRoot "mission002_plex_online_channels_suppression_status.json"
$statusMd = Join-Path $PublicRoot "mission002_plex_online_channels_suppression_status.md"
$stateJson = Join-Path $StateRoot "mission002_plex_online_channels_suppression_status.json"
$stateMd = Join-Path $StateRoot "mission002_plex_online_channels_suppression_status.md"
$onlineSourceStatus = Read-ExistingJson (Join-Path $PublicRoot "mission002_plex_online_sources_curated_only_status.json")
$threadfinStatus = Read-ExistingJson (Join-Path $PublicRoot "mission002_iptv_cutover_verify_status.json")

$actions = New-Object System.Collections.ArrayList
$errors = New-Object System.Collections.ArrayList
$backupPath = ""
$preProbe = Test-ProviderEndpoint "epg.provider.plex.tv"
$writeAccess = Test-HostsWriteAccess $HostsPath
$statusValue = "REVIEW_STATUS_ONLY"

try {
  if ($Mode -eq "ApplyHostsBlock") {
    if (!$writeAccess.ok) {
      $statusValue = "BLOCKED_ADMIN_REQUIRED"
      [void]$errors.Add("Hosts file is not writable: " + $writeAccess.error)
    } else {
      $stamp = (Get-Date).ToUniversalTime().ToString("yyyyMMddTHHmmssZ")
      $backupDir = Join-Path $BackupRoot ("mission002_plex_online_channels_suppression_" + $stamp)
      Ensure-Dir $backupDir
      $backupPath = Join-Path $backupDir "hosts.bak"
      Copy-Item -LiteralPath $HostsPath -Destination $backupPath -Force
      [void]$actions.Add("Backed up hosts file to " + $backupPath)

      $text = [IO.File]::ReadAllText($HostsPath)
      $text = Remove-HostsBlockText $text
      $block = New-HostsBlockText
      $newText = $text.TrimEnd() + "`r`n`r`n" + $block + "`r`n"
      Write-Text $newText $HostsPath
      [void]$actions.Add("Applied reversible hosts block for epg.provider.plex.tv only.")
      $flush = Flush-Dns
      [void]$actions.Add("DNS flush ok=" + $flush.ok)
      $statusValue = "PASS_HOSTS_BLOCK_APPLIED_PROVIDER_ENDPOINT_SUPPRESSED"
    }
  } elseif ($Mode -eq "RollbackHostsBlock") {
    if (!$writeAccess.ok) {
      $statusValue = "BLOCKED_ADMIN_REQUIRED"
      [void]$errors.Add("Hosts file is not writable: " + $writeAccess.error)
    } else {
      $stampRollback = (Get-Date).ToUniversalTime().ToString("yyyyMMddTHHmmssZ")
      $rollbackBackupDir = Join-Path $BackupRoot ("mission002_plex_online_channels_suppression_rollback_" + $stampRollback)
      Ensure-Dir $rollbackBackupDir
      $backupPath = Join-Path $rollbackBackupDir "hosts.before_rollback.bak"
      Copy-Item -LiteralPath $HostsPath -Destination $backupPath -Force
      $rollbackText = [IO.File]::ReadAllText($HostsPath)
      $rollbackText = Remove-HostsBlockText $rollbackText
      Write-Text $rollbackText $HostsPath
      [void]$actions.Add("Removed Mission 2 hosts block marker.")
      $flushRollback = Flush-Dns
      [void]$actions.Add("DNS flush ok=" + $flushRollback.ok)
      $statusValue = "PASS_HOSTS_BLOCK_ROLLED_BACK"
    }
  } else {
    $statusValue = "PASS_STATUS_CAPTURED"
  }
} catch {
  $statusValue = "FAIL_SUPPRESSION_EXCEPTION"
  [void]$errors.Add($_.Exception.Message)
}

$postProbe = Test-ProviderEndpoint "epg.provider.plex.tv"
$hostsState = Get-HostsBlockState $HostsPath
if ([string]::IsNullOrWhiteSpace($backupPath) -and $hostsState.has_mission002_marker) {
  try {
    $latestBackup = Get-ChildItem -LiteralPath $BackupRoot -Directory -Filter "mission002_plex_online_channels_suppression_*" -ErrorAction SilentlyContinue |
      Sort-Object LastWriteTime -Descending |
      Select-Object -First 1
    if ($null -ne $latestBackup) {
      $candidateBackup = Join-Path $latestBackup.FullName "hosts.bak"
      if (Test-Path -LiteralPath $candidateBackup) {
        $backupPath = $candidateBackup
      }
    }
  } catch {}
}

$onlineStatusValue = ""
if ($null -ne $onlineSourceStatus -and $onlineSourceStatus.status) {
  $onlineStatusValue = "" + $onlineSourceStatus.status
}
$threadfinStatusValue = ""
$threadfinChannels = 0
if ($null -ne $threadfinStatus) {
  if ($threadfinStatus.status) { $threadfinStatusValue = "" + $threadfinStatus.status }
  if ($threadfinStatus.lineup -and $threadfinStatus.lineup.channel_count) { $threadfinChannels = [int]$threadfinStatus.lineup.channel_count }
}

$status = [ordered]@{
  component = "jasonos_mission002_plex_online_channels_suppression"
  schema_version = "jasonos.iptv.plex_online_channels_suppression.v1"
  status = $statusValue
  updated_utc = $updatedUtc
  mode = $Mode
  intent = "Suppress Plex-owned free Live TV provider surface so the Live TV outcome is the curated Mission 2 IPTV/Threadfin source only."
  safety = [ordered]@{
    iptv_only = $true
    physical_tuner_used = $false
    touches_plex_server_database = $false
    restarts_plex = $false
    blocks_metadata_provider = $false
    blocks_sign_in_or_account_domains = $false
    reversible = $true
  }
  official_account_opt_out_status = $onlineStatusValue
  threadfin_status = $threadfinStatusValue
  threadfin_channel_count = $threadfinChannels
  hosts = $hostsState
  pre_probe = $preProbe
  post_probe = $postProbe
  write_access = $writeAccess
  backup_path = $backupPath
  actions = @($actions.ToArray())
  errors = @($errors.ToArray())
  limitation = "This local suppression blocks the Plex free-live-TV provider endpoint on this Windows/Plex host. Plex's official durable fix is still account-level Online Media Sources disablement; other client devices may need account opt-out or local/network DNS enforcement if they fetch Plex online channels directly."
  rollback = "Run this script with -Mode RollbackHostsBlock or restore the recorded hosts backup."
  next_safe_action = "Relaunch Plex clients and verify Live TV source list. If Plex Channels still appears on a non-Windows client, apply account-level Online Media Sources opt-out with a valid Plex account session or enforce this hostname block at the router/DNS level."
}

Write-Json $status $statusJson
Write-Json $status $stateJson

$actionLines = @()
foreach ($action in @($actions.ToArray())) { $actionLines += "- $action" }
if (@($actionLines).Count -eq 0) { $actionLines += "- none" }

$errorLines = @()
foreach ($errorItem in @($errors.ToArray())) { $errorLines += "- $errorItem" }
if (@($errorLines).Count -eq 0) { $errorLines += "- none" }

$md = @"
# Mission 2 Plex Online Channels Suppression Status

**Updated UTC:** $updatedUtc  
**Status:** $statusValue  
**Mode:** $Mode

## Intended User Outcome

Plex Live TV should show the curated Mission 2 IPTV/Threadfin source only, not Plex-owned default/free channels.

## Current Evidence

- Official account opt-out worker: $onlineStatusValue
- Threadfin status: $threadfinStatusValue
- Threadfin curated channel count: $threadfinChannels
- Hosts marker installed: $($hostsState.has_mission002_marker)
- Blocked endpoint: epg.provider.plex.tv

## Safety

- IPTV only: true
- Physical tuner used: false
- Plex server database touched: false
- Plex restarted: false
- Metadata provider blocked: false
- Sign-in/account domains blocked: false
- Reversible: true

## Actions

$($actionLines -join "`r`n")

## Errors

$($errorLines -join "`r`n")

## Limitation

$($status.limitation)

## Rollback

$($status.rollback)

## Next Safe Action

$($status.next_safe_action)
"@

Write-Text $md $statusMd
Write-Text $md $stateMd

Write-Output ("STATUS={0}" -f $statusValue)
if ($statusValue -like "FAIL*") { exit 2 }
if ($statusValue -like "BLOCKED*") { exit 3 }
exit 0
