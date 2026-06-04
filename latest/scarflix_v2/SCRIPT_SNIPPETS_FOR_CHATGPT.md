ScarFLIX v2 script snippets for ChatGPT.

Generated: 2026-06-04 14:50:02
No Codex. No restart. No catalogue change. No expansion.

## D:\PlexTools\Scripts\scarflix_v2\Enable_qBit_Fallback_When_RD_Free.ps1
``text
5: try { [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12 } catch {}
6: 
7: $StartTime = Get-Date
8: $Failures = New-Object System.Collections.ArrayList
9: $Warnings = New-Object System.Collections.ArrayList
10: $FinalStatus = "REVIEW"
11: 
12: $LogsRoot = "D:\PlexTools\logs"
13: $TokenRoot = "C:\Users\jason\OneDrive\Public\TOKENS"
---
7: $StartTime = Get-Date
8: $Failures = New-Object System.Collections.ArrayList
9: $Warnings = New-Object System.Collections.ArrayList
10: $FinalStatus = "REVIEW"
11: 
12: $LogsRoot = "D:\PlexTools\logs"
13: $TokenRoot = "C:\Users\jason\OneDrive\Public\TOKENS"
14: $QbTokenPath = Join-Path $TokenRoot "qbittorrent.json"
15: $RdTokenPath = Join-Path $TokenRoot "rd_token.txt"
---
44:   try { Add-Content -LiteralPath $LogPath -Value $line -Encoding UTF8 } catch {}
45: }
46: 
47: function Add-Failure {
48:   param([string]$Message)
49:   [void]$Failures.Add($Message)
50:   Write-Step $Message "FAIL"
51: }
52: 
---
46: 
47: function Add-Failure {
48:   param([string]$Message)
49:   [void]$Failures.Add($Message)
50:   Write-Step $Message "FAIL"
51: }
52: 
53: function Add-Warning {
54:   param([string]$Message)
---
47: function Add-Failure {
48:   param([string]$Message)
49:   [void]$Failures.Add($Message)
50:   Write-Step $Message "FAIL"
51: }
52: 
53: function Add-Warning {
54:   param([string]$Message)
55:   [void]$Warnings.Add($Message)
---
87:   $headers = @{ "X-Api-Key" = $ApiKey [REDACTED]
88:   $uri = $BaseUrl.TrimEnd("/") + $Path
89:   if ($null -eq $Body) {
90:     return Invoke-RestMethod -Uri $uri -Headers $headers -Method $Method -UseBasicParsing -TimeoutSec 20 -ErrorAction Stop
91:   }
92:   $json = $Body | ConvertTo-Json -Depth 20
93:   return Invoke-RestMethod -Uri $uri -Headers $headers -Method $Method -Body $json -ContentType "application/json" -UseBasicParsing -TimeoutSec 20 -ErrorAction Stop
94: }
95: 
---
90:     return Invoke-RestMethod -Uri $uri -Headers $headers -Method $Method -UseBasicParsing -TimeoutSec 20 -ErrorAction Stop
91:   }
92:   $json = $Body | ConvertTo-Json -Depth 20
93:   return Invoke-RestMethod -Uri $uri -Headers $headers -Method $Method -Body $json -ContentType "application/json" -UseBasicParsing -TimeoutSec 20 -ErrorAction Stop
94: }
95: 
96: function Set-Field {
97:   param([object]$Client, [string]$Name, [object]$Value)
98:   $field = $Client.fields | Where-Object { $_.name -eq $Name } | Select-Object -First 1
---
118:   $base = $BaseUrl.TrimEnd("/")
119:   $catsRaw = "{}"
120:   try {
121:     $catsRaw = (Invoke-WebRequest -Uri ($base + "/api/v2/torrents/categories") -WebSession $Session -UseBasicParsing -TimeoutSec 10 -ErrorAction Stop).Content
122:   } catch {
123:     Add-Warning ("Could not read qBittorrent categories before setting {0}" -f $Category)
124:   }
125:   $exists = $false
126:   try {
---
129:   } catch {}
130:   $body = "category={0}&savePath={1}" -f [Uri]::EscapeDataString($Category), [Uri]::EscapeDataString($SavePath)
131:   if ($exists) {
132:     Invoke-WebRequest -Uri ($base + "/api/v2/torrents/editCategory") -Method Post -Body $body -ContentType "application/x-www-form-urlencoded" -WebSession $Session -UseBasicParsing -TimeoutSec 10 -ErrorAction Stop | Out-Null
133:     Write-Step ("qBittorrent category updated: {0}" -f $Category) "OK"
134:   } else {
135:     Invoke-WebRequest -Uri ($base + "/api/v2/torrents/createCategory") -Method Post -Body $body -ContentType "application/x-www-form-urlencoded" -WebSession $Session -UseBasicParsing -TimeoutSec 10 -ErrorAction Stop | Out-Null
136:     Write-Step ("qBittorrent category created: {0}" -f $Category) "OK"
137:   }
---
132:     Invoke-WebRequest -Uri ($base + "/api/v2/torrents/editCategory") -Method Post -Body $body -ContentType "application/x-www-form-urlencoded" -WebSession $Session -UseBasicParsing -TimeoutSec 10 -ErrorAction Stop | Out-Null
133:     Write-Step ("qBittorrent category updated: {0}" -f $Category) "OK"
134:   } else {
135:     Invoke-WebRequest -Uri ($base + "/api/v2/torrents/createCategory") -Method Post -Body $body -ContentType "application/x-www-form-urlencoded" -WebSession $Session -UseBasicParsing -TimeoutSec 10 -ErrorAction Stop | Out-Null
136:     Write-Step ("qBittorrent category created: {0}" -f $Category) "OK"
137:   }
138: }
139: 
140: function Ensure-RemotePath {
---
152:       Write-Step ("Remote path mapping created for {0}" -f $RemotePath) "OK"
153:     }
154:   } catch {
155:     Add-Warning ("Remote path mapping failed for {0}: {1}" -f $RemotePath, $_.Exception.Message)
156:   }
157: }
158: 
159: function Ensure-ArrQbitClient {
160:   param([string]$BaseUrl, [string]$ApiKey, [string]$Name, [string]$CategoryField, [string]$Category, [string]$Username, [string]$Password)
---
170:   $client.enable = $true
171:   $client.priority = 1
172:   $client.removeCompletedDownloads = $true
173:   $client.removeFailedDownloads = $true
174:   Set-Field -Client $client -Name "host" -Value $QbitContainerHost
175:   Set-Field -Client $client -Name "port" -Value $QbitPort
176:   Set-Field -Client $client -Name "useSsl" -Value $false
177:   Set-Field -Client $client -Name "urlBase" -Value ""
178:   Set-Field -Client $client -Name "username" -Value $Username
---
219:   Backup-File -Path $QbitIni -BackupRoot $backupRoot
220:   Backup-File -Path $QbTokenPath -BackupRoot $backupRoot
221: 
222:   if (!(Test-Path -LiteralPath $QbTokenPath)) { Add-Failure ("Missing qBittorrent token [REDACTED] {0}" -f $QbTokenPath) }
223:   if (!(Test-Path -LiteralPath $RadarrConfig)) { Add-Failure ("Missing Radarr config: {0}" -f $RadarrConfig) }
224:   if (!(Test-Path -LiteralPath $SonarrConfig)) { Add-Failure ("Missing Sonarr config: {0}" -f $SonarrConfig) }
225: 
226:   $rdPremium = $false
227:   if (Test-Path -LiteralPath $RdTokenPath) {
---
220:   Backup-File -Path $QbTokenPath -BackupRoot $backupRoot
221: 
222:   if (!(Test-Path -LiteralPath $QbTokenPath)) { Add-Failure ("Missing qBittorrent token [REDACTED] {0}" -f $QbTokenPath) }
223:   if (!(Test-Path -LiteralPath $RadarrConfig)) { Add-Failure ("Missing Radarr config: {0}" -f $RadarrConfig) }
224:   if (!(Test-Path -LiteralPath $SonarrConfig)) { Add-Failure ("Missing Sonarr config: {0}" -f $SonarrConfig) }
225: 
226:   $rdPremium = $false
227:   if (Test-Path -LiteralPath $RdTokenPath) {
228:     try {
---
221: 
222:   if (!(Test-Path -LiteralPath $QbTokenPath)) { Add-Failure ("Missing qBittorrent token [REDACTED] {0}" -f $QbTokenPath) }
223:   if (!(Test-Path -LiteralPath $RadarrConfig)) { Add-Failure ("Missing Radarr config: {0}" -f $RadarrConfig) }
224:   if (!(Test-Path -LiteralPath $SonarrConfig)) { Add-Failure ("Missing Sonarr config: {0}" -f $SonarrConfig) }
225: 
226:   $rdPremium = $false
227:   if (Test-Path -LiteralPath $RdTokenPath) {
228:     try {
229:       $rdToken = [REDACTED] -LiteralPath $RdTokenPath -Raw).Trim()
---
228:     try {
229:       $rdToken = [REDACTED] -LiteralPath $RdTokenPath -Raw).Trim()
230:       if (-not [string]::IsNullOrWhiteSpace($rdToken)) {
231:         $u = Invoke-RestMethod -Uri "[REDACTED_REAL_DEBRID_URL]" -Headers @{ Authorization = ("Bearer {0}" -f $rdToken) } -UseBasicParsing -TimeoutSec 15 -ErrorAction Stop
232:         if ([int]$u.premium -gt 0) { $rdPremium = $true }
233:         Write-Step ("Real-Debrid premium active: {0}" -f $rdPremium) "INFO"
234:       }
235:     } catch {
236:       Add-Warning "Could not verify Real-Debrid premium state; continuing with qBittorrent fallback"
---
237:     }
238:   }
239: 
240:   if ($Failures.Count -eq 0) {
241:     $qb = Get-Content -LiteralPath $QbTokenPath -Raw | ConvertFrom-Json
242:     $qbBase = [string]$qb.host
243:     if ([string]::IsNullOrWhiteSpace($qbBase)) { $qbBase = "http://127.0.0.1:8080" }
244:     $qbBase = $qbBase.TrimEnd("/")
245:     $qbUser = [string]$qb.username
---
248: 
249:     $qbSession = New-Object Microsoft.PowerShell.Commands.WebRequestSession
250:     $loginBody = "username={0}&password=[REDACTED]" -f [Uri]::EscapeDataString($qbUser), [Uri]::EscapeDataString($qbPass)
251:     $login = Invoke-WebRequest -Uri ($qbBase + "/api/v2/auth/login") -Method Post -Body $loginBody -ContentType "application/x-www-form-urlencoded" -WebSession $qbSession -UseBasicParsing -TimeoutSec 10 -ErrorAction Stop
252:     if ($login.Content -notmatch "Ok") {
253:       Add-Failure "qBittorrent WebUI login did not return Ok"
254:     } else {
255:       Write-Step "qBittorrent WebUI login OK" "OK"
256:     }
---
``

## D:\PlexTools\Scripts\scarflix_v2\Ensure_Radarr_ScarFLIX_Profile.ps1
``text
41:     try {
42:         if ($null -ne $Body) {
43:             $json = $Body | ConvertTo-Json -Depth 60
44:             return @{ ok = $true; value = Invoke-RestMethod -Uri $uri -Method $Method -Headers $headers -Body $json -ContentType "application/json" -UseBasicParsing -TimeoutSec 60 -ErrorAction Stop; error = "" }
45:         }
46:         return @{ ok = $true; value = Invoke-RestMethod -Uri $uri -Method $Method -Headers $headers -UseBasicParsing -TimeoutSec 60 -ErrorAction Stop; error = "" }
47:     } catch {
48:         return @{ ok = $false; value = $null; error = $_.Exception.Message }
49:     }
---
43:             $json = $Body | ConvertTo-Json -Depth 60
44:             return @{ ok = $true; value = Invoke-RestMethod -Uri $uri -Method $Method -Headers $headers -Body $json -ContentType "application/json" -UseBasicParsing -TimeoutSec 60 -ErrorAction Stop; error = "" }
45:         }
46:         return @{ ok = $true; value = Invoke-RestMethod -Uri $uri -Method $Method -Headers $headers -UseBasicParsing -TimeoutSec 60 -ErrorAction Stop; error = "" }
47:     } catch {
48:         return @{ ok = $false; value = $null; error = $_.Exception.Message }
49:     }
50: }
51: 
---
69: Write-Step "INFO" "Ensuring Radarr ScarFLIX profile"
70: $script:RadarrKey = Get-ApiKey [REDACTED]
71: if (-not $script:RadarrKey) {
72:     Write-Step "FAIL" "Radarr API key missing"
73:     Write-Step "FINAL" "FAIL"
74:     exit 1
75: }
76: 
77: $profilesRes = Invoke-Radarr "GET" "qualityprofile" $null
---
70: $script:RadarrKey = Get-ApiKey [REDACTED]
71: if (-not $script:RadarrKey) {
72:     Write-Step "FAIL" "Radarr API key missing"
73:     Write-Step "FINAL" "FAIL"
74:     exit 1
75: }
76: 
77: $profilesRes = Invoke-Radarr "GET" "qualityprofile" $null
78: if (-not $profilesRes.ok) {
---
76: 
77: $profilesRes = Invoke-Radarr "GET" "qualityprofile" $null
78: if (-not $profilesRes.ok) {
79:     Write-Step "FAIL" ("Could not read profiles: {0}" -f $profilesRes.error)
80:     Write-Step "FINAL" "FAIL"
81:     exit 1
82: }
83: 
84: $profiles = $profilesRes.value
---
77: $profilesRes = Invoke-Radarr "GET" "qualityprofile" $null
78: if (-not $profilesRes.ok) {
79:     Write-Step "FAIL" ("Could not read profiles: {0}" -f $profilesRes.error)
80:     Write-Step "FINAL" "FAIL"
81:     exit 1
82: }
83: 
84: $profiles = $profilesRes.value
85: $existing = Find-Profile $profiles $ProfileName
---
88:     $source = $profiles | Select-Object -First 1
89: }
90: if ($null -eq $source) {
91:     Write-Step "FAIL" "No source quality profile found"
92:     Write-Step "FINAL" "FAIL"
93:     exit 1
94: }
95: 
96: if ($null -ne $existing) {
---
89: }
90: if ($null -eq $source) {
91:     Write-Step "FAIL" "No source quality profile found"
92:     Write-Step "FINAL" "FAIL"
93:     exit 1
94: }
95: 
96: if ($null -ne $existing) {
97:     $payload = $existing | ConvertTo-Json -Depth 60 | ConvertFrom-Json
---
102:         Write-Step "FINAL" "PASS"
103:         exit 0
104:     }
105:     Write-Step "REVIEW" ("Profile update failed: {0}" -f $res.error)
106:     Write-Step "FINAL" "REVIEW"
107:     exit 2
108: }
109: 
110: $payload = $source | ConvertTo-Json -Depth 60 | ConvertFrom-Json
---
103:         exit 0
104:     }
105:     Write-Step "REVIEW" ("Profile update failed: {0}" -f $res.error)
106:     Write-Step "FINAL" "REVIEW"
107:     exit 2
108: }
109: 
110: $payload = $source | ConvertTo-Json -Depth 60 | ConvertFrom-Json
111: $payload.PSObject.Properties.Remove("id")
---
118:     exit 0
119: }
120: 
121: Write-Step "REVIEW" ("Profile create failed: {0}" -f $create.error)
122: Write-Step "FINAL" "REVIEW"
123: exit 2
---
119: }
120: 
121: Write-Step "REVIEW" ("Profile create failed: {0}" -f $create.error)
122: Write-Step "FINAL" "REVIEW"
123: exit 2
---
``

## D:\PlexTools\Scripts\scarflix_v2\Install_Request_Dispatcher.ps1
``text
114:     try {
115:         if ($null -ne $Body) {
116:             $json = $Body | ConvertTo-Json -Depth 20
117:             return Invoke-RestMethod -Uri $uri -Method $Method -Headers $headers -Body $json -ContentType "application/json" -UseBasicParsing -TimeoutSec 60 -ErrorAction Stop
118:         }
119:         return Invoke-RestMethod -Uri $uri -Method $Method -Headers $headers -UseBasicParsing -TimeoutSec 60 -ErrorAction Stop
120:     } catch {
121:         Log-Line "REVIEW" ("ARR API failed {0} {1}: {2}" -f $Method, $Path, $_.Exception.Message)
122:         return $null
---
116:             $json = $Body | ConvertTo-Json -Depth 20
117:             return Invoke-RestMethod -Uri $uri -Method $Method -Headers $headers -Body $json -ContentType "application/json" -UseBasicParsing -TimeoutSec 60 -ErrorAction Stop
118:         }
119:         return Invoke-RestMethod -Uri $uri -Method $Method -Headers $headers -UseBasicParsing -TimeoutSec 60 -ErrorAction Stop
120:     } catch {
121:         Log-Line "REVIEW" ("ARR API failed {0} {1}: {2}" -f $Method, $Path, $_.Exception.Message)
122:         return $null
123:     }
124: }
---
118:         }
119:         return Invoke-RestMethod -Uri $uri -Method $Method -Headers $headers -UseBasicParsing -TimeoutSec 60 -ErrorAction Stop
120:     } catch {
121:         Log-Line "REVIEW" ("ARR API failed {0} {1}: {2}" -f $Method, $Path, $_.Exception.Message)
122:         return $null
123:     }
124: }
125: 
126: function Set-Prop {
---
147:     try {
148:         return Get-Content -LiteralPath $Path -Raw | ConvertFrom-Json
149:     } catch {
150:         Log-Line "REVIEW" ("Could not read JSON {0}: {1}" -f $Path, $_.Exception.Message)
151:         return $null
152:     }
153: }
154: 
155: function Write-JsonSafe {
---
157:     try {
158:         ($Object | ConvertTo-Json -Depth 12) | Set-Content -LiteralPath $Path -Encoding ASCII -Force
159:     } catch {
160:         Log-Line "REVIEW" ("Could not write JSON {0}: {1}" -f $Path, $_.Exception.Message)
161:     }
162: }
163: 
164: function Update-State {
165:     param([string]$Folder, [string]$State, [string]$Note, [string]$Arr, [int]$ArrId)
---
187:         Add-Ledger -Action "movie_search" -Result "OK" -Message $Title
188:         return $true
189:     }
190:     Add-Ledger -Action "movie_search" -Result "REVIEW" -Message $Title
191:     return $false
192: }
193: 
194: function Handle-MovieRequest {
195:     param([string]$RequestPath, $Request)
---
198:     $tmdbId = 0
199:     [void][int]::TryParse(("" + $Request.tmdb_id), [ref]$tmdbId)
200:     if ($tmdbId -le 0) {
201:         Update-State -Folder $folder -State "FAILED" -Note "Missing tmdb_id for Radarr add" -Arr "radarr" -ArrId 0
202:         return $false
203:     }
204: 
205:     $profiles = Invoke-ArrApi -Base $RadarrBase -ApiKey [REDACTED] -Method "GET" -Path "qualityprofile" -Body $null
206:     $profileId = Pick-QualityProfileId $profiles
---
216: 
217:     $lookup = Invoke-ArrApi -Base $RadarrBase -ApiKey [REDACTED] -Method "GET" -Path ("movie/lookup/tmdb?tmdbId={0}" -f $tmdbId) -Body $null
218:     if ($null -eq $lookup) {
219:         Update-State -Folder $folder -State "FAILED" -Note "Radarr lookup failed" -Arr "radarr" -ArrId 0
220:         return $false
221:     }
222: 
223:     Set-Prop $lookup "qualityProfileId" $profileId
224:     Set-Prop $lookup "rootFolderPath" $RadarrRoot
---
234:         return $true
235:     }
236: 
237:     Update-State -Folder $folder -State "FAILED" -Note "Radarr add failed" -Arr "radarr" -ArrId 0
238:     return $false
239: }
240: 
241: function Handle-EpisodeRequest {
242:     param([string]$RequestPath, $Request)
---
243:     $folder = Split-Path -Parent $RequestPath
244:     $title = "" + $Request.title
245:     if (-not $title) {
246:         Update-State -Folder $folder -State "FAILED" -Note "Missing title for Sonarr add" -Arr "sonarr" -ArrId 0
247:         return $false
248:     }
249: 
250:     $profiles = Invoke-ArrApi -Base $SonarrBase -ApiKey [REDACTED] -Method "GET" -Path "qualityprofile" -Body $null
251:     $profileId = Pick-QualityProfileId $profiles
---
261:     $term = [Uri]::EscapeDataString($title)
262:     $lookupList = Invoke-ArrApi -Base $SonarrBase -ApiKey [REDACTED] -Method "GET" -Path ("series/lookup?term={0}" -f $term) -Body $null
263:     if (-not $lookupList) {
264:         Update-State -Folder $folder -State "FAILED" -Note "Sonarr lookup failed" -Arr "sonarr" -ArrId 0
265:         return $false
266:     }
267: 
268:     $lookup = $lookupList[0]
269:     $requestedYear = 0
---
288:         return $true
289:     }
290: 
291:     Update-State -Folder $folder -State "FAILED" -Note "Sonarr add failed" -Arr "sonarr" -ArrId 0
292:     return $false
293: }
294: 
295: $script:RadarrKey = Get-ApiKey [REDACTED]
296: $script:SonarrKey = Get-ApiKey [REDACTED]
---
295: $script:RadarrKey = Get-ApiKey [REDACTED]
296: $script:SonarrKey = Get-ApiKey [REDACTED]
297: if (-not $script:RadarrKey -or -not $script:SonarrKey) {
298:     Log-Line "FAIL" "Missing Radarr or Sonarr API key"
299:     exit 1
300: }
301: 
302: $processed = 0
303: $ok = 0
---
301: 
302: $processed = 0
303: $ok = 0
304: $failed = 0
305: 
306: foreach ($root in @($MovieRequestRoot, $TvRequestRoot)) {
307:     if (-not (Test-Path -LiteralPath $root)) { continue }
308:     $files = Get-ChildItem -LiteralPath $root -Recurse -Filter "request.json" -ErrorAction SilentlyContinue
309:     foreach ($file in $files) {
---
322:         $processed++
323:         Update-State -Folder $folder -State "QUEUED" -Note "Dispatcher accepted request" -Arr "" -ArrId 0
324:         if (("" + $req.type) -eq "movie") {
325:             if (Handle-MovieRequest -RequestPath $file.FullName -Request $req) { $ok++ } else { $failed++ }
326:         } elseif (("" + $req.type) -eq "episode") {
327:             if (Handle-EpisodeRequest -RequestPath $file.FullName -Request $req) { $ok++ } else { $failed++ }
328:         } else {
329:             Update-State -Folder $folder -State "FAILED" -Note "Unknown request type" -Arr "" -ArrId 0
330:             $failed++
---
324:         if (("" + $req.type) -eq "movie") {
325:             if (Handle-MovieRequest -RequestPath $file.FullName -Request $req) { $ok++ } else { $failed++ }
326:         } elseif (("" + $req.type) -eq "episode") {
327:             if (Handle-EpisodeRequest -RequestPath $file.FullName -Request $req) { $ok++ } else { $failed++ }
328:         } else {
329:             Update-State -Folder $folder -State "FAILED" -Note "Unknown request type" -Arr "" -ArrId 0
330:             $failed++
331:         }
332:     }
---
326:         } elseif (("" + $req.type) -eq "episode") {
327:             if (Handle-EpisodeRequest -RequestPath $file.FullName -Request $req) { $ok++ } else { $failed++ }
328:         } else {
329:             Update-State -Folder $folder -State "FAILED" -Note "Unknown request type" -Arr "" -ArrId 0
330:             $failed++
331:         }
332:     }
333: }
334: 
---
327:             if (Handle-EpisodeRequest -RequestPath $file.FullName -Request $req) { $ok++ } else { $failed++ }
328:         } else {
329:             Update-State -Folder $folder -State "FAILED" -Note "Unknown request type" -Arr "" -ArrId 0
330:             $failed++
331:         }
332:     }
333: }
334: 
335: Log-Line "OK" ("Dispatcher run processed={0} ok={1} failed={2}" -f $processed, $ok, $failed)
---
``

## D:\PlexTools\Scripts\scarflix_v2\Install_StremioLike_MVP.ps1
``text
123:     param([string]$Path, [string]$ApiKey)
124:     $uri = "https://api.themoviedb.org/3/{0}?api_key=[REDACTED]" -f $Path, [Uri]::EscapeDataString($ApiKey)
125:     try {
126:         return Invoke-RestMethod -Uri $uri -Method Get -UseBasicParsing -TimeoutSec 30 -ErrorAction Stop
127:     } catch {
128:         Write-Step "REVIEW" ("TMDb call failed for {0}: {1}" -f $Path, $_.Exception.Message)
129:         return $null
130:     }
131: }
---
125:     try {
126:         return Invoke-RestMethod -Uri $uri -Method Get -UseBasicParsing -TimeoutSec 30 -ErrorAction Stop
127:     } catch {
128:         Write-Step "REVIEW" ("TMDb call failed for {0}: {1}" -f $Path, $_.Exception.Message)
129:         return $null
130:     }
131: }
132: 
133: function Backup-IfExists {
---
138:             $safeLeaf = ConvertTo-SafeName $leaf
139:             Copy-Item -LiteralPath $Path -Destination (Join-Path $BackupRoot ($safeLeaf + ".bak")) -Force
140:         } catch {
141:             Write-Step "REVIEW" ("Could not back up {0}: {1}" -f $Path, $_.Exception.Message)
142:         }
143:     }
144: }
145: 
146: function Write-AsciiFile {
---
417:     Log-Line "PASS" ("Listening on port {0}" -f $Port)
418:     Add-Ledger -Action "server_start" -Result "PASS" -Message ("port {0}" -f $Port)
419: } catch {
420:     Log-Line "FAIL" ("Could not listen on port {0}: {1}" -f $Port, $_.Exception.Message)
421:     Add-Ledger -Action "server_start" -Result "FAIL" -Message $_.Exception.Message
422:     exit 1
423: }
424: 
425: while ($true) {
---
418:     Add-Ledger -Action "server_start" -Result "PASS" -Message ("port {0}" -f $Port)
419: } catch {
420:     Log-Line "FAIL" ("Could not listen on port {0}: {1}" -f $Port, $_.Exception.Message)
421:     Add-Ledger -Action "server_start" -Result "FAIL" -Message $_.Exception.Message
422:     exit 1
423: }
424: 
425: while ($true) {
426:     $client = $null
---
463:             Send-Response -Stream $stream -StatusLine "HTTP/1.1 404 Not Found" -Headers @("Content-Type: text/plain") -Body ([Text.Encoding]::ASCII.GetBytes("not found"))
464:         }
465:     } catch {
466:         try { Log-Line "REVIEW" ("Request failed: " + $_.Exception.Message) } catch {}
467:     } finally {
468:         if ($client) { try { $client.Close() } catch {} }
469:     }
470: }
471: '@
---
481:     }
482: 
483:     if (-not (Test-Path -LiteralPath $PlexDb)) {
484:         Write-Step "REVIEW" ("Plex DB not found: {0}" -f $PlexDb)
485:         return $result
486:     }
487: 
488:     try {
489:         $code = @"
---
517:             }
518:         }
519:     } catch {
520:         Write-Step "REVIEW" ("Could not read Plex sections from DB: {0}" -f $_.Exception.Message)
521:     }
522: 
523:     return $result
524: }
525: 
---
526: function Refresh-PlexSection {
527:     param([int]$SectionId, [string]$Name)
528:     if ($SectionId -le 0) {
529:         Write-Step "REVIEW" ("Plex section id not found for {0}" -f $Name)
530:         return $false
531:     }
532:     if (-not (Test-Path -LiteralPath $PlexScanner)) {
533:         Write-Step "REVIEW" ("Plex scanner not found: {0}" -f $PlexScanner)
534:         return $false
---
530:         return $false
531:     }
532:     if (-not (Test-Path -LiteralPath $PlexScanner)) {
533:         Write-Step "REVIEW" ("Plex scanner not found: {0}" -f $PlexScanner)
534:         return $false
535:     }
536:     try {
537:         Write-Step "INFO" ("Refreshing Plex section {0} ({1})" -f $SectionId, $Name)
538:         $p = Start-Process -FilePath $PlexScanner -ArgumentList @("--scan", "--refresh", "--section", ("" + $SectionId)) -Wait -PassThru -WindowStyle Hidden
---
540:             Write-Step "OK" ("Plex section refreshed: {0}" -f $Name)
541:             return $true
542:         }
543:         Write-Step "REVIEW" ("Plex scanner returned exit code {0} for {1}" -f $p.ExitCode, $Name)
544:         return $false
545:     } catch {
546:         Write-Step "REVIEW" ("Plex refresh failed for {0}: {1}" -f $Name, $_.Exception.Message)
547:         return $false
548:     }
---
543:         Write-Step "REVIEW" ("Plex scanner returned exit code {0} for {1}" -f $p.ExitCode, $Name)
544:         return $false
545:     } catch {
546:         Write-Step "REVIEW" ("Plex refresh failed for {0}: {1}" -f $Name, $_.Exception.Message)
547:         return $false
548:     }
549: }
550: 
551: function Start-RequestServer {
---
551: function Start-RequestServer {
552:     $running = $false
553:     try {
554:         $probe = Invoke-WebRequest -Uri ("http://127.0.0.1:{0}/health" -f $RequestPort) -UseBasicParsing -TimeoutSec 3 -ErrorAction Stop
555:         if ($probe.StatusCode -eq 200) { $running = $true }
556:     } catch {}
557: 
558:     if ($running) {
559:         Write-Step "OK" ("Request server already running on port {0}" -f $RequestPort)
---
563:     try {
564:         Start-Process -FilePath "powershell.exe" -ArgumentList @("-NoProfile", "-ExecutionPolicy", "Bypass", "-File", $RequestServerPath) -WindowStyle Hidden | Out-Null
565:         Start-Sleep -Seconds 2
566:         $probe = Invoke-WebRequest -Uri ("http://127.0.0.1:{0}/health" -f $RequestPort) -UseBasicParsing -TimeoutSec 5 -ErrorAction Stop
567:         if ($probe.StatusCode -eq 200) {
568:             Write-Step "OK" ("Request server started on port {0}" -f $RequestPort)
569:             return $true
570:         }
571:     } catch {
---
569:             return $true
570:         }
571:     } catch {
572:         Write-Step "REVIEW" ("Request server did not confirm healthy: {0}" -f $_.Exception.Message)
573:     }
574:     return $false
575: }
576: 
577: function Install-ScheduledTask {
---
583:             Write-Step "OK" ("Scheduled task installed: {0}" -f $taskName)
584:             return $true
585:         }
586:         Write-Step "REVIEW" ("Could not install scheduled task {0}: {1}" -f $taskName, ("" + $out))
587:         return $false
588:     } catch {
589:         Write-Step "REVIEW" ("Could not install scheduled task {0}: {1}" -f $taskName, $_.Exception.Message)
590:         return $false
591:     }
---
586:         Write-Step "REVIEW" ("Could not install scheduled task {0}: {1}" -f $taskName, ("" + $out))
587:         return $false
588:     } catch {
589:         Write-Step "REVIEW" ("Could not install scheduled task {0}: {1}" -f $taskName, $_.Exception.Message)
590:         return $false
591:     }
592: }
593: 
594: function Install-StartupFallback {
---
600:         Write-Step "OK" ("Startup fallback installed: {0}" -f $StartupCmd)
601:         return $true
602:     } catch {
603:         Write-Step "REVIEW" ("Could not install startup fallback: {0}" -f $_.Exception.Message)
604:         return $false
605:     }
606: }
607: 
608: function Install-FirewallRule {
---
``

## D:\PlexTools\Scripts\scarflix_v2\Invoke-ScarFLIXv2_MasterAuthorityJob.ps1
``text
4:   [string]$Script = "",
5:   [string]$Executable = "",
6:   [string[]]$Arguments = @(),
7:   [int]$TimeoutSeconds = 600,
8:   [string]$WorkingDirectory = "",
9:   [int]$WaitSeconds = 180
10: )
11: 
12: $ErrorActionPreference = "Continue"
---
20:   job_id = $jobId
21:   authority = $AuthorityPhrase
22:   mode = $Mode
23:   timeout_seconds = $TimeoutSeconds
24:   working_directory = $WorkingDirectory
25:   queued_utc = (Get-Date).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ")
26: }
27: if($Mode -eq "inline_powershell") { $job.code = $Code }
28: if($Mode -eq "script") { $job.script = $Script; $job.arguments = @($Arguments) }
---
``

## D:\PlexTools\Scripts\scarflix_v2\Repair_Decypharr_Debrid_Config.ps1
``text
5: try { [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12 } catch {}
6: 
7: $ScriptStart = Get-Date
8: $FinalStatus = "REVIEW"
9: $Failures = New-Object System.Collections.ArrayList
10: $Warnings = New-Object System.Collections.ArrayList
11: 
12: $LogsRoot = "D:\PlexTools\logs"
13: $DockerRoot = "D:\ScarFLIXv2\docker"
---
6: 
7: $ScriptStart = Get-Date
8: $FinalStatus = "REVIEW"
9: $Failures = New-Object System.Collections.ArrayList
10: $Warnings = New-Object System.Collections.ArrayList
11: 
12: $LogsRoot = "D:\PlexTools\logs"
13: $DockerRoot = "D:\ScarFLIXv2\docker"
14: $ConfigPath = "D:\ScarFLIXv2\docker\configs\config.json"
---
39:   try { Add-Content -LiteralPath $LogPath -Value $line -Encoding UTF8 } catch {}
40: }
41: 
42: function Add-Failure {
43:   param([string]$Message)
44:   [void]$Failures.Add($Message)
45:   Write-Step $Message "FAIL"
46: }
47: 
---
41: 
42: function Add-Failure {
43:   param([string]$Message)
44:   [void]$Failures.Add($Message)
45:   Write-Step $Message "FAIL"
46: }
47: 
48: function Add-Warning {
49:   param([string]$Message)
---
42: function Add-Failure {
43:   param([string]$Message)
44:   [void]$Failures.Add($Message)
45:   Write-Step $Message "FAIL"
46: }
47: 
48: function Add-Warning {
49:   param([string]$Message)
50:   [void]$Warnings.Add($Message)
---
100: }
101: 
102: function Invoke-JsonGet {
103:   param([string]$Uri, [int]$TimeoutSec)
104:   try {
105:     return Invoke-RestMethod -Uri $Uri -UseBasicParsing -TimeoutSec $TimeoutSec -ErrorAction Stop
106:   } catch {
107:     return $null
108:   }
---
102: function Invoke-JsonGet {
103:   param([string]$Uri, [int]$TimeoutSec)
104:   try {
105:     return Invoke-RestMethod -Uri $Uri -UseBasicParsing -TimeoutSec $TimeoutSec -ErrorAction Stop
106:   } catch {
107:     return $null
108:   }
109: }
110: 
---
112: Write-Step "Secrets will be read from the token [REDACTED] only and will not be printed or written to logs." "INFO"
113: 
114: try {
115:   if (!(Test-Path -LiteralPath $DockerRoot)) { Add-Failure ("Missing Docker root: {0}" -f $DockerRoot) }
116:   if (!(Test-Path -LiteralPath $ConfigPath)) { Add-Failure ("Missing Decypharr config: {0}" -f $ConfigPath) }
117:   if (!(Test-Path -LiteralPath $ComposePath)) { Add-Failure ("Missing docker-compose file: {0}" -f $ComposePath) }
118: 
119:   $rd = Get-FirstToken [REDACTED] @("rd_token.txt", "rd_token-Jason.txt", "realdebrid_token.txt")
120:   if ($null -eq $rd) {
---
113: 
114: try {
115:   if (!(Test-Path -LiteralPath $DockerRoot)) { Add-Failure ("Missing Docker root: {0}" -f $DockerRoot) }
116:   if (!(Test-Path -LiteralPath $ConfigPath)) { Add-Failure ("Missing Decypharr config: {0}" -f $ConfigPath) }
117:   if (!(Test-Path -LiteralPath $ComposePath)) { Add-Failure ("Missing docker-compose file: {0}" -f $ComposePath) }
118: 
119:   $rd = Get-FirstToken [REDACTED] @("rd_token.txt", "rd_token-Jason.txt", "realdebrid_token.txt")
120:   if ($null -eq $rd) {
121:     Add-Failure ("Real-Debrid token [REDACTED] found in token [REDACTED] {0}" -f $TokenRoot)
---
114: try {
115:   if (!(Test-Path -LiteralPath $DockerRoot)) { Add-Failure ("Missing Docker root: {0}" -f $DockerRoot) }
116:   if (!(Test-Path -LiteralPath $ConfigPath)) { Add-Failure ("Missing Decypharr config: {0}" -f $ConfigPath) }
117:   if (!(Test-Path -LiteralPath $ComposePath)) { Add-Failure ("Missing docker-compose file: {0}" -f $ComposePath) }
118: 
119:   $rd = Get-FirstToken [REDACTED] @("rd_token.txt", "rd_token-Jason.txt", "realdebrid_token.txt")
120:   if ($null -eq $rd) {
121:     Add-Failure ("Real-Debrid token [REDACTED] found in token [REDACTED] {0}" -f $TokenRoot)
122:   } else {
---
118: 
119:   $rd = Get-FirstToken [REDACTED] @("rd_token.txt", "rd_token-Jason.txt", "realdebrid_token.txt")
120:   if ($null -eq $rd) {
121:     Add-Failure ("Real-Debrid token [REDACTED] found in token [REDACTED] {0}" -f $TokenRoot)
122:   } else {
123:     Write-Step ("Real-Debrid token [REDACTED] in vault file: {0} (value hidden)" -f (Split-Path -Leaf $rd.Path)) "OK"
124:   }
125: 
126:   if ($Failures.Count -eq 0) {
---
123:     Write-Step ("Real-Debrid token [REDACTED] in vault file: {0} (value hidden)" -f (Split-Path -Leaf $rd.Path)) "OK"
124:   }
125: 
126:   if ($Failures.Count -eq 0) {
127:     try {
128:       $headers = @{ Authorization = ("Bearer {0}" -f $rd.Value) }
129:       $probe = Invoke-WebRequest -Uri "[REDACTED_REAL_DEBRID_URL]" -Headers $headers -UseBasicParsing -TimeoutSec 15 -ErrorAction Stop
130:       if ($probe.StatusCode -eq 200) {
131:         Write-Step "Real-Debrid API probe returned HTTP 200" "OK"
---
126:   if ($Failures.Count -eq 0) {
127:     try {
128:       $headers = @{ Authorization = ("Bearer {0}" -f $rd.Value) }
129:       $probe = Invoke-WebRequest -Uri "[REDACTED_REAL_DEBRID_URL]" -Headers $headers -UseBasicParsing -TimeoutSec 15 -ErrorAction Stop
130:       if ($probe.StatusCode -eq 200) {
131:         Write-Step "Real-Debrid API probe returned HTTP 200" "OK"
132:       } else {
133:         Add-Warning ("Real-Debrid API probe returned HTTP {0}" -f $probe.StatusCode)
134:       }
---
133:         Add-Warning ("Real-Debrid API probe returned HTTP {0}" -f $probe.StatusCode)
134:       }
135:     } catch {
136:       Add-Failure ("Real-Debrid API probe failed without exposing token: [REDACTED]" -f $_.Exception.Message)
137:     }
138:   }
139: 
140:   if ($Failures.Count -eq 0) {
141:     if (!(Test-Path -LiteralPath $DataRoot)) { New-Item -ItemType Directory -Path $DataRoot -Force | Out-Null }
---
137:     }
138:   }
139: 
140:   if ($Failures.Count -eq 0) {
141:     if (!(Test-Path -LiteralPath $DataRoot)) { New-Item -ItemType Directory -Path $DataRoot -Force | Out-Null }
142:     if (!(Test-Path -LiteralPath $DownloadRoot)) { New-Item -ItemType Directory -Path $DownloadRoot -Force | Out-Null }
143: 
144:     $stamp = Get-Date -Format "yyyyMMdd_HHmmss"
145:     $backupRoot = Join-Path $LogsRoot ("scarflix_v2_decypharr_repair_backup_{0}" -f $stamp)
---
186: 
187:     $json = $cfg | ConvertTo-Json -Depth 20
188:     if ($json.Contains($rd.Value)) {
189:       Add-Failure "Safety check failed: generated config would contain the Real-Debrid token."
190:     } else {
191:       Write-Utf8NoBom -Path $ConfigPath -Text $json
192:       Write-Step ("Config updated: download_folder=/data/downloads, default_download_action=strm, app_url={0}, debrids=1 without token [REDACTED] disk" -f $appUrl) "OK"
193:     }
194:   }
---
193:     }
194:   }
195: 
196:   if ($Failures.Count -eq 0) {
197:     Write-Step "Updating docker-compose Decypharr environment and shared /data mount" "INFO"
198:     $composeLines = Get-Content -LiteralPath $ComposePath
199:     $newCompose = New-Object System.Collections.ArrayList
200:     $serviceName = ""
201:     $addedDebridEnv = $false
---
233:     Write-Step "docker-compose updated without writing secret values" "OK"
234:   }
235: 
236:   if ($Failures.Count -eq 0) {
237:     Write-Step "Recreating only Decypharr with token [REDACTED] from this process environment" "INFO"
238:     $env:TZ = "Australia/Melbourne"
239:     $env:PUID = "1000"
240:     $env:PGID = "1000"
241:     Push-Location $DockerRoot
---
``

## D:\PlexTools\Scripts\scarflix_v2\Restore_Debrid_First_When_RD_Premium.ps1
``text
5: try { [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12 } catch {}
6: 
7: $ScriptStart = Get-Date
8: $FinalStatus = "REVIEW"
9: $Failures = New-Object System.Collections.ArrayList
10: $Warnings = New-Object System.Collections.ArrayList
11: 
12: $TokenRoot = "C:\Users\jason\OneDrive\Public\TOKENS"
13: $LogRoot = "D:\PlexTools\logs"
---
6: 
7: $ScriptStart = Get-Date
8: $FinalStatus = "REVIEW"
9: $Failures = New-Object System.Collections.ArrayList
10: $Warnings = New-Object System.Collections.ArrayList
11: 
12: $TokenRoot = "C:\Users\jason\OneDrive\Public\TOKENS"
13: $LogRoot = "D:\PlexTools\logs"
14: $PublishRoot = "D:\PlexTools\public\latest\scarflix"
---
48:   try { Add-Content -LiteralPath $LogPath -Value $Line -Encoding UTF8 } catch {}
49: }
50: 
51: function Add-Failure {
52:   param([string]$Message)
53:   [void]$Failures.Add($Message)
54:   Write-Step $Message "FAIL"
55: }
56: 
---
50: 
51: function Add-Failure {
52:   param([string]$Message)
53:   [void]$Failures.Add($Message)
54:   Write-Step $Message "FAIL"
55: }
56: 
57: function Add-Warning {
58:   param([string]$Message)
---
51: function Add-Failure {
52:   param([string]$Message)
53:   [void]$Failures.Add($Message)
54:   Write-Step $Message "FAIL"
55: }
56: 
57: function Add-Warning {
58:   param([string]$Message)
59:   [void]$Warnings.Add($Message)
---
120:   $Fallback = $Clients | Where-Object { $_.implementation -eq "QBittorrent" -and $_.name -eq "qBittorrent Local Fallback" } | Select-Object -First 1
121: 
122:   if ($null -eq $Decypharr) {
123:     Add-Failure ("{0}: Decypharr download client not found" -f $Name)
124:   } else {
125:     $Decypharr.enable = $true
126:     $Decypharr.priority = 1
127:     Invoke-Arr -BaseUrl $BaseUrl -ApiKey [REDACTED] -Path ("/api/v3/downloadclient/{0}" -f $Decypharr.id) -Method "PUT" -Body $Decypharr | Out-Null
128:     Write-Step ("{0}: Decypharr enabled at priority 1" -f $Name) "OK"
---
144:     $Body = @{ username = $Username; password = [REDACTED] }
145:     $Login = Invoke-WebRequest -Uri ($DecypharrUrl + "/api/v2/auth/login") -Method Post -Body $Body -SessionVariable Session -UseBasicParsing -ErrorAction Stop
146:     if ($Login.StatusCode -ne 200) {
147:       Add-Failure ("{0}: Decypharr qBittorrent login returned HTTP {1}" -f $Name, $Login.StatusCode)
148:       return $false
149:     }
150:     $Info = Invoke-WebRequest -Uri ($DecypharrUrl + "/api/v2/torrents/info") -WebSession $Session -UseBasicParsing -ErrorAction Stop
151:     if ($Info.StatusCode -ne 200) {
152:       Add-Failure ("{0}: Decypharr torrents/info returned HTTP {1}" -f $Name, $Info.StatusCode)
---
149:     }
150:     $Info = Invoke-WebRequest -Uri ($DecypharrUrl + "/api/v2/torrents/info") -WebSession $Session -UseBasicParsing -ErrorAction Stop
151:     if ($Info.StatusCode -ne 200) {
152:       Add-Failure ("{0}: Decypharr torrents/info returned HTTP {1}" -f $Name, $Info.StatusCode)
153:       return $false
154:     }
155:     Write-Step ("{0}: Decypharr qBittorrent mock login and torrents/info OK" -f $Name) "OK"
156:     return $true
157:   } catch {
---
155:     Write-Step ("{0}: Decypharr qBittorrent mock login and torrents/info OK" -f $Name) "OK"
156:     return $true
157:   } catch {
158:     Add-Failure ("{0}: Decypharr mock API check failed: {1}" -f $Name, $_.Exception.Message)
159:     return $false
160:   }
161: }
162: 
163: function Backup-IfPresent {
---
170:       Copy-Item -LiteralPath $Path -Destination $Target -Force
171:       Write-Step ("Backup created: {0}" -f $Target) "OK"
172:     } catch {
173:       Add-Warning ("Backup failed for {0}: {1}" -f $Path, $_.Exception.Message)
174:     }
175:   } else {
176:     Add-Warning ("Backup skipped; missing file: {0}" -f $Path)
177:   }
178: }
---
195: 
196:   $RdToken = [REDACTED]
197:   if ([string]::IsNullOrWhiteSpace($RdToken)) {
198:     Add-Failure "Real-Debrid token [REDACTED] found in token [REDACTED]"
199:   } else {
200:     try {
201:       $User = Invoke-RestMethod -Uri "[REDACTED_REAL_DEBRID_URL]" -Headers @{ Authorization = ("Bearer " + $RdToken) } -UseBasicParsing -ErrorAction Stop
202:       if ($User.premium -and ([int]$User.premium -gt 0)) { $RdPremium = $true }
203:       if ($User.expiration) { $RdExpiration = [string]$User.expiration }
---
203:       if ($User.expiration) { $RdExpiration = [string]$User.expiration }
204:       Write-Step ("Real-Debrid premium active: {0}" -f $RdPremium) "OK"
205:     } catch {
206:       Add-Failure ("Real-Debrid API probe failed: {0}" -f $_.Exception.Message)
207:     }
208:   }
209: 
210:   if (!$RdPremium) {
211:     Add-Failure "Real-Debrid is still not premium; refusing to promote Decypharr over qBittorrent fallback"
---
208:   }
209: 
210:   if (!$RdPremium) {
211:     Add-Failure "Real-Debrid is still not premium; refusing to promote Decypharr over qBittorrent fallback"
212:   }
213: 
214:   $RadarrKey = Get-ApiKeyFromConfig $RadarrConfig
215:   $SonarrKey = Get-ApiKeyFromConfig $SonarrConfig
216:   if ([string]::IsNullOrWhiteSpace($RadarrKey)) { Add-Failure "Radarr API key missing from local config" }
---
213: 
214:   $RadarrKey = Get-ApiKeyFromConfig $RadarrConfig
215:   $SonarrKey = Get-ApiKeyFromConfig $SonarrConfig
216:   if ([string]::IsNullOrWhiteSpace($RadarrKey)) { Add-Failure "Radarr API key missing from local config" }
217:   if ([string]::IsNullOrWhiteSpace($SonarrKey)) { Add-Failure "Sonarr API key missing from local config" }
218: 
219:   if ($Failures.Count -eq 0) {
220:     Set-ArrDownloadClientMode -Name "Radarr" -BaseUrl $RadarrUrl -ApiKey [REDACTED]
221:     Set-ArrDownloadClientMode -Name "Sonarr" -BaseUrl $SonarrUrl -ApiKey [REDACTED]
---
214:   $RadarrKey = Get-ApiKeyFromConfig $RadarrConfig
215:   $SonarrKey = Get-ApiKeyFromConfig $SonarrConfig
216:   if ([string]::IsNullOrWhiteSpace($RadarrKey)) { Add-Failure "Radarr API key missing from local config" }
217:   if ([string]::IsNullOrWhiteSpace($SonarrKey)) { Add-Failure "Sonarr API key missing from local config" }
218: 
219:   if ($Failures.Count -eq 0) {
220:     Set-ArrDownloadClientMode -Name "Radarr" -BaseUrl $RadarrUrl -ApiKey [REDACTED]
221:     Set-ArrDownloadClientMode -Name "Sonarr" -BaseUrl $SonarrUrl -ApiKey [REDACTED]
222:     $RadarrMockOk = Test-DecypharrMockLogin -Name "Radarr" -Username "http://radarr:7878" -Password [REDACTED]
---
216:   if ([string]::IsNullOrWhiteSpace($RadarrKey)) { Add-Failure "Radarr API key missing from local config" }
217:   if ([string]::IsNullOrWhiteSpace($SonarrKey)) { Add-Failure "Sonarr API key missing from local config" }
218: 
219:   if ($Failures.Count -eq 0) {
220:     Set-ArrDownloadClientMode -Name "Radarr" -BaseUrl $RadarrUrl -ApiKey [REDACTED]
221:     Set-ArrDownloadClientMode -Name "Sonarr" -BaseUrl $SonarrUrl -ApiKey [REDACTED]
222:     $RadarrMockOk = Test-DecypharrMockLogin -Name "Radarr" -Username "http://radarr:7878" -Password [REDACTED]
223:     $SonarrMockOk = Test-DecypharrMockLogin -Name "Sonarr" -Username "http://sonarr:8989" -Password [REDACTED]
224:   }
---
223:     $SonarrMockOk = Test-DecypharrMockLogin -Name "Sonarr" -Username "http://sonarr:8989" -Password [REDACTED]
224:   }
225: } catch {
226:   Add-Failure ("Unhandled restore exception: {0}" -f $_.Exception.Message)
227: }
228: 
229: if ($Failures.Count -gt 0) {
230:   $FinalStatus = "FAIL"
231: } else {
---
226:   Add-Failure ("Unhandled restore exception: {0}" -f $_.Exception.Message)
227: }
228: 
229: if ($Failures.Count -gt 0) {
230:   $FinalStatus = "FAIL"
231: } else {
232:   $FinalStatus = "PASS"
233: }
234: 
---
``

## D:\PlexTools\Scripts\scarflix_v2\ScarFLIX_v2_AccessHealth.ps1
``text
10:   Add-Check ("path_exists " + $p) (Test-Path -LiteralPath $p) $p
11: }
12: try { $t=Get-ScheduledTask -TaskName "ScarFLIX_v2_AdminTaskRunner" -ErrorAction Stop; Add-Check "admin_task" $true ("State=" + $t.State) } catch { Add-Check "admin_task" $false $_.Exception.Message }
13: try { $id=Invoke-WebRequest -Uri "http://127.0.0.1:32400/identity" -UseBasicParsing -TimeoutSec 5; Add-Check "plex_identity" ($id.StatusCode -eq 200) ("HTTP " + $id.StatusCode) } catch { Add-Check "plex_identity" $false $_.Exception.Message }
14: try { $sp=Invoke-WebRequest -Uri "http://127.0.0.1:18788/health" -UseBasicParsing -TimeoutSec 5; Add-Check "stream_proxy" ($sp.StatusCode -eq 200) ("HTTP " + $sp.StatusCode) } catch { Add-Check "stream_proxy" $false $_.Exception.Message }
15: try { $rs=Invoke-WebRequest -Uri "http://127.0.0.1:18787/health" -UseBasicParsing -TimeoutSec 5; Add-Check "request_server" ($rs.StatusCode -eq 200) ("HTTP " + $rs.StatusCode) } catch { Add-Check "request_server" $false $_.Exception.Message }
16: $ok=$true
17: foreach($c in @($checks)){ if(!$c.ok){ $ok=$false } }
18: $status="PASS"
---
11: }
12: try { $t=Get-ScheduledTask -TaskName "ScarFLIX_v2_AdminTaskRunner" -ErrorAction Stop; Add-Check "admin_task" $true ("State=" + $t.State) } catch { Add-Check "admin_task" $false $_.Exception.Message }
13: try { $id=Invoke-WebRequest -Uri "http://127.0.0.1:32400/identity" -UseBasicParsing -TimeoutSec 5; Add-Check "plex_identity" ($id.StatusCode -eq 200) ("HTTP " + $id.StatusCode) } catch { Add-Check "plex_identity" $false $_.Exception.Message }
14: try { $sp=Invoke-WebRequest -Uri "http://127.0.0.1:18788/health" -UseBasicParsing -TimeoutSec 5; Add-Check "stream_proxy" ($sp.StatusCode -eq 200) ("HTTP " + $sp.StatusCode) } catch { Add-Check "stream_proxy" $false $_.Exception.Message }
15: try { $rs=Invoke-WebRequest -Uri "http://127.0.0.1:18787/health" -UseBasicParsing -TimeoutSec 5; Add-Check "request_server" ($rs.StatusCode -eq 200) ("HTTP " + $rs.StatusCode) } catch { Add-Check "request_server" $false $_.Exception.Message }
16: $ok=$true
17: foreach($c in @($checks)){ if(!$c.ok){ $ok=$false } }
18: $status="PASS"
19: if(!$ok){ $status="REVIEW" }
---
12: try { $t=Get-ScheduledTask -TaskName "ScarFLIX_v2_AdminTaskRunner" -ErrorAction Stop; Add-Check "admin_task" $true ("State=" + $t.State) } catch { Add-Check "admin_task" $false $_.Exception.Message }
13: try { $id=Invoke-WebRequest -Uri "http://127.0.0.1:32400/identity" -UseBasicParsing -TimeoutSec 5; Add-Check "plex_identity" ($id.StatusCode -eq 200) ("HTTP " + $id.StatusCode) } catch { Add-Check "plex_identity" $false $_.Exception.Message }
14: try { $sp=Invoke-WebRequest -Uri "http://127.0.0.1:18788/health" -UseBasicParsing -TimeoutSec 5; Add-Check "stream_proxy" ($sp.StatusCode -eq 200) ("HTTP " + $sp.StatusCode) } catch { Add-Check "stream_proxy" $false $_.Exception.Message }
15: try { $rs=Invoke-WebRequest -Uri "http://127.0.0.1:18787/health" -UseBasicParsing -TimeoutSec 5; Add-Check "request_server" ($rs.StatusCode -eq 200) ("HTTP " + $rs.StatusCode) } catch { Add-Check "request_server" $false $_.Exception.Message }
16: $ok=$true
17: foreach($c in @($checks)){ if(!$c.ok){ $ok=$false } }
18: $status="PASS"
19: if(!$ok){ $status="REVIEW" }
20: $obj=[ordered]@{ component="scarflix_v2_access_health"; status=$status; refreshed_utc=(Get-Date).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ"); checks=@($checks) }
---
16: $ok=$true
17: foreach($c in @($checks)){ if(!$c.ok){ $ok=$false } }
18: $status="PASS"
19: if(!$ok){ $status="REVIEW" }
20: $obj=[ordered]@{ component="scarflix_v2_access_health"; status=$status; refreshed_utc=(Get-Date).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ"); checks=@($checks) }
21: $utf8NoBom = New-Object System.Text.UTF8Encoding($false)
22: [IO.File]::WriteAllText($StatusPath, ($obj | ConvertTo-Json -Depth 8), $utf8NoBom)
23: Write-Host ("Access health: {0}" -f $status)
24: Write-Host ("Status JSON: {0}" -f $StatusPath)
---
``

## D:\PlexTools\Scripts\scarflix_v2\ScarFLIX_v2_AdminTaskRunner.ps1
``text
68: $started = Get-Date
69: $processed = 0
70: $passed = 0
71: $failed = 0
72: $results = New-Object System.Collections.ArrayList
73: Write-Step "INFO" "Admin task runner started."
74: 
75: $jobs = @(Get-ChildItem -LiteralPath $QueueRoot -File -Filter "*.json" -ErrorAction SilentlyContinue | Sort-Object LastWriteTime | Select-Object -First $MaxJobs)
76: foreach ($jobFile in @($jobs)) {
---
77:   $processed++
78:   $job = Read-JsonSafe $jobFile.FullName
79:   $jobId = [IO.Path]::GetFileNameWithoutExtension($jobFile.Name)
80:   $result = [ordered]@{ job_id=$jobId; status="FAIL"; script=""; exit_code=-1; reason=""; stdout=""; stderr="" }
81:   if ($null -eq $job) {
82:     $result.reason = "job json parse failed"
83:   } else {
84:     $script = ""
85:     if ($job.PSObject.Properties["script"]) { $script = "" + $job.script }
---
79:   $jobId = [IO.Path]::GetFileNameWithoutExtension($jobFile.Name)
80:   $result = [ordered]@{ job_id=$jobId; status="FAIL"; script=""; exit_code=-1; reason=""; stdout=""; stderr="" }
81:   if ($null -eq $job) {
82:     $result.reason = "job json parse failed"
83:   } else {
84:     $script = ""
85:     if ($job.PSObject.Properties["script"]) { $script = "" + $job.script }
86:     $result.script = $script
87:     if (!(Test-AllowedScript -Path $script)) {
---
116:       }
117:     }
118:   }
119:   if ($result.status -ne "PASS") { $failed++ }
120:   [void]$results.Add($result)
121:   $donePath = Join-Path $DoneRoot ($jobFile.Name)
122:   try { Move-Item -LiteralPath $jobFile.FullName -Destination $donePath -Force } catch {}
123:   Write-JsonFile -Path (Join-Path $DoneRoot ($jobId + ".result.json")) -Object $result
124: }
---
124: }
125: 
126: $status = "PASS"
127: if ($failed -gt 0) { $status = "REVIEW" }
128: $ended = Get-Date
129: $summary = [ordered]@{
130:   component=$Component
131:   status=$status
132:   started_utc=$started.ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ")
---
137:   done=$DoneRoot
138:   processed=$processed
139:   passed=$passed
140:   failed=$failed
141:   results=@($results)
142:   log=$LogPath
143: }
144: Write-JsonFile -Path $StatusPath -Object $summary
145: Write-Step $status ("Admin task runner finished: processed={0}; passed={1}; failed={2}" -f $processed,$passed,$failed)
---
142:   log=$LogPath
143: }
144: Write-JsonFile -Path $StatusPath -Object $summary
145: Write-Step $status ("Admin task runner finished: processed={0}; passed={1}; failed={2}" -f $processed,$passed,$failed)
146: if ($failed -gt 0) { exit 2 }
147: exit 0
---
143: }
144: Write-JsonFile -Path $StatusPath -Object $summary
145: Write-Step $status ("Admin task runner finished: processed={0}; passed={1}; failed={2}" -f $processed,$passed,$failed)
146: if ($failed -gt 0) { exit 2 }
147: exit 0
---
``

## D:\PlexTools\Scripts\scarflix_v2\ScarFLIX_v2_AutoGate.ps1
``text
14: $Started = Get-Date
15: $ScriptRoot = "D:\PlexTools\Scripts\scarflix_v2"
16: $PublisherScript = Join-Path $ScriptRoot "ScarFLIX_v2_WebDavVirtualCatalogPublisher.ps1"
17: $VisibleQaScript = Join-Path $ScriptRoot "ScarFLIX_v2_VisibleCatalogQA.ps1"
18: $DecisionQaScript = Join-Path $ScriptRoot "ScarFLIX_v2_PlexClientDecisionQA.ps1"
19: $HealthScript = Join-Path $ScriptRoot "ScarFLIX_v2_HealthStatus.ps1"
20: $ActiveGateScript = Join-Path $ScriptRoot "ScarFLIX_v2_WebDavActiveGate.ps1"
21: $PublishRoot = "D:\PlexTools\public\latest\scarflix"
22: $LogRoot = "D:\PlexTools\logs"
---
17: $VisibleQaScript = Join-Path $ScriptRoot "ScarFLIX_v2_VisibleCatalogQA.ps1"
18: $DecisionQaScript = Join-Path $ScriptRoot "ScarFLIX_v2_PlexClientDecisionQA.ps1"
19: $HealthScript = Join-Path $ScriptRoot "ScarFLIX_v2_HealthStatus.ps1"
20: $ActiveGateScript = Join-Path $ScriptRoot "ScarFLIX_v2_WebDavActiveGate.ps1"
21: $PublishRoot = "D:\PlexTools\public\latest\scarflix"
22: $LogRoot = "D:\PlexTools\logs"
23: $StatusJson = Join-Path $PublishRoot "auto_gate_status.json"
24: $StatusMd = Join-Path $PublishRoot "auto_gate_status.md"
25: $LogPath = Join-Path $LogRoot ("scarflix_v2_auto_gate_{0}.log" -f (Get-Date -Format "yyyyMMdd"))
---
127:   return $value
128: }
129: 
130: function Test-ActiveGateTransientOnly {
131:   param([object]$StatusObject)
132:   if ($null -eq $StatusObject) { return $false }
133:   if (("" + $StatusObject.status) -eq "PASS") { return $false }
134:   $transientCount = Get-StatusInt -StatusObject $StatusObject -Name "transient_failures"
135:   $prunableCount = Get-StatusInt -StatusObject $StatusObject -Name "prunable_failures"
---
131:   param([object]$StatusObject)
132:   if ($null -eq $StatusObject) { return $false }
133:   if (("" + $StatusObject.status) -eq "PASS") { return $false }
134:   $transientCount = Get-StatusInt -StatusObject $StatusObject -Name "transient_failures"
135:   $prunableCount = Get-StatusInt -StatusObject $StatusObject -Name "prunable_failures"
136:   $prunedCount = Get-StatusInt -StatusObject $StatusObject -Name "pruned"
137:   if ($transientCount -gt 0 -and $prunableCount -eq 0 -and $prunedCount -eq 0) { return $true }
138:   return $false
139: }
---
132:   if ($null -eq $StatusObject) { return $false }
133:   if (("" + $StatusObject.status) -eq "PASS") { return $false }
134:   $transientCount = Get-StatusInt -StatusObject $StatusObject -Name "transient_failures"
135:   $prunableCount = Get-StatusInt -StatusObject $StatusObject -Name "prunable_failures"
136:   $prunedCount = Get-StatusInt -StatusObject $StatusObject -Name "pruned"
137:   if ($transientCount -gt 0 -and $prunableCount -eq 0 -and $prunedCount -eq 0) { return $true }
138:   return $false
139: }
140: 
---
183:       ended_utc = $Ended.ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ")
184:       duration_seconds = [int]($Ended - $Started).TotalSeconds
185:       publisher_lock = $PublisherLockPath
186:       failures = @()
187:       log = $LogPath
188:     }
189:     Write-Utf8NoBom -Path $StatusJson -Text ($summary | ConvertTo-Json -Depth 8)
190:     $lines = New-Object System.Collections.ArrayList
191:     [void]$lines.Add("# ScarFLIX v2 Auto Gate")
---
202: 
203: Write-Step "INFO" ("Auto gate starting DelayedQaSeconds={0}" -f $DelayedQaSeconds)
204: 
205: $activeRun = Invoke-ChildPs -Script $ActiveGateScript -ChildArgs @("-MaxItems", "0", "-Retries", "2", "-PruneFailed", "-VisibleOnly")
206: $visibleRun = Invoke-ChildPs -Script $VisibleQaScript -ChildArgs @("-MaxItems", "0", "-TimeoutSeconds", "45")
207: $publisher = [ordered]@{ script=$PublisherScript; exit_code=$null; ok=$true; output_tail="not needed" }
208: 
209: $activeGate = Read-JsonSafe (Join-Path $PublishRoot "webdav_active_gate_status.json")
210: $visible = Read-JsonSafe (Join-Path $PublishRoot "visible_catalog_qa_status.json")
---
203: Write-Step "INFO" ("Auto gate starting DelayedQaSeconds={0}" -f $DelayedQaSeconds)
204: 
205: $activeRun = Invoke-ChildPs -Script $ActiveGateScript -ChildArgs @("-MaxItems", "0", "-Retries", "2", "-PruneFailed", "-VisibleOnly")
206: $visibleRun = Invoke-ChildPs -Script $VisibleQaScript -ChildArgs @("-MaxItems", "0", "-TimeoutSeconds", "45")
207: $publisher = [ordered]@{ script=$PublisherScript; exit_code=$null; ok=$true; output_tail="not needed" }
208: 
209: $activeGate = Read-JsonSafe (Join-Path $PublishRoot "webdav_active_gate_status.json")
210: $visible = Read-JsonSafe (Join-Path $PublishRoot "visible_catalog_qa_status.json")
211: $decision = Read-JsonSafe (Join-Path $PublishRoot "plex_client_decision_qa_status.json")
---
206: $visibleRun = Invoke-ChildPs -Script $VisibleQaScript -ChildArgs @("-MaxItems", "0", "-TimeoutSeconds", "45")
207: $publisher = [ordered]@{ script=$PublisherScript; exit_code=$null; ok=$true; output_tail="not needed" }
208: 
209: $activeGate = Read-JsonSafe (Join-Path $PublishRoot "webdav_active_gate_status.json")
210: $visible = Read-JsonSafe (Join-Path $PublishRoot "visible_catalog_qa_status.json")
211: $decision = Read-JsonSafe (Join-Path $PublishRoot "plex_client_decision_qa_status.json")
212: $activeGateTransientOnly = Test-ActiveGateTransientOnly -StatusObject $activeGate
213: $visibleChecked = 0
214: if ($null -ne $visible) { try { [void][int]::TryParse(("" + $visible.checked), [ref]$visibleChecked) } catch {} }
---
209: $activeGate = Read-JsonSafe (Join-Path $PublishRoot "webdav_active_gate_status.json")
210: $visible = Read-JsonSafe (Join-Path $PublishRoot "visible_catalog_qa_status.json")
211: $decision = Read-JsonSafe (Join-Path $PublishRoot "plex_client_decision_qa_status.json")
212: $activeGateTransientOnly = Test-ActiveGateTransientOnly -StatusObject $activeGate
213: $visibleChecked = 0
214: if ($null -ne $visible) { try { [void][int]::TryParse(("" + $visible.checked), [ref]$visibleChecked) } catch {} }
215: $decisionRun = [ordered]@{ script=$DecisionQaScript; exit_code=$null; ok=$true; output_tail="fresh PASS reused" }
216: if (!(Test-FreshPassStatus -StatusObject $decision -FreshMinutes 30 -MinimumChecked $visibleChecked)) {
217:   $decisionRun = Invoke-ChildPs -Script $DecisionQaScript -ChildArgs @("-MaxItems", "0", "-TimeoutSeconds", "45", "-Retries", "1")
---
214: if ($null -ne $visible) { try { [void][int]::TryParse(("" + $visible.checked), [ref]$visibleChecked) } catch {} }
215: $decisionRun = [ordered]@{ script=$DecisionQaScript; exit_code=$null; ok=$true; output_tail="fresh PASS reused" }
216: if (!(Test-FreshPassStatus -StatusObject $decision -FreshMinutes 30 -MinimumChecked $visibleChecked)) {
217:   $decisionRun = Invoke-ChildPs -Script $DecisionQaScript -ChildArgs @("-MaxItems", "0", "-TimeoutSeconds", "45", "-Retries", "1")
218:   $decision = Read-JsonSafe (Join-Path $PublishRoot "plex_client_decision_qa_status.json")
219: }
220: $health = Invoke-ChildPs -Script $HealthScript -ChildArgs @()
221: $healthStatus = Read-JsonSafe (Join-Path $PublishRoot "scarflix_v2_health.json")
222: $webdavStatus = Read-JsonSafe (Join-Path $PublishRoot "webdav_virtual_catalog_status.json")
---
222: $webdavStatus = Read-JsonSafe (Join-Path $PublishRoot "webdav_virtual_catalog_status.json")
223: 
224: $needsRepair = $false
225: if ($null -eq $activeGate) {
226:   $needsRepair = $true
227: } elseif (("" + $activeGate.status) -ne "PASS") {
228:   if ($activeGateTransientOnly) {
229:     Write-Step "REVIEW" "WebDAV active gate has transient provider failures only; destructive repair is skipped."
230:   } else {
---
224: $needsRepair = $false
225: if ($null -eq $activeGate) {
226:   $needsRepair = $true
227: } elseif (("" + $activeGate.status) -ne "PASS") {
228:   if ($activeGateTransientOnly) {
229:     Write-Step "REVIEW" "WebDAV active gate has transient provider failures only; destructive repair is skipped."
230:   } else {
231:     $needsRepair = $true
232:   }
---
225: if ($null -eq $activeGate) {
226:   $needsRepair = $true
227: } elseif (("" + $activeGate.status) -ne "PASS") {
228:   if ($activeGateTransientOnly) {
229:     Write-Step "REVIEW" "WebDAV active gate has transient provider failures only; destructive repair is skipped."
230:   } else {
231:     $needsRepair = $true
232:   }
233: }
---
226:   $needsRepair = $true
227: } elseif (("" + $activeGate.status) -ne "PASS") {
228:   if ($activeGateTransientOnly) {
229:     Write-Step "REVIEW" "WebDAV active gate has transient provider failures only; destructive repair is skipped."
230:   } else {
231:     $needsRepair = $true
232:   }
233: }
234: if ($null -ne $activeGate) {
---
231:     $needsRepair = $true
232:   }
233: }
234: if ($null -ne $activeGate) {
235:   if ((Get-StatusInt -StatusObject $activeGate -Name "pruned") -gt 0) { $needsRepair = $true }
236:   if ((Get-StatusInt -StatusObject $activeGate -Name "prunable_failures") -gt 0) { $needsRepair = $true }
237: }
238: if ($null -eq $visible -or ("" + $visible.status) -ne "PASS") { $needsRepair = $true }
239: if ($null -eq $decision -or ("" + $decision.status) -ne "PASS") { $needsRepair = $true }
---
232:   }
233: }
234: if ($null -ne $activeGate) {
235:   if ((Get-StatusInt -StatusObject $activeGate -Name "pruned") -gt 0) { $needsRepair = $true }
236:   if ((Get-StatusInt -StatusObject $activeGate -Name "prunable_failures") -gt 0) { $needsRepair = $true }
237: }
238: if ($null -eq $visible -or ("" + $visible.status) -ne "PASS") { $needsRepair = $true }
239: if ($null -eq $decision -or ("" + $decision.status) -ne "PASS") { $needsRepair = $true }
240: if ($needsRepair) {
---
233: }
234: if ($null -ne $activeGate) {
235:   if ((Get-StatusInt -StatusObject $activeGate -Name "pruned") -gt 0) { $needsRepair = $true }
236:   if ((Get-StatusInt -StatusObject $activeGate -Name "prunable_failures") -gt 0) { $needsRepair = $true }
237: }
238: if ($null -eq $visible -or ("" + $visible.status) -ne "PASS") { $needsRepair = $true }
239: if ($null -eq $decision -or ("" + $decision.status) -ne "PASS") { $needsRepair = $true }
240: if ($needsRepair) {
241:   Write-Step "REVIEW" "Fast gate failed; running local visible-row repair first."
---
``

## D:\PlexTools\Scripts\scarflix_v2\ScarFLIX_v2_AutonomousCatalogPipeline.ps1
``text
25: $GateScript = Join-Path $ScriptRoot "ScarFLIX_v2_CatalogVisibilityGate.ps1"
26: $PromoterScript = Join-Path $ScriptRoot "ScarFLIX_v2_CatalogPromoter.ps1"
27: $HealthScript = Join-Path $ScriptRoot "ScarFLIX_v2_HealthStatus.ps1"
28: $QaScript = Join-Path $ScriptRoot "ScarFLIX_v2_VisibleCatalogQA.ps1"
29: $StatusJson = Join-Path $PublishRoot "autonomous_catalog_pipeline_status.json"
30: $StatusMd = Join-Path $PublishRoot "autonomous_catalog_pipeline_status.md"
31: $LogPath = Join-Path $LogRoot ("scarflix_v2_autonomous_catalog_pipeline_{0}.log" -f (Get-Date -Format "yyyyMMdd"))
32: $LockPath = Join-Path $StateRoot "autonomous_catalog_pipeline.lock"
33: $TaskName = "ScarFLIX_v2_AutonomousCatalogPipeline"
---
85:     try {
86:       $age = (Get-Date) - (Get-Item -LiteralPath $LockPath).LastWriteTime
87:       if ($age.TotalMinutes -lt 45) {
88:         Write-Step "REVIEW" "Autonomous catalog pipeline lock is active."
89:         return $false
90:       }
91:       Remove-Item -LiteralPath $LockPath -Force -ErrorAction SilentlyContinue
92:     } catch {}
93:   }
---
96:     Set-Content -LiteralPath $LockPath -Value ("pid={0};utc={1}" -f $processIdValue,(Get-Date).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ")) -Encoding UTF8 -Force
97:     return $true
98:   } catch {
99:     Write-Step "FAIL" ("Could not create pipeline lock: {0}" -f $_.Exception.Message)
100:     return $false
101:   }
102: }
103: 
104: function Release-Lock {
---
184:   }
185:   try {
186:     if ($null -eq $headers) {
187:       $resp = Invoke-RestMethod -Uri $url -UseBasicParsing -TimeoutSec 15 -ErrorAction Stop
188:     } else {
189:       $resp = Invoke-RestMethod -Uri $url -Headers $headers -UseBasicParsing -TimeoutSec 15 -ErrorAction Stop
190:     }
191:     return ([bool]$resp.adult)
192:   } catch {
---
186:     if ($null -eq $headers) {
187:       $resp = Invoke-RestMethod -Uri $url -UseBasicParsing -TimeoutSec 15 -ErrorAction Stop
188:     } else {
189:       $resp = Invoke-RestMethod -Uri $url -Headers $headers -UseBasicParsing -TimeoutSec 15 -ErrorAction Stop
190:     }
191:     return ([bool]$resp.adult)
192:   } catch {
193:     return $false
194:   }
---
214:   if (!(Test-Path -LiteralPath $PlexSqlite)) { return "" }
215:   if (!(Test-Path -LiteralPath $PlexDb)) { return "" }
216:   try {
217:     $sqlText = ".timeout 10000`r`n" + $Sql
218:     $out = $sqlText | & $PlexSqlite -separator "`t" $PlexDb 2>&1
219:     return (($out | Out-String).Trim())
220:   } catch {
221:     return $_.Exception.Message
222:   }
---
355:     Copy-Item -LiteralPath $source -Destination $original -Force -ErrorAction Stop
356:     return [ordered]@{ status="OK"; path=$original; note="restored from stage"; section_id=[int]$Candidate.section_id }
357:   } catch {
358:     return [ordered]@{ status="FAIL"; path=$original; note=(ConvertTo-AsciiText $_.Exception.Message); section_id=[int]$Candidate.section_id }
359:   }
360: }
361: 
362: function Invoke-Script {
363:   param([string]$Name, [string]$Path, [string[]]$Arguments, [string]$StatusPath)
---
361: 
362: function Invoke-Script {
363:   param([string]$Name, [string]$Path, [string[]]$Arguments, [string]$StatusPath)
364:   $item = [ordered]@{ name=$Name; status="FAIL"; exit_code=-1; duration_seconds=0; status_file=$StatusPath; note="" }
365:   if (!(Test-Path -LiteralPath $Path)) {
366:     $item.note = "script missing"
367:     return $item
368:   }
369:   $argList = @("-NoProfile","-ExecutionPolicy","Bypass","-File",$Path)
---
388: 
389: function Invoke-PlexDirectoryScan {
390:   param([int]$Section, [string]$Directory)
391:   $item = [ordered]@{ section_id=$Section; directory=(ConvertTo-AsciiText $Directory); status="FAIL"; exit_code=-1; duration_seconds=0 }
392:   if (!(Test-Path -LiteralPath $PlexScanner)) {
393:     $item.status = "REVIEW"
394:     $item.note = "Plex scanner missing"
395:     return $item
396:   }
---
390:   param([int]$Section, [string]$Directory)
391:   $item = [ordered]@{ section_id=$Section; directory=(ConvertTo-AsciiText $Directory); status="FAIL"; exit_code=-1; duration_seconds=0 }
392:   if (!(Test-Path -LiteralPath $PlexScanner)) {
393:     $item.status = "REVIEW"
394:     $item.note = "Plex scanner missing"
395:     return $item
396:   }
397:   if ([string]::IsNullOrWhiteSpace($Directory) -or !(Test-Path -LiteralPath $Directory)) {
398:     $item.status = "REVIEW"
---
395:     return $item
396:   }
397:   if ([string]::IsNullOrWhiteSpace($Directory) -or !(Test-Path -LiteralPath $Directory)) {
398:     $item.status = "REVIEW"
399:     $item.note = "scan directory missing"
400:     return $item
401:   }
402:   $start = Get-Date
403:   try {
---
404:     Write-Step "INFO" ("Scanning Plex section {0} directory {1}" -f $Section,$Directory)
405:     $proc = Start-Process -FilePath $PlexScanner -ArgumentList @("--scan","--refresh","--section",("" + $Section),"--directory",$Directory) -NoNewWindow -Wait -PassThru
406:     $item.exit_code = [int]$proc.ExitCode
407:     if ($item.exit_code -eq 0) { $item.status = "PASS" } else { $item.status = "REVIEW" }
408:   } catch {
409:     $item.note = ConvertTo-AsciiText $_.Exception.Message
410:   }
411:   $item.duration_seconds = [int]((Get-Date) - $start).TotalSeconds
412:   return $item
---
433: Write-Step "INFO" ("Autonomous catalog pipeline starting MaxRestoreItems={0} MaxPromoteItems={1}" -f $MaxRestoreItems,$MaxPromoteItems)
434: 
435: if (!(Acquire-Lock)) {
436:   $status = "REVIEW"
437:   [void]$warnings.Add("lock busy")
438: } else {
439:   try {
440:     $candidates = @(Read-StagedCandidates)
441:     Write-Step "INFO" ("Staged candidates found: {0}" -f $candidates.Count)
---
450:       $restore = Restore-Candidate -Candidate $candidate
451:       [void]$restored.Add($restore)
452:       if ($restore.status -ne "OK") {
453:         $status = "REVIEW"
454:         [void]$warnings.Add(("restore failed: {0}" -f $restore.path))
455:       }
456:     }
457: 
458:     $scanMap = @{}
---
451:       [void]$restored.Add($restore)
452:       if ($restore.status -ne "OK") {
453:         $status = "REVIEW"
454:         [void]$warnings.Add(("restore failed: {0}" -f $restore.path))
455:       }
456:     }
457: 
458:     $scanMap = @{}
459:     foreach ($item in @($restored)) {
---
478:     Write-Step "INFO" ("Hidden raw rows available for restored candidates: {0}" -f $hiddenRows.Count)
479:     [void]$steps.Add((Invoke-Script -Name "CatalogPromoter" -Path $PromoterScript -Arguments @("-MaxItems",("" + $MaxPromoteItems)) -StatusPath (Join-Path $PublishRoot "catalog_promoter_status.json")))
480:     [void]$steps.Add((Invoke-Script -Name "CatalogVisibilityGateFinal" -Path $GateScript -Arguments @("-HideUnready","-MaxItems","500") -StatusPath (Join-Path $PublishRoot "catalog_visibility_gate_status.json")))
481:     [void]$steps.Add((Invoke-Script -Name "VisibleCatalogQA" -Path $QaScript -Arguments @("-HideFailed","-MaxItems","0") -StatusPath (Join-Path $PublishRoot "visible_catalog_qa_status.json")))
482:     [void]$steps.Add((Invoke-Script -Name "HealthStatus" -Path $HealthScript -Arguments @() -StatusPath (Join-Path $PublishRoot "scarflix_v2_health.json")))
483:   } finally {
484:     Release-Lock
485:   }
486: }
---
486: }
487: 
488: foreach ($scan in @($scans)) {
489:   if ($scan.status -ne "PASS") { $status = "REVIEW"; [void]$warnings.Add(("scan issue section {0}" -f $scan.section_id)) }
490: }
491: foreach ($step in @($steps)) {
492:   if ($step.status -eq "FAIL") { $status = "FAIL"; [void]$errors.Add(("step failed: {0}" -f $step.name)) }
493:   if ($step.status -eq "REVIEW") { $status = "REVIEW"; [void]$warnings.Add(("step review: {0}" -f $step.name)) }
494: }
---
489:   if ($scan.status -ne "PASS") { $status = "REVIEW"; [void]$warnings.Add(("scan issue section {0}" -f $scan.section_id)) }
490: }
491: foreach ($step in @($steps)) {
492:   if ($step.status -eq "FAIL") { $status = "FAIL"; [void]$errors.Add(("step failed: {0}" -f $step.name)) }
493:   if ($step.status -eq "REVIEW") { $status = "REVIEW"; [void]$warnings.Add(("step review: {0}" -f $step.name)) }
494: }
495: if ($restored.Count -eq 0 -and $status -eq "PASS") {
496:   $status = "REVIEW"
497:   [void]$warnings.Add("no candidates restored")
---
``

## D:\PlexTools\Scripts\scarflix_v2\ScarFLIX_v2_AutonomousController.ps1
``text
20: $TokenRoot = "C:\Users\jason\OneDrive\Public\TOKENS"
21: 
22: $ControllerTaskName = "ScarFLIX_v2_AutonomousController"
23: $PlatformRunnerTaskName = "ScarFLIX_v2_PlatformGate_LocalRunner_Detached"
24: $PlatformRunnerCmd = Join-Path $ScriptRoot "ScarFLIX_v2_PlatformGate_LocalRunner.cmd"
25: $SourceQuarantineScript = Join-Path $ScriptRoot "ScarFLIX_v2_SourceQuarantine.ps1"
26: $CandidateSourceModelScript = Join-Path $ScriptRoot "ScarFLIX_v2_CandidateSourceModel.ps1"
27: 
28: $ControllerLockPath = Join-Path $StateRoot "autonomous_controller.lock"
---
21: 
22: $ControllerTaskName = "ScarFLIX_v2_AutonomousController"
23: $PlatformRunnerTaskName = "ScarFLIX_v2_PlatformGate_LocalRunner_Detached"
24: $PlatformRunnerCmd = Join-Path $ScriptRoot "ScarFLIX_v2_PlatformGate_LocalRunner.cmd"
25: $SourceQuarantineScript = Join-Path $ScriptRoot "ScarFLIX_v2_SourceQuarantine.ps1"
26: $CandidateSourceModelScript = Join-Path $ScriptRoot "ScarFLIX_v2_CandidateSourceModel.ps1"
27: 
28: $ControllerLockPath = Join-Path $StateRoot "autonomous_controller.lock"
29: $ControllerRetryStatePath = Join-Path $StateRoot "autonomous_controller_retry_state.json"
---
39: $CandidateSourceModelJsonPath = Join-Path $PublicRootV2 "candidate_source_model_status.json"
40: $CandidateSourceModelMdPath = Join-Path $PublicRootV2 "candidate_source_model_status.md"
41: $PlatformStatusPath = Join-Path $PublicRoot "platform_gate_status.json"
42: $ActiveGateStatusPath = Join-Path $PublicRoot "webdav_active_gate_status.json"
43: $HealthStatusPath = Join-Path $PublicRoot "scarflix_v2_health.json"
44: 
45: $OverlapTasks = @(
46:   "ScarFLIX_v2_PlatformGate",
47:   "ScarFLIX_v2_SafeWebDavExpansionPipeline",
---
43: $HealthStatusPath = Join-Path $PublicRoot "scarflix_v2_health.json"
44: 
45: $OverlapTasks = @(
46:   "ScarFLIX_v2_PlatformGate",
47:   "ScarFLIX_v2_SafeWebDavExpansionPipeline",
48:   "ScarFLIX_v2_Publisher",
49:   "ScarFLIX_v2_WebDavVirtualCatalogPublisher",
50:   "ScarFLIX_v2_AutoGate",
51:   "ScarFLIX_v2_VisibleCatalogQA",
---
48:   "ScarFLIX_v2_Publisher",
49:   "ScarFLIX_v2_WebDavVirtualCatalogPublisher",
50:   "ScarFLIX_v2_AutoGate",
51:   "ScarFLIX_v2_VisibleCatalogQA",
52:   "ScarFLIX_v2_PlexDecisionQA",
53:   "ScarFLIX_v2_PlexClientDecisionQA",
54:   "ScarFLIX_v2_ConcurrentQA",
55:   "ScarFLIX_v2_ConcurrentStreamQA"
56: )
---
49:   "ScarFLIX_v2_WebDavVirtualCatalogPublisher",
50:   "ScarFLIX_v2_AutoGate",
51:   "ScarFLIX_v2_VisibleCatalogQA",
52:   "ScarFLIX_v2_PlexDecisionQA",
53:   "ScarFLIX_v2_PlexClientDecisionQA",
54:   "ScarFLIX_v2_ConcurrentQA",
55:   "ScarFLIX_v2_ConcurrentStreamQA"
56: )
57: 
---
51:   "ScarFLIX_v2_VisibleCatalogQA",
52:   "ScarFLIX_v2_PlexDecisionQA",
53:   "ScarFLIX_v2_PlexClientDecisionQA",
54:   "ScarFLIX_v2_ConcurrentQA",
55:   "ScarFLIX_v2_ConcurrentStreamQA"
56: )
57: 
58: function Ensure-Dir {
59:   param([string]$Path)
---
52:   "ScarFLIX_v2_PlexDecisionQA",
53:   "ScarFLIX_v2_PlexClientDecisionQA",
54:   "ScarFLIX_v2_ConcurrentQA",
55:   "ScarFLIX_v2_ConcurrentStreamQA"
56: )
57: 
58: function Ensure-Dir {
59:   param([string]$Path)
60:   if ([string]::IsNullOrWhiteSpace($Path)) { return }
---
145: 
146: function Ensure-PlatformRunnerTask {
147:   $startTime = (Get-Date).AddMinutes(1).ToString("HH:mm")
148:   $taskRun = 'cmd.exe /c ""D:\PlexTools\Scripts\scarflix_v2\ScarFLIX_v2_PlatformGate_LocalRunner.cmd" --task"'
149:   try {
150:     & schtasks.exe /Create /TN $PlatformRunnerTaskName /TR $taskRun /SC ONCE /ST $startTime /RL LIMITED /F | Out-Null
151:     return $true
152:   } catch {
153:     return $false
---
205:   )
206:   if (!(Test-Path -LiteralPath $LocalPath)) { return [ordered]@{ path=$RemotePath; status="SKIP"; reason="local file missing" } }
207:   $content = ""
208:   try { $content = Get-Content -LiteralPath $LocalPath -Raw } catch { return [ordered]@{ path=$RemotePath; status="FAIL"; reason="local read failed" } }
209:   $owner = "r0cksteadyw00t"
210:   $repo = "plex-logs"
211:   $branch = "main"
212:   $headers = New-GitHubHeaders -Token [REDACTED]
213:   $sha = $null
---
213:   $sha = $null
214:   try {
215:     $getUri = "https://api.github.com/repos/{0}/{1}/contents/{2}?ref={3}" -f $owner,$repo,$RemotePath,$branch
216:     $existing = Invoke-RestMethod -UseBasicParsing -Uri $getUri -Headers $headers -Method Get -TimeoutSec 20 -ErrorAction Stop
217:     if ($existing -and $existing.sha) { $sha = "" + $existing.sha }
218:   } catch {}
219:   $body = @{
220:     message = $Message
221:     content = [Convert]::ToBase64String([Text.Encoding]::UTF8.GetBytes($content))
---
224:   if ($sha) { $body.sha = $sha }
225:   try {
226:     $putUri = "https://api.github.com/repos/{0}/{1}/contents/{2}" -f $owner,$repo,$RemotePath
227:     Invoke-RestMethod -UseBasicParsing -Uri $putUri -Headers $headers -Method Put -TimeoutSec 30 -Body ($body | ConvertTo-Json -Depth 8) -ErrorAction Stop | Out-Null
228:     return [ordered]@{ path=$RemotePath; status="PASS"; reason="" }
229:   } catch {
230:     return [ordered]@{ path=$RemotePath; status="REVIEW"; reason=("publish failed: " + $_.Exception.Message) }
231:   }
232: }
---
227:     Invoke-RestMethod -UseBasicParsing -Uri $putUri -Headers $headers -Method Put -TimeoutSec 30 -Body ($body | ConvertTo-Json -Depth 8) -ErrorAction Stop | Out-Null
228:     return [ordered]@{ path=$RemotePath; status="PASS"; reason="" }
229:   } catch {
230:     return [ordered]@{ path=$RemotePath; status="REVIEW"; reason=("publish failed: " + $_.Exception.Message) }
231:   }
232: }
233: 
234: function Publish-ControllerStatus {
235:   $token = [REDACTED]
---
234: function Publish-ControllerStatus {
235:   $token = [REDACTED]
236:   $publish = [ordered]@{
237:     status = "REVIEW"
238:     updated_utc = (Get-Date).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ")
239:     items = @()
240:     json_url = "https://raw.githubusercontent.com/r0cksteadyw00t/plex-logs/main/latest/scarflix_v2/autonomous_controller_status.json"
241:     markdown_url = "https://raw.githubusercontent.com/r0cksteadyw00t/plex-logs/main/latest/scarflix_v2/autonomous_controller_status.md"
242:   }
---
254:   $publish.items = $items
255:   $publish.status = "PASS"
256:   foreach ($item in @($items)) {
257:     if (("" + $item.status) -eq "FAIL") { $publish.status = "FAIL" }
258:     if (("" + $item.status) -eq "REVIEW" -and $publish.status -eq "PASS") { $publish.status = "REVIEW" }
259:   }
260:   Write-JsonFile -Path $PublishStatusPath -Object $publish
261:   return $publish
262: }
---
255:   $publish.status = "PASS"
256:   foreach ($item in @($items)) {
257:     if (("" + $item.status) -eq "FAIL") { $publish.status = "FAIL" }
258:     if (("" + $item.status) -eq "REVIEW" -and $publish.status -eq "PASS") { $publish.status = "REVIEW" }
259:   }
260:   Write-JsonFile -Path $PublishStatusPath -Object $publish
261:   return $publish
262: }
263: 
---
273:   [void]$lines.Add(("Current step: {0}" -f $Status.current_step))
274:   [void]$lines.Add(("Jason action required: {0}" -f $Status.jason_action_required))
275:   [void]$lines.Add("")
276:   [void]$lines.Add("## PlatformGate")
277:   [void]$lines.Add(("- runner_running: {0}" -f $Status.platform_gate.runner_running))
278:   [void]$lines.Add(("- status: {0}" -f $Status.platform_gate.status))
279:   [void]$lines.Add(("- stage: {0}" -f $Status.platform_gate.stage))
280:   [void]$lines.Add(("- visible: {0}" -f $Status.platform_gate.visible_count))
281:   [void]$lines.Add(("- transient_failures: {0}" -f $Status.platform_gate.transient_failures))
---
278:   [void]$lines.Add(("- status: {0}" -f $Status.platform_gate.status))
279:   [void]$lines.Add(("- stage: {0}" -f $Status.platform_gate.stage))
280:   [void]$lines.Add(("- visible: {0}" -f $Status.platform_gate.visible_count))
281:   [void]$lines.Add(("- transient_failures: {0}" -f $Status.platform_gate.transient_failures))
282:   [void]$lines.Add(("- prunable_failures: {0}" -f $Status.platform_gate.prunable_failures))
283:   [void]$lines.Add("")
284:   [void]$lines.Add("## Candidate Source Model")
285:   [void]$lines.Add(("- status: {0}" -f $Status.candidate_source_model.status))
286:   [void]$lines.Add(("- status_file: {0}" -f $Status.candidate_source_model.status_json))
---
``

## D:\PlexTools\Scripts\scarflix_v2\ScarFLIX_v2_AutonomousController_Run.ps1
``text
34:   Write-RunLog ("Autonomous controller scheduled run finished with exit code {0}." -f $exitCode)
35:   exit $exitCode
36: } catch {
37:   Write-RunLog ("Autonomous controller scheduled run failed: {0}" -f $_.Exception.Message)
38:   exit 1
39: }
---
``

## D:\PlexTools\Scripts\scarflix_v2\ScarFLIX_v2_AutonomousController_Status.ps1
``text
75: if ($candidate) {
76:   Write-Host ("Candidate model:      {0}" -f (Get-PropValue -Object $candidate -Name "status" -Default "UNKNOWN"))
77: } else {
78:   Write-Host "Candidate model:      pending PlatformGate PASS"
79: }
80: 
81: Write-Host ("Status JSON:          {0}" -f $StatusJsonPath)
82: Write-Host ("Status markdown:      {0}" -f $StatusMdPath)
83: Write-Host ("Candidate JSON:       {0}" -f $CandidateSourceModelJsonPath)
---
86: Write-Host "Public markdown URL:  https://raw.githubusercontent.com/r0cksteadyw00t/plex-logs/main/latest/scarflix_v2/autonomous_controller_status.md"
87: 
88: if ($status -and (Get-PropValue -Object $status -Name "status" -Default "") -eq "PASS") { exit 0 }
89: if ($status -and ("" + (Get-PropValue -Object $status -Name "status" -Default "")) -match "^BLOCKED_|^FAIL_") { exit 1 }
90: exit 2
---
``

## D:\PlexTools\Scripts\scarflix_v2\ScarFLIX_v2_CandidateSourceModel.ps1
``text
53: $quarantineText = Read-TextFile $SourceQuarantineScript
54: 
55: $checks = New-Object System.Collections.ArrayList
56: Add-Check $checks "platform_gate_pass_required" ($platformStatus -eq "PASS") ("PlatformGate status is {0}" -f $platformStatus)
57: Add-Check $checks "seeder_rejected_stage_hash_guard" ($seederText -match "RejectedStageHashes|rejected_stage_skipped") "Seeder records/skips exact rejected stage hashes."
58: Add-Check $checks "seeder_stage_only_not_plex_visible" ($seederText -match "stage-only live catalog candidate; raw \\.strm never exposed to Plex scan path") "Raw candidates are staged outside Plex visibility."
59: Add-Check $checks "publisher_candidate_reject_function" ($publisherText -match "function\s+Reject-StagedCandidate|Reject-StagedCandidate") "Publisher rejects failed staged candidates, not whole titles."
60: Add-Check $checks "publisher_rejected_hash_skip" ($publisherText -match "candidates_skipped_rejected|Skipped pending candidate because the same stage hash was already rejected") "Publisher skips exact failed source hashes."
61: Add-Check $checks "publisher_qa_failure_source_reject" ($publisherText -match "Rejected mapped item after QA failure|Reject-FailedMappedItems") "Publisher can reject failed source/release after QA."
---
56: Add-Check $checks "platform_gate_pass_required" ($platformStatus -eq "PASS") ("PlatformGate status is {0}" -f $platformStatus)
57: Add-Check $checks "seeder_rejected_stage_hash_guard" ($seederText -match "RejectedStageHashes|rejected_stage_skipped") "Seeder records/skips exact rejected stage hashes."
58: Add-Check $checks "seeder_stage_only_not_plex_visible" ($seederText -match "stage-only live catalog candidate; raw \\.strm never exposed to Plex scan path") "Raw candidates are staged outside Plex visibility."
59: Add-Check $checks "publisher_candidate_reject_function" ($publisherText -match "function\s+Reject-StagedCandidate|Reject-StagedCandidate") "Publisher rejects failed staged candidates, not whole titles."
60: Add-Check $checks "publisher_rejected_hash_skip" ($publisherText -match "candidates_skipped_rejected|Skipped pending candidate because the same stage hash was already rejected") "Publisher skips exact failed source hashes."
61: Add-Check $checks "publisher_qa_failure_source_reject" ($publisherText -match "Rejected mapped item after QA failure|Reject-FailedMappedItems") "Publisher can reject failed source/release after QA."
62: Add-Check $checks "source_quarantine_exists" (Test-Path -LiteralPath $SourceQuarantineScript) "Source quarantine script exists."
63: Add-Check $checks "source_quarantine_transient_skip_default" ($quarantineText -match "skipped_transient|Test-TransientCode" -and $quarantineText -match "IncludeTransient") "Transient failures are skipped unless explicitly included."
64: Add-Check $checks "source_quarantine_reason_codes" ($quarantineText -match "reason_code|Get-ReasonCode") "Quarantine records source/release reason codes."
---
57: Add-Check $checks "seeder_rejected_stage_hash_guard" ($seederText -match "RejectedStageHashes|rejected_stage_skipped") "Seeder records/skips exact rejected stage hashes."
58: Add-Check $checks "seeder_stage_only_not_plex_visible" ($seederText -match "stage-only live catalog candidate; raw \\.strm never exposed to Plex scan path") "Raw candidates are staged outside Plex visibility."
59: Add-Check $checks "publisher_candidate_reject_function" ($publisherText -match "function\s+Reject-StagedCandidate|Reject-StagedCandidate") "Publisher rejects failed staged candidates, not whole titles."
60: Add-Check $checks "publisher_rejected_hash_skip" ($publisherText -match "candidates_skipped_rejected|Skipped pending candidate because the same stage hash was already rejected") "Publisher skips exact failed source hashes."
61: Add-Check $checks "publisher_qa_failure_source_reject" ($publisherText -match "Rejected mapped item after QA failure|Reject-FailedMappedItems") "Publisher can reject failed source/release after QA."
62: Add-Check $checks "source_quarantine_exists" (Test-Path -LiteralPath $SourceQuarantineScript) "Source quarantine script exists."
63: Add-Check $checks "source_quarantine_transient_skip_default" ($quarantineText -match "skipped_transient|Test-TransientCode" -and $quarantineText -match "IncludeTransient") "Transient failures are skipped unless explicitly included."
64: Add-Check $checks "source_quarantine_reason_codes" ($quarantineText -match "reason_code|Get-ReasonCode") "Quarantine records source/release reason codes."
65: 
---
58: Add-Check $checks "seeder_stage_only_not_plex_visible" ($seederText -match "stage-only live catalog candidate; raw \\.strm never exposed to Plex scan path") "Raw candidates are staged outside Plex visibility."
59: Add-Check $checks "publisher_candidate_reject_function" ($publisherText -match "function\s+Reject-StagedCandidate|Reject-StagedCandidate") "Publisher rejects failed staged candidates, not whole titles."
60: Add-Check $checks "publisher_rejected_hash_skip" ($publisherText -match "candidates_skipped_rejected|Skipped pending candidate because the same stage hash was already rejected") "Publisher skips exact failed source hashes."
61: Add-Check $checks "publisher_qa_failure_source_reject" ($publisherText -match "Rejected mapped item after QA failure|Reject-FailedMappedItems") "Publisher can reject failed source/release after QA."
62: Add-Check $checks "source_quarantine_exists" (Test-Path -LiteralPath $SourceQuarantineScript) "Source quarantine script exists."
63: Add-Check $checks "source_quarantine_transient_skip_default" ($quarantineText -match "skipped_transient|Test-TransientCode" -and $quarantineText -match "IncludeTransient") "Transient failures are skipped unless explicitly included."
64: Add-Check $checks "source_quarantine_reason_codes" ($quarantineText -match "reason_code|Get-ReasonCode") "Quarantine records source/release reason codes."
65: 
66: $failed = @($checks.ToArray() | Where-Object { !$_.pass })
---
60: Add-Check $checks "publisher_rejected_hash_skip" ($publisherText -match "candidates_skipped_rejected|Skipped pending candidate because the same stage hash was already rejected") "Publisher skips exact failed source hashes."
61: Add-Check $checks "publisher_qa_failure_source_reject" ($publisherText -match "Rejected mapped item after QA failure|Reject-FailedMappedItems") "Publisher can reject failed source/release after QA."
62: Add-Check $checks "source_quarantine_exists" (Test-Path -LiteralPath $SourceQuarantineScript) "Source quarantine script exists."
63: Add-Check $checks "source_quarantine_transient_skip_default" ($quarantineText -match "skipped_transient|Test-TransientCode" -and $quarantineText -match "IncludeTransient") "Transient failures are skipped unless explicitly included."
64: Add-Check $checks "source_quarantine_reason_codes" ($quarantineText -match "reason_code|Get-ReasonCode") "Quarantine records source/release reason codes."
65: 
66: $failed = @($checks.ToArray() | Where-Object { !$_.pass })
67: $status = "PASS"
68: if ($platformStatus -ne "PASS") { $status = "PENDING" }
---
63: Add-Check $checks "source_quarantine_transient_skip_default" ($quarantineText -match "skipped_transient|Test-TransientCode" -and $quarantineText -match "IncludeTransient") "Transient failures are skipped unless explicitly included."
64: Add-Check $checks "source_quarantine_reason_codes" ($quarantineText -match "reason_code|Get-ReasonCode") "Quarantine records source/release reason codes."
65: 
66: $failed = @($checks.ToArray() | Where-Object { !$_.pass })
67: $status = "PASS"
68: if ($platformStatus -ne "PASS") { $status = "PENDING" }
69: elseif ($failed.Count -gt 0) { $status = "REVIEW" }
70: 
71: $summary = [ordered]@{
---
66: $failed = @($checks.ToArray() | Where-Object { !$_.pass })
67: $status = "PASS"
68: if ($platformStatus -ne "PASS") { $status = "PENDING" }
69: elseif ($failed.Count -gt 0) { $status = "REVIEW" }
70: 
71: $summary = [ordered]@{
72:   component = "scarflix_v2_candidate_source_model"
73:   status = $status
74:   updated_utc = (Get-Date).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ")
---
74:   updated_utc = (Get-Date).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ")
75:   platform_gate_status = $platformStatus
76:   model = [ordered]@{
77:     failed_source_release_quarantined = $true
78:     title_remains_wanted_retryable = $true
79:     alternate_candidates_preserved = $true
80:     transient_provider_failures_retry_held = $true
81:     permanent_policy_playback_failures_quarantine_source = $true
82:     publish_only_after_plex_safe_gate = $true
---
77:     failed_source_release_quarantined = $true
78:     title_remains_wanted_retryable = $true
79:     alternate_candidates_preserved = $true
80:     transient_provider_failures_retry_held = $true
81:     permanent_policy_playback_failures_quarantine_source = $true
82:     publish_only_after_plex_safe_gate = $true
83:     no_catalogue_expansion_before_gate_pass = $true
84:   }
85:   checks = @($checks.ToArray())
---
78:     title_remains_wanted_retryable = $true
79:     alternate_candidates_preserved = $true
80:     transient_provider_failures_retry_held = $true
81:     permanent_policy_playback_failures_quarantine_source = $true
82:     publish_only_after_plex_safe_gate = $true
83:     no_catalogue_expansion_before_gate_pass = $true
84:   }
85:   checks = @($checks.ToArray())
86:   blockers = @($failed | ForEach-Object { $_.name })
---
83:     no_catalogue_expansion_before_gate_pass = $true
84:   }
85:   checks = @($checks.ToArray())
86:   blockers = @($failed | ForEach-Object { $_.name })
87:   files = [ordered]@{
88:     status_json = $StatusJsonPath
89:     status_md = $StatusMdPath
90:     seeder = $SeederScript
91:     publisher = $PublisherScript
---
100: [void]$lines.Add("")
101: [void]$lines.Add(("Status: {0}" -f $summary.status))
102: [void]$lines.Add(("Updated UTC: {0}" -f $summary.updated_utc))
103: [void]$lines.Add(("PlatformGate status: {0}" -f $summary.platform_gate_status))
104: [void]$lines.Add("")
105: [void]$lines.Add("## Checks")
106: foreach ($check in @($checks.ToArray())) {
107:   [void]$lines.Add(("- {0}: {1} - {2}" -f $check.name,$check.pass,$check.detail))
108: }
---
108: }
109: [void]$lines.Add("")
110: [void]$lines.Add("## Model")
111: [void]$lines.Add("- Failed source/release is quarantined with a reason code.")
112: [void]$lines.Add("- Title remains wanted/retryable.")
113: [void]$lines.Add("- Alternate candidates are preserved.")
114: [void]$lines.Add("- Transient 429/503/provider timeout remains REVIEW/retry-held.")
115: [void]$lines.Add("- Permanent policy/playback failure quarantines only that source/release.")
116: [void]$lines.Add("- Plex visibility happens only after full Plex-safe gate.")
---
111: [void]$lines.Add("- Failed source/release is quarantined with a reason code.")
112: [void]$lines.Add("- Title remains wanted/retryable.")
113: [void]$lines.Add("- Alternate candidates are preserved.")
114: [void]$lines.Add("- Transient 429/503/provider timeout remains REVIEW/retry-held.")
115: [void]$lines.Add("- Permanent policy/playback failure quarantines only that source/release.")
116: [void]$lines.Add("- Plex visibility happens only after full Plex-safe gate.")
117: Write-Utf8NoBom -Path $StatusMdPath -Text (($lines.ToArray()) -join "`r`n")
118: 
119: if ($status -eq "PASS") { exit 0 }
---
112: [void]$lines.Add("- Title remains wanted/retryable.")
113: [void]$lines.Add("- Alternate candidates are preserved.")
114: [void]$lines.Add("- Transient 429/503/provider timeout remains REVIEW/retry-held.")
115: [void]$lines.Add("- Permanent policy/playback failure quarantines only that source/release.")
116: [void]$lines.Add("- Plex visibility happens only after full Plex-safe gate.")
117: Write-Utf8NoBom -Path $StatusMdPath -Text (($lines.ToArray()) -join "`r`n")
118: 
119: if ($status -eq "PASS") { exit 0 }
120: if ($status -eq "PENDING") { exit 2 }
---
``

## D:\PlexTools\Scripts\scarflix_v2\ScarFLIX_v2_CatalogEnricher.ps1
``text
25: $Updated = 0
26: $Skipped = 0
27: $NoMatch = 0
28: $Failed = 0
29: $ApiCalls = 0
30: $Warnings = New-Object System.Collections.ArrayList
31: $Results = New-Object System.Collections.ArrayList
32: 
33: function Ensure-Dir {
---
126:   if ($Path.Contains("?")) { $Glue = "&" }
127:   $Uri = "https://api.themoviedb.org/3/{0}{1}api_key=[REDACTED]" -f $Path, $Glue, [Uri]::EscapeDataString($ApiKey)
128:   $script:ApiCalls = $script:ApiCalls + 1
129:   return Invoke-RestMethod -Uri $Uri -UseBasicParsing -TimeoutSec 30 -ErrorAction Stop
130: }
131: 
132: function Backup-File {
133:   param([string]$Path)
134:   Ensure-Dir $BackupRoot
---
225:   param([string]$CatalogPath)
226:   $Catalog = Read-JsonSafe $CatalogPath
227:   if ($null -eq $Catalog) {
228:     $script:Failed = $script:Failed + 1
229:     [void]$Results.Add([ordered]@{ file = $CatalogPath; status = "FAIL"; reason = "invalid catalog json" })
230:     return
231:   }
232:   $Kind = "" + (Get-Prop -Object $Catalog -Name "kind" -Default "movie")
233:   if ($Kind -eq "episode") { $Kind = "tv" }
---
226:   $Catalog = Read-JsonSafe $CatalogPath
227:   if ($null -eq $Catalog) {
228:     $script:Failed = $script:Failed + 1
229:     [void]$Results.Add([ordered]@{ file = $CatalogPath; status = "FAIL"; reason = "invalid catalog json" })
230:     return
231:   }
232:   $Kind = "" + (Get-Prop -Object $Catalog -Name "kind" -Default "movie")
233:   if ($Kind -eq "episode") { $Kind = "tv" }
234:   if ($Kind -ne "movie" -and $Kind -ne "tv") { $Kind = "movie" }
---
267:         Log-Line "OK" ("Enriched catalog from request.json {0} -> tmdb:{1}" -f $CatalogPath, $RequestTmdb)
268:         return
269:       } catch {
270:         $script:Failed = $script:Failed + 1
271:         [void]$Results.Add([ordered]@{ file = $CatalogPath; status = "FAIL"; title = $Title; year = $Year; reason = (ConvertTo-AsciiText $_.Exception.Message) })
272:         Add-Warning ("Request metadata enrichment failed for {0}: {1}" -f $CatalogPath, $_.Exception.Message)
273:         return
274:       }
275:     }
---
268:         return
269:       } catch {
270:         $script:Failed = $script:Failed + 1
271:         [void]$Results.Add([ordered]@{ file = $CatalogPath; status = "FAIL"; title = $Title; year = $Year; reason = (ConvertTo-AsciiText $_.Exception.Message) })
272:         Add-Warning ("Request metadata enrichment failed for {0}: {1}" -f $CatalogPath, $_.Exception.Message)
273:         return
274:       }
275:     }
276:   }
---
269:       } catch {
270:         $script:Failed = $script:Failed + 1
271:         [void]$Results.Add([ordered]@{ file = $CatalogPath; status = "FAIL"; title = $Title; year = $Year; reason = (ConvertTo-AsciiText $_.Exception.Message) })
272:         Add-Warning ("Request metadata enrichment failed for {0}: {1}" -f $CatalogPath, $_.Exception.Message)
273:         return
274:       }
275:     }
276:   }
277: 
---
322:     [void]$Results.Add([ordered]@{ file = $CatalogPath; status = "PASS"; title = $Title; year = $Year; tmdb_id = $MatchId })
323:     Log-Line "OK" ("Enriched catalog {0} -> tmdb:{1}" -f $CatalogPath, $MatchId)
324:   } catch {
325:     $script:Failed = $script:Failed + 1
326:     [void]$Results.Add([ordered]@{ file = $CatalogPath; status = "FAIL"; title = $Title; year = $Year; reason = (ConvertTo-AsciiText $_.Exception.Message) })
327:     Add-Warning ("Enrichment failed for {0}: {1}" -f $CatalogPath, $_.Exception.Message)
328:   }
329: }
330: 
---
323:     Log-Line "OK" ("Enriched catalog {0} -> tmdb:{1}" -f $CatalogPath, $MatchId)
324:   } catch {
325:     $script:Failed = $script:Failed + 1
326:     [void]$Results.Add([ordered]@{ file = $CatalogPath; status = "FAIL"; title = $Title; year = $Year; reason = (ConvertTo-AsciiText $_.Exception.Message) })
327:     Add-Warning ("Enrichment failed for {0}: {1}" -f $CatalogPath, $_.Exception.Message)
328:   }
329: }
330: 
331: Ensure-Dir $LogRoot
---
324:   } catch {
325:     $script:Failed = $script:Failed + 1
326:     [void]$Results.Add([ordered]@{ file = $CatalogPath; status = "FAIL"; title = $Title; year = $Year; reason = (ConvertTo-AsciiText $_.Exception.Message) })
327:     Add-Warning ("Enrichment failed for {0}: {1}" -f $CatalogPath, $_.Exception.Message)
328:   }
329: }
330: 
331: Ensure-Dir $LogRoot
332: Ensure-Dir $PublishRoot
---
344: 
345: $Ended = Get-Date
346: $FinalStatus = "PASS"
347: if ($Warnings.Count -gt 0 -or $NoMatch -gt 0) { $FinalStatus = "REVIEW" }
348: if ($Failed -gt 0) { $FinalStatus = "FAIL" }
349: 
350: $Summary = [ordered]@{
351:   component = $Component
352:   status = $FinalStatus
---
345: $Ended = Get-Date
346: $FinalStatus = "PASS"
347: if ($Warnings.Count -gt 0 -or $NoMatch -gt 0) { $FinalStatus = "REVIEW" }
348: if ($Failed -gt 0) { $FinalStatus = "FAIL" }
349: 
350: $Summary = [ordered]@{
351:   component = $Component
352:   status = $FinalStatus
353:   started_utc = $Started.ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ")
---
358:   updated = $Updated
359:   skipped_existing = $Skipped
360:   no_match = $NoMatch
361:   failed = $Failed
362:   api_calls = $ApiCalls
363:   backup_root = $BackupRoot
364:   log = $LogPath
365:   results = @($Results)
366:   warnings = @($Warnings)
---
374: Write-Host ("Candidates: {0}" -f $Candidates)
375: Write-Host ("Updated: {0}" -f $Updated)
376: Write-Host ("No match: {0}" -f $NoMatch)
377: Write-Host ("Failed: {0}" -f $Failed)
378: Write-Host ("Status JSON: {0}" -f $StatusPath)
379: Write-Host ("Final: {0}" -f $FinalStatus)
380: 
381: if ($FinalStatus -eq "FAIL") { exit 1 }
382: exit 0
---
378: Write-Host ("Status JSON: {0}" -f $StatusPath)
379: Write-Host ("Final: {0}" -f $FinalStatus)
380: 
381: if ($FinalStatus -eq "FAIL") { exit 1 }
382: exit 0
---
``

## D:\PlexTools\Scripts\scarflix_v2\ScarFLIX_v2_CatalogPlaceholderMigrator.ps1
``text
26: $CatalogCreated = 0
27: $StateCreated = 0
28: $Skipped = 0
29: $Failed = 0
30: $Warnings = New-Object System.Collections.ArrayList
31: $Results = New-Object System.Collections.ArrayList
32: 
33: function Ensure-Dir {
34:   param([string]$Path)
---
256:     Add-Warning ("Plex scanner missing: {0}" -f $PlexScanner)
257:     return
258:   }
259:   try { & $PlexScanner --scan --refresh --section $Section | Out-Null } catch { Add-Warning ("Plex scan failed for section {0}: {1}" -f $Section, $_.Exception.Message) }
260: }
261: 
262: function Process-Strm {
263:   param([string]$StrmPath)
264:   $script:Scanned = $script:Scanned + 1
---
316:     try {
317:       Process-Strm -StrmPath $_.FullName
318:     } catch {
319:       $script:Failed = $script:Failed + 1
320:       [void]$Results.Add([ordered]@{ strm = $_.FullName; status = "FAIL"; reason = (ConvertTo-AsciiText $_.Exception.Message); placeholder = "" })
321:       Log-Line "FAIL" ("Migration failed for {0}: {1}" -f $_.FullName, $_.Exception.Message)
322:     }
323:   }
324: }
---
317:       Process-Strm -StrmPath $_.FullName
318:     } catch {
319:       $script:Failed = $script:Failed + 1
320:       [void]$Results.Add([ordered]@{ strm = $_.FullName; status = "FAIL"; reason = (ConvertTo-AsciiText $_.Exception.Message); placeholder = "" })
321:       Log-Line "FAIL" ("Migration failed for {0}: {1}" -f $_.FullName, $_.Exception.Message)
322:     }
323:   }
324: }
325: 
---
318:     } catch {
319:       $script:Failed = $script:Failed + 1
320:       [void]$Results.Add([ordered]@{ strm = $_.FullName; status = "FAIL"; reason = (ConvertTo-AsciiText $_.Exception.Message); placeholder = "" })
321:       Log-Line "FAIL" ("Migration failed for {0}: {1}" -f $_.FullName, $_.Exception.Message)
322:     }
323:   }
324: }
325: 
326: if ($Migrated -gt 0 -or $BackedUp -gt 0) {
---
330: 
331: $Ended = Get-Date
332: $FinalStatus = "PASS"
333: if ($Failed -gt 0) { $FinalStatus = "REVIEW" }
334: if ($Scanned -gt 0 -and $Migrated -eq 0 -and $Failed -gt 0) { $FinalStatus = "FAIL" }
335: 
336: $Summary = [ordered]@{
337:   component = $Component
338:   status = $FinalStatus
---
331: $Ended = Get-Date
332: $FinalStatus = "PASS"
333: if ($Failed -gt 0) { $FinalStatus = "REVIEW" }
334: if ($Scanned -gt 0 -and $Migrated -eq 0 -and $Failed -gt 0) { $FinalStatus = "FAIL" }
335: 
336: $Summary = [ordered]@{
337:   component = $Component
338:   status = $FinalStatus
339:   started_utc = $Started.ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ")
---
345:   catalog_created = $CatalogCreated
346:   state_created = $StateCreated
347:   skipped = $Skipped
348:   failed = $Failed
349:   backup_root = $BackupRoot
350:   log = $LogPath
351:   results = @($Results)
352:   warnings = @($Warnings)
353: }
---
362: Write-Host ("Catalog created: {0}" -f $CatalogCreated)
363: Write-Host ("State created: {0}" -f $StateCreated)
364: Write-Host ("Skipped: {0}" -f $Skipped)
365: Write-Host ("Failed: {0}" -f $Failed)
366: Write-Host ("Status JSON: {0}" -f $StatusPath)
367: Write-Host ("Final: {0}" -f $FinalStatus)
368: 
---
``

## D:\PlexTools\Scripts\scarflix_v2\ScarFLIX_v2_CatalogPlayWatcher.ps1
``text
25: $Observed = 0
26: $Promoted = 0
27: $Skipped = 0
28: $Failed = 0
29: $LastSeenId = 0
30: $NewLastSeenId = 0
31: $Warnings = New-Object System.Collections.ArrayList
32: $Results = New-Object System.Collections.ArrayList
33: 
---
254:     $Observed = 1
255:     Promote-Folder -Folder $SimulateFolder -Reason "simulation" -PlayQueueItemId 0
256:   } else {
257:     $Failed = $Failed + 1
258:     [void]$Results.Add([ordered]@{ folder = $SimulateFolder; status = "FAIL"; reason = "simulate folder missing"; play_queue_item_id = 0 })
259:   }
260: } else {
261:   $Rows = Get-NewPlayQueueRows -AfterId $LastSeenId
262:   foreach ($Row in $Rows) {
---
255:     Promote-Folder -Folder $SimulateFolder -Reason "simulation" -PlayQueueItemId 0
256:   } else {
257:     $Failed = $Failed + 1
258:     [void]$Results.Add([ordered]@{ folder = $SimulateFolder; status = "FAIL"; reason = "simulate folder missing"; play_queue_item_id = 0 })
259:   }
260: } else {
261:   $Rows = Get-NewPlayQueueRows -AfterId $LastSeenId
262:   foreach ($Row in $Rows) {
263:     $Observed = $Observed + 1
---
276: 
277: $Ended = Get-Date
278: $FinalStatus = "PASS"
279: if ($Failed -gt 0 -or $Warnings.Count -gt 0) { $FinalStatus = "REVIEW" }
280: if ($Failed -gt 0 -and $Promoted -eq 0) { $FinalStatus = "FAIL" }
281: 
282: $Summary = [ordered]@{
283:   component = $Component
284:   status = $FinalStatus
---
277: $Ended = Get-Date
278: $FinalStatus = "PASS"
279: if ($Failed -gt 0 -or $Warnings.Count -gt 0) { $FinalStatus = "REVIEW" }
280: if ($Failed -gt 0 -and $Promoted -eq 0) { $FinalStatus = "FAIL" }
281: 
282: $Summary = [ordered]@{
283:   component = $Component
284:   status = $FinalStatus
285:   started_utc = $Started.ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ")
---
290:   observed = $Observed
291:   promoted = $Promoted
292:   skipped = $Skipped
293:   failed = $Failed
294:   checkpoint = $CheckpointPath
295:   log = $LogPath
296:   results = @($Results)
297:   warnings = @($Warnings)
298: }
---
304: Write-Host ("Observed: {0}" -f $Observed)
305: Write-Host ("Promoted: {0}" -f $Promoted)
306: Write-Host ("Skipped: {0}" -f $Skipped)
307: Write-Host ("Failed: {0}" -f $Failed)
308: Write-Host ("Status JSON: {0}" -f $StatusPath)
309: Write-Host ("Final: {0}" -f $FinalStatus)
---
``

## D:\PlexTools\Scripts\scarflix_v2\ScarFLIX_v2_CatalogPromoter.ps1
``text
1: param(
2:   [int]$MaxItems = 2,
3:   [int]$PerItemTimeoutSeconds = 240,
4:   [switch]$InstallTask
5: )
6: 
7: $ErrorActionPreference = "Continue"
8: try { [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12 } catch {}
---
107:     try {
108:       $age = (Get-Date) - (Get-Item -LiteralPath $LockPath).LastWriteTime
109:       if ($age.TotalMinutes -lt 8) {
110:         Write-Step "REVIEW" ("Another catalog gate/promoter lock is active: {0}" -f $LockPath)
111:         return $false
112:       }
113:       Remove-Item -LiteralPath $LockPath -Force -ErrorAction SilentlyContinue
114:     } catch {}
115:   }
---
117:     Set-Content -LiteralPath $LockPath -Value ("pid={0};utc={1}" -f $PID,(Get-Date).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ")) -Encoding UTF8 -Force
118:     return $true
119:   } catch {
120:     Write-Step "REVIEW" ("Could not create lock: {0}" -f $_.Exception.Message)
121:     return $false
122:   }
123: }
124: 
125: function Release-Lock {
---
135:     Write-Step "OK" ("Backed up Plex DB: {0}" -f $dest)
136:     return $dest
137:   } catch {
138:     Write-Step "FAIL" ("Plex DB backup failed: {0}" -f $_.Exception.Message)
139:     return ""
140:   }
141: }
142: 
143: function Install-Task {
---
241:   }
242:   try {
243:     if ($null -eq $headers) {
244:       $resp = Invoke-RestMethod -Uri $url -UseBasicParsing -TimeoutSec 15 -ErrorAction Stop
245:     } else {
246:       $resp = Invoke-RestMethod -Uri $url -Headers $headers -UseBasicParsing -TimeoutSec 15 -ErrorAction Stop
247:     }
248:     return ([bool]$resp.adult)
249:   } catch {
---
243:     if ($null -eq $headers) {
244:       $resp = Invoke-RestMethod -Uri $url -UseBasicParsing -TimeoutSec 15 -ErrorAction Stop
245:     } else {
246:       $resp = Invoke-RestMethod -Uri $url -Headers $headers -UseBasicParsing -TimeoutSec 15 -ErrorAction Stop
247:     }
248:     return ([bool]$resp.adult)
249:   } catch {
250:     return $false
251:   }
---
425: 
426: function Invoke-TargetedReady {
427:   param([int64]$PartId)
428:   if (!(Test-Path -LiteralPath $TargetedReady)) { return [ordered]@{ status="FAIL"; reason="TargetedReady missing" } }
429:   $proc = Start-Process -FilePath "powershell.exe" -ArgumentList @("-NoProfile","-ExecutionPolicy","Bypass","-File",$TargetedReady,"-PartId",("" + $PartId)) -NoNewWindow -PassThru
430:   $finished = $proc.WaitForExit($PerItemTimeoutSeconds * 1000)
431:   if (!$finished) {
432:     try { & taskkill.exe /PID $proc.Id /T /F | Out-Null } catch {}
433:     return [ordered]@{ status="REVIEW"; reason="TargetedReady timed out" }
---
427:   param([int64]$PartId)
428:   if (!(Test-Path -LiteralPath $TargetedReady)) { return [ordered]@{ status="FAIL"; reason="TargetedReady missing" } }
429:   $proc = Start-Process -FilePath "powershell.exe" -ArgumentList @("-NoProfile","-ExecutionPolicy","Bypass","-File",$TargetedReady,"-PartId",("" + $PartId)) -NoNewWindow -PassThru
430:   $finished = $proc.WaitForExit($PerItemTimeoutSeconds * 1000)
431:   if (!$finished) {
432:     try { & taskkill.exe /PID $proc.Id /T /F | Out-Null } catch {}
433:     return [ordered]@{ status="REVIEW"; reason="TargetedReady timed out" }
434:   }
435:   $targetStatus = Read-JsonSafe (Join-Path $PublishRoot "targeted_ready_status.json")
---
430:   $finished = $proc.WaitForExit($PerItemTimeoutSeconds * 1000)
431:   if (!$finished) {
432:     try { & taskkill.exe /PID $proc.Id /T /F | Out-Null } catch {}
433:     return [ordered]@{ status="REVIEW"; reason="TargetedReady timed out" }
434:   }
435:   $targetStatus = Read-JsonSafe (Join-Path $PublishRoot "targeted_ready_status.json")
436:   $status = "REVIEW"
437:   if ($targetStatus -and $targetStatus.PSObject.Properties["status"]) { $status = "" + $targetStatus.status }
438:   if ($status -eq "PASS") { return [ordered]@{ status="PASS"; reason="ready" } }
---
433:     return [ordered]@{ status="REVIEW"; reason="TargetedReady timed out" }
434:   }
435:   $targetStatus = Read-JsonSafe (Join-Path $PublishRoot "targeted_ready_status.json")
436:   $status = "REVIEW"
437:   if ($targetStatus -and $targetStatus.PSObject.Properties["status"]) { $status = "" + $targetStatus.status }
438:   if ($status -eq "PASS") { return [ordered]@{ status="PASS"; reason="ready" } }
439:   return [ordered]@{ status=$status; reason=("TargetedReady exit {0}" -f $proc.ExitCode) }
440: }
441: 
---
477: $backup = ""
478: $processed = 0
479: $passed = 0
480: $review = 0
481: $failed = 0
482: $policyBlocked = 0
483: 
484: Write-Step "INFO" ("Catalog promoter starting MaxItems={0}" -f $MaxItems)
485: 
---
478: $processed = 0
479: $passed = 0
480: $review = 0
481: $failed = 0
482: $policyBlocked = 0
483: 
484: Write-Step "INFO" ("Catalog promoter starting MaxItems={0}" -f $MaxItems)
485: 
486: if (!(Test-Path -LiteralPath $Sqlite)) {
---
484: Write-Step "INFO" ("Catalog promoter starting MaxItems={0}" -f $MaxItems)
485: 
486: if (!(Test-Path -LiteralPath $Sqlite)) {
487:   $status = "FAIL"
488:   [void]$errors.Add("sqlite missing")
489:   Write-Step "FAIL" ("sqlite missing: {0}" -f $Sqlite)
490: } elseif (!(Test-Path -LiteralPath $PlexDb)) {
491:   $status = "FAIL"
492:   [void]$errors.Add("Plex DB missing")
---
486: if (!(Test-Path -LiteralPath $Sqlite)) {
487:   $status = "FAIL"
488:   [void]$errors.Add("sqlite missing")
489:   Write-Step "FAIL" ("sqlite missing: {0}" -f $Sqlite)
490: } elseif (!(Test-Path -LiteralPath $PlexDb)) {
491:   $status = "FAIL"
492:   [void]$errors.Add("Plex DB missing")
493:   Write-Step "FAIL" ("Plex DB missing: {0}" -f $PlexDb)
494: } elseif (!(Acquire-Lock)) {
---
488:   [void]$errors.Add("sqlite missing")
489:   Write-Step "FAIL" ("sqlite missing: {0}" -f $Sqlite)
490: } elseif (!(Test-Path -LiteralPath $PlexDb)) {
491:   $status = "FAIL"
492:   [void]$errors.Add("Plex DB missing")
493:   Write-Step "FAIL" ("Plex DB missing: {0}" -f $PlexDb)
494: } elseif (!(Acquire-Lock)) {
495:   $status = "REVIEW"
496:   [void]$warnings.Add("lock busy")
---
490: } elseif (!(Test-Path -LiteralPath $PlexDb)) {
491:   $status = "FAIL"
492:   [void]$errors.Add("Plex DB missing")
493:   Write-Step "FAIL" ("Plex DB missing: {0}" -f $PlexDb)
494: } elseif (!(Acquire-Lock)) {
495:   $status = "REVIEW"
496:   [void]$warnings.Add("lock busy")
497: } else {
498:   try {
---
492:   [void]$errors.Add("Plex DB missing")
493:   Write-Step "FAIL" ("Plex DB missing: {0}" -f $PlexDb)
494: } elseif (!(Acquire-Lock)) {
495:   $status = "REVIEW"
496:   [void]$warnings.Add("lock busy")
497: } else {
498:   try {
499:     $blockedMap = Read-BlockedPartMap
500:     $rejectedMap = Read-RejectedPartMap
---
511:     if ($targets.Count -gt 0) {
512:       $backup = Backup-PlexDb
513:       if ([string]::IsNullOrWhiteSpace($backup)) {
514:         $status = "FAIL"
515:         [void]$errors.Add("DB backup failed")
516:       }
517:     }
518:     foreach ($target in @($targets)) {
519:       $processed++
---
512:       $backup = Backup-PlexDb
``

## D:\PlexTools\Scripts\scarflix_v2\ScarFLIX_v2_CatalogSeeder.ps1
``text
30: $CreatedMovies = 0
31: $CreatedTv = 0
32: $Skipped = 0
33: $Failed = 0
34: $ApiCalls = 0
35: $Warnings = New-Object System.Collections.ArrayList
36: $Results = New-Object System.Collections.ArrayList
37: $SeenCatalogKeys = @{}
38: $CategoryCounts = @{}
---
232:   if ($Path.Contains("?")) { $Glue = "&" }
233:   $Uri = "https://api.themoviedb.org/3/{0}{1}api_key=[REDACTED]" -f $Path, $Glue, [Uri]::EscapeDataString($ApiKey), $Page
234:   $script:ApiCalls = $script:ApiCalls + 1
235:   return Invoke-RestMethod -Uri $Uri -UseBasicParsing -TimeoutSec 30 -ErrorAction Stop
236: }
237: 
238: function Install-UniquePlaceholder {
239:   param([string]$Path)
240:   if (!(Test-Path -LiteralPath $PlaceholderSource)) { throw ("Placeholder source missing: {0}" -f $PlaceholderSource) }
---
370:     Add-Warning ("Plex scanner missing: {0}" -f $PlexScanner)
371:     return
372:   }
373:   try { & $PlexScanner --scan --refresh --section $Section | Out-Null } catch { Add-Warning ("Plex scan failed section {0}: {1}" -f $Section, $_.Exception.Message) }
374: }
375: 
376: Ensure-Dir $LogRoot
377: Ensure-Dir $PublishRoot
378: Ensure-Dir $StateRoot
---
437:         if ($After -gt $Before) { $TotalCreated = $TotalCreated + 1 }
438:       }
439:     } catch {
440:       $script:Failed = $script:Failed + 1
441:       Add-Warning ("TMDb source failed {0} page {1}: {2}" -f $Source.name, $ActualPage, $_.Exception.Message)
442:     }
443:   }
444:   if ($IsRollingSource -and $LastAttemptedPage -gt 0) {
445:     Set-ObjectProp -Object $Cursor -Name ("" + $Source.name) -Value $LastAttemptedPage
---
438:       }
439:     } catch {
440:       $script:Failed = $script:Failed + 1
441:       Add-Warning ("TMDb source failed {0} page {1}: {2}" -f $Source.name, $ActualPage, $_.Exception.Message)
442:     }
443:   }
444:   if ($IsRollingSource -and $LastAttemptedPage -gt 0) {
445:     Set-ObjectProp -Object $Cursor -Name ("" + $Source.name) -Value $LastAttemptedPage
446:     Set-ObjectProp -Object $Cursor -Name "updated_utc" -Value ((Get-Date).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ"))
---
457: 
458: $Ended = Get-Date
459: $FinalStatus = "PASS"
460: if ($Failed -gt 0 -or $Warnings.Count -gt 0) { $FinalStatus = "REVIEW" }
461: if (($CreatedMovies + $CreatedTv) -eq 0 -and $Failed -gt 0) { $FinalStatus = "FAIL" }
462: 
463: $Summary = [ordered]@{
464:   component = $Component
465:   status = $FinalStatus
---
458: $Ended = Get-Date
459: $FinalStatus = "PASS"
460: if ($Failed -gt 0 -or $Warnings.Count -gt 0) { $FinalStatus = "REVIEW" }
461: if (($CreatedMovies + $CreatedTv) -eq 0 -and $Failed -gt 0) { $FinalStatus = "FAIL" }
462: 
463: $Summary = [ordered]@{
464:   component = $Component
465:   status = $FinalStatus
466:   started_utc = $Started.ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ")
---
474:   created_movies = $CreatedMovies
475:   created_tv = $CreatedTv
476:   skipped_existing = $Skipped
477:   failed = $Failed
478:   placeholder_source = $PlaceholderSource
479:   cursor = $CursorPath
480:   catalog_index = $CatalogIndexPath
481:   catalog_index_count = $SeenCatalogKeys.Count
482:   category_counts = $CategoryCounts
---
492: Write-Host ("Created movies: {0}" -f $CreatedMovies)
493: Write-Host ("Created TV: {0}" -f $CreatedTv)
494: Write-Host ("Skipped existing: {0}" -f $Skipped)
495: Write-Host ("Failed: {0}" -f $Failed)
496: Write-Host ("Status JSON: {0}" -f $StatusPath)
497: Write-Host ("Final: {0}" -f $FinalStatus)
---
``

## D:\PlexTools\Scripts\scarflix_v2\ScarFLIX_v2_CatalogSymlinkPublisher.ps1
``text
5: param(
6:   [int]$MaxItems = 6,
7:   [int]$Seconds = 8,
8:   [int]$TimeoutSeconds = 90,
9:   [switch]$RetireAllRaw,
10:   [switch]$InstallTask
11: )
12: 
13: $ErrorActionPreference = "Continue"
---
27: $RcloneExe = "D:\PlexTools\bin\rclone.exe"
28: $RcloneDrive = "S:"
29: $BridgeBase = "http://127.0.0.1:18789"
30: $PlexTranscoder = "C:\Program Files\Plex\Plex Media Server\Plex Transcoder.exe"
31: $CodecRoot = "C:\Users\jason\AppData\Local\Plex Media Server\Codecs"
32: $PlexScanner = "C:\Program Files\Plex\Plex Media Server\Plex Media Scanner.exe"
33: $StatusJson = Join-Path $PublishRoot "catalog_symlink_publisher_status.json"
34: $StatusMd = Join-Path $PublishRoot "catalog_symlink_publisher_status.md"
35: $LogPath = Join-Path $LogRoot ("scarflix_v2_catalog_symlink_publisher_{0}.log" -f (Get-Date -Format "yyyyMMdd"))
---
109:   param([string]$Url)
110:   $result = [ordered]@{ ok=$false; status=0; content_length=0; content_type=""; reason="" }
111:   try {
112:     $resp = Invoke-WebRequest -Uri $Url -Method Head -UseBasicParsing -TimeoutSec 35 -ErrorAction Stop
113:     $result.status = [int]$resp.StatusCode
114:     $result.content_type = "" + $resp.Headers["Content-Type"]
115:     $cl = "" + $resp.Headers["Content-Length"]
116:     $contentLength = [int64]0
117:     [void][int64]::TryParse($cl, [ref]$contentLength)
---
153: 
154: function Ensure-NodeBridge {
155:   try {
156:     $resp = Invoke-WebRequest -Uri ($BridgeBase + "/health") -UseBasicParsing -TimeoutSec 3 -ErrorAction Stop
157:     if ($resp.StatusCode -eq 200) { return $true }
158:   } catch {}
159:   if (!(Test-Path -LiteralPath $NodeScript)) { return $false }
160:   try {
161:     $env:SCARFLIX_WEBDAV_PORT = "18789"
---
163:     $env:SCARFLIX_WEBDAV_LOG = Join-Path $LogRoot "scarflix_v2_webdav_file_bridge_node.log"
164:     Start-Process -FilePath "node.exe" -ArgumentList @($NodeScript) -WindowStyle Hidden | Out-Null
165:     Start-Sleep -Seconds 2
166:     $resp2 = Invoke-WebRequest -Uri ($BridgeBase + "/health") -UseBasicParsing -TimeoutSec 5 -ErrorAction Stop
167:     return ($resp2.StatusCode -eq 200)
168:   } catch { return $false }
169: }
170: 
171: function Stop-RcloneMount {
---
210:   try { return (Test-Path -LiteralPath $Path) } catch { return $false }
211: }
212: 
213: function Test-HlsTranscodePath {
214:   param([string]$InputPath)
215:   $result = [ordered]@{ ok=$false; exit_code=$null; timed_out=$false; probe_dir=""; files=0; bytes=0; reason="" }
216:   if (!(Test-Path -LiteralPath $PlexTranscoder)) { $result.reason = "Plex Transcoder missing"; return $result }
217:   $outDir = Join-Path $env:TEMP ("scarflix_symlink_pub_{0}_{1}" -f (Get-Date -Format "yyyyMMdd_HHmmss"),([Guid]::NewGuid().ToString("N")))
218:   Ensure-Dir $outDir
---
213: function Test-HlsTranscodePath {
214:   param([string]$InputPath)
215:   $result = [ordered]@{ ok=$false; exit_code=$null; timed_out=$false; probe_dir=""; files=0; bytes=0; reason="" }
216:   if (!(Test-Path -LiteralPath $PlexTranscoder)) { $result.reason = "Plex Transcoder missing"; return $result }
217:   $outDir = Join-Path $env:TEMP ("scarflix_symlink_pub_{0}_{1}" -f (Get-Date -Format "yyyyMMdd_HHmmss"),([Guid]::NewGuid().ToString("N")))
218:   Ensure-Dir $outDir
219:   $result.probe_dir = $outDir
220:   $codecValue = Get-LatestCodecDirForCmd
221:   $envLine = ""
---
221:   $envLine = ""
222:   if ($codecValue.Length -gt 0) { $envLine = "set ""FFMPEG_EXTERNAL_LIBS=$codecValue"" & " }
223:   $cmd = 'cd /d "' + $outDir + '" & ' + $envLine
224:   $cmd = $cmd + '"' + $PlexTranscoder + '" -analyzeduration 20000000 -probesize 20000000 -i "' + $InputPath + '" -t ' + $Seconds + ' -y -nostats -loglevel error -map 0:0 -codec:0 copy -map 0:1 -codec:1 copy -segment_format matroska -f ssegment -individual_header_trailer 0 -flags +global_header -segment_header_filename header -segment_time 5 -segment_start_number 0 -segment_list manifest.csv -segment_list_type csv -segment_list_size 5 -segment_list_unfinished 1 -map_metadata -1 -map_chapters -1 media-%05d.ts 1> stdout.log 2> stderr.log'
225:   try {
226:     $proc = Start-Process -FilePath "cmd.exe" -ArgumentList @("/d","/c",$cmd) -NoNewWindow -PassThru
227:     $done = $proc.WaitForExit($TimeoutSeconds * 1000)
228:     if (!$done) {
229:       $result.timed_out = $true
---
224:   $cmd = $cmd + '"' + $PlexTranscoder + '" -analyzeduration 20000000 -probesize 20000000 -i "' + $InputPath + '" -t ' + $Seconds + ' -y -nostats -loglevel error -map 0:0 -codec:0 copy -map 0:1 -codec:1 copy -segment_format matroska -f ssegment -individual_header_trailer 0 -flags +global_header -segment_header_filename header -segment_time 5 -segment_start_number 0 -segment_list manifest.csv -segment_list_type csv -segment_list_size 5 -segment_list_unfinished 1 -map_metadata -1 -map_chapters -1 media-%05d.ts 1> stdout.log 2> stderr.log'
225:   try {
226:     $proc = Start-Process -FilePath "cmd.exe" -ArgumentList @("/d","/c",$cmd) -NoNewWindow -PassThru
227:     $done = $proc.WaitForExit($TimeoutSeconds * 1000)
228:     if (!$done) {
229:       $result.timed_out = $true
230:       try { & taskkill.exe /PID $proc.Id /T /F | Out-Null } catch {}
231:       $result.reason = "Plex Transcoder HLS probe timed out"
232:       return $result
---
228:     if (!$done) {
229:       $result.timed_out = $true
230:       try { & taskkill.exe /PID $proc.Id /T /F | Out-Null } catch {}
231:       $result.reason = "Plex Transcoder HLS probe timed out"
232:       return $result
233:     }
234:     try { $proc.Refresh() } catch {}
235:     try { $result.exit_code = $proc.ExitCode } catch { $result.exit_code = $null }
236:     $items = Get-ChildItem -LiteralPath $outDir -File -ErrorAction SilentlyContinue
---
242:     }
243:     if ($result.exit_code -eq 0 -and (Test-Path -LiteralPath (Join-Path $outDir "header")) -and $result.bytes -gt 0) {
244:       $result.ok = $true
245:       $result.reason = "Plex Transcoder HLS probe produced media segments"
246:     } else {
247:       $result.reason = "Plex Transcoder HLS probe did not produce valid output"
248:     }
249:   } catch {
250:     $result.reason = ConvertTo-AsciiText $_.Exception.Message
---
244:       $result.ok = $true
245:       $result.reason = "Plex Transcoder HLS probe produced media segments"
246:     } else {
247:       $result.reason = "Plex Transcoder HLS probe did not produce valid output"
248:     }
249:   } catch {
250:     $result.reason = ConvertTo-AsciiText $_.Exception.Message
251:   }
252:   return $result
---
267:     Write-Utf8NoBom -Path (Join-Path $destDir "stage_info.json") -Text ($info | ConvertTo-Json -Depth 4)
268:     return $dest
269:   } catch {
270:     Write-Step "REVIEW" ("Could not stage raw .strm {0}: {1}" -f $Path,$_.Exception.Message)
271:     return ""
272:   }
273: }
274: 
275: function Install-Task {
---
339:   $url = ""
340:   try { $url = (Get-Content -LiteralPath $path -TotalCount 1 -ErrorAction Stop).Trim() } catch {}
341:   $url = $url -replace "http://192\.168\.1\.184:18788/", "http://127.0.0.1:18788/"
342:   $item = [ordered]@{ path=$originalPath; source_path=$path; staged=[bool]$raw.staged; status="REVIEW"; reason=""; link=""; webdav_path=""; head=$null; hls=$null }
343:   if ($url -notlike "http://127.0.0.1:18788/live*") {
344:     $item.reason = "not a ScarFLIX live proxy URL"
345:     [void]$results.Add($item)
346:     continue
347:   }
---
404:     }
405:     if ($null -eq $entry) { continue }
406:     if (!(Wait-PathAvailable -Path ("" + $entry.rclone_path) -Seconds 35)) {
407:       $item.status = "REVIEW"
408:       $item.reason = "rclone target did not appear"
409:       continue
410:     }
411:     try {
412:       $localDir = "" + $entry.local_dir
---
415:         New-Item -ItemType SymbolicLink -Path $localDir -Target $rcloneDir -Force -ErrorAction Stop | Out-Null
416:       }
417:     } catch {
418:       $item.status = "REVIEW"
419:       $item.reason = "directory symlink create failed: " + (ConvertTo-AsciiText $_.Exception.Message)
420:       continue
421:     }
422:     $probe = Test-HlsTranscodePath -InputPath $item.link
423:     $item.hls = $probe
---
416:       }
417:     } catch {
418:       $item.status = "REVIEW"
419:       $item.reason = "directory symlink create failed: " + (ConvertTo-AsciiText $_.Exception.Message)
420:       continue
421:     }
422:     $probe = Test-HlsTranscodePath -InputPath $item.link
423:     $item.hls = $probe
424:     if ($probe.ok) {
---
419:       $item.reason = "directory symlink create failed: " + (ConvertTo-AsciiText $_.Exception.Message)
420:       continue
421:     }
422:     $probe = Test-HlsTranscodePath -InputPath $item.link
423:     $item.hls = $probe
424:     if ($probe.ok) {
425:       $item.status = "PASS"
426:       $item.reason = "published as WebDAV-backed symlink and HLS probe passed"
427:       $published++
---
``

## D:\PlexTools\Scripts\scarflix_v2\ScarFLIX_v2_CatalogVisibilityGate.ps1
``text
89:           Start-Sleep -Seconds 5
90:           continue
91:         } else {
92:           Write-Step "REVIEW" ("Another catalog gate/promoter lock is active: {0}" -f $LockPath)
93:           return $false
94:         }
95:       }
96:       Remove-Item -LiteralPath $LockPath -Force -ErrorAction SilentlyContinue
97:     } catch {}
---
102:     Set-Content -LiteralPath $LockPath -Value ("pid={0};utc={1}" -f $processIdValue,(Get-Date).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ")) -Encoding UTF8 -Force
103:     return $true
104:   } catch {
105:     Write-Step "REVIEW" ("Could not create lock: {0}" -f $_.Exception.Message)
106:     return $false
107:   }
108: }
109: 
110: function Release-Lock {
---
120:     Write-Step "OK" ("Backed up Plex DB: {0}" -f $dest)
121:     return $dest
122:   } catch {
123:     Write-Step "FAIL" ("Plex DB backup failed: {0}" -f $_.Exception.Message)
124:     return ""
125:   }
126: }
127: 
128: function Install-Task {
---
318: Write-Step "INFO" ("Catalog visibility gate starting HideUnready={0} DryRun={1} MaxItems={2}" -f [bool]$HideUnready,[bool]$DryRun,$MaxItems)
319: 
320: if (!(Test-Path -LiteralPath $Sqlite)) {
321:   $status = "FAIL"
322:   [void]$errors.Add("sqlite missing")
323:   Write-Step "FAIL" ("sqlite missing: {0}" -f $Sqlite)
324: } elseif (!(Test-Path -LiteralPath $PlexDb)) {
325:   $status = "FAIL"
326:   [void]$errors.Add("Plex DB missing")
---
320: if (!(Test-Path -LiteralPath $Sqlite)) {
321:   $status = "FAIL"
322:   [void]$errors.Add("sqlite missing")
323:   Write-Step "FAIL" ("sqlite missing: {0}" -f $Sqlite)
324: } elseif (!(Test-Path -LiteralPath $PlexDb)) {
325:   $status = "FAIL"
326:   [void]$errors.Add("Plex DB missing")
327:   Write-Step "FAIL" ("Plex DB missing: {0}" -f $PlexDb)
328: } else {
---
322:   [void]$errors.Add("sqlite missing")
323:   Write-Step "FAIL" ("sqlite missing: {0}" -f $Sqlite)
324: } elseif (!(Test-Path -LiteralPath $PlexDb)) {
325:   $status = "FAIL"
326:   [void]$errors.Add("Plex DB missing")
327:   Write-Step "FAIL" ("Plex DB missing: {0}" -f $PlexDb)
328: } else {
329:   $before = Get-VisibleCounts
330:   $rows = @(Get-VisibleRawRows)
---
324: } elseif (!(Test-Path -LiteralPath $PlexDb)) {
325:   $status = "FAIL"
326:   [void]$errors.Add("Plex DB missing")
327:   Write-Step "FAIL" ("Plex DB missing: {0}" -f $PlexDb)
328: } else {
329:   $before = Get-VisibleCounts
330:   $rows = @(Get-VisibleRawRows)
331:   $hiddenMetadataRows = @(Get-HiddenRawMetadataRows)
332:   Write-Step "INFO" ("Visible raw catalog rows found: {0}" -f $rows.Count)
---
336:       try {
337:         $backup = Backup-PlexDb
338:         if ([string]::IsNullOrWhiteSpace($backup)) {
339:           $status = "FAIL"
340:           [void]$errors.Add("DB backup failed")
341:         } else {
342:           if ($rows.Count -gt 0) {
343:             $hidden = Hide-RawRows -Rows $rows
344:             Write-Step "OK" ("Hidden visible raw catalog rows: {0}" -f $hidden)
---
337:         $backup = Backup-PlexDb
338:         if ([string]::IsNullOrWhiteSpace($backup)) {
339:           $status = "FAIL"
340:           [void]$errors.Add("DB backup failed")
341:         } else {
342:           if ($rows.Count -gt 0) {
343:             $hidden = Hide-RawRows -Rows $rows
344:             Write-Step "OK" ("Hidden visible raw catalog rows: {0}" -f $hidden)
345:           }
---
353:         Release-Lock
354:       }
355:     } else {
356:       $status = "REVIEW"
357:       [void]$warnings.Add("lock busy")
358:     }
359:   } elseif ($rows.Count -gt 0 -and !$HideUnready) {
360:     $status = "REVIEW"
361:     [void]$warnings.Add("visible raw rows found; run with -HideUnready to hide them")
---
357:       [void]$warnings.Add("lock busy")
358:     }
359:   } elseif ($rows.Count -gt 0 -and !$HideUnready) {
360:     $status = "REVIEW"
361:     [void]$warnings.Add("visible raw rows found; run with -HideUnready to hide them")
362:   }
363:   $after = Get-VisibleCounts
364: }
365: 
---
366: if ($null -eq $before) { $before = [ordered]@{ total=0; strm=0; webdav=0; ready_webdav=0 } }
367: if ($null -eq $after) { $after = [ordered]@{ total=0; strm=0; webdav=0; ready_webdav=0 } }
368: $hiddenTotal = Get-HiddenRawCount
369: if ($after.strm -gt 0 -and $status -eq "PASS") { $status = "REVIEW" }
370: if ($errors.Count -gt 0) { $status = "FAIL" }
371: $ended = Get-Date
372: 
373: $summary = [ordered]@{
374:   component = $Component
---
367: if ($null -eq $after) { $after = [ordered]@{ total=0; strm=0; webdav=0; ready_webdav=0 } }
368: $hiddenTotal = Get-HiddenRawCount
369: if ($after.strm -gt 0 -and $status -eq "PASS") { $status = "REVIEW" }
370: if ($errors.Count -gt 0) { $status = "FAIL" }
371: $ended = Get-Date
372: 
373: $summary = [ordered]@{
374:   component = $Component
375:   status = $status
---
401: [void]$md.Add(("Visible raw rows after gate: {0}" -f $summary.visible_raw_after))
402: [void]$md.Add(("Hidden raw rows waiting for promotion: {0}" -f $summary.hidden_raw_total))
403: [void]$md.Add(("Ready WebDAV rows visible: {0}" -f $summary.counts_after.ready_webdav))
404: [void]$md.Add(("Visible catalogue rows total: {0}" -f $summary.counts_after.total))
405: [void]$md.Add(("Hidden this run: {0}" -f $summary.hidden_this_run))
406: [void]$md.Add("")
407: [void]$md.Add(("Log: {0}" -f $LogPath))
408: Write-TextFile -Path $StatusMd -Lines @($md)
409: 
---
410: Write-Step $status ("Gate complete: visible_raw={0}; ready_webdav={1}; hidden_waiting={2}" -f $after.strm,$after.ready_webdav,$hiddenTotal)
411: Write-Host ("Status JSON: {0}" -f $StatusJson)
412: Write-Host ("Status MD: {0}" -f $StatusMd)
413: if ($status -eq "FAIL") { exit 1 }
414: exit 0
---
``

## D:\PlexTools\Scripts\scarflix_v2\ScarFLIX_v2_ClientSafeUrlRewriter.ps1
``text
13: $ScriptPath = "D:\PlexTools\Scripts\scarflix_v2\ScarFLIX_v2_ClientSafeUrlRewriter.ps1"
14: $Sqlite = "D:\PlexTools\bin\sqlite3.exe"
15: $PlexDb = "C:\Users\jason\AppData\Local\Plex Media Server\Plug-in Support\Databases\com.plexapp.plugins.library.db"
16: $PlexTranscoder = "C:\Program Files\Plex\Plex Media Server\Plex Transcoder.exe"
17: $CodecRoot = "C:\Users\jason\AppData\Local\Plex Media Server\Codecs"
18: $StatusJson = Join-Path $PublishRoot "client_safe_url_rewriter_status.json"
19: $LogPath = Join-Path $LogRoot ("scarflix_v2_client_safe_url_rewriter_{0}.log" -f (Get-Date -Format "yyyyMMdd"))
20: $BackupRoot = Join-Path $LogRoot ("scarflix_v2_client_safe_url_rewriter_backup_{0}" -f (Get-Date -Format "yyyyMMdd_HHmmss"))
21: $LockPath = Join-Path $StateRoot "client_safe_url_rewriter.lock"
---
56:   $tmp = Join-Path $env:TEMP ("scarflix_v2_sql_{0}.sql" -f ([Guid]::NewGuid().ToString("N")))
57:   try {
58:     Set-Content -LiteralPath $tmp -Value $Sql -Encoding ASCII -Force
59:     $out = & $Sqlite $PlexDb ".timeout 10000" ".read $tmp" 2>&1
60:     return ($out | Out-String)
61:   } catch {
62:     return $_.Exception.Message
63:   } finally {
64:     try { Remove-Item -LiteralPath $tmp -Force -ErrorAction SilentlyContinue } catch {}
---
68: function Backup-PlexDb {
69:   Ensure-Dir $BackupRoot
70:   $backupPath = Join-Path $BackupRoot "com.plexapp.plugins.library.db"
71:   $out = & $Sqlite $PlexDb ".timeout 10000" ".backup '$backupPath'" 2>&1
72:   $text = ($out | Out-String)
73:   if ($text -match "Error|locked|unable") {
74:     return $null
75:   }
76:   if (Test-Path -LiteralPath $backupPath) {
---
86:   return "\\?\{0}\\" -f $path
87: }
88: 
89: function Test-HlsTranscodeUrl {
90:   param([string]$Url)
91:   $result = [ordered]@{
92:     ok = $false
93:     exit_code = $null
94:     probe_dir = ""
---
100:     $result.reason = "empty url"
101:     return $result
102:   }
103:   if (!(Test-Path -LiteralPath $PlexTranscoder)) {
104:     $result.reason = "Plex Transcoder missing"
105:     return $result
106:   }
107:   $outDir = Join-Path $env:TEMP ("plex_hls_url_probe_{0}" -f (Get-Date -Format "yyyyMMdd_HHmmss"))
108:   Ensure-Dir $outDir
---
101:     return $result
102:   }
103:   if (!(Test-Path -LiteralPath $PlexTranscoder)) {
104:     $result.reason = "Plex Transcoder missing"
105:     return $result
106:   }
107:   $outDir = Join-Path $env:TEMP ("plex_hls_url_probe_{0}" -f (Get-Date -Format "yyyyMMdd_HHmmss"))
108:   Ensure-Dir $outDir
109:   $result.probe_dir = $outDir
---
104:     $result.reason = "Plex Transcoder missing"
105:     return $result
106:   }
107:   $outDir = Join-Path $env:TEMP ("plex_hls_url_probe_{0}" -f (Get-Date -Format "yyyyMMdd_HHmmss"))
108:   Ensure-Dir $outDir
109:   $result.probe_dir = $outDir
110:   $codecValue = Get-LatestCodecDirForCmd
111:   $envLine = ""
112:   if ($codecValue.Length -gt 0) {
---
114:   }
115:   $safeUrl = $Url.Replace('"', '')
116:   $cmd = 'cd /d "' + $outDir + '" & ' + $envLine
117:   $cmd = $cmd + '"' + $PlexTranscoder + '" -analyzeduration 20000000 -probesize 20000000 -i "' + $safeUrl + '" -t 8 -y -nostats -loglevel error -map 0:0 -codec:0 copy -map 0:1 -codec:1 copy -segment_format matroska -f ssegment -individual_header_trailer 0 -flags +global_header -segment_header_filename header -segment_time 5 -segment_start_number 0 -segment_list manifest.csv -segment_list_type csv -segment_list_size 5 -segment_list_unfinished 1 -map_metadata -1 -map_chapters -1 media-%05d.ts'
118:   try {
119:     $proc = Start-Process -FilePath "cmd.exe" -ArgumentList @("/d", "/c", $cmd) -NoNewWindow -PassThru -Wait
120:     $result.exit_code = $proc.ExitCode
121:     $items = Get-ChildItem -LiteralPath $outDir -File -ErrorAction SilentlyContinue
122:     $result.files = ($items | Measure-Object).Count
---
124:     if ($sum -and $sum.Sum) { $result.bytes = [int64]$sum.Sum }
125:     if ($proc.ExitCode -eq 0 -and (Test-Path -LiteralPath (Join-Path $outDir "header")) -and $result.bytes -gt 0) {
126:       $result.ok = $true
127:       $result.reason = "HLS probe produced media segments"
128:     } else {
129:       $result.reason = "HLS probe did not produce valid output"
130:     }
131:   } catch {
132:     $result.reason = ConvertTo-AsciiText $_.Exception.Message
---
126:       $result.ok = $true
127:       $result.reason = "HLS probe produced media segments"
128:     } else {
129:       $result.reason = "HLS probe did not produce valid output"
130:     }
131:   } catch {
132:     $result.reason = ConvertTo-AsciiText $_.Exception.Message
133:   }
134:   return $result
---
142:     Write-Step ("Scheduled task installed: {0}" -f $name) "OK"
143:     return $true
144:   } catch {
145:     Write-Step ("Scheduled task install failed: {0}" -f $_.Exception.Message) "FAIL"
146:     return $false
147:   }
148: }
149: 
150: Ensure-Dir $LogRoot
---
158: if (Test-Path -LiteralPath $LockPath) {
159:   $lock = Get-Item -LiteralPath $LockPath -ErrorAction SilentlyContinue
160:   if ($lock -and ((Get-Date) - $lock.LastWriteTime).TotalMinutes -lt 15) {
161:     Write-Step "Another rewriter run is active; exiting." "REVIEW"
162:     exit 0
163:   }
164: }
165: try { Set-Content -LiteralPath $LockPath -Value (Get-Date).ToString("s") -Encoding ASCII -Force } catch {}
166: 
---
165: try { Set-Content -LiteralPath $LockPath -Value (Get-Date).ToString("s") -Encoding ASCII -Force } catch {}
166: 
167: $started = Get-Date
168: $status = "REVIEW"
169: $failures = New-Object System.Collections.Generic.List[string]
170: $rewritten = 0
171: $skipped = 0
172: $candidates = 0
173: $alreadyUrl = 0
---
166: 
167: $started = Get-Date
168: $status = "REVIEW"
169: $failures = New-Object System.Collections.Generic.List[string]
170: $rewritten = 0
171: $skipped = 0
172: $candidates = 0
173: $alreadyUrl = 0
174: $backupPath = ""
---
176: 
177: try {
178:   Write-Step "Starting client-safe URL rewriter." "INFO"
179:   if (!(Test-Path -LiteralPath $Sqlite)) { [void]$failures.Add("sqlite3 missing") }
180:   if (!(Test-Path -LiteralPath $PlexDb)) { [void]$failures.Add("Plex DB missing") }
181:   if ($failures.Count -eq 0) {
182:     $query = "select mp.id || char(9) || mi.id || char(9) || mi.library_section_id || char(9) || coalesce(m.title,'') || char(9) || coalesce(mp.file,'') from media_parts mp join media_items mi on mi.id=mp.media_item_id left join metadata_items m on m.id=mi.metadata_item_id where mi.library_section_id in (5,6,7,8,10) and mi.deleted_at is null and mp.deleted_at is null and (mp.file like '%.strm' or mp.file like 'http://127.0.0.1:18788/live%' or mp.file like 'http://192.168.1.184:18788/live%') order by mi.library_section_id, mp.id;"
183:     $rowsText = Invoke-PlexSql $query
184:     if ($rowsText -match "ERROR|locked|unable") {
---
177: try {
178:   Write-Step "Starting client-safe URL rewriter." "INFO"
179:   if (!(Test-Path -LiteralPath $Sqlite)) { [void]$failures.Add("sqlite3 missing") }
180:   if (!(Test-Path -LiteralPath $PlexDb)) { [void]$failures.Add("Plex DB missing") }
181:   if ($failures.Count -eq 0) {
182:     $query = "select mp.id || char(9) || mi.id || char(9) || mi.library_section_id || char(9) || coalesce(m.title,'') || char(9) || coalesce(mp.file,'') from media_parts mp join media_items mi on mi.id=mp.media_item_id left join metadata_items m on m.id=mi.metadata_item_id where mi.library_section_id in (5,6,7,8,10) and mi.deleted_at is null and mp.deleted_at is null and (mp.file like '%.strm' or mp.file like 'http://127.0.0.1:18788/live%' or mp.file like 'http://192.168.1.184:18788/live%') order by mi.library_section_id, mp.id;"
183:     $rowsText = Invoke-PlexSql $query
184:     if ($rowsText -match "ERROR|locked|unable") {
185:       [void]$failures.Add("Plex DB query failed")
---
178:   Write-Step "Starting client-safe URL rewriter." "INFO"
179:   if (!(Test-Path -LiteralPath $Sqlite)) { [void]$failures.Add("sqlite3 missing") }
180:   if (!(Test-Path -LiteralPath $PlexDb)) { [void]$failures.Add("Plex DB missing") }
181:   if ($failures.Count -eq 0) {
182:     $query = "select mp.id || char(9) || mi.id || char(9) || mi.library_section_id || char(9) || coalesce(m.title,'') || char(9) || coalesce(mp.file,'') from media_parts mp join media_items mi on mi.id=mp.media_item_id left join metadata_items m on m.id=mi.metadata_item_id where mi.library_section_id in (5,6,7,8,10) and mi.deleted_at is null and mp.deleted_at is null and (mp.file like '%.strm' or mp.file like 'http://127.0.0.1:18788/live%' or mp.file like 'http://192.168.1.184:18788/live%') order by mi.library_section_id, mp.id;"
183:     $rowsText = Invoke-PlexSql $query
184:     if ($rowsText -match "ERROR|locked|unable") {
185:       [void]$failures.Add("Plex DB query failed")
186:     } else {
---
182:     $query = "select mp.id || char(9) || mi.id || char(9) || mi.library_section_id || char(9) || coalesce(m.title,'') || char(9) || coalesce(mp.file,'') from media_parts mp join media_items mi on mi.id=mp.media_item_id left join metadata_items m on m.id=mi.metadata_item_id where mi.library_section_id in (5,6,7,8,10) and mi.deleted_at is null and mp.deleted_at is null and (mp.file like '%.strm' or mp.file like 'http://127.0.0.1:18788/live%' or mp.file like 'http://192.168.1.184:18788/live%') order by mi.library_section_id, mp.id;"
183:     $rowsText = Invoke-PlexSql $query
184:     if ($rowsText -match "ERROR|locked|unable") {
185:       [void]$failures.Add("Plex DB query failed")
186:     } else {
187:       $rows = $rowsText -split "`r?`n" | Where-Object { $_.Trim().Length -gt 0 }
188:       $updates = New-Object System.Collections.Generic.List[string]
189:       $probeUrl = ""
190:       foreach ($line in $rows) {
---
``

## D:\PlexTools\Scripts\scarflix_v2\ScarFLIX_v2_CompactStatusPublisher.ps1
``text
130:     }
131:     $sha = ""
132:     try {
133:         $existing = Invoke-RestMethod -Uri ($api + "?ref=$Branch") -Headers $headers -Method Get -TimeoutSec 20 -ErrorAction Stop
134:         if ($existing.sha) { $sha = "" + $existing.sha }
135:     } catch {}
136:     try {
137:         $bytes = [System.IO.File]::ReadAllBytes($localPath)
138:         $b64 = [Convert]::ToBase64String($bytes)
---
143:         }
144:         if ($sha) { $body.sha = $sha }
145:         $json = $body | ConvertTo-Json -Depth 5
146:         Invoke-RestMethod -Uri $api -Headers $headers -Method Put -Body $json -ContentType "application/json" -TimeoutSec 30 -ErrorAction Stop | Out-Null
147:         return "OK"
148:     } catch {
149:         return ("FAIL " + $_.Exception.Message)
150:     }
151: }
---
146:         Invoke-RestMethod -Uri $api -Headers $headers -Method Put -Body $json -ContentType "application/json" -TimeoutSec 30 -ErrorAction Stop | Out-Null
147:         return "OK"
148:     } catch {
149:         return ("FAIL " + $_.Exception.Message)
150:     }
151: }
152: 
153: MKD $PublicRoot
154: MKD $LogsRoot
---
169: $oldDash = READJSON $oldDashPath
170: 
171: $controllerText = TSK "ScarFLIX_v2_AutonomousController"
172: $platformText = TSK "ScarFLIX_v2_PlatformGate_LocalRunner_Detached"
173: $manualText = TSK "ScarFLIX_v2_PlatformGate_Manual_OneShot"
174: $expansionText = TSK "ScarFLIX_v2_SafeWebDavExpansionPipeline"
175: 
176: $controllerRunning = ISRUN $controllerText
177: $platformRunning = ISRUN $platformText
---
170: 
171: $controllerText = TSK "ScarFLIX_v2_AutonomousController"
172: $platformText = TSK "ScarFLIX_v2_PlatformGate_LocalRunner_Detached"
173: $manualText = TSK "ScarFLIX_v2_PlatformGate_Manual_OneShot"
174: $expansionText = TSK "ScarFLIX_v2_SafeWebDavExpansionPipeline"
175: 
176: $controllerRunning = ISRUN $controllerText
177: $platformRunning = ISRUN $platformText
178: $manualRunning = ISRUN $manualText
---
184: $movies = FIRSTNONEMPTY (TXT (FIND $platform @("movies","movie_count","moviecount") 0)) (TXT (FIND $controller @("movies","movie_count","moviecount") 0)) (TXT (FIND $oldDash @("movies") 0))
185: $tv = FIRSTNONEMPTY (TXT (FIND $platform @("tv","tv_count","episode_count","episodes") 0)) (TXT (FIND $controller @("tv","tv_count","episode_count","episodes") 0)) (TXT (FIND $oldDash @("tv") 0))
186: 
187: $ctrlTransient = INT (FIND $controller @("transient_failures","transient_count","transientheldcount","transient_held_count") 0)
188: $ctrlPrunable = INT (FIND $controller @("prunable_failures","permanent_failures","prunable_count","permanent_count") 0)
189: $jasonAction = BOOL (FIND $controller @("jason_action_required","action_required","user_action_required") 0)
190: 
191: $pgStatus = TXT (FIND $platform @("status","overall_status","result","health") 0)
192: $pgSame = TXT (FIND $platform @("same_snapshot","same_snapshot_confirmed","sameSnapshot") 0)
---
185: $tv = FIRSTNONEMPTY (TXT (FIND $platform @("tv","tv_count","episode_count","episodes") 0)) (TXT (FIND $controller @("tv","tv_count","episode_count","episodes") 0)) (TXT (FIND $oldDash @("tv") 0))
186: 
187: $ctrlTransient = INT (FIND $controller @("transient_failures","transient_count","transientheldcount","transient_held_count") 0)
188: $ctrlPrunable = INT (FIND $controller @("prunable_failures","permanent_failures","prunable_count","permanent_count") 0)
189: $jasonAction = BOOL (FIND $controller @("jason_action_required","action_required","user_action_required") 0)
190: 
191: $pgStatus = TXT (FIND $platform @("status","overall_status","result","health") 0)
192: $pgSame = TXT (FIND $platform @("same_snapshot","same_snapshot_confirmed","sameSnapshot") 0)
193: $pgTransient = INT (FIND $platform @("transient_failures","transient_count","transientheldcount","transient_held_count") 0)
---
190: 
191: $pgStatus = TXT (FIND $platform @("status","overall_status","result","health") 0)
192: $pgSame = TXT (FIND $platform @("same_snapshot","same_snapshot_confirmed","sameSnapshot") 0)
193: $pgTransient = INT (FIND $platform @("transient_failures","transient_count","transientheldcount","transient_held_count") 0)
194: $pgPrunable = INT (FIND $platform @("prunable_failures","permanent_failures","prunable_count","permanent_count") 0)
195: $candidateStatus = TXT (FIND $candidate @("status","overall_status","result","health") 0)
196: $healthStatus = TXT (FIND $health @("status","overall_status","result","health") 0)
197: $activeStatus = TXT (FIND $active @("status","overall_status","result","health") 0)
198: 
---
191: $pgStatus = TXT (FIND $platform @("status","overall_status","result","health") 0)
192: $pgSame = TXT (FIND $platform @("same_snapshot","same_snapshot_confirmed","sameSnapshot") 0)
193: $pgTransient = INT (FIND $platform @("transient_failures","transient_count","transientheldcount","transient_held_count") 0)
194: $pgPrunable = INT (FIND $platform @("prunable_failures","permanent_failures","prunable_count","permanent_count") 0)
195: $candidateStatus = TXT (FIND $candidate @("status","overall_status","result","health") 0)
196: $healthStatus = TXT (FIND $health @("status","overall_status","result","health") 0)
197: $activeStatus = TXT (FIND $active @("status","overall_status","result","health") 0)
198: 
199: $controllerAge = AGE $controllerPath
---
212: 
213: if ($staleRunningStatus) {
214:     $signal = "ATTN"
215:     $reason = "PlatformGate status says RUNNING, but no runner task is active. Status is stale or the runner exited without finalising."
216:     $next = "Run local triage/recovery, not Codex."
217: } elseif ($jasonAction) {
218:     $signal = "ATTN"
219:     $reason = "Status says Jason action is required."
220:     $next = "Bring ASK_CHATGPT_SUMMARY.md back to ChatGPT."
---
218:     $signal = "ATTN"
219:     $reason = "Status says Jason action is required."
220:     $next = "Bring ASK_CHATGPT_SUMMARY.md back to ChatGPT."
221: } elseif ($ctrlStatus -match "(?i)BLOCKED_LOOP|BLOCKED_TRIAGE|FAIL|ERROR") {
222:     $signal = "ATTN"
223:     $reason = ("Controller status needs triage: {0}" -f $ctrlStatus)
224:     $next = "Use local triage/recovery. Do not run Codex while credits are unavailable."
225: } elseif ($ctrlPrunable -gt 0 -or $pgPrunable -gt 0) {
226:     $signal = "ATTN"
---
224:     $next = "Use local triage/recovery. Do not run Codex while credits are unavailable."
225: } elseif ($ctrlPrunable -gt 0 -or $pgPrunable -gt 0) {
226:     $signal = "ATTN"
227:     $reason = ("Permanent/prunable failures detected. Controller={0}; PlatformGate={1}" -f $ctrlPrunable,$pgPrunable)
228:     $next = "Local triage should quarantine sources, not prune transient failures."
229: } elseif ($candidateStatus -match "(?i)PASS|COMPLETE|DONE") {
230:     $signal = "DONE"
231:     $reason = "Candidate-source model appears complete."
232:     $next = "Bring summary back to ChatGPT for next milestone."
---
225: } elseif ($ctrlPrunable -gt 0 -or $pgPrunable -gt 0) {
226:     $signal = "ATTN"
227:     $reason = ("Permanent/prunable failures detected. Controller={0}; PlatformGate={1}" -f $ctrlPrunable,$pgPrunable)
228:     $next = "Local triage should quarantine sources, not prune transient failures."
229: } elseif ($candidateStatus -match "(?i)PASS|COMPLETE|DONE") {
230:     $signal = "DONE"
231:     $reason = "Candidate-source model appears complete."
232:     $next = "Bring summary back to ChatGPT for next milestone."
233: } elseif (($pgStatus -match "(?i)PASS|COMPLETE|DONE") -and !$anyRunner) {
---
232:     $next = "Bring summary back to ChatGPT for next milestone."
233: } elseif (($pgStatus -match "(?i)PASS|COMPLETE|DONE") -and !$anyRunner) {
234:     $signal = "PG_DONE"
235:     $reason = "PlatformGate appears complete."
236:     $next = "Bring summary back to ChatGPT for next offline step."
237: } elseif ($anyRunner) {
238:     $signal = "RUNNING"
239:     $reason = "A local runner/controller task is active."
240:     $next = "Wait. Dashboard will refresh."
---
240:     $next = "Wait. Dashboard will refresh."
241: } elseif ($ctrlTransient -gt 0 -or $pgTransient -gt 0) {
242:     $signal = "RETRY_WAIT"
243:     $reason = "Only transient failures detected."
244:     $next = "Wait for retry if controller is enabled; otherwise run local recovery."
245: } elseif ($controllerAge -gt 90 -and $platformAge -gt 90) {
246:     $signal = "STALE"
247:     $reason = "Status files are old and no active runner was detected."
248:     $next = "Run local triage/recovery."
---
297: $md += ("- Milestone: {0}" -f $milestone)
298: $md += ("- Visible: {0}" -f $visible)
299: $md += ("- Movies/TV: {0}/{1}" -f $movies,$tv)
300: $md += ("- PlatformGate: {0}" -f $pgStatus)
301: $md += ("- Same snapshot: {0}" -f $pgSame)
302: $md += ("- Health: {0}" -f $healthStatus)
303: $md += ("- WebDAV gate: {0}" -f $activeStatus)
304: $md += ("- Candidate-source: {0}" -f $candidateStatus)
305: $md += ""
---
303: $md += ("- WebDAV gate: {0}" -f $activeStatus)
304: $md += ("- Candidate-source: {0}" -f $candidateStatus)
305: $md += ""
306: $md += "## Failures"
307: $md += ("- Controller transient/prunable: {0}/{1}" -f $ctrlTransient,$ctrlPrunable)
308: $md += ("- PlatformGate transient/prunable: {0}/{1}" -f $pgTransient,$pgPrunable)
309: $md += ""
310: $md += "## Tasks"
311: $md += ("- Controller running: {0}" -f $controllerRunning)
---
305: $md += ""
306: $md += "## Failures"
307: $md += ("- Controller transient/prunable: {0}/{1}" -f $ctrlTransient,$ctrlPrunable)
308: $md += ("- PlatformGate transient/prunable: {0}/{1}" -f $pgTransient,$pgPrunable)
309: $md += ""
310: $md += "## Tasks"
311: $md += ("- Controller running: {0}" -f $controllerRunning)
312: $md += ("- Platform runner running: {0}" -f $platformRunning)
313: $md += ("- Manual runner running: {0}" -f $manualRunning)
---
``

## D:\PlexTools\Scripts\scarflix_v2\ScarFLIX_v2_ConcurrentStreamQA.ps1
``text
1: # ScarFLIX v2 concurrent stream QA wrapper.
2: # Windows PowerShell 5.1 safe. No secrets are read or logged.
3: 
4: param(
5:   [int]$Concurrency = 5,
6:   [int]$DecisionLimit = 0,
---
12: $ScriptRoot = "D:\PlexTools\Scripts\scarflix_v2"
13: $PublishRoot = "D:\PlexTools\public\latest\scarflix"
14: $LogRoot = "D:\PlexTools\logs"
15: $NodeScript = Join-Path $ScriptRoot "scarflix_v2_concurrent_stream_qa_node.js"
16: $StatusPath = Join-Path $PublishRoot "concurrent_stream_qa_status.json"
17: $LogPath = Join-Path $LogRoot ("scarflix_v2_concurrent_stream_qa_wrapper_{0}.log" -f (Get-Date -Format "yyyyMMdd"))
18: $TaskName = "ScarFLIX_v2_ConcurrentStreamQA"
19: $NodeExe = "C:\Program Files\nodejs\node.exe"
20: 
---
13: $PublishRoot = "D:\PlexTools\public\latest\scarflix"
14: $LogRoot = "D:\PlexTools\logs"
15: $NodeScript = Join-Path $ScriptRoot "scarflix_v2_concurrent_stream_qa_node.js"
16: $StatusPath = Join-Path $PublishRoot "concurrent_stream_qa_status.json"
17: $LogPath = Join-Path $LogRoot ("scarflix_v2_concurrent_stream_qa_wrapper_{0}.log" -f (Get-Date -Format "yyyyMMdd"))
18: $TaskName = "ScarFLIX_v2_ConcurrentStreamQA"
19: $NodeExe = "C:\Program Files\nodejs\node.exe"
20: 
21: function Ensure-Dir {
---
14: $LogRoot = "D:\PlexTools\logs"
15: $NodeScript = Join-Path $ScriptRoot "scarflix_v2_concurrent_stream_qa_node.js"
16: $StatusPath = Join-Path $PublishRoot "concurrent_stream_qa_status.json"
17: $LogPath = Join-Path $LogRoot ("scarflix_v2_concurrent_stream_qa_wrapper_{0}.log" -f (Get-Date -Format "yyyyMMdd"))
18: $TaskName = "ScarFLIX_v2_ConcurrentStreamQA"
19: $NodeExe = "C:\Program Files\nodejs\node.exe"
20: 
21: function Ensure-Dir {
22:   param([string]$Path)
---
15: $NodeScript = Join-Path $ScriptRoot "scarflix_v2_concurrent_stream_qa_node.js"
16: $StatusPath = Join-Path $PublishRoot "concurrent_stream_qa_status.json"
17: $LogPath = Join-Path $LogRoot ("scarflix_v2_concurrent_stream_qa_wrapper_{0}.log" -f (Get-Date -Format "yyyyMMdd"))
18: $TaskName = "ScarFLIX_v2_ConcurrentStreamQA"
19: $NodeExe = "C:\Program Files\nodejs\node.exe"
20: 
21: function Ensure-Dir {
22:   param([string]$Path)
23:   if ([string]::IsNullOrWhiteSpace($Path)) { return }
---
60: }
61: 
62: if (!(Test-Path -LiteralPath $NodeExe)) {
63:   Write-Step "FAIL" ("Node missing: {0}" -f $NodeExe)
64:   exit 1
65: }
66: 
67: if (!(Test-Path -LiteralPath $NodeScript)) {
68:   Write-Step "FAIL" ("Node QA script missing: {0}" -f $NodeScript)
---
65: }
66: 
67: if (!(Test-Path -LiteralPath $NodeScript)) {
68:   Write-Step "FAIL" ("Node QA script missing: {0}" -f $NodeScript)
69:   exit 1
70: }
71: 
72: Write-Step "INFO" ("Concurrent QA start, concurrency={0}, decision_limit={1}" -f $Concurrency,$DecisionLimit)
73: 
---
69:   exit 1
70: }
71: 
72: Write-Step "INFO" ("Concurrent QA start, concurrency={0}, decision_limit={1}" -f $Concurrency,$DecisionLimit)
73: 
74: $output = ""
75: try {
76:   $output = (& $NodeExe $NodeScript $Concurrency $DecisionLimit 2>&1 | Out-String)
77:   if (![string]::IsNullOrWhiteSpace($output)) {
---
78:     try { Add-Content -LiteralPath $LogPath -Value (ConvertTo-AsciiText $output) -Encoding UTF8 } catch {}
79:   }
80: } catch {
81:   Write-Step "FAIL" ("Node QA failed: {0}" -f $_.Exception.Message)
82:   exit 1
83: }
84: 
85: $status = Read-Status
86: if ($null -eq $status) {
---
84: 
85: $status = Read-Status
86: if ($null -eq $status) {
87:   Write-Step "FAIL" ("Status file missing: {0}" -f $StatusPath)
88:   exit 1
89: }
90: 
91: Write-Step "INFO" ("Range passed={0} failed={1}" -f $status.range.passed,$status.range.failed)
92: Write-Step "INFO" ("Decision passed={0} failed={1}" -f $status.plex_decision.passed,$status.plex_decision.failed)
---
88:   exit 1
89: }
90: 
91: Write-Step "INFO" ("Range passed={0} failed={1}" -f $status.range.passed,$status.range.failed)
92: Write-Step "INFO" ("Decision passed={0} failed={1}" -f $status.plex_decision.passed,$status.plex_decision.failed)
93: Write-Step $status.status ("Final: {0}" -f $status.status)
94: 
95: if ($status.status -eq "PASS") { exit 0 }
96: if ($status.status -eq "REVIEW") { exit 1 }
---
89: }
90: 
91: Write-Step "INFO" ("Range passed={0} failed={1}" -f $status.range.passed,$status.range.failed)
92: Write-Step "INFO" ("Decision passed={0} failed={1}" -f $status.plex_decision.passed,$status.plex_decision.failed)
93: Write-Step $status.status ("Final: {0}" -f $status.status)
94: 
95: if ($status.status -eq "PASS") { exit 0 }
96: if ($status.status -eq "REVIEW") { exit 1 }
97: exit 2
---
93: Write-Step $status.status ("Final: {0}" -f $status.status)
94: 
95: if ($status.status -eq "PASS") { exit 0 }
96: if ($status.status -eq "REVIEW") { exit 1 }
97: exit 2
---
``

## D:\PlexTools\Scripts\scarflix_v2\scarflix_v2_concurrent_stream_qa_node.js
``text
6: const STATE_ROOT = "D:/PlexTools/state/scarflix_v2";
7: const LOG_ROOT = "D:/PlexTools/logs";
8: const MAP_PATH = `${STATE_ROOT}/webdav_map.json`;
9: const STATUS_PATH = `${PUBLISH_ROOT}/concurrent_stream_qa_status.json`;
10: const REPORT_PATH = `${PUBLISH_ROOT}/concurrent_stream_qa_status.md`;
11: const LOG_PATH = `${LOG_ROOT}/scarflix_v2_concurrent_stream_qa_node.log`;
12: const LOCK_PATH = `${STATE_ROOT}/concurrent_stream_qa.lock`;
13: const SQLITE_EXE = "D:/PlexTools/bin/sqlite3.exe";
14: const PLEX_DB = "C:/Users/jason/AppData/Local/Plex Media Server/Plug-in Support/Databases/com.plexapp.plugins.library.db";
---
7: const LOG_ROOT = "D:/PlexTools/logs";
8: const MAP_PATH = `${STATE_ROOT}/webdav_map.json`;
9: const STATUS_PATH = `${PUBLISH_ROOT}/concurrent_stream_qa_status.json`;
10: const REPORT_PATH = `${PUBLISH_ROOT}/concurrent_stream_qa_status.md`;
11: const LOG_PATH = `${LOG_ROOT}/scarflix_v2_concurrent_stream_qa_node.log`;
12: const LOCK_PATH = `${STATE_ROOT}/concurrent_stream_qa.lock`;
13: const SQLITE_EXE = "D:/PlexTools/bin/sqlite3.exe";
14: const PLEX_DB = "C:/Users/jason/AppData/Local/Plex Media Server/Plug-in Support/Databases/com.plexapp.plugins.library.db";
15: const PLEX_BASE = "http://192.168.1.184:32400";
---
8: const MAP_PATH = `${STATE_ROOT}/webdav_map.json`;
9: const STATUS_PATH = `${PUBLISH_ROOT}/concurrent_stream_qa_status.json`;
10: const REPORT_PATH = `${PUBLISH_ROOT}/concurrent_stream_qa_status.md`;
11: const LOG_PATH = `${LOG_ROOT}/scarflix_v2_concurrent_stream_qa_node.log`;
12: const LOCK_PATH = `${STATE_ROOT}/concurrent_stream_qa.lock`;
13: const SQLITE_EXE = "D:/PlexTools/bin/sqlite3.exe";
14: const PLEX_DB = "C:/Users/jason/AppData/Local/Plex Media Server/Plug-in Support/Databases/com.plexapp.plugins.library.db";
15: const PLEX_BASE = "http://192.168.1.184:32400";
16: const WEBDAV_BASE = "http://127.0.0.1:18789";
---
9: const STATUS_PATH = `${PUBLISH_ROOT}/concurrent_stream_qa_status.json`;
10: const REPORT_PATH = `${PUBLISH_ROOT}/concurrent_stream_qa_status.md`;
11: const LOG_PATH = `${LOG_ROOT}/scarflix_v2_concurrent_stream_qa_node.log`;
12: const LOCK_PATH = `${STATE_ROOT}/concurrent_stream_qa.lock`;
13: const SQLITE_EXE = "D:/PlexTools/bin/sqlite3.exe";
14: const PLEX_DB = "C:/Users/jason/AppData/Local/Plex Media Server/Plug-in Support/Databases/com.plexapp.plugins.library.db";
15: const PLEX_BASE = "http://192.168.1.184:32400";
16: const WEBDAV_BASE = "http://127.0.0.1:18789";
17: 
---
38: 
39: function writeReport(summary) {
40:   const lines = [
41:     "# ScarFLIX v2 Concurrent Stream QA",
42:     "",
43:     `Status: ${summary.status}`,
44:     `Started UTC: ${summary.started_utc}`,
45:     `Ended UTC: ${summary.ended_utc}`,
46:     `Target concurrency: ${summary.target_concurrency}`,
---
47:     "",
48:     "## Range Reads",
49:     `- passed: ${summary.range.passed}`,
50:     `- failed: ${summary.range.failed}`,
51:     "",
52:     "## Plex Decisions",
53:     `- passed: ${summary.plex_decision.passed}`,
54:     `- failed: ${summary.plex_decision.failed}`
55:   ];
---
51:     "",
52:     "## Plex Decisions",
53:     `- passed: ${summary.plex_decision.passed}`,
54:     `- failed: ${summary.plex_decision.failed}`
55:   ];
56:   fs.writeFileSync(REPORT_PATH, lines.join("\r\n"), "utf8");
57: }
58: 
59: function acquireLock() {
---
86: function sql(query) {
87:   const result = childProcess.spawnSync(SQLITE_EXE, ["-separator", "\t", PLEX_DB, query], {
88:     encoding: "utf8",
89:     timeout: 30000
90:   });
91:   if (result.error) throw result.error;
92:   if (result.status !== 0 && result.stderr) throw new Error(result.stderr);
93:   return result.stdout || "";
94: }
---
103:   });
104: }
105: 
106: async function fetchWithTimeout(url, options, timeoutMs) {
107:   const controller = new AbortController();
108:   const timer = setTimeout(() => controller.abort(), timeoutMs);
109:   const started = Date.now();
110:   try {
111:     const response = await fetch(url, Object.assign({}, options, { signal: controller.signal }));
---
105: 
106: async function fetchWithTimeout(url, options, timeoutMs) {
107:   const controller = new AbortController();
108:   const timer = setTimeout(() => controller.abort(), timeoutMs);
109:   const started = Date.now();
110:   try {
111:     const response = await fetch(url, Object.assign({}, options, { signal: controller.signal }));
112:     return { response, elapsed_ms: Date.now() - started };
113:   } finally {
---
111:     const response = await fetch(url, Object.assign({}, options, { signal: controller.signal }));
112:     return { response, elapsed_ms: Date.now() - started };
113:   } finally {
114:     clearTimeout(timer);
115:   }
116: }
117: 
118: async function rangeTest(entry) {
119:   const started = Date.now();
---
118: async function rangeTest(entry) {
119:   const started = Date.now();
120:   try {
121:     const result = await fetchWithTimeout(webdavUrl(entry.webdav_path), {
122:       headers: { Range: "bytes=0-1048575" }
123:     }, 30000);
124:     const buffer = await result.response.arrayBuffer();
125:     return {
126:       ok: result.response.status === 206 && buffer.byteLength > 0,
---
135:     return {
136:       ok: false,
137:       title: entry.title || "",
138:       error: error.name === "AbortError" ? "timeout" : error.message,
139:       elapsed_ms: Date.now() - started
140:     };
141:   }
142: }
143: 
---
147:     directPlay: "0",
148:     directStream: "0",
149:     directStreamAudio: "0",
150:     protocol: "hls",
151:     fastSeek: "1",
152:     path: `/library/metadata/${row.metadata_id}`,
153:     session: crypto.randomUUID(),
154:     mediaIndex: "0",
155:     partIndex: "0",
---
167:   Object.keys(values).forEach(key => query.set(key, values[key]));
168:   const started = Date.now();
169:   try {
170:     const result = await fetchWithTimeout(`${PLEX_BASE}/video/:/transcode/universal/decision?${query.toString()}`, {
171:       headers: {
172:         "X-Plex-Product": "ScarFLIX QA",
173:         "X-Plex-Version": "2",
174:         "X-Plex-Client-Identifier": "scarflix-concurrent-qa",
175:         "X-Plex-Platform": "Windows",
---
171:       headers: {
172:         "X-Plex-Product": "ScarFLIX QA",
173:         "X-Plex-Version": "2",
174:         "X-Plex-Client-Identifier": "scarflix-concurrent-qa",
175:         "X-Plex-Platform": "Windows",
176:         "X-Plex-Device": "Codex QA"
177:       }
178:     }, 20000);
179:     const body = await result.response.text();
---
191:       title: row.title || "",
192:       metadata_id: row.metadata_id,
193:       part_id: row.part_id,
194:       error: error.name === "AbortError" ? "timeout" : error.message,
195:       elapsed_ms: Date.now() - started
196:     };
197:   }
198: }
199: 
---
203:   const startedUtc = now();
204:   if (!acquireLock()) {
205:     const summary = {
206:       component: "scarflix_v2_concurrent_stream_qa",
207:       status: "REVIEW",
208:       started_utc: startedUtc,
209:       ended_utc: now(),
210:       target_concurrency: targetConcurrency,
211:       reason: "Another concurrent QA run is active",
---
``

## D:\PlexTools\Scripts\scarflix_v2\ScarFLIX_v2_ControlledCatalogExpansion.ps1
``text
1: # ScarFLIX v2 controlled catalog expansion
2: # Adds a bounded batch of live catalog entries, verifies them through Plex,
3: # and archives only newly added failures. Windows PowerShell 5.1 compatible.
4: 
5: param(
6:   [int]$MaxNewItems = 12,
7:   [int]$PagesPerSource = 1,
8:   [switch]$IncludeTv,
---
23: $PublishRoot = "D:\PlexTools\public\latest\scarflix"
24: $StateRoot = "D:\PlexTools\state\scarflix_v2"
25: $TempRoot = "D:\PlexTools\temp\scarflix_v2"
26: $ArchiveRoot = "D:\PlexTools\archive\scarflix_v2\controlled_expansion_failed_$Stamp"
27: $LiveMovieRoot = "D:\StremioCatalog\_Hybrid\Movies\_ScarFLIXLive"
28: $LiveTvRoot = "D:\StremioCatalog\_Hybrid\_HTTP\TV"
29: $ProviderMovieRoot = "D:\StremioCatalog\Netflix\Movies"
30: $ProviderNetflixTvRoot = "D:\StremioCatalog\Netflix\TV"
31: $ProviderCrunchyrollTvRoot = "D:\StremioCatalog\Crunchyroll\TV"
---
44: $Errors = New-Object System.Collections.ArrayList
45: $Archived = New-Object System.Collections.ArrayList
46: $NewPaths = New-Object System.Collections.ArrayList
47: $FailedPaths = New-Object System.Collections.ArrayList
48: $PassedPaths = New-Object System.Collections.ArrayList
49: $TouchedSections = @{}
50: 
51: function Ensure-Dir {
52:   param([string]$Path)
---
155:     Log-Line "INFO" ("{0} exit code {1}" -f $Name, $Exit)
156:     return [int]$Exit
157:   } catch {
158:     Add-ErrorLine ("{0} failed to launch: {1}" -f $Name, $_.Exception.Message)
159:     return 999
160:   }
161: }
162: 
163: function Invoke-ScriptFile {
---
266:   return ("movie:tmdb:{0}" -f $Tmdb)
267: }
268: 
269: function Add-ExclusionsForFailedPaths {
270:   param([string[]]$Paths)
271:   if ($Paths.Count -le 0) { return 0 }
272:   Ensure-Dir $StateRoot
273:   if (Test-Path -LiteralPath $ExclusionPath) {
274:     $Backup = Join-Path $LogRoot ("live_catalog_exclusions_backup_{0}.json" -f $Stamp)
---
320:       tmdb_id = $Tmdb
321:       title = (ConvertTo-AsciiText $Title)
322:       year = $Year
323:       reason = ("Controlled expansion failed Plex playback on {0}" -f (Get-Date).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ"))
324:     }
325:     if ($Type -eq "episode") {
326:       $Entry.season = $Season
327:       $Entry.episode = $Episode
328:     }
---
338:   return $Added
339: }
340: 
341: function Archive-FailedStrm {
342:   param([string]$Path)
343:   if (!(Test-Path -LiteralPath $Path)) { return $false }
344:   $RootRow = Get-RootForPath -Path $Path
345:   if ($null -eq $RootRow) {
346:     Add-WarningLine ("Refusing to archive path outside known roots: {0}" -f $Path)
---
361:     Move-Item -LiteralPath $Path -Destination $FinalDest -Force
362:     [void]$Archived.Add([ordered]@{ source = $Path; destination = $FinalDest })
363:     $TouchedSections["$($RootRow.section)"] = [int]$RootRow.section
364:     Log-Line "INFO" ("Archived failed new item: {0}" -f $Path)
365:     return $true
366:   } catch {
367:     Add-WarningLine ("Archive failed for {0}: {1}" -f $Path, $_.Exception.Message)
368:     return $false
369:   }
---
364:     Log-Line "INFO" ("Archived failed new item: {0}" -f $Path)
365:     return $true
366:   } catch {
367:     Add-WarningLine ("Archive failed for {0}: {1}" -f $Path, $_.Exception.Message)
368:     return $false
369:   }
370: }
371: 
372: function Invoke-PlexScanSection {
---
379:     Log-Line "INFO" ("Refreshing Plex section {0}" -f $Section)
380:     & $PlexScanner --scan --refresh --section $Section | Out-Null
381:   } catch {
382:     Add-WarningLine ("Plex scan failed for section {0}: {1}" -f $Section, $_.Exception.Message)
383:   }
384: }
385: 
386: Ensure-Dir $LogRoot
387: Ensure-Dir $PublishRoot
---
460:   if ($null -ne $ProbeStatus -and $ProbeStatus.PSObject.Properties["results"]) {
461:     foreach ($Result in @($ProbeStatus.results)) {
462:       $Path = "" + (Get-Prop -Object $Result -Name "path" -Default "")
463:       $Status = "" + (Get-Prop -Object $Result -Name "status" -Default "FAIL")
464:       if ($Status -eq "PASS") {
465:         [void]$PassedPaths.Add($Path)
466:       } else {
467:         [void]$FailedPaths.Add($Path)
468:       }
---
464:       if ($Status -eq "PASS") {
465:         [void]$PassedPaths.Add($Path)
466:       } else {
467:         [void]$FailedPaths.Add($Path)
468:       }
469:     }
470:   } else {
471:     Add-ErrorLine "Playback probe did not produce a readable status file"
472:   }
---
472:   }
473: }
474: 
475: $FailedPathArray = @($FailedPaths | Sort-Object)
476: $PassedPathArray = @($PassedPaths | Sort-Object)
477: $ExclusionsAdded = 0
478: if ($FailedPathArray.Count -gt 0) {
479:   Log-Line "WARN" ("Archiving {0} failed new rows" -f $FailedPathArray.Count)
480:   $ExclusionsAdded = Add-ExclusionsForFailedPaths -Paths $FailedPathArray
---
475: $FailedPathArray = @($FailedPaths | Sort-Object)
476: $PassedPathArray = @($PassedPaths | Sort-Object)
477: $ExclusionsAdded = 0
478: if ($FailedPathArray.Count -gt 0) {
479:   Log-Line "WARN" ("Archiving {0} failed new rows" -f $FailedPathArray.Count)
480:   $ExclusionsAdded = Add-ExclusionsForFailedPaths -Paths $FailedPathArray
481:   foreach ($Path in @($FailedPathArray)) { [void](Archive-FailedStrm -Path $Path) }
482: }
483: 
---
476: $PassedPathArray = @($PassedPaths | Sort-Object)
477: $ExclusionsAdded = 0
478: if ($FailedPathArray.Count -gt 0) {
479:   Log-Line "WARN" ("Archiving {0} failed new rows" -f $FailedPathArray.Count)
480:   $ExclusionsAdded = Add-ExclusionsForFailedPaths -Paths $FailedPathArray
481:   foreach ($Path in @($FailedPathArray)) { [void](Archive-FailedStrm -Path $Path) }
482: }
483: 
484: foreach ($SectionKey in @($TouchedSections.Keys | Sort-Object)) {
---
477: $ExclusionsAdded = 0
478: if ($FailedPathArray.Count -gt 0) {
479:   Log-Line "WARN" ("Archiving {0} failed new rows" -f $FailedPathArray.Count)
480:   $ExclusionsAdded = Add-ExclusionsForFailedPaths -Paths $FailedPathArray
481:   foreach ($Path in @($FailedPathArray)) { [void](Archive-FailedStrm -Path $Path) }
482: }
483: 
484: foreach ($SectionKey in @($TouchedSections.Keys | Sort-Object)) {
485:   $Section = 0
---
478: if ($FailedPathArray.Count -gt 0) {
479:   Log-Line "WARN" ("Archiving {0} failed new rows" -f $FailedPathArray.Count)
480:   $ExclusionsAdded = Add-ExclusionsForFailedPaths -Paths $FailedPathArray
481:   foreach ($Path in @($FailedPathArray)) { [void](Archive-FailedStrm -Path $Path) }
482: }
483: 
484: foreach ($SectionKey in @($TouchedSections.Keys | Sort-Object)) {
485:   $Section = 0
486:   [void][int]::TryParse(("" + $SectionKey), [ref]$Section)
---
487:   if ($Section -gt 0) { Invoke-PlexScanSection -Section $Section }
488: }
489: 
490: if ($FailedPathArray.Count -gt 0 -and $PlexSettleSeconds -gt 0) {
491:   Log-Line "INFO" ("Waiting {0}s after archive scans" -f $PlexSettleSeconds)
492:   Start-Sleep -Seconds $PlexSettleSeconds
493: }
494: 
495: $Surviving = New-Object System.Collections.ArrayList
---
516: if ($SurvivingArray.Count -gt 0 -and $FinalHydrateExit -ne 0 -and $null -ne $FinalProbeStatus) {
``

## D:\PlexTools\Scripts\scarflix_v2\ScarFLIX_v2_CurationRepair.ps1
``text
1: # ScarFLIX v2 curation repair
2: # Hides visible WebDAV catalog rows that pass technical QA but fail content or release-window policy.
3: # Windows PowerShell 5.1 compatible. No secrets are printed.
4: 
5: $ErrorActionPreference = "Continue"
6: try { [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12 } catch {}
7: 
---
150:   if ($Type -eq "episode") { $kind = "tv" }
151:   $uri = "https://api.themoviedb.org/3/{0}/{1}?api_key=[REDACTED]" -f $kind,$TmdbId,[Uri]::EscapeDataString($apiKey)
152:   try {
153:     $resp = Invoke-RestMethod -Uri $uri -UseBasicParsing -TimeoutSec 20 -ErrorAction Stop
154:     $TmdbCache[$key] = $resp
155:     return $resp
156:   } catch {
157:     $TmdbCache[$key] = $null
158:     return $null
---
293: 
294: $summary = [ordered]@{
295:   component = $Component
296:   status = "REVIEW"
297:   started_utc = $Started.ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ")
298:   ended_utc = ""
299:   duration_seconds = 0
300:   checked = 0
301:   blocked = 0
---
368:       }
369:       Write-JsonFile -Path (Join-Path $recordDir "source_quarantine.json") -Object $record
370:       [void]$records.Add($record)
371:       Write-Step "REVIEW" ("Curated out: {0} reason={1}" -f ("" + $entry.title),("" + $item.reason))
372:     }
373:     $summary.records = @($records.ToArray())
374:   }
375: 
376:   $top = New-Object System.Collections.ArrayList
---
381:   $summary.blocked = $blocked.Count
382:   $summary.status = "PASS"
383: } catch {
384:   $summary.status = "FAIL"
385:   $summary.records = @((ConvertTo-AsciiText $_.Exception.Message))
386:   Write-Step "FAIL" (ConvertTo-AsciiText $_.Exception.Message)
387: } finally {
388:   $Ended = Get-Date
389:   $summary.ended_utc = $Ended.ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ")
---
383: } catch {
384:   $summary.status = "FAIL"
385:   $summary.records = @((ConvertTo-AsciiText $_.Exception.Message))
386:   Write-Step "FAIL" (ConvertTo-AsciiText $_.Exception.Message)
387: } finally {
388:   $Ended = Get-Date
389:   $summary.ended_utc = $Ended.ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ")
390:   $summary.duration_seconds = [int]($Ended - $Started).TotalSeconds
391:   Write-JsonFile -Path $StatusPath -Object $summary
---
407: Write-Host ("Map removed: {0}" -f $summary.map_removed)
408: Write-Host ("Plex rows hidden: {0}" -f $summary.plex_rows_hidden)
409: Write-Host ("Status JSON: {0}" -f $StatusPath)
410: if ($summary.status -eq "FAIL") { exit 1 }
411: exit 0
---
``

## D:\PlexTools\Scripts\scarflix_v2\ScarFLIX_v2_DurableLiveBinder.ps1
``text
149:   if ([string]::IsNullOrWhiteSpace($out)) { return [ordered]@{ ok=$false; reason="db row not found" } }
150:   $line = ($out -split "`r?`n" | Select-Object -First 1)
151:   $cols = $line -split "`t", 9
152:   if ($cols.Count -lt 9) { return [ordered]@{ ok=$false; reason="profile parse failed" } }
153:   $width = [int]$cols[0]
154:   $height = [int]$cols[1]
155:   $duration = [int64]$cols[2]
156:   $video = "" + $cols[3]
157:   $audio = "" + $cols[4]
---
164: }
165: 
166: function Invoke-ChildScript {
167:   param([string[]]$Arguments, [int]$TimeoutMs)
168:   $proc = Start-Process -FilePath "powershell.exe" -ArgumentList $Arguments -NoNewWindow -PassThru
169:   $finished = $proc.WaitForExit($TimeoutMs)
170:   if (!$finished) {
171:     try { & taskkill.exe /PID $proc.Id /T /F | Out-Null } catch {}
172:     return 124
---
166: function Invoke-ChildScript {
167:   param([string[]]$Arguments, [int]$TimeoutMs)
168:   $proc = Start-Process -FilePath "powershell.exe" -ArgumentList $Arguments -NoNewWindow -PassThru
169:   $finished = $proc.WaitForExit($TimeoutMs)
170:   if (!$finished) {
171:     try { & taskkill.exe /PID $proc.Id /T /F | Out-Null } catch {}
172:     return 124
173:   }
174:   return [int]$proc.ExitCode
---
203: $status = "PASS"
204: $processed = 0
205: $ready = 0
206: $review = 0
207: $fail = 0
208: $results = New-Object System.Collections.ArrayList
209: 
210: Write-Step "INFO" "Durable live binder starting."
211: $targets = @(Get-Targets)
---
204: $processed = 0
205: $ready = 0
206: $review = 0
207: $fail = 0
208: $results = New-Object System.Collections.ArrayList
209: 
210: Write-Step "INFO" "Durable live binder starting."
211: $targets = @(Get-Targets)
212: if ($targets.Count -le 0) {
---
222:       strm_path = $target.strm_path
223:       durable_path = ""
224:       webdav_path = ""
225:       status = "REVIEW"
226:       reason = ""
227:       profile = $null
228:     }
229:     try {
230:       $strmPath = "" + $target.strm_path
---
238:       }
239: 
240:       $bridgeArgs = @("-NoProfile","-ExecutionPolicy","Bypass","-File",$BridgeScript,"-TargetPartId",("" + $target.part_id),"-MaxHydrateItems","0","-NoHydrate")
241:       $bridgeExit = Invoke-ChildScript -Arguments $bridgeArgs -TimeoutMs 180000
242:       if ($bridgeExit -ne 0) {
243:         throw ("WebDAV bridge failed with exit {0}" -f $bridgeExit)
244:       }
245:       $entry = Get-MapEntry -PartId ([int64]$target.part_id)
246:       if ($null -eq $entry) { throw "WebDAV map entry missing after bridge" }
---
240:       $bridgeArgs = @("-NoProfile","-ExecutionPolicy","Bypass","-File",$BridgeScript,"-TargetPartId",("" + $target.part_id),"-MaxHydrateItems","0","-NoHydrate")
241:       $bridgeExit = Invoke-ChildScript -Arguments $bridgeArgs -TimeoutMs 180000
242:       if ($bridgeExit -ne 0) {
243:         throw ("WebDAV bridge failed with exit {0}" -f $bridgeExit)
244:       }
245:       $entry = Get-MapEntry -PartId ([int64]$target.part_id)
246:       if ($null -eq $entry) { throw "WebDAV map entry missing after bridge" }
247:       $localPath = "" + $entry.local_path
248:       if ([string]::IsNullOrWhiteSpace($localPath)) { throw "WebDAV local path missing" }
---
274: "@
275:       $dbOut = Invoke-PlexSql $sql
276:       if ($dbOut -match "Error|locked|unable|constraint|syntax") {
277:         throw ("Plex DB durable path update failed: {0}" -f $dbOut)
278:       }
279: 
280:       $hydratorArgs = @("-NoProfile","-ExecutionPolicy","Bypass","-File",$HydratorScript,"-AllLive","-MaxItems","1","-TargetPath",$durablePath)
281:       $hydratorExit = Invoke-ChildScript -Arguments $hydratorArgs -TimeoutMs 240000
282:       if ($hydratorExit -ne 0) {
---
278:       }
279: 
280:       $hydratorArgs = @("-NoProfile","-ExecutionPolicy","Bypass","-File",$HydratorScript,"-AllLive","-MaxItems","1","-TargetPath",$durablePath)
281:       $hydratorExit = Invoke-ChildScript -Arguments $hydratorArgs -TimeoutMs 240000
282:       if ($hydratorExit -ne 0) {
283:         throw ("Hydrator failed with exit {0}" -f $hydratorExit)
284:       }
285:       $profile = Test-ProfiledPath -PartId ([int64]$target.part_id) -Path $durablePath
286:       $result.durable_path = $durablePath
---
280:       $hydratorArgs = @("-NoProfile","-ExecutionPolicy","Bypass","-File",$HydratorScript,"-AllLive","-MaxItems","1","-TargetPath",$durablePath)
281:       $hydratorExit = Invoke-ChildScript -Arguments $hydratorArgs -TimeoutMs 240000
282:       if ($hydratorExit -ne 0) {
283:         throw ("Hydrator failed with exit {0}" -f $hydratorExit)
284:       }
285:       $profile = Test-ProfiledPath -PartId ([int64]$target.part_id) -Path $durablePath
286:       $result.durable_path = $durablePath
287:       $result.webdav_path = $localPath
288:       $result.profile = $profile
---
292:         $ready++
293:         Write-Step "PASS" ("Bound durable live item: {0}" -f $durablePath)
294:       } else {
295:         $result.status = "REVIEW"
296:         $result.reason = "profile incomplete after durable binding"
297:         $review++
298:         Write-Step "REVIEW" ("Profile incomplete after durable binding: {0}" -f $durablePath)
299:       }
300:     } catch {
---
294:       } else {
295:         $result.status = "REVIEW"
296:         $result.reason = "profile incomplete after durable binding"
297:         $review++
298:         Write-Step "REVIEW" ("Profile incomplete after durable binding: {0}" -f $durablePath)
299:       }
300:     } catch {
301:       $result.status = "FAIL"
302:       $result.reason = ConvertTo-AsciiText $_.Exception.Message
---
295:         $result.status = "REVIEW"
296:         $result.reason = "profile incomplete after durable binding"
297:         $review++
298:         Write-Step "REVIEW" ("Profile incomplete after durable binding: {0}" -f $durablePath)
299:       }
300:     } catch {
301:       $result.status = "FAIL"
302:       $result.reason = ConvertTo-AsciiText $_.Exception.Message
303:       $fail++
---
298:         Write-Step "REVIEW" ("Profile incomplete after durable binding: {0}" -f $durablePath)
299:       }
300:     } catch {
301:       $result.status = "FAIL"
302:       $result.reason = ConvertTo-AsciiText $_.Exception.Message
303:       $fail++
304:       Write-Step "FAIL" ("Durable binding failed for part {0}: {1}" -f $target.part_id,$result.reason)
305:     }
306:     [void]$results.Add($result)
---
300:     } catch {
301:       $result.status = "FAIL"
302:       $result.reason = ConvertTo-AsciiText $_.Exception.Message
303:       $fail++
304:       Write-Step "FAIL" ("Durable binding failed for part {0}: {1}" -f $target.part_id,$result.reason)
305:     }
306:     [void]$results.Add($result)
307:   }
308: }
---
301:       $result.status = "FAIL"
302:       $result.reason = ConvertTo-AsciiText $_.Exception.Message
303:       $fail++
304:       Write-Step "FAIL" ("Durable binding failed for part {0}: {1}" -f $target.part_id,$result.reason)
305:     }
306:     [void]$results.Add($result)
307:   }
308: }
309: 
---
307:   }
308: }
309: 
310: if ($fail -gt 0) { $status = "FAIL" } elseif ($review -gt 0) { $status = "REVIEW" }
311: $ended = Get-Date
312: $summary = [ordered]@{
313:   component = $Component
314:   status = $status
315:   started_utc = $started.ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ")
---
``

## D:\PlexTools\Scripts\scarflix_v2\ScarFLIX_v2_GitHubTelemetryPublisher.ps1
``text
44:     $h = @{ Authorization = "token [REDACTED]"; Accept = "application/vnd.github+json"; "User-Agent" = "ScarFLIX-v2-telemetry" }
45:     $sha = ""
46:     try {
47:         $e = Invoke-RestMethod -Uri ($api + "?ref=$Branch") -Headers $h -Method Get -TimeoutSec 20 -ErrorAction Stop
48:         if ($e.sha) { $sha = "" + $e.sha }
49:     } catch {}
50:     try {
51:         $b64 = [Convert]::ToBase64String([IO.File]::ReadAllBytes($Local))
52:         $body = [ordered]@{ message = "Update ScarFLIX telemetry"; content = $b64; branch = $Branch }
---
51:         $b64 = [Convert]::ToBase64String([IO.File]::ReadAllBytes($Local))
52:         $body = [ordered]@{ message = "Update ScarFLIX telemetry"; content = $b64; branch = $Branch }
53:         if ($sha) { $body.sha = $sha }
54:         Invoke-RestMethod -Uri $api -Headers $h -Method Put -Body ($body | ConvertTo-Json -Depth 5) -ContentType "application/json" -TimeoutSec 30 -ErrorAction Stop | Out-Null
55:         return "OK"
56:     } catch { return ("FAIL " + $_.Exception.Message) }
57: }
58: function TaskLine($Name) {
59:     $txt = ""
---
53:         if ($sha) { $body.sha = $sha }
54:         Invoke-RestMethod -Uri $api -Headers $h -Method Put -Body ($body | ConvertTo-Json -Depth 5) -ContentType "application/json" -TimeoutSec 30 -ErrorAction Stop | Out-Null
55:         return "OK"
56:     } catch { return ("FAIL " + $_.Exception.Message) }
57: }
58: function TaskLine($Name) {
59:     $txt = ""
60:     try { $txt = schtasks.exe /Query /TN $Name /FO LIST /V 2>&1 | Out-String } catch { $txt = $_.Exception.Message }
61:     $state = "Unknown"
---
81: $Generated = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
82: $Tasks = @(
83:     TaskLine "ScarFLIX_v2_AutonomousController",
84:     TaskLine "ScarFLIX_v2_PlatformGate_LocalRunner_Detached",
85:     TaskLine "ScarFLIX_v2_PlatformGate_Manual_OneShot",
86:     TaskLine "ScarFLIX_v2_SafeWebDavExpansionPipeline",
87:     TaskLine "ScarFLIX_v2_GitHubTelemetryPublisher"
88: )
89: 
---
82: $Tasks = @(
83:     TaskLine "ScarFLIX_v2_AutonomousController",
84:     TaskLine "ScarFLIX_v2_PlatformGate_LocalRunner_Detached",
85:     TaskLine "ScarFLIX_v2_PlatformGate_Manual_OneShot",
86:     TaskLine "ScarFLIX_v2_SafeWebDavExpansionPipeline",
87:     TaskLine "ScarFLIX_v2_GitHubTelemetryPublisher"
88: )
89: 
90: $Processes = @()
---
90: $Processes = @()
91: try {
92:     $Processes = @(Get-CimInstance Win32_Process | Where-Object {
93:         ("" + $_.CommandLine) -match "ScarFLIX|PlatformGate|PlexTools"
94:     } | Select-Object ProcessId,Name,CommandLine,CreationDate)
95: } catch {}
96: 
97: $PlatformLog = LatestLog "*platform*gate*.log"
98: $ControllerLog = LatestLog "*controller*.log"
---
101: $RecentErrorLines = @()
102: foreach ($f in $RecentLogs) {
103:     try {
104:         $lines = Get-Content -LiteralPath $f.FullName -Tail 160 -ErrorAction SilentlyContinue | Where-Object { $_ -match "(?i)error|exception|fail|blocked|review|timeout|503|429|cannot|denied|\[x\]|warn" }
105:         foreach ($l in $lines) { $RecentErrorLines += ("{0}: {1}" -f $f.Name,$l) }
106:     } catch {}
107: }
108: if ($RecentErrorLines.Count -eq 0) { $RecentErrorLines += "No recent error lines found in the latest ScarFLIX logs." }
109: 
---
118: SaveText (Join-Path $PublicRoot "runner_processes.md") $ProcMd
119: SaveText (Join-Path $PublicRoot "runner_processes.json") ($Processes | ConvertTo-Json -Depth 5)
120: 
121: SaveText (Join-Path $PublicRoot "platform_gate_tail.md") @("# PlatformGate log tail","","Source: $PlatformLog","","````text",(TailFile $PlatformLog 120),"````")
122: SaveText (Join-Path $PublicRoot "controller_tail.md") @("# Controller log tail","","Source: $ControllerLog","","````text",(TailFile $ControllerLog 120),"````")
123: SaveText (Join-Path $PublicRoot "recent_errors.md") @("# Recent ScarFLIX errors","","Generated: $Generated","","````text",(Redact (($RecentErrorLines | Select-Object -Last 140) -join [Environment]::NewLine)),"````")
124: 
125: $Compact = ReadText (Join-Path $PublicRoot "ASK_CHATGPT_SUMMARY.md")
126: $Ask = @()
---
136: $Ask += ""
137: $Ask += "Runner process count: " + $Processes.Count
138: $Ask += ""
139: $Ask += "Latest PlatformGate log: $PlatformLog"
140: $Ask += "Latest Controller log: $ControllerLog"
141: $Ask += ""
142: $Ask += "Recent error sample:"
143: foreach ($e in ($RecentErrorLines | Select-Object -Last 40)) { $Ask += ("- " + (Redact $e)) }
144: SaveText (Join-Path $PublicRoot "TELEMETRY_FOR_CHATGPT.md") $Ask
---
``

## D:\PlexTools\Scripts\scarflix_v2\ScarFLIX_v2_HealthStatus.ps1
``text
85:     CACHING = 0
86:     VALIDATING = 0
87:     READY = 0
88:     FAILED = 0
89:     OTHER = 0
90:   }
91:   $Failures = New-Object System.Collections.ArrayList
92:   foreach ($Root in @($MovieRequestRoot, $TvRequestRoot)) {
93:     if (!(Test-Path -LiteralPath $Root)) { continue }
---
88:     FAILED = 0
89:     OTHER = 0
90:   }
91:   $Failures = New-Object System.Collections.ArrayList
92:   foreach ($Root in @($MovieRequestRoot, $TvRequestRoot)) {
93:     if (!(Test-Path -LiteralPath $Root)) { continue }
94:     Get-ChildItem -LiteralPath $Root -Recurse -File -Filter "state.json" -ErrorAction SilentlyContinue | ForEach-Object {
95:       $State = Read-JsonSafe $_.FullName
96:       $Name = "OTHER"
---
96:       $Name = "OTHER"
97:       if ($State -and $State.PSObject.Properties["state"]) { $Name = ("" + $State.state).ToUpperInvariant() }
98:       if ($Counts.Contains($Name)) { $Counts[$Name] = $Counts[$Name] + 1 } else { $Counts["OTHER"] = $Counts["OTHER"] + 1 }
99:       if ($Name -eq "FAILED") {
100:         [void]$Failures.Add([ordered]@{ state_file = $_.FullName; note = ("" + $State.note); reject_reason = ("" + $State.reject_reason) })
101:       }
102:     }
103:   }
104:   return [ordered]@{ counts = $Counts; failures = @($Failures) }
---
97:       if ($State -and $State.PSObject.Properties["state"]) { $Name = ("" + $State.state).ToUpperInvariant() }
98:       if ($Counts.Contains($Name)) { $Counts[$Name] = $Counts[$Name] + 1 } else { $Counts["OTHER"] = $Counts["OTHER"] + 1 }
99:       if ($Name -eq "FAILED") {
100:         [void]$Failures.Add([ordered]@{ state_file = $_.FullName; note = ("" + $State.note); reject_reason = ("" + $State.reject_reason) })
101:       }
102:     }
103:   }
104:   return [ordered]@{ counts = $Counts; failures = @($Failures) }
105: }
---
101:       }
102:     }
103:   }
104:   return [ordered]@{ counts = $Counts; failures = @($Failures) }
105: }
106: 
107: function Count-Files {
108:   param([string]$Filter)
109:   $Total = 0
---
237: function Test-HttpEndpoint {
238:   param([string]$Name, [string]$Uri)
239:   try {
240:     $Resp = Invoke-WebRequest -Uri $Uri -UseBasicParsing -TimeoutSec 5 -ErrorAction Stop
241:     return [ordered]@{ name = $Name; uri = $Uri; ok = $true; status = [int]$Resp.StatusCode }
242:   } catch {
243:     return [ordered]@{ name = $Name; uri = $Uri; ok = $false; status = 0; error = (ConvertTo-AsciiText $_.Exception.Message) }
244:   }
245: }
---
245: }
246: 
247: function Get-TaskSnapshot {
248:   $Names = @("ScarFLIX_v2_RequestServer", "ScarFLIX_v2_StreamProxy", "ScarFLIX_v2_StremioDirectResolver", "ScarFLIX_v2_MaterializeReady", "ScarFLIX_v2_CatalogPlayWatcher", "ScarFLIX_v2_HealthStatus", "ScarFLIX_v2_CatalogSeeder", "ScarFLIX_v2_CatalogEnricher", "ScarFLIX_v2_LiveCatalogSeeder", "ScarFLIX_v2_CatalogVisibilityGate", "ScarFLIX_v2_CatalogPromoter", "ScarFLIX_v2_SafeCatalogOrchestrator", "ScarFLIX_v2_VisibleCatalogQA", "ScarFLIX_v2_PlexClientDecisionQA", "ScarFLIX_v2_ConcurrentStreamQA", "ScarFLIX_v2_WebDavVirtualCatalogPublisher", "ScarFLIX_v2_LiveProfileHydrator", "ScarFLIX_v2_LiveSelfTest", "ScarFLIX_v2_PlexPlaybackProbe", "ScarFLIX_v2_RetirePlaceholderCatalog", "ScarFLIX_v2_RetryPolicy", "ScarFLIX_v2_PlexSelfTest", "ScarFLIX_v2_QuietMode")
249:   $Out = New-Object System.Collections.ArrayList
250:   foreach ($Name in $Names) {
251:     try {
252:       $Task = Get-ScheduledTask -TaskName $Name -ErrorAction Stop
253:       $Info = Get-ScheduledTaskInfo -TaskName $Name -ErrorAction SilentlyContinue
---
276:     "safe_catalog_orchestrator_status.json",
277:     "visible_catalog_qa_status.json",
278:     "plex_client_decision_qa_status.json",
279:     "concurrent_stream_qa_status.json",
280:     "quiet_mode_status.json",
281:     "webdav_virtual_catalog_status.json",
282:     "webdav_active_gate_status.json",
283:     "auto_gate_status.json",
284:     "plex_live_profile_hydrator_status.json",
---
315:   return "MISSING"
316: }
317: 
318: function Test-WebDavVirtualPruneReviewAccepted {
319:   param([object[]]$Components)
320:   $Obj = Read-JsonSafe (Join-Path $PublishRoot "webdav_virtual_catalog_status.json")
321:   if ($null -eq $Obj) { return $false }
322:   if (("" + $Obj.status) -ne "REVIEW") { return $false }
323:   $Failures = @($Obj.failures)
---
319:   param([object[]]$Components)
320:   $Obj = Read-JsonSafe (Join-Path $PublishRoot "webdav_virtual_catalog_status.json")
321:   if ($null -eq $Obj) { return $false }
322:   if (("" + $Obj.status) -ne "REVIEW") { return $false }
323:   $Failures = @($Obj.failures)
324:   if ($Failures.Count -le 0) { return $false }
325:   foreach ($Failure in $Failures) {
326:     $Text = "" + $Failure
327:     if ($Text -eq "Some virtual catalog rows were pruned after delayed re-check") {
---
320:   $Obj = Read-JsonSafe (Join-Path $PublishRoot "webdav_virtual_catalog_status.json")
321:   if ($null -eq $Obj) { return $false }
322:   if (("" + $Obj.status) -ne "REVIEW") { return $false }
323:   $Failures = @($Obj.failures)
324:   if ($Failures.Count -le 0) { return $false }
325:   foreach ($Failure in $Failures) {
326:     $Text = "" + $Failure
327:     if ($Text -eq "Some virtual catalog rows were pruned after delayed re-check") {
328:       continue
---
321:   if ($null -eq $Obj) { return $false }
322:   if (("" + $Obj.status) -ne "REVIEW") { return $false }
323:   $Failures = @($Obj.failures)
324:   if ($Failures.Count -le 0) { return $false }
325:   foreach ($Failure in $Failures) {
326:     $Text = "" + $Failure
327:     if ($Text -eq "Some virtual catalog rows were pruned after delayed re-check") {
328:       continue
329:     }
---
322:   if (("" + $Obj.status) -ne "REVIEW") { return $false }
323:   $Failures = @($Obj.failures)
324:   if ($Failures.Count -le 0) { return $false }
325:   foreach ($Failure in $Failures) {
326:     $Text = "" + $Failure
327:     if ($Text -eq "Some virtual catalog rows were pruned after delayed re-check") {
328:       continue
329:     }
330:     if ($Text -eq "Initial visible catalog QA did not exit cleanly") {
---
323:   $Failures = @($Obj.failures)
324:   if ($Failures.Count -le 0) { return $false }
325:   foreach ($Failure in $Failures) {
326:     $Text = "" + $Failure
327:     if ($Text -eq "Some virtual catalog rows were pruned after delayed re-check") {
328:       continue
329:     }
330:     if ($Text -eq "Initial visible catalog QA did not exit cleanly") {
331:       $InitialRepairOk = $false
---
327:     if ($Text -eq "Some virtual catalog rows were pruned after delayed re-check") {
328:       continue
329:     }
330:     if ($Text -eq "Initial visible catalog QA did not exit cleanly") {
331:       $InitialRepairOk = $false
332:       $DelayedVisibleOk = $false
333:       $DelayedDecisionOk = $false
334:       try { if ([int]$Obj.qa_initial.repair_exit_code -eq 0) { $InitialRepairOk = $true } } catch {}
335:       try { if ([bool]$Obj.qa_delayed.ok) { $DelayedVisibleOk = $true } } catch {}
---
345:     "webdav_active_gate_status.json",
346:     "visible_catalog_qa_status.json",
347:     "plex_client_decision_qa_status.json",
348:     "concurrent_stream_qa_status.json"
349:   )
350:   foreach ($File in $Required) {
351:     if ((Get-ComponentStatusByFile -Components $Components -File $File) -ne "PASS") {
352:       return $false
353:     }
---
373: $ProviderCatalog = Count-ProviderCatalogUrls
374: $PolicyBlockedCount = Count-PolicyBlockedParts
375: $PromoterRejectedCount = Count-PromoterRejectedParts
376: $WebDavVirtualPruneReviewAccepted = Test-WebDavVirtualPruneReviewAccepted -Components $Components
377: 
378: $Overall = "PASS"
379: if ($RequestStrmFiles -gt 0) { $Overall = "REVIEW" }
380: if ([int]$ProviderCatalog.stub_or_nonlive_strm_files -gt 0) { $Overall = "REVIEW" }
381: if ([int]$PlexCounts.request_library_strm_parts -gt 0) { $Overall = "REVIEW" }
---
376: $WebDavVirtualPruneReviewAccepted = Test-WebDavVirtualPruneReviewAccepted -Components $Components
377: 
378: $Overall = "PASS"
379: if ($RequestStrmFiles -gt 0) { $Overall = "REVIEW" }
380: if ([int]$ProviderCatalog.stub_or_nonlive_strm_files -gt 0) { $Overall = "REVIEW" }
381: if ([int]$PlexCounts.request_library_strm_parts -gt 0) { $Overall = "REVIEW" }
382: if ([int]$PlexCounts.non_live_streaming_strm_parts -gt 0) { $Overall = "REVIEW" }
383: if ([int]$PlexCounts.live_unprofiled_streaming_strm_parts -gt 0) { $Overall = "REVIEW" }
384: if ([int]$PlexCounts.live_hevc_profiled_streaming_strm_parts -gt 0) { $Overall = "REVIEW" }
---
``

## D:\PlexTools\Scripts\scarflix_v2\ScarFLIX_v2_HealthStatus.ps1.bak_prune_review_20260603_120052
``text
85:     CACHING = 0
86:     VALIDATING = 0
87:     READY = 0
88:     FAILED = 0
89:     OTHER = 0
90:   }
91:   $Failures = New-Object System.Collections.ArrayList
92:   foreach ($Root in @($MovieRequestRoot, $TvRequestRoot)) {
93:     if (!(Test-Path -LiteralPath $Root)) { continue }
---
88:     FAILED = 0
89:     OTHER = 0
90:   }
91:   $Failures = New-Object System.Collections.ArrayList
92:   foreach ($Root in @($MovieRequestRoot, $TvRequestRoot)) {
93:     if (!(Test-Path -LiteralPath $Root)) { continue }
94:     Get-ChildItem -LiteralPath $Root -Recurse -File -Filter "state.json" -ErrorAction SilentlyContinue | ForEach-Object {
95:       $State = Read-JsonSafe $_.FullName
96:       $Name = "OTHER"
---
96:       $Name = "OTHER"
97:       if ($State -and $State.PSObject.Properties["state"]) { $Name = ("" + $State.state).ToUpperInvariant() }
98:       if ($Counts.Contains($Name)) { $Counts[$Name] = $Counts[$Name] + 1 } else { $Counts["OTHER"] = $Counts["OTHER"] + 1 }
99:       if ($Name -eq "FAILED") {
100:         [void]$Failures.Add([ordered]@{ state_file = $_.FullName; note = ("" + $State.note); reject_reason = ("" + $State.reject_reason) })
101:       }
102:     }
103:   }
104:   return [ordered]@{ counts = $Counts; failures = @($Failures) }
---
97:       if ($State -and $State.PSObject.Properties["state"]) { $Name = ("" + $State.state).ToUpperInvariant() }
98:       if ($Counts.Contains($Name)) { $Counts[$Name] = $Counts[$Name] + 1 } else { $Counts["OTHER"] = $Counts["OTHER"] + 1 }
99:       if ($Name -eq "FAILED") {
100:         [void]$Failures.Add([ordered]@{ state_file = $_.FullName; note = ("" + $State.note); reject_reason = ("" + $State.reject_reason) })
101:       }
102:     }
103:   }
104:   return [ordered]@{ counts = $Counts; failures = @($Failures) }
105: }
---
101:       }
102:     }
103:   }
104:   return [ordered]@{ counts = $Counts; failures = @($Failures) }
105: }
106: 
107: function Count-Files {
108:   param([string]$Filter)
109:   $Total = 0
---
237: function Test-HttpEndpoint {
238:   param([string]$Name, [string]$Uri)
239:   try {
240:     $Resp = Invoke-WebRequest -Uri $Uri -UseBasicParsing -TimeoutSec 5 -ErrorAction Stop
241:     return [ordered]@{ name = $Name; uri = $Uri; ok = $true; status = [int]$Resp.StatusCode }
242:   } catch {
243:     return [ordered]@{ name = $Name; uri = $Uri; ok = $false; status = 0; error = (ConvertTo-AsciiText $_.Exception.Message) }
244:   }
245: }
---
245: }
246: 
247: function Get-TaskSnapshot {
248:   $Names = @("ScarFLIX_v2_RequestServer", "ScarFLIX_v2_StreamProxy", "ScarFLIX_v2_StremioDirectResolver", "ScarFLIX_v2_MaterializeReady", "ScarFLIX_v2_CatalogPlayWatcher", "ScarFLIX_v2_HealthStatus", "ScarFLIX_v2_CatalogSeeder", "ScarFLIX_v2_CatalogEnricher", "ScarFLIX_v2_LiveCatalogSeeder", "ScarFLIX_v2_CatalogVisibilityGate", "ScarFLIX_v2_CatalogPromoter", "ScarFLIX_v2_SafeCatalogOrchestrator", "ScarFLIX_v2_VisibleCatalogQA", "ScarFLIX_v2_PlexClientDecisionQA", "ScarFLIX_v2_ConcurrentStreamQA", "ScarFLIX_v2_WebDavVirtualCatalogPublisher", "ScarFLIX_v2_LiveProfileHydrator", "ScarFLIX_v2_LiveSelfTest", "ScarFLIX_v2_PlexPlaybackProbe", "ScarFLIX_v2_RetirePlaceholderCatalog", "ScarFLIX_v2_RetryPolicy", "ScarFLIX_v2_PlexSelfTest", "ScarFLIX_v2_QuietMode")
249:   $Out = New-Object System.Collections.ArrayList
250:   foreach ($Name in $Names) {
251:     try {
252:       $Task = Get-ScheduledTask -TaskName $Name -ErrorAction Stop
253:       $Info = Get-ScheduledTaskInfo -TaskName $Name -ErrorAction SilentlyContinue
---
276:     "safe_catalog_orchestrator_status.json",
277:     "visible_catalog_qa_status.json",
278:     "plex_client_decision_qa_status.json",
279:     "concurrent_stream_qa_status.json",
280:     "quiet_mode_status.json",
281:     "webdav_virtual_catalog_status.json",
282:     "webdav_active_gate_status.json",
283:     "auto_gate_status.json",
284:     "plex_live_profile_hydrator_status.json",
---
324: $PromoterRejectedCount = Count-PromoterRejectedParts
325: 
326: $Overall = "PASS"
327: if ($RequestStrmFiles -gt 0) { $Overall = "REVIEW" }
328: if ([int]$ProviderCatalog.stub_or_nonlive_strm_files -gt 0) { $Overall = "REVIEW" }
329: if ([int]$PlexCounts.request_library_strm_parts -gt 0) { $Overall = "REVIEW" }
330: if ([int]$PlexCounts.non_live_streaming_strm_parts -gt 0) { $Overall = "REVIEW" }
331: if ([int]$PlexCounts.live_unprofiled_streaming_strm_parts -gt 0) { $Overall = "REVIEW" }
332: if ([int]$PlexCounts.live_hevc_profiled_streaming_strm_parts -gt 0) { $Overall = "REVIEW" }
---
325: 
326: $Overall = "PASS"
327: if ($RequestStrmFiles -gt 0) { $Overall = "REVIEW" }
328: if ([int]$ProviderCatalog.stub_or_nonlive_strm_files -gt 0) { $Overall = "REVIEW" }
329: if ([int]$PlexCounts.request_library_strm_parts -gt 0) { $Overall = "REVIEW" }
330: if ([int]$PlexCounts.non_live_streaming_strm_parts -gt 0) { $Overall = "REVIEW" }
331: if ([int]$PlexCounts.live_unprofiled_streaming_strm_parts -gt 0) { $Overall = "REVIEW" }
332: if ([int]$PlexCounts.live_hevc_profiled_streaming_strm_parts -gt 0) { $Overall = "REVIEW" }
333: if ([int]$PlexCounts.live_unsupported_codec_streaming_strm_parts -gt 0) { $Overall = "REVIEW" }
---
326: $Overall = "PASS"
327: if ($RequestStrmFiles -gt 0) { $Overall = "REVIEW" }
328: if ([int]$ProviderCatalog.stub_or_nonlive_strm_files -gt 0) { $Overall = "REVIEW" }
329: if ([int]$PlexCounts.request_library_strm_parts -gt 0) { $Overall = "REVIEW" }
330: if ([int]$PlexCounts.non_live_streaming_strm_parts -gt 0) { $Overall = "REVIEW" }
331: if ([int]$PlexCounts.live_unprofiled_streaming_strm_parts -gt 0) { $Overall = "REVIEW" }
332: if ([int]$PlexCounts.live_hevc_profiled_streaming_strm_parts -gt 0) { $Overall = "REVIEW" }
333: if ([int]$PlexCounts.live_unsupported_codec_streaming_strm_parts -gt 0) { $Overall = "REVIEW" }
334: if ([int]$PlexCounts.client_safe_unprofiled_parts -gt 0) { $Overall = "REVIEW" }
---
327: if ($RequestStrmFiles -gt 0) { $Overall = "REVIEW" }
328: if ([int]$ProviderCatalog.stub_or_nonlive_strm_files -gt 0) { $Overall = "REVIEW" }
329: if ([int]$PlexCounts.request_library_strm_parts -gt 0) { $Overall = "REVIEW" }
330: if ([int]$PlexCounts.non_live_streaming_strm_parts -gt 0) { $Overall = "REVIEW" }
331: if ([int]$PlexCounts.live_unprofiled_streaming_strm_parts -gt 0) { $Overall = "REVIEW" }
332: if ([int]$PlexCounts.live_hevc_profiled_streaming_strm_parts -gt 0) { $Overall = "REVIEW" }
333: if ([int]$PlexCounts.live_unsupported_codec_streaming_strm_parts -gt 0) { $Overall = "REVIEW" }
334: if ([int]$PlexCounts.client_safe_unprofiled_parts -gt 0) { $Overall = "REVIEW" }
335: if ([int]$PlexCounts.client_safe_unsupported_parts -gt 0) { $Overall = "REVIEW" }
---
328: if ([int]$ProviderCatalog.stub_or_nonlive_strm_files -gt 0) { $Overall = "REVIEW" }
329: if ([int]$PlexCounts.request_library_strm_parts -gt 0) { $Overall = "REVIEW" }
330: if ([int]$PlexCounts.non_live_streaming_strm_parts -gt 0) { $Overall = "REVIEW" }
331: if ([int]$PlexCounts.live_unprofiled_streaming_strm_parts -gt 0) { $Overall = "REVIEW" }
332: if ([int]$PlexCounts.live_hevc_profiled_streaming_strm_parts -gt 0) { $Overall = "REVIEW" }
333: if ([int]$PlexCounts.live_unsupported_codec_streaming_strm_parts -gt 0) { $Overall = "REVIEW" }
334: if ([int]$PlexCounts.client_safe_unprofiled_parts -gt 0) { $Overall = "REVIEW" }
335: if ([int]$PlexCounts.client_safe_unsupported_parts -gt 0) { $Overall = "REVIEW" }
336: if ([int]$ProviderCatalog.live_proxy_strm_files -gt 0 -and [int]$PlexCounts.client_safe_live_parts -eq 0 -and [int]$PlexCounts.live_streaming_strm_parts -eq 0) { $Overall = "REVIEW" }
---
329: if ([int]$PlexCounts.request_library_strm_parts -gt 0) { $Overall = "REVIEW" }
330: if ([int]$PlexCounts.non_live_streaming_strm_parts -gt 0) { $Overall = "REVIEW" }
331: if ([int]$PlexCounts.live_unprofiled_streaming_strm_parts -gt 0) { $Overall = "REVIEW" }
332: if ([int]$PlexCounts.live_hevc_profiled_streaming_strm_parts -gt 0) { $Overall = "REVIEW" }
333: if ([int]$PlexCounts.live_unsupported_codec_streaming_strm_parts -gt 0) { $Overall = "REVIEW" }
334: if ([int]$PlexCounts.client_safe_unprofiled_parts -gt 0) { $Overall = "REVIEW" }
335: if ([int]$PlexCounts.client_safe_unsupported_parts -gt 0) { $Overall = "REVIEW" }
336: if ([int]$ProviderCatalog.live_proxy_strm_files -gt 0 -and [int]$PlexCounts.client_safe_live_parts -eq 0 -and [int]$PlexCounts.live_streaming_strm_parts -eq 0) { $Overall = "REVIEW" }
337: if ([int]$PlexCounts.unsafe_legacy_live_tv_streaming_strm_parts -gt 0) { $Overall = "REVIEW" }
---
330: if ([int]$PlexCounts.non_live_streaming_strm_parts -gt 0) { $Overall = "REVIEW" }
331: if ([int]$PlexCounts.live_unprofiled_streaming_strm_parts -gt 0) { $Overall = "REVIEW" }
332: if ([int]$PlexCounts.live_hevc_profiled_streaming_strm_parts -gt 0) { $Overall = "REVIEW" }
333: if ([int]$PlexCounts.live_unsupported_codec_streaming_strm_parts -gt 0) { $Overall = "REVIEW" }
334: if ([int]$PlexCounts.client_safe_unprofiled_parts -gt 0) { $Overall = "REVIEW" }
335: if ([int]$PlexCounts.client_safe_unsupported_parts -gt 0) { $Overall = "REVIEW" }
336: if ([int]$ProviderCatalog.live_proxy_strm_files -gt 0 -and [int]$PlexCounts.client_safe_live_parts -eq 0 -and [int]$PlexCounts.live_streaming_strm_parts -eq 0) { $Overall = "REVIEW" }
337: if ([int]$PlexCounts.unsafe_legacy_live_tv_streaming_strm_parts -gt 0) { $Overall = "REVIEW" }
338: if ([int]$PlexCounts.live_tv_metadata_collision_groups -gt 0) { $Overall = "REVIEW" }
---
331: if ([int]$PlexCounts.live_unprofiled_streaming_strm_parts -gt 0) { $Overall = "REVIEW" }
332: if ([int]$PlexCounts.live_hevc_profiled_streaming_strm_parts -gt 0) { $Overall = "REVIEW" }
333: if ([int]$PlexCounts.live_unsupported_codec_streaming_strm_parts -gt 0) { $Overall = "REVIEW" }
334: if ([int]$PlexCounts.client_safe_unprofiled_parts -gt 0) { $Overall = "REVIEW" }
335: if ([int]$PlexCounts.client_safe_unsupported_parts -gt 0) { $Overall = "REVIEW" }
336: if ([int]$ProviderCatalog.live_proxy_strm_files -gt 0 -and [int]$PlexCounts.client_safe_live_parts -eq 0 -and [int]$PlexCounts.live_streaming_strm_parts -eq 0) { $Overall = "REVIEW" }
337: if ([int]$PlexCounts.unsafe_legacy_live_tv_streaming_strm_parts -gt 0) { $Overall = "REVIEW" }
338: if ([int]$PlexCounts.live_tv_metadata_collision_groups -gt 0) { $Overall = "REVIEW" }
339: foreach ($Endpoint in $Endpoints) {
---
332: if ([int]$PlexCounts.live_hevc_profiled_streaming_strm_parts -gt 0) { $Overall = "REVIEW" }
333: if ([int]$PlexCounts.live_unsupported_codec_streaming_strm_parts -gt 0) { $Overall = "REVIEW" }
334: if ([int]$PlexCounts.client_safe_unprofiled_parts -gt 0) { $Overall = "REVIEW" }
335: if ([int]$PlexCounts.client_safe_unsupported_parts -gt 0) { $Overall = "REVIEW" }
336: if ([int]$ProviderCatalog.live_proxy_strm_files -gt 0 -and [int]$PlexCounts.client_safe_live_parts -eq 0 -and [int]$PlexCounts.live_streaming_strm_parts -eq 0) { $Overall = "REVIEW" }
337: if ([int]$PlexCounts.unsafe_legacy_live_tv_streaming_strm_parts -gt 0) { $Overall = "REVIEW" }
338: if ([int]$PlexCounts.live_tv_metadata_collision_groups -gt 0) { $Overall = "REVIEW" }
339: foreach ($Endpoint in $Endpoints) {
340:   if (!$Endpoint.ok) { $Overall = "REVIEW" }
---
333: if ([int]$PlexCounts.live_unsupported_codec_streaming_strm_parts -gt 0) { $Overall = "REVIEW" }
334: if ([int]$PlexCounts.client_safe_unprofiled_parts -gt 0) { $Overall = "REVIEW" }
335: if ([int]$PlexCounts.client_safe_unsupported_parts -gt 0) { $Overall = "REVIEW" }
336: if ([int]$ProviderCatalog.live_proxy_strm_files -gt 0 -and [int]$PlexCounts.client_safe_live_parts -eq 0 -and [int]$PlexCounts.live_streaming_strm_parts -eq 0) { $Overall = "REVIEW" }
337: if ([int]$PlexCounts.unsafe_legacy_live_tv_streaming_strm_parts -gt 0) { $Overall = "REVIEW" }
338: if ([int]$PlexCounts.live_tv_metadata_collision_groups -gt 0) { $Overall = "REVIEW" }
339: foreach ($Endpoint in $Endpoints) {
340:   if (!$Endpoint.ok) { $Overall = "REVIEW" }
341: }
---
``

## D:\PlexTools\Scripts\scarflix_v2\ScarFLIX_v2_HealthStatus.ps1.bak_self_repaired_webdav_review_20260603_135822
``text
85:     CACHING = 0
86:     VALIDATING = 0
87:     READY = 0
88:     FAILED = 0
89:     OTHER = 0
90:   }
91:   $Failures = New-Object System.Collections.ArrayList
92:   foreach ($Root in @($MovieRequestRoot, $TvRequestRoot)) {
93:     if (!(Test-Path -LiteralPath $Root)) { continue }
---
88:     FAILED = 0
89:     OTHER = 0
90:   }
91:   $Failures = New-Object System.Collections.ArrayList
92:   foreach ($Root in @($MovieRequestRoot, $TvRequestRoot)) {
93:     if (!(Test-Path -LiteralPath $Root)) { continue }
94:     Get-ChildItem -LiteralPath $Root -Recurse -File -Filter "state.json" -ErrorAction SilentlyContinue | ForEach-Object {
95:       $State = Read-JsonSafe $_.FullName
96:       $Name = "OTHER"
---
96:       $Name = "OTHER"
97:       if ($State -and $State.PSObject.Properties["state"]) { $Name = ("" + $State.state).ToUpperInvariant() }
98:       if ($Counts.Contains($Name)) { $Counts[$Name] = $Counts[$Name] + 1 } else { $Counts["OTHER"] = $Counts["OTHER"] + 1 }
99:       if ($Name -eq "FAILED") {
100:         [void]$Failures.Add([ordered]@{ state_file = $_.FullName; note = ("" + $State.note); reject_reason = ("" + $State.reject_reason) })
101:       }
102:     }
103:   }
104:   return [ordered]@{ counts = $Counts; failures = @($Failures) }
---
97:       if ($State -and $State.PSObject.Properties["state"]) { $Name = ("" + $State.state).ToUpperInvariant() }
98:       if ($Counts.Contains($Name)) { $Counts[$Name] = $Counts[$Name] + 1 } else { $Counts["OTHER"] = $Counts["OTHER"] + 1 }
99:       if ($Name -eq "FAILED") {
100:         [void]$Failures.Add([ordered]@{ state_file = $_.FullName; note = ("" + $State.note); reject_reason = ("" + $State.reject_reason) })
101:       }
102:     }
103:   }
104:   return [ordered]@{ counts = $Counts; failures = @($Failures) }
105: }
---
101:       }
102:     }
103:   }
104:   return [ordered]@{ counts = $Counts; failures = @($Failures) }
105: }
106: 
107: function Count-Files {
108:   param([string]$Filter)
109:   $Total = 0
---
237: function Test-HttpEndpoint {
238:   param([string]$Name, [string]$Uri)
239:   try {
240:     $Resp = Invoke-WebRequest -Uri $Uri -UseBasicParsing -TimeoutSec 5 -ErrorAction Stop
241:     return [ordered]@{ name = $Name; uri = $Uri; ok = $true; status = [int]$Resp.StatusCode }
242:   } catch {
243:     return [ordered]@{ name = $Name; uri = $Uri; ok = $false; status = 0; error = (ConvertTo-AsciiText $_.Exception.Message) }
244:   }
245: }
---
245: }
246: 
247: function Get-TaskSnapshot {
248:   $Names = @("ScarFLIX_v2_RequestServer", "ScarFLIX_v2_StreamProxy", "ScarFLIX_v2_StremioDirectResolver", "ScarFLIX_v2_MaterializeReady", "ScarFLIX_v2_CatalogPlayWatcher", "ScarFLIX_v2_HealthStatus", "ScarFLIX_v2_CatalogSeeder", "ScarFLIX_v2_CatalogEnricher", "ScarFLIX_v2_LiveCatalogSeeder", "ScarFLIX_v2_CatalogVisibilityGate", "ScarFLIX_v2_CatalogPromoter", "ScarFLIX_v2_SafeCatalogOrchestrator", "ScarFLIX_v2_VisibleCatalogQA", "ScarFLIX_v2_PlexClientDecisionQA", "ScarFLIX_v2_ConcurrentStreamQA", "ScarFLIX_v2_WebDavVirtualCatalogPublisher", "ScarFLIX_v2_LiveProfileHydrator", "ScarFLIX_v2_LiveSelfTest", "ScarFLIX_v2_PlexPlaybackProbe", "ScarFLIX_v2_RetirePlaceholderCatalog", "ScarFLIX_v2_RetryPolicy", "ScarFLIX_v2_PlexSelfTest", "ScarFLIX_v2_QuietMode")
249:   $Out = New-Object System.Collections.ArrayList
250:   foreach ($Name in $Names) {
251:     try {
252:       $Task = Get-ScheduledTask -TaskName $Name -ErrorAction Stop
253:       $Info = Get-ScheduledTaskInfo -TaskName $Name -ErrorAction SilentlyContinue
---
276:     "safe_catalog_orchestrator_status.json",
277:     "visible_catalog_qa_status.json",
278:     "plex_client_decision_qa_status.json",
279:     "concurrent_stream_qa_status.json",
280:     "quiet_mode_status.json",
281:     "webdav_virtual_catalog_status.json",
282:     "webdav_active_gate_status.json",
283:     "auto_gate_status.json",
284:     "plex_live_profile_hydrator_status.json",
---
315:   return "MISSING"
316: }
317: 
318: function Test-WebDavVirtualPruneReviewAccepted {
319:   param([object[]]$Components)
320:   $Obj = Read-JsonSafe (Join-Path $PublishRoot "webdav_virtual_catalog_status.json")
321:   if ($null -eq $Obj) { return $false }
322:   if (("" + $Obj.status) -ne "REVIEW") { return $false }
323:   $Failures = @($Obj.failures)
---
319:   param([object[]]$Components)
320:   $Obj = Read-JsonSafe (Join-Path $PublishRoot "webdav_virtual_catalog_status.json")
321:   if ($null -eq $Obj) { return $false }
322:   if (("" + $Obj.status) -ne "REVIEW") { return $false }
323:   $Failures = @($Obj.failures)
324:   if ($Failures.Count -le 0) { return $false }
325:   foreach ($Failure in $Failures) {
326:     $Text = "" + $Failure
327:     if ($Text -ne "Some virtual catalog rows were pruned after delayed re-check") {
---
320:   $Obj = Read-JsonSafe (Join-Path $PublishRoot "webdav_virtual_catalog_status.json")
321:   if ($null -eq $Obj) { return $false }
322:   if (("" + $Obj.status) -ne "REVIEW") { return $false }
323:   $Failures = @($Obj.failures)
324:   if ($Failures.Count -le 0) { return $false }
325:   foreach ($Failure in $Failures) {
326:     $Text = "" + $Failure
327:     if ($Text -ne "Some virtual catalog rows were pruned after delayed re-check") {
328:       return $false
---
321:   if ($null -eq $Obj) { return $false }
322:   if (("" + $Obj.status) -ne "REVIEW") { return $false }
323:   $Failures = @($Obj.failures)
324:   if ($Failures.Count -le 0) { return $false }
325:   foreach ($Failure in $Failures) {
326:     $Text = "" + $Failure
327:     if ($Text -ne "Some virtual catalog rows were pruned after delayed re-check") {
328:       return $false
329:     }
---
322:   if (("" + $Obj.status) -ne "REVIEW") { return $false }
323:   $Failures = @($Obj.failures)
324:   if ($Failures.Count -le 0) { return $false }
325:   foreach ($Failure in $Failures) {
326:     $Text = "" + $Failure
327:     if ($Text -ne "Some virtual catalog rows were pruned after delayed re-check") {
328:       return $false
329:     }
330:   }
---
323:   $Failures = @($Obj.failures)
324:   if ($Failures.Count -le 0) { return $false }
325:   foreach ($Failure in $Failures) {
326:     $Text = "" + $Failure
327:     if ($Text -ne "Some virtual catalog rows were pruned after delayed re-check") {
328:       return $false
329:     }
330:   }
331:   $Required = @(
---
332:     "webdav_active_gate_status.json",
333:     "visible_catalog_qa_status.json",
334:     "plex_client_decision_qa_status.json",
335:     "concurrent_stream_qa_status.json"
336:   )
337:   foreach ($File in $Required) {
338:     if ((Get-ComponentStatusByFile -Components $Components -File $File) -ne "PASS") {
339:       return $false
340:     }
---
360: $ProviderCatalog = Count-ProviderCatalogUrls
361: $PolicyBlockedCount = Count-PolicyBlockedParts
362: $PromoterRejectedCount = Count-PromoterRejectedParts
363: $WebDavVirtualPruneReviewAccepted = Test-WebDavVirtualPruneReviewAccepted -Components $Components
364: 
365: $Overall = "PASS"
366: if ($RequestStrmFiles -gt 0) { $Overall = "REVIEW" }
367: if ([int]$ProviderCatalog.stub_or_nonlive_strm_files -gt 0) { $Overall = "REVIEW" }
368: if ([int]$PlexCounts.request_library_strm_parts -gt 0) { $Overall = "REVIEW" }
---
363: $WebDavVirtualPruneReviewAccepted = Test-WebDavVirtualPruneReviewAccepted -Components $Components
364: 
365: $Overall = "PASS"
366: if ($RequestStrmFiles -gt 0) { $Overall = "REVIEW" }
367: if ([int]$ProviderCatalog.stub_or_nonlive_strm_files -gt 0) { $Overall = "REVIEW" }
368: if ([int]$PlexCounts.request_library_strm_parts -gt 0) { $Overall = "REVIEW" }
369: if ([int]$PlexCounts.non_live_streaming_strm_parts -gt 0) { $Overall = "REVIEW" }
370: if ([int]$PlexCounts.live_unprofiled_streaming_strm_parts -gt 0) { $Overall = "REVIEW" }
371: if ([int]$PlexCounts.live_hevc_profiled_streaming_strm_parts -gt 0) { $Overall = "REVIEW" }
---
364: 
365: $Overall = "PASS"
366: if ($RequestStrmFiles -gt 0) { $Overall = "REVIEW" }
367: if ([int]$ProviderCatalog.stub_or_nonlive_strm_files -gt 0) { $Overall = "REVIEW" }
368: if ([int]$PlexCounts.request_library_strm_parts -gt 0) { $Overall = "REVIEW" }
369: if ([int]$PlexCounts.non_live_streaming_strm_parts -gt 0) { $Overall = "REVIEW" }
370: if ([int]$PlexCounts.live_unprofiled_streaming_strm_parts -gt 0) { $Overall = "REVIEW" }
371: if ([int]$PlexCounts.live_hevc_profiled_streaming_strm_parts -gt 0) { $Overall = "REVIEW" }
372: if ([int]$PlexCounts.live_unsupported_codec_streaming_strm_parts -gt 0) { $Overall = "REVIEW" }
---
``

## D:\PlexTools\Scripts\scarflix_v2\ScarFLIX_v2_HydratePlexLiveProfiles.ps1
``text
6:   [string[]]$TargetPath = @(),
7:   [int]$MaxItems = 10,
8:   [switch]$AllLive,
9:   [switch]$QuarantineFailed,
10:   [switch]$AllowHevc
11: )
12: 
13: $ErrorActionPreference = "Continue"
14: try { [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12 } catch {}
---
24: $ProviderCrunchyrollTvRoot = "D:\StremioCatalog\Crunchyroll\TV"
25: $LiveRoots = @($LiveMovieRoot, $LiveTvRoot, $ProviderMovieRoot, $ProviderNetflixTvRoot, $ProviderCrunchyrollTvRoot)
26: $StateRoot = "D:\PlexTools\state\scarflix_v2"
27: $QuarantineRoot = "D:\PlexTools\archive\scarflix_v2\live_profile_failed"
28: $ExclusionPath = Join-Path $StateRoot "live_catalog_exclusions.json"
29: $HydratorSkipPath = Join-Path $StateRoot "plex_live_profile_hydrator_skip.tsv"
30: $LockPath = Join-Path $StateRoot "plex_live_profile_hydrator.lock"
31: $PlexTranscoder = "C:\Program Files\Plex\Plex Media Server\Plex Transcoder.exe"
32: $PlexSqlite = "C:\Program Files\Plex\Plex Media Server\Plex SQLite.exe"
---
28: $ExclusionPath = Join-Path $StateRoot "live_catalog_exclusions.json"
29: $HydratorSkipPath = Join-Path $StateRoot "plex_live_profile_hydrator_skip.tsv"
30: $LockPath = Join-Path $StateRoot "plex_live_profile_hydrator.lock"
31: $PlexTranscoder = "C:\Program Files\Plex\Plex Media Server\Plex Transcoder.exe"
32: $PlexSqlite = "C:\Program Files\Plex\Plex Media Server\Plex SQLite.exe"
33: $PlexDb = "C:\Users\jason\AppData\Local\Plex Media Server\Plug-in Support\Databases\com.plexapp.plugins.library.db"
34: $StatusJson = Join-Path $PublishRoot "plex_live_profile_hydrator_status.json"
35: $LogPath = Join-Path $LogRoot ("scarflix_v2_hydrate_plex_live_profiles_{0}.log" -f (Get-Date -Format "yyyyMMdd"))
36: $BackupRoot = Join-Path $LogRoot ("scarflix_v2_hydrate_plex_live_profiles_backup_{0}" -f (Get-Date -Format "yyyyMMdd_HHmmss"))
---
34: $StatusJson = Join-Path $PublishRoot "plex_live_profile_hydrator_status.json"
35: $LogPath = Join-Path $LogRoot ("scarflix_v2_hydrate_plex_live_profiles_{0}.log" -f (Get-Date -Format "yyyyMMdd"))
36: $BackupRoot = Join-Path $LogRoot ("scarflix_v2_hydrate_plex_live_profiles_backup_{0}" -f (Get-Date -Format "yyyyMMdd_HHmmss"))
37: $ProbeTimeoutSeconds = 45
38: 
39: $Results = New-Object System.Collections.ArrayList
40: $Failures = New-Object System.Collections.ArrayList
41: $Warnings = New-Object System.Collections.ArrayList
42: $Quarantined = 0
---
37: $ProbeTimeoutSeconds = 45
38: 
39: $Results = New-Object System.Collections.ArrayList
40: $Failures = New-Object System.Collections.ArrayList
41: $Warnings = New-Object System.Collections.ArrayList
42: $Quarantined = 0
43: $LockTaken = $false
44: 
45: function Ensure-Dir {
---
123:     if (Test-Path -LiteralPath $Source) {
124:       $Name = Split-Path -Leaf $Source
125:       try { Copy-Item -LiteralPath $Source -Destination (Join-Path $BackupRoot $Name) -Force } catch {
126:         [void]$Warnings.Add("Backup failed for " + $Name + ": " + (ConvertTo-AsciiText $_.Exception.Message))
127:       }
128:     }
129:   }
130: }
131: 
---
214:   Write-Utf8NoBom -Path $ExclusionPath -Text ($Out | ConvertTo-Json -Depth 8)
215: }
216: 
217: function Move-FailedLiveItem {
218:   param([string]$StrmPath, [string]$Reason)
219:   if ([string]::IsNullOrWhiteSpace($StrmPath)) { return $false }
220:   $Parent = Split-Path -Parent $StrmPath
221:   if ([string]::IsNullOrWhiteSpace($Parent) -or !(Test-Path -LiteralPath $Parent)) { return $false }
222:   $ResolvedParent = ""
---
233:   $SafeName = $ResolvedParent.Replace(":", "").Replace("\", "__")
234:   $DestRoot = Join-Path (Join-Path $QuarantineRoot $Stamp) $SafeName
235:   Ensure-Dir (Split-Path -Parent $DestRoot)
236:   $InfoPath = Join-Path $Parent "scarflix_live_profile_failed.json"
237:   $Info = [ordered]@{
238:     failed_utc = (Get-Date).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ")
239:     strm = $StrmPath
240:     reason = $Reason
241:   }
---
235:   Ensure-Dir (Split-Path -Parent $DestRoot)
236:   $InfoPath = Join-Path $Parent "scarflix_live_profile_failed.json"
237:   $Info = [ordered]@{
238:     failed_utc = (Get-Date).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ")
239:     strm = $StrmPath
240:     reason = $Reason
241:   }
242:   Write-Utf8NoBom -Path $InfoPath -Text ($Info | ConvertTo-Json -Depth 5)
243:   try {
---
245:     Move-Item -LiteralPath $Parent -Destination $DestRoot -Force -ErrorAction Stop
246:     return $true
247:   } catch {
248:     [void]$Warnings.Add("Quarantine failed: " + (ConvertTo-AsciiText $_.Exception.Message))
249:     return $false
250:   }
251: }
252: 
253: function Get-HydratorSkipMap {
---
397: 
398:   if ($Url -match "^http://") {
399:     try {
400:       $Head = Invoke-WebRequest -Uri $Url -Method Head -UseBasicParsing -TimeoutSec 120 -ErrorAction Stop
401:       $LengthHeader = $Head.Headers["Content-Length"]
402:       if ($LengthHeader -is [array]) { $LengthText = $LengthHeader[0] } else { $LengthText = "" + $LengthHeader }
403:       $ParsedLength = 0
404:       [void][int64]::TryParse($LengthText, [ref]$ParsedLength)
405:       $Profile.content_length = [int64]$ParsedLength
---
404:       [void][int64]::TryParse($LengthText, [ref]$ParsedLength)
405:       $Profile.content_length = [int64]$ParsedLength
406:     } catch {
407:       $Profile.reason = "HEAD failed"
408:       return $Profile
409:     }
410:   } else {
411:     try {
412:       $Item = Get-Item -LiteralPath $Url -ErrorAction Stop
---
412:       $Item = Get-Item -LiteralPath $Url -ErrorAction Stop
413:       $Profile.content_length = [int64]$Item.Length
414:     } catch {
415:       $Profile.reason = "Local path stat failed"
416:       return $Profile
417:     }
418:   }
419: 
420:   $ErrLog = Join-Path $LogRoot ("scarflix_hydrate_profile_{0}.err.log" -f ([Guid]::NewGuid().ToString("N")))
---
421:   $Profile.stderr_log = $ErrLog
422:   $ProbeArgs = @("-hide_banner", "-i", $Url, "-t", "1", "-map", "0:v:0", "-c", "copy", "-f", "null", "NUL")
423:   try {
424:     $Proc = Start-Process -FilePath $PlexTranscoder -ArgumentList (Join-ProcessArguments -Arguments $ProbeArgs) -NoNewWindow -PassThru -RedirectStandardError $ErrLog
425:     $Finished = $Proc.WaitForExit($ProbeTimeoutSeconds * 1000)
426:     if (!$Finished) {
427:       try { & taskkill.exe /PID $Proc.Id /T /F | Out-Null } catch {}
428:       Start-Sleep -Seconds 2
429:       try {
---
422:   $ProbeArgs = @("-hide_banner", "-i", $Url, "-t", "1", "-map", "0:v:0", "-c", "copy", "-f", "null", "NUL")
423:   try {
424:     $Proc = Start-Process -FilePath $PlexTranscoder -ArgumentList (Join-ProcessArguments -Arguments $ProbeArgs) -NoNewWindow -PassThru -RedirectStandardError $ErrLog
425:     $Finished = $Proc.WaitForExit($ProbeTimeoutSeconds * 1000)
426:     if (!$Finished) {
427:       try { & taskkill.exe /PID $Proc.Id /T /F | Out-Null } catch {}
428:       Start-Sleep -Seconds 2
429:       try {
430:         $Proc.Refresh()
---
430:         $Proc.Refresh()
431:         if (!$Proc.HasExited) { Stop-Process -Id $Proc.Id -Force -ErrorAction SilentlyContinue }
432:       } catch {}
433:       $Profile.reason = "Plex Transcoder probe timed out"
434:       return $Profile
435:     }
436:   } catch {
437:     $Profile.reason = "Plex Transcoder probe launch failed"
438:     return $Profile
---
434:       return $Profile
435:     }
436:   } catch {
437:     $Profile.reason = "Plex Transcoder probe launch failed"
438:     return $Profile
439:   }
440:   if (!(Test-Path -LiteralPath $ErrLog)) {
441:     $Profile.reason = "Plex Transcoder probe log missing"
442:     return $Profile
---
438:     return $Profile
439:   }
440:   if (!(Test-Path -LiteralPath $ErrLog)) {
441:     $Profile.reason = "Plex Transcoder probe log missing"
442:     return $Profile
443:   }
444: 
445:   $ProbeText = Get-Content -LiteralPath $ErrLog -Raw -ErrorAction SilentlyContinue
446:   if ([string]::IsNullOrWhiteSpace($ProbeText)) {
---
``

## D:\PlexTools\Scripts\scarflix_v2\ScarFLIX_v2_LiveCatalogSeeder.ps1
``text
38: $WrittenMovies = 0
39: $WrittenEpisodes = 0
40: $Skipped = 0
41: $Failed = 0
42: $PolicyBlocked = 0
43: $CurationBlocked = 0
44: $ReleaseBlocked = 0
45: $Results = New-Object System.Collections.ArrayList
46: $Warnings = New-Object System.Collections.ArrayList
---
282:   if ($Path.Contains("?")) { $Glue = "&" }
283:   $Uri = "https://api.themoviedb.org/3/{0}{1}api_key=[REDACTED]" -f $Path, $Glue, [Uri]::EscapeDataString($ApiKey), $Page
284:   if ($Uri -notmatch "include_adult=") { $Uri = $Uri + "&include_adult=false" }
285:   return Invoke-RestMethod -Uri $Uri -UseBasicParsing -TimeoutSec 30 -ErrorAction Stop
286: }
287: 
288: function Get-Year {
289:   param([string]$DateText)
290:   if ([string]::IsNullOrWhiteSpace($DateText) -or $DateText.Length -lt 4) { return 0 }
---
588:     Add-Warning ("Plex scanner missing: {0}" -f $PlexScanner)
589:     return
590:   }
591:   try { & $PlexScanner --scan --refresh --section $Section | Out-Null } catch { Add-Warning ("Plex scan failed section {0}: {1}" -f $Section, $_.Exception.Message) }
592: }
593: 
594: Ensure-Dir $LogRoot
595: Ensure-Dir $PublishRoot
596: Ensure-Dir $StateRoot
---
612:     $Scanned = $Scanned + 1
613:     $Catalog = Read-JsonSafe $_.FullName
614:     if ($null -eq $Catalog) {
615:       $Failed = $Failed + 1
616:       return
617:     }
618:     $Kind = "" + (Get-Prop -Object $Catalog -Name "kind" -Default "movie")
619:     if ($Kind -eq "episode") {
620:       if ($EnableTvEpisodeCatalog) {
---
682:           }
683:         }
684:       } catch {
685:         $Failed = $Failed + 1
686:         Add-Warning ("TMDb live source failed {0} page {1}: {2}" -f $Source.name, $ActualPage, $_.Exception.Message)
687:       }
688:     }
689:     if ($IsRollingSource -and $LastAttemptedPage -gt 0) {
690:       if ($Cursor.PSObject.Properties["$($Source.name)"]) { $Cursor.$($Source.name) = $LastAttemptedPage } else { $Cursor | Add-Member -MemberType NoteProperty -Name ("" + $Source.name) -Value $LastAttemptedPage }
---
683:         }
684:       } catch {
685:         $Failed = $Failed + 1
686:         Add-Warning ("TMDb live source failed {0} page {1}: {2}" -f $Source.name, $ActualPage, $_.Exception.Message)
687:       }
688:     }
689:     if ($IsRollingSource -and $LastAttemptedPage -gt 0) {
690:       if ($Cursor.PSObject.Properties["$($Source.name)"]) { $Cursor.$($Source.name) = $LastAttemptedPage } else { $Cursor | Add-Member -MemberType NoteProperty -Name ("" + $Source.name) -Value $LastAttemptedPage }
691:       if ($Cursor.PSObject.Properties["updated_utc"]) { $Cursor.updated_utc = (Get-Date).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ") } else { $Cursor | Add-Member -MemberType NoteProperty -Name "updated_utc" -Value (Get-Date).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ") }
---
701: 
702: $Ended = Get-Date
703: $FinalStatus = "PASS"
704: if ($Warnings.Count -gt 0) { $FinalStatus = "REVIEW" }
705: if ($Failed -gt 0) { $FinalStatus = "FAIL" }
706: 
707: $Summary = [ordered]@{
708:   component = $Component
709:   status = $FinalStatus
---
702: $Ended = Get-Date
703: $FinalStatus = "PASS"
704: if ($Warnings.Count -gt 0) { $FinalStatus = "REVIEW" }
705: if ($Failed -gt 0) { $FinalStatus = "FAIL" }
706: 
707: $Summary = [ordered]@{
708:   component = $Component
709:   status = $FinalStatus
710:   started_utc = $Started.ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ")
---
721:   curation_blocked = $CurationBlocked
722:   release_blocked = $ReleaseBlocked
723:   rejected_stage_skipped = $RejectedStageSkipped
724:   failed = $Failed
725:   tv_episode_catalog_enabled = [bool]$EnableTvEpisodeCatalog
726:   stage_only = [bool]$StageOnly
727:   tv_episode_catalog_guardrail = "disabled_by_default_due_to_plex_tv_episode_metadata_collisions"
728:   output_movies = $OutMovies
729:   output_tv = $OutTv
---
744: Write-Host ("Curation blocked: {0}" -f $CurationBlocked)
745: Write-Host ("Release blocked: {0}" -f $ReleaseBlocked)
746: Write-Host ("Rejected stage skipped: {0}" -f $RejectedStageSkipped)
747: Write-Host ("Failed: {0}" -f $Failed)
748: Write-Host ("Status JSON: {0}" -f $StatusPath)
749: Write-Host ("Final: {0}" -f $FinalStatus)
750: 
751: if ($FinalStatus -eq "FAIL") { exit 1 }
752: exit 0
---
748: Write-Host ("Status JSON: {0}" -f $StatusPath)
749: Write-Host ("Final: {0}" -f $FinalStatus)
750: 
751: if ($FinalStatus -eq "FAIL") { exit 1 }
752: exit 0
---
``

## D:\PlexTools\Scripts\scarflix_v2\ScarFLIX_v2_LiveCatalogSeeder.ps1.bak_english_curation_20260603_111705
``text
37: $WrittenMovies = 0
38: $WrittenEpisodes = 0
39: $Skipped = 0
40: $Failed = 0
41: $PolicyBlocked = 0
42: $Results = New-Object System.Collections.ArrayList
43: $Warnings = New-Object System.Collections.ArrayList
44: $SeenKeys = @{}
45: $ExcludedKeys = @{}
---
256:   if ($Path.Contains("?")) { $Glue = "&" }
257:   $Uri = "https://api.themoviedb.org/3/{0}{1}api_key=[REDACTED]" -f $Path, $Glue, [Uri]::EscapeDataString($ApiKey), $Page
258:   if ($Uri -notmatch "include_adult=") { $Uri = $Uri + "&include_adult=false" }
259:   return Invoke-RestMethod -Uri $Uri -UseBasicParsing -TimeoutSec 30 -ErrorAction Stop
260: }
261: 
262: function Get-Year {
263:   param([string]$DateText)
264:   if ([string]::IsNullOrWhiteSpace($DateText) -or $DateText.Length -lt 4) { return 0 }
---
461:     Add-Warning ("Plex scanner missing: {0}" -f $PlexScanner)
462:     return
463:   }
464:   try { & $PlexScanner --scan --refresh --section $Section | Out-Null } catch { Add-Warning ("Plex scan failed section {0}: {1}" -f $Section, $_.Exception.Message) }
465: }
466: 
467: Ensure-Dir $LogRoot
468: Ensure-Dir $PublishRoot
469: Ensure-Dir $StateRoot
---
484:     $Scanned = $Scanned + 1
485:     $Catalog = Read-JsonSafe $_.FullName
486:     if ($null -eq $Catalog) {
487:       $Failed = $Failed + 1
488:       return
489:     }
490:     $Kind = "" + (Get-Prop -Object $Catalog -Name "kind" -Default "movie")
491:     if ($Kind -eq "episode") {
492:       if ($EnableTvEpisodeCatalog) {
---
555:           }
556:         }
557:       } catch {
558:         $Failed = $Failed + 1
559:         Add-Warning ("TMDb live source failed {0} page {1}: {2}" -f $Source.name, $ActualPage, $_.Exception.Message)
560:       }
561:     }
562:     if ($IsRollingSource -and $LastAttemptedPage -gt 0) {
563:       if ($Cursor.PSObject.Properties["$($Source.name)"]) { $Cursor.$($Source.name) = $LastAttemptedPage } else { $Cursor | Add-Member -MemberType NoteProperty -Name ("" + $Source.name) -Value $LastAttemptedPage }
---
556:         }
557:       } catch {
558:         $Failed = $Failed + 1
559:         Add-Warning ("TMDb live source failed {0} page {1}: {2}" -f $Source.name, $ActualPage, $_.Exception.Message)
560:       }
561:     }
562:     if ($IsRollingSource -and $LastAttemptedPage -gt 0) {
563:       if ($Cursor.PSObject.Properties["$($Source.name)"]) { $Cursor.$($Source.name) = $LastAttemptedPage } else { $Cursor | Add-Member -MemberType NoteProperty -Name ("" + $Source.name) -Value $LastAttemptedPage }
564:       if ($Cursor.PSObject.Properties["updated_utc"]) { $Cursor.updated_utc = (Get-Date).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ") } else { $Cursor | Add-Member -MemberType NoteProperty -Name "updated_utc" -Value (Get-Date).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ") }
---
574: 
575: $Ended = Get-Date
576: $FinalStatus = "PASS"
577: if ($Warnings.Count -gt 0) { $FinalStatus = "REVIEW" }
578: if ($Failed -gt 0) { $FinalStatus = "FAIL" }
579: 
580: $Summary = [ordered]@{
581:   component = $Component
582:   status = $FinalStatus
---
575: $Ended = Get-Date
576: $FinalStatus = "PASS"
577: if ($Warnings.Count -gt 0) { $FinalStatus = "REVIEW" }
578: if ($Failed -gt 0) { $FinalStatus = "FAIL" }
579: 
580: $Summary = [ordered]@{
581:   component = $Component
582:   status = $FinalStatus
583:   started_utc = $Started.ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ")
---
591:   written_episodes = $WrittenEpisodes
592:   skipped = $Skipped
593:   policy_blocked = $PolicyBlocked
594:   failed = $Failed
595:   tv_episode_catalog_enabled = [bool]$EnableTvEpisodeCatalog
596:   stage_only = [bool]$StageOnly
597:   tv_episode_catalog_guardrail = "disabled_by_default_due_to_plex_tv_episode_metadata_collisions"
598:   output_movies = $OutMovies
599:   output_tv = $OutTv
---
611: Write-Host ("Written: {0}" -f $Written)
612: Write-Host ("Skipped: {0}" -f $Skipped)
613: Write-Host ("Policy blocked: {0}" -f $PolicyBlocked)
614: Write-Host ("Failed: {0}" -f $Failed)
615: Write-Host ("Status JSON: {0}" -f $StatusPath)
616: Write-Host ("Final: {0}" -f $FinalStatus)
617: 
618: if ($FinalStatus -eq "FAIL") { exit 1 }
619: exit 0
---
615: Write-Host ("Status JSON: {0}" -f $StatusPath)
616: Write-Host ("Final: {0}" -f $FinalStatus)
617: 
618: if ($FinalStatus -eq "FAIL") { exit 1 }
619: exit 0
---
``

## D:\PlexTools\Scripts\scarflix_v2\ScarFLIX_v2_LiveCatalogSeeder.ps1.bak_rejected_hash_skip_20260603_1430
``text
37: $WrittenMovies = 0
38: $WrittenEpisodes = 0
39: $Skipped = 0
40: $Failed = 0
41: $PolicyBlocked = 0
42: $CurationBlocked = 0
43: $ReleaseBlocked = 0
44: $Results = New-Object System.Collections.ArrayList
45: $Warnings = New-Object System.Collections.ArrayList
---
258:   if ($Path.Contains("?")) { $Glue = "&" }
259:   $Uri = "https://api.themoviedb.org/3/{0}{1}api_key=[REDACTED]" -f $Path, $Glue, [Uri]::EscapeDataString($ApiKey), $Page
260:   if ($Uri -notmatch "include_adult=") { $Uri = $Uri + "&include_adult=false" }
261:   return Invoke-RestMethod -Uri $Uri -UseBasicParsing -TimeoutSec 30 -ErrorAction Stop
262: }
263: 
264: function Get-Year {
265:   param([string]$DateText)
266:   if ([string]::IsNullOrWhiteSpace($DateText) -or $DateText.Length -lt 4) { return 0 }
---
556:     Add-Warning ("Plex scanner missing: {0}" -f $PlexScanner)
557:     return
558:   }
559:   try { & $PlexScanner --scan --refresh --section $Section | Out-Null } catch { Add-Warning ("Plex scan failed section {0}: {1}" -f $Section, $_.Exception.Message) }
560: }
561: 
562: Ensure-Dir $LogRoot
563: Ensure-Dir $PublishRoot
564: Ensure-Dir $StateRoot
---
579:     $Scanned = $Scanned + 1
580:     $Catalog = Read-JsonSafe $_.FullName
581:     if ($null -eq $Catalog) {
582:       $Failed = $Failed + 1
583:       return
584:     }
585:     $Kind = "" + (Get-Prop -Object $Catalog -Name "kind" -Default "movie")
586:     if ($Kind -eq "episode") {
587:       if ($EnableTvEpisodeCatalog) {
---
649:           }
650:         }
651:       } catch {
652:         $Failed = $Failed + 1
653:         Add-Warning ("TMDb live source failed {0} page {1}: {2}" -f $Source.name, $ActualPage, $_.Exception.Message)
654:       }
655:     }
656:     if ($IsRollingSource -and $LastAttemptedPage -gt 0) {
657:       if ($Cursor.PSObject.Properties["$($Source.name)"]) { $Cursor.$($Source.name) = $LastAttemptedPage } else { $Cursor | Add-Member -MemberType NoteProperty -Name ("" + $Source.name) -Value $LastAttemptedPage }
---
650:         }
651:       } catch {
652:         $Failed = $Failed + 1
653:         Add-Warning ("TMDb live source failed {0} page {1}: {2}" -f $Source.name, $ActualPage, $_.Exception.Message)
654:       }
655:     }
656:     if ($IsRollingSource -and $LastAttemptedPage -gt 0) {
657:       if ($Cursor.PSObject.Properties["$($Source.name)"]) { $Cursor.$($Source.name) = $LastAttemptedPage } else { $Cursor | Add-Member -MemberType NoteProperty -Name ("" + $Source.name) -Value $LastAttemptedPage }
658:       if ($Cursor.PSObject.Properties["updated_utc"]) { $Cursor.updated_utc = (Get-Date).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ") } else { $Cursor | Add-Member -MemberType NoteProperty -Name "updated_utc" -Value (Get-Date).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ") }
---
668: 
669: $Ended = Get-Date
670: $FinalStatus = "PASS"
671: if ($Warnings.Count -gt 0) { $FinalStatus = "REVIEW" }
672: if ($Failed -gt 0) { $FinalStatus = "FAIL" }
673: 
674: $Summary = [ordered]@{
675:   component = $Component
676:   status = $FinalStatus
---
669: $Ended = Get-Date
670: $FinalStatus = "PASS"
671: if ($Warnings.Count -gt 0) { $FinalStatus = "REVIEW" }
672: if ($Failed -gt 0) { $FinalStatus = "FAIL" }
673: 
674: $Summary = [ordered]@{
675:   component = $Component
676:   status = $FinalStatus
677:   started_utc = $Started.ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ")
---
687:   policy_blocked = $PolicyBlocked
688:   curation_blocked = $CurationBlocked
689:   release_blocked = $ReleaseBlocked
690:   failed = $Failed
691:   tv_episode_catalog_enabled = [bool]$EnableTvEpisodeCatalog
692:   stage_only = [bool]$StageOnly
693:   tv_episode_catalog_guardrail = "disabled_by_default_due_to_plex_tv_episode_metadata_collisions"
694:   output_movies = $OutMovies
695:   output_tv = $OutTv
---
709: Write-Host ("Policy blocked: {0}" -f $PolicyBlocked)
710: Write-Host ("Curation blocked: {0}" -f $CurationBlocked)
711: Write-Host ("Release blocked: {0}" -f $ReleaseBlocked)
712: Write-Host ("Failed: {0}" -f $Failed)
713: Write-Host ("Status JSON: {0}" -f $StatusPath)
714: Write-Host ("Final: {0}" -f $FinalStatus)
715: 
716: if ($FinalStatus -eq "FAIL") { exit 1 }
717: exit 0
---
713: Write-Host ("Status JSON: {0}" -f $StatusPath)
714: Write-Host ("Final: {0}" -f $FinalStatus)
715: 
716: if ($FinalStatus -eq "FAIL") { exit 1 }
717: exit 0
---
``

## D:\PlexTools\Scripts\scarflix_v2\ScarFLIX_v2_LiveCatalogSeeder.ps1.bak_release_curation_20260603_121110
``text
37: $WrittenMovies = 0
38: $WrittenEpisodes = 0
39: $Skipped = 0
40: $Failed = 0
41: $PolicyBlocked = 0
42: $CurationBlocked = 0
43: $Results = New-Object System.Collections.ArrayList
44: $Warnings = New-Object System.Collections.ArrayList
45: $SeenKeys = @{}
---
257:   if ($Path.Contains("?")) { $Glue = "&" }
258:   $Uri = "https://api.themoviedb.org/3/{0}{1}api_key=[REDACTED]" -f $Path, $Glue, [Uri]::EscapeDataString($ApiKey), $Page
259:   if ($Uri -notmatch "include_adult=") { $Uri = $Uri + "&include_adult=false" }
260:   return Invoke-RestMethod -Uri $Uri -UseBasicParsing -TimeoutSec 30 -ErrorAction Stop
261: }
262: 
263: function Get-Year {
264:   param([string]$DateText)
265:   if ([string]::IsNullOrWhiteSpace($DateText) -or $DateText.Length -lt 4) { return 0 }
---
510:     Add-Warning ("Plex scanner missing: {0}" -f $PlexScanner)
511:     return
512:   }
513:   try { & $PlexScanner --scan --refresh --section $Section | Out-Null } catch { Add-Warning ("Plex scan failed section {0}: {1}" -f $Section, $_.Exception.Message) }
514: }
515: 
516: Ensure-Dir $LogRoot
517: Ensure-Dir $PublishRoot
518: Ensure-Dir $StateRoot
---
533:     $Scanned = $Scanned + 1
534:     $Catalog = Read-JsonSafe $_.FullName
535:     if ($null -eq $Catalog) {
536:       $Failed = $Failed + 1
537:       return
538:     }
539:     $Kind = "" + (Get-Prop -Object $Catalog -Name "kind" -Default "movie")
540:     if ($Kind -eq "episode") {
541:       if ($EnableTvEpisodeCatalog) {
---
604:           }
605:         }
606:       } catch {
607:         $Failed = $Failed + 1
608:         Add-Warning ("TMDb live source failed {0} page {1}: {2}" -f $Source.name, $ActualPage, $_.Exception.Message)
609:       }
610:     }
611:     if ($IsRollingSource -and $LastAttemptedPage -gt 0) {
612:       if ($Cursor.PSObject.Properties["$($Source.name)"]) { $Cursor.$($Source.name) = $LastAttemptedPage } else { $Cursor | Add-Member -MemberType NoteProperty -Name ("" + $Source.name) -Value $LastAttemptedPage }
---
605:         }
606:       } catch {
607:         $Failed = $Failed + 1
608:         Add-Warning ("TMDb live source failed {0} page {1}: {2}" -f $Source.name, $ActualPage, $_.Exception.Message)
609:       }
610:     }
611:     if ($IsRollingSource -and $LastAttemptedPage -gt 0) {
612:       if ($Cursor.PSObject.Properties["$($Source.name)"]) { $Cursor.$($Source.name) = $LastAttemptedPage } else { $Cursor | Add-Member -MemberType NoteProperty -Name ("" + $Source.name) -Value $LastAttemptedPage }
613:       if ($Cursor.PSObject.Properties["updated_utc"]) { $Cursor.updated_utc = (Get-Date).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ") } else { $Cursor | Add-Member -MemberType NoteProperty -Name "updated_utc" -Value (Get-Date).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ") }
---
623: 
624: $Ended = Get-Date
625: $FinalStatus = "PASS"
626: if ($Warnings.Count -gt 0) { $FinalStatus = "REVIEW" }
627: if ($Failed -gt 0) { $FinalStatus = "FAIL" }
628: 
629: $Summary = [ordered]@{
630:   component = $Component
631:   status = $FinalStatus
---
624: $Ended = Get-Date
625: $FinalStatus = "PASS"
626: if ($Warnings.Count -gt 0) { $FinalStatus = "REVIEW" }
627: if ($Failed -gt 0) { $FinalStatus = "FAIL" }
628: 
629: $Summary = [ordered]@{
630:   component = $Component
631:   status = $FinalStatus
632:   started_utc = $Started.ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ")
---
641:   skipped = $Skipped
642:   policy_blocked = $PolicyBlocked
643:   curation_blocked = $CurationBlocked
644:   failed = $Failed
645:   tv_episode_catalog_enabled = [bool]$EnableTvEpisodeCatalog
646:   stage_only = [bool]$StageOnly
647:   tv_episode_catalog_guardrail = "disabled_by_default_due_to_plex_tv_episode_metadata_collisions"
648:   output_movies = $OutMovies
649:   output_tv = $OutTv
---
662: Write-Host ("Skipped: {0}" -f $Skipped)
663: Write-Host ("Policy blocked: {0}" -f $PolicyBlocked)
664: Write-Host ("Curation blocked: {0}" -f $CurationBlocked)
665: Write-Host ("Failed: {0}" -f $Failed)
666: Write-Host ("Status JSON: {0}" -f $StatusPath)
667: Write-Host ("Final: {0}" -f $FinalStatus)
668: 
669: if ($FinalStatus -eq "FAIL") { exit 1 }
670: exit 0
---
666: Write-Host ("Status JSON: {0}" -f $StatusPath)
667: Write-Host ("Final: {0}" -f $FinalStatus)
668: 
669: if ($FinalStatus -eq "FAIL") { exit 1 }
670: exit 0
---
``

## D:\PlexTools\Scripts\scarflix_v2\ScarFLIX_v2_LiveSelfTest.ps1
``text
6:   [int]$MaxItems = 5,
7:   [string]$PreferTitle = "12 Angry Men",
8:   [switch]$AllLive,
9:   [switch]$QuarantineFailed
10: )
11: 
12: $ErrorActionPreference = "Continue"
13: try { [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12 } catch {}
14: 
---
18: $PublishRoot = "D:\PlexTools\public\latest\scarflix"
19: $LiveMovieRoot = "D:\StremioCatalog\_Hybrid\Movies\_ScarFLIXLive"
20: $LiveTvRoot = "D:\StremioCatalog\_Hybrid\_HTTP\TV"
21: $QuarantineRoot = "D:\PlexTools\archive\scarflix_v2\live_catalog_failed"
22: $PlexSqlite = "C:\Program Files\Plex\Plex Media Server\Plex SQLite.exe"
23: $PlexDb = "C:\Users\jason\AppData\Local\Plex Media Server\Plug-in Support\Databases\com.plexapp.plugins.library.db"
24: $StatusPath = Join-Path $PublishRoot "live_selftest_status.json"
25: $LogPath = Join-Path $LogRoot ("scarflix_v2_live_selftest_{0}.log" -f (Get-Date -Format "yyyyMMdd"))
26: $MinLiveContentLength = 52428800
---
31: 
32: $Checked = 0
33: $Passed = 0
34: $Failed = 0
35: $PlexIndexed = 0
36: $Quarantined = 0
37: $Results = New-Object System.Collections.ArrayList
38: $Warnings = New-Object System.Collections.ArrayList
39: 
---
85:   }
86: }
87: 
88: function Move-FailedLiveItem {
89:   param([string]$StrmPath, [string]$Reason)
90:   if ([string]::IsNullOrWhiteSpace($StrmPath)) { return $false }
91:   $Parent = Split-Path -Parent $StrmPath
92:   if ([string]::IsNullOrWhiteSpace($Parent) -or !(Test-Path -LiteralPath $Parent)) { return $false }
93:   $ResolvedParent = ""
---
103:   $SafeName = $ResolvedParent.Replace(":", "").Replace("\", "__")
104:   $DestRoot = Join-Path (Join-Path $QuarantineRoot $Stamp) $SafeName
105:   Ensure-Dir (Split-Path -Parent $DestRoot)
106:   $InfoPath = Join-Path $Parent "scarflix_live_failed.json"
107:   $Info = [ordered]@{
108:     failed_utc = (Get-Date).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ")
109:     strm = $StrmPath
110:     reason = $Reason
111:   }
---
105:   Ensure-Dir (Split-Path -Parent $DestRoot)
106:   $InfoPath = Join-Path $Parent "scarflix_live_failed.json"
107:   $Info = [ordered]@{
108:     failed_utc = (Get-Date).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ")
109:     strm = $StrmPath
110:     reason = $Reason
111:   }
112:   Write-Utf8NoBom -Path $InfoPath -Text ($Info | ConvertTo-Json -Depth 5)
113:   try {
---
114:     Move-Item -LiteralPath $Parent -Destination $DestRoot -Force -ErrorAction Stop
115:     return $true
116:   } catch {
117:     [void]$Warnings.Add("Quarantine failed: " + (ConvertTo-AsciiText $_.Exception.Message))
118:     return $false
119:   }
120: }
121: 
122: function Test-LiveStrm {
---
123:   param([string]$Path)
124:   $Url = ""
125:   try { $Url = (Get-Content -LiteralPath $Path -TotalCount 1 -ErrorAction Stop).Trim() } catch {}
126:   $Item = [ordered]@{ strm = $Path; status = "FAIL"; head_status = 0; range_status = 0; content_type = ""; content_length = ""; content_range = ""; reason = "" }
127:   if ([string]::IsNullOrWhiteSpace($Url) -or $Url -notmatch "^http://") {
128:     $Item.reason = "missing local proxy URL"
129:     return $Item
130:   }
131:   try {
---
129:     return $Item
130:   }
131:   try {
132:     $Head = Invoke-WebRequest -Uri $Url -Method Head -UseBasicParsing -TimeoutSec 90 -ErrorAction Stop
133:     $Item.head_status = [int]$Head.StatusCode
134:     $Item.content_type = "" + $Head.Headers["Content-Type"]
135:     $Item.content_length = "" + $Head.Headers["Content-Length"]
136:   } catch {
137:     $Item.reason = "HEAD failed: " + (ConvertTo-AsciiText $_.Exception.Message)
---
134:     $Item.content_type = "" + $Head.Headers["Content-Type"]
135:     $Item.content_length = "" + $Head.Headers["Content-Length"]
136:   } catch {
137:     $Item.reason = "HEAD failed: " + (ConvertTo-AsciiText $_.Exception.Message)
138:     return $Item
139:   }
140:   $LengthValue = 0
141:   [void][int64]::TryParse(("" + $Item.content_length), [ref]$LengthValue)
142:   if ($LengthValue -lt $MinLiveContentLength) {
---
146:   try {
147:     $Req = [Net.HttpWebRequest]::Create($Url)
148:     $Req.Method = "GET"
149:     $Req.Timeout = 90000
150:     $Req.ReadWriteTimeout = 90000
151:     $Req.AddRange(0, 1)
152:     $Resp = $Req.GetResponse()
153:     try {
154:       $Item.range_status = [int]$Resp.StatusCode
---
147:     $Req = [Net.HttpWebRequest]::Create($Url)
148:     $Req.Method = "GET"
149:     $Req.Timeout = 90000
150:     $Req.ReadWriteTimeout = 90000
151:     $Req.AddRange(0, 1)
152:     $Resp = $Req.GetResponse()
153:     try {
154:       $Item.range_status = [int]$Resp.StatusCode
155:       $Item.content_range = "" + $Resp.Headers["Content-Range"]
---
160:       try { if ($Resp) { $Resp.Close() } } catch {}
161:     }
162:   } catch {
163:     $Item.reason = "Range failed: " + (ConvertTo-AsciiText $_.Exception.Message)
164:     return $Item
165:   }
166:   if ($Item.head_status -eq 200 -and $Item.range_status -eq 206 -and $Item.content_range -match "^bytes 0-1/") {
167:     $Item.status = "PASS"
168:     $Item.reason = "live stream passed proxy admission"
---
208: foreach ($Path in @($Selected)) {
209:   $Checked = $Checked + 1
210:   $Result = Test-LiveStrm -Path $Path
211:   if ($Result.status -eq "PASS") { $Passed = $Passed + 1 } else { $Failed = $Failed + 1 }
212:   if ($QuarantineFailed -and $Result.status -ne "PASS") {
213:     if (Move-FailedLiveItem -StrmPath $Path -Reason ("" + $Result.reason)) { $Quarantined = $Quarantined + 1 }
214:   }
215:   [void]$Results.Add($Result)
216: }
---
209:   $Checked = $Checked + 1
210:   $Result = Test-LiveStrm -Path $Path
211:   if ($Result.status -eq "PASS") { $Passed = $Passed + 1 } else { $Failed = $Failed + 1 }
212:   if ($QuarantineFailed -and $Result.status -ne "PASS") {
213:     if (Move-FailedLiveItem -StrmPath $Path -Reason ("" + $Result.reason)) { $Quarantined = $Quarantined + 1 }
214:   }
215:   [void]$Results.Add($Result)
216: }
217: 
---
210:   $Result = Test-LiveStrm -Path $Path
211:   if ($Result.status -eq "PASS") { $Passed = $Passed + 1 } else { $Failed = $Failed + 1 }
212:   if ($QuarantineFailed -and $Result.status -ne "PASS") {
213:     if (Move-FailedLiveItem -StrmPath $Path -Reason ("" + $Result.reason)) { $Quarantined = $Quarantined + 1 }
214:   }
215:   [void]$Results.Add($Result)
216: }
217: 
218: $PlexCountText = Invoke-PlexSql "select coalesce(count(*),0) from media_parts mp join media_items mi on mi.id=mp.media_item_id where ((mi.library_section_id=5 and mp.file like '%_ScarFLIXLive%') or (mi.library_section_id=6 and mp.file like '%_Hybrid\_HTTP\TV%') or (mi.library_section_id=7 and mp.file like '%StremioCatalog\Netflix\Movies%') or (mi.library_section_id=8 and mp.file like '%StremioCatalog\Netflix\TV%') or (mi.library_section_id=10 and mp.file like '%StremioCatalog\Crunchyroll\TV%')) and mp.file like '%.strm' and mi.deleted_at is null and mp.deleted_at is null;"
---
220: 
221: $Ended = Get-Date
222: $FinalStatus = "PASS"
223: if ($Checked -le 0) { $FinalStatus = "FAIL" }
224: if ($Failed -gt 0) { $FinalStatus = "FAIL" }
225: 
226: $Summary = [ordered]@{
227:   component = $Component
228:   status = $FinalStatus
---
221: $Ended = Get-Date
222: $FinalStatus = "PASS"
223: if ($Checked -le 0) { $FinalStatus = "FAIL" }
224: if ($Failed -gt 0) { $FinalStatus = "FAIL" }
225: 
226: $Summary = [ordered]@{
227:   component = $Component
228:   status = $FinalStatus
229:   started_utc = $Started.ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ")
---
``

## D:\PlexTools\Scripts\scarflix_v2\ScarFLIX_v2_MasterAuthority.ps1
``text
25: $PublishRoot = "D:\PlexTools\public\latest\scarflix"
26: $StatusPath = Join-Path $PublishRoot "master_authority_status.json"
27: $LogPath = Join-Path $LogRoot ("scarflix_v2_master_authority_{0}.log" -f (Get-Date -Format "yyyyMMdd"))
28: $DefaultTimeoutSeconds = 600
29: $MaxTimeoutSeconds = 7200
30: $AllowedScriptRoots = @(
31:   "D:\PlexTools\Scripts",
32:   "C:\Users\jason\OneDrive\Documents\Plex Project"
33: )
---
26: $StatusPath = Join-Path $PublishRoot "master_authority_status.json"
27: $LogPath = Join-Path $LogRoot ("scarflix_v2_master_authority_{0}.log" -f (Get-Date -Format "yyyyMMdd"))
28: $DefaultTimeoutSeconds = 600
29: $MaxTimeoutSeconds = 7200
30: $AllowedScriptRoots = @(
31:   "D:\PlexTools\Scripts",
32:   "C:\Users\jason\OneDrive\Documents\Plex Project"
33: )
34: 
---
108:   return [ordered]@{
109:     job_id = $JobId
110:     mode = $Mode
111:     status = "FAIL"
112:     exit_code = -1
113:     reason = "not run"
114:     started_utc = ""
115:     ended_utc = ""
116:     duration_seconds = 0
---
120:   }
121: }
122: 
123: function Get-TimeoutSeconds {
124:   param($Job)
125:   $timeout = $DefaultTimeoutSeconds
126:   if ($Job -and $Job.PSObject.Properties["timeout_seconds"]) {
127:     [void][int]::TryParse(("" + $Job.timeout_seconds), [ref]$timeout)
128:   }
---
122: 
123: function Get-TimeoutSeconds {
124:   param($Job)
125:   $timeout = $DefaultTimeoutSeconds
126:   if ($Job -and $Job.PSObject.Properties["timeout_seconds"]) {
127:     [void][int]::TryParse(("" + $Job.timeout_seconds), [ref]$timeout)
128:   }
129:   if ($timeout -lt 5) { $timeout = 5 }
130:   if ($timeout -gt $MaxTimeoutSeconds) { $timeout = $MaxTimeoutSeconds }
---
123: function Get-TimeoutSeconds {
124:   param($Job)
125:   $timeout = $DefaultTimeoutSeconds
126:   if ($Job -and $Job.PSObject.Properties["timeout_seconds"]) {
127:     [void][int]::TryParse(("" + $Job.timeout_seconds), [ref]$timeout)
128:   }
129:   if ($timeout -lt 5) { $timeout = 5 }
130:   if ($timeout -gt $MaxTimeoutSeconds) { $timeout = $MaxTimeoutSeconds }
131:   return $timeout
---
124:   param($Job)
125:   $timeout = $DefaultTimeoutSeconds
126:   if ($Job -and $Job.PSObject.Properties["timeout_seconds"]) {
127:     [void][int]::TryParse(("" + $Job.timeout_seconds), [ref]$timeout)
128:   }
129:   if ($timeout -lt 5) { $timeout = 5 }
130:   if ($timeout -gt $MaxTimeoutSeconds) { $timeout = $MaxTimeoutSeconds }
131:   return $timeout
132: }
---
126:   if ($Job -and $Job.PSObject.Properties["timeout_seconds"]) {
127:     [void][int]::TryParse(("" + $Job.timeout_seconds), [ref]$timeout)
128:   }
129:   if ($timeout -lt 5) { $timeout = 5 }
130:   if ($timeout -gt $MaxTimeoutSeconds) { $timeout = $MaxTimeoutSeconds }
131:   return $timeout
132: }
133: 
134: function Invoke-ProcessWithLogs {
---
127:     [void][int]::TryParse(("" + $Job.timeout_seconds), [ref]$timeout)
128:   }
129:   if ($timeout -lt 5) { $timeout = 5 }
130:   if ($timeout -gt $MaxTimeoutSeconds) { $timeout = $MaxTimeoutSeconds }
131:   return $timeout
132: }
133: 
134: function Invoke-ProcessWithLogs {
135:   param([string]$FilePath, [string[]]$Arguments, [int]$TimeoutSeconds, [string]$JobId, [string]$WorkDir)
---
128:   }
129:   if ($timeout -lt 5) { $timeout = 5 }
130:   if ($timeout -gt $MaxTimeoutSeconds) { $timeout = $MaxTimeoutSeconds }
131:   return $timeout
132: }
133: 
134: function Invoke-ProcessWithLogs {
135:   param([string]$FilePath, [string[]]$Arguments, [int]$TimeoutSeconds, [string]$JobId, [string]$WorkDir)
136:   $stamp = Get-Date -Format "yyyyMMdd_HHmmss"
---
132: }
133: 
134: function Invoke-ProcessWithLogs {
135:   param([string]$FilePath, [string[]]$Arguments, [int]$TimeoutSeconds, [string]$JobId, [string]$WorkDir)
136:   $stamp = Get-Date -Format "yyyyMMdd_HHmmss"
137:   $outLog = Join-Path $LogRoot ("scarflix_v2_master_{0}_{1}.out.log" -f $stamp,$JobId)
138:   $errLog = Join-Path $LogRoot ("scarflix_v2_master_{0}_{1}.err.log" -f $stamp,$JobId)
139:   $proc = $null
140:   $started = Get-Date
---
142:     $startInfo = @{ FilePath=$FilePath; ArgumentList=@($Arguments); PassThru=$true; WindowStyle="Hidden"; RedirectStandardOutput=$outLog; RedirectStandardError=$errLog }
143:     if (![string]::IsNullOrWhiteSpace($WorkDir) -and (Test-Path -LiteralPath $WorkDir)) { $startInfo.WorkingDirectory = $WorkDir }
144:     $proc = Start-Process @startInfo
145:     $finished = $proc.WaitForExit($TimeoutSeconds * 1000)
146:     if (!$finished) {
147:       try { & taskkill.exe /PID $proc.Id /T /F | Out-Null } catch {}
148:       Redact-FileInPlace -Path $outLog
149:       Redact-FileInPlace -Path $errLog
150:       return [ordered]@{ exit_code=124; stdout=$outLog; stderr=$errLog; reason="timeout"; duration_seconds=[int]((Get-Date)-$started).TotalSeconds }
---
147:       try { & taskkill.exe /PID $proc.Id /T /F | Out-Null } catch {}
148:       Redact-FileInPlace -Path $outLog
149:       Redact-FileInPlace -Path $errLog
150:       return [ordered]@{ exit_code=124; stdout=$outLog; stderr=$errLog; reason="timeout"; duration_seconds=[int]((Get-Date)-$started).TotalSeconds }
151:     }
152:     Redact-FileInPlace -Path $outLog
153:     Redact-FileInPlace -Path $errLog
154:     return [ordered]@{ exit_code=[int]$proc.ExitCode; stdout=$outLog; stderr=$errLog; reason="completed"; duration_seconds=[int]((Get-Date)-$started).TotalSeconds }
155:   } catch {
---
170:   $result.started_utc = (Get-Date).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ")
171: 
172:   if ($null -eq $Job) {
173:     $result.reason = "job json parse failed"
174:   } elseif (!($Job.PSObject.Properties["authority"]) -or ("" + $Job.authority) -ne $AuthorityPhrase) {
175:     $result.reason = "missing delegated authority marker"
176:   } elseif ($mode -eq "script") {
177:     $script = ""
178:     if ($Job.PSObject.Properties["script"]) { $script = "" + $Job.script }
---
188:       if ($Job.PSObject.Properties["arguments"]) { foreach($a in @($Job.arguments)){ [void]$args.Add("" + $a) } }
189:       $workDir = ""
190:       if ($Job.PSObject.Properties["working_directory"]) { $workDir = "" + $Job.working_directory }
191:       $run = Invoke-ProcessWithLogs -FilePath "powershell.exe" -Arguments ([string[]]@($args.ToArray())) -TimeoutSeconds (Get-TimeoutSeconds $Job) -JobId $jobId -WorkDir $workDir
192:       $result.exit_code = $run.exit_code
193:       $result.stdout = $run.stdout
194:       $result.stderr = $run.stderr
195:       $result.duration_seconds = $run.duration_seconds
196:       if ($run.exit_code -eq 0) { $result.status = "PASS"; $result.reason = "script completed" } else { $result.reason = $run.reason }
---
214:         $args = @("-NoProfile","-ExecutionPolicy","Bypass","-File",$runtimePath)
215:         $workDir = ""
216:         if ($Job.PSObject.Properties["working_directory"]) { $workDir = "" + $Job.working_directory }
217:         $run = Invoke-ProcessWithLogs -FilePath "powershell.exe" -Arguments ([string[]]$args) -TimeoutSeconds (Get-TimeoutSeconds $Job) -JobId $jobId -WorkDir $workDir
218:         $result.exit_code = $run.exit_code
219:         $result.stdout = $run.stdout
220:         $result.stderr = $run.stderr
221:         $result.duration_seconds = $run.duration_seconds
222:         if ($run.exit_code -eq 0) { $result.status = "PASS"; $result.reason = "inline PowerShell completed" } else { $result.reason = $run.reason }
---
232:       if ($Job.PSObject.Properties["arguments"]) { foreach($a in @($Job.arguments)){ $argList += ("" + $a) } }
233:       $workDir = ""
234:       if ($Job.PSObject.Properties["working_directory"]) { $workDir = "" + $Job.working_directory }
235:       $run = Invoke-ProcessWithLogs -FilePath $exe -Arguments ([string[]]$argList) -TimeoutSeconds (Get-TimeoutSeconds $Job) -JobId $jobId -WorkDir $workDir
236:       $result.exit_code = $run.exit_code
237:       $result.stdout = $run.stdout
238:       $result.stderr = $run.stderr
239:       $result.duration_seconds = $run.duration_seconds
240:       if ($run.exit_code -eq 0) { $result.status = "PASS"; $result.reason = "command completed" } else { $result.reason = $run.reason }
---
260: $started = Get-Date
261: $processed = 0
262: $passed = 0
263: $failed = 0
264: $results = New-Object System.Collections.ArrayList
265: Write-Step "INFO" "Master authority run started."
266: 
267: $jobFiles = New-Object System.Collections.ArrayList
268: for($i=0; $i -lt $QueueRoots.Count; $i++) {
---
``

## D:\PlexTools\Scripts\scarflix_v2\ScarFLIX_v2_MasterAuthority.ps1.bak_parserfix_20260601_1618
``text
25: $PublishRoot = "D:\PlexTools\public\latest\scarflix"
26: $StatusPath = Join-Path $PublishRoot "master_authority_status.json"
27: $LogPath = Join-Path $LogRoot ("scarflix_v2_master_authority_{0}.log" -f (Get-Date -Format "yyyyMMdd"))
28: $DefaultTimeoutSeconds = 600
29: $MaxTimeoutSeconds = 7200
30: $AllowedScriptRoots = @(
31:   "D:\PlexTools\Scripts",
32:   "C:\Users\jason\OneDrive\Documents\Plex Project"
33: )
---
26: $StatusPath = Join-Path $PublishRoot "master_authority_status.json"
27: $LogPath = Join-Path $LogRoot ("scarflix_v2_master_authority_{0}.log" -f (Get-Date -Format "yyyyMMdd"))
28: $DefaultTimeoutSeconds = 600
29: $MaxTimeoutSeconds = 7200
30: $AllowedScriptRoots = @(
31:   "D:\PlexTools\Scripts",
32:   "C:\Users\jason\OneDrive\Documents\Plex Project"
33: )
34: 
---
108:   return [ordered]@{
109:     job_id = $JobId
110:     mode = $Mode
111:     status = "FAIL"
112:     exit_code = -1
113:     reason = "not run"
114:     started_utc = ""
115:     ended_utc = ""
116:     duration_seconds = 0
---
120:   }
121: }
122: 
123: function Get-TimeoutSeconds {
124:   param($Job)
125:   $timeout = $DefaultTimeoutSeconds
126:   if ($Job -and $Job.PSObject.Properties["timeout_seconds"]) {
127:     [void][int]::TryParse(("" + $Job.timeout_seconds), [ref]$timeout)
128:   }
---
122: 
123: function Get-TimeoutSeconds {
124:   param($Job)
125:   $timeout = $DefaultTimeoutSeconds
126:   if ($Job -and $Job.PSObject.Properties["timeout_seconds"]) {
127:     [void][int]::TryParse(("" + $Job.timeout_seconds), [ref]$timeout)
128:   }
129:   if ($timeout -lt 5) { $timeout = 5 }
130:   if ($timeout -gt $MaxTimeoutSeconds) { $timeout = $MaxTimeoutSeconds }
---
123: function Get-TimeoutSeconds {
124:   param($Job)
125:   $timeout = $DefaultTimeoutSeconds
126:   if ($Job -and $Job.PSObject.Properties["timeout_seconds"]) {
127:     [void][int]::TryParse(("" + $Job.timeout_seconds), [ref]$timeout)
128:   }
129:   if ($timeout -lt 5) { $timeout = 5 }
130:   if ($timeout -gt $MaxTimeoutSeconds) { $timeout = $MaxTimeoutSeconds }
131:   return $timeout
---
124:   param($Job)
125:   $timeout = $DefaultTimeoutSeconds
126:   if ($Job -and $Job.PSObject.Properties["timeout_seconds"]) {
127:     [void][int]::TryParse(("" + $Job.timeout_seconds), [ref]$timeout)
128:   }
129:   if ($timeout -lt 5) { $timeout = 5 }
130:   if ($timeout -gt $MaxTimeoutSeconds) { $timeout = $MaxTimeoutSeconds }
131:   return $timeout
132: }
---
126:   if ($Job -and $Job.PSObject.Properties["timeout_seconds"]) {
127:     [void][int]::TryParse(("" + $Job.timeout_seconds), [ref]$timeout)
128:   }
129:   if ($timeout -lt 5) { $timeout = 5 }
130:   if ($timeout -gt $MaxTimeoutSeconds) { $timeout = $MaxTimeoutSeconds }
131:   return $timeout
132: }
133: 
134: function Invoke-ProcessWithLogs {
---
127:     [void][int]::TryParse(("" + $Job.timeout_seconds), [ref]$timeout)
128:   }
129:   if ($timeout -lt 5) { $timeout = 5 }
130:   if ($timeout -gt $MaxTimeoutSeconds) { $timeout = $MaxTimeoutSeconds }
131:   return $timeout
132: }
133: 
134: function Invoke-ProcessWithLogs {
135:   param([string]$FilePath, [string[]]$Arguments, [int]$TimeoutSeconds, [string]$JobId, [string]$WorkDir)
---
128:   }
129:   if ($timeout -lt 5) { $timeout = 5 }
130:   if ($timeout -gt $MaxTimeoutSeconds) { $timeout = $MaxTimeoutSeconds }
131:   return $timeout
132: }
133: 
134: function Invoke-ProcessWithLogs {
135:   param([string]$FilePath, [string[]]$Arguments, [int]$TimeoutSeconds, [string]$JobId, [string]$WorkDir)
136:   $stamp = Get-Date -Format "yyyyMMdd_HHmmss"
---
132: }
133: 
134: function Invoke-ProcessWithLogs {
135:   param([string]$FilePath, [string[]]$Arguments, [int]$TimeoutSeconds, [string]$JobId, [string]$WorkDir)
136:   $stamp = Get-Date -Format "yyyyMMdd_HHmmss"
137:   $outLog = Join-Path $LogRoot ("scarflix_v2_master_{0}_{1}.out.log" -f $stamp,$JobId)
138:   $errLog = Join-Path $LogRoot ("scarflix_v2_master_{0}_{1}.err.log" -f $stamp,$JobId)
139:   $proc = $null
140:   $started = Get-Date
---
142:     $startInfo = @{ FilePath=$FilePath; ArgumentList=@($Arguments); PassThru=$true; WindowStyle="Hidden"; RedirectStandardOutput=$outLog; RedirectStandardError=$errLog }
143:     if (![string]::IsNullOrWhiteSpace($WorkDir) -and (Test-Path -LiteralPath $WorkDir)) { $startInfo.WorkingDirectory = $WorkDir }
144:     $proc = Start-Process @startInfo
145:     $finished = $proc.WaitForExit($TimeoutSeconds * 1000)
146:     if (!$finished) {
147:       try { & taskkill.exe /PID $proc.Id /T /F | Out-Null } catch {}
148:       Redact-FileInPlace -Path $outLog
149:       Redact-FileInPlace -Path $errLog
150:       return [ordered]@{ exit_code=124; stdout=$outLog; stderr=$errLog; reason="timeout"; duration_seconds=[int]((Get-Date)-$started).TotalSeconds }
---
147:       try { & taskkill.exe /PID $proc.Id /T /F | Out-Null } catch {}
148:       Redact-FileInPlace -Path $outLog
149:       Redact-FileInPlace -Path $errLog
150:       return [ordered]@{ exit_code=124; stdout=$outLog; stderr=$errLog; reason="timeout"; duration_seconds=[int]((Get-Date)-$started).TotalSeconds }
151:     }
152:     Redact-FileInPlace -Path $outLog
153:     Redact-FileInPlace -Path $errLog
154:     return [ordered]@{ exit_code=[int]$proc.ExitCode; stdout=$outLog; stderr=$errLog; reason="completed"; duration_seconds=[int]((Get-Date)-$started).TotalSeconds }
155:   } catch {
---
170:   $result.started_utc = (Get-Date).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ")
171: 
172:   if ($null -eq $Job) {
173:     $result.reason = "job json parse failed"
174:   } elseif (!($Job.PSObject.Properties["authority"]) -or ("" + $Job.authority) -ne $AuthorityPhrase) {
175:     $result.reason = "missing delegated authority marker"
176:   } elseif ($mode -eq "script") {
177:     $script = ""
178:     if ($Job.PSObject.Properties["script"]) { $script = "" + $Job.script }
---
188:       if ($Job.PSObject.Properties["arguments"]) { foreach($a in @($Job.arguments)){ [void]$args.Add("" + $a) } }
189:       $workDir = ""
190:       if ($Job.PSObject.Properties["working_directory"]) { $workDir = "" + $Job.working_directory }
191:       $run = Invoke-ProcessWithLogs -FilePath "powershell.exe" -Arguments ([string[]]@($args.ToArray())) -TimeoutSeconds (Get-TimeoutSeconds $Job) -JobId $jobId -WorkDir $workDir
192:       $result.exit_code = $run.exit_code
193:       $result.stdout = $run.stdout
194:       $result.stderr = $run.stderr
195:       $result.duration_seconds = $run.duration_seconds
196:       if ($run.exit_code -eq 0) { $result.status = "PASS"; $result.reason = "script completed" } else { $result.reason = $run.reason }
---
214:         $args = @("-NoProfile","-ExecutionPolicy","Bypass","-File",$runtimePath)
215:         $workDir = ""
216:         if ($Job.PSObject.Properties["working_directory"]) { $workDir = "" + $Job.working_directory }
217:         $run = Invoke-ProcessWithLogs -FilePath "powershell.exe" -Arguments ([string[]]$args) -TimeoutSeconds (Get-TimeoutSeconds $Job) -JobId $jobId -WorkDir $workDir
218:         $result.exit_code = $run.exit_code
219:         $result.stdout = $run.stdout
220:         $result.stderr = $run.stderr
221:         $result.duration_seconds = $run.duration_seconds
222:         if ($run.exit_code -eq 0) { $result.status = "PASS"; $result.reason = "inline PowerShell completed" } else { $result.reason = $run.reason }
---
232:       if ($Job.PSObject.Properties["arguments"]) { foreach($a in @($Job.arguments)){ $argList += ("" + $a) } }
233:       $workDir = ""
234:       if ($Job.PSObject.Properties["working_directory"]) { $workDir = "" + $Job.working_directory }
235:       $run = Invoke-ProcessWithLogs -FilePath $exe -Arguments ([string[]]$argList) -TimeoutSeconds (Get-TimeoutSeconds $Job) -JobId $jobId -WorkDir $workDir
236:       $result.exit_code = $run.exit_code
237:       $result.stdout = $run.stdout
238:       $result.stderr = $run.stderr
239:       $result.duration_seconds = $run.duration_seconds
240:       if ($run.exit_code -eq 0) { $result.status = "PASS"; $result.reason = "command completed" } else { $result.reason = $run.reason }
---
260: $started = Get-Date
261: $processed = 0
262: $passed = 0
263: $failed = 0
264: $results = New-Object System.Collections.ArrayList
265: Write-Step "INFO" "Master authority run started."
266: 
267: $jobFiles = New-Object System.Collections.ArrayList
268: for($i=0; $i -lt $QueueRoots.Count; $i++) {
---
``

## D:\PlexTools\Scripts\scarflix_v2\ScarFLIX_v2_MaterializeReady.ps1
``text
32: $Materialized = 0
33: $Verified = 0
34: $AlreadyLocal = 0
35: $Failed = 0
36: $Skipped = 0
37: $Downloaded = 0
38: $PlaceholderInstalled = 0
39: $LastItem = ""
40: $LastError = ""
---
411:   try {
412:     & $PlexScanner --scan --refresh --section $Section | Out-Null
413:   } catch {
414:     Add-Warning ("Plex scan failed for section {0}: {1}" -f $Section, $_.Exception.Message)
415:   }
416: }
417: 
418: function Test-PlexIndexedStreams {
419:   param([string]$FilePath, [int]$Section)
---
458:     }
459:     Start-Sleep -Seconds 5
460:   }
461:   $Result.detail = "Plex DB did not expose both video and audio streams before timeout"
462:   return $Result
463: }
464: 
465: function Add-Result {
466:   param([string]$Folder, [string]$Title, [string]$Status, [string]$Message, [string]$FilePath, $Verify)
---
510:       $script:Verified = $script:Verified + 1
511:       Add-Result -Folder $Folder -Title $Title -Status "PASS" -Message "Already local and Plex verified" -FilePath $Existing -Verify $Verify
512:     } else {
513:       $script:Failed = $script:Failed + 1
514:       Add-Result -Folder $Folder -Title $Title -Status "REVIEW" -Message $Verify.detail -FilePath $Existing -Verify $Verify
515:     }
516:     return
517:   }
518: 
---
511:       Add-Result -Folder $Folder -Title $Title -Status "PASS" -Message "Already local and Plex verified" -FilePath $Existing -Verify $Verify
512:     } else {
513:       $script:Failed = $script:Failed + 1
514:       Add-Result -Folder $Folder -Title $Title -Status "REVIEW" -Message $Verify.detail -FilePath $Existing -Verify $Verify
515:     }
516:     return
517:   }
518: 
519:   $Candidate = Get-LocalCandidate -Request $Request
---
534:   }
535: 
536:   if ([string]::IsNullOrWhiteSpace($Installed) -or !(Test-Path -LiteralPath $Installed)) {
537:     $script:Failed = $script:Failed + 1
538:     Set-Prop $State "state" "FAILED"
539:     Set-Prop $State "reject_reason" "Materialization failed or source below minimum real media size"
540:     Set-Prop $State "materialize_error" "No local candidate found and stream download failed"
541:     Set-Prop $State "updated_utc" (Get-Date).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ")
542:     Save-State -Folder $Folder -State $State
---
535: 
536:   if ([string]::IsNullOrWhiteSpace($Installed) -or !(Test-Path -LiteralPath $Installed)) {
537:     $script:Failed = $script:Failed + 1
538:     Set-Prop $State "state" "FAILED"
539:     Set-Prop $State "reject_reason" "Materialization failed or source below minimum real media size"
540:     Set-Prop $State "materialize_error" "No local candidate found and stream download failed"
541:     Set-Prop $State "updated_utc" (Get-Date).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ")
542:     Save-State -Folder $Folder -State $State
543:     Add-Result -Folder $Folder -Title $Title -Status "FAIL" -Message "No local candidate found and stream download failed" -FilePath "" -Verify $null
---
536:   if ([string]::IsNullOrWhiteSpace($Installed) -or !(Test-Path -LiteralPath $Installed)) {
537:     $script:Failed = $script:Failed + 1
538:     Set-Prop $State "state" "FAILED"
539:     Set-Prop $State "reject_reason" "Materialization failed or source below minimum real media size"
540:     Set-Prop $State "materialize_error" "No local candidate found and stream download failed"
541:     Set-Prop $State "updated_utc" (Get-Date).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ")
542:     Save-State -Folder $Folder -State $State
543:     Add-Result -Folder $Folder -Title $Title -Status "FAIL" -Message "No local candidate found and stream download failed" -FilePath "" -Verify $null
544:     return
---
537:     $script:Failed = $script:Failed + 1
538:     Set-Prop $State "state" "FAILED"
539:     Set-Prop $State "reject_reason" "Materialization failed or source below minimum real media size"
540:     Set-Prop $State "materialize_error" "No local candidate found and stream download failed"
541:     Set-Prop $State "updated_utc" (Get-Date).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ")
542:     Save-State -Folder $Folder -State $State
543:     Add-Result -Folder $Folder -Title $Title -Status "FAIL" -Message "No local candidate found and stream download failed" -FilePath "" -Verify $null
544:     return
545:   }
---
540:     Set-Prop $State "materialize_error" "No local candidate found and stream download failed"
541:     Set-Prop $State "updated_utc" (Get-Date).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ")
542:     Save-State -Folder $Folder -State $State
543:     Add-Result -Folder $Folder -Title $Title -Status "FAIL" -Message "No local candidate found and stream download failed" -FilePath "" -Verify $null
544:     return
545:   }
546: 
547:   $script:Materialized = $script:Materialized + 1
548:   Retire-StrmFiles -Folder $Folder
---
558:     $script:Verified = $script:Verified + 1
559:     Add-Result -Folder $Folder -Title $Title -Status "PASS" -Message "Materialized local file and Plex verified" -FilePath $Installed -Verify $Verify
560:   } else {
561:     $script:Failed = $script:Failed + 1
562:     Add-Result -Folder $Folder -Title $Title -Status "REVIEW" -Message $Verify.detail -FilePath $Installed -Verify $Verify
563:   }
564: }
565: 
566: Ensure-Dir $LogRoot
---
559:     Add-Result -Folder $Folder -Title $Title -Status "PASS" -Message "Materialized local file and Plex verified" -FilePath $Installed -Verify $Verify
560:   } else {
561:     $script:Failed = $script:Failed + 1
562:     Add-Result -Folder $Folder -Title $Title -Status "REVIEW" -Message $Verify.detail -FilePath $Installed -Verify $Verify
563:   }
564: }
565: 
566: Ensure-Dir $LogRoot
567: Ensure-Dir $PublishRoot
---
593: 
594: $Ended = Get-Date
595: $FinalStatus = "PASS"
596: if ($Failed -gt 0) { $FinalStatus = "REVIEW" }
597: if ($Processed -gt 0 -and $Verified -eq 0 -and $Failed -gt 0) { $FinalStatus = "FAIL" }
598: if ($Processed -eq 0) { $FinalStatus = "PASS" }
599: 
600: $Summary = [ordered]@{
601:   component = $Component
---
594: $Ended = Get-Date
595: $FinalStatus = "PASS"
596: if ($Failed -gt 0) { $FinalStatus = "REVIEW" }
597: if ($Processed -gt 0 -and $Verified -eq 0 -and $Failed -gt 0) { $FinalStatus = "FAIL" }
598: if ($Processed -eq 0) { $FinalStatus = "PASS" }
599: 
600: $Summary = [ordered]@{
601:   component = $Component
602:   status = $FinalStatus
---
608:   already_local = $AlreadyLocal
609:   downloaded = $Downloaded
610:   plex_verified = $Verified
611:   failed = $Failed
612:   skipped = $Skipped
613:   placeholders_installed = $PlaceholderInstalled
614:   last_item = $LastItem
615:   last_error = ConvertTo-AsciiText $LastError
616:   backup_root = $BackupRoot
---
630: Write-Host ("Downloaded: {0}" -f $Downloaded)
631: Write-Host ("Plex verified: {0}" -f $Verified)
632: Write-Host ("Placeholders installed: {0}" -f $PlaceholderInstalled)
633: Write-Host ("Failed/Review: {0}" -f $Failed)
634: Write-Host ("Status JSON: {0}" -f $StatusPath)
635: Write-Host ("Final: {0}" -f $FinalStatus)
636: 
---
``

## D:\PlexTools\Scripts\scarflix_v2\ScarFLIX_v2_OfflineStatusCollector.ps1
``text
45: 
46:     if (!$raw) {
47:         try {
48:             $r = Invoke-WebRequest -UseBasicParsing -Uri $remoteUrl -TimeoutSec 15 -ErrorAction Stop
49:             if ($r.StatusCode -ge 200 -and $r.StatusCode -lt 300) {
50:                 $raw = "" + $r.Content
51:                 $source = $remoteUrl
52:             }
53:         } catch {}
---
160: $active = READJSON "webdav_active_gate_status.json" "webdav_active_gate_status.json"
161: 
162: $controllerTask = TASKTEXT "ScarFLIX_v2_AutonomousController"
163: $platformTask = TASKTEXT "ScarFLIX_v2_PlatformGate_LocalRunner_Detached"
164: $expansionTask = TASKTEXT "ScarFLIX_v2_SafeWebDavExpansionPipeline"
165: 
166: $controllerRunning = TASKRUNNING $controllerTask
167: $platformRunning = TASKRUNNING $platformTask
168: $expansionRunning = TASKRUNNING $expansionTask
---
172: $visible = TXT (FIND $controller.json @("visible_count","visiblecount","visible_items","visibleitems") 0)
173: $movies = TXT (FIND $controller.json @("movies","movie_count","moviecount") 0)
174: $tv = TXT (FIND $controller.json @("tv","tv_count","episode_count","episodes") 0)
175: $transient = INT (FIND $controller.json @("transient_failures","transient_count","transientheldcount","transient_held_count") 0)
176: $prunable = INT (FIND $controller.json @("prunable_failures","permanent_failures","prunable_count","permanent_count") 0)
177: $jasonAction = BOOL (FIND $controller.json @("jason_action_required","action_required","user_action_required") 0)
178: 
179: $pgStatus = TXT (FIND $platform.json @("status","overall_status","result","health") 0)
180: $pgVisible = TXT (FIND $platform.json @("visible_count","visiblecount","visible_items","visibleitems") 0)
---
173: $movies = TXT (FIND $controller.json @("movies","movie_count","moviecount") 0)
174: $tv = TXT (FIND $controller.json @("tv","tv_count","episode_count","episodes") 0)
175: $transient = INT (FIND $controller.json @("transient_failures","transient_count","transientheldcount","transient_held_count") 0)
176: $prunable = INT (FIND $controller.json @("prunable_failures","permanent_failures","prunable_count","permanent_count") 0)
177: $jasonAction = BOOL (FIND $controller.json @("jason_action_required","action_required","user_action_required") 0)
178: 
179: $pgStatus = TXT (FIND $platform.json @("status","overall_status","result","health") 0)
180: $pgVisible = TXT (FIND $platform.json @("visible_count","visiblecount","visible_items","visibleitems") 0)
181: $pgSnapshot = TXT (FIND $platform.json @("snapshot","snapshot_id","snapshotid","visible_snapshot_id") 0)
---
180: $pgVisible = TXT (FIND $platform.json @("visible_count","visiblecount","visible_items","visibleitems") 0)
181: $pgSnapshot = TXT (FIND $platform.json @("snapshot","snapshot_id","snapshotid","visible_snapshot_id") 0)
182: $pgSameSnapshot = TXT (FIND $platform.json @("same_snapshot","same_snapshot_confirmed","sameSnapshot") 0)
183: $pgTransient = INT (FIND $platform.json @("transient_failures","transient_count","transientheldcount","transient_held_count") 0)
184: $pgPrunable = INT (FIND $platform.json @("prunable_failures","permanent_failures","prunable_count","permanent_count") 0)
185: 
186: $candidateStatus = TXT (FIND $candidate.json @("status","overall_status","result","health") 0)
187: $healthStatus = TXT (FIND $health.json @("status","overall_status","result","health") 0)
188: $activeStatus = TXT (FIND $active.json @("status","overall_status","result","health") 0)
---
181: $pgSnapshot = TXT (FIND $platform.json @("snapshot","snapshot_id","snapshotid","visible_snapshot_id") 0)
182: $pgSameSnapshot = TXT (FIND $platform.json @("same_snapshot","same_snapshot_confirmed","sameSnapshot") 0)
183: $pgTransient = INT (FIND $platform.json @("transient_failures","transient_count","transientheldcount","transient_held_count") 0)
184: $pgPrunable = INT (FIND $platform.json @("prunable_failures","permanent_failures","prunable_count","permanent_count") 0)
185: 
186: $candidateStatus = TXT (FIND $candidate.json @("status","overall_status","result","health") 0)
187: $healthStatus = TXT (FIND $health.json @("status","overall_status","result","health") 0)
188: $activeStatus = TXT (FIND $active.json @("status","overall_status","result","health") 0)
189: 
---
203:     $signal = "ATTN"
204:     $reason = "Status says Jason action is required."
205:     $nextAction = "Bring this dashboard summary to ChatGPT/Codex."
206: } elseif ($controllerStatus -match "(?i)BLOCKED_TRIAGE|BLOCKED_LOOP|FAIL|ERROR") {
207:     $signal = "ATTN"
208:     $reason = ("Controller status needs triage: {0}" -f $controllerStatus)
209:     $nextAction = "Bring this dashboard summary to ChatGPT/Codex."
210: } elseif ($prunable -gt 0 -or $pgPrunable -gt 0) {
211:     $signal = "ATTN"
---
209:     $nextAction = "Bring this dashboard summary to ChatGPT/Codex."
210: } elseif ($prunable -gt 0 -or $pgPrunable -gt 0) {
211:     $signal = "ATTN"
212:     $reason = ("Permanent/prunable failures detected. Controller={0}; PlatformGate={1}" -f $prunable, $pgPrunable)
213:     $nextAction = "Do not retry blindly. Bring this status to ChatGPT/Codex for triage."
214: } elseif ($pgStatus -match "(?i)FAIL|ERROR") {
215:     $signal = "ATTN"
216:     $reason = ("PlatformGate failed: {0}" -f $pgStatus)
217:     $nextAction = "Bring this status to ChatGPT/Codex."
---
211:     $signal = "ATTN"
212:     $reason = ("Permanent/prunable failures detected. Controller={0}; PlatformGate={1}" -f $prunable, $pgPrunable)
213:     $nextAction = "Do not retry blindly. Bring this status to ChatGPT/Codex for triage."
214: } elseif ($pgStatus -match "(?i)FAIL|ERROR") {
215:     $signal = "ATTN"
216:     $reason = ("PlatformGate failed: {0}" -f $pgStatus)
217:     $nextAction = "Bring this status to ChatGPT/Codex."
218: } elseif ($candidateStatus -match "(?i)PASS|COMPLETE|DONE") {
219:     $signal = "DONE"
---
213:     $nextAction = "Do not retry blindly. Bring this status to ChatGPT/Codex for triage."
214: } elseif ($pgStatus -match "(?i)FAIL|ERROR") {
215:     $signal = "ATTN"
216:     $reason = ("PlatformGate failed: {0}" -f $pgStatus)
217:     $nextAction = "Bring this status to ChatGPT/Codex."
218: } elseif ($candidateStatus -match "(?i)PASS|COMPLETE|DONE") {
219:     $signal = "DONE"
220:     $reason = "Candidate-source model appears complete."
221:     $nextAction = "Bring this status to ChatGPT/Codex for next milestone."
---
221:     $nextAction = "Bring this status to ChatGPT/Codex for next milestone."
222: } elseif (($pgStatus -match "(?i)PASS|COMPLETE|DONE") -and (!$platformRunning)) {
223:     $signal = "PG_DONE"
224:     $reason = "PlatformGate appears PASS/complete and detached runner is not running."
225:     $nextAction = "Bring this status to ChatGPT/Codex for candidate-source stage."
226: } elseif (($controllerStatus -match "(?i)PASS|COMPLETE|DONE") -and (!$controllerRunning)) {
227:     $signal = "DONE"
228:     $reason = "Controller appears complete and is not running."
229:     $nextAction = "Bring this status to ChatGPT/Codex."
---
233:     $nextAction = "Bring this status to ChatGPT/Codex or run the local controller status script."
234: } elseif ($platformRunning -or $controllerRunning) {
235:     $signal = "RUNNING"
236:     $reason = "Local autonomous task or PlatformGate task is running."
237:     $nextAction = "Wait. Do not use Codex yet."
238: } elseif ($transient -gt 0 -or $pgTransient -gt 0) {
239:     $signal = "RETRY_WAIT"
240:     $reason = "Only transient/retry-held failures detected."
241:     $nextAction = "Wait for controller retry. Do not use Codex yet."
---
237:     $nextAction = "Wait. Do not use Codex yet."
238: } elseif ($transient -gt 0 -or $pgTransient -gt 0) {
239:     $signal = "RETRY_WAIT"
240:     $reason = "Only transient/retry-held failures detected."
241:     $nextAction = "Wait for controller retry. Do not use Codex yet."
242: }
243: 
244: $generated = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
245: 
---
253:     visible_count = $visible
254:     movies = $movies
255:     tv = $tv
256:     transient_failures = $transient
257:     prunable_failures = $prunable
258:     jason_action_required = $jasonAction
259:     platform_gate_status = $pgStatus
260:     platform_gate_visible_count = $pgVisible
261:     platform_gate_same_snapshot = $pgSameSnapshot
---
254:     movies = $movies
255:     tv = $tv
256:     transient_failures = $transient
257:     prunable_failures = $prunable
258:     jason_action_required = $jasonAction
259:     platform_gate_status = $pgStatus
260:     platform_gate_visible_count = $pgVisible
261:     platform_gate_same_snapshot = $pgSameSnapshot
262:     platform_gate_snapshot = $pgSnapshot
---
305: $md += ""
306: $md += "## Gate status"
307: $md += ""
308: $md += ("- PlatformGate: {0}" -f $pgStatus)
309: $md += ("- PlatformGate visible count: {0}" -f $pgVisible)
310: $md += ("- Same snapshot: {0}" -f $pgSameSnapshot)
311: $md += ("- Health: {0}" -f $healthStatus)
312: $md += ("- WebDAV active gate: {0}" -f $activeStatus)
313: $md += ("- Candidate-source model: {0}" -f $candidateStatus)
---
306: $md += "## Gate status"
307: $md += ""
308: $md += ("- PlatformGate: {0}" -f $pgStatus)
309: $md += ("- PlatformGate visible count: {0}" -f $pgVisible)
310: $md += ("- Same snapshot: {0}" -f $pgSameSnapshot)
311: $md += ("- Health: {0}" -f $healthStatus)
312: $md += ("- WebDAV active gate: {0}" -f $activeStatus)
313: $md += ("- Candidate-source model: {0}" -f $candidateStatus)
314: $md += ""
---
309: $md += ("- PlatformGate visible count: {0}" -f $pgVisible)
310: $md += ("- Same snapshot: {0}" -f $pgSameSnapshot)
311: $md += ("- Health: {0}" -f $healthStatus)
312: $md += ("- WebDAV active gate: {0}" -f $activeStatus)
313: $md += ("- Candidate-source model: {0}" -f $candidateStatus)
314: $md += ""
315: $md += "## Failure counts"
316: $md += ""
317: $md += ("- Controller transient/retry-held: {0}" -f $transient)
---
``

## D:\PlexTools\Scripts\scarflix_v2\ScarFLIX_v2_PlatformGate.ps1
``text
21: $PlexSqlite = "C:\Program Files\Plex\Plex Media Server\Plex SQLite.exe"
22: $PlexDb = "C:\Users\jason\AppData\Local\Plex Media Server\Plug-in Support\Databases\com.plexapp.plugins.library.db"
23: 
24: $ActiveGateScript = Join-Path $ScriptRoot "ScarFLIX_v2_WebDavActiveGate.ps1"
25: $VisibleQaScript = Join-Path $ScriptRoot "ScarFLIX_v2_VisibleCatalogQA.ps1"
26: $DecisionQaScript = Join-Path $ScriptRoot "ScarFLIX_v2_PlexClientDecisionQA.ps1"
27: $ConcurrentQaScript = Join-Path $ScriptRoot "ScarFLIX_v2_ConcurrentStreamQA.ps1"
28: $HealthScript = Join-Path $ScriptRoot "ScarFLIX_v2_HealthStatus.ps1"
29: 
---
22: $PlexDb = "C:\Users\jason\AppData\Local\Plex Media Server\Plug-in Support\Databases\com.plexapp.plugins.library.db"
23: 
24: $ActiveGateScript = Join-Path $ScriptRoot "ScarFLIX_v2_WebDavActiveGate.ps1"
25: $VisibleQaScript = Join-Path $ScriptRoot "ScarFLIX_v2_VisibleCatalogQA.ps1"
26: $DecisionQaScript = Join-Path $ScriptRoot "ScarFLIX_v2_PlexClientDecisionQA.ps1"
27: $ConcurrentQaScript = Join-Path $ScriptRoot "ScarFLIX_v2_ConcurrentStreamQA.ps1"
28: $HealthScript = Join-Path $ScriptRoot "ScarFLIX_v2_HealthStatus.ps1"
29: 
30: $QaStatusFiles = @(
---
24: $ActiveGateScript = Join-Path $ScriptRoot "ScarFLIX_v2_WebDavActiveGate.ps1"
25: $VisibleQaScript = Join-Path $ScriptRoot "ScarFLIX_v2_VisibleCatalogQA.ps1"
26: $DecisionQaScript = Join-Path $ScriptRoot "ScarFLIX_v2_PlexClientDecisionQA.ps1"
27: $ConcurrentQaScript = Join-Path $ScriptRoot "ScarFLIX_v2_ConcurrentStreamQA.ps1"
28: $HealthScript = Join-Path $ScriptRoot "ScarFLIX_v2_HealthStatus.ps1"
29: 
30: $QaStatusFiles = @(
31:   (Join-Path $PublishRoot "webdav_active_gate_status.json"),
32:   (Join-Path $PublishRoot "visible_catalog_qa_status.json"),
---
31:   (Join-Path $PublishRoot "webdav_active_gate_status.json"),
32:   (Join-Path $PublishRoot "visible_catalog_qa_status.json"),
33:   (Join-Path $PublishRoot "plex_client_decision_qa_status.json"),
34:   (Join-Path $PublishRoot "concurrent_stream_qa_status.json"),
35:   (Join-Path $PublishRoot "scarflix_v2_health.json")
36: )
37: 
38: $ExpansionTasks = @(
39:   "ScarFLIX_v2_SafeWebDavExpansionPipeline",
---
239:     $result.reason = ConvertTo-AsciiText $_.Exception.Message
240:   }
241:   $result.ended_utc = (Get-Date).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ")
242:   if ($result.ok) { Write-Step "OK" ("{0} completed" -f $Name) } else { Write-Step "REVIEW" ("{0} did not pass; exit={1}" -f $Name,$result.exit_code) }
243:   return $result
244: }
245: 
246: function Test-FreshStatus {
247:   param([object]$Status, [string]$StartText)
---
264:   $r = ("" + $Reason).ToLowerInvariant()
265:   if ($r -match "porn|adult|cam|h?dcam|telesync|telecine|\\bts\\b|\\btc\\b") { return "POLICY_BLOCKED" }
266:   if ($r -match "503|server unavailable|bad gateway|gateway") { return "PROVIDER_503" }
267:   if ($r -match "timeout|timed out") { return "PROVIDER_TIMEOUT" }
268:   if ($r -match "did not become plex-visible|plex-visible") { return "PLEX_INVISIBLE_AFTER_SCAN" }
269:   if ($r -match "width|height|duration|profile") { return "PLEX_PROFILE_FAILED" }
270:   if ($r -match "codec|hevc|h265|truehd|avi|h264") { return "PLEX_CODEC_BLOCKED" }
271:   if ($r -match "hls|dash|mpegurl") { return "HLS_DASH_REJECTED" }
272:   if ($r -match "unbacked|does not resolve|head|range") { return "WEBDAV_AVAILABILITY_FAILED" }
---
266:   if ($r -match "503|server unavailable|bad gateway|gateway") { return "PROVIDER_503" }
267:   if ($r -match "timeout|timed out") { return "PROVIDER_TIMEOUT" }
268:   if ($r -match "did not become plex-visible|plex-visible") { return "PLEX_INVISIBLE_AFTER_SCAN" }
269:   if ($r -match "width|height|duration|profile") { return "PLEX_PROFILE_FAILED" }
270:   if ($r -match "codec|hevc|h265|truehd|avi|h264") { return "PLEX_CODEC_BLOCKED" }
271:   if ($r -match "hls|dash|mpegurl") { return "HLS_DASH_REJECTED" }
272:   if ($r -match "unbacked|does not resolve|head|range") { return "WEBDAV_AVAILABILITY_FAILED" }
273:   if ($r -match "decision") { return "PLEX_DECISION_FAILED" }
274:   return "OTHER"
---
268:   if ($r -match "did not become plex-visible|plex-visible") { return "PLEX_INVISIBLE_AFTER_SCAN" }
269:   if ($r -match "width|height|duration|profile") { return "PLEX_PROFILE_FAILED" }
270:   if ($r -match "codec|hevc|h265|truehd|avi|h264") { return "PLEX_CODEC_BLOCKED" }
271:   if ($r -match "hls|dash|mpegurl") { return "HLS_DASH_REJECTED" }
272:   if ($r -match "unbacked|does not resolve|head|range") { return "WEBDAV_AVAILABILITY_FAILED" }
273:   if ($r -match "decision") { return "PLEX_DECISION_FAILED" }
274:   return "OTHER"
275: }
276: 
---
269:   if ($r -match "width|height|duration|profile") { return "PLEX_PROFILE_FAILED" }
270:   if ($r -match "codec|hevc|h265|truehd|avi|h264") { return "PLEX_CODEC_BLOCKED" }
271:   if ($r -match "hls|dash|mpegurl") { return "HLS_DASH_REJECTED" }
272:   if ($r -match "unbacked|does not resolve|head|range") { return "WEBDAV_AVAILABILITY_FAILED" }
273:   if ($r -match "decision") { return "PLEX_DECISION_FAILED" }
274:   return "OTHER"
275: }
276: 
277: function Get-QuarantineSummary {
---
270:   if ($r -match "codec|hevc|h265|truehd|avi|h264") { return "PLEX_CODEC_BLOCKED" }
271:   if ($r -match "hls|dash|mpegurl") { return "HLS_DASH_REJECTED" }
272:   if ($r -match "unbacked|does not resolve|head|range") { return "WEBDAV_AVAILABILITY_FAILED" }
273:   if ($r -match "decision") { return "PLEX_DECISION_FAILED" }
274:   return "OTHER"
275: }
276: 
277: function Get-QuarantineSummary {
278:   $root = Join-Path $StateRoot "staged_raw_strm\rejected"
---
346: 
347: $summary = [ordered]@{
348:   component = $Component
349:   status = "REVIEW"
350:   started_utc = $Started.ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ")
351:   ended_utc = ""
352:   duration_seconds = 0
353:   visible = [ordered]@{ count=0; movies=0; tv=0 }
354:   snapshot = [ordered]@{ id=""; hash=""; paths_file=""; json_file="" }
---
365:   $summary.ended_utc = (Get-Date).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ")
366:   Write-JsonFile -Path $StatusPath -Object $summary
367:   Build-Report -Summary $summary
368:   Write-Step "REVIEW" "Platform gate lock is active."
369:   return
370: }
371: 
372: try {
373:   Write-Step "INFO" "Platform gate starting; expansion schedules will remain disabled."
---
386:   $summary.snapshot.json_file = $snapshotFiles.json
387: 
388:   $steps = @(
389:     [ordered]@{ key="active_gate"; script=$ActiveGateScript; args=@("-VisibleOnly","-PathListFile",$summary.snapshot.paths_file,"-Retries",("" + $Retries)); status_file=(Join-Path $PublishRoot "webdav_active_gate_status.json") },
390:     [ordered]@{ key="visible_catalog_qa"; script=$VisibleQaScript; args=@("-MaxItems","0"); status_file=(Join-Path $PublishRoot "visible_catalog_qa_status.json") },
391:     [ordered]@{ key="plex_client_decision_qa"; script=$DecisionQaScript; args=@("-MaxItems","0","-IgnoreBusyLocks"); status_file=(Join-Path $PublishRoot "plex_client_decision_qa_status.json") },
392:     [ordered]@{ key="concurrent_stream_qa"; script=$ConcurrentQaScript; args=@("-Concurrency",("" + $Concurrency),"-DecisionLimit",("0")); status_file=(Join-Path $PublishRoot "concurrent_stream_qa_status.json") },
393:     [ordered]@{ key="health"; script=$HealthScript; args=@(); status_file=(Join-Path $PublishRoot "scarflix_v2_health.json") }
394:   )
---
389:     [ordered]@{ key="active_gate"; script=$ActiveGateScript; args=@("-VisibleOnly","-PathListFile",$summary.snapshot.paths_file,"-Retries",("" + $Retries)); status_file=(Join-Path $PublishRoot "webdav_active_gate_status.json") },
390:     [ordered]@{ key="visible_catalog_qa"; script=$VisibleQaScript; args=@("-MaxItems","0"); status_file=(Join-Path $PublishRoot "visible_catalog_qa_status.json") },
391:     [ordered]@{ key="plex_client_decision_qa"; script=$DecisionQaScript; args=@("-MaxItems","0","-IgnoreBusyLocks"); status_file=(Join-Path $PublishRoot "plex_client_decision_qa_status.json") },
392:     [ordered]@{ key="concurrent_stream_qa"; script=$ConcurrentQaScript; args=@("-Concurrency",("" + $Concurrency),"-DecisionLimit",("0")); status_file=(Join-Path $PublishRoot "concurrent_stream_qa_status.json") },
393:     [ordered]@{ key="health"; script=$HealthScript; args=@(); status_file=(Join-Path $PublishRoot "scarflix_v2_health.json") }
394:   )
395: 
396:   $blockers = New-Object System.Collections.ArrayList
397:   foreach ($step in $steps) {
---
409:       checked = $checked
410:       status_file = $step.status_file
411:     }
412:     if ($step.key -eq "concurrent_stream_qa" -and $null -ne $statusObj) {
413:       $entry.target_concurrency = $statusObj.target_concurrency
414:       $entry.map_entries_tested = $statusObj.map_entries_tested
415:       $entry.visible_rows_tested = $statusObj.visible_rows_tested
416:     }
417:     $summary.qa[$step.key] = $entry
---
420:     if (($step.key -eq "active_gate" -or $step.key -eq "visible_catalog_qa" -or $step.key -eq "plex_client_decision_qa") -and ([int]$checked -ne [int]$summary.visible.count)) {
421:       [void]$blockers.Add(("{0} checked {1}, expected snapshot {2}" -f $step.key,$checked,$summary.visible.count))
422:     }
423:     if ($step.key -eq "concurrent_stream_qa") {
424:       if ([int]$entry.target_concurrency -lt 5 -or [int]$entry.map_entries_tested -lt 5 -or [int]$entry.visible_rows_tested -lt 5) {
425:         [void]$blockers.Add("concurrent_stream_qa did not test at least 5 concurrent streams")
426:       }
427:     }
428:   }
---
422:     }
423:     if ($step.key -eq "concurrent_stream_qa") {
424:       if ([int]$entry.target_concurrency -lt 5 -or [int]$entry.map_entries_tested -lt 5 -or [int]$entry.visible_rows_tested -lt 5) {
425:         [void]$blockers.Add("concurrent_stream_qa did not test at least 5 concurrent streams")
426:       }
427:     }
428:   }
429: 
430:   $afterRows = @(Get-VisibleSnapshot)
---
452:       }
453:     }
454:   } else {
455:     $summary.status = "REVIEW"
456:   }
457: } catch {
458:   $summary.status = "FAIL"
459:   $summary.blockers = @((ConvertTo-AsciiText $_.Exception.Message))
460:   Write-Step "FAIL" (ConvertTo-AsciiText $_.Exception.Message)
---
``

## D:\PlexTools\Scripts\scarflix_v2\ScarFLIX_v2_PlatformGate.ps1.bak_safe_schedule_20260603_120509
``text
20: $PlexSqlite = "C:\Program Files\Plex\Plex Media Server\Plex SQLite.exe"
21: $PlexDb = "C:\Users\jason\AppData\Local\Plex Media Server\Plug-in Support\Databases\com.plexapp.plugins.library.db"
22: 
23: $ActiveGateScript = Join-Path $ScriptRoot "ScarFLIX_v2_WebDavActiveGate.ps1"
24: $VisibleQaScript = Join-Path $ScriptRoot "ScarFLIX_v2_VisibleCatalogQA.ps1"
25: $DecisionQaScript = Join-Path $ScriptRoot "ScarFLIX_v2_PlexClientDecisionQA.ps1"
26: $ConcurrentQaScript = Join-Path $ScriptRoot "ScarFLIX_v2_ConcurrentStreamQA.ps1"
27: $HealthScript = Join-Path $ScriptRoot "ScarFLIX_v2_HealthStatus.ps1"
28: 
---
21: $PlexDb = "C:\Users\jason\AppData\Local\Plex Media Server\Plug-in Support\Databases\com.plexapp.plugins.library.db"
22: 
23: $ActiveGateScript = Join-Path $ScriptRoot "ScarFLIX_v2_WebDavActiveGate.ps1"
24: $VisibleQaScript = Join-Path $ScriptRoot "ScarFLIX_v2_VisibleCatalogQA.ps1"
25: $DecisionQaScript = Join-Path $ScriptRoot "ScarFLIX_v2_PlexClientDecisionQA.ps1"
26: $ConcurrentQaScript = Join-Path $ScriptRoot "ScarFLIX_v2_ConcurrentStreamQA.ps1"
27: $HealthScript = Join-Path $ScriptRoot "ScarFLIX_v2_HealthStatus.ps1"
28: 
29: $QaStatusFiles = @(
---
23: $ActiveGateScript = Join-Path $ScriptRoot "ScarFLIX_v2_WebDavActiveGate.ps1"
24: $VisibleQaScript = Join-Path $ScriptRoot "ScarFLIX_v2_VisibleCatalogQA.ps1"
25: $DecisionQaScript = Join-Path $ScriptRoot "ScarFLIX_v2_PlexClientDecisionQA.ps1"
26: $ConcurrentQaScript = Join-Path $ScriptRoot "ScarFLIX_v2_ConcurrentStreamQA.ps1"
27: $HealthScript = Join-Path $ScriptRoot "ScarFLIX_v2_HealthStatus.ps1"
28: 
29: $QaStatusFiles = @(
30:   (Join-Path $PublishRoot "webdav_active_gate_status.json"),
31:   (Join-Path $PublishRoot "visible_catalog_qa_status.json"),
---
30:   (Join-Path $PublishRoot "webdav_active_gate_status.json"),
31:   (Join-Path $PublishRoot "visible_catalog_qa_status.json"),
32:   (Join-Path $PublishRoot "plex_client_decision_qa_status.json"),
33:   (Join-Path $PublishRoot "concurrent_stream_qa_status.json"),
34:   (Join-Path $PublishRoot "scarflix_v2_health.json")
35: )
36: 
37: $ExpansionTasks = @(
38:   "ScarFLIX_v2_SafeWebDavExpansionPipeline",
---
219:     $result.reason = ConvertTo-AsciiText $_.Exception.Message
220:   }
221:   $result.ended_utc = (Get-Date).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ")
222:   if ($result.ok) { Write-Step "OK" ("{0} completed" -f $Name) } else { Write-Step "REVIEW" ("{0} did not pass; exit={1}" -f $Name,$result.exit_code) }
223:   return $result
224: }
225: 
226: function Test-FreshStatus {
227:   param([object]$Status, [string]$StartText)
---
244:   $r = ("" + $Reason).ToLowerInvariant()
245:   if ($r -match "porn|adult|cam|h?dcam|telesync|telecine|\\bts\\b|\\btc\\b") { return "POLICY_BLOCKED" }
246:   if ($r -match "503|server unavailable|bad gateway|gateway") { return "PROVIDER_503" }
247:   if ($r -match "timeout|timed out") { return "PROVIDER_TIMEOUT" }
248:   if ($r -match "did not become plex-visible|plex-visible") { return "PLEX_INVISIBLE_AFTER_SCAN" }
249:   if ($r -match "width|height|duration|profile") { return "PLEX_PROFILE_FAILED" }
250:   if ($r -match "codec|hevc|h265|truehd|avi|h264") { return "PLEX_CODEC_BLOCKED" }
251:   if ($r -match "hls|dash|mpegurl") { return "HLS_DASH_REJECTED" }
252:   if ($r -match "unbacked|does not resolve|head|range") { return "WEBDAV_AVAILABILITY_FAILED" }
---
246:   if ($r -match "503|server unavailable|bad gateway|gateway") { return "PROVIDER_503" }
247:   if ($r -match "timeout|timed out") { return "PROVIDER_TIMEOUT" }
248:   if ($r -match "did not become plex-visible|plex-visible") { return "PLEX_INVISIBLE_AFTER_SCAN" }
249:   if ($r -match "width|height|duration|profile") { return "PLEX_PROFILE_FAILED" }
250:   if ($r -match "codec|hevc|h265|truehd|avi|h264") { return "PLEX_CODEC_BLOCKED" }
251:   if ($r -match "hls|dash|mpegurl") { return "HLS_DASH_REJECTED" }
252:   if ($r -match "unbacked|does not resolve|head|range") { return "WEBDAV_AVAILABILITY_FAILED" }
253:   if ($r -match "decision") { return "PLEX_DECISION_FAILED" }
254:   return "OTHER"
---
248:   if ($r -match "did not become plex-visible|plex-visible") { return "PLEX_INVISIBLE_AFTER_SCAN" }
249:   if ($r -match "width|height|duration|profile") { return "PLEX_PROFILE_FAILED" }
250:   if ($r -match "codec|hevc|h265|truehd|avi|h264") { return "PLEX_CODEC_BLOCKED" }
251:   if ($r -match "hls|dash|mpegurl") { return "HLS_DASH_REJECTED" }
252:   if ($r -match "unbacked|does not resolve|head|range") { return "WEBDAV_AVAILABILITY_FAILED" }
253:   if ($r -match "decision") { return "PLEX_DECISION_FAILED" }
254:   return "OTHER"
255: }
256: 
---
249:   if ($r -match "width|height|duration|profile") { return "PLEX_PROFILE_FAILED" }
250:   if ($r -match "codec|hevc|h265|truehd|avi|h264") { return "PLEX_CODEC_BLOCKED" }
251:   if ($r -match "hls|dash|mpegurl") { return "HLS_DASH_REJECTED" }
252:   if ($r -match "unbacked|does not resolve|head|range") { return "WEBDAV_AVAILABILITY_FAILED" }
253:   if ($r -match "decision") { return "PLEX_DECISION_FAILED" }
254:   return "OTHER"
255: }
256: 
257: function Get-QuarantineSummary {
---
250:   if ($r -match "codec|hevc|h265|truehd|avi|h264") { return "PLEX_CODEC_BLOCKED" }
251:   if ($r -match "hls|dash|mpegurl") { return "HLS_DASH_REJECTED" }
252:   if ($r -match "unbacked|does not resolve|head|range") { return "WEBDAV_AVAILABILITY_FAILED" }
253:   if ($r -match "decision") { return "PLEX_DECISION_FAILED" }
254:   return "OTHER"
255: }
256: 
257: function Get-QuarantineSummary {
258:   $root = Join-Path $StateRoot "staged_raw_strm\rejected"
---
326: 
327: $summary = [ordered]@{
328:   component = $Component
329:   status = "REVIEW"
330:   started_utc = $Started.ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ")
331:   ended_utc = ""
332:   duration_seconds = 0
333:   visible = [ordered]@{ count=0; movies=0; tv=0 }
334:   snapshot = [ordered]@{ id=""; hash=""; paths_file=""; json_file="" }
---
345:   $summary.ended_utc = (Get-Date).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ")
346:   Write-JsonFile -Path $StatusPath -Object $summary
347:   Build-Report -Summary $summary
348:   Write-Step "REVIEW" "Platform gate lock is active."
349:   return
350: }
351: 
352: try {
353:   Write-Step "INFO" "Platform gate starting; expansion schedules will remain disabled."
---
366:   $summary.snapshot.json_file = $snapshotFiles.json
367: 
368:   $steps = @(
369:     [ordered]@{ key="active_gate"; script=$ActiveGateScript; args=@("-VisibleOnly","-PathListFile",$summary.snapshot.paths_file,"-Retries",("" + $Retries)); status_file=(Join-Path $PublishRoot "webdav_active_gate_status.json") },
370:     [ordered]@{ key="visible_catalog_qa"; script=$VisibleQaScript; args=@("-MaxItems","0"); status_file=(Join-Path $PublishRoot "visible_catalog_qa_status.json") },
371:     [ordered]@{ key="plex_client_decision_qa"; script=$DecisionQaScript; args=@("-MaxItems","0","-IgnoreBusyLocks"); status_file=(Join-Path $PublishRoot "plex_client_decision_qa_status.json") },
372:     [ordered]@{ key="concurrent_stream_qa"; script=$ConcurrentQaScript; args=@("-Concurrency",("" + $Concurrency),"-DecisionLimit",("0")); status_file=(Join-Path $PublishRoot "concurrent_stream_qa_status.json") },
373:     [ordered]@{ key="health"; script=$HealthScript; args=@(); status_file=(Join-Path $PublishRoot "scarflix_v2_health.json") }
374:   )
---
369:     [ordered]@{ key="active_gate"; script=$ActiveGateScript; args=@("-VisibleOnly","-PathListFile",$summary.snapshot.paths_file,"-Retries",("" + $Retries)); status_file=(Join-Path $PublishRoot "webdav_active_gate_status.json") },
370:     [ordered]@{ key="visible_catalog_qa"; script=$VisibleQaScript; args=@("-MaxItems","0"); status_file=(Join-Path $PublishRoot "visible_catalog_qa_status.json") },
371:     [ordered]@{ key="plex_client_decision_qa"; script=$DecisionQaScript; args=@("-MaxItems","0","-IgnoreBusyLocks"); status_file=(Join-Path $PublishRoot "plex_client_decision_qa_status.json") },
372:     [ordered]@{ key="concurrent_stream_qa"; script=$ConcurrentQaScript; args=@("-Concurrency",("" + $Concurrency),"-DecisionLimit",("0")); status_file=(Join-Path $PublishRoot "concurrent_stream_qa_status.json") },
373:     [ordered]@{ key="health"; script=$HealthScript; args=@(); status_file=(Join-Path $PublishRoot "scarflix_v2_health.json") }
374:   )
375: 
376:   $blockers = New-Object System.Collections.ArrayList
377:   foreach ($step in $steps) {
---
389:       checked = $checked
390:       status_file = $step.status_file
391:     }
392:     if ($step.key -eq "concurrent_stream_qa" -and $null -ne $statusObj) {
393:       $entry.target_concurrency = $statusObj.target_concurrency
394:       $entry.map_entries_tested = $statusObj.map_entries_tested
395:       $entry.visible_rows_tested = $statusObj.visible_rows_tested
396:     }
397:     $summary.qa[$step.key] = $entry
---
400:     if (($step.key -eq "active_gate" -or $step.key -eq "visible_catalog_qa" -or $step.key -eq "plex_client_decision_qa") -and ([int]$checked -ne [int]$summary.visible.count)) {
401:       [void]$blockers.Add(("{0} checked {1}, expected snapshot {2}" -f $step.key,$checked,$summary.visible.count))
402:     }
403:     if ($step.key -eq "concurrent_stream_qa") {
404:       if ([int]$entry.target_concurrency -lt 5 -or [int]$entry.map_entries_tested -lt 5 -or [int]$entry.visible_rows_tested -lt 5) {
405:         [void]$blockers.Add("concurrent_stream_qa did not test at least 5 concurrent streams")
406:       }
407:     }
408:   }
---
402:     }
403:     if ($step.key -eq "concurrent_stream_qa") {
404:       if ([int]$entry.target_concurrency -lt 5 -or [int]$entry.map_entries_tested -lt 5 -or [int]$entry.visible_rows_tested -lt 5) {
405:         [void]$blockers.Add("concurrent_stream_qa did not test at least 5 concurrent streams")
406:       }
407:     }
408:   }
409: 
410:   $afterRows = @(Get-VisibleSnapshot)
---
425:   if ($summary.blockers.Count -eq 0) {
426:     $summary.status = "PASS"
427:   } else {
428:     $summary.status = "REVIEW"
429:   }
430: } catch {
431:   $summary.status = "FAIL"
432:   $summary.blockers = @((ConvertTo-AsciiText $_.Exception.Message))
433:   Write-Step "FAIL" (ConvertTo-AsciiText $_.Exception.Message)
---
``

## D:\PlexTools\Scripts\scarflix_v2\ScarFLIX_v2_PlatformGate_CheckStatus.ps1
``text
57:   $visibleCount = Get-VisibleCount -Runner $null -Platform $platform
58: }
59: 
60: Write-Host "=== ScarFLIX v2 PlatformGate Status ==="
61: Write-Host ("Runner running:       {0}" -f $running)
62: Write-Host ("Start time UTC:       {0}" -f $started)
63: Write-Host ("Last progress UTC:    {0}" -f $lastProgress)
64: Write-Host ("Current stage:        {0}" -f $stage)
65: Write-Host ("Visible count:        {0}" -f $visibleCount)
---
68: Write-Host ("Checkpoint JSON:      {0}" -f $CheckpointJsonPath)
69: 
70: if ($status -eq "PASS") { exit 0 }
71: if ($status -eq "FAIL") { exit 1 }
72: exit 2
---
``

## D:\PlexTools\Scripts\scarflix_v2\ScarFLIX_v2_PlatformGate_LocalRunner.cmd
``text
1: @echo off
2: setlocal
3: title ScarFLIX v2 PlatformGate Local Runner
4: if /I "%~1"=="--task" goto taskrun
5: echo.
6: echo ScarFLIX v2 PlatformGate Local Runner
7: echo This runs the same-snapshot PlatformGate locally on this PC.
8: echo No catalogue expansion is started by this runner.
---
3: title ScarFLIX v2 PlatformGate Local Runner
4: if /I "%~1"=="--task" goto taskrun
5: echo.
6: echo ScarFLIX v2 PlatformGate Local Runner
7: echo This runs the same-snapshot PlatformGate locally on this PC.
8: echo No catalogue expansion is started by this runner.
9: echo.
10: powershell.exe -NoProfile -ExecutionPolicy Bypass -NoExit -File "%~dp0ScarFLIX_v2_PlatformGate_LocalRunner.ps1"
11: endlocal
---
4: if /I "%~1"=="--task" goto taskrun
5: echo.
6: echo ScarFLIX v2 PlatformGate Local Runner
7: echo This runs the same-snapshot PlatformGate locally on this PC.
8: echo No catalogue expansion is started by this runner.
9: echo.
10: powershell.exe -NoProfile -ExecutionPolicy Bypass -NoExit -File "%~dp0ScarFLIX_v2_PlatformGate_LocalRunner.ps1"
11: endlocal
12: exit /b %ERRORLEVEL%
---
7: echo This runs the same-snapshot PlatformGate locally on this PC.
8: echo No catalogue expansion is started by this runner.
9: echo.
10: powershell.exe -NoProfile -ExecutionPolicy Bypass -NoExit -File "%~dp0ScarFLIX_v2_PlatformGate_LocalRunner.ps1"
11: endlocal
12: exit /b %ERRORLEVEL%
13: 
14: :taskrun
15: powershell.exe -NoProfile -ExecutionPolicy Bypass -WindowStyle Hidden -File "%~dp0ScarFLIX_v2_PlatformGate_LocalRunner.ps1"
---
12: exit /b %ERRORLEVEL%
13: 
14: :taskrun
15: powershell.exe -NoProfile -ExecutionPolicy Bypass -WindowStyle Hidden -File "%~dp0ScarFLIX_v2_PlatformGate_LocalRunner.ps1"
16: endlocal
17: exit /b %ERRORLEVEL%
---
``

## D:\PlexTools\Scripts\scarflix_v2\ScarFLIX_v2_PlatformGate_LocalRunner.ps1
``text
2:   [int]$Concurrency = 5,
3:   [int]$Retries = 3,
4:   [int]$StaleLockMinutes = 240,
5:   [int]$TransientReviewRetries = 1
6: )
7: 
8: $ErrorActionPreference = "Continue"
9: try { [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12 } catch {}
10: 
---
15: $LogRoot = "D:\PlexTools\logs"
16: $PublishRoot = "D:\PlexTools\public\latest\scarflix"
17: $SummaryRoot = "D:\PlexTools\public\latest\scarflix_v2"
18: $PlatformGateScript = Join-Path $ScriptRoot "ScarFLIX_v2_PlatformGate.ps1"
19: $SummaryScript = Join-Path $ScriptRoot "ScarFLIX_v2_PlatformGate_StatusSummary.ps1"
20: $CheckpointPublisherScript = Join-Path $ScriptRoot "ScarFLIX_v2_PlatformGate_PublishCheckpoint.ps1"
21: $RunnerLockPath = Join-Path $StateRoot "platform_gate_local_runner.lock"
22: $PlatformGateLockPath = Join-Path $StateRoot "platform_gate.lock"
23: $StatusLatestPath = Join-Path $LogRoot "scarflix_v2_platform_gate_local_runner_status.json"
---
16: $PublishRoot = "D:\PlexTools\public\latest\scarflix"
17: $SummaryRoot = "D:\PlexTools\public\latest\scarflix_v2"
18: $PlatformGateScript = Join-Path $ScriptRoot "ScarFLIX_v2_PlatformGate.ps1"
19: $SummaryScript = Join-Path $ScriptRoot "ScarFLIX_v2_PlatformGate_StatusSummary.ps1"
20: $CheckpointPublisherScript = Join-Path $ScriptRoot "ScarFLIX_v2_PlatformGate_PublishCheckpoint.ps1"
21: $RunnerLockPath = Join-Path $StateRoot "platform_gate_local_runner.lock"
22: $PlatformGateLockPath = Join-Path $StateRoot "platform_gate.lock"
23: $StatusLatestPath = Join-Path $LogRoot "scarflix_v2_platform_gate_local_runner_status.json"
24: $RunStamp = Get-Date -Format "yyyyMMdd_HHmmss"
---
17: $SummaryRoot = "D:\PlexTools\public\latest\scarflix_v2"
18: $PlatformGateScript = Join-Path $ScriptRoot "ScarFLIX_v2_PlatformGate.ps1"
19: $SummaryScript = Join-Path $ScriptRoot "ScarFLIX_v2_PlatformGate_StatusSummary.ps1"
20: $CheckpointPublisherScript = Join-Path $ScriptRoot "ScarFLIX_v2_PlatformGate_PublishCheckpoint.ps1"
21: $RunnerLockPath = Join-Path $StateRoot "platform_gate_local_runner.lock"
22: $PlatformGateLockPath = Join-Path $StateRoot "platform_gate.lock"
23: $StatusLatestPath = Join-Path $LogRoot "scarflix_v2_platform_gate_local_runner_status.json"
24: $RunStamp = Get-Date -Format "yyyyMMdd_HHmmss"
25: $StatusRunPath = Join-Path $LogRoot ("scarflix_v2_platform_gate_local_runner_{0}.json" -f $RunStamp)
---
19: $SummaryScript = Join-Path $ScriptRoot "ScarFLIX_v2_PlatformGate_StatusSummary.ps1"
20: $CheckpointPublisherScript = Join-Path $ScriptRoot "ScarFLIX_v2_PlatformGate_PublishCheckpoint.ps1"
21: $RunnerLockPath = Join-Path $StateRoot "platform_gate_local_runner.lock"
22: $PlatformGateLockPath = Join-Path $StateRoot "platform_gate.lock"
23: $StatusLatestPath = Join-Path $LogRoot "scarflix_v2_platform_gate_local_runner_status.json"
24: $RunStamp = Get-Date -Format "yyyyMMdd_HHmmss"
25: $StatusRunPath = Join-Path $LogRoot ("scarflix_v2_platform_gate_local_runner_{0}.json" -f $RunStamp)
26: $LogPath = Join-Path $LogRoot ("scarflix_v2_platform_gate_local_runner_{0}.log" -f (Get-Date -Format "yyyyMMdd"))
27: $SummaryPath = Join-Path $SummaryRoot "platform_gate_checkpoint.md"
---
29: $script:LastCheckpointPublishUtc = [DateTime]::MinValue
30: 
31: $OverlapTasks = @(
32:   "ScarFLIX_v2_PlatformGate",
33:   "ScarFLIX_v2_SafeWebDavExpansionPipeline",
34:   "ScarFLIX_v2_Publisher",
35:   "ScarFLIX_v2_WebDavVirtualCatalogPublisher",
36:   "ScarFLIX_v2_AutoGate",
37:   "ScarFLIX_v2_VisibleCatalogQA",
---
34:   "ScarFLIX_v2_Publisher",
35:   "ScarFLIX_v2_WebDavVirtualCatalogPublisher",
36:   "ScarFLIX_v2_AutoGate",
37:   "ScarFLIX_v2_VisibleCatalogQA",
38:   "ScarFLIX_v2_PlexDecisionQA",
39:   "ScarFLIX_v2_PlexClientDecisionQA",
40:   "ScarFLIX_v2_ConcurrentQA",
41:   "ScarFLIX_v2_ConcurrentStreamQA",
42:   "ScarFLIX_v2_LiveCatalogSeeder",
---
35:   "ScarFLIX_v2_WebDavVirtualCatalogPublisher",
36:   "ScarFLIX_v2_AutoGate",
37:   "ScarFLIX_v2_VisibleCatalogQA",
38:   "ScarFLIX_v2_PlexDecisionQA",
39:   "ScarFLIX_v2_PlexClientDecisionQA",
40:   "ScarFLIX_v2_ConcurrentQA",
41:   "ScarFLIX_v2_ConcurrentStreamQA",
42:   "ScarFLIX_v2_LiveCatalogSeeder",
43:   "ScarFLIX_v2_SafeCatalogOrchestrator",
---
37:   "ScarFLIX_v2_VisibleCatalogQA",
38:   "ScarFLIX_v2_PlexDecisionQA",
39:   "ScarFLIX_v2_PlexClientDecisionQA",
40:   "ScarFLIX_v2_ConcurrentQA",
41:   "ScarFLIX_v2_ConcurrentStreamQA",
42:   "ScarFLIX_v2_LiveCatalogSeeder",
43:   "ScarFLIX_v2_SafeCatalogOrchestrator",
44:   "ScarFLIX_v2_CatalogPromoter",
45:   "ScarFLIX_v2_CatalogVisibilityGate"
---
38:   "ScarFLIX_v2_PlexDecisionQA",
39:   "ScarFLIX_v2_PlexClientDecisionQA",
40:   "ScarFLIX_v2_ConcurrentQA",
41:   "ScarFLIX_v2_ConcurrentStreamQA",
42:   "ScarFLIX_v2_LiveCatalogSeeder",
43:   "ScarFLIX_v2_SafeCatalogOrchestrator",
44:   "ScarFLIX_v2_CatalogPromoter",
45:   "ScarFLIX_v2_CatalogVisibilityGate"
46: )
---
46: )
47: 
48: $OverlapScriptNames = @(
49:   "ScarFLIX_v2_PlatformGate.ps1",
50:   "ScarFLIX_v2_SafeWebDavExpansionPipeline.ps1",
51:   "ScarFLIX_v2_Publisher.ps1",
52:   "ScarFLIX_v2_WebDavVirtualCatalogPublisher.ps1",
53:   "ScarFLIX_v2_AutoGate.ps1",
54:   "ScarFLIX_v2_VisibleCatalogQA.ps1",
---
51:   "ScarFLIX_v2_Publisher.ps1",
52:   "ScarFLIX_v2_WebDavVirtualCatalogPublisher.ps1",
53:   "ScarFLIX_v2_AutoGate.ps1",
54:   "ScarFLIX_v2_VisibleCatalogQA.ps1",
55:   "ScarFLIX_v2_PlexDecisionQA.ps1",
56:   "ScarFLIX_v2_PlexClientDecisionQA.ps1",
57:   "ScarFLIX_v2_ConcurrentQA.ps1",
58:   "ScarFLIX_v2_ConcurrentStreamQA.ps1",
59:   "ScarFLIX_v2_LiveCatalogSeeder.ps1"
---
52:   "ScarFLIX_v2_WebDavVirtualCatalogPublisher.ps1",
53:   "ScarFLIX_v2_AutoGate.ps1",
54:   "ScarFLIX_v2_VisibleCatalogQA.ps1",
55:   "ScarFLIX_v2_PlexDecisionQA.ps1",
56:   "ScarFLIX_v2_PlexClientDecisionQA.ps1",
57:   "ScarFLIX_v2_ConcurrentQA.ps1",
58:   "ScarFLIX_v2_ConcurrentStreamQA.ps1",
59:   "ScarFLIX_v2_LiveCatalogSeeder.ps1"
60: )
---
54:   "ScarFLIX_v2_VisibleCatalogQA.ps1",
55:   "ScarFLIX_v2_PlexDecisionQA.ps1",
56:   "ScarFLIX_v2_PlexClientDecisionQA.ps1",
57:   "ScarFLIX_v2_ConcurrentQA.ps1",
58:   "ScarFLIX_v2_ConcurrentStreamQA.ps1",
59:   "ScarFLIX_v2_LiveCatalogSeeder.ps1"
60: )
61: 
62: $ManagedLocks = @(
---
55:   "ScarFLIX_v2_PlexDecisionQA.ps1",
56:   "ScarFLIX_v2_PlexClientDecisionQA.ps1",
57:   "ScarFLIX_v2_ConcurrentQA.ps1",
58:   "ScarFLIX_v2_ConcurrentStreamQA.ps1",
59:   "ScarFLIX_v2_LiveCatalogSeeder.ps1"
60: )
61: 
62: $ManagedLocks = @(
63:   (Join-Path $StateRoot "platform_gate.lock"),
---
65:   (Join-Path $StateRoot "autogate.lock"),
66:   (Join-Path $StateRoot "visible_catalog_qa.lock"),
67:   (Join-Path $StateRoot "plex_client_decision_qa.lock"),
68:   (Join-Path $StateRoot "concurrent_stream_qa.lock")
69: )
70: 
71: $summary = [ordered]@{
72:   component = $Component
73:   status = "RUNNING"
---
80:   concurrency = $Concurrency
81:   retries = $Retries
82:   stale_lock_minutes = $StaleLockMinutes
83:   transient_review_retries = $TransientReviewRetries
84:   platform_gate_attempts = @()
85:   blockers = @()
86:   overlap_tasks = @()
87:   overlap_processes = @()
88:   disabled_tasks = @()
---
87:   overlap_processes = @()
88:   disabled_tasks = @()
89:   stale_locks_removed = @()
90:   platform_gate = [ordered]@{ script=$PlatformGateScript; exit_code=$null; status=""; status_file=(Join-Path $PublishRoot "platform_gate_status.json") }
91:   summary_file = $SummaryPath
92:   checkpoint_json = $CheckpointJsonPath
93:   checkpoint_publisher = $CheckpointPublisherScript
94:   log = $LogPath
95:   status_latest = $StatusLatestPath
---
``

## D:\PlexTools\Scripts\scarflix_v2\ScarFLIX_v2_PlatformGate_PublishCheckpoint.ps1
``text
62:   }
63:   $content = ""
64:   try { $content = Get-Content -LiteralPath $LocalPath -Raw } catch {
65:     return [ordered]@{ path=$RemotePath; status="FAIL"; reason="local read failed" }
66:   }
67:   $headers = New-Headers -Token [REDACTED]
68:   $sha = $null
69:   $getUri = "https://api.github.com/repos/{0}/{1}/contents/{2}?ref={3}" -f $Owner,$Repo,$RemotePath,$Branch
70:   try {
---
68:   $sha = $null
69:   $getUri = "https://api.github.com/repos/{0}/{1}/contents/{2}?ref={3}" -f $Owner,$Repo,$RemotePath,$Branch
70:   try {
71:     $existing = Invoke-RestMethod -UseBasicParsing -Uri $getUri -Headers $headers -Method Get -TimeoutSec 20 -ErrorAction Stop
72:     if ($existing -and $existing.sha) { $sha = "" + $existing.sha }
73:   } catch {}
74:   $body = @{
75:     message = $Message
76:     content = [Convert]::ToBase64String([Text.Encoding]::UTF8.GetBytes($content))
---
79:   if ($sha) { $body.sha = $sha }
80:   $putUri = "https://api.github.com/repos/{0}/{1}/contents/{2}" -f $Owner,$Repo,$RemotePath
81:   try {
82:     Invoke-RestMethod -UseBasicParsing -Uri $putUri -Headers $headers -Method Put -TimeoutSec 30 -Body ($body | ConvertTo-Json -Depth 8) -ErrorAction Stop | Out-Null
83:     return [ordered]@{ path=$RemotePath; status="PASS"; reason="" }
84:   } catch {
85:     return [ordered]@{ path=$RemotePath; status="REVIEW"; reason=("publish failed: " + $_.Exception.Message) }
86:   }
87: }
---
82:     Invoke-RestMethod -UseBasicParsing -Uri $putUri -Headers $headers -Method Put -TimeoutSec 30 -Body ($body | ConvertTo-Json -Depth 8) -ErrorAction Stop | Out-Null
83:     return [ordered]@{ path=$RemotePath; status="PASS"; reason="" }
84:   } catch {
85:     return [ordered]@{ path=$RemotePath; status="REVIEW"; reason=("publish failed: " + $_.Exception.Message) }
86:   }
87: }
88: 
89: Ensure-Dir $PublicRoot
90: $token = [REDACTED]
---
91: $status = "PASS"
92: $items = @()
93: if ([string]::IsNullOrWhiteSpace($token)) {
94:   $status = "REVIEW"
95:   $items = @([ordered]@{ path="latest/scarflix_v2"; status="SKIP"; reason="GitHub token [REDACTED]" })
96: } else {
97:   $items = @(
98:     (Publish-File -LocalPath $CheckpointJsonPath -RemotePath "latest/scarflix_v2/platform_gate_checkpoint.json" -Message "scarflix_v2: update platform gate checkpoint json" -Token [REDACTED],
99:     (Publish-File -LocalPath $CheckpointMdPath -RemotePath "latest/scarflix_v2/platform_gate_checkpoint.md" -Message "scarflix_v2: update platform gate checkpoint markdown" -Token [REDACTED]
---
99:     (Publish-File -LocalPath $CheckpointMdPath -RemotePath "latest/scarflix_v2/platform_gate_checkpoint.md" -Message "scarflix_v2: update platform gate checkpoint markdown" -Token [REDACTED]
100:   )
101:   foreach ($item in @($items)) {
102:     if (("" + $item.status) -eq "FAIL") { $status = "FAIL" }
103:     if (("" + $item.status) -eq "REVIEW" -and $status -eq "PASS") { $status = "REVIEW" }
104:   }
105: }
106: 
107: $rawBase = "https://raw.githubusercontent.com/{0}/{1}/{2}/latest/scarflix_v2" -f $Owner,$Repo,$Branch
---
100:   )
101:   foreach ($item in @($items)) {
102:     if (("" + $item.status) -eq "FAIL") { $status = "FAIL" }
103:     if (("" + $item.status) -eq "REVIEW" -and $status -eq "PASS") { $status = "REVIEW" }
104:   }
105: }
106: 
107: $rawBase = "https://raw.githubusercontent.com/{0}/{1}/{2}/latest/scarflix_v2" -f $Owner,$Repo,$Branch
108: $summary = [ordered]@{
---
124: }
125: 
126: if ($status -eq "PASS") { exit 0 }
127: if ($status -eq "FAIL") { exit 1 }
128: exit 2
---
``

## D:\PlexTools\Scripts\scarflix_v2\ScarFLIX_v2_PlatformGate_StatusSummary.ps1
``text
73: Add-Line $lines ""
74: 
75: if ($null -eq $platform) {
76:   Add-Line $lines "Status: REVIEW"
77:   Add-Line $lines "Blocker: platform_gate_status.json is missing or unreadable."
78:   $text = $lines.ToArray() -join "`r`n"
79:   if ($WriteSummary) {
80:     Ensure-Dir (Split-Path -Parent $OutputPath)
81:     $enc = New-Object System.Text.UTF8Encoding($false)
---
96: $active = Get-PropValue -Object $platform.qa -Name "active_gate" -Default $null
97: $visible = Get-PropValue -Object $platform.qa -Name "visible_catalog_qa" -Default $null
98: $decision = Get-PropValue -Object $platform.qa -Name "plex_client_decision_qa" -Default $null
99: $concurrent = Get-PropValue -Object $platform.qa -Name "concurrent_stream_qa" -Default $null
100: $health = Get-PropValue -Object $platform.qa -Name "health" -Default $null
101: 
102: $activeChecked = Get-PropValue -Object $active -Name "checked" -Default -1
103: $visibleChecked = Get-PropValue -Object $visible -Name "checked" -Default -1
104: $decisionChecked = Get-PropValue -Object $decision -Name "checked" -Default -1
---
105: $activeFresh = Get-PropValue -Object $active -Name "fresh" -Default $false
106: $visibleFresh = Get-PropValue -Object $visible -Name "fresh" -Default $false
107: $decisionFresh = Get-PropValue -Object $decision -Name "fresh" -Default $false
108: $concurrentFresh = Get-PropValue -Object $concurrent -Name "fresh" -Default $false
109: $healthFresh = Get-PropValue -Object $health -Name "fresh" -Default $false
110: if ([int]$activeChecked -eq [int]$visibleCount -and [int]$visibleChecked -eq [int]$visibleCount -and [int]$decisionChecked -eq [int]$visibleCount -and $activeFresh -and $visibleFresh -and $decisionFresh -and $concurrentFresh -and $healthFresh) {
111:   $sameSnapshot = $true
112: }
113: 
---
107: $decisionFresh = Get-PropValue -Object $decision -Name "fresh" -Default $false
108: $concurrentFresh = Get-PropValue -Object $concurrent -Name "fresh" -Default $false
109: $healthFresh = Get-PropValue -Object $health -Name "fresh" -Default $false
110: if ([int]$activeChecked -eq [int]$visibleCount -and [int]$visibleChecked -eq [int]$visibleCount -and [int]$decisionChecked -eq [int]$visibleCount -and $activeFresh -and $visibleFresh -and $decisionFresh -and $concurrentFresh -and $healthFresh) {
111:   $sameSnapshot = $true
112: }
113: 
114: $reasonItems = @(Get-PropValue -Object $platform.quarantine -Name "top_reason_codes" -Default @())
115: $quarantineCount = [int](Get-PropValue -Object $platform.quarantine -Name "count" -Default 0)
---
113: 
114: $reasonItems = @(Get-PropValue -Object $platform.quarantine -Name "top_reason_codes" -Default @())
115: $quarantineCount = [int](Get-PropValue -Object $platform.quarantine -Name "count" -Default 0)
116: $transientPatterns = @("429","503","TIMEOUT","RATE","RETRYABLE")
117: $transientCount = Get-ReasonTotal -ReasonItems $reasonItems -Patterns $transientPatterns
118: $permanentCount = $quarantineCount - $transientCount
119: if ($permanentCount -lt 0) { $permanentCount = 0 }
120: 
121: $rejectedStageSkipped = 0
---
135: Add-Line $lines ("Same-snapshot confirmed: {0}" -f $sameSnapshot)
136: Add-Line $lines ("Checkpoint JSON: {0}" -f $CheckpointJsonPath)
137: Add-Line $lines ""
138: Add-Line $lines "## Visible Catalogue"
139: Add-Line $lines ("- visible: {0}" -f $visibleCount)
140: Add-Line $lines ("- movies: {0}" -f $movieCount)
141: Add-Line $lines ("- tv: {0}" -f $tvCount)
142: Add-Line $lines ""
143: Add-Line $lines "## QA"
---
141: Add-Line $lines ("- tv: {0}" -f $tvCount)
142: Add-Line $lines ""
143: Add-Line $lines "## QA"
144: Add-Line $lines ("- WebDAV active gate: {0}, checked={1}" -f (Get-PropValue -Object $active -Name "status" -Default "UNKNOWN"), $activeChecked)
145: Add-Line $lines ("- Plex visible/HLS QA: {0}, checked={1}" -f (Get-PropValue -Object $visible -Name "status" -Default "UNKNOWN"), $visibleChecked)
146: Add-Line $lines ("- Plex client decision QA: {0}, checked={1}" -f (Get-PropValue -Object $decision -Name "status" -Default "UNKNOWN"), $decisionChecked)
147: Add-Line $lines ("- 5-concurrent stream QA: {0}, target={1}, map_tested={2}, visible_tested={3}" -f (Get-PropValue -Object $concurrent -Name "status" -Default "UNKNOWN"), (Get-PropValue -Object $concurrent -Name "target_concurrency" -Default ""), (Get-PropValue -Object $concurrent -Name "map_entries_tested" -Default ""), (Get-PropValue -Object $concurrent -Name "visible_rows_tested" -Default ""))
148: Add-Line $lines ("- Health: {0}" -f (Get-PropValue -Object $health -Name "status" -Default "UNKNOWN"))
149: Add-Line $lines ""
---
142: Add-Line $lines ""
143: Add-Line $lines "## QA"
144: Add-Line $lines ("- WebDAV active gate: {0}, checked={1}" -f (Get-PropValue -Object $active -Name "status" -Default "UNKNOWN"), $activeChecked)
145: Add-Line $lines ("- Plex visible/HLS QA: {0}, checked={1}" -f (Get-PropValue -Object $visible -Name "status" -Default "UNKNOWN"), $visibleChecked)
146: Add-Line $lines ("- Plex client decision QA: {0}, checked={1}" -f (Get-PropValue -Object $decision -Name "status" -Default "UNKNOWN"), $decisionChecked)
147: Add-Line $lines ("- 5-concurrent stream QA: {0}, target={1}, map_tested={2}, visible_tested={3}" -f (Get-PropValue -Object $concurrent -Name "status" -Default "UNKNOWN"), (Get-PropValue -Object $concurrent -Name "target_concurrency" -Default ""), (Get-PropValue -Object $concurrent -Name "map_entries_tested" -Default ""), (Get-PropValue -Object $concurrent -Name "visible_rows_tested" -Default ""))
148: Add-Line $lines ("- Health: {0}" -f (Get-PropValue -Object $health -Name "status" -Default "UNKNOWN"))
149: Add-Line $lines ""
150: Add-Line $lines "## Source Handling"
---
143: Add-Line $lines "## QA"
144: Add-Line $lines ("- WebDAV active gate: {0}, checked={1}" -f (Get-PropValue -Object $active -Name "status" -Default "UNKNOWN"), $activeChecked)
145: Add-Line $lines ("- Plex visible/HLS QA: {0}, checked={1}" -f (Get-PropValue -Object $visible -Name "status" -Default "UNKNOWN"), $visibleChecked)
146: Add-Line $lines ("- Plex client decision QA: {0}, checked={1}" -f (Get-PropValue -Object $decision -Name "status" -Default "UNKNOWN"), $decisionChecked)
147: Add-Line $lines ("- 5-concurrent stream QA: {0}, target={1}, map_tested={2}, visible_tested={3}" -f (Get-PropValue -Object $concurrent -Name "status" -Default "UNKNOWN"), (Get-PropValue -Object $concurrent -Name "target_concurrency" -Default ""), (Get-PropValue -Object $concurrent -Name "map_entries_tested" -Default ""), (Get-PropValue -Object $concurrent -Name "visible_rows_tested" -Default ""))
148: Add-Line $lines ("- Health: {0}" -f (Get-PropValue -Object $health -Name "status" -Default "UNKNOWN"))
149: Add-Line $lines ""
150: Add-Line $lines "## Source Handling"
151: Add-Line $lines ("- quarantined/rejected sources: {0}" -f $quarantineCount)
---
144: Add-Line $lines ("- WebDAV active gate: {0}, checked={1}" -f (Get-PropValue -Object $active -Name "status" -Default "UNKNOWN"), $activeChecked)
145: Add-Line $lines ("- Plex visible/HLS QA: {0}, checked={1}" -f (Get-PropValue -Object $visible -Name "status" -Default "UNKNOWN"), $visibleChecked)
146: Add-Line $lines ("- Plex client decision QA: {0}, checked={1}" -f (Get-PropValue -Object $decision -Name "status" -Default "UNKNOWN"), $decisionChecked)
147: Add-Line $lines ("- 5-concurrent stream QA: {0}, target={1}, map_tested={2}, visible_tested={3}" -f (Get-PropValue -Object $concurrent -Name "status" -Default "UNKNOWN"), (Get-PropValue -Object $concurrent -Name "target_concurrency" -Default ""), (Get-PropValue -Object $concurrent -Name "map_entries_tested" -Default ""), (Get-PropValue -Object $concurrent -Name "visible_rows_tested" -Default ""))
148: Add-Line $lines ("- Health: {0}" -f (Get-PropValue -Object $health -Name "status" -Default "UNKNOWN"))
149: Add-Line $lines ""
150: Add-Line $lines "## Source Handling"
151: Add-Line $lines ("- quarantined/rejected sources: {0}" -f $quarantineCount)
152: Add-Line $lines ("- transient/retry-held count: {0}" -f $transientCount)
---
159: }
160: Add-Line $lines ""
161: Add-Line $lines "## Schedules"
162: Add-Line $lines ("- schedules safely re-enabled by PlatformGate: {0}" -f (Get-PropValue -Object $platform -Name "schedules_safely_reenabled" -Default $false))
163: foreach ($task in @(Get-PropValue -Object $platform -Name "schedule_states" -Default @())) {
164:   Add-Line $lines ("- {0}: {1}" -f (Get-PropValue -Object $task -Name "task" -Default ""), (Get-PropValue -Object $task -Name "state" -Default ""))
165: }
166: Add-Line $lines ""
167: Add-Line $lines "## Blockers"
---
``

## D:\PlexTools\Scripts\scarflix_v2\ScarFLIX_v2_PlayReadyWatcher.ps1
``text
118: $status = "PASS"
119: $processed = 0
120: $ready = 0
121: $review = 0
122: $lastSeen = 0
123: $results = New-Object System.Collections.ArrayList
124: 
125: if (!(Test-Path -LiteralPath $TargetedReady)) {
126:   Write-Step "FAIL" "TargetedReady script missing."
---
123: $results = New-Object System.Collections.ArrayList
124: 
125: if (!(Test-Path -LiteralPath $TargetedReady)) {
126:   Write-Step "FAIL" "TargetedReady script missing."
127:   $status = "FAIL"
128: } else {
129:   $checkpoint = Read-JsonSafe $CheckpointPath
130:   if ($ResetCheckpoint -or $null -eq $checkpoint -or !$checkpoint.PSObject.Properties["last_seen_play_queue_item_id"]) {
131:     $lastSeen = Get-MaxPlayQueueId
---
124: 
125: if (!(Test-Path -LiteralPath $TargetedReady)) {
126:   Write-Step "FAIL" "TargetedReady script missing."
127:   $status = "FAIL"
128: } else {
129:   $checkpoint = Read-JsonSafe $CheckpointPath
130:   if ($ResetCheckpoint -or $null -eq $checkpoint -or !$checkpoint.PSObject.Properties["last_seen_play_queue_item_id"]) {
131:     $lastSeen = Get-MaxPlayQueueId
132:     Write-JsonFile -Path $CheckpointPath -Object ([ordered]@{ last_seen_play_queue_item_id=$lastSeen; initialized_utc=(Get-Date).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ") })
---
142:       $finished = $proc.WaitForExit(180000)
143:       if (!$finished) {
144:         try { & taskkill.exe /PID $proc.Id /T /F | Out-Null } catch {}
145:         $review++
146:         [void]$results.Add([ordered]@{ play_queue_item_id=$row.play_queue_item_id; metadata_item_id=$row.metadata_item_id; title=$row.title; status="REVIEW"; reason="targeted readiness timeout" })
147:         continue
148:       }
149:       $targetStatus = Read-JsonSafe (Join-Path $PublishRoot "targeted_ready_status.json")
150:       $resultStatus = "REVIEW"
---
143:       if (!$finished) {
144:         try { & taskkill.exe /PID $proc.Id /T /F | Out-Null } catch {}
145:         $review++
146:         [void]$results.Add([ordered]@{ play_queue_item_id=$row.play_queue_item_id; metadata_item_id=$row.metadata_item_id; title=$row.title; status="REVIEW"; reason="targeted readiness timeout" })
147:         continue
148:       }
149:       $targetStatus = Read-JsonSafe (Join-Path $PublishRoot "targeted_ready_status.json")
150:       $resultStatus = "REVIEW"
151:       if ($targetStatus -and $targetStatus.PSObject.Properties["status"]) { $resultStatus = "" + $targetStatus.status }
---
147:         continue
148:       }
149:       $targetStatus = Read-JsonSafe (Join-Path $PublishRoot "targeted_ready_status.json")
150:       $resultStatus = "REVIEW"
151:       if ($targetStatus -and $targetStatus.PSObject.Properties["status"]) { $resultStatus = "" + $targetStatus.status }
152:       if ($resultStatus -eq "PASS") { $ready++ } else { $review++ }
153:       [void]$results.Add([ordered]@{ play_queue_item_id=$row.play_queue_item_id; metadata_item_id=$row.metadata_item_id; title=$row.title; status=$resultStatus })
154:     }
155:     Write-JsonFile -Path $CheckpointPath -Object ([ordered]@{ last_seen_play_queue_item_id=$lastSeen; updated_utc=(Get-Date).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ") })
---
149:       $targetStatus = Read-JsonSafe (Join-Path $PublishRoot "targeted_ready_status.json")
150:       $resultStatus = "REVIEW"
151:       if ($targetStatus -and $targetStatus.PSObject.Properties["status"]) { $resultStatus = "" + $targetStatus.status }
152:       if ($resultStatus -eq "PASS") { $ready++ } else { $review++ }
153:       [void]$results.Add([ordered]@{ play_queue_item_id=$row.play_queue_item_id; metadata_item_id=$row.metadata_item_id; title=$row.title; status=$resultStatus })
154:     }
155:     Write-JsonFile -Path $CheckpointPath -Object ([ordered]@{ last_seen_play_queue_item_id=$lastSeen; updated_utc=(Get-Date).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ") })
156:   }
157: }
---
156:   }
157: }
158: 
159: if ($review -gt 0 -and $status -eq "PASS") { $status = "REVIEW" }
160: $ended = Get-Date
161: $outObj = [ordered]@{
162:   component = $Component
163:   status = $status
164:   started_utc = $started.ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ")
---
166:   duration_seconds = [int]($ended - $started).TotalSeconds
167:   processed = $processed
168:   ready = $ready
169:   review = $review
170:   last_seen_play_queue_item_id = $lastSeen
171:   results = @($results)
172:   log = $LogPath
173: }
174: Write-JsonFile -Path $StatusJson -Object $outObj
---
172:   log = $LogPath
173: }
174: Write-JsonFile -Path $StatusJson -Object $outObj
175: Write-Step $status ("Final status: {0}; processed={1}; ready={2}; review={3}" -f $status,$processed,$ready,$review)
176: Write-Host ("Status JSON: {0}" -f $StatusJson)
177: if ($status -eq "FAIL") { exit 1 }
178: exit 0
---
174: Write-JsonFile -Path $StatusJson -Object $outObj
175: Write-Step $status ("Final status: {0}; processed={1}; ready={2}; review={3}" -f $status,$processed,$ready,$review)
176: Write-Host ("Status JSON: {0}" -f $StatusJson)
177: if ($status -eq "FAIL") { exit 1 }
178: exit 0
---
``

## D:\PlexTools\Scripts\scarflix_v2\ScarFLIX_v2_PlexClientDecisionQA.ps1
``text
1: # ScarFLIX v2 Plex client decision QA
2: # Verifies visible WebDAV catalog rows through Plex's /video/:/transcode/universal/decision endpoint.
3: # Windows PowerShell 5.1 compatible. No secrets are printed.
4: 
5: param(
6:   [int]$MaxItems = 0,
---
4: 
5: param(
6:   [int]$MaxItems = 0,
7:   [int]$TimeoutSeconds = 45,
8:   [int]$Retries = 1,
9:   [switch]$IgnoreBusyLocks,
10:   [switch]$InstallTask
11: )
12: 
---
29: $TaskName = "ScarFLIX_v2_PlexClientDecisionQA"
30: $LockPath = Join-Path $StateRoot "plex_client_decision_qa.lock"
31: $BusyLockPaths = @(
32:   (Join-Path $StateRoot "concurrent_stream_qa.lock"),
33:   (Join-Path $StateRoot "catalog_visibility.lock"),
34:   (Join-Path $StateRoot "webdav_virtual_catalog.lock")
35: )
36: 
37: function Ensure-Dir {
---
131:   [void]$bases.Add("http://127.0.0.1:32400")
132:   foreach ($base in @($bases.ToArray())) {
133:     try {
134:       $r = Invoke-WebRequest -Uri ($base + "/library/sections") -UseBasicParsing -TimeoutSec 5 -ErrorAction Stop
135:       if ($r.StatusCode -eq 200) { return $base }
136:     } catch {}
137:   }
138:   return ""
139: }
---
153:   }
154:   $sqlPath = Join-Path $env:TEMP ("scarflix_decision_sql_{0}.sql" -f ([Guid]::NewGuid().ToString("N")))
155:   try {
156:     Write-Utf8NoBom -Path $sqlPath -Text (".timeout 15000`r`n" + $Sql + "`r`n.quit`r`n")
157:     $readPath = $sqlPath.Replace("\", "/").Replace("'", "''")
158:     $readCommand = ".read '{0}'" -f $readPath
159:     return (& $sqliteExe -batch -noheader -separator "`t" $PlexDb $readCommand 2>&1 | Out-String).Trim()
160:   } finally {
161:     try { Remove-Item -LiteralPath $sqlPath -Force -ErrorAction SilentlyContinue } catch {}
---
220:     part_id = $Row.part_id
221:     section_id = $Row.section_id
222:     title = $Row.title
223:     status = "FAIL"
224:     http_status = 0
225:     reason = ""
226:     attempts = 0
227:   }
228:   if ($Row.metadata_id -le 0) {
---
233:     directPlay = "0"
234:     directStream = "0"
235:     directStreamAudio = "0"
236:     protocol = "hls"
237:     fastSeek = "1"
238:     path = ("/library/metadata/{0}" -f $Row.metadata_id)
239:     session = ([Guid]::NewGuid().ToString())
240:     mediaIndex = "0"
241:     partIndex = "0"
---
266:   for ($attempt = 1; $attempt -le $maxAttempts; $attempt++) {
267:     $result.attempts = $attempt
268:     try {
269:       $resp = Invoke-WebRequest -Uri $uri -Headers $headers -UseBasicParsing -TimeoutSec $TimeoutSeconds -MaximumRedirection 0 -ErrorAction Stop
270:       $result.http_status = [int]$resp.StatusCode
271:       $body = "" + $resp.Content
272:       if ($resp.StatusCode -eq 200 -and $body -match "MediaContainer" -and $body -notmatch "(?i)<error|transcoder process crashed|content is unavailable") {
273:         $result.status = "PASS"
274:         if ($attempt -gt 1) {
---
269:       $resp = Invoke-WebRequest -Uri $uri -Headers $headers -UseBasicParsing -TimeoutSec $TimeoutSeconds -MaximumRedirection 0 -ErrorAction Stop
270:       $result.http_status = [int]$resp.StatusCode
271:       $body = "" + $resp.Content
272:       if ($resp.StatusCode -eq 200 -and $body -match "MediaContainer" -and $body -notmatch "(?i)<error|transcoder process crashed|content is unavailable") {
273:         $result.status = "PASS"
274:         if ($attempt -gt 1) {
275:           $result.reason = "Plex transcode decision returned HTTP 200 after retry"
276:         } else {
277:           $result.reason = "Plex transcode decision returned HTTP 200"
---
293: }
294: 
295: function Install-Task {
296:   $taskRun = "powershell.exe -NoProfile -ExecutionPolicy Bypass -WindowStyle Hidden -File `"$PSCommandPath`" -MaxItems 0 -TimeoutSeconds 45 -Retries 1"
297:   schtasks.exe /Create /TN $TaskName /TR $taskRun /SC HOURLY /MO 2 /RU SYSTEM /RL LIMITED /F | Out-Null
298:   Write-Step "PASS" ("Scheduled task installed: {0}" -f $TaskName)
299: }
300: 
301: Ensure-Dir $LogRoot
---
313: $errors = New-Object System.Collections.ArrayList
314: $results = New-Object System.Collections.ArrayList
315: 
316: Write-Step "INFO" ("Plex client decision QA starting MaxItems={0} TimeoutSeconds={1} Retries={2}" -f $MaxItems,$TimeoutSeconds,$Retries)
317: $qaLockHeld = $false
318: $qaLockResult = Acquire-QALock
319: if ($qaLockResult -eq "ok") {
320:   $qaLockHeld = $true
321: } else {
---
320:   $qaLockHeld = $true
321: } else {
322:   [void]$warnings.Add($qaLockResult)
323:   Write-Step "REVIEW" $qaLockResult
324: }
325: if (![string]::IsNullOrWhiteSpace($token)) {
326:   try {
327:     $testUri = $baseUrl + "/library/sections?X-Plex-Token=" [REDACTED] (Encode-QueryValue $token)
328:     $testResp = Invoke-WebRequest -Uri $testUri -UseBasicParsing -TimeoutSec 5 -ErrorAction Stop
---
325: if (![string]::IsNullOrWhiteSpace($token)) {
326:   try {
327:     $testUri = $baseUrl + "/library/sections?X-Plex-Token=" [REDACTED] (Encode-QueryValue $token)
328:     $testResp = Invoke-WebRequest -Uri $testUri -UseBasicParsing -TimeoutSec 5 -ErrorAction Stop
329:     if ($testResp.StatusCode -ne 200) { $token = "" [REDACTED]
330:   } catch {
331:     $token [REDACTED] ""
332:     [void]$warnings.Add("saved Plex token [REDACTED] rejected; using local allowedNetworks fallback")
333:   }
---
351:       if ($probe.status -eq "PASS") {
352:         Write-Step "PASS" ("Decision passed: metadata={0} title={1}" -f $row.metadata_id,$row.title)
353:       } else {
354:         Write-Step "REVIEW" ("Decision failed: metadata={0} title={1} reason={2}" -f $row.metadata_id,$row.title,$probe.reason)
355:       }
356:     }
357:   } catch {
358:     [void]$errors.Add((ConvertTo-AsciiText $_.Exception.Message))
359:   } finally {
---
363: 
364: $checked = $results.Count
365: $passed = 0
366: $failed = 0
367: foreach ($result in @($results)) {
368:   if ($result.status -eq "PASS") { $passed = $passed + 1 } else { $failed = $failed + 1 }
369: }
370: 
371: $status = "PASS"
---
365: $passed = 0
366: $failed = 0
367: foreach ($result in @($results)) {
368:   if ($result.status -eq "PASS") { $passed = $passed + 1 } else { $failed = $failed + 1 }
369: }
370: 
371: $status = "PASS"
372: if ($errors.Count -gt 0) { $status = "FAIL" }
373: if ($checked -le 0 -and $status -eq "PASS") {
---
369: }
370: 
371: $status = "PASS"
372: if ($errors.Count -gt 0) { $status = "FAIL" }
373: if ($checked -le 0 -and $status -eq "PASS") {
374:   $status = "REVIEW"
375:   [void]$warnings.Add("no visible WebDAV catalog rows found")
376: }
377: if ($failed -gt 0 -and $status -eq "PASS") { $status = "FAIL" }
---
371: $status = "PASS"
372: if ($errors.Count -gt 0) { $status = "FAIL" }
373: if ($checked -le 0 -and $status -eq "PASS") {
374:   $status = "REVIEW"
375:   [void]$warnings.Add("no visible WebDAV catalog rows found")
376: }
377: if ($failed -gt 0 -and $status -eq "PASS") { $status = "FAIL" }
378: 
379: $Ended = Get-Date
---
374:   $status = "REVIEW"
375:   [void]$warnings.Add("no visible WebDAV catalog rows found")
376: }
``

## D:\PlexTools\Scripts\scarflix_v2\ScarFLIX_v2_PlexClientDecisionQA_pre_ignore_busy_locks_20260602T113952Z.ps1
``text
1: # ScarFLIX v2 Plex client decision QA
2: # Verifies visible WebDAV catalog rows through Plex's /video/:/transcode/universal/decision endpoint.
3: # Windows PowerShell 5.1 compatible. No secrets are printed.
4: 
5: param(
6:   [int]$MaxItems = 0,
---
4: 
5: param(
6:   [int]$MaxItems = 0,
7:   [int]$TimeoutSeconds = 45,
8:   [int]$Retries = 1,
9:   [switch]$InstallTask
10: )
11: 
12: $ErrorActionPreference = "Continue"
---
28: $TaskName = "ScarFLIX_v2_PlexClientDecisionQA"
29: $LockPath = Join-Path $StateRoot "plex_client_decision_qa.lock"
30: $BusyLockPaths = @(
31:   (Join-Path $StateRoot "concurrent_stream_qa.lock"),
32:   (Join-Path $StateRoot "catalog_visibility.lock"),
33:   (Join-Path $StateRoot "webdav_virtual_catalog.lock")
34: )
35: 
36: function Ensure-Dir {
---
128:   [void]$bases.Add("http://127.0.0.1:32400")
129:   foreach ($base in @($bases.ToArray())) {
130:     try {
131:       $r = Invoke-WebRequest -Uri ($base + "/library/sections") -UseBasicParsing -TimeoutSec 5 -ErrorAction Stop
132:       if ($r.StatusCode -eq 200) { return $base }
133:     } catch {}
134:   }
135:   return ""
136: }
---
150:   }
151:   $sqlPath = Join-Path $env:TEMP ("scarflix_decision_sql_{0}.sql" -f ([Guid]::NewGuid().ToString("N")))
152:   try {
153:     Write-Utf8NoBom -Path $sqlPath -Text (".timeout 15000`r`n" + $Sql + "`r`n.quit`r`n")
154:     $readPath = $sqlPath.Replace("\", "/").Replace("'", "''")
155:     $readCommand = ".read '{0}'" -f $readPath
156:     return (& $sqliteExe -batch -noheader -separator "`t" $PlexDb $readCommand 2>&1 | Out-String).Trim()
157:   } finally {
158:     try { Remove-Item -LiteralPath $sqlPath -Force -ErrorAction SilentlyContinue } catch {}
---
215:     part_id = $Row.part_id
216:     section_id = $Row.section_id
217:     title = $Row.title
218:     status = "FAIL"
219:     http_status = 0
220:     reason = ""
221:     attempts = 0
222:   }
223:   if ($Row.metadata_id -le 0) {
---
228:     directPlay = "0"
229:     directStream = "0"
230:     directStreamAudio = "0"
231:     protocol = "hls"
232:     fastSeek = "1"
233:     path = ("/library/metadata/{0}" -f $Row.metadata_id)
234:     session = ([Guid]::NewGuid().ToString())
235:     mediaIndex = "0"
236:     partIndex = "0"
---
261:   for ($attempt = 1; $attempt -le $maxAttempts; $attempt++) {
262:     $result.attempts = $attempt
263:     try {
264:       $resp = Invoke-WebRequest -Uri $uri -Headers $headers -UseBasicParsing -TimeoutSec $TimeoutSeconds -MaximumRedirection 0 -ErrorAction Stop
265:       $result.http_status = [int]$resp.StatusCode
266:       $body = "" + $resp.Content
267:       if ($resp.StatusCode -eq 200 -and $body -match "MediaContainer" -and $body -notmatch "(?i)<error|transcoder process crashed|content is unavailable") {
268:         $result.status = "PASS"
269:         if ($attempt -gt 1) {
---
264:       $resp = Invoke-WebRequest -Uri $uri -Headers $headers -UseBasicParsing -TimeoutSec $TimeoutSeconds -MaximumRedirection 0 -ErrorAction Stop
265:       $result.http_status = [int]$resp.StatusCode
266:       $body = "" + $resp.Content
267:       if ($resp.StatusCode -eq 200 -and $body -match "MediaContainer" -and $body -notmatch "(?i)<error|transcoder process crashed|content is unavailable") {
268:         $result.status = "PASS"
269:         if ($attempt -gt 1) {
270:           $result.reason = "Plex transcode decision returned HTTP 200 after retry"
271:         } else {
272:           $result.reason = "Plex transcode decision returned HTTP 200"
---
288: }
289: 
290: function Install-Task {
291:   $taskRun = "powershell.exe -NoProfile -ExecutionPolicy Bypass -WindowStyle Hidden -File `"$PSCommandPath`" -MaxItems 0 -TimeoutSeconds 45 -Retries 1"
292:   schtasks.exe /Create /TN $TaskName /TR $taskRun /SC HOURLY /MO 2 /RU SYSTEM /RL LIMITED /F | Out-Null
293:   Write-Step "PASS" ("Scheduled task installed: {0}" -f $TaskName)
294: }
295: 
296: Ensure-Dir $LogRoot
---
308: $errors = New-Object System.Collections.ArrayList
309: $results = New-Object System.Collections.ArrayList
310: 
311: Write-Step "INFO" ("Plex client decision QA starting MaxItems={0} TimeoutSeconds={1} Retries={2}" -f $MaxItems,$TimeoutSeconds,$Retries)
312: $qaLockHeld = $false
313: $qaLockResult = Acquire-QALock
314: if ($qaLockResult -eq "ok") {
315:   $qaLockHeld = $true
316: } else {
---
315:   $qaLockHeld = $true
316: } else {
317:   [void]$warnings.Add($qaLockResult)
318:   Write-Step "REVIEW" $qaLockResult
319: }
320: if (![string]::IsNullOrWhiteSpace($token)) {
321:   try {
322:     $testUri = $baseUrl + "/library/sections?X-Plex-Token=" [REDACTED] (Encode-QueryValue $token)
323:     $testResp = Invoke-WebRequest -Uri $testUri -UseBasicParsing -TimeoutSec 5 -ErrorAction Stop
---
320: if (![string]::IsNullOrWhiteSpace($token)) {
321:   try {
322:     $testUri = $baseUrl + "/library/sections?X-Plex-Token=" [REDACTED] (Encode-QueryValue $token)
323:     $testResp = Invoke-WebRequest -Uri $testUri -UseBasicParsing -TimeoutSec 5 -ErrorAction Stop
324:     if ($testResp.StatusCode -ne 200) { $token = "" [REDACTED]
325:   } catch {
326:     $token [REDACTED] ""
327:     [void]$warnings.Add("saved Plex token [REDACTED] rejected; using local allowedNetworks fallback")
328:   }
---
346:       if ($probe.status -eq "PASS") {
347:         Write-Step "PASS" ("Decision passed: metadata={0} title={1}" -f $row.metadata_id,$row.title)
348:       } else {
349:         Write-Step "REVIEW" ("Decision failed: metadata={0} title={1} reason={2}" -f $row.metadata_id,$row.title,$probe.reason)
350:       }
351:     }
352:   } catch {
353:     [void]$errors.Add((ConvertTo-AsciiText $_.Exception.Message))
354:   } finally {
---
358: 
359: $checked = $results.Count
360: $passed = 0
361: $failed = 0
362: foreach ($result in @($results)) {
363:   if ($result.status -eq "PASS") { $passed = $passed + 1 } else { $failed = $failed + 1 }
364: }
365: 
366: $status = "PASS"
---
360: $passed = 0
361: $failed = 0
362: foreach ($result in @($results)) {
363:   if ($result.status -eq "PASS") { $passed = $passed + 1 } else { $failed = $failed + 1 }
364: }
365: 
366: $status = "PASS"
367: if ($errors.Count -gt 0) { $status = "FAIL" }
368: if ($checked -le 0 -and $status -eq "PASS") {
---
364: }
365: 
366: $status = "PASS"
367: if ($errors.Count -gt 0) { $status = "FAIL" }
368: if ($checked -le 0 -and $status -eq "PASS") {
369:   $status = "REVIEW"
370:   [void]$warnings.Add("no visible WebDAV catalog rows found")
371: }
372: if ($failed -gt 0 -and $status -eq "PASS") { $status = "FAIL" }
---
366: $status = "PASS"
367: if ($errors.Count -gt 0) { $status = "FAIL" }
368: if ($checked -le 0 -and $status -eq "PASS") {
369:   $status = "REVIEW"
370:   [void]$warnings.Add("no visible WebDAV catalog rows found")
371: }
372: if ($failed -gt 0 -and $status -eq "PASS") { $status = "FAIL" }
373: 
374: $Ended = Get-Date
---
369:   $status = "REVIEW"
370:   [void]$warnings.Add("no visible WebDAV catalog rows found")
371: }
``

## D:\PlexTools\Scripts\scarflix_v2\ScarFLIX_v2_PlexClientDecisionQA_pre_tv_parent_title_20260602T130029Z.ps1
``text
1: # ScarFLIX v2 Plex client decision QA
2: # Verifies visible WebDAV catalog rows through Plex's /video/:/transcode/universal/decision endpoint.
3: # Windows PowerShell 5.1 compatible. No secrets are printed.
4: 
5: param(
6:   [int]$MaxItems = 0,
---
4: 
5: param(
6:   [int]$MaxItems = 0,
7:   [int]$TimeoutSeconds = 45,
8:   [int]$Retries = 1,
9:   [switch]$IgnoreBusyLocks,
10:   [switch]$InstallTask
11: )
12: 
---
29: $TaskName = "ScarFLIX_v2_PlexClientDecisionQA"
30: $LockPath = Join-Path $StateRoot "plex_client_decision_qa.lock"
31: $BusyLockPaths = @(
32:   (Join-Path $StateRoot "concurrent_stream_qa.lock"),
33:   (Join-Path $StateRoot "catalog_visibility.lock"),
34:   (Join-Path $StateRoot "webdav_virtual_catalog.lock")
35: )
36: 
37: function Ensure-Dir {
---
131:   [void]$bases.Add("http://127.0.0.1:32400")
132:   foreach ($base in @($bases.ToArray())) {
133:     try {
134:       $r = Invoke-WebRequest -Uri ($base + "/library/sections") -UseBasicParsing -TimeoutSec 5 -ErrorAction Stop
135:       if ($r.StatusCode -eq 200) { return $base }
136:     } catch {}
137:   }
138:   return ""
139: }
---
153:   }
154:   $sqlPath = Join-Path $env:TEMP ("scarflix_decision_sql_{0}.sql" -f ([Guid]::NewGuid().ToString("N")))
155:   try {
156:     Write-Utf8NoBom -Path $sqlPath -Text (".timeout 15000`r`n" + $Sql + "`r`n.quit`r`n")
157:     $readPath = $sqlPath.Replace("\", "/").Replace("'", "''")
158:     $readCommand = ".read '{0}'" -f $readPath
159:     return (& $sqliteExe -batch -noheader -separator "`t" $PlexDb $readCommand 2>&1 | Out-String).Trim()
160:   } finally {
161:     try { Remove-Item -LiteralPath $sqlPath -Force -ErrorAction SilentlyContinue } catch {}
---
218:     part_id = $Row.part_id
219:     section_id = $Row.section_id
220:     title = $Row.title
221:     status = "FAIL"
222:     http_status = 0
223:     reason = ""
224:     attempts = 0
225:   }
226:   if ($Row.metadata_id -le 0) {
---
231:     directPlay = "0"
232:     directStream = "0"
233:     directStreamAudio = "0"
234:     protocol = "hls"
235:     fastSeek = "1"
236:     path = ("/library/metadata/{0}" -f $Row.metadata_id)
237:     session = ([Guid]::NewGuid().ToString())
238:     mediaIndex = "0"
239:     partIndex = "0"
---
264:   for ($attempt = 1; $attempt -le $maxAttempts; $attempt++) {
265:     $result.attempts = $attempt
266:     try {
267:       $resp = Invoke-WebRequest -Uri $uri -Headers $headers -UseBasicParsing -TimeoutSec $TimeoutSeconds -MaximumRedirection 0 -ErrorAction Stop
268:       $result.http_status = [int]$resp.StatusCode
269:       $body = "" + $resp.Content
270:       if ($resp.StatusCode -eq 200 -and $body -match "MediaContainer" -and $body -notmatch "(?i)<error|transcoder process crashed|content is unavailable") {
271:         $result.status = "PASS"
272:         if ($attempt -gt 1) {
---
267:       $resp = Invoke-WebRequest -Uri $uri -Headers $headers -UseBasicParsing -TimeoutSec $TimeoutSeconds -MaximumRedirection 0 -ErrorAction Stop
268:       $result.http_status = [int]$resp.StatusCode
269:       $body = "" + $resp.Content
270:       if ($resp.StatusCode -eq 200 -and $body -match "MediaContainer" -and $body -notmatch "(?i)<error|transcoder process crashed|content is unavailable") {
271:         $result.status = "PASS"
272:         if ($attempt -gt 1) {
273:           $result.reason = "Plex transcode decision returned HTTP 200 after retry"
274:         } else {
275:           $result.reason = "Plex transcode decision returned HTTP 200"
---
291: }
292: 
293: function Install-Task {
294:   $taskRun = "powershell.exe -NoProfile -ExecutionPolicy Bypass -WindowStyle Hidden -File `"$PSCommandPath`" -MaxItems 0 -TimeoutSeconds 45 -Retries 1"
295:   schtasks.exe /Create /TN $TaskName /TR $taskRun /SC HOURLY /MO 2 /RU SYSTEM /RL LIMITED /F | Out-Null
296:   Write-Step "PASS" ("Scheduled task installed: {0}" -f $TaskName)
297: }
298: 
299: Ensure-Dir $LogRoot
---
311: $errors = New-Object System.Collections.ArrayList
312: $results = New-Object System.Collections.ArrayList
313: 
314: Write-Step "INFO" ("Plex client decision QA starting MaxItems={0} TimeoutSeconds={1} Retries={2}" -f $MaxItems,$TimeoutSeconds,$Retries)
315: $qaLockHeld = $false
316: $qaLockResult = Acquire-QALock
317: if ($qaLockResult -eq "ok") {
318:   $qaLockHeld = $true
319: } else {
---
318:   $qaLockHeld = $true
319: } else {
320:   [void]$warnings.Add($qaLockResult)
321:   Write-Step "REVIEW" $qaLockResult
322: }
323: if (![string]::IsNullOrWhiteSpace($token)) {
324:   try {
325:     $testUri = $baseUrl + "/library/sections?X-Plex-Token=" [REDACTED] (Encode-QueryValue $token)
326:     $testResp = Invoke-WebRequest -Uri $testUri -UseBasicParsing -TimeoutSec 5 -ErrorAction Stop
---
323: if (![string]::IsNullOrWhiteSpace($token)) {
324:   try {
325:     $testUri = $baseUrl + "/library/sections?X-Plex-Token=" [REDACTED] (Encode-QueryValue $token)
326:     $testResp = Invoke-WebRequest -Uri $testUri -UseBasicParsing -TimeoutSec 5 -ErrorAction Stop
327:     if ($testResp.StatusCode -ne 200) { $token = "" [REDACTED]
328:   } catch {
329:     $token [REDACTED] ""
330:     [void]$warnings.Add("saved Plex token [REDACTED] rejected; using local allowedNetworks fallback")
331:   }
---
349:       if ($probe.status -eq "PASS") {
350:         Write-Step "PASS" ("Decision passed: metadata={0} title={1}" -f $row.metadata_id,$row.title)
351:       } else {
352:         Write-Step "REVIEW" ("Decision failed: metadata={0} title={1} reason={2}" -f $row.metadata_id,$row.title,$probe.reason)
353:       }
354:     }
355:   } catch {
356:     [void]$errors.Add((ConvertTo-AsciiText $_.Exception.Message))
357:   } finally {
---
361: 
362: $checked = $results.Count
363: $passed = 0
364: $failed = 0
365: foreach ($result in @($results)) {
366:   if ($result.status -eq "PASS") { $passed = $passed + 1 } else { $failed = $failed + 1 }
367: }
368: 
369: $status = "PASS"
---
363: $passed = 0
364: $failed = 0
365: foreach ($result in @($results)) {
366:   if ($result.status -eq "PASS") { $passed = $passed + 1 } else { $failed = $failed + 1 }
367: }
368: 
369: $status = "PASS"
370: if ($errors.Count -gt 0) { $status = "FAIL" }
371: if ($checked -le 0 -and $status -eq "PASS") {
---
367: }
368: 
369: $status = "PASS"
370: if ($errors.Count -gt 0) { $status = "FAIL" }
371: if ($checked -le 0 -and $status -eq "PASS") {
372:   $status = "REVIEW"
373:   [void]$warnings.Add("no visible WebDAV catalog rows found")
374: }
375: if ($failed -gt 0 -and $status -eq "PASS") { $status = "FAIL" }
---
369: $status = "PASS"
370: if ($errors.Count -gt 0) { $status = "FAIL" }
371: if ($checked -le 0 -and $status -eq "PASS") {
372:   $status = "REVIEW"
373:   [void]$warnings.Add("no visible WebDAV catalog rows found")
374: }
375: if ($failed -gt 0 -and $status -eq "PASS") { $status = "FAIL" }
376: 
377: $Ended = Get-Date
---
372:   $status = "REVIEW"
373:   [void]$warnings.Add("no visible WebDAV catalog rows found")
374: }
``

## D:\PlexTools\Scripts\scarflix_v2\ScarFLIX_v2_PlexPlaybackProbe.ps1
``text
1: # ScarFLIX v2 Plex playback probe
2: # Verifies selected live .strm entries through HTTP admission and Plex Transcoder.
3: # Windows PowerShell 5.1 compatible. No secrets or upstream URLs are printed.
4: 
5: param(
6:   [string[]]$TitlePatterns = @(),
7:   [int]$Seconds = 3,
---
18: $PublishRoot = "D:\PlexTools\public\latest\scarflix"
19: $LiveMovieRoot = "D:\StremioCatalog\_Hybrid\Movies\_ScarFLIXLive"
20: $LiveTvRoot = "D:\StremioCatalog\_Hybrid\_HTTP\TV"
21: $PlexTranscoder = "C:\Program Files\Plex\Plex Media Server\Plex Transcoder.exe"
22: $PlexSqlite = "C:\Program Files\Plex\Plex Media Server\Plex SQLite.exe"
23: $PlexDb = "C:\Users\jason\AppData\Local\Plex Media Server\Plug-in Support\Databases\com.plexapp.plugins.library.db"
24: $StatusJson = Join-Path $PublishRoot "plex_playback_probe_status.json"
25: $StatusMd = Join-Path $PublishRoot "plex_playback_probe_status.md"
26: $LogPath = Join-Path $LogRoot ("scarflix_v2_plex_playback_probe_{0}.log" -f (Get-Date -Format "yyyyMMdd"))
---
173:     return $false
174:   }
175:   if ($Item.plex_container -eq "avi") {
176:     $Item.reason = "Plex DB live profile is AVI; Plex HLS clients may crash"
177:     return $false
178:   }
179:   if ($Item.plex_video_codec -match "hevc|h265|mpeg4|msmpeg4|mpeg2video|divx|xvid") {
180:     $Item.reason = "Plex DB live profile uses a codec unsafe for Plex HLS clients"
181:     return $false
---
177:     return $false
178:   }
179:   if ($Item.plex_video_codec -match "hevc|h265|mpeg4|msmpeg4|mpeg2video|divx|xvid") {
180:     $Item.reason = "Plex DB live profile uses a codec unsafe for Plex HLS clients"
181:     return $false
182:   }
183:   if ($Item.plex_video_codec -notmatch "h264|avc") {
184:     $Item.reason = "Plex DB live profile is not H264/AVC"
185:     return $false
---
255: function Test-HttpAdmission {
256:   param([string]$Url, $Item)
257:   try {
258:     $Head = Invoke-WebRequest -UseBasicParsing -Method Head -Uri $Url -TimeoutSec 45 -MaximumRedirection 1 -ErrorAction Stop
259:     $Item.head_status = [int]$Head.StatusCode
260:     $Item.content_type = "" + $Head.Headers["Content-Type"]
261:     $Item.content_length = "" + $Head.Headers["Content-Length"]
262:   } catch {
263:     $Item.reason = "HEAD failed: " + (ConvertTo-AsciiText $_.Exception.Message)
---
260:     $Item.content_type = "" + $Head.Headers["Content-Type"]
261:     $Item.content_length = "" + $Head.Headers["Content-Length"]
262:   } catch {
263:     $Item.reason = "HEAD failed: " + (ConvertTo-AsciiText $_.Exception.Message)
264:     return $false
265:   }
266: 
267:   $Length = 0
268:   [void][int64]::TryParse(("" + $Item.content_length), [ref]$Length)
---
279:   try {
280:     $Req = [Net.HttpWebRequest]::Create($Url)
281:     $Req.Method = "GET"
282:     $Req.Timeout = 45000
283:     $Req.ReadWriteTimeout = 45000
284:     $Req.AddRange(0, 1)
285:     $Resp = $Req.GetResponse()
286:     $Item.range_status = [int]$Resp.StatusCode
287:     $Item.content_range = "" + $Resp.Headers["Content-Range"]
---
280:     $Req = [Net.HttpWebRequest]::Create($Url)
281:     $Req.Method = "GET"
282:     $Req.Timeout = 45000
283:     $Req.ReadWriteTimeout = 45000
284:     $Req.AddRange(0, 1)
285:     $Resp = $Req.GetResponse()
286:     $Item.range_status = [int]$Resp.StatusCode
287:     $Item.content_range = "" + $Resp.Headers["Content-Range"]
288:   } catch {
---
286:     $Item.range_status = [int]$Resp.StatusCode
287:     $Item.content_range = "" + $Resp.Headers["Content-Range"]
288:   } catch {
289:     $Item.reason = "Range failed: " + (ConvertTo-AsciiText $_.Exception.Message)
290:     return $false
291:   } finally {
292:     try { if ($Resp) { $Resp.Close() } } catch {}
293:   }
294: 
---
303:   return $true
304: }
305: 
306: function Test-PlexTranscoderOpen {
307:   param([string]$Url, $Item)
308:   if (!(Test-Path -LiteralPath $PlexTranscoder)) {
309:     $Item.reason = "Plex Transcoder missing"
310:     return $false
311:   }
---
305: 
306: function Test-PlexTranscoderOpen {
307:   param([string]$Url, $Item)
308:   if (!(Test-Path -LiteralPath $PlexTranscoder)) {
309:     $Item.reason = "Plex Transcoder missing"
310:     return $false
311:   }
312: 
313:   $Stamp = Get-Date -Format "yyyyMMdd_HHmmss"
---
306: function Test-PlexTranscoderOpen {
307:   param([string]$Url, $Item)
308:   if (!(Test-Path -LiteralPath $PlexTranscoder)) {
309:     $Item.reason = "Plex Transcoder missing"
310:     return $false
311:   }
312: 
313:   $Stamp = Get-Date -Format "yyyyMMdd_HHmmss"
314:   $BaseName = "scarflix_plex_playback_probe_{0}_{1}" -f $Stamp, ([Guid]::NewGuid().ToString("N"))
---
314:   $BaseName = "scarflix_plex_playback_probe_{0}_{1}" -f $Stamp, ([Guid]::NewGuid().ToString("N"))
315:   $ErrLog = Join-Path $LogRoot ($BaseName + ".err.log")
316:   $OutLog = Join-Path $LogRoot ($BaseName + ".out.log")
317:   $Args = @("-nostats", "-v", "error", "-rw_timeout", "30000000", "-i", $Url, "-t", ("" + $Seconds), "-map", "0:v:0", "-c", "copy", "-f", "null", "NUL")
318: 
319:   try {
320:     $Proc = Start-Process -FilePath $PlexTranscoder -ArgumentList $Args -Wait -NoNewWindow -PassThru -RedirectStandardError $ErrLog -RedirectStandardOutput $OutLog
321:     $Item.plex_transcoder_exit = [int]$Proc.ExitCode
322:     $Item.plex_transcoder_log = $ErrLog
---
317:   $Args = @("-nostats", "-v", "error", "-rw_timeout", "30000000", "-i", $Url, "-t", ("" + $Seconds), "-map", "0:v:0", "-c", "copy", "-f", "null", "NUL")
318: 
319:   try {
320:     $Proc = Start-Process -FilePath $PlexTranscoder -ArgumentList $Args -Wait -NoNewWindow -PassThru -RedirectStandardError $ErrLog -RedirectStandardOutput $OutLog
321:     $Item.plex_transcoder_exit = [int]$Proc.ExitCode
322:     $Item.plex_transcoder_log = $ErrLog
323:   } catch {
324:     $Item.reason = "Plex Transcoder launch failed: " + (ConvertTo-AsciiText $_.Exception.Message)
325:     return $false
---
318: 
319:   try {
320:     $Proc = Start-Process -FilePath $PlexTranscoder -ArgumentList $Args -Wait -NoNewWindow -PassThru -RedirectStandardError $ErrLog -RedirectStandardOutput $OutLog
321:     $Item.plex_transcoder_exit = [int]$Proc.ExitCode
322:     $Item.plex_transcoder_log = $ErrLog
323:   } catch {
324:     $Item.reason = "Plex Transcoder launch failed: " + (ConvertTo-AsciiText $_.Exception.Message)
325:     return $false
326:   }
---
319:   try {
320:     $Proc = Start-Process -FilePath $PlexTranscoder -ArgumentList $Args -Wait -NoNewWindow -PassThru -RedirectStandardError $ErrLog -RedirectStandardOutput $OutLog
321:     $Item.plex_transcoder_exit = [int]$Proc.ExitCode
322:     $Item.plex_transcoder_log = $ErrLog
323:   } catch {
324:     $Item.reason = "Plex Transcoder launch failed: " + (ConvertTo-AsciiText $_.Exception.Message)
325:     return $false
326:   }
327: 
---
321:     $Item.plex_transcoder_exit = [int]$Proc.ExitCode
322:     $Item.plex_transcoder_log = $ErrLog
323:   } catch {
324:     $Item.reason = "Plex Transcoder launch failed: " + (ConvertTo-AsciiText $_.Exception.Message)
325:     return $false
326:   }
327: 
328:   if ($Item.plex_transcoder_exit -ne 0) {
329:     $Item.reason = "Plex Transcoder could not open stream"
---
325:     return $false
326:   }
327: 
328:   if ($Item.plex_transcoder_exit -ne 0) {
329:     $Item.reason = "Plex Transcoder could not open stream"
330:     return $false
331:   }
332:   return $true
333: }
---
326:   }
327: 
``

## D:\PlexTools\Scripts\scarflix_v2\ScarFLIX_v2_PlexSelfTest.ps1
``text
23: $LogPath = Join-Path $LogRoot ("scarflix_v2_plex_selftest_{0}.log" -f (Get-Date -Format "yyyyMMdd"))
24: 
25: $Warnings = New-Object System.Collections.ArrayList
26: $Failures = New-Object System.Collections.ArrayList
27: $Samples = New-Object System.Collections.ArrayList
28: 
29: function Ensure-Dir {
30:   param([string]$Path)
31:   if ([string]::IsNullOrWhiteSpace($Path)) { return }
---
68:   Log-Line "WARN" $Message
69: }
70: 
71: function Add-Failure {
72:   param([string]$Path, [string]$Reason)
73:   [void]$Failures.Add([ordered]@{ path = (ConvertTo-AsciiText $Path); reason = (ConvertTo-AsciiText $Reason) })
74:   Log-Line "FAIL" ("{0} :: {1}" -f $Reason, $Path)
75: }
76: 
---
70: 
71: function Add-Failure {
72:   param([string]$Path, [string]$Reason)
73:   [void]$Failures.Add([ordered]@{ path = (ConvertTo-AsciiText $Path); reason = (ConvertTo-AsciiText $Reason) })
74:   Log-Line "FAIL" ("{0} :: {1}" -f $Reason, $Path)
75: }
76: 
77: function Read-JsonSafe {
78:   param([string]$Path)
---
71: function Add-Failure {
72:   param([string]$Path, [string]$Reason)
73:   [void]$Failures.Add([ordered]@{ path = (ConvertTo-AsciiText $Path); reason = (ConvertTo-AsciiText $Reason) })
74:   Log-Line "FAIL" ("{0} :: {1}" -f $Reason, $Path)
75: }
76: 
77: function Read-JsonSafe {
78:   param([string]$Path)
79:   if (!(Test-Path -LiteralPath $Path)) { return $null }
---
151:     }
152:   }
153: } catch {
154:   Add-Failure -Path $PlexDb -Reason $_.Exception.Message
155: }
156: 
157: $Total = $Rows.Count
158: $LocalFiles = 0
159: $StrmFiles = 0
---
175: 
176:   if ($Ext -eq ".strm") {
177:     $StrmFiles = $StrmFiles + 1
178:     Add-Failure -Path $Path -Reason "Plex indexed a request-library .strm file"
179:     continue
180:   }
181: 
182:   if ($Ext -eq ".mp4" -or $Ext -eq ".mkv" -or $Ext -eq ".m4v") {
183:     $LocalFiles = $LocalFiles + 1
---
187: 
188:   if (!(Test-Path -LiteralPath $Path)) {
189:     $MissingFiles = $MissingFiles + 1
190:     Add-Failure -Path $Path -Reason "Plex indexed file is missing on disk"
191:     continue
192:   }
193: 
194:   if (!(Test-FileReadable -Path $Path)) {
195:     Add-Failure -Path $Path -Reason "Plex indexed file cannot be opened for reading"
---
192:   }
193: 
194:   if (!(Test-FileReadable -Path $Path)) {
195:     Add-Failure -Path $Path -Reason "Plex indexed file cannot be opened for reading"
196:   }
197: 
198:   if ([int]$Row.video_streams -le 0) {
199:     Add-Failure -Path $Path -Reason "Plex has no indexed video stream"
200:   }
---
196:   }
197: 
198:   if ([int]$Row.video_streams -le 0) {
199:     Add-Failure -Path $Path -Reason "Plex has no indexed video stream"
200:   }
201: 
202:   if ([int]$Row.audio_streams -le 0) {
203:     Add-Failure -Path $Path -Reason "Plex has no indexed audio stream"
204:   }
---
200:   }
201: 
202:   if ([int]$Row.audio_streams -le 0) {
203:     Add-Failure -Path $Path -Reason "Plex has no indexed audio stream"
204:   }
205: 
206:   if ([int]$Row.video_streams -gt 0 -and [int]$Row.audio_streams -gt 0) {
207:     $StreamReady = $StreamReady + 1
208:   }
---
212:     $Materialized = ""
213:     if ($State -and $State.PSObject.Properties["materialized_file"]) { $Materialized = "" + $State.materialized_file }
214:     if ([string]::IsNullOrWhiteSpace($Materialized)) {
215:       Add-Failure -Path $Path -Reason "READY item is missing materialized_file in state"
216:     } elseif (!(Test-Path -LiteralPath $Materialized)) {
217:       Add-Failure -Path $Materialized -Reason "READY materialized_file is missing on disk"
218:     }
219:   }
220: 
---
214:     if ([string]::IsNullOrWhiteSpace($Materialized)) {
215:       Add-Failure -Path $Path -Reason "READY item is missing materialized_file in state"
216:     } elseif (!(Test-Path -LiteralPath $Materialized)) {
217:       Add-Failure -Path $Materialized -Reason "READY materialized_file is missing on disk"
218:     }
219:   }
220: 
221:   if ($StateName -eq "CATALOG") {
222:     $CatalogPlaceholders = $CatalogPlaceholders + 1
---
221:   if ($StateName -eq "CATALOG") {
222:     $CatalogPlaceholders = $CatalogPlaceholders + 1
223:     if ($PlaceholderBytes -gt 0 -and [int64]$Row.size -lt 1024) {
224:       Add-Failure -Path $Path -Reason "Catalog placeholder is too small to be valid media"
225:     }
226:   }
227: 
228:   if ($Samples.Count -lt $SampleLimit) {
229:     [void]$Samples.Add([ordered]@{
---
247: 
248: $Ended = Get-Date
249: $FinalStatus = "PASS"
250: if ($Warnings.Count -gt 0) { $FinalStatus = "REVIEW" }
251: if ($Failures.Count -gt 0) { $FinalStatus = "FAIL" }
252: 
253: $Summary = [ordered]@{
254:   component = $Component
255:   status = $FinalStatus
---
248: $Ended = Get-Date
249: $FinalStatus = "PASS"
250: if ($Warnings.Count -gt 0) { $FinalStatus = "REVIEW" }
251: if ($Failures.Count -gt 0) { $FinalStatus = "FAIL" }
252: 
253: $Summary = [ordered]@{
254:   component = $Component
255:   status = $FinalStatus
256:   started_utc = $Started.ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ")
---
265:   ready_materialized_parts = $ReadyMaterialized
266:   catalog_placeholder_parts = $CatalogPlaceholders
267:   request_state_counts = $RequestStateCounts
268:   failures = @($Failures)
269:   warnings = @($Warnings)
270:   samples = @($Samples)
271:   log = $LogPath
272: }
273: Write-Utf8NoBom -Path $StatusJson -Text ($Summary | ConvertTo-Json -Depth 12)
---
285: [void]$Lines.Add(("READY materialized parts: {0}" -f $ReadyMaterialized))
286: [void]$Lines.Add(("CATALOG placeholder parts: {0}" -f $CatalogPlaceholders))
287: [void]$Lines.Add("")
288: [void]$Lines.Add("## Failures")
289: if ($Failures.Count -eq 0) {
290:   [void]$Lines.Add("- None.")
291: } else {
292:   foreach ($Failure in $Failures) { [void]$Lines.Add(("- {0}: {1}" -f $Failure.reason, $Failure.path)) }
293: }
---
286: [void]$Lines.Add(("CATALOG placeholder parts: {0}" -f $CatalogPlaceholders))
287: [void]$Lines.Add("")
288: [void]$Lines.Add("## Failures")
289: if ($Failures.Count -eq 0) {
290:   [void]$Lines.Add("- None.")
291: } else {
292:   foreach ($Failure in $Failures) { [void]$Lines.Add(("- {0}: {1}" -f $Failure.reason, $Failure.path)) }
293: }
294: [void]$Lines.Add("")
---
``

## D:\PlexTools\Scripts\scarflix_v2\ScarFLIX_v2_PrivilegedCleanup.ps1
``text
33: $started = Get-Date
34: $cutoff = (Get-Date).AddMinutes(-1 * [Math]::Max(0, $OlderThanMinutes))
35: $killed = 0
36: $review = 0
37: 
38: Write-Step "INFO" "ScarFLIX privileged cleanup starting"
39: Write-Step "INFO" ("Running as: {0}" -f [Security.Principal.WindowsIdentity]::GetCurrent().Name)
40: 
41: $targets = Get-CimInstance Win32_Process | Where-Object {
---
39: Write-Step "INFO" ("Running as: {0}" -f [Security.Principal.WindowsIdentity]::GetCurrent().Name)
40: 
41: $targets = Get-CimInstance Win32_Process | Where-Object {
42:   $isWorker = ($_.Name -eq "Plex Media Scanner.exe" -or $_.Name -eq "Plex Transcoder.exe")
43:   if (!$isWorker) { return $false }
44:   if ($KillAllPlexWorkers) { return $true }
45:   try {
46:     $created = [Management.ManagementDateTimeConverter]::ToDateTime($_.CreationDate)
47:     if ($created -lt $cutoff) { return $true }
---
57:     & taskkill.exe /PID $proc.ProcessId /T /F | Out-Null
58:     $killed++
59:   } catch {
60:     $review++
61:     Write-Step "REVIEW" ("taskkill failed for PID {0}: {1}" -f $pidText,$_.Exception.Message)
62:   }
63: }
64: 
65: Start-Sleep -Seconds 3
---
58:     $killed++
59:   } catch {
60:     $review++
61:     Write-Step "REVIEW" ("taskkill failed for PID {0}: {1}" -f $pidText,$_.Exception.Message)
62:   }
63: }
64: 
65: Start-Sleep -Seconds 3
66: $remaining = Get-CimInstance Win32_Process | Where-Object {
---
64: 
65: Start-Sleep -Seconds 3
66: $remaining = Get-CimInstance Win32_Process | Where-Object {
67:   $_.Name -eq "Plex Media Scanner.exe" -or $_.Name -eq "Plex Transcoder.exe"
68: }
69: 
70: foreach ($proc in @($remaining)) {
71:   $createdText = ""
72:   try { $createdText = [Management.ManagementDateTimeConverter]::ToDateTime($proc.CreationDate).ToString("s") } catch {}
---
70: foreach ($proc in @($remaining)) {
71:   $createdText = ""
72:   try { $createdText = [Management.ManagementDateTimeConverter]::ToDateTime($proc.CreationDate).ToString("s") } catch {}
73:   Write-Step "REVIEW" ("Remaining Plex worker PID {0} age/start {1}" -f $proc.ProcessId,$createdText)
74: }
75: 
76: $status = "PASS"
77: if (@($remaining).Count -gt 0 -or $review -gt 0) { $status = "REVIEW" }
78: $duration = [int]((Get-Date) - $started).TotalSeconds
---
74: }
75: 
76: $status = "PASS"
77: if (@($remaining).Count -gt 0 -or $review -gt 0) { $status = "REVIEW" }
78: $duration = [int]((Get-Date) - $started).TotalSeconds
79: Write-Step $status ("Final status: {0}; killed={1}; remaining={2}; duration_seconds={3}" -f $status,$killed,@($remaining).Count,$duration)
80: exit 0
---
``

## D:\PlexTools\Scripts\scarflix_v2\ScarFLIX_v2_ProviderCatalogLiveMigrator.ps1
``text
34: $Scanned = 0
35: $Migrated = 0
36: $Skipped = 0
37: $Failed = 0
38: $ApiCalls = 0
39: $TouchedSections = @{}
40: $Results = New-Object System.Collections.ArrayList
41: $Warnings = New-Object System.Collections.ArrayList
42: $TmdbCache = @{}
---
122:   if ($Path.Contains("?")) { $Glue = "&" }
123:   $Uri = "https://api.themoviedb.org/3/{0}{1}api_key=[REDACTED]" -f $Path, $Glue, [Uri]::EscapeDataString($ApiKey)
124:   $script:ApiCalls = $script:ApiCalls + 1
125:   $Resp = Invoke-WebRequest -Uri $Uri -UseBasicParsing -TimeoutSec 30 -ErrorAction Stop
126:   $Text = "" + $Resp.Content
127:   if ($Text -match "^[A-Za-z0-9_.$]+\((.*)\)\s*$") { $Text = $Matches[1] }
128:   return ($Text | ConvertFrom-Json)
129: }
130: 
---
263: function Invoke-PlexScan {
264:   param([int]$Section)
265:   if (!(Test-Path -LiteralPath $PlexScanner)) { Add-Warning "Plex scanner missing"; return }
266:   try { & $PlexScanner --scan --refresh --section $Section | Out-Null } catch { Add-Warning ("Plex scan failed section {0}: {1}" -f $Section, $_.Exception.Message) }
267: }
268: 
269: Ensure-Dir $LogRoot
270: Ensure-Dir $PublishRoot
271: Ensure-Dir $StateRoot
---
296:     $Year = [int]$Info.year
297:     $Season = [int]$Info.season
298:     $Episode = [int]$Info.episode
299:     $Item = [ordered]@{ path = (ConvertTo-AsciiText $Path); status = "FAIL"; type = $Kind; title = $Title; year = $Year; season = $Season; episode = $Episode; tmdb_id = 0; reason = "" }
300:     if ([string]::IsNullOrWhiteSpace($Title)) {
301:       $Item.reason = "Could not infer title"
302:       $Failed = $Failed + 1
303:       [void]$Results.Add($Item)
304:       return
---
299:     $Item = [ordered]@{ path = (ConvertTo-AsciiText $Path); status = "FAIL"; type = $Kind; title = $Title; year = $Year; season = $Season; episode = $Episode; tmdb_id = 0; reason = "" }
300:     if ([string]::IsNullOrWhiteSpace($Title)) {
301:       $Item.reason = "Could not infer title"
302:       $Failed = $Failed + 1
303:       [void]$Results.Add($Item)
304:       return
305:     }
306:     try {
307:       $TmdbId = Resolve-TmdbId -Kind $Kind -Title $Title -Year $Year
---
308:       $Item.tmdb_id = $TmdbId
309:       if ($TmdbId -le 0) {
310:         $Item.reason = "TMDb search returned no match"
311:         $Failed = $Failed + 1
312:         [void]$Results.Add($Item)
313:         return
314:       }
315:       $LiveUrl = Build-LiveUrl -Kind $Kind -TmdbId $TmdbId -Title $Title -Year $Year -Season $Season -Episode $Episode
316:       if (!$DryRun) {
---
324:       [void]$Results.Add($Item)
325:     } catch {
326:       $Item.reason = "Exception: " + (ConvertTo-AsciiText $_.Exception.Message)
327:       $Failed = $Failed + 1
328:       [void]$Results.Add($Item)
329:     }
330:   }
331: }
332: 
---
340: 
341: $Ended = Get-Date
342: $FinalStatus = "PASS"
343: if ($Failed -gt 0 -or $Warnings.Count -gt 0) { $FinalStatus = "REVIEW" }
344: if ($Scanned -le 0) { $FinalStatus = "FAIL" }
345: 
346: $Summary = [ordered]@{
347:   component = $Component
348:   status = $FinalStatus
---
341: $Ended = Get-Date
342: $FinalStatus = "PASS"
343: if ($Failed -gt 0 -or $Warnings.Count -gt 0) { $FinalStatus = "REVIEW" }
344: if ($Scanned -le 0) { $FinalStatus = "FAIL" }
345: 
346: $Summary = [ordered]@{
347:   component = $Component
348:   status = $FinalStatus
349:   started_utc = $Started.ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ")
---
354:   scanned = $Scanned
355:   migrated = $Migrated
356:   skipped = $Skipped
357:   failed = $Failed
358:   api_calls = $ApiCalls
359:   backup_root = $(if ($DryRun) { "" } else { $BackupRoot })
360:   touched_sections = @($TouchedSections.Keys)
361:   results = @($Results)
362:   warnings = @($Warnings)
---
370: Write-Host ("Scanned: {0}" -f $Scanned)
371: Write-Host ("Migrated: {0}" -f $Migrated)
372: Write-Host ("Skipped: {0}" -f $Skipped)
373: Write-Host ("Failed: {0}" -f $Failed)
374: Write-Host ("Status JSON: {0}" -f $StatusPath)
375: Write-Host ("Final: {0}" -f $FinalStatus)
376: 
377: if ($FinalStatus -eq "FAIL") { exit 1 }
378: exit 0
---
374: Write-Host ("Status JSON: {0}" -f $StatusPath)
375: Write-Host ("Final: {0}" -f $FinalStatus)
376: 
377: if ($FinalStatus -eq "FAIL") { exit 1 }
378: exit 0
---
``

## D:\PlexTools\Scripts\scarflix_v2\ScarFLIX_v2_QuietMode.ps1
``text
64:     "ScarFLIX_v2_CatalogPromoter",
65:     "ScarFLIX_v2_SafeCatalogOrchestrator",
66:     "ScarFLIX_v2_CatalogVisibilityGate",
67:     "ScarFLIX_v2_VisibleCatalogQA",
68:     "ScarFLIX_v2_ClientSafeUrlRewriter",
69:     "ScarFLIX_v2_WebDavFileBridge",
70:     "ScarFLIX_v2_LiveProfileHydrator",
71:     "ScarFLIX_v2_LiveSelfTest",
72:     "ScarFLIX_v2_PlexPlaybackProbe"
---
88: 
89: $Results = New-Object System.Collections.ArrayList
90: $Warnings = New-Object System.Collections.ArrayList
91: $Failures = New-Object System.Collections.ArrayList
92: $Updated = 0
93: $Skipped = 0
94: 
95: Disable-UnsafeLegacyTasks
96: 
---
125:       [void]$Results.Add([ordered]@{ task=$TaskName; status="OK"; arguments=$NewArgs })
126:     }
127:   } catch {
128:     [void]$Failures.Add(("Task update failed {0}: {1}" -f $TaskName,(ConvertTo-AsciiText $_.Exception.Message)))
129:     Write-Step "REVIEW" ("Task update failed: {0}" -f $TaskName)
130:   }
131: }
132: 
133: if ($ApplySystemForCoreTasks) {
---
126:     }
127:   } catch {
128:     [void]$Failures.Add(("Task update failed {0}: {1}" -f $TaskName,(ConvertTo-AsciiText $_.Exception.Message)))
129:     Write-Step "REVIEW" ("Task update failed: {0}" -f $TaskName)
130:   }
131: }
132: 
133: if ($ApplySystemForCoreTasks) {
134:   $CoreTasks = @("ScarFLIX_v2_RequestServer","ScarFLIX_v2_StreamProxy","ScarFLIX_v2_WebDavVirtualCatalogPublisher","ScarFLIX_v2_PlexClientDecisionQA","ScarFLIX_v2_HealthStatus")
---
144: 
145: $Ended = Get-Date
146: $Status = "PASS"
147: if ($Warnings.Count -gt 0) { $Status = "REVIEW" }
148: if ($Failures.Count -gt 0) { $Status = "FAIL" }
149: 
150: $Summary = [ordered]@{
151:   component = $Component
152:   status = $Status
---
145: $Ended = Get-Date
146: $Status = "PASS"
147: if ($Warnings.Count -gt 0) { $Status = "REVIEW" }
148: if ($Failures.Count -gt 0) { $Status = "FAIL" }
149: 
150: $Summary = [ordered]@{
151:   component = $Component
152:   status = $Status
153:   started_utc = $Started.ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ")
---
158:   apply_system_for_core_tasks = [bool]$ApplySystemForCoreTasks
159:   results = @($Results)
160:   warnings = @($Warnings)
161:   failures = @($Failures)
162:   log = $LogPath
163: }
164: Write-Utf8NoBom -Path $StatusJson -Text ($Summary | ConvertTo-Json -Depth 8)
165: 
166: $Lines = New-Object System.Collections.ArrayList
---
177:   [void]$Lines.Add("## Warnings")
178:   foreach ($Warning in @($Warnings)) { [void]$Lines.Add(("- {0}" -f $Warning)) }
179: }
180: if ($Failures.Count -gt 0) {
181:   [void]$Lines.Add("")
182:   [void]$Lines.Add("## Failures")
183:   foreach ($Failure in @($Failures)) { [void]$Lines.Add(("- {0}" -f $Failure)) }
184: }
185: Write-Utf8NoBom -Path $StatusMd -Text ($Lines -join "`r`n")
---
179: }
180: if ($Failures.Count -gt 0) {
181:   [void]$Lines.Add("")
182:   [void]$Lines.Add("## Failures")
183:   foreach ($Failure in @($Failures)) { [void]$Lines.Add(("- {0}" -f $Failure)) }
184: }
185: Write-Utf8NoBom -Path $StatusMd -Text ($Lines -join "`r`n")
186: 
187: Write-Host ""
---
180: if ($Failures.Count -gt 0) {
181:   [void]$Lines.Add("")
182:   [void]$Lines.Add("## Failures")
183:   foreach ($Failure in @($Failures)) { [void]$Lines.Add(("- {0}" -f $Failure)) }
184: }
185: Write-Utf8NoBom -Path $StatusMd -Text ($Lines -join "`r`n")
186: 
187: Write-Host ""
188: Write-Host "=== ScarFLIX v2 Quiet Mode Summary ==="
---
193: Write-Host ("Final: {0}" -f $Status)
194: 
195: if ($Status -eq "PASS") { exit 0 }
196: if ($Status -eq "REVIEW") { exit 2 }
197: exit 1
---
``

## D:\PlexTools\Scripts\scarflix_v2\ScarFLIX_v2_RequestDispatcher.ps1
``text
62:     try {
63:         if ($null -ne $Body) {
64:             $json = $Body | ConvertTo-Json -Depth 20
65:             return Invoke-RestMethod -Uri $uri -Method $Method -Headers $headers -Body $json -ContentType "application/json" -UseBasicParsing -TimeoutSec 60 -ErrorAction Stop
66:         }
67:         return Invoke-RestMethod -Uri $uri -Method $Method -Headers $headers -UseBasicParsing -TimeoutSec 60 -ErrorAction Stop
68:     } catch {
69:         Log-Line "REVIEW" ("ARR API failed {0} {1}: {2}" -f $Method, $Path, $_.Exception.Message)
70:         return $null
---
64:             $json = $Body | ConvertTo-Json -Depth 20
65:             return Invoke-RestMethod -Uri $uri -Method $Method -Headers $headers -Body $json -ContentType "application/json" -UseBasicParsing -TimeoutSec 60 -ErrorAction Stop
66:         }
67:         return Invoke-RestMethod -Uri $uri -Method $Method -Headers $headers -UseBasicParsing -TimeoutSec 60 -ErrorAction Stop
68:     } catch {
69:         Log-Line "REVIEW" ("ARR API failed {0} {1}: {2}" -f $Method, $Path, $_.Exception.Message)
70:         return $null
71:     }
72: }
---
66:         }
67:         return Invoke-RestMethod -Uri $uri -Method $Method -Headers $headers -UseBasicParsing -TimeoutSec 60 -ErrorAction Stop
68:     } catch {
69:         Log-Line "REVIEW" ("ARR API failed {0} {1}: {2}" -f $Method, $Path, $_.Exception.Message)
70:         return $null
71:     }
72: }
73: 
74: function Set-Prop {
---
95:     try {
96:         return Get-Content -LiteralPath $Path -Raw | ConvertFrom-Json
97:     } catch {
98:         Log-Line "REVIEW" ("Could not read JSON {0}: {1}" -f $Path, $_.Exception.Message)
99:         return $null
100:     }
101: }
102: 
103: function Write-JsonSafe {
---
105:     try {
106:         ($Object | ConvertTo-Json -Depth 12) | Set-Content -LiteralPath $Path -Encoding ASCII -Force
107:     } catch {
108:         Log-Line "REVIEW" ("Could not write JSON {0}: {1}" -f $Path, $_.Exception.Message)
109:     }
110: }
111: 
112: function Update-State {
113:     param([string]$Folder, [string]$State, [string]$Note, [string]$Arr, [int]$ArrId)
---
135:         Add-Ledger -Action "movie_search" -Result "OK" -Message $Title
136:         return $true
137:     }
138:     Add-Ledger -Action "movie_search" -Result "REVIEW" -Message $Title
139:     return $false
140: }
141: 
142: function Handle-MovieRequest {
143:     param([string]$RequestPath, $Request)
---
146:     $tmdbId = 0
147:     [void][int]::TryParse(("" + $Request.tmdb_id), [ref]$tmdbId)
148:     if ($tmdbId -le 0) {
149:         Update-State -Folder $folder -State "FAILED" -Note "Missing tmdb_id for Radarr add" -Arr "radarr" -ArrId 0
150:         return $false
151:     }
152: 
153:     $profiles = Invoke-ArrApi -Base $RadarrBase -ApiKey [REDACTED] -Method "GET" -Path "qualityprofile" -Body $null
154:     $profileId = Pick-QualityProfileId $profiles
---
164: 
165:     $lookup = Invoke-ArrApi -Base $RadarrBase -ApiKey [REDACTED] -Method "GET" -Path ("movie/lookup/tmdb?tmdbId={0}" -f $tmdbId) -Body $null
166:     if ($null -eq $lookup) {
167:         Update-State -Folder $folder -State "QUEUED" -Note "Radarr lookup failed; direct resolver still eligible" -Arr "radarr" -ArrId 0
168:         return $false
169:     }
170: 
171:     Set-Prop $lookup "qualityProfileId" $profileId
172:     Set-Prop $lookup "rootFolderPath" $RadarrRoot
---
182:         return $true
183:     }
184: 
185:     Update-State -Folder $folder -State "QUEUED" -Note "Radarr add failed; direct resolver still eligible" -Arr "radarr" -ArrId 0
186:     return $false
187: }
188: 
189: function Handle-EpisodeRequest {
190:     param([string]$RequestPath, $Request)
---
191:     $folder = Split-Path -Parent $RequestPath
192:     $title = "" + $Request.title
193:     if (-not $title) {
194:         Update-State -Folder $folder -State "FAILED" -Note "Missing title for Sonarr add" -Arr "sonarr" -ArrId 0
195:         return $false
196:     }
197: 
198:     $profiles = Invoke-ArrApi -Base $SonarrBase -ApiKey [REDACTED] -Method "GET" -Path "qualityprofile" -Body $null
199:     $profileId = Pick-QualityProfileId $profiles
---
209:     $term = [Uri]::EscapeDataString($title)
210:     $lookupList = Invoke-ArrApi -Base $SonarrBase -ApiKey [REDACTED] -Method "GET" -Path ("series/lookup?term={0}" -f $term) -Body $null
211:     if (-not $lookupList) {
212:         Update-State -Folder $folder -State "QUEUED" -Note "Sonarr lookup failed; direct resolver still eligible" -Arr "sonarr" -ArrId 0
213:         return $false
214:     }
215: 
216:     $lookup = $lookupList[0]
217:     $requestedYear = 0
---
236:         return $true
237:     }
238: 
239:     Update-State -Folder $folder -State "QUEUED" -Note "Sonarr add failed; direct resolver still eligible" -Arr "sonarr" -ArrId 0
240:     return $false
241: }
242: 
243: $script:RadarrKey = Get-ApiKey [REDACTED]
244: $script:SonarrKey = Get-ApiKey [REDACTED]
---
243: $script:RadarrKey = Get-ApiKey [REDACTED]
244: $script:SonarrKey = Get-ApiKey [REDACTED]
245: if (-not $script:RadarrKey -or -not $script:SonarrKey) {
246:     Log-Line "FAIL" "Missing Radarr or Sonarr API key"
247:     exit 1
248: }
249: 
250: $processed = 0
251: $ok = 0
---
249: 
250: $processed = 0
251: $ok = 0
252: $failed = 0
253: 
254: foreach ($root in @($MovieRequestRoot, $TvRequestRoot)) {
255:     if (-not (Test-Path -LiteralPath $root)) { continue }
256:     $files = Get-ChildItem -LiteralPath $root -Recurse -Filter "request.json" -ErrorAction SilentlyContinue
257:     foreach ($file in $files) {
---
270:         $processed++
271:         Update-State -Folder $folder -State "QUEUED" -Note "Dispatcher accepted request" -Arr "" -ArrId 0
272:         if (("" + $req.type) -eq "movie") {
273:             if (Handle-MovieRequest -RequestPath $file.FullName -Request $req) { $ok++ } else { $failed++ }
274:         } elseif (("" + $req.type) -eq "episode") {
275:             if (Handle-EpisodeRequest -RequestPath $file.FullName -Request $req) { $ok++ } else { $failed++ }
276:         } else {
277:             Update-State -Folder $folder -State "FAILED" -Note "Unknown request type" -Arr "" -ArrId 0
278:             $failed++
---
272:         if (("" + $req.type) -eq "movie") {
273:             if (Handle-MovieRequest -RequestPath $file.FullName -Request $req) { $ok++ } else { $failed++ }
274:         } elseif (("" + $req.type) -eq "episode") {
275:             if (Handle-EpisodeRequest -RequestPath $file.FullName -Request $req) { $ok++ } else { $failed++ }
276:         } else {
277:             Update-State -Folder $folder -State "FAILED" -Note "Unknown request type" -Arr "" -ArrId 0
278:             $failed++
279:         }
280:     }
---
274:         } elseif (("" + $req.type) -eq "episode") {
275:             if (Handle-EpisodeRequest -RequestPath $file.FullName -Request $req) { $ok++ } else { $failed++ }
276:         } else {
277:             Update-State -Folder $folder -State "FAILED" -Note "Unknown request type" -Arr "" -ArrId 0
278:             $failed++
279:         }
280:     }
281: }
282: 
---
275:             if (Handle-EpisodeRequest -RequestPath $file.FullName -Request $req) { $ok++ } else { $failed++ }
276:         } else {
277:             Update-State -Folder $folder -State "FAILED" -Note "Unknown request type" -Arr "" -ArrId 0
278:             $failed++
279:         }
280:     }
281: }
282: 
283: Log-Line "OK" ("Dispatcher run processed={0} ok={1} failed={2}" -f $processed, $ok, $failed)
---
``

## D:\PlexTools\Scripts\scarflix_v2\ScarFLIX_v2_RequestServer.ps1
``text
157:             try {
158:                 $existingState = Get-Content -LiteralPath $statePath -Raw | ConvertFrom-Json
159:                 $existingValue = "" + $existingState.state
160:                 if ($existingValue -and $existingValue -ne "FAILED") {
161:                     Add-Ledger -Action "request_existing" -Result "OK" -Message ("episode {0} S{1:D2}E{2:D2} state={3}" -f $title, $season, $episode, $existingValue)
162:                     return "Episode request already exists: {0} S{1:D2}E{2:D2} ({3})" -f $title, $season, $episode, $existingValue
163:                 }
164:             } catch {}
165:         }
---
192:         try {
193:             $existingState = Get-Content -LiteralPath $statePath -Raw | ConvertFrom-Json
194:             $existingValue = "" + $existingState.state
195:             if ($existingValue -and $existingValue -ne "FAILED") {
196:                 Add-Ledger -Action "request_existing" -Result "OK" -Message ("movie {0} ({1}) state={2}" -f $title, $year, $existingValue)
197:                 return "Movie request already exists: {0} ({1}) ({2})" -f $title, $year, $existingValue
198:             }
199:         } catch {}
200:     }
---
237:     Log-Line "PASS" ("Listening on port {0}" -f $Port)
238:     Add-Ledger -Action "server_start" -Result "PASS" -Message ("port {0}" -f $Port)
239: } catch {
240:     Log-Line "FAIL" ("Could not listen on port {0}: {1}" -f $Port, $_.Exception.Message)
241:     Add-Ledger -Action "server_start" -Result "FAIL" -Message $_.Exception.Message
242:     exit 1
243: }
244: 
245: while ($true) {
---
238:     Add-Ledger -Action "server_start" -Result "PASS" -Message ("port {0}" -f $Port)
239: } catch {
240:     Log-Line "FAIL" ("Could not listen on port {0}: {1}" -f $Port, $_.Exception.Message)
241:     Add-Ledger -Action "server_start" -Result "FAIL" -Message $_.Exception.Message
242:     exit 1
243: }
244: 
245: while ($true) {
246:     $client = $null
---
296:             Send-Response -Stream $stream -StatusLine "HTTP/1.1 404 Not Found" -Headers @("Content-Type: text/plain") -Body ([Text.Encoding]::ASCII.GetBytes("not found"))
297:         }
298:     } catch {
299:         try { Log-Line "REVIEW" ("Request failed: " + $_.Exception.Message) } catch {}
300:     } finally {
301:         if ($client) { try { $client.Close() } catch {} }
302:     }
303: }
304: 
---
``

## D:\PlexTools\Scripts\scarflix_v2\ScarFLIX_v2_RetirePlaceholderCatalog.ps1
``text
23: $Scanned = 0
24: $Moved = 0
25: $Skipped = 0
26: $Failed = 0
27: $Results = New-Object System.Collections.ArrayList
28: $Warnings = New-Object System.Collections.ArrayList
29: 
30: function Ensure-Dir {
31:   param([string]$Path)
---
100:   $StateName = Get-StateName -Folder $Folder
101:   if ($StateName -eq "READY") { return $false }
102:   if ($StateName -eq "CATALOG") { return $true }
103:   if ($IncludeInProgress -and ($StateName -eq "REQUESTED" -or $StateName -eq "QUEUED" -or $StateName -eq "CACHING" -or $StateName -eq "VALIDATING" -or $StateName -eq "FAILED")) { return $true }
104:   return $false
105: }
106: 
107: function Get-ArchiveDestination {
108:   param([string]$Folder, [string]$Root, [string]$Kind)
---
135:       [void]$Results.Add([ordered]@{ source = $Folder; destination = $Dest; status = "MOVED" })
136:       Log-Line "OK" ("Retired placeholder catalog: {0}" -f $Folder)
137:     } catch {
138:       $script:Failed = $script:Failed + 1
139:       [void]$Results.Add([ordered]@{ source = $Folder; destination = $Dest; status = "FAIL"; reason = (ConvertTo-AsciiText $_.Exception.Message) })
140:       Log-Line "FAIL" ("Could not retire {0}: {1}" -f $Folder, $_.Exception.Message)
141:     }
142:   }
143: }
---
136:       Log-Line "OK" ("Retired placeholder catalog: {0}" -f $Folder)
137:     } catch {
138:       $script:Failed = $script:Failed + 1
139:       [void]$Results.Add([ordered]@{ source = $Folder; destination = $Dest; status = "FAIL"; reason = (ConvertTo-AsciiText $_.Exception.Message) })
140:       Log-Line "FAIL" ("Could not retire {0}: {1}" -f $Folder, $_.Exception.Message)
141:     }
142:   }
143: }
144: 
---
137:     } catch {
138:       $script:Failed = $script:Failed + 1
139:       [void]$Results.Add([ordered]@{ source = $Folder; destination = $Dest; status = "FAIL"; reason = (ConvertTo-AsciiText $_.Exception.Message) })
140:       Log-Line "FAIL" ("Could not retire {0}: {1}" -f $Folder, $_.Exception.Message)
141:     }
142:   }
143: }
144: 
145: function Invoke-PlexScan {
---
163: 
164: $Ended = Get-Date
165: $FinalStatus = "PASS"
166: if ($Failed -gt 0) { $FinalStatus = "REVIEW" }
167: 
168: $Summary = [ordered]@{
169:   component = $Component
170:   status = $FinalStatus
171:   started_utc = $Started.ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ")
---
175:   scanned = $Scanned
176:   moved = $Moved
177:   skipped = $Skipped
178:   failed = $Failed
179:   archive_root = $ArchiveRoot
180:   log = $LogPath
181:   results = @($Results)
182:   warnings = @($Warnings)
183: }
---
189: Write-Host ("Scanned: {0}" -f $Scanned)
190: Write-Host ("Moved: {0}" -f $Moved)
191: Write-Host ("Skipped: {0}" -f $Skipped)
192: Write-Host ("Failed: {0}" -f $Failed)
193: Write-Host ("Archive: {0}" -f $ArchiveRoot)
194: Write-Host ("Status JSON: {0}" -f $StatusPath)
195: Write-Host ("Final: {0}" -f $FinalStatus)
196: 
197: exit 0
---
``

## D:\PlexTools\Scripts\scarflix_v2\ScarFLIX_v2_RetryPolicy.ps1
``text
1: # ScarFLIX v2 retry policy
2: # Converts retryable FAILED catalog items back to CATALOG so a future Plex play retries cleanly.
3: # Windows PowerShell 5.1 compatible.
4: 
5: $ErrorActionPreference = "Continue"
6: try { [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12 } catch {}
7: 
---
18: $ReturnedToCatalog = 0
19: $Requeued = 0
20: $Skipped = 0
21: $Failed = 0
22: $Results = New-Object System.Collections.ArrayList
23: $Warnings = New-Object System.Collections.ArrayList
24: 
25: function Ensure-Dir {
26:   param([string]$Path)
---
79:   if ($Object.PSObject.Properties[$Name]) { $Object.PSObject.Properties.Remove($Name) }
80: }
81: 
82: function Is-RetryableFailure {
83:   param($State)
84:   $Text = (("{0} {1} {2}" -f ("" + $State.note), ("" + $State.reject_reason), ("" + $State.last_admission_error))).ToLowerInvariant()
85:   if ($Text -match "no stremio streams returned") { return $true }
86:   if ($Text -match "no stream passed admission") { return $true }
87:   if ($Text -match "direct resolver still eligible") { return $true }
---
85:   if ($Text -match "no stremio streams returned") { return $true }
86:   if ($Text -match "no stream passed admission") { return $true }
87:   if ($Text -match "direct resolver still eligible") { return $true }
88:   if ($Text -match "stremio stream lookup failed") { return $true }
89:   return $false
90: }
91: 
92: function Process-StateFile {
93:   param([string]$StatePath)
---
94:   $script:Scanned = $script:Scanned + 1
95:   $State = Read-JsonSafe $StatePath
96:   if ($null -eq $State) { $script:Skipped = $script:Skipped + 1; return }
97:   if (("" + $State.state) -ne "FAILED") { $script:Skipped = $script:Skipped + 1; return }
98:   if (!(Is-RetryableFailure -State $State)) { $script:Skipped = $script:Skipped + 1; return }
99: 
100:   $Folder = Split-Path -Parent $StatePath
101:   $CatalogPath = ""
102:   if ($State.PSObject.Properties["catalog_json"]) { $CatalogPath = "" + $State.catalog_json }
---
95:   $State = Read-JsonSafe $StatePath
96:   if ($null -eq $State) { $script:Skipped = $script:Skipped + 1; return }
97:   if (("" + $State.state) -ne "FAILED") { $script:Skipped = $script:Skipped + 1; return }
98:   if (!(Is-RetryableFailure -State $State)) { $script:Skipped = $script:Skipped + 1; return }
99: 
100:   $Folder = Split-Path -Parent $StatePath
101:   $CatalogPath = ""
102:   if ($State.PSObject.Properties["catalog_json"]) { $CatalogPath = "" + $State.catalog_json }
103:   if ([string]::IsNullOrWhiteSpace($CatalogPath)) { $CatalogPath = Join-Path $Folder "catalog.json" }
---
112:     $Reason = "" + $State.reject_reason
113:     if ([string]::IsNullOrWhiteSpace($Reason)) { $Reason = "" + $State.note }
114:     Set-Prop $State "state" "CATALOG"
115:     Set-Prop $State "last_failed_utc" (Get-Date).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ")
116:     Set-Prop $State "last_failure_reason" $Reason
117:     Set-Prop $State "retry_count" $RetryCount
118:     Set-Prop $State "note" "Returned to catalog; next Plex play retries request"
119:     Set-Prop $State "updated_utc" (Get-Date).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ")
120:     Clear-Prop $State "reject_reason"
---
113:     if ([string]::IsNullOrWhiteSpace($Reason)) { $Reason = "" + $State.note }
114:     Set-Prop $State "state" "CATALOG"
115:     Set-Prop $State "last_failed_utc" (Get-Date).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ")
116:     Set-Prop $State "last_failure_reason" $Reason
117:     Set-Prop $State "retry_count" $RetryCount
118:     Set-Prop $State "note" "Returned to catalog; next Plex play retries request"
119:     Set-Prop $State "updated_utc" (Get-Date).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ")
120:     Clear-Prop $State "reject_reason"
121:     Clear-Prop $State "last_admission_error"
---
122:     Save-Json -Path $StatePath -Object $State
123:     Remove-Item -LiteralPath (Join-Path $Folder "request.json") -Force -ErrorAction SilentlyContinue
124:     $script:ReturnedToCatalog = $script:ReturnedToCatalog + 1
125:     [void]$Results.Add([ordered]@{ state_file = $StatePath; status = "CATALOG"; reason = "retryable failure returned to catalog" })
126:     Log-Line "OK" ("Returned retryable failure to catalog: {0}" -f $Folder)
127:     return
128:   }
129: 
130:   Set-Prop $State "state" "QUEUED"
---
123:     Remove-Item -LiteralPath (Join-Path $Folder "request.json") -Force -ErrorAction SilentlyContinue
124:     $script:ReturnedToCatalog = $script:ReturnedToCatalog + 1
125:     [void]$Results.Add([ordered]@{ state_file = $StatePath; status = "CATALOG"; reason = "retryable failure returned to catalog" })
126:     Log-Line "OK" ("Returned retryable failure to catalog: {0}" -f $Folder)
127:     return
128:   }
129: 
130:   Set-Prop $State "state" "QUEUED"
131:   Set-Prop $State "retry_count" $RetryCount
---
129: 
130:   Set-Prop $State "state" "QUEUED"
131:   Set-Prop $State "retry_count" $RetryCount
132:   Set-Prop $State "note" "Retryable failure requeued"
133:   Set-Prop $State "updated_utc" (Get-Date).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ")
134:   Clear-Prop $State "reject_reason"
135:   Clear-Prop $State "last_admission_error"
136:   Save-Json -Path $StatePath -Object $State
137:   $script:Requeued = $script:Requeued + 1
---
135:   Clear-Prop $State "last_admission_error"
136:   Save-Json -Path $StatePath -Object $State
137:   $script:Requeued = $script:Requeued + 1
138:   [void]$Results.Add([ordered]@{ state_file = $StatePath; status = "QUEUED"; reason = "retryable failure requeued" })
139:   Log-Line "OK" ("Requeued retryable failure: {0}" -f $Folder)
140: }
141: 
142: Ensure-Dir $LogRoot
143: Ensure-Dir $PublishRoot
---
136:   Save-Json -Path $StatePath -Object $State
137:   $script:Requeued = $script:Requeued + 1
138:   [void]$Results.Add([ordered]@{ state_file = $StatePath; status = "QUEUED"; reason = "retryable failure requeued" })
139:   Log-Line "OK" ("Requeued retryable failure: {0}" -f $Folder)
140: }
141: 
142: Ensure-Dir $LogRoot
143: Ensure-Dir $PublishRoot
144: Log-Line "INFO" "Retry policy starting"
---
147:   if (!(Test-Path -LiteralPath $Root)) { continue }
148:   Get-ChildItem -LiteralPath $Root -Recurse -File -Filter "state.json" -ErrorAction SilentlyContinue | ForEach-Object {
149:     try { Process-StateFile -StatePath $_.FullName } catch {
150:       $script:Failed = $script:Failed + 1
151:       [void]$Results.Add([ordered]@{ state_file = $_.FullName; status = "FAIL"; reason = (ConvertTo-AsciiText $_.Exception.Message) })
152:     }
153:   }
154: }
155: 
---
148:   Get-ChildItem -LiteralPath $Root -Recurse -File -Filter "state.json" -ErrorAction SilentlyContinue | ForEach-Object {
149:     try { Process-StateFile -StatePath $_.FullName } catch {
150:       $script:Failed = $script:Failed + 1
151:       [void]$Results.Add([ordered]@{ state_file = $_.FullName; status = "FAIL"; reason = (ConvertTo-AsciiText $_.Exception.Message) })
152:     }
153:   }
154: }
155: 
156: $Ended = Get-Date
---
155: 
156: $Ended = Get-Date
157: $FinalStatus = "PASS"
158: if ($Failed -gt 0) { $FinalStatus = "REVIEW" }
159: 
160: $Summary = [ordered]@{
161:   component = $Component
162:   status = $FinalStatus
163:   started_utc = $Started.ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ")
---
167:   returned_to_catalog = $ReturnedToCatalog
168:   requeued = $Requeued
169:   skipped = $Skipped
170:   failed = $Failed
171:   log = $LogPath
172:   results = @($Results)
173:   warnings = @($Warnings)
174: }
175: Save-Json -Path $StatusPath -Object $Summary
---
181: Write-Host ("Returned to catalog: {0}" -f $ReturnedToCatalog)
182: Write-Host ("Requeued: {0}" -f $Requeued)
183: Write-Host ("Skipped: {0}" -f $Skipped)
184: Write-Host ("Failed: {0}" -f $Failed)
185: Write-Host ("Status JSON: {0}" -f $StatusPath)
186: Write-Host ("Final: {0}" -f $FinalStatus)
---
``

## D:\PlexTools\Scripts\scarflix_v2\ScarFLIX_v2_SafeCatalogOrchestrator.ps1
``text
25: 
26: $PromoterScript = Join-Path $ScriptRoot "ScarFLIX_v2_CatalogPromoter.ps1"
27: $GateScript = Join-Path $ScriptRoot "ScarFLIX_v2_CatalogVisibilityGate.ps1"
28: $QaScript = Join-Path $ScriptRoot "ScarFLIX_v2_VisibleCatalogQA.ps1"
29: $HealthScript = Join-Path $ScriptRoot "ScarFLIX_v2_HealthStatus.ps1"
30: 
31: function Ensure-Dir {
32:   param([string]$Path)
33:   if ([string]::IsNullOrWhiteSpace($Path)) { return }
---
68:     try {
69:       $age = (Get-Date) - (Get-Item -LiteralPath $RunLock).LastWriteTime
70:       if ($age.TotalMinutes -lt 30) {
71:         Write-Step "REVIEW" "Another safe catalog orchestrator run is active."
72:         return $false
73:       }
74:       Remove-Item -LiteralPath $RunLock -Force -ErrorAction SilentlyContinue
75:     } catch {}
76:   }
---
79:     Set-Content -LiteralPath $RunLock -Value ("pid={0};utc={1}" -f $processIdValue,(Get-Date).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ")) -Encoding UTF8 -Force
80:     return $true
81:   } catch {
82:     Write-Step "FAIL" ("Could not create orchestrator lock: {0}" -f $_.Exception.Message)
83:     return $false
84:   }
85: }
86: 
87: function Release-RunLock {
---
97: 
98: function Invoke-StepScript {
99:   param([string]$Name, [string]$Path, [string[]]$Arguments, [string]$StatusPath)
100:   $item = [ordered]@{ name=$Name; script=$Path; status="FAIL"; exit_code=-1; duration_seconds=0; status_file=$StatusPath; note="" }
101:   if (!(Test-Path -LiteralPath $Path)) {
102:     $item.note = "script missing"
103:     return $item
104:   }
105:   $start = Get-Date
---
122:   }
123:   if ($statusObj -and $statusObj.PSObject.Properties["checked"]) { $item.checked = $statusObj.checked }
124:   if ($statusObj -and $statusObj.PSObject.Properties["passed"]) { $item.passed = $statusObj.passed }
125:   if ($statusObj -and $statusObj.PSObject.Properties["failed"]) { $item.failed = $statusObj.failed }
126:   Write-Step $item.status ("{0} completed with status {1}" -f $Name,$item.status)
127:   return $item
128: }
129: 
130: Ensure-Dir $LogRoot
---
141: $status = "PASS"
142: 
143: if (!(Acquire-RunLock)) {
144:   $status = "REVIEW"
145:   [void]$warnings.Add("orchestrator lock busy")
146: } else {
147:   try {
148:     [void]$steps.Add((Invoke-StepScript -Name "CatalogPromoter" -Path $PromoterScript -Arguments @("-MaxItems",("" + $MaxPromoteItems)) -StatusPath (Join-Path $PublishRoot "catalog_promoter_status.json")))
149:     [void]$steps.Add((Invoke-StepScript -Name "CatalogVisibilityGate" -Path $GateScript -Arguments @("-HideUnready","-MaxItems","500") -StatusPath (Join-Path $PublishRoot "catalog_visibility_gate_status.json")))
---
147:   try {
148:     [void]$steps.Add((Invoke-StepScript -Name "CatalogPromoter" -Path $PromoterScript -Arguments @("-MaxItems",("" + $MaxPromoteItems)) -StatusPath (Join-Path $PublishRoot "catalog_promoter_status.json")))
149:     [void]$steps.Add((Invoke-StepScript -Name "CatalogVisibilityGate" -Path $GateScript -Arguments @("-HideUnready","-MaxItems","500") -StatusPath (Join-Path $PublishRoot "catalog_visibility_gate_status.json")))
150:     [void]$steps.Add((Invoke-StepScript -Name "VisibleCatalogQA" -Path $QaScript -Arguments @("-HideFailed","-MaxItems","0") -StatusPath (Join-Path $PublishRoot "visible_catalog_qa_status.json")))
151:     [void]$steps.Add((Invoke-StepScript -Name "CatalogVisibilityGateFinal" -Path $GateScript -Arguments @("-HideUnready","-MaxItems","500") -StatusPath (Join-Path $PublishRoot "catalog_visibility_gate_status.json")))
152:     [void]$steps.Add((Invoke-StepScript -Name "HealthStatus" -Path $HealthScript -Arguments @() -StatusPath (Join-Path $PublishRoot "scarflix_v2_health.json")))
153:   } finally {
154:     Release-RunLock
155:   }
---
156: }
157: 
158: foreach ($step in @($steps)) {
159:   if ($step.name -eq "VisibleCatalogQA" -and $step.status -ne "PASS") { $status = "REVIEW" }
160:   if ($step.name -like "CatalogVisibilityGate*" -and $step.status -ne "PASS") { $status = "REVIEW" }
161:   if ($step.name -eq "HealthStatus" -and $step.status -ne "PASS") { $status = "REVIEW" }
162:   if ($step.status -eq "FAIL") { $status = "REVIEW" }
163: }
164: 
---
157: 
158: foreach ($step in @($steps)) {
159:   if ($step.name -eq "VisibleCatalogQA" -and $step.status -ne "PASS") { $status = "REVIEW" }
160:   if ($step.name -like "CatalogVisibilityGate*" -and $step.status -ne "PASS") { $status = "REVIEW" }
161:   if ($step.name -eq "HealthStatus" -and $step.status -ne "PASS") { $status = "REVIEW" }
162:   if ($step.status -eq "FAIL") { $status = "REVIEW" }
163: }
164: 
165: $Ended = Get-Date
---
158: foreach ($step in @($steps)) {
159:   if ($step.name -eq "VisibleCatalogQA" -and $step.status -ne "PASS") { $status = "REVIEW" }
160:   if ($step.name -like "CatalogVisibilityGate*" -and $step.status -ne "PASS") { $status = "REVIEW" }
161:   if ($step.name -eq "HealthStatus" -and $step.status -ne "PASS") { $status = "REVIEW" }
162:   if ($step.status -eq "FAIL") { $status = "REVIEW" }
163: }
164: 
165: $Ended = Get-Date
166: $summary = [ordered]@{
---
159:   if ($step.name -eq "VisibleCatalogQA" -and $step.status -ne "PASS") { $status = "REVIEW" }
160:   if ($step.name -like "CatalogVisibilityGate*" -and $step.status -ne "PASS") { $status = "REVIEW" }
161:   if ($step.name -eq "HealthStatus" -and $step.status -ne "PASS") { $status = "REVIEW" }
162:   if ($step.status -eq "FAIL") { $status = "REVIEW" }
163: }
164: 
165: $Ended = Get-Date
166: $summary = [ordered]@{
167:   component = $Component
---
199: Write-Host ("Status JSON: {0}" -f $StatusJson)
200: Write-Host ("Status MD: {0}" -f $StatusMd)
201: 
202: if ($status -eq "FAIL") { exit 1 }
203: exit 0
---
``

## D:\PlexTools\Scripts\scarflix_v2\ScarFLIX_v2_SafeWebDavExpansionPipeline.ps1
``text
25: $HealthScript = Join-Path $ScriptRoot "ScarFLIX_v2_HealthStatus.ps1"
26: $SeederScript = Join-Path $ScriptRoot "ScarFLIX_v2_LiveCatalogSeeder.ps1"
27: $PublisherScript = Join-Path $ScriptRoot "ScarFLIX_v2_WebDavVirtualCatalogPublisher.ps1"
28: $ActiveGateScript = Join-Path $ScriptRoot "ScarFLIX_v2_WebDavActiveGate.ps1"
29: $VisibleQaScript = Join-Path $ScriptRoot "ScarFLIX_v2_VisibleCatalogQA.ps1"
30: $DecisionQaScript = Join-Path $ScriptRoot "ScarFLIX_v2_PlexClientDecisionQA.ps1"
31: $ConcurrentQaScript = Join-Path $ScriptRoot "ScarFLIX_v2_ConcurrentStreamQA.ps1"
32: $SourceQuarantineScript = Join-Path $ScriptRoot "ScarFLIX_v2_SourceQuarantine.ps1"
33: $PlatformGateScript = Join-Path $ScriptRoot "ScarFLIX_v2_PlatformGate.ps1"
---
26: $SeederScript = Join-Path $ScriptRoot "ScarFLIX_v2_LiveCatalogSeeder.ps1"
27: $PublisherScript = Join-Path $ScriptRoot "ScarFLIX_v2_WebDavVirtualCatalogPublisher.ps1"
28: $ActiveGateScript = Join-Path $ScriptRoot "ScarFLIX_v2_WebDavActiveGate.ps1"
29: $VisibleQaScript = Join-Path $ScriptRoot "ScarFLIX_v2_VisibleCatalogQA.ps1"
30: $DecisionQaScript = Join-Path $ScriptRoot "ScarFLIX_v2_PlexClientDecisionQA.ps1"
31: $ConcurrentQaScript = Join-Path $ScriptRoot "ScarFLIX_v2_ConcurrentStreamQA.ps1"
32: $SourceQuarantineScript = Join-Path $ScriptRoot "ScarFLIX_v2_SourceQuarantine.ps1"
33: $PlatformGateScript = Join-Path $ScriptRoot "ScarFLIX_v2_PlatformGate.ps1"
34: $CurationRepairScript = Join-Path $ScriptRoot "ScarFLIX_v2_CurationRepair.ps1"
---
28: $ActiveGateScript = Join-Path $ScriptRoot "ScarFLIX_v2_WebDavActiveGate.ps1"
29: $VisibleQaScript = Join-Path $ScriptRoot "ScarFLIX_v2_VisibleCatalogQA.ps1"
30: $DecisionQaScript = Join-Path $ScriptRoot "ScarFLIX_v2_PlexClientDecisionQA.ps1"
31: $ConcurrentQaScript = Join-Path $ScriptRoot "ScarFLIX_v2_ConcurrentStreamQA.ps1"
32: $SourceQuarantineScript = Join-Path $ScriptRoot "ScarFLIX_v2_SourceQuarantine.ps1"
33: $PlatformGateScript = Join-Path $ScriptRoot "ScarFLIX_v2_PlatformGate.ps1"
34: $CurationRepairScript = Join-Path $ScriptRoot "ScarFLIX_v2_CurationRepair.ps1"
35: $TaskWrapperScript = Join-Path $ScriptRoot "ScarFLIX_v2_SafeWebDavExpansionPipeline_Run.ps1"
36: 
---
30: $DecisionQaScript = Join-Path $ScriptRoot "ScarFLIX_v2_PlexClientDecisionQA.ps1"
31: $ConcurrentQaScript = Join-Path $ScriptRoot "ScarFLIX_v2_ConcurrentStreamQA.ps1"
32: $SourceQuarantineScript = Join-Path $ScriptRoot "ScarFLIX_v2_SourceQuarantine.ps1"
33: $PlatformGateScript = Join-Path $ScriptRoot "ScarFLIX_v2_PlatformGate.ps1"
34: $CurationRepairScript = Join-Path $ScriptRoot "ScarFLIX_v2_CurationRepair.ps1"
35: $TaskWrapperScript = Join-Path $ScriptRoot "ScarFLIX_v2_SafeWebDavExpansionPipeline_Run.ps1"
36: 
37: function Ensure-Dir {
38:   param([string]$Path)
---
142:     [void]$proc.Start()
143:     $finished = $proc.WaitForExit(7200 * 1000)
144:     if (!$finished) {
145:       Write-Step "REVIEW" ("{0} timed out; stopping pid={1}" -f $Name,$proc.Id)
146:       try { & taskkill.exe /PID $proc.Id /T /F | Out-Null } catch {}
147:       $result.exit_code = -2
148:       $result.reason = "child timeout"
149:     } else {
150:       try { $proc.Refresh() } catch {}
---
145:       Write-Step "REVIEW" ("{0} timed out; stopping pid={1}" -f $Name,$proc.Id)
146:       try { & taskkill.exe /PID $proc.Id /T /F | Out-Null } catch {}
147:       $result.exit_code = -2
148:       $result.reason = "child timeout"
149:     } else {
150:       try { $proc.Refresh() } catch {}
151:       try { $result.exit_code = $proc.ExitCode } catch { $result.exit_code = $null }
152:     }
153:     try {
---
164:   if ($result.ok) {
165:     Write-Step "OK" ("{0} completed" -f $Name)
166:   } else {
167:     Write-Step "REVIEW" ("{0} did not pass; exit={1}" -f $Name,$result.exit_code)
168:   }
169:   return $result
170: }
171: 
172: function Count-PendingCandidates {
---
199:   [void]$lines.Add(("- pending before: {0}" -f $Summary.pending_before))
200:   [void]$lines.Add(("- pending after seed: {0}" -f $Summary.pending_after_seed))
201:   [void]$lines.Add(("- pending after publish: {0}" -f $Summary.pending_after_publish))
202:   [void]$lines.Add(("- final WebDAV active gate: {0}" -f $Summary.final_statuses.webdav_active_gate))
203:   [void]$lines.Add(("- final visible catalog QA: {0}" -f $Summary.final_statuses.visible_catalog_qa))
204:   [void]$lines.Add(("- final Plex client decision QA: {0}" -f $Summary.final_statuses.plex_client_decision_qa))
205:   [void]$lines.Add(("- final concurrent stream QA: {0}" -f $Summary.final_statuses.concurrent_stream_qa))
206:   [void]$lines.Add(("- final health: {0}" -f $Summary.final_statuses.health))
207:   [void]$lines.Add("")
---
200:   [void]$lines.Add(("- pending after seed: {0}" -f $Summary.pending_after_seed))
201:   [void]$lines.Add(("- pending after publish: {0}" -f $Summary.pending_after_publish))
202:   [void]$lines.Add(("- final WebDAV active gate: {0}" -f $Summary.final_statuses.webdav_active_gate))
203:   [void]$lines.Add(("- final visible catalog QA: {0}" -f $Summary.final_statuses.visible_catalog_qa))
204:   [void]$lines.Add(("- final Plex client decision QA: {0}" -f $Summary.final_statuses.plex_client_decision_qa))
205:   [void]$lines.Add(("- final concurrent stream QA: {0}" -f $Summary.final_statuses.concurrent_stream_qa))
206:   [void]$lines.Add(("- final health: {0}" -f $Summary.final_statuses.health))
207:   [void]$lines.Add("")
208:   [void]$lines.Add("## Guardrails")
---
201:   [void]$lines.Add(("- pending after publish: {0}" -f $Summary.pending_after_publish))
202:   [void]$lines.Add(("- final WebDAV active gate: {0}" -f $Summary.final_statuses.webdav_active_gate))
203:   [void]$lines.Add(("- final visible catalog QA: {0}" -f $Summary.final_statuses.visible_catalog_qa))
204:   [void]$lines.Add(("- final Plex client decision QA: {0}" -f $Summary.final_statuses.plex_client_decision_qa))
205:   [void]$lines.Add(("- final concurrent stream QA: {0}" -f $Summary.final_statuses.concurrent_stream_qa))
206:   [void]$lines.Add(("- final health: {0}" -f $Summary.final_statuses.health))
207:   [void]$lines.Add("")
208:   [void]$lines.Add("## Guardrails")
209:   [void]$lines.Add("- Stage-only seeding: raw .strm candidates are never scanned by Plex directly.")
---
202:   [void]$lines.Add(("- final WebDAV active gate: {0}" -f $Summary.final_statuses.webdav_active_gate))
203:   [void]$lines.Add(("- final visible catalog QA: {0}" -f $Summary.final_statuses.visible_catalog_qa))
204:   [void]$lines.Add(("- final Plex client decision QA: {0}" -f $Summary.final_statuses.plex_client_decision_qa))
205:   [void]$lines.Add(("- final concurrent stream QA: {0}" -f $Summary.final_statuses.concurrent_stream_qa))
206:   [void]$lines.Add(("- final health: {0}" -f $Summary.final_statuses.health))
207:   [void]$lines.Add("")
208:   [void]$lines.Add("## Guardrails")
209:   [void]$lines.Add("- Stage-only seeding: raw .strm candidates are never scanned by Plex directly.")
210:   [void]$lines.Add("- WebDAV-backed virtual files are published only after policy and playback gates.")
---
210:   [void]$lines.Add("- WebDAV-backed virtual files are published only after policy and playback gates.")
211:   [void]$lines.Add("- Porn/adult and CAM/telesync/telecine candidates are blocked before publishing.")
212:   [void]$lines.Add("- 5-way stream QA is run every cycle.")
213:   [void]$lines.Add("- Final status is taken from the same-snapshot PlatformGate.")
214:   [void]$lines.Add("- Failed visible sources are quarantined; titles remain eligible for alternate sources.")
215:   Write-Utf8NoBom -Path $ReportPath -Text ($lines -join "`r`n")
216: }
217: 
218: function Install-Task {
---
211:   [void]$lines.Add("- Porn/adult and CAM/telesync/telecine candidates are blocked before publishing.")
212:   [void]$lines.Add("- 5-way stream QA is run every cycle.")
213:   [void]$lines.Add("- Final status is taken from the same-snapshot PlatformGate.")
214:   [void]$lines.Add("- Failed visible sources are quarantined; titles remain eligible for alternate sources.")
215:   Write-Utf8NoBom -Path $ReportPath -Text ($lines -join "`r`n")
216: }
217: 
218: function Install-Task {
219:   Ensure-Dir $LogRoot
---
227:   if ($taskExit -eq 0) {
228:     Write-Step "OK" ("Installed hidden scheduled task: {0}" -f $TaskName)
229:   } else {
230:     Write-Step "FAIL" ("Scheduled task install failed: {0} exit={1}" -f $TaskName,$taskExit)
231:     exit $taskExit
232:   }
233: }
234: 
235: Ensure-Dir $LogRoot
---
244: $started = Get-Date
245: $summary = [ordered]@{
246:   component = $Component
247:   status = "REVIEW"
248:   started_utc = $started.ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ")
249:   ended_utc = ""
250:   duration_seconds = 0
251:   install_task = [bool]$InstallTask
252:   run_once = [bool]$RunOnce
---
260:     client_safe_movie_parts = 0
261:     client_safe_tv_parts = 0
262:   }
263:   failures = @()
264:   log = $LogPath
265: }
266: 
267: if (!(Acquire-Lock)) {
268:   $summary.status = "REVIEW"
---
265: }
266: 
267: if (!(Acquire-Lock)) {
268:   $summary.status = "REVIEW"
269:   $summary.failures = @("pipeline lock is active")
270:   $summary.ended_utc = (Get-Date).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ")
271:   Write-JsonFile -Path $StatusPath -Object $summary
272:   Build-Report -Summary $summary
273:   Write-Step "REVIEW" "Pipeline lock is active."
---
266: 
267: if (!(Acquire-Lock)) {
268:   $summary.status = "REVIEW"
269:   $summary.failures = @("pipeline lock is active")
270:   $summary.ended_utc = (Get-Date).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ")
271:   Write-JsonFile -Path $StatusPath -Object $summary
272:   Build-Report -Summary $summary
273:   Write-Step "REVIEW" "Pipeline lock is active."
274:   return
---
``

## D:\PlexTools\Scripts\scarflix_v2\ScarFLIX_v2_SafeWebDavExpansionPipeline.ps1.bak_child_runner_20260603_115858
``text
25: $HealthScript = Join-Path $ScriptRoot "ScarFLIX_v2_HealthStatus.ps1"
26: $SeederScript = Join-Path $ScriptRoot "ScarFLIX_v2_LiveCatalogSeeder.ps1"
27: $PublisherScript = Join-Path $ScriptRoot "ScarFLIX_v2_WebDavVirtualCatalogPublisher.ps1"
28: $ActiveGateScript = Join-Path $ScriptRoot "ScarFLIX_v2_WebDavActiveGate.ps1"
29: $VisibleQaScript = Join-Path $ScriptRoot "ScarFLIX_v2_VisibleCatalogQA.ps1"
30: $DecisionQaScript = Join-Path $ScriptRoot "ScarFLIX_v2_PlexClientDecisionQA.ps1"
31: $ConcurrentQaScript = Join-Path $ScriptRoot "ScarFLIX_v2_ConcurrentStreamQA.ps1"
32: $SourceQuarantineScript = Join-Path $ScriptRoot "ScarFLIX_v2_SourceQuarantine.ps1"
33: $PlatformGateScript = Join-Path $ScriptRoot "ScarFLIX_v2_PlatformGate.ps1"
---
26: $SeederScript = Join-Path $ScriptRoot "ScarFLIX_v2_LiveCatalogSeeder.ps1"
27: $PublisherScript = Join-Path $ScriptRoot "ScarFLIX_v2_WebDavVirtualCatalogPublisher.ps1"
28: $ActiveGateScript = Join-Path $ScriptRoot "ScarFLIX_v2_WebDavActiveGate.ps1"
29: $VisibleQaScript = Join-Path $ScriptRoot "ScarFLIX_v2_VisibleCatalogQA.ps1"
30: $DecisionQaScript = Join-Path $ScriptRoot "ScarFLIX_v2_PlexClientDecisionQA.ps1"
31: $ConcurrentQaScript = Join-Path $ScriptRoot "ScarFLIX_v2_ConcurrentStreamQA.ps1"
32: $SourceQuarantineScript = Join-Path $ScriptRoot "ScarFLIX_v2_SourceQuarantine.ps1"
33: $PlatformGateScript = Join-Path $ScriptRoot "ScarFLIX_v2_PlatformGate.ps1"
34: $TaskWrapperScript = Join-Path $ScriptRoot "ScarFLIX_v2_SafeWebDavExpansionPipeline_Run.ps1"
---
28: $ActiveGateScript = Join-Path $ScriptRoot "ScarFLIX_v2_WebDavActiveGate.ps1"
29: $VisibleQaScript = Join-Path $ScriptRoot "ScarFLIX_v2_VisibleCatalogQA.ps1"
30: $DecisionQaScript = Join-Path $ScriptRoot "ScarFLIX_v2_PlexClientDecisionQA.ps1"
31: $ConcurrentQaScript = Join-Path $ScriptRoot "ScarFLIX_v2_ConcurrentStreamQA.ps1"
32: $SourceQuarantineScript = Join-Path $ScriptRoot "ScarFLIX_v2_SourceQuarantine.ps1"
33: $PlatformGateScript = Join-Path $ScriptRoot "ScarFLIX_v2_PlatformGate.ps1"
34: $TaskWrapperScript = Join-Path $ScriptRoot "ScarFLIX_v2_SafeWebDavExpansionPipeline_Run.ps1"
35: 
36: function Ensure-Dir {
---
30: $DecisionQaScript = Join-Path $ScriptRoot "ScarFLIX_v2_PlexClientDecisionQA.ps1"
31: $ConcurrentQaScript = Join-Path $ScriptRoot "ScarFLIX_v2_ConcurrentStreamQA.ps1"
32: $SourceQuarantineScript = Join-Path $ScriptRoot "ScarFLIX_v2_SourceQuarantine.ps1"
33: $PlatformGateScript = Join-Path $ScriptRoot "ScarFLIX_v2_PlatformGate.ps1"
34: $TaskWrapperScript = Join-Path $ScriptRoot "ScarFLIX_v2_SafeWebDavExpansionPipeline_Run.ps1"
35: 
36: function Ensure-Dir {
37:   param([string]$Path)
38:   if (!(Test-Path -LiteralPath $Path)) {
---
125:   if ($result.ok) {
126:     Write-Step "OK" ("{0} completed" -f $Name)
127:   } else {
128:     Write-Step "REVIEW" ("{0} did not pass; exit={1}" -f $Name,$result.exit_code)
129:   }
130:   return $result
131: }
132: 
133: function Count-PendingCandidates {
---
160:   [void]$lines.Add(("- pending before: {0}" -f $Summary.pending_before))
161:   [void]$lines.Add(("- pending after seed: {0}" -f $Summary.pending_after_seed))
162:   [void]$lines.Add(("- pending after publish: {0}" -f $Summary.pending_after_publish))
163:   [void]$lines.Add(("- final WebDAV active gate: {0}" -f $Summary.final_statuses.webdav_active_gate))
164:   [void]$lines.Add(("- final visible catalog QA: {0}" -f $Summary.final_statuses.visible_catalog_qa))
165:   [void]$lines.Add(("- final Plex client decision QA: {0}" -f $Summary.final_statuses.plex_client_decision_qa))
166:   [void]$lines.Add(("- final concurrent stream QA: {0}" -f $Summary.final_statuses.concurrent_stream_qa))
167:   [void]$lines.Add(("- final health: {0}" -f $Summary.final_statuses.health))
168:   [void]$lines.Add("")
---
161:   [void]$lines.Add(("- pending after seed: {0}" -f $Summary.pending_after_seed))
162:   [void]$lines.Add(("- pending after publish: {0}" -f $Summary.pending_after_publish))
163:   [void]$lines.Add(("- final WebDAV active gate: {0}" -f $Summary.final_statuses.webdav_active_gate))
164:   [void]$lines.Add(("- final visible catalog QA: {0}" -f $Summary.final_statuses.visible_catalog_qa))
165:   [void]$lines.Add(("- final Plex client decision QA: {0}" -f $Summary.final_statuses.plex_client_decision_qa))
166:   [void]$lines.Add(("- final concurrent stream QA: {0}" -f $Summary.final_statuses.concurrent_stream_qa))
167:   [void]$lines.Add(("- final health: {0}" -f $Summary.final_statuses.health))
168:   [void]$lines.Add("")
169:   [void]$lines.Add("## Guardrails")
---
162:   [void]$lines.Add(("- pending after publish: {0}" -f $Summary.pending_after_publish))
163:   [void]$lines.Add(("- final WebDAV active gate: {0}" -f $Summary.final_statuses.webdav_active_gate))
164:   [void]$lines.Add(("- final visible catalog QA: {0}" -f $Summary.final_statuses.visible_catalog_qa))
165:   [void]$lines.Add(("- final Plex client decision QA: {0}" -f $Summary.final_statuses.plex_client_decision_qa))
166:   [void]$lines.Add(("- final concurrent stream QA: {0}" -f $Summary.final_statuses.concurrent_stream_qa))
167:   [void]$lines.Add(("- final health: {0}" -f $Summary.final_statuses.health))
168:   [void]$lines.Add("")
169:   [void]$lines.Add("## Guardrails")
170:   [void]$lines.Add("- Stage-only seeding: raw .strm candidates are never scanned by Plex directly.")
---
163:   [void]$lines.Add(("- final WebDAV active gate: {0}" -f $Summary.final_statuses.webdav_active_gate))
164:   [void]$lines.Add(("- final visible catalog QA: {0}" -f $Summary.final_statuses.visible_catalog_qa))
165:   [void]$lines.Add(("- final Plex client decision QA: {0}" -f $Summary.final_statuses.plex_client_decision_qa))
166:   [void]$lines.Add(("- final concurrent stream QA: {0}" -f $Summary.final_statuses.concurrent_stream_qa))
167:   [void]$lines.Add(("- final health: {0}" -f $Summary.final_statuses.health))
168:   [void]$lines.Add("")
169:   [void]$lines.Add("## Guardrails")
170:   [void]$lines.Add("- Stage-only seeding: raw .strm candidates are never scanned by Plex directly.")
171:   [void]$lines.Add("- WebDAV-backed virtual files are published only after policy and playback gates.")
---
171:   [void]$lines.Add("- WebDAV-backed virtual files are published only after policy and playback gates.")
172:   [void]$lines.Add("- Porn/adult and CAM/telesync/telecine candidates are blocked before publishing.")
173:   [void]$lines.Add("- 5-way stream QA is run every cycle.")
174:   [void]$lines.Add("- Final status is taken from the same-snapshot PlatformGate.")
175:   [void]$lines.Add("- Failed visible sources are quarantined; titles remain eligible for alternate sources.")
176:   Write-Utf8NoBom -Path $ReportPath -Text ($lines -join "`r`n")
177: }
178: 
179: function Install-Task {
---
172:   [void]$lines.Add("- Porn/adult and CAM/telesync/telecine candidates are blocked before publishing.")
173:   [void]$lines.Add("- 5-way stream QA is run every cycle.")
174:   [void]$lines.Add("- Final status is taken from the same-snapshot PlatformGate.")
175:   [void]$lines.Add("- Failed visible sources are quarantined; titles remain eligible for alternate sources.")
176:   Write-Utf8NoBom -Path $ReportPath -Text ($lines -join "`r`n")
177: }
178: 
179: function Install-Task {
180:   Ensure-Dir $LogRoot
---
188:   if ($taskExit -eq 0) {
189:     Write-Step "OK" ("Installed hidden scheduled task: {0}" -f $TaskName)
190:   } else {
191:     Write-Step "FAIL" ("Scheduled task install failed: {0} exit={1}" -f $TaskName,$taskExit)
192:     exit $taskExit
193:   }
194: }
195: 
196: Ensure-Dir $LogRoot
---
205: $started = Get-Date
206: $summary = [ordered]@{
207:   component = $Component
208:   status = "REVIEW"
209:   started_utc = $started.ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ")
210:   ended_utc = ""
211:   duration_seconds = 0
212:   install_task = [bool]$InstallTask
213:   run_once = [bool]$RunOnce
---
221:     client_safe_movie_parts = 0
222:     client_safe_tv_parts = 0
223:   }
224:   failures = @()
225:   log = $LogPath
226: }
227: 
228: if (!(Acquire-Lock)) {
229:   $summary.status = "REVIEW"
---
226: }
227: 
228: if (!(Acquire-Lock)) {
229:   $summary.status = "REVIEW"
230:   $summary.failures = @("pipeline lock is active")
231:   $summary.ended_utc = (Get-Date).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ")
232:   Write-JsonFile -Path $StatusPath -Object $summary
233:   Build-Report -Summary $summary
234:   Write-Step "REVIEW" "Pipeline lock is active."
---
227: 
228: if (!(Acquire-Lock)) {
229:   $summary.status = "REVIEW"
230:   $summary.failures = @("pipeline lock is active")
231:   $summary.ended_utc = (Get-Date).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ")
232:   Write-JsonFile -Path $StatusPath -Object $summary
233:   Build-Report -Summary $summary
234:   Write-Step "REVIEW" "Pipeline lock is active."
235:   return
---
231:   $summary.ended_utc = (Get-Date).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ")
232:   Write-JsonFile -Path $StatusPath -Object $summary
233:   Build-Report -Summary $summary
234:   Write-Step "REVIEW" "Pipeline lock is active."
235:   return
236: }
237: 
238: try {
239:   Write-Step "INFO" "Safe WebDAV expansion pipeline starting."
---
248:   [void]$steps.Add((Invoke-ChildPs -Name "publish_webdav_catalog" -Script $PublisherScript -ChildArgs @("-MaxCandidates", ("" + $PublishMaxCandidates), "-DelayedQaSeconds", ("" + $DelayedQaSeconds))))
249:   $summary.pending_after_publish = Count-PendingCandidates
250: 
251:   $initialPlatformGate = Invoke-ChildPs -Name "platform_gate_initial" -Script $PlatformGateScript -ChildArgs @()
252:   [void]$steps.Add($initialPlatformGate)
253:   if (!$initialPlatformGate.ok) {
254:     [void]$steps.Add((Invoke-ChildPs -Name "source_quarantine_after_platform_gate" -Script $SourceQuarantineScript -ChildArgs @("-IncludeTransient")))
255:     [void]$steps.Add((Invoke-ChildPs -Name "platform_gate_after_quarantine" -Script $PlatformGateScript -ChildArgs @()))
256:   }
---
``

## D:\PlexTools\Scripts\scarflix_v2\ScarFLIX_v2_SafeWebDavExpansionPipeline.ps1.bak_dotnet_runner_20260603_122906
``text
25: $HealthScript = Join-Path $ScriptRoot "ScarFLIX_v2_HealthStatus.ps1"
26: $SeederScript = Join-Path $ScriptRoot "ScarFLIX_v2_LiveCatalogSeeder.ps1"
27: $PublisherScript = Join-Path $ScriptRoot "ScarFLIX_v2_WebDavVirtualCatalogPublisher.ps1"
28: $ActiveGateScript = Join-Path $ScriptRoot "ScarFLIX_v2_WebDavActiveGate.ps1"
29: $VisibleQaScript = Join-Path $ScriptRoot "ScarFLIX_v2_VisibleCatalogQA.ps1"
30: $DecisionQaScript = Join-Path $ScriptRoot "ScarFLIX_v2_PlexClientDecisionQA.ps1"
31: $ConcurrentQaScript = Join-Path $ScriptRoot "ScarFLIX_v2_ConcurrentStreamQA.ps1"
32: $SourceQuarantineScript = Join-Path $ScriptRoot "ScarFLIX_v2_SourceQuarantine.ps1"
33: $PlatformGateScript = Join-Path $ScriptRoot "ScarFLIX_v2_PlatformGate.ps1"
---
26: $SeederScript = Join-Path $ScriptRoot "ScarFLIX_v2_LiveCatalogSeeder.ps1"
27: $PublisherScript = Join-Path $ScriptRoot "ScarFLIX_v2_WebDavVirtualCatalogPublisher.ps1"
28: $ActiveGateScript = Join-Path $ScriptRoot "ScarFLIX_v2_WebDavActiveGate.ps1"
29: $VisibleQaScript = Join-Path $ScriptRoot "ScarFLIX_v2_VisibleCatalogQA.ps1"
30: $DecisionQaScript = Join-Path $ScriptRoot "ScarFLIX_v2_PlexClientDecisionQA.ps1"
31: $ConcurrentQaScript = Join-Path $ScriptRoot "ScarFLIX_v2_ConcurrentStreamQA.ps1"
32: $SourceQuarantineScript = Join-Path $ScriptRoot "ScarFLIX_v2_SourceQuarantine.ps1"
33: $PlatformGateScript = Join-Path $ScriptRoot "ScarFLIX_v2_PlatformGate.ps1"
34: $CurationRepairScript = Join-Path $ScriptRoot "ScarFLIX_v2_CurationRepair.ps1"
---
28: $ActiveGateScript = Join-Path $ScriptRoot "ScarFLIX_v2_WebDavActiveGate.ps1"
29: $VisibleQaScript = Join-Path $ScriptRoot "ScarFLIX_v2_VisibleCatalogQA.ps1"
30: $DecisionQaScript = Join-Path $ScriptRoot "ScarFLIX_v2_PlexClientDecisionQA.ps1"
31: $ConcurrentQaScript = Join-Path $ScriptRoot "ScarFLIX_v2_ConcurrentStreamQA.ps1"
32: $SourceQuarantineScript = Join-Path $ScriptRoot "ScarFLIX_v2_SourceQuarantine.ps1"
33: $PlatformGateScript = Join-Path $ScriptRoot "ScarFLIX_v2_PlatformGate.ps1"
34: $CurationRepairScript = Join-Path $ScriptRoot "ScarFLIX_v2_CurationRepair.ps1"
35: $TaskWrapperScript = Join-Path $ScriptRoot "ScarFLIX_v2_SafeWebDavExpansionPipeline_Run.ps1"
36: 
---
30: $DecisionQaScript = Join-Path $ScriptRoot "ScarFLIX_v2_PlexClientDecisionQA.ps1"
31: $ConcurrentQaScript = Join-Path $ScriptRoot "ScarFLIX_v2_ConcurrentStreamQA.ps1"
32: $SourceQuarantineScript = Join-Path $ScriptRoot "ScarFLIX_v2_SourceQuarantine.ps1"
33: $PlatformGateScript = Join-Path $ScriptRoot "ScarFLIX_v2_PlatformGate.ps1"
34: $CurationRepairScript = Join-Path $ScriptRoot "ScarFLIX_v2_CurationRepair.ps1"
35: $TaskWrapperScript = Join-Path $ScriptRoot "ScarFLIX_v2_SafeWebDavExpansionPipeline_Run.ps1"
36: 
37: function Ensure-Dir {
38:   param([string]$Path)
---
120:     $proc = Start-Process -FilePath "C:\Windows\System32\WindowsPowerShell\v1.0\powershell.exe" -ArgumentList $argList -WindowStyle Hidden -RedirectStandardOutput $childOut -RedirectStandardError $childErr -PassThru
121:     $finished = $proc.WaitForExit(7200 * 1000)
122:     if (!$finished) {
123:       Write-Step "REVIEW" ("{0} timed out; stopping pid={1}" -f $Name,$proc.Id)
124:       try { & taskkill.exe /PID $proc.Id /T /F | Out-Null } catch {}
125:       $result.exit_code = -2
126:       $result.reason = "child timeout"
127:     } else {
128:       try { $proc.Refresh() } catch {}
---
123:       Write-Step "REVIEW" ("{0} timed out; stopping pid={1}" -f $Name,$proc.Id)
124:       try { & taskkill.exe /PID $proc.Id /T /F | Out-Null } catch {}
125:       $result.exit_code = -2
126:       $result.reason = "child timeout"
127:     } else {
128:       try { $proc.Refresh() } catch {}
129:       try { $result.exit_code = $proc.ExitCode } catch { $result.exit_code = $null }
130:     }
131:     try {
---
144:   if ($result.ok) {
145:     Write-Step "OK" ("{0} completed" -f $Name)
146:   } else {
147:     Write-Step "REVIEW" ("{0} did not pass; exit={1}" -f $Name,$result.exit_code)
148:   }
149:   return $result
150: }
151: 
152: function Count-PendingCandidates {
---
179:   [void]$lines.Add(("- pending before: {0}" -f $Summary.pending_before))
180:   [void]$lines.Add(("- pending after seed: {0}" -f $Summary.pending_after_seed))
181:   [void]$lines.Add(("- pending after publish: {0}" -f $Summary.pending_after_publish))
182:   [void]$lines.Add(("- final WebDAV active gate: {0}" -f $Summary.final_statuses.webdav_active_gate))
183:   [void]$lines.Add(("- final visible catalog QA: {0}" -f $Summary.final_statuses.visible_catalog_qa))
184:   [void]$lines.Add(("- final Plex client decision QA: {0}" -f $Summary.final_statuses.plex_client_decision_qa))
185:   [void]$lines.Add(("- final concurrent stream QA: {0}" -f $Summary.final_statuses.concurrent_stream_qa))
186:   [void]$lines.Add(("- final health: {0}" -f $Summary.final_statuses.health))
187:   [void]$lines.Add("")
---
180:   [void]$lines.Add(("- pending after seed: {0}" -f $Summary.pending_after_seed))
181:   [void]$lines.Add(("- pending after publish: {0}" -f $Summary.pending_after_publish))
182:   [void]$lines.Add(("- final WebDAV active gate: {0}" -f $Summary.final_statuses.webdav_active_gate))
183:   [void]$lines.Add(("- final visible catalog QA: {0}" -f $Summary.final_statuses.visible_catalog_qa))
184:   [void]$lines.Add(("- final Plex client decision QA: {0}" -f $Summary.final_statuses.plex_client_decision_qa))
185:   [void]$lines.Add(("- final concurrent stream QA: {0}" -f $Summary.final_statuses.concurrent_stream_qa))
186:   [void]$lines.Add(("- final health: {0}" -f $Summary.final_statuses.health))
187:   [void]$lines.Add("")
188:   [void]$lines.Add("## Guardrails")
---
181:   [void]$lines.Add(("- pending after publish: {0}" -f $Summary.pending_after_publish))
182:   [void]$lines.Add(("- final WebDAV active gate: {0}" -f $Summary.final_statuses.webdav_active_gate))
183:   [void]$lines.Add(("- final visible catalog QA: {0}" -f $Summary.final_statuses.visible_catalog_qa))
184:   [void]$lines.Add(("- final Plex client decision QA: {0}" -f $Summary.final_statuses.plex_client_decision_qa))
185:   [void]$lines.Add(("- final concurrent stream QA: {0}" -f $Summary.final_statuses.concurrent_stream_qa))
186:   [void]$lines.Add(("- final health: {0}" -f $Summary.final_statuses.health))
187:   [void]$lines.Add("")
188:   [void]$lines.Add("## Guardrails")
189:   [void]$lines.Add("- Stage-only seeding: raw .strm candidates are never scanned by Plex directly.")
---
182:   [void]$lines.Add(("- final WebDAV active gate: {0}" -f $Summary.final_statuses.webdav_active_gate))
183:   [void]$lines.Add(("- final visible catalog QA: {0}" -f $Summary.final_statuses.visible_catalog_qa))
184:   [void]$lines.Add(("- final Plex client decision QA: {0}" -f $Summary.final_statuses.plex_client_decision_qa))
185:   [void]$lines.Add(("- final concurrent stream QA: {0}" -f $Summary.final_statuses.concurrent_stream_qa))
186:   [void]$lines.Add(("- final health: {0}" -f $Summary.final_statuses.health))
187:   [void]$lines.Add("")
188:   [void]$lines.Add("## Guardrails")
189:   [void]$lines.Add("- Stage-only seeding: raw .strm candidates are never scanned by Plex directly.")
190:   [void]$lines.Add("- WebDAV-backed virtual files are published only after policy and playback gates.")
---
190:   [void]$lines.Add("- WebDAV-backed virtual files are published only after policy and playback gates.")
191:   [void]$lines.Add("- Porn/adult and CAM/telesync/telecine candidates are blocked before publishing.")
192:   [void]$lines.Add("- 5-way stream QA is run every cycle.")
193:   [void]$lines.Add("- Final status is taken from the same-snapshot PlatformGate.")
194:   [void]$lines.Add("- Failed visible sources are quarantined; titles remain eligible for alternate sources.")
195:   Write-Utf8NoBom -Path $ReportPath -Text ($lines -join "`r`n")
196: }
197: 
198: function Install-Task {
---
191:   [void]$lines.Add("- Porn/adult and CAM/telesync/telecine candidates are blocked before publishing.")
192:   [void]$lines.Add("- 5-way stream QA is run every cycle.")
193:   [void]$lines.Add("- Final status is taken from the same-snapshot PlatformGate.")
194:   [void]$lines.Add("- Failed visible sources are quarantined; titles remain eligible for alternate sources.")
195:   Write-Utf8NoBom -Path $ReportPath -Text ($lines -join "`r`n")
196: }
197: 
198: function Install-Task {
199:   Ensure-Dir $LogRoot
---
207:   if ($taskExit -eq 0) {
208:     Write-Step "OK" ("Installed hidden scheduled task: {0}" -f $TaskName)
209:   } else {
210:     Write-Step "FAIL" ("Scheduled task install failed: {0} exit={1}" -f $TaskName,$taskExit)
211:     exit $taskExit
212:   }
213: }
214: 
215: Ensure-Dir $LogRoot
---
224: $started = Get-Date
225: $summary = [ordered]@{
226:   component = $Component
227:   status = "REVIEW"
228:   started_utc = $started.ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ")
229:   ended_utc = ""
230:   duration_seconds = 0
231:   install_task = [bool]$InstallTask
232:   run_once = [bool]$RunOnce
---
240:     client_safe_movie_parts = 0
241:     client_safe_tv_parts = 0
242:   }
243:   failures = @()
244:   log = $LogPath
245: }
246: 
247: if (!(Acquire-Lock)) {
248:   $summary.status = "REVIEW"
---
245: }
246: 
247: if (!(Acquire-Lock)) {
248:   $summary.status = "REVIEW"
249:   $summary.failures = @("pipeline lock is active")
250:   $summary.ended_utc = (Get-Date).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ")
251:   Write-JsonFile -Path $StatusPath -Object $summary
252:   Build-Report -Summary $summary
253:   Write-Step "REVIEW" "Pipeline lock is active."
---
246: 
247: if (!(Acquire-Lock)) {
248:   $summary.status = "REVIEW"
249:   $summary.failures = @("pipeline lock is active")
250:   $summary.ended_utc = (Get-Date).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ")
251:   Write-JsonFile -Path $StatusPath -Object $summary
252:   Build-Report -Summary $summary
253:   Write-Step "REVIEW" "Pipeline lock is active."
254:   return
---
``

## D:\PlexTools\Scripts\scarflix_v2\ScarFLIX_v2_SafeWebDavExpansionPipeline.ps1.bak_join_child_args_20260603_123157
``text
25: $HealthScript = Join-Path $ScriptRoot "ScarFLIX_v2_HealthStatus.ps1"
26: $SeederScript = Join-Path $ScriptRoot "ScarFLIX_v2_LiveCatalogSeeder.ps1"
27: $PublisherScript = Join-Path $ScriptRoot "ScarFLIX_v2_WebDavVirtualCatalogPublisher.ps1"
28: $ActiveGateScript = Join-Path $ScriptRoot "ScarFLIX_v2_WebDavActiveGate.ps1"
29: $VisibleQaScript = Join-Path $ScriptRoot "ScarFLIX_v2_VisibleCatalogQA.ps1"
30: $DecisionQaScript = Join-Path $ScriptRoot "ScarFLIX_v2_PlexClientDecisionQA.ps1"
31: $ConcurrentQaScript = Join-Path $ScriptRoot "ScarFLIX_v2_ConcurrentStreamQA.ps1"
32: $SourceQuarantineScript = Join-Path $ScriptRoot "ScarFLIX_v2_SourceQuarantine.ps1"
33: $PlatformGateScript = Join-Path $ScriptRoot "ScarFLIX_v2_PlatformGate.ps1"
---
26: $SeederScript = Join-Path $ScriptRoot "ScarFLIX_v2_LiveCatalogSeeder.ps1"
27: $PublisherScript = Join-Path $ScriptRoot "ScarFLIX_v2_WebDavVirtualCatalogPublisher.ps1"
28: $ActiveGateScript = Join-Path $ScriptRoot "ScarFLIX_v2_WebDavActiveGate.ps1"
29: $VisibleQaScript = Join-Path $ScriptRoot "ScarFLIX_v2_VisibleCatalogQA.ps1"
30: $DecisionQaScript = Join-Path $ScriptRoot "ScarFLIX_v2_PlexClientDecisionQA.ps1"
31: $ConcurrentQaScript = Join-Path $ScriptRoot "ScarFLIX_v2_ConcurrentStreamQA.ps1"
32: $SourceQuarantineScript = Join-Path $ScriptRoot "ScarFLIX_v2_SourceQuarantine.ps1"
33: $PlatformGateScript = Join-Path $ScriptRoot "ScarFLIX_v2_PlatformGate.ps1"
34: $CurationRepairScript = Join-Path $ScriptRoot "ScarFLIX_v2_CurationRepair.ps1"
---
28: $ActiveGateScript = Join-Path $ScriptRoot "ScarFLIX_v2_WebDavActiveGate.ps1"
29: $VisibleQaScript = Join-Path $ScriptRoot "ScarFLIX_v2_VisibleCatalogQA.ps1"
30: $DecisionQaScript = Join-Path $ScriptRoot "ScarFLIX_v2_PlexClientDecisionQA.ps1"
31: $ConcurrentQaScript = Join-Path $ScriptRoot "ScarFLIX_v2_ConcurrentStreamQA.ps1"
32: $SourceQuarantineScript = Join-Path $ScriptRoot "ScarFLIX_v2_SourceQuarantine.ps1"
33: $PlatformGateScript = Join-Path $ScriptRoot "ScarFLIX_v2_PlatformGate.ps1"
34: $CurationRepairScript = Join-Path $ScriptRoot "ScarFLIX_v2_CurationRepair.ps1"
35: $TaskWrapperScript = Join-Path $ScriptRoot "ScarFLIX_v2_SafeWebDavExpansionPipeline_Run.ps1"
36: 
---
30: $DecisionQaScript = Join-Path $ScriptRoot "ScarFLIX_v2_PlexClientDecisionQA.ps1"
31: $ConcurrentQaScript = Join-Path $ScriptRoot "ScarFLIX_v2_ConcurrentStreamQA.ps1"
32: $SourceQuarantineScript = Join-Path $ScriptRoot "ScarFLIX_v2_SourceQuarantine.ps1"
33: $PlatformGateScript = Join-Path $ScriptRoot "ScarFLIX_v2_PlatformGate.ps1"
34: $CurationRepairScript = Join-Path $ScriptRoot "ScarFLIX_v2_CurationRepair.ps1"
35: $TaskWrapperScript = Join-Path $ScriptRoot "ScarFLIX_v2_SafeWebDavExpansionPipeline_Run.ps1"
36: 
37: function Ensure-Dir {
38:   param([string]$Path)
---
126:     [void]$proc.Start()
127:     $finished = $proc.WaitForExit(7200 * 1000)
128:     if (!$finished) {
129:       Write-Step "REVIEW" ("{0} timed out; stopping pid={1}" -f $Name,$proc.Id)
130:       try { & taskkill.exe /PID $proc.Id /T /F | Out-Null } catch {}
131:       $result.exit_code = -2
132:       $result.reason = "child timeout"
133:     } else {
134:       try { $proc.Refresh() } catch {}
---
129:       Write-Step "REVIEW" ("{0} timed out; stopping pid={1}" -f $Name,$proc.Id)
130:       try { & taskkill.exe /PID $proc.Id /T /F | Out-Null } catch {}
131:       $result.exit_code = -2
132:       $result.reason = "child timeout"
133:     } else {
134:       try { $proc.Refresh() } catch {}
135:       try { $result.exit_code = $proc.ExitCode } catch { $result.exit_code = $null }
136:     }
137:     try {
---
148:   if ($result.ok) {
149:     Write-Step "OK" ("{0} completed" -f $Name)
150:   } else {
151:     Write-Step "REVIEW" ("{0} did not pass; exit={1}" -f $Name,$result.exit_code)
152:   }
153:   return $result
154: }
155: 
156: function Count-PendingCandidates {
---
183:   [void]$lines.Add(("- pending before: {0}" -f $Summary.pending_before))
184:   [void]$lines.Add(("- pending after seed: {0}" -f $Summary.pending_after_seed))
185:   [void]$lines.Add(("- pending after publish: {0}" -f $Summary.pending_after_publish))
186:   [void]$lines.Add(("- final WebDAV active gate: {0}" -f $Summary.final_statuses.webdav_active_gate))
187:   [void]$lines.Add(("- final visible catalog QA: {0}" -f $Summary.final_statuses.visible_catalog_qa))
188:   [void]$lines.Add(("- final Plex client decision QA: {0}" -f $Summary.final_statuses.plex_client_decision_qa))
189:   [void]$lines.Add(("- final concurrent stream QA: {0}" -f $Summary.final_statuses.concurrent_stream_qa))
190:   [void]$lines.Add(("- final health: {0}" -f $Summary.final_statuses.health))
191:   [void]$lines.Add("")
---
184:   [void]$lines.Add(("- pending after seed: {0}" -f $Summary.pending_after_seed))
185:   [void]$lines.Add(("- pending after publish: {0}" -f $Summary.pending_after_publish))
186:   [void]$lines.Add(("- final WebDAV active gate: {0}" -f $Summary.final_statuses.webdav_active_gate))
187:   [void]$lines.Add(("- final visible catalog QA: {0}" -f $Summary.final_statuses.visible_catalog_qa))
188:   [void]$lines.Add(("- final Plex client decision QA: {0}" -f $Summary.final_statuses.plex_client_decision_qa))
189:   [void]$lines.Add(("- final concurrent stream QA: {0}" -f $Summary.final_statuses.concurrent_stream_qa))
190:   [void]$lines.Add(("- final health: {0}" -f $Summary.final_statuses.health))
191:   [void]$lines.Add("")
192:   [void]$lines.Add("## Guardrails")
---
185:   [void]$lines.Add(("- pending after publish: {0}" -f $Summary.pending_after_publish))
186:   [void]$lines.Add(("- final WebDAV active gate: {0}" -f $Summary.final_statuses.webdav_active_gate))
187:   [void]$lines.Add(("- final visible catalog QA: {0}" -f $Summary.final_statuses.visible_catalog_qa))
188:   [void]$lines.Add(("- final Plex client decision QA: {0}" -f $Summary.final_statuses.plex_client_decision_qa))
189:   [void]$lines.Add(("- final concurrent stream QA: {0}" -f $Summary.final_statuses.concurrent_stream_qa))
190:   [void]$lines.Add(("- final health: {0}" -f $Summary.final_statuses.health))
191:   [void]$lines.Add("")
192:   [void]$lines.Add("## Guardrails")
193:   [void]$lines.Add("- Stage-only seeding: raw .strm candidates are never scanned by Plex directly.")
---
186:   [void]$lines.Add(("- final WebDAV active gate: {0}" -f $Summary.final_statuses.webdav_active_gate))
187:   [void]$lines.Add(("- final visible catalog QA: {0}" -f $Summary.final_statuses.visible_catalog_qa))
188:   [void]$lines.Add(("- final Plex client decision QA: {0}" -f $Summary.final_statuses.plex_client_decision_qa))
189:   [void]$lines.Add(("- final concurrent stream QA: {0}" -f $Summary.final_statuses.concurrent_stream_qa))
190:   [void]$lines.Add(("- final health: {0}" -f $Summary.final_statuses.health))
191:   [void]$lines.Add("")
192:   [void]$lines.Add("## Guardrails")
193:   [void]$lines.Add("- Stage-only seeding: raw .strm candidates are never scanned by Plex directly.")
194:   [void]$lines.Add("- WebDAV-backed virtual files are published only after policy and playback gates.")
---
194:   [void]$lines.Add("- WebDAV-backed virtual files are published only after policy and playback gates.")
195:   [void]$lines.Add("- Porn/adult and CAM/telesync/telecine candidates are blocked before publishing.")
196:   [void]$lines.Add("- 5-way stream QA is run every cycle.")
197:   [void]$lines.Add("- Final status is taken from the same-snapshot PlatformGate.")
198:   [void]$lines.Add("- Failed visible sources are quarantined; titles remain eligible for alternate sources.")
199:   Write-Utf8NoBom -Path $ReportPath -Text ($lines -join "`r`n")
200: }
201: 
202: function Install-Task {
---
195:   [void]$lines.Add("- Porn/adult and CAM/telesync/telecine candidates are blocked before publishing.")
196:   [void]$lines.Add("- 5-way stream QA is run every cycle.")
197:   [void]$lines.Add("- Final status is taken from the same-snapshot PlatformGate.")
198:   [void]$lines.Add("- Failed visible sources are quarantined; titles remain eligible for alternate sources.")
199:   Write-Utf8NoBom -Path $ReportPath -Text ($lines -join "`r`n")
200: }
201: 
202: function Install-Task {
203:   Ensure-Dir $LogRoot
---
211:   if ($taskExit -eq 0) {
212:     Write-Step "OK" ("Installed hidden scheduled task: {0}" -f $TaskName)
213:   } else {
214:     Write-Step "FAIL" ("Scheduled task install failed: {0} exit={1}" -f $TaskName,$taskExit)
215:     exit $taskExit
216:   }
217: }
218: 
219: Ensure-Dir $LogRoot
---
228: $started = Get-Date
229: $summary = [ordered]@{
230:   component = $Component
231:   status = "REVIEW"
232:   started_utc = $started.ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ")
233:   ended_utc = ""
234:   duration_seconds = 0
235:   install_task = [bool]$InstallTask
236:   run_once = [bool]$RunOnce
---
244:     client_safe_movie_parts = 0
245:     client_safe_tv_parts = 0
246:   }
247:   failures = @()
248:   log = $LogPath
249: }
250: 
251: if (!(Acquire-Lock)) {
252:   $summary.status = "REVIEW"
---
249: }
250: 
251: if (!(Acquire-Lock)) {
252:   $summary.status = "REVIEW"
253:   $summary.failures = @("pipeline lock is active")
254:   $summary.ended_utc = (Get-Date).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ")
255:   Write-JsonFile -Path $StatusPath -Object $summary
256:   Build-Report -Summary $summary
257:   Write-Step "REVIEW" "Pipeline lock is active."
---
250: 
251: if (!(Acquire-Lock)) {
252:   $summary.status = "REVIEW"
253:   $summary.failures = @("pipeline lock is active")
254:   $summary.ended_utc = (Get-Date).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ")
255:   Write-JsonFile -Path $StatusPath -Object $summary
256:   Build-Report -Summary $summary
257:   Write-Step "REVIEW" "Pipeline lock is active."
258:   return
---
``

## D:\PlexTools\Scripts\scarflix_v2\ScarFLIX_v2_SafeWebDavExpansionPipeline.ps1.bak_optional_source_quarantine_20260603_124125
``text
25: $HealthScript = Join-Path $ScriptRoot "ScarFLIX_v2_HealthStatus.ps1"
26: $SeederScript = Join-Path $ScriptRoot "ScarFLIX_v2_LiveCatalogSeeder.ps1"
27: $PublisherScript = Join-Path $ScriptRoot "ScarFLIX_v2_WebDavVirtualCatalogPublisher.ps1"
28: $ActiveGateScript = Join-Path $ScriptRoot "ScarFLIX_v2_WebDavActiveGate.ps1"
29: $VisibleQaScript = Join-Path $ScriptRoot "ScarFLIX_v2_VisibleCatalogQA.ps1"
30: $DecisionQaScript = Join-Path $ScriptRoot "ScarFLIX_v2_PlexClientDecisionQA.ps1"
31: $ConcurrentQaScript = Join-Path $ScriptRoot "ScarFLIX_v2_ConcurrentStreamQA.ps1"
32: $SourceQuarantineScript = Join-Path $ScriptRoot "ScarFLIX_v2_SourceQuarantine.ps1"
33: $PlatformGateScript = Join-Path $ScriptRoot "ScarFLIX_v2_PlatformGate.ps1"
---
26: $SeederScript = Join-Path $ScriptRoot "ScarFLIX_v2_LiveCatalogSeeder.ps1"
27: $PublisherScript = Join-Path $ScriptRoot "ScarFLIX_v2_WebDavVirtualCatalogPublisher.ps1"
28: $ActiveGateScript = Join-Path $ScriptRoot "ScarFLIX_v2_WebDavActiveGate.ps1"
29: $VisibleQaScript = Join-Path $ScriptRoot "ScarFLIX_v2_VisibleCatalogQA.ps1"
30: $DecisionQaScript = Join-Path $ScriptRoot "ScarFLIX_v2_PlexClientDecisionQA.ps1"
31: $ConcurrentQaScript = Join-Path $ScriptRoot "ScarFLIX_v2_ConcurrentStreamQA.ps1"
32: $SourceQuarantineScript = Join-Path $ScriptRoot "ScarFLIX_v2_SourceQuarantine.ps1"
33: $PlatformGateScript = Join-Path $ScriptRoot "ScarFLIX_v2_PlatformGate.ps1"
34: $CurationRepairScript = Join-Path $ScriptRoot "ScarFLIX_v2_CurationRepair.ps1"
---
28: $ActiveGateScript = Join-Path $ScriptRoot "ScarFLIX_v2_WebDavActiveGate.ps1"
29: $VisibleQaScript = Join-Path $ScriptRoot "ScarFLIX_v2_VisibleCatalogQA.ps1"
30: $DecisionQaScript = Join-Path $ScriptRoot "ScarFLIX_v2_PlexClientDecisionQA.ps1"
31: $ConcurrentQaScript = Join-Path $ScriptRoot "ScarFLIX_v2_ConcurrentStreamQA.ps1"
32: $SourceQuarantineScript = Join-Path $ScriptRoot "ScarFLIX_v2_SourceQuarantine.ps1"
33: $PlatformGateScript = Join-Path $ScriptRoot "ScarFLIX_v2_PlatformGate.ps1"
34: $CurationRepairScript = Join-Path $ScriptRoot "ScarFLIX_v2_CurationRepair.ps1"
35: $TaskWrapperScript = Join-Path $ScriptRoot "ScarFLIX_v2_SafeWebDavExpansionPipeline_Run.ps1"
36: 
---
30: $DecisionQaScript = Join-Path $ScriptRoot "ScarFLIX_v2_PlexClientDecisionQA.ps1"
31: $ConcurrentQaScript = Join-Path $ScriptRoot "ScarFLIX_v2_ConcurrentStreamQA.ps1"
32: $SourceQuarantineScript = Join-Path $ScriptRoot "ScarFLIX_v2_SourceQuarantine.ps1"
33: $PlatformGateScript = Join-Path $ScriptRoot "ScarFLIX_v2_PlatformGate.ps1"
34: $CurationRepairScript = Join-Path $ScriptRoot "ScarFLIX_v2_CurationRepair.ps1"
35: $TaskWrapperScript = Join-Path $ScriptRoot "ScarFLIX_v2_SafeWebDavExpansionPipeline_Run.ps1"
36: 
37: function Ensure-Dir {
38:   param([string]$Path)
---
142:     [void]$proc.Start()
143:     $finished = $proc.WaitForExit(7200 * 1000)
144:     if (!$finished) {
145:       Write-Step "REVIEW" ("{0} timed out; stopping pid={1}" -f $Name,$proc.Id)
146:       try { & taskkill.exe /PID $proc.Id /T /F | Out-Null } catch {}
147:       $result.exit_code = -2
148:       $result.reason = "child timeout"
149:     } else {
150:       try { $proc.Refresh() } catch {}
---
145:       Write-Step "REVIEW" ("{0} timed out; stopping pid={1}" -f $Name,$proc.Id)
146:       try { & taskkill.exe /PID $proc.Id /T /F | Out-Null } catch {}
147:       $result.exit_code = -2
148:       $result.reason = "child timeout"
149:     } else {
150:       try { $proc.Refresh() } catch {}
151:       try { $result.exit_code = $proc.ExitCode } catch { $result.exit_code = $null }
152:     }
153:     try {
---
164:   if ($result.ok) {
165:     Write-Step "OK" ("{0} completed" -f $Name)
166:   } else {
167:     Write-Step "REVIEW" ("{0} did not pass; exit={1}" -f $Name,$result.exit_code)
168:   }
169:   return $result
170: }
171: 
172: function Count-PendingCandidates {
---
199:   [void]$lines.Add(("- pending before: {0}" -f $Summary.pending_before))
200:   [void]$lines.Add(("- pending after seed: {0}" -f $Summary.pending_after_seed))
201:   [void]$lines.Add(("- pending after publish: {0}" -f $Summary.pending_after_publish))
202:   [void]$lines.Add(("- final WebDAV active gate: {0}" -f $Summary.final_statuses.webdav_active_gate))
203:   [void]$lines.Add(("- final visible catalog QA: {0}" -f $Summary.final_statuses.visible_catalog_qa))
204:   [void]$lines.Add(("- final Plex client decision QA: {0}" -f $Summary.final_statuses.plex_client_decision_qa))
205:   [void]$lines.Add(("- final concurrent stream QA: {0}" -f $Summary.final_statuses.concurrent_stream_qa))
206:   [void]$lines.Add(("- final health: {0}" -f $Summary.final_statuses.health))
207:   [void]$lines.Add("")
---
200:   [void]$lines.Add(("- pending after seed: {0}" -f $Summary.pending_after_seed))
201:   [void]$lines.Add(("- pending after publish: {0}" -f $Summary.pending_after_publish))
202:   [void]$lines.Add(("- final WebDAV active gate: {0}" -f $Summary.final_statuses.webdav_active_gate))
203:   [void]$lines.Add(("- final visible catalog QA: {0}" -f $Summary.final_statuses.visible_catalog_qa))
204:   [void]$lines.Add(("- final Plex client decision QA: {0}" -f $Summary.final_statuses.plex_client_decision_qa))
205:   [void]$lines.Add(("- final concurrent stream QA: {0}" -f $Summary.final_statuses.concurrent_stream_qa))
206:   [void]$lines.Add(("- final health: {0}" -f $Summary.final_statuses.health))
207:   [void]$lines.Add("")
208:   [void]$lines.Add("## Guardrails")
---
201:   [void]$lines.Add(("- pending after publish: {0}" -f $Summary.pending_after_publish))
202:   [void]$lines.Add(("- final WebDAV active gate: {0}" -f $Summary.final_statuses.webdav_active_gate))
203:   [void]$lines.Add(("- final visible catalog QA: {0}" -f $Summary.final_statuses.visible_catalog_qa))
204:   [void]$lines.Add(("- final Plex client decision QA: {0}" -f $Summary.final_statuses.plex_client_decision_qa))
205:   [void]$lines.Add(("- final concurrent stream QA: {0}" -f $Summary.final_statuses.concurrent_stream_qa))
206:   [void]$lines.Add(("- final health: {0}" -f $Summary.final_statuses.health))
207:   [void]$lines.Add("")
208:   [void]$lines.Add("## Guardrails")
209:   [void]$lines.Add("- Stage-only seeding: raw .strm candidates are never scanned by Plex directly.")
---
202:   [void]$lines.Add(("- final WebDAV active gate: {0}" -f $Summary.final_statuses.webdav_active_gate))
203:   [void]$lines.Add(("- final visible catalog QA: {0}" -f $Summary.final_statuses.visible_catalog_qa))
204:   [void]$lines.Add(("- final Plex client decision QA: {0}" -f $Summary.final_statuses.plex_client_decision_qa))
205:   [void]$lines.Add(("- final concurrent stream QA: {0}" -f $Summary.final_statuses.concurrent_stream_qa))
206:   [void]$lines.Add(("- final health: {0}" -f $Summary.final_statuses.health))
207:   [void]$lines.Add("")
208:   [void]$lines.Add("## Guardrails")
209:   [void]$lines.Add("- Stage-only seeding: raw .strm candidates are never scanned by Plex directly.")
210:   [void]$lines.Add("- WebDAV-backed virtual files are published only after policy and playback gates.")
---
210:   [void]$lines.Add("- WebDAV-backed virtual files are published only after policy and playback gates.")
211:   [void]$lines.Add("- Porn/adult and CAM/telesync/telecine candidates are blocked before publishing.")
212:   [void]$lines.Add("- 5-way stream QA is run every cycle.")
213:   [void]$lines.Add("- Final status is taken from the same-snapshot PlatformGate.")
214:   [void]$lines.Add("- Failed visible sources are quarantined; titles remain eligible for alternate sources.")
215:   Write-Utf8NoBom -Path $ReportPath -Text ($lines -join "`r`n")
216: }
217: 
218: function Install-Task {
---
211:   [void]$lines.Add("- Porn/adult and CAM/telesync/telecine candidates are blocked before publishing.")
212:   [void]$lines.Add("- 5-way stream QA is run every cycle.")
213:   [void]$lines.Add("- Final status is taken from the same-snapshot PlatformGate.")
214:   [void]$lines.Add("- Failed visible sources are quarantined; titles remain eligible for alternate sources.")
215:   Write-Utf8NoBom -Path $ReportPath -Text ($lines -join "`r`n")
216: }
217: 
218: function Install-Task {
219:   Ensure-Dir $LogRoot
---
227:   if ($taskExit -eq 0) {
228:     Write-Step "OK" ("Installed hidden scheduled task: {0}" -f $TaskName)
229:   } else {
230:     Write-Step "FAIL" ("Scheduled task install failed: {0} exit={1}" -f $TaskName,$taskExit)
231:     exit $taskExit
232:   }
233: }
234: 
235: Ensure-Dir $LogRoot
---
244: $started = Get-Date
245: $summary = [ordered]@{
246:   component = $Component
247:   status = "REVIEW"
248:   started_utc = $started.ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ")
249:   ended_utc = ""
250:   duration_seconds = 0
251:   install_task = [bool]$InstallTask
252:   run_once = [bool]$RunOnce
---
260:     client_safe_movie_parts = 0
261:     client_safe_tv_parts = 0
262:   }
263:   failures = @()
264:   log = $LogPath
265: }
266: 
267: if (!(Acquire-Lock)) {
268:   $summary.status = "REVIEW"
---
265: }
266: 
267: if (!(Acquire-Lock)) {
268:   $summary.status = "REVIEW"
269:   $summary.failures = @("pipeline lock is active")
270:   $summary.ended_utc = (Get-Date).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ")
271:   Write-JsonFile -Path $StatusPath -Object $summary
272:   Build-Report -Summary $summary
273:   Write-Step "REVIEW" "Pipeline lock is active."
---
266: 
267: if (!(Acquire-Lock)) {
268:   $summary.status = "REVIEW"
269:   $summary.failures = @("pipeline lock is active")
270:   $summary.ended_utc = (Get-Date).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ")
271:   Write-JsonFile -Path $StatusPath -Object $summary
272:   Build-Report -Summary $summary
273:   Write-Step "REVIEW" "Pipeline lock is active."
274:   return
---
``

## D:\PlexTools\Scripts\scarflix_v2\ScarFLIX_v2_SafeWebDavExpansionPipeline.ps1.bak_platform_gate_20260603_113034
``text
25: $HealthScript = Join-Path $ScriptRoot "ScarFLIX_v2_HealthStatus.ps1"
26: $SeederScript = Join-Path $ScriptRoot "ScarFLIX_v2_LiveCatalogSeeder.ps1"
27: $PublisherScript = Join-Path $ScriptRoot "ScarFLIX_v2_WebDavVirtualCatalogPublisher.ps1"
28: $ActiveGateScript = Join-Path $ScriptRoot "ScarFLIX_v2_WebDavActiveGate.ps1"
29: $VisibleQaScript = Join-Path $ScriptRoot "ScarFLIX_v2_VisibleCatalogQA.ps1"
30: $DecisionQaScript = Join-Path $ScriptRoot "ScarFLIX_v2_PlexClientDecisionQA.ps1"
31: $ConcurrentQaScript = Join-Path $ScriptRoot "ScarFLIX_v2_ConcurrentStreamQA.ps1"
32: $TaskWrapperScript = Join-Path $ScriptRoot "ScarFLIX_v2_SafeWebDavExpansionPipeline_Run.ps1"
33: 
---
26: $SeederScript = Join-Path $ScriptRoot "ScarFLIX_v2_LiveCatalogSeeder.ps1"
27: $PublisherScript = Join-Path $ScriptRoot "ScarFLIX_v2_WebDavVirtualCatalogPublisher.ps1"
28: $ActiveGateScript = Join-Path $ScriptRoot "ScarFLIX_v2_WebDavActiveGate.ps1"
29: $VisibleQaScript = Join-Path $ScriptRoot "ScarFLIX_v2_VisibleCatalogQA.ps1"
30: $DecisionQaScript = Join-Path $ScriptRoot "ScarFLIX_v2_PlexClientDecisionQA.ps1"
31: $ConcurrentQaScript = Join-Path $ScriptRoot "ScarFLIX_v2_ConcurrentStreamQA.ps1"
32: $TaskWrapperScript = Join-Path $ScriptRoot "ScarFLIX_v2_SafeWebDavExpansionPipeline_Run.ps1"
33: 
34: function Ensure-Dir {
---
28: $ActiveGateScript = Join-Path $ScriptRoot "ScarFLIX_v2_WebDavActiveGate.ps1"
29: $VisibleQaScript = Join-Path $ScriptRoot "ScarFLIX_v2_VisibleCatalogQA.ps1"
30: $DecisionQaScript = Join-Path $ScriptRoot "ScarFLIX_v2_PlexClientDecisionQA.ps1"
31: $ConcurrentQaScript = Join-Path $ScriptRoot "ScarFLIX_v2_ConcurrentStreamQA.ps1"
32: $TaskWrapperScript = Join-Path $ScriptRoot "ScarFLIX_v2_SafeWebDavExpansionPipeline_Run.ps1"
33: 
34: function Ensure-Dir {
35:   param([string]$Path)
36:   if (!(Test-Path -LiteralPath $Path)) {
---
123:   if ($result.ok) {
124:     Write-Step "OK" ("{0} completed" -f $Name)
125:   } else {
126:     Write-Step "REVIEW" ("{0} did not pass; exit={1}" -f $Name,$result.exit_code)
127:   }
128:   return $result
129: }
130: 
131: function Count-PendingCandidates {
---
158:   [void]$lines.Add(("- pending before: {0}" -f $Summary.pending_before))
159:   [void]$lines.Add(("- pending after seed: {0}" -f $Summary.pending_after_seed))
160:   [void]$lines.Add(("- pending after publish: {0}" -f $Summary.pending_after_publish))
161:   [void]$lines.Add(("- final WebDAV active gate: {0}" -f $Summary.final_statuses.webdav_active_gate))
162:   [void]$lines.Add(("- final visible catalog QA: {0}" -f $Summary.final_statuses.visible_catalog_qa))
163:   [void]$lines.Add(("- final Plex client decision QA: {0}" -f $Summary.final_statuses.plex_client_decision_qa))
164:   [void]$lines.Add(("- final concurrent stream QA: {0}" -f $Summary.final_statuses.concurrent_stream_qa))
165:   [void]$lines.Add(("- final health: {0}" -f $Summary.final_statuses.health))
166:   [void]$lines.Add("")
---
159:   [void]$lines.Add(("- pending after seed: {0}" -f $Summary.pending_after_seed))
160:   [void]$lines.Add(("- pending after publish: {0}" -f $Summary.pending_after_publish))
161:   [void]$lines.Add(("- final WebDAV active gate: {0}" -f $Summary.final_statuses.webdav_active_gate))
162:   [void]$lines.Add(("- final visible catalog QA: {0}" -f $Summary.final_statuses.visible_catalog_qa))
163:   [void]$lines.Add(("- final Plex client decision QA: {0}" -f $Summary.final_statuses.plex_client_decision_qa))
164:   [void]$lines.Add(("- final concurrent stream QA: {0}" -f $Summary.final_statuses.concurrent_stream_qa))
165:   [void]$lines.Add(("- final health: {0}" -f $Summary.final_statuses.health))
166:   [void]$lines.Add("")
167:   [void]$lines.Add("## Guardrails")
---
160:   [void]$lines.Add(("- pending after publish: {0}" -f $Summary.pending_after_publish))
161:   [void]$lines.Add(("- final WebDAV active gate: {0}" -f $Summary.final_statuses.webdav_active_gate))
162:   [void]$lines.Add(("- final visible catalog QA: {0}" -f $Summary.final_statuses.visible_catalog_qa))
163:   [void]$lines.Add(("- final Plex client decision QA: {0}" -f $Summary.final_statuses.plex_client_decision_qa))
164:   [void]$lines.Add(("- final concurrent stream QA: {0}" -f $Summary.final_statuses.concurrent_stream_qa))
165:   [void]$lines.Add(("- final health: {0}" -f $Summary.final_statuses.health))
166:   [void]$lines.Add("")
167:   [void]$lines.Add("## Guardrails")
168:   [void]$lines.Add("- Stage-only seeding: raw .strm candidates are never scanned by Plex directly.")
---
161:   [void]$lines.Add(("- final WebDAV active gate: {0}" -f $Summary.final_statuses.webdav_active_gate))
162:   [void]$lines.Add(("- final visible catalog QA: {0}" -f $Summary.final_statuses.visible_catalog_qa))
163:   [void]$lines.Add(("- final Plex client decision QA: {0}" -f $Summary.final_statuses.plex_client_decision_qa))
164:   [void]$lines.Add(("- final concurrent stream QA: {0}" -f $Summary.final_statuses.concurrent_stream_qa))
165:   [void]$lines.Add(("- final health: {0}" -f $Summary.final_statuses.health))
166:   [void]$lines.Add("")
167:   [void]$lines.Add("## Guardrails")
168:   [void]$lines.Add("- Stage-only seeding: raw .strm candidates are never scanned by Plex directly.")
169:   [void]$lines.Add("- WebDAV-backed virtual files are published only after policy and playback gates.")
---
184:   if ($taskExit -eq 0) {
185:     Write-Step "OK" ("Installed hidden scheduled task: {0}" -f $TaskName)
186:   } else {
187:     Write-Step "FAIL" ("Scheduled task install failed: {0} exit={1}" -f $TaskName,$taskExit)
188:     exit $taskExit
189:   }
190: }
191: 
192: Ensure-Dir $LogRoot
---
201: $started = Get-Date
202: $summary = [ordered]@{
203:   component = $Component
204:   status = "REVIEW"
205:   started_utc = $started.ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ")
206:   ended_utc = ""
207:   duration_seconds = 0
208:   install_task = [bool]$InstallTask
209:   run_once = [bool]$RunOnce
---
217:     client_safe_movie_parts = 0
218:     client_safe_tv_parts = 0
219:   }
220:   failures = @()
221:   log = $LogPath
222: }
223: 
224: if (!(Acquire-Lock)) {
225:   $summary.status = "REVIEW"
---
222: }
223: 
224: if (!(Acquire-Lock)) {
225:   $summary.status = "REVIEW"
226:   $summary.failures = @("pipeline lock is active")
227:   $summary.ended_utc = (Get-Date).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ")
228:   Write-JsonFile -Path $StatusPath -Object $summary
229:   Build-Report -Summary $summary
230:   Write-Step "REVIEW" "Pipeline lock is active."
---
223: 
224: if (!(Acquire-Lock)) {
225:   $summary.status = "REVIEW"
226:   $summary.failures = @("pipeline lock is active")
227:   $summary.ended_utc = (Get-Date).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ")
228:   Write-JsonFile -Path $StatusPath -Object $summary
229:   Build-Report -Summary $summary
230:   Write-Step "REVIEW" "Pipeline lock is active."
231:   return
---
227:   $summary.ended_utc = (Get-Date).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ")
228:   Write-JsonFile -Path $StatusPath -Object $summary
229:   Build-Report -Summary $summary
230:   Write-Step "REVIEW" "Pipeline lock is active."
231:   return
232: }
233: 
234: try {
235:   Write-Step "INFO" "Safe WebDAV expansion pipeline starting."
---
244:   [void]$steps.Add((Invoke-ChildPs -Name "publish_webdav_catalog" -Script $PublisherScript -ChildArgs @("-MaxCandidates", ("" + $PublishMaxCandidates), "-DelayedQaSeconds", ("" + $DelayedQaSeconds))))
245:   $summary.pending_after_publish = Count-PendingCandidates
246: 
247:   [void]$steps.Add((Invoke-ChildPs -Name "final_webdav_active_gate" -Script $ActiveGateScript -ChildArgs @("-VisibleOnly", "-Retries", "2")))
248:   [void]$steps.Add((Invoke-ChildPs -Name "final_visible_catalog_qa" -Script $VisibleQaScript -ChildArgs @("-MaxItems", "0")))
249:   [void]$steps.Add((Invoke-ChildPs -Name "final_plex_client_decision_qa" -Script $DecisionQaScript -ChildArgs @("-MaxItems", "0")))
250:   [void]$steps.Add((Invoke-ChildPs -Name "final_concurrent_stream_qa" -Script $ConcurrentQaScript -ChildArgs @("-Concurrency", ("" + $Concurrency), "-DecisionLimit", "0")))
251:   [void]$steps.Add((Invoke-ChildPs -Name "final_health" -Script $HealthScript -ChildArgs @()))
252: 
---
247:   [void]$steps.Add((Invoke-ChildPs -Name "final_webdav_active_gate" -Script $ActiveGateScript -ChildArgs @("-VisibleOnly", "-Retries", "2")))
248:   [void]$steps.Add((Invoke-ChildPs -Name "final_visible_catalog_qa" -Script $VisibleQaScript -ChildArgs @("-MaxItems", "0")))
249:   [void]$steps.Add((Invoke-ChildPs -Name "final_plex_client_decision_qa" -Script $DecisionQaScript -ChildArgs @("-MaxItems", "0")))
250:   [void]$steps.Add((Invoke-ChildPs -Name "final_concurrent_stream_qa" -Script $ConcurrentQaScript -ChildArgs @("-Concurrency", ("" + $Concurrency), "-DecisionLimit", "0")))
251:   [void]$steps.Add((Invoke-ChildPs -Name "final_health" -Script $HealthScript -ChildArgs @()))
252: 
253:   $summary.steps = @($steps.ToArray())
254: 
255:   $summary.final_statuses = [ordered]@{
---
256:     webdav_active_gate = Get-StatusValue (Join-Path $PublishRoot "webdav_active_gate_status.json")
257:     visible_catalog_qa = Get-StatusValue (Join-Path $PublishRoot "visible_catalog_qa_status.json")
258:     plex_client_decision_qa = Get-StatusValue (Join-Path $PublishRoot "plex_client_decision_qa_status.json")
259:     concurrent_stream_qa = Get-StatusValue (Join-Path $PublishRoot "concurrent_stream_qa_status.json")
260:     health = Get-StatusValue (Join-Path $PublishRoot "scarflix_v2_health.json")
261:   }
262: 
263:   $health = Read-JsonFile (Join-Path $PublishRoot "scarflix_v2_health.json")
264:   if ($null -ne $health -and $null -ne $health.plex) {
---
267:     $summary.health.client_safe_tv_parts = [int]$health.plex.client_safe_tv_parts
268:   }
269: 
270:   $failures = New-Object System.Collections.ArrayList
271:   foreach ($step in @($summary.steps)) {
272:     if (!$step.ok) { [void]$failures.Add(("{0} exit={1}" -f $step.name,$step.exit_code)) }
273:   }
274:   foreach ($prop in $summary.final_statuses.GetEnumerator()) {
275:     if (("" + $prop.Value) -ne "PASS") { [void]$failures.Add(("{0} status={1}" -f $prop.Key,$prop.Value)) }
---
``

## D:\PlexTools\Scripts\scarflix_v2\ScarFLIX_v2_SafeWebDavExpansionPipeline.ps1.bak_safe_schedule_20260603_120509
``text
25: $HealthScript = Join-Path $ScriptRoot "ScarFLIX_v2_HealthStatus.ps1"
26: $SeederScript = Join-Path $ScriptRoot "ScarFLIX_v2_LiveCatalogSeeder.ps1"
27: $PublisherScript = Join-Path $ScriptRoot "ScarFLIX_v2_WebDavVirtualCatalogPublisher.ps1"
28: $ActiveGateScript = Join-Path $ScriptRoot "ScarFLIX_v2_WebDavActiveGate.ps1"
29: $VisibleQaScript = Join-Path $ScriptRoot "ScarFLIX_v2_VisibleCatalogQA.ps1"
30: $DecisionQaScript = Join-Path $ScriptRoot "ScarFLIX_v2_PlexClientDecisionQA.ps1"
31: $ConcurrentQaScript = Join-Path $ScriptRoot "ScarFLIX_v2_ConcurrentStreamQA.ps1"
32: $SourceQuarantineScript = Join-Path $ScriptRoot "ScarFLIX_v2_SourceQuarantine.ps1"
33: $PlatformGateScript = Join-Path $ScriptRoot "ScarFLIX_v2_PlatformGate.ps1"
---
26: $SeederScript = Join-Path $ScriptRoot "ScarFLIX_v2_LiveCatalogSeeder.ps1"
27: $PublisherScript = Join-Path $ScriptRoot "ScarFLIX_v2_WebDavVirtualCatalogPublisher.ps1"
28: $ActiveGateScript = Join-Path $ScriptRoot "ScarFLIX_v2_WebDavActiveGate.ps1"
29: $VisibleQaScript = Join-Path $ScriptRoot "ScarFLIX_v2_VisibleCatalogQA.ps1"
30: $DecisionQaScript = Join-Path $ScriptRoot "ScarFLIX_v2_PlexClientDecisionQA.ps1"
31: $ConcurrentQaScript = Join-Path $ScriptRoot "ScarFLIX_v2_ConcurrentStreamQA.ps1"
32: $SourceQuarantineScript = Join-Path $ScriptRoot "ScarFLIX_v2_SourceQuarantine.ps1"
33: $PlatformGateScript = Join-Path $ScriptRoot "ScarFLIX_v2_PlatformGate.ps1"
34: $TaskWrapperScript = Join-Path $ScriptRoot "ScarFLIX_v2_SafeWebDavExpansionPipeline_Run.ps1"
---
28: $ActiveGateScript = Join-Path $ScriptRoot "ScarFLIX_v2_WebDavActiveGate.ps1"
29: $VisibleQaScript = Join-Path $ScriptRoot "ScarFLIX_v2_VisibleCatalogQA.ps1"
30: $DecisionQaScript = Join-Path $ScriptRoot "ScarFLIX_v2_PlexClientDecisionQA.ps1"
31: $ConcurrentQaScript = Join-Path $ScriptRoot "ScarFLIX_v2_ConcurrentStreamQA.ps1"
32: $SourceQuarantineScript = Join-Path $ScriptRoot "ScarFLIX_v2_SourceQuarantine.ps1"
33: $PlatformGateScript = Join-Path $ScriptRoot "ScarFLIX_v2_PlatformGate.ps1"
34: $TaskWrapperScript = Join-Path $ScriptRoot "ScarFLIX_v2_SafeWebDavExpansionPipeline_Run.ps1"
35: 
36: function Ensure-Dir {
---
30: $DecisionQaScript = Join-Path $ScriptRoot "ScarFLIX_v2_PlexClientDecisionQA.ps1"
31: $ConcurrentQaScript = Join-Path $ScriptRoot "ScarFLIX_v2_ConcurrentStreamQA.ps1"
32: $SourceQuarantineScript = Join-Path $ScriptRoot "ScarFLIX_v2_SourceQuarantine.ps1"
33: $PlatformGateScript = Join-Path $ScriptRoot "ScarFLIX_v2_PlatformGate.ps1"
34: $TaskWrapperScript = Join-Path $ScriptRoot "ScarFLIX_v2_SafeWebDavExpansionPipeline_Run.ps1"
35: 
36: function Ensure-Dir {
37:   param([string]$Path)
38:   if (!(Test-Path -LiteralPath $Path)) {
---
119:     $proc = Start-Process -FilePath "C:\Windows\System32\WindowsPowerShell\v1.0\powershell.exe" -ArgumentList $argList -WindowStyle Hidden -RedirectStandardOutput $childOut -RedirectStandardError $childErr -PassThru
120:     $finished = $proc.WaitForExit(7200 * 1000)
121:     if (!$finished) {
122:       Write-Step "REVIEW" ("{0} timed out; stopping pid={1}" -f $Name,$proc.Id)
123:       try { & taskkill.exe /PID $proc.Id /T /F | Out-Null } catch {}
124:       $result.exit_code = -2
125:       $result.reason = "child timeout"
126:     } else {
127:       try { $proc.Refresh() } catch {}
---
122:       Write-Step "REVIEW" ("{0} timed out; stopping pid={1}" -f $Name,$proc.Id)
123:       try { & taskkill.exe /PID $proc.Id /T /F | Out-Null } catch {}
124:       $result.exit_code = -2
125:       $result.reason = "child timeout"
126:     } else {
127:       try { $proc.Refresh() } catch {}
128:       try { $result.exit_code = $proc.ExitCode } catch { $result.exit_code = $null }
129:     }
130:     try {
---
143:   if ($result.ok) {
144:     Write-Step "OK" ("{0} completed" -f $Name)
145:   } else {
146:     Write-Step "REVIEW" ("{0} did not pass; exit={1}" -f $Name,$result.exit_code)
147:   }
148:   return $result
149: }
150: 
151: function Count-PendingCandidates {
---
178:   [void]$lines.Add(("- pending before: {0}" -f $Summary.pending_before))
179:   [void]$lines.Add(("- pending after seed: {0}" -f $Summary.pending_after_seed))
180:   [void]$lines.Add(("- pending after publish: {0}" -f $Summary.pending_after_publish))
181:   [void]$lines.Add(("- final WebDAV active gate: {0}" -f $Summary.final_statuses.webdav_active_gate))
182:   [void]$lines.Add(("- final visible catalog QA: {0}" -f $Summary.final_statuses.visible_catalog_qa))
183:   [void]$lines.Add(("- final Plex client decision QA: {0}" -f $Summary.final_statuses.plex_client_decision_qa))
184:   [void]$lines.Add(("- final concurrent stream QA: {0}" -f $Summary.final_statuses.concurrent_stream_qa))
185:   [void]$lines.Add(("- final health: {0}" -f $Summary.final_statuses.health))
186:   [void]$lines.Add("")
---
179:   [void]$lines.Add(("- pending after seed: {0}" -f $Summary.pending_after_seed))
180:   [void]$lines.Add(("- pending after publish: {0}" -f $Summary.pending_after_publish))
181:   [void]$lines.Add(("- final WebDAV active gate: {0}" -f $Summary.final_statuses.webdav_active_gate))
182:   [void]$lines.Add(("- final visible catalog QA: {0}" -f $Summary.final_statuses.visible_catalog_qa))
183:   [void]$lines.Add(("- final Plex client decision QA: {0}" -f $Summary.final_statuses.plex_client_decision_qa))
184:   [void]$lines.Add(("- final concurrent stream QA: {0}" -f $Summary.final_statuses.concurrent_stream_qa))
185:   [void]$lines.Add(("- final health: {0}" -f $Summary.final_statuses.health))
186:   [void]$lines.Add("")
187:   [void]$lines.Add("## Guardrails")
---
180:   [void]$lines.Add(("- pending after publish: {0}" -f $Summary.pending_after_publish))
181:   [void]$lines.Add(("- final WebDAV active gate: {0}" -f $Summary.final_statuses.webdav_active_gate))
182:   [void]$lines.Add(("- final visible catalog QA: {0}" -f $Summary.final_statuses.visible_catalog_qa))
183:   [void]$lines.Add(("- final Plex client decision QA: {0}" -f $Summary.final_statuses.plex_client_decision_qa))
184:   [void]$lines.Add(("- final concurrent stream QA: {0}" -f $Summary.final_statuses.concurrent_stream_qa))
185:   [void]$lines.Add(("- final health: {0}" -f $Summary.final_statuses.health))
186:   [void]$lines.Add("")
187:   [void]$lines.Add("## Guardrails")
188:   [void]$lines.Add("- Stage-only seeding: raw .strm candidates are never scanned by Plex directly.")
---
181:   [void]$lines.Add(("- final WebDAV active gate: {0}" -f $Summary.final_statuses.webdav_active_gate))
182:   [void]$lines.Add(("- final visible catalog QA: {0}" -f $Summary.final_statuses.visible_catalog_qa))
183:   [void]$lines.Add(("- final Plex client decision QA: {0}" -f $Summary.final_statuses.plex_client_decision_qa))
184:   [void]$lines.Add(("- final concurrent stream QA: {0}" -f $Summary.final_statuses.concurrent_stream_qa))
185:   [void]$lines.Add(("- final health: {0}" -f $Summary.final_statuses.health))
186:   [void]$lines.Add("")
187:   [void]$lines.Add("## Guardrails")
188:   [void]$lines.Add("- Stage-only seeding: raw .strm candidates are never scanned by Plex directly.")
189:   [void]$lines.Add("- WebDAV-backed virtual files are published only after policy and playback gates.")
---
189:   [void]$lines.Add("- WebDAV-backed virtual files are published only after policy and playback gates.")
190:   [void]$lines.Add("- Porn/adult and CAM/telesync/telecine candidates are blocked before publishing.")
191:   [void]$lines.Add("- 5-way stream QA is run every cycle.")
192:   [void]$lines.Add("- Final status is taken from the same-snapshot PlatformGate.")
193:   [void]$lines.Add("- Failed visible sources are quarantined; titles remain eligible for alternate sources.")
194:   Write-Utf8NoBom -Path $ReportPath -Text ($lines -join "`r`n")
195: }
196: 
197: function Install-Task {
---
190:   [void]$lines.Add("- Porn/adult and CAM/telesync/telecine candidates are blocked before publishing.")
191:   [void]$lines.Add("- 5-way stream QA is run every cycle.")
192:   [void]$lines.Add("- Final status is taken from the same-snapshot PlatformGate.")
193:   [void]$lines.Add("- Failed visible sources are quarantined; titles remain eligible for alternate sources.")
194:   Write-Utf8NoBom -Path $ReportPath -Text ($lines -join "`r`n")
195: }
196: 
197: function Install-Task {
198:   Ensure-Dir $LogRoot
---
206:   if ($taskExit -eq 0) {
207:     Write-Step "OK" ("Installed hidden scheduled task: {0}" -f $TaskName)
208:   } else {
209:     Write-Step "FAIL" ("Scheduled task install failed: {0} exit={1}" -f $TaskName,$taskExit)
210:     exit $taskExit
211:   }
212: }
213: 
214: Ensure-Dir $LogRoot
---
223: $started = Get-Date
224: $summary = [ordered]@{
225:   component = $Component
226:   status = "REVIEW"
227:   started_utc = $started.ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ")
228:   ended_utc = ""
229:   duration_seconds = 0
230:   install_task = [bool]$InstallTask
231:   run_once = [bool]$RunOnce
---
239:     client_safe_movie_parts = 0
240:     client_safe_tv_parts = 0
241:   }
242:   failures = @()
243:   log = $LogPath
244: }
245: 
246: if (!(Acquire-Lock)) {
247:   $summary.status = "REVIEW"
---
244: }
245: 
246: if (!(Acquire-Lock)) {
247:   $summary.status = "REVIEW"
248:   $summary.failures = @("pipeline lock is active")
249:   $summary.ended_utc = (Get-Date).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ")
250:   Write-JsonFile -Path $StatusPath -Object $summary
251:   Build-Report -Summary $summary
252:   Write-Step "REVIEW" "Pipeline lock is active."
---
245: 
246: if (!(Acquire-Lock)) {
247:   $summary.status = "REVIEW"
248:   $summary.failures = @("pipeline lock is active")
249:   $summary.ended_utc = (Get-Date).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ")
250:   Write-JsonFile -Path $StatusPath -Object $summary
251:   Build-Report -Summary $summary
252:   Write-Step "REVIEW" "Pipeline lock is active."
253:   return
---
``

## D:\PlexTools\Scripts\scarflix_v2\ScarFLIX_v2_SourceQuarantine.ps1
``text
86:   $r = ("" + $Reason).ToLowerInvariant()
87:   if ($HeadStatus -eq 429 -or $RangeStatus -eq 429 -or $r -match "rate limit|too many requests") { return "PROVIDER_429_RETRYABLE" }
88:   if ($HeadStatus -eq 503 -or $RangeStatus -eq 503 -or $r -match "503|server unavailable") { return "PROVIDER_503_RETRYABLE" }
89:   if ($r -match "timeout|timed out") { return "PROVIDER_TIMEOUT_RETRYABLE" }
90:   if ($r -match "porn|adult|cam|h?dcam|telesync|telecine|\\bts\\b|\\btc\\b") { return "POLICY_BLOCKED" }
91:   if ($r -match "head|range|206|200|webdav") { return "WEBDAV_AVAILABILITY_FAILED" }
92:   if ($r -match "profile|width|height|duration") { return "PLEX_PROFILE_FAILED" }
93:   if ($r -match "codec|hevc|h265|truehd|avi|h264") { return "PLEX_CODEC_BLOCKED" }
94:   if ($r -match "decision") { return "PLEX_DECISION_FAILED" }
---
88:   if ($HeadStatus -eq 503 -or $RangeStatus -eq 503 -or $r -match "503|server unavailable") { return "PROVIDER_503_RETRYABLE" }
89:   if ($r -match "timeout|timed out") { return "PROVIDER_TIMEOUT_RETRYABLE" }
90:   if ($r -match "porn|adult|cam|h?dcam|telesync|telecine|\\bts\\b|\\btc\\b") { return "POLICY_BLOCKED" }
91:   if ($r -match "head|range|206|200|webdav") { return "WEBDAV_AVAILABILITY_FAILED" }
92:   if ($r -match "profile|width|height|duration") { return "PLEX_PROFILE_FAILED" }
93:   if ($r -match "codec|hevc|h265|truehd|avi|h264") { return "PLEX_CODEC_BLOCKED" }
94:   if ($r -match "decision") { return "PLEX_DECISION_FAILED" }
95:   return "OTHER"
96: }
---
89:   if ($r -match "timeout|timed out") { return "PROVIDER_TIMEOUT_RETRYABLE" }
90:   if ($r -match "porn|adult|cam|h?dcam|telesync|telecine|\\bts\\b|\\btc\\b") { return "POLICY_BLOCKED" }
91:   if ($r -match "head|range|206|200|webdav") { return "WEBDAV_AVAILABILITY_FAILED" }
92:   if ($r -match "profile|width|height|duration") { return "PLEX_PROFILE_FAILED" }
93:   if ($r -match "codec|hevc|h265|truehd|avi|h264") { return "PLEX_CODEC_BLOCKED" }
94:   if ($r -match "decision") { return "PLEX_DECISION_FAILED" }
95:   return "OTHER"
96: }
97: 
---
91:   if ($r -match "head|range|206|200|webdav") { return "WEBDAV_AVAILABILITY_FAILED" }
92:   if ($r -match "profile|width|height|duration") { return "PLEX_PROFILE_FAILED" }
93:   if ($r -match "codec|hevc|h265|truehd|avi|h264") { return "PLEX_CODEC_BLOCKED" }
94:   if ($r -match "decision") { return "PLEX_DECISION_FAILED" }
95:   return "OTHER"
96: }
97: 
98: function Test-TransientCode {
99:   param([string]$Code)
---
173: 
174: $summary = [ordered]@{
175:   component = $Component
176:   status = "REVIEW"
177:   started_utc = $Started.ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ")
178:   ended_utc = ""
179:   duration_seconds = 0
180:   include_transient = [bool]$IncludeTransient
181:   dry_run = [bool]$DryRun
---
194:   Write-Step "INFO" "Source quarantine starting."
195:   $gate = Read-JsonFile $ReasonStatusFile
196:   $map = Read-JsonFile $MapPath
197:   if ($null -eq $gate -or $null -eq $gate.failures) { throw "No failures found in status file." }
198:   if ($null -eq $map -or $null -eq $map.entries) { throw "WebDAV map is missing or unreadable." }
199: 
200:   $failures = @($gate.failures)
201:   $summary.candidates = $failures.Count
202:   $entries = @($map.entries)
---
197:   if ($null -eq $gate -or $null -eq $gate.failures) { throw "No failures found in status file." }
198:   if ($null -eq $map -or $null -eq $map.entries) { throw "WebDAV map is missing or unreadable." }
199: 
200:   $failures = @($gate.failures)
201:   $summary.candidates = $failures.Count
202:   $entries = @($map.entries)
203:   $removePaths = @{}
204:   $hideFiles = New-Object System.Collections.ArrayList
205:   $records = New-Object System.Collections.ArrayList
---
198:   if ($null -eq $map -or $null -eq $map.entries) { throw "WebDAV map is missing or unreadable." }
199: 
200:   $failures = @($gate.failures)
201:   $summary.candidates = $failures.Count
202:   $entries = @($map.entries)
203:   $removePaths = @{}
204:   $hideFiles = New-Object System.Collections.ArrayList
205:   $records = New-Object System.Collections.ArrayList
206:   $stamp = (Get-Date).ToUniversalTime().ToString("yyyyMMddTHHmmssZ")
---
205:   $records = New-Object System.Collections.ArrayList
206:   $stamp = (Get-Date).ToUniversalTime().ToString("yyyyMMddTHHmmssZ")
207: 
208:   foreach ($failure in $failures) {
209:     $head = 0
210:     $range = 0
211:     try { [void][int]::TryParse(("" + $failure.head_status), [ref]$head) } catch {}
212:     try { [void][int]::TryParse(("" + $failure.range_status), [ref]$range) } catch {}
213:     $code = Get-ReasonCode -Reason ("" + $failure.reason) -HeadStatus $head -RangeStatus $range
---
208:   foreach ($failure in $failures) {
209:     $head = 0
210:     $range = 0
211:     try { [void][int]::TryParse(("" + $failure.head_status), [ref]$head) } catch {}
212:     try { [void][int]::TryParse(("" + $failure.range_status), [ref]$range) } catch {}
213:     $code = Get-ReasonCode -Reason ("" + $failure.reason) -HeadStatus $head -RangeStatus $range
214:     $isTransient = Test-TransientCode -Code $code
215:     if ($isTransient -and !$IncludeTransient) {
216:       $summary.skipped_transient = $summary.skipped_transient + 1
---
209:     $head = 0
210:     $range = 0
211:     try { [void][int]::TryParse(("" + $failure.head_status), [ref]$head) } catch {}
212:     try { [void][int]::TryParse(("" + $failure.range_status), [ref]$range) } catch {}
213:     $code = Get-ReasonCode -Reason ("" + $failure.reason) -HeadStatus $head -RangeStatus $range
214:     $isTransient = Test-TransientCode -Code $code
215:     if ($isTransient -and !$IncludeTransient) {
216:       $summary.skipped_transient = $summary.skipped_transient + 1
217:       continue
---
210:     $range = 0
211:     try { [void][int]::TryParse(("" + $failure.head_status), [ref]$head) } catch {}
212:     try { [void][int]::TryParse(("" + $failure.range_status), [ref]$range) } catch {}
213:     $code = Get-ReasonCode -Reason ("" + $failure.reason) -HeadStatus $head -RangeStatus $range
214:     $isTransient = Test-TransientCode -Code $code
215:     if ($isTransient -and !$IncludeTransient) {
216:       $summary.skipped_transient = $summary.skipped_transient + 1
217:       continue
218:     }
---
216:       $summary.skipped_transient = $summary.skipped_transient + 1
217:       continue
218:     }
219:     $rp = "" + $failure.rclone_path
220:     $wp = "" + $failure.webdav_path
221:     $entry = $entries | Where-Object { ("" + $_.rclone_path) -eq $rp -or ("" + $_.webdav_path) -eq $wp } | Select-Object -First 1
222:     if ($null -eq $entry) { continue }
223:     $recordId = "{0}_{1}" -f $stamp,(Safe-Name ("" + $failure.title))
224:     $recordDir = Join-Path $QuarantineRoot $recordId
---
217:       continue
218:     }
219:     $rp = "" + $failure.rclone_path
220:     $wp = "" + $failure.webdav_path
221:     $entry = $entries | Where-Object { ("" + $_.rclone_path) -eq $rp -or ("" + $_.webdav_path) -eq $wp } | Select-Object -First 1
222:     if ($null -eq $entry) { continue }
223:     $recordId = "{0}_{1}" -f $stamp,(Safe-Name ("" + $failure.title))
224:     $recordDir = Join-Path $QuarantineRoot $recordId
225:     if (!$DryRun) { Ensure-Dir $recordDir }
---
220:     $wp = "" + $failure.webdav_path
221:     $entry = $entries | Where-Object { ("" + $_.rclone_path) -eq $rp -or ("" + $_.webdav_path) -eq $wp } | Select-Object -First 1
222:     if ($null -eq $entry) { continue }
223:     $recordId = "{0}_{1}" -f $stamp,(Safe-Name ("" + $failure.title))
224:     $recordDir = Join-Path $QuarantineRoot $recordId
225:     if (!$DryRun) { Ensure-Dir $recordDir }
226:     $sourceMoved = ""
227:     if (!$DryRun) {
228:       $sourceMoved = Move-SourceFolder -SourceStrm ("" + $entry.source_strm) -DestRoot $recordDir
---
229:     }
230:     $record = [ordered]@{
231:       quarantined_utc = (Get-Date).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ")
232:       title = ConvertTo-AsciiText ("" + $failure.title)
233:       reason_code = $code
234:       reason = ConvertTo-AsciiText ("" + $failure.reason)
235:       transient = $isTransient
236:       head_status = $head
237:       range_status = $range
---
231:       quarantined_utc = (Get-Date).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ")
232:       title = ConvertTo-AsciiText ("" + $failure.title)
233:       reason_code = $code
234:       reason = ConvertTo-AsciiText ("" + $failure.reason)
235:       transient = $isTransient
236:       head_status = $head
237:       range_status = $range
238:       rclone_path = $rp
239:       webdav_path = $wp
---
283:   $codes = New-Object System.Collections.ArrayList
284:   foreach ($g in $groups) { [void]$codes.Add([ordered]@{ code=$g.Name; count=$g.Count }) }
285:   $summary.reason_codes = @($codes.ToArray())
286:   if ($summary.quarantined -gt 0 -or $summary.skipped_transient -gt 0) { $summary.status = "PASS" } else { $summary.status = "REVIEW" }
287: } catch {
288:   $summary.status = "FAIL"
289:   $summary.error = ConvertTo-AsciiText $_.Exception.Message
290:   Write-Step "FAIL" $summary.error
291: } finally {
---
``

## D:\PlexTools\Scripts\scarflix_v2\ScarFLIX_v2_StreamProxy.ps1
``text
209:   }
210:   try {
211:     if ($null -eq $Headers) {
212:       $Resp = Invoke-RestMethod -Uri $Uri -UseBasicParsing -TimeoutSec 20 -ErrorAction Stop
213:     } else {
214:       $Resp = Invoke-RestMethod -Uri $Uri -Headers $Headers -UseBasicParsing -TimeoutSec 20 -ErrorAction Stop
215:     }
216:     $Imdb = "" + $Resp.imdb_id
217:     if ($Imdb -match "^tt[0-9]+$") { return $Imdb }
---
211:     if ($null -eq $Headers) {
212:       $Resp = Invoke-RestMethod -Uri $Uri -UseBasicParsing -TimeoutSec 20 -ErrorAction Stop
213:     } else {
214:       $Resp = Invoke-RestMethod -Uri $Uri -Headers $Headers -UseBasicParsing -TimeoutSec 20 -ErrorAction Stop
215:     }
216:     $Imdb = "" + $Resp.imdb_id
217:     if ($Imdb -match "^tt[0-9]+$") { return $Imdb }
218:   } catch {}
219:   return ""
---
343:   $Headers = @{ Authorization = ("Bearer " + $Token) }
344:   $Torrents = @()
345:   try {
346:     $Resp = Invoke-RestMethod -Uri "[REDACTED_REAL_DEBRID_URL]" -Headers $Headers -UseBasicParsing -TimeoutSec 30 -ErrorAction Stop
347:     if ($Resp) { $Torrents = @($Resp) }
348:   } catch {
349:     $Result.reason = "RD torrent list failed"
350:     return $Result
351:   }
---
346:     $Resp = Invoke-RestMethod -Uri "[REDACTED_REAL_DEBRID_URL]" -Headers $Headers -UseBasicParsing -TimeoutSec 30 -ErrorAction Stop
347:     if ($Resp) { $Torrents = @($Resp) }
348:   } catch {
349:     $Result.reason = "RD torrent list failed"
350:     return $Result
351:   }
352:   $Candidates = New-Object System.Collections.ArrayList
353:   foreach ($Torrent in $Torrents) {
354:     $FileName = "" + $Torrent.filename
---
369:       if ([string]::IsNullOrWhiteSpace(("" + $Link))) { continue }
370:       try {
371:         $Body = @{ link = ("" + $Link) }
372:         $Unrestricted = Invoke-RestMethod -Uri "[REDACTED_REAL_DEBRID_URL]" -Headers $Headers -Method Post -Body $Body -UseBasicParsing -TimeoutSec 30 -ErrorAction Stop
373:         $Download = "" + $Unrestricted.download
374:         if ([string]::IsNullOrWhiteSpace($Download) -or -not $Download.StartsWith("https://")) { continue }
375:         $Admission = Test-LiveAdmitUrl -Url $Download
376:         if ($Admission.ok) {
377:           $Result.ok = $true
---
383:         }
384:         $Result.reason = "" + $Admission.reason
385:       } catch {
386:         $Result.reason = "RD unrestrict/admission failed"
387:       }
388:     }
389:   }
390:   if ([string]::IsNullOrWhiteSpace($Result.reason)) { $Result.reason = "No RD cloud link passed admission" }
391:   return $Result
---
406:     $HeadRequest.Method = "HEAD"
407:     $HeadRequest.AllowAutoRedirect = $true
408:     $HeadRequest.MaximumAutomaticRedirections = 1
409:     $HeadRequest.Timeout = 25000
410:     $HeadRequest.ReadWriteTimeout = 25000
411:     $HeadResponse = $HeadRequest.GetResponse()
412:     if ([int]$HeadResponse.StatusCode -ne 200) {
413:       $Result.reason = "HEAD not 200"
414:       return $Result
---
407:     $HeadRequest.AllowAutoRedirect = $true
408:     $HeadRequest.MaximumAutomaticRedirections = 1
409:     $HeadRequest.Timeout = 25000
410:     $HeadRequest.ReadWriteTimeout = 25000
411:     $HeadResponse = $HeadRequest.GetResponse()
412:     if ([int]$HeadResponse.StatusCode -ne 200) {
413:       $Result.reason = "HEAD not 200"
414:       return $Result
415:     }
---
443:     $RangeRequest.Method = "GET"
444:     $RangeRequest.AllowAutoRedirect = $true
445:     $RangeRequest.MaximumAutomaticRedirections = 1
446:     $RangeRequest.Timeout = 25000
447:     $RangeRequest.ReadWriteTimeout = 25000
448:     $RangeRequest.AddRange(0, 1)
449:     $RangeResponse = $RangeRequest.GetResponse()
450:     if ([int]$RangeResponse.StatusCode -ne 206) {
451:       $Result.reason = "Range did not return 206"
---
444:     $RangeRequest.AllowAutoRedirect = $true
445:     $RangeRequest.MaximumAutomaticRedirections = 1
446:     $RangeRequest.Timeout = 25000
447:     $RangeRequest.ReadWriteTimeout = 25000
448:     $RangeRequest.AddRange(0, 1)
449:     $RangeResponse = $RangeRequest.GetResponse()
450:     if ([int]$RangeResponse.StatusCode -ne 206) {
451:       $Result.reason = "Range did not return 206"
452:       return $Result
---
527:         Log-Line "OK" ("live cache hit type={0} tmdb={1} imdb={2} key={3}" -f $Type, $TmdbId, $Imdb, $CachedLinkKey)
528:         return $Result
529:       }
530:       Log-Line "REVIEW" ("ignored undersized live cache type={0} tmdb={1} imdb={2} key={3} bytes={4}" -f $Type, $TmdbId, $Imdb, $CachedLinkKey, $CachedContentLength)
531:     }
532:   }
533: 
534:   $Base = Get-StremioBase
535:   if ([string]::IsNullOrWhiteSpace($Base)) {
---
540:   $StreamUri = "{0}/{1}/{2}.json" -f $Base, $StremioType, [Uri]::EscapeDataString($StremioId)
541:   $Streams = @()
542:   try {
543:     $Resp = Invoke-RestMethod -Uri $StreamUri -UseBasicParsing -TimeoutSec 30 -ErrorAction Stop
544:     if ($Resp.streams) { $Streams = @($Resp.streams) }
545:   } catch {
546:     $Result.reason = "Stremio lookup failed"
547:     return $Result
548:   }
---
543:     $Resp = Invoke-RestMethod -Uri $StreamUri -UseBasicParsing -TimeoutSec 30 -ErrorAction Stop
544:     if ($Resp.streams) { $Streams = @($Resp.streams) }
545:   } catch {
546:     $Result.reason = "Stremio lookup failed"
547:     return $Result
548:   }
549:   $Result.source_count = $Streams.Count
550:   if ($Streams.Count -le 0) {
551:     $Result.reason = "no streams returned"
---
568:     if ($Admission.ok) {
569:       $LinkKey = New-ProxyRecord -Url $Url -Title $Title -Type $Type -ContentType ("" + $Admission.content_type) -ContentLength ([int64]$Admission.content_length)
570:       if ([string]::IsNullOrWhiteSpace($LinkKey)) {
571:         $Result.reason = "failed to secure proxy record"
572:         return $Result
573:       }
574:       $CacheRecord = [ordered]@{
575:         cache_key = $CacheKey
576:         stream_link_key = $LinkKey
---
604:   if ($RdFallback.ok) {
605:     $LinkKey = New-ProxyRecord -Url ("" + $RdFallback.url) -Title $Title -Type $Type -ContentType ("" + $RdFallback.content_type) -ContentLength ([int64]$RdFallback.content_length)
606:     if ([string]::IsNullOrWhiteSpace($LinkKey)) {
607:       $Result.reason = "failed to secure RD cloud proxy record"
608:       return $Result
609:     }
610:     $CacheRecord = [ordered]@{
611:       cache_key = $CacheKey
612:       stream_link_key = $LinkKey
---
785:     $Request.AllowAutoRedirect = $true
786:     $Request.MaximumAutomaticRedirections = 1
787:     $Request.UserAgent = "ScarFLIX-v2-StreamProxy"
788:     $Request.Timeout = 30000
789:     $Request.ReadWriteTimeout = 30000
790:     if ($Method -eq "GET") {
791:       Add-RangeHeader -Request $Request -RangeHeader $RangeHeader
792:     }
793: 
---
786:     $Request.MaximumAutomaticRedirections = 1
787:     $Request.UserAgent = "ScarFLIX-v2-StreamProxy"
788:     $Request.Timeout = 30000
789:     $Request.ReadWriteTimeout = 30000
790:     if ($Method -eq "GET") {
791:       Add-RangeHeader -Request $Request -RangeHeader $RangeHeader
792:     }
793: 
794:     $UpstreamResponse = $Request.GetResponse()
---
810:     $ResponseStream = $UpstreamResponse.GetResponseStream()
811:     Copy-Stream -InputStream $ResponseStream -OutputStream $Stream
812:   } catch {
813:     Log-Line "REVIEW" ("proxy upstream failed method={0} key={1}: {2}" -f $Method, $Key, $_.Exception.Message)
814:     $Body = [Text.Encoding]::ASCII.GetBytes("upstream failed")
815:     Send-Response -Stream $Stream -StatusLine "HTTP/1.1 502 Bad Gateway" -Headers @("Content-Type: text/plain", "Accept-Ranges: bytes", "Cache-Control: no-store") -Body $Body
816:   } finally {
817:     try { if ($UpstreamResponse) { $UpstreamResponse.Close() } } catch {}
818:   }
---
``

## D:\PlexTools\Scripts\scarflix_v2\ScarFLIX_v2_StreamProxy_Node.ps1
``text
25: Ensure-Dir $LogRoot
26: 
27: if (!(Test-Path -LiteralPath $NodeScript)) {
28:   Write-Log "FAIL" ("Missing node proxy script: {0}" -f $NodeScript)
29:   exit 1
30: }
31: 
32: $NodePath = "C:\Program Files\nodejs\node.exe"
33: if (!(Test-Path -LiteralPath $NodePath)) {
---
35:   if ($null -ne $NodeCmd) { $NodePath = $NodeCmd.Source }
36: }
37: if (!(Test-Path -LiteralPath $NodePath)) {
38:   Write-Log "FAIL" "node.exe was not found in PATH"
39:   exit 1
40: }
41: 
42: Write-Log "PASS" ("Starting Node stream proxy: {0}" -f $NodeScript)
43: & $NodePath $NodeScript
---
42: Write-Log "PASS" ("Starting Node stream proxy: {0}" -f $NodeScript)
43: & $NodePath $NodeScript
44: $ExitCode = $LASTEXITCODE
45: Write-Log "REVIEW" ("Node stream proxy exited with code {0}" -f $ExitCode)
46: exit $ExitCode
---
``

## D:\PlexTools\Scripts\scarflix_v2\scarflix_v2_stream_proxy_node.js
``text
1: // ScarFLIX v2 concurrent stream proxy for Plex clients.
2: // No upstream URLs or token [REDACTED] are printed to logs.
3: 
4: "use strict";
5: 
6: const http = require("http");
---
18: const SOURCE_QUARANTINE_RETRYABLE_MS = 24 * 60 * 60 * 1000;
19: const SOURCE_QUARANTINE_PERMANENT_MS = 14 * 24 * 60 * 60 * 1000;
20: const MIN_LIVE_CONTENT_LENGTH = 52428800;
21: const BUFFER_TIMEOUT_MS = 45000;
22: const UPSTREAM_OPEN_TIMEOUT_MS = 25000;
23: const ALLOWED_TYPES = new Set(["video/mp4", "video/x-matroska", "application/octet-stream", "application/force-download"]);
24: const REJECT_TYPES = new Set(["application/vnd.apple.mpegurl", "application/x-mpegurl", "application/dash+xml"]);
25: 
26: const memoryCache = new Map();
---
19: const SOURCE_QUARANTINE_PERMANENT_MS = 14 * 24 * 60 * 60 * 1000;
20: const MIN_LIVE_CONTENT_LENGTH = 52428800;
21: const BUFFER_TIMEOUT_MS = 45000;
22: const UPSTREAM_OPEN_TIMEOUT_MS = 25000;
23: const ALLOWED_TYPES = new Set(["video/mp4", "video/x-matroska", "application/octet-stream", "application/force-download"]);
24: const REJECT_TYPES = new Set(["application/vnd.apple.mpegurl", "application/x-mpegurl", "application/dash+xml"]);
25: 
26: const memoryCache = new Map();
27: 
---
140:     "User-Agent": "ScarFLIX-v2-NodeProxy"
141:   };
142:   if (options.body) headers["Content-Type"] = "application/x-www-form-urlencoded";
143:   const response = await fetchWithTimeout(`[REDACTED_REAL_DEBRID_URL] {
144:     method: options.method || "GET",
145:     headers,
146:     body: options.body,
147:     timeout: options.timeout || 30000
148:   });
---
144:     method: options.method || "GET",
145:     headers,
146:     body: options.body,
147:     timeout: options.timeout || 30000
148:   });
149:   if (response.status === 204) return {};
150:   if (!response.ok) throw new Error(`RD HTTP ${response.status}`);
151:   return await response.json();
152: }
---
392:     source_id: String(resolved.sourceId || ""),
393:     source_kind: String(resolved.sourceKind || ""),
394:     final_host: String(resolved.finalHost || ""),
395:     reason_code: String(reasonCode || "UPSTREAM_FAILURE"),
396:     reason: ascii(reason || ""),
397:     retryable: !!retryable,
398:     urls_stored: false,
399:     title_not_rejected: true
400:   };
---
402:   try {
403:     fs.writeFileSync(path.join(SOURCE_QUARANTINE_ROOT, name), JSON.stringify(record, null, 2) + "\r\n", "utf8");
404:     writeSourceQuarantineStatus();
405:     log("REVIEW", `source quarantined kind=${record.source_kind} reason=${record.reason_code} retryable=${record.retryable} host=${record.final_host}`);
406:     return true;
407:   } catch (err) {
408:     log("REVIEW", `source quarantine write failed: ${err && err.message ? err.message : "error"}`);
409:     return false;
410:   }
---
405:     log("REVIEW", `source quarantined kind=${record.source_kind} reason=${record.reason_code} retryable=${record.retryable} host=${record.final_host}`);
406:     return true;
407:   } catch (err) {
408:     log("REVIEW", `source quarantine write failed: ${err && err.message ? err.message : "error"}`);
409:     return false;
410:   }
411: }
412: 
413: async function fetchJson(url, options = {}) {
---
412: 
413: async function fetchJson(url, options = {}) {
414:   const controller = new AbortController();
415:   const timeout = setTimeout(() => controller.abort(), options.timeout || BUFFER_TIMEOUT_MS);
416:   try {
417:     const response = await fetch(url, { ...options, signal: controller.signal });
418:     if (!response.ok) throw new Error(`HTTP ${response.status}`);
419:     return await response.json();
420:   } finally {
---
418:     if (!response.ok) throw new Error(`HTTP ${response.status}`);
419:     return await response.json();
420:   } finally {
421:     clearTimeout(timeout);
422:   }
423: }
424: 
425: async function fetchWithTimeout(url, options = {}) {
426:   const controller = new AbortController();
---
422:   }
423: }
424: 
425: async function fetchWithTimeout(url, options = {}) {
426:   const controller = new AbortController();
427:   const timeout = setTimeout(() => controller.abort(), options.timeout || BUFFER_TIMEOUT_MS);
428:   try {
429:     return await fetch(url, { ...options, signal: controller.signal, redirect: "follow" });
430:   } finally {
---
424: 
425: async function fetchWithTimeout(url, options = {}) {
426:   const controller = new AbortController();
427:   const timeout = setTimeout(() => controller.abort(), options.timeout || BUFFER_TIMEOUT_MS);
428:   try {
429:     return await fetch(url, { ...options, signal: controller.signal, redirect: "follow" });
430:   } finally {
431:     clearTimeout(timeout);
432:   }
---
428:   try {
429:     return await fetch(url, { ...options, signal: controller.signal, redirect: "follow" });
430:   } finally {
431:     clearTimeout(timeout);
432:   }
433: }
434: 
435: async function getImdbId(type, tmdbId, existingImdb) {
436:   if (existingImdb && /^tt\d+$/i.test(existingImdb)) return existingImdb;
---
447:   else url += `?api_key=[REDACTED]
448: 
449:   try {
450:     const json = await fetchJson(url, { headers, timeout: 20000 });
451:     return String(json.imdb_id || "");
452:   } catch (_) {
453:     return "";
454:   }
455: }
---
469:     return false;
470:   }
471:   try {
472:     const json = await fetchJson(url, { timeout: 15000, headers });
473:     return json && json.adult === true;
474:   } catch (_) {
475:     return false;
476:   }
477: }
---
485:   try { result.finalHost = new URL(candidateUrl).host; } catch (_) {}
486: 
487:   try {
488:     const head = await fetchWithTimeout(candidateUrl, { method: "HEAD", timeout: 30000, headers: { "User-Agent": "ScarFLIX-v2-NodeProxy" } });
489:     if (head.status !== 200) {
490:       result.reason = `HEAD not 200 (${head.status})`;
491:       return result;
492:     }
493:     const ct = contentTypeCore(head.headers.get("content-type"));
---
507:       return result;
508:     }
509: 
510:     const range = await fetchWithTimeout(candidateUrl, {
511:       method: "GET",
512:       timeout: 30000,
513:       headers: { "User-Agent": "ScarFLIX-v2-NodeProxy", "Range": "bytes=0-1" }
514:     });
515:     if (range.body) {
---
509: 
510:     const range = await fetchWithTimeout(candidateUrl, {
511:       method: "GET",
512:       timeout: 30000,
513:       headers: { "User-Agent": "ScarFLIX-v2-NodeProxy", "Range": "bytes=0-1" }
514:     });
515:     if (range.body) {
516:       try { await range.body.cancel(); } catch (_) {}
517:     }
---
528:     result.ok = true;
529:     return result;
530:   } catch (err) {
``

## D:\PlexTools\Scripts\scarflix_v2\scarflix_v2_stream_proxy_node.js.bak_source_quarantine_20260603_111705
``text
1: // ScarFLIX v2 concurrent stream proxy for Plex clients.
2: // No upstream URLs or token [REDACTED] are printed to logs.
3: 
4: "use strict";
5: 
6: const http = require("http");
---
14: const STATE_ROOT = "D:\\PlexTools\\state\\scarflix_v2\\node_proxy";
15: const LIVE_CACHE_MS = 6 * 60 * 60 * 1000;
16: const MIN_LIVE_CONTENT_LENGTH = 52428800;
17: const BUFFER_TIMEOUT_MS = 45000;
18: const UPSTREAM_OPEN_TIMEOUT_MS = 25000;
19: const ALLOWED_TYPES = new Set(["video/mp4", "video/x-matroska", "application/octet-stream", "application/force-download"]);
20: const REJECT_TYPES = new Set(["application/vnd.apple.mpegurl", "application/x-mpegurl", "application/dash+xml"]);
21: 
22: const memoryCache = new Map();
---
15: const LIVE_CACHE_MS = 6 * 60 * 60 * 1000;
16: const MIN_LIVE_CONTENT_LENGTH = 52428800;
17: const BUFFER_TIMEOUT_MS = 45000;
18: const UPSTREAM_OPEN_TIMEOUT_MS = 25000;
19: const ALLOWED_TYPES = new Set(["video/mp4", "video/x-matroska", "application/octet-stream", "application/force-download"]);
20: const REJECT_TYPES = new Set(["application/vnd.apple.mpegurl", "application/x-mpegurl", "application/dash+xml"]);
21: 
22: const memoryCache = new Map();
23: 
---
106:     "User-Agent": "ScarFLIX-v2-NodeProxy"
107:   };
108:   if (options.body) headers["Content-Type"] = "application/x-www-form-urlencoded";
109:   const response = await fetchWithTimeout(`[REDACTED_REAL_DEBRID_URL] {
110:     method: options.method || "GET",
111:     headers,
112:     body: options.body,
113:     timeout: options.timeout || 30000
114:   });
---
110:     method: options.method || "GET",
111:     headers,
112:     body: options.body,
113:     timeout: options.timeout || 30000
114:   });
115:   if (response.status === 204) return {};
116:   if (!response.ok) throw new Error(`RD HTTP ${response.status}`);
117:   return await response.json();
118: }
---
268: 
269: async function fetchJson(url, options = {}) {
270:   const controller = new AbortController();
271:   const timeout = setTimeout(() => controller.abort(), options.timeout || BUFFER_TIMEOUT_MS);
272:   try {
273:     const response = await fetch(url, { ...options, signal: controller.signal });
274:     if (!response.ok) throw new Error(`HTTP ${response.status}`);
275:     return await response.json();
276:   } finally {
---
274:     if (!response.ok) throw new Error(`HTTP ${response.status}`);
275:     return await response.json();
276:   } finally {
277:     clearTimeout(timeout);
278:   }
279: }
280: 
281: async function fetchWithTimeout(url, options = {}) {
282:   const controller = new AbortController();
---
278:   }
279: }
280: 
281: async function fetchWithTimeout(url, options = {}) {
282:   const controller = new AbortController();
283:   const timeout = setTimeout(() => controller.abort(), options.timeout || BUFFER_TIMEOUT_MS);
284:   try {
285:     return await fetch(url, { ...options, signal: controller.signal, redirect: "follow" });
286:   } finally {
---
280: 
281: async function fetchWithTimeout(url, options = {}) {
282:   const controller = new AbortController();
283:   const timeout = setTimeout(() => controller.abort(), options.timeout || BUFFER_TIMEOUT_MS);
284:   try {
285:     return await fetch(url, { ...options, signal: controller.signal, redirect: "follow" });
286:   } finally {
287:     clearTimeout(timeout);
288:   }
---
284:   try {
285:     return await fetch(url, { ...options, signal: controller.signal, redirect: "follow" });
286:   } finally {
287:     clearTimeout(timeout);
288:   }
289: }
290: 
291: async function getImdbId(type, tmdbId, existingImdb) {
292:   if (existingImdb && /^tt\d+$/i.test(existingImdb)) return existingImdb;
---
303:   else url += `?api_key=[REDACTED]
304: 
305:   try {
306:     const json = await fetchJson(url, { headers, timeout: 20000 });
307:     return String(json.imdb_id || "");
308:   } catch (_) {
309:     return "";
310:   }
311: }
---
325:     return false;
326:   }
327:   try {
328:     const json = await fetchJson(url, { timeout: 15000, headers });
329:     return json && json.adult === true;
330:   } catch (_) {
331:     return false;
332:   }
333: }
---
341:   try { result.finalHost = new URL(candidateUrl).host; } catch (_) {}
342: 
343:   try {
344:     const head = await fetchWithTimeout(candidateUrl, { method: "HEAD", timeout: 30000, headers: { "User-Agent": "ScarFLIX-v2-NodeProxy" } });
345:     if (head.status !== 200) {
346:       result.reason = `HEAD not 200 (${head.status})`;
347:       return result;
348:     }
349:     const ct = contentTypeCore(head.headers.get("content-type"));
---
363:       return result;
364:     }
365: 
366:     const range = await fetchWithTimeout(candidateUrl, {
367:       method: "GET",
368:       timeout: 30000,
369:       headers: { "User-Agent": "ScarFLIX-v2-NodeProxy", "Range": "bytes=0-1" }
370:     });
371:     if (range.body) {
---
365: 
366:     const range = await fetchWithTimeout(candidateUrl, {
367:       method: "GET",
368:       timeout: 30000,
369:       headers: { "User-Agent": "ScarFLIX-v2-NodeProxy", "Range": "bytes=0-1" }
370:     });
371:     if (range.body) {
372:       try { await range.body.cancel(); } catch (_) {}
373:     }
---
384:     result.ok = true;
385:     return result;
386:   } catch (err) {
387:     result.reason = err && err.message ? err.message : "admission failed";
388:     return result;
389:   }
390: }
391: 
392: function selectRdFiles(info, wantedFilename) {
---
426:   try {
427:     const body = new URLSearchParams();
428:     body.set("magnet", `magnet:?xt=urn:btih:${hash}`);
429:     const added = await rdApi("/torrents/addMagnet", { method: "POST", body, timeout: 30000 });
430:     torrentId = String(added.id || "");
431:   } catch (err) {
432:     result.reason = err && err.message ? err.message : "RD addMagnet failed";
433:     return result;
434:   }
---
429:     const added = await rdApi("/torrents/addMagnet", { method: "POST", body, timeout: 30000 });
430:     torrentId = String(added.id || "");
431:   } catch (err) {
432:     result.reason = err && err.message ? err.message : "RD addMagnet failed";
433:     return result;
434:   }
435:   if (!torrentId) {
436:     result.reason = "RD addMagnet returned no id";
437:     return result;
---
439: 
440:   let info = null;
441:   try {
``

## D:\PlexTools\Scripts\scarflix_v2\ScarFLIX_v2_StremioDirectResolver.ps1
``text
25: 
26: $Processed = 0
27: $Ready = 0
28: $Failed = 0
29: $Skipped = 0
30: $LastTitle = ""
31: $LastError = ""
32: $Warnings = New-Object System.Collections.ArrayList
33: 
---
88:     if ($null -eq $Protected) { throw "DPAPI returned null" }
89:     return [Convert]::ToBase64String($Protected)
90:   } catch {
91:     throw ("DPAPI protect failed: {0}" -f $_.Exception.Message)
92:   }
93: }
94: 
95: function Get-TokenLine {
96:   param([string[]]$Names)
---
345:     $script:Skipped = $script:Skipped + 1
346:     return
347:   }
348:   if ($Current -eq "FAILED") {
349:     $script:Skipped = $script:Skipped + 1
350:     return
351:   }
352: 
353:   $script:Processed = $script:Processed + 1
---
359: 
360:   $StremioId = Get-StremioId $Request
361:   if ([string]::IsNullOrWhiteSpace($StremioId)) {
362:     Set-Prop $State "state" "FAILED"
363:     Set-Prop $State "reject_reason" "Missing imdb_id and TMDB external ID lookup failed"
364:     Set-Prop $State "updated_utc" (Get-Date).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ")
365:     Save-State -Folder $Folder -State $State
366:     $script:Failed = $script:Failed + 1
367:     return
---
360:   $StremioId = Get-StremioId $Request
361:   if ([string]::IsNullOrWhiteSpace($StremioId)) {
362:     Set-Prop $State "state" "FAILED"
363:     Set-Prop $State "reject_reason" "Missing imdb_id and TMDB external ID lookup failed"
364:     Set-Prop $State "updated_utc" (Get-Date).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ")
365:     Save-State -Folder $Folder -State $State
366:     $script:Failed = $script:Failed + 1
367:     return
368:   }
---
363:     Set-Prop $State "reject_reason" "Missing imdb_id and TMDB external ID lookup failed"
364:     Set-Prop $State "updated_utc" (Get-Date).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ")
365:     Save-State -Folder $Folder -State $State
366:     $script:Failed = $script:Failed + 1
367:     return
368:   }
369: 
370:   $Base = Get-StremioBase
371:   if ([string]::IsNullOrWhiteSpace($Base)) {
---
369: 
370:   $Base = Get-StremioBase
371:   if ([string]::IsNullOrWhiteSpace($Base)) {
372:     Set-Prop $State "state" "FAILED"
373:     Set-Prop $State "reject_reason" "Missing Stremio/Torrentio endpoint in token [REDACTED]"
374:     Set-Prop $State "updated_utc" (Get-Date).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ")
375:     Save-State -Folder $Folder -State $State
376:     $script:Failed = $script:Failed + 1
377:     return
---
373:     Set-Prop $State "reject_reason" "Missing Stremio/Torrentio endpoint in token [REDACTED]"
374:     Set-Prop $State "updated_utc" (Get-Date).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ")
375:     Save-State -Folder $Folder -State $State
376:     $script:Failed = $script:Failed + 1
377:     return
378:   }
379: 
380:   $StreamUri = "{0}/{1}/{2}.json" -f $Base, $StremioType, [Uri]::EscapeDataString($StremioId)
381:   $Streams = @()
---
384:     if ($Resp.streams) { $Streams = @($Resp.streams) }
385:   } catch {
386:     $script:LastError = $_.Exception.Message
387:     Set-Prop $State "state" "FAILED"
388:     Set-Prop $State "reject_reason" "Stremio stream lookup failed"
389:     Set-Prop $State "updated_utc" (Get-Date).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ")
390:     Save-State -Folder $Folder -State $State
391:     $script:Failed = $script:Failed + 1
392:     return
---
385:   } catch {
386:     $script:LastError = $_.Exception.Message
387:     Set-Prop $State "state" "FAILED"
388:     Set-Prop $State "reject_reason" "Stremio stream lookup failed"
389:     Set-Prop $State "updated_utc" (Get-Date).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ")
390:     Save-State -Folder $Folder -State $State
391:     $script:Failed = $script:Failed + 1
392:     return
393:   }
---
388:     Set-Prop $State "reject_reason" "Stremio stream lookup failed"
389:     Set-Prop $State "updated_utc" (Get-Date).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ")
390:     Save-State -Folder $Folder -State $State
391:     $script:Failed = $script:Failed + 1
392:     return
393:   }
394: 
395:   if ($Streams.Count -le 0) {
396:     Set-Prop $State "state" "FAILED"
---
393:   }
394: 
395:   if ($Streams.Count -le 0) {
396:     Set-Prop $State "state" "FAILED"
397:     Set-Prop $State "reject_reason" "No Stremio streams returned"
398:     Set-Prop $State "updated_utc" (Get-Date).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ")
399:     Save-State -Folder $Folder -State $State
400:     $script:Failed = $script:Failed + 1
401:     return
---
397:     Set-Prop $State "reject_reason" "No Stremio streams returned"
398:     Set-Prop $State "updated_utc" (Get-Date).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ")
399:     Save-State -Folder $Folder -State $State
400:     $script:Failed = $script:Failed + 1
401:     return
402:   }
403: 
404:   $Chosen = $null
405:   $Admission = $null
---
421:   }
422: 
423:   if ($null -eq $Chosen) {
424:     Set-Prop $State "state" "FAILED"
425:     Set-Prop $State "reject_reason" "No stream passed admission gate"
426:     Set-Prop $State "updated_utc" (Get-Date).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ")
427:     if ($null -ne $Admission) { Set-Prop $State "last_admission_error" ("" + $Admission.reason) }
428:     Save-State -Folder $Folder -State $State
429:     $script:Failed = $script:Failed + 1
---
426:     Set-Prop $State "updated_utc" (Get-Date).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ")
427:     if ($null -ne $Admission) { Set-Prop $State "last_admission_error" ("" + $Admission.reason) }
428:     Save-State -Folder $Folder -State $State
429:     $script:Failed = $script:Failed + 1
430:     return
431:   }
432: 
433:   $ChosenUrl = "" + $Chosen.url
434:   $Key = New-ProxyRecord -Url $ChosenUrl -Title $Title -Type $Type -ContentType ("" + $Admission.content_type) -ContentLength ([int64]$Admission.content_length)
---
490: 
491: $Ended = Get-Date
492: $FinalStatus = "PASS"
493: if ($Failed -gt 0) { $FinalStatus = "REVIEW" }
494: if ($Ready -eq 0 -and $Processed -gt 0 -and $Failed -gt 0) { $FinalStatus = "FAIL" }
495: 
496: $Summary = [ordered]@{
497:   component = $Component
498:   status = $FinalStatus
---
491: $Ended = Get-Date
492: $FinalStatus = "PASS"
493: if ($Failed -gt 0) { $FinalStatus = "REVIEW" }
494: if ($Ready -eq 0 -and $Processed -gt 0 -and $Failed -gt 0) { $FinalStatus = "FAIL" }
495: 
496: $Summary = [ordered]@{
497:   component = $Component
498:   status = $FinalStatus
499:   started_utc = $Started.ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ")
---
501:   duration_seconds = [int]($Ended - $Started).TotalSeconds
502:   processed = $Processed
503:   ready = $Ready
504:   failed = $Failed
505:   skipped = $Skipped
506:   last_title = $LastTitle
507:   last_error = $LastError
508:   output_movies = $OutMovies
509:   output_tv = $OutTv
---
``

## D:\PlexTools\Scripts\scarflix_v2\ScarFLIX_v2_TargetedReady.ps1
``text
114:   if ([string]::IsNullOrWhiteSpace($out)) { return [ordered]@{ ok=$false; reason="target disappeared" } }
115:   $line = ($out -split "`r?`n" | Select-Object -First 1)
116:   $cols = $line -split "`t", 9
117:   if ($cols.Count -lt 9) { return [ordered]@{ ok=$false; reason="profile query parse failed" } }
118:   $width = [int]$cols[0]
119:   $height = [int]$cols[1]
120:   $duration = [int64]$cols[2]
121:   $video = "" + $cols[3]
122:   $audio = "" + $cols[4]
---
132: Ensure-Dir $LogRoot
133: Ensure-Dir $PublishRoot
134: $started = Get-Date
135: $status = "REVIEW"
136: $target = Resolve-Target
137: $profile = [ordered]@{ ok = $false; reason = "not run" }
138: 
139: if ($null -eq $target) {
140:   Write-Step "FAIL" "No matching Plex media item found for targeted readiness."
---
137: $profile = [ordered]@{ ok = $false; reason = "not run" }
138: 
139: if ($null -eq $target) {
140:   Write-Step "FAIL" "No matching Plex media item found for targeted readiness."
141:   $status = "FAIL"
142: } elseif (!(Test-Path -LiteralPath $BridgeScript)) {
143:   Write-Step "FAIL" "WebDAV bridge script missing."
144:   $status = "FAIL"
145: } else {
---
138: 
139: if ($null -eq $target) {
140:   Write-Step "FAIL" "No matching Plex media item found for targeted readiness."
141:   $status = "FAIL"
142: } elseif (!(Test-Path -LiteralPath $BridgeScript)) {
143:   Write-Step "FAIL" "WebDAV bridge script missing."
144:   $status = "FAIL"
145: } else {
146:   Write-Step "INFO" ("Target: metadata={0} part={1} title={2}" -f $target.metadata_id,$target.part_id,$target.title)
---
140:   Write-Step "FAIL" "No matching Plex media item found for targeted readiness."
141:   $status = "FAIL"
142: } elseif (!(Test-Path -LiteralPath $BridgeScript)) {
143:   Write-Step "FAIL" "WebDAV bridge script missing."
144:   $status = "FAIL"
145: } else {
146:   Write-Step "INFO" ("Target: metadata={0} part={1} title={2}" -f $target.metadata_id,$target.part_id,$target.title)
147:   $profile = Test-TargetProfiled -PartIdValue ([int64]$target.part_id)
148:   if ($profile.ok) {
---
141:   $status = "FAIL"
142: } elseif (!(Test-Path -LiteralPath $BridgeScript)) {
143:   Write-Step "FAIL" "WebDAV bridge script missing."
144:   $status = "FAIL"
145: } else {
146:   Write-Step "INFO" ("Target: metadata={0} part={1} title={2}" -f $target.metadata_id,$target.part_id,$target.title)
147:   $profile = Test-TargetProfiled -PartIdValue ([int64]$target.part_id)
148:   if ($profile.ok) {
149:     Write-Step "PASS" ("Target already ready: {0}" -f $profile.file)
---
150:     $status = "PASS"
151:   } elseif (("" + $target.file) -like "S:\media\part-*" -or ("" + $target.file) -like "*\ScarFLIX_part-*") {
152:     if (!(Test-Path -LiteralPath $HydratorScript)) {
153:       Write-Step "FAIL" "Hydrator script missing."
154:       $status = "FAIL"
155:     } else {
156:       $args = @("-NoProfile", "-ExecutionPolicy", "Bypass", "-File", $HydratorScript, "-AllLive", "-MaxItems", "1", "-TargetPath", ("" + $target.file))
157:       $proc = Start-Process -FilePath "powershell.exe" -ArgumentList $args -NoNewWindow -PassThru
158:       $finished = $proc.WaitForExit(180000)
---
151:   } elseif (("" + $target.file) -like "S:\media\part-*" -or ("" + $target.file) -like "*\ScarFLIX_part-*") {
152:     if (!(Test-Path -LiteralPath $HydratorScript)) {
153:       Write-Step "FAIL" "Hydrator script missing."
154:       $status = "FAIL"
155:     } else {
156:       $args = @("-NoProfile", "-ExecutionPolicy", "Bypass", "-File", $HydratorScript, "-AllLive", "-MaxItems", "1", "-TargetPath", ("" + $target.file))
157:       $proc = Start-Process -FilePath "powershell.exe" -ArgumentList $args -NoNewWindow -PassThru
158:       $finished = $proc.WaitForExit(180000)
159:       if (!$finished) {
---
158:       $finished = $proc.WaitForExit(180000)
159:       if (!$finished) {
160:         try { & taskkill.exe /PID $proc.Id /T /F | Out-Null } catch {}
161:         Write-Step "FAIL" "Targeted hydrator timed out."
162:         $status = "FAIL"
163:       } else {
164:         $profile = Test-TargetProfiled -PartIdValue ([int64]$target.part_id)
165:         if ($profile.ok) {
166:           Write-Step "PASS" ("Target ready after direct hydrate: {0}" -f $profile.file)
---
159:       if (!$finished) {
160:         try { & taskkill.exe /PID $proc.Id /T /F | Out-Null } catch {}
161:         Write-Step "FAIL" "Targeted hydrator timed out."
162:         $status = "FAIL"
163:       } else {
164:         $profile = Test-TargetProfiled -PartIdValue ([int64]$target.part_id)
165:         if ($profile.ok) {
166:           Write-Step "PASS" ("Target ready after direct hydrate: {0}" -f $profile.file)
167:           $status = "PASS"
---
166:           Write-Step "PASS" ("Target ready after direct hydrate: {0}" -f $profile.file)
167:           $status = "PASS"
168:         } else {
169:           Write-Step "REVIEW" ("Target not fully profiled after direct hydrate: {0}" -f ($profile | ConvertTo-Json -Compress -Depth 4))
170:           $status = "REVIEW"
171:         }
172:       }
173:     }
174:   } else {
---
167:           $status = "PASS"
168:         } else {
169:           Write-Step "REVIEW" ("Target not fully profiled after direct hydrate: {0}" -f ($profile | ConvertTo-Json -Compress -Depth 4))
170:           $status = "REVIEW"
171:         }
172:       }
173:     }
174:   } else {
175:     $args = @("-NoProfile", "-ExecutionPolicy", "Bypass", "-File", $BridgeScript, "-TargetPartId", ("" + $target.part_id), "-MaxHydrateItems", "1")
---
177:     $finished = $proc.WaitForExit(180000)
178:     if (!$finished) {
179:       try { & taskkill.exe /PID $proc.Id /T /F | Out-Null } catch {}
180:       Write-Step "FAIL" "Targeted WebDAV bridge timed out."
181:       $status = "FAIL"
182:     } else {
183:       $profile = Test-TargetProfiled -PartIdValue ([int64]$target.part_id)
184:       if ($profile.ok) {
185:         Write-Step "PASS" ("Target ready after bridge: {0}" -f $profile.file)
---
178:     if (!$finished) {
179:       try { & taskkill.exe /PID $proc.Id /T /F | Out-Null } catch {}
180:       Write-Step "FAIL" "Targeted WebDAV bridge timed out."
181:       $status = "FAIL"
182:     } else {
183:       $profile = Test-TargetProfiled -PartIdValue ([int64]$target.part_id)
184:       if ($profile.ok) {
185:         Write-Step "PASS" ("Target ready after bridge: {0}" -f $profile.file)
186:         $status = "PASS"
---
185:         Write-Step "PASS" ("Target ready after bridge: {0}" -f $profile.file)
186:         $status = "PASS"
187:       } else {
188:         Write-Step "REVIEW" ("Target not fully profiled after bridge: {0}" -f ($profile | ConvertTo-Json -Compress -Depth 4))
189:         $status = "REVIEW"
190:       }
191:     }
192:   }
193: }
---
186:         $status = "PASS"
187:       } else {
188:         Write-Step "REVIEW" ("Target not fully profiled after bridge: {0}" -f ($profile | ConvertTo-Json -Compress -Depth 4))
189:         $status = "REVIEW"
190:       }
191:     }
192:   }
193: }
194: 
---
208: [IO.File]::WriteAllText($StatusJson, $json, $utf8NoBom)
209: Write-Step $status ("Final status: {0}" -f $status)
210: Write-Host ("Status JSON: {0}" -f $StatusJson)
211: if ($status -eq "FAIL") { exit 1 }
212: exit 0
---
``

## D:\PlexTools\Scripts\scarflix_v2\ScarFLIX_v2_TargetedReadyBatch.ps1
``text
1: param(
2:   [int]$MaxItems = 3,
3:   [int]$PerItemTimeoutSeconds = 240,
4:   [switch]$InstallTask
5: )
6: 
7: $ErrorActionPreference = "Continue"
8: try { [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12 } catch {}
---
145: $status = "PASS"
146: $processed = 0
147: $passed = 0
148: $review = 0
149: $failed = 0
150: $results = New-Object System.Collections.ArrayList
151: $before = Get-LiveCounts
152: Write-Step "INFO" ("Targeted ready batch starting: MaxItems={0}" -f $MaxItems)
153: 
---
146: $processed = 0
147: $passed = 0
148: $review = 0
149: $failed = 0
150: $results = New-Object System.Collections.ArrayList
151: $before = Get-LiveCounts
152: Write-Step "INFO" ("Targeted ready batch starting: MaxItems={0}" -f $MaxItems)
153: 
154: if (!(Test-Path -LiteralPath $TargetedReady)) {
---
152: Write-Step "INFO" ("Targeted ready batch starting: MaxItems={0}" -f $MaxItems)
153: 
154: if (!(Test-Path -LiteralPath $TargetedReady)) {
155:   $status = "FAIL"
156:   $failed = 1
157:   Write-Step "FAIL" "TargetedReady script missing."
158: } else {
159:   $targets = @(Get-UnreadyLiveStrmParts)
160:   foreach ($target in @($targets)) {
---
153: 
154: if (!(Test-Path -LiteralPath $TargetedReady)) {
155:   $status = "FAIL"
156:   $failed = 1
157:   Write-Step "FAIL" "TargetedReady script missing."
158: } else {
159:   $targets = @(Get-UnreadyLiveStrmParts)
160:   foreach ($target in @($targets)) {
161:     $processed++
---
154: if (!(Test-Path -LiteralPath $TargetedReady)) {
155:   $status = "FAIL"
156:   $failed = 1
157:   Write-Step "FAIL" "TargetedReady script missing."
158: } else {
159:   $targets = @(Get-UnreadyLiveStrmParts)
160:   foreach ($target in @($targets)) {
161:     $processed++
162:     Write-Step "INFO" ("Preparing part={0} metadata={1} section={2} title={3}" -f $target.part_id,$target.metadata_id,$target.library_section_id,$target.title)
---
166:       section_id = $target.library_section_id
167:       title = $target.title
168:       source_file = $target.file
169:       status = "REVIEW"
170:       reason = ""
171:     }
172:     $proc = Start-Process -FilePath "powershell.exe" -ArgumentList @("-NoProfile","-ExecutionPolicy","Bypass","-File",$TargetedReady,"-PartId",("" + $target.part_id)) -NoNewWindow -PassThru
173:     $finished = $proc.WaitForExit($PerItemTimeoutSeconds * 1000)
174:     if (!$finished) {
---
170:       reason = ""
171:     }
172:     $proc = Start-Process -FilePath "powershell.exe" -ArgumentList @("-NoProfile","-ExecutionPolicy","Bypass","-File",$TargetedReady,"-PartId",("" + $target.part_id)) -NoNewWindow -PassThru
173:     $finished = $proc.WaitForExit($PerItemTimeoutSeconds * 1000)
174:     if (!$finished) {
175:       try { & taskkill.exe /PID $proc.Id /T /F | Out-Null } catch {}
176:       $result.status = "REVIEW"
177:       $result.reason = "TargetedReady timed out"
178:       $review++
---
173:     $finished = $proc.WaitForExit($PerItemTimeoutSeconds * 1000)
174:     if (!$finished) {
175:       try { & taskkill.exe /PID $proc.Id /T /F | Out-Null } catch {}
176:       $result.status = "REVIEW"
177:       $result.reason = "TargetedReady timed out"
178:       $review++
179:     } elseif ($proc.ExitCode -ne 0) {
180:       $targetStatus = Read-JsonSafe (Join-Path $PublishRoot "targeted_ready_status.json")
181:       $targetResult = "REVIEW"
---
175:       try { & taskkill.exe /PID $proc.Id /T /F | Out-Null } catch {}
176:       $result.status = "REVIEW"
177:       $result.reason = "TargetedReady timed out"
178:       $review++
179:     } elseif ($proc.ExitCode -ne 0) {
180:       $targetStatus = Read-JsonSafe (Join-Path $PublishRoot "targeted_ready_status.json")
181:       $targetResult = "REVIEW"
182:       if ($targetStatus -and $targetStatus.PSObject.Properties["status"]) { $targetResult = "" + $targetStatus.status }
183:       if ($targetResult -eq "PASS") {
---
178:       $review++
179:     } elseif ($proc.ExitCode -ne 0) {
180:       $targetStatus = Read-JsonSafe (Join-Path $PublishRoot "targeted_ready_status.json")
181:       $targetResult = "REVIEW"
182:       if ($targetStatus -and $targetStatus.PSObject.Properties["status"]) { $targetResult = "" + $targetStatus.status }
183:       if ($targetResult -eq "PASS") {
184:         $result.status = "PASS"
185:         $result.reason = "ready"
186:         $passed++
---
185:         $result.reason = "ready"
186:         $passed++
187:       } else {
188:         $result.status = "FAIL"
189:         $result.reason = ("TargetedReady exit {0}; status {1}" -f $proc.ExitCode,$targetResult)
190:         $failed++
191:       }
192:     } else {
193:       $targetStatus = Read-JsonSafe (Join-Path $PublishRoot "targeted_ready_status.json")
---
187:       } else {
188:         $result.status = "FAIL"
189:         $result.reason = ("TargetedReady exit {0}; status {1}" -f $proc.ExitCode,$targetResult)
190:         $failed++
191:       }
192:     } else {
193:       $targetStatus = Read-JsonSafe (Join-Path $PublishRoot "targeted_ready_status.json")
194:       $targetResult = "REVIEW"
195:       if ($targetStatus -and $targetStatus.PSObject.Properties["status"]) { $targetResult = "" + $targetStatus.status }
---
191:       }
192:     } else {
193:       $targetStatus = Read-JsonSafe (Join-Path $PublishRoot "targeted_ready_status.json")
194:       $targetResult = "REVIEW"
195:       if ($targetStatus -and $targetStatus.PSObject.Properties["status"]) { $targetResult = "" + $targetStatus.status }
196:       if ($targetResult -eq "PASS") {
197:         $result.status = "PASS"
198:         $result.reason = "ready"
199:         $passed++
---
198:         $result.reason = "ready"
199:         $passed++
200:       } else {
201:         $result.status = "REVIEW"
202:         $result.reason = ("TargetedReady status {0}" -f $targetResult)
203:         $review++
204:       }
205:     }
206:     [void]$results.Add($result)
---
200:       } else {
201:         $result.status = "REVIEW"
202:         $result.reason = ("TargetedReady status {0}" -f $targetResult)
203:         $review++
204:       }
205:     }
206:     [void]$results.Add($result)
207:   }
208: }
---
207:   }
208: }
209: 
210: if ($failed -gt 0) { $status = "FAIL" } elseif ($review -gt 0) { $status = "REVIEW" }
211: $after = Get-LiveCounts
212: $ended = Get-Date
213: $summary = [ordered]@{
214:   component = $Component
215:   status = $status
---
218:   duration_seconds = [int]($ended - $started).TotalSeconds
219:   processed = $processed
220:   passed = $passed
221:   review = $review
222:   failed = $failed
223:   counts_before = $before
224:   counts_after = $after
225:   results = @($results)
226:   log = $LogPath
---
219:   processed = $processed
``

## D:\PlexTools\Scripts\scarflix_v2\ScarFLIX_v2_UniquifyPlaceholders.ps1
``text
19: $Scanned = 0
20: $Rewritten = 0
21: $Skipped = 0
22: $Failed = 0
23: $Warnings = New-Object System.Collections.ArrayList
24: $Results = New-Object System.Collections.ArrayList
25: 
26: function Ensure-Dir {
27:   param([string]$Path)
---
101:     Add-Warning ("Plex scanner missing: {0}" -f $PlexScanner)
102:     return
103:   }
104:   try { & $PlexScanner --scan --refresh --section $Section | Out-Null } catch { Add-Warning ("Plex scan failed section {0}: {1}" -f $Section, $_.Exception.Message) }
105: }
106: 
107: Ensure-Dir $LogRoot
108: Ensure-Dir $PublishRoot
109: 
---
135:       $script:Rewritten = $script:Rewritten + 1
136:       [void]$Results.Add([ordered]@{ placeholder = $Placeholder; status = "PASS"; state = $Current })
137:     } catch {
138:       $script:Failed = $script:Failed + 1
139:       [void]$Results.Add([ordered]@{ placeholder = $Placeholder; status = "FAIL"; state = $Current; error = (ConvertTo-AsciiText $_.Exception.Message) })
140:       Log-Line "FAIL" ("Could not uniquify {0}: {1}" -f $Placeholder, $_.Exception.Message)
141:     }
142:   }
143: }
---
136:       [void]$Results.Add([ordered]@{ placeholder = $Placeholder; status = "PASS"; state = $Current })
137:     } catch {
138:       $script:Failed = $script:Failed + 1
139:       [void]$Results.Add([ordered]@{ placeholder = $Placeholder; status = "FAIL"; state = $Current; error = (ConvertTo-AsciiText $_.Exception.Message) })
140:       Log-Line "FAIL" ("Could not uniquify {0}: {1}" -f $Placeholder, $_.Exception.Message)
141:     }
142:   }
143: }
144: 
---
137:     } catch {
138:       $script:Failed = $script:Failed + 1
139:       [void]$Results.Add([ordered]@{ placeholder = $Placeholder; status = "FAIL"; state = $Current; error = (ConvertTo-AsciiText $_.Exception.Message) })
140:       Log-Line "FAIL" ("Could not uniquify {0}: {1}" -f $Placeholder, $_.Exception.Message)
141:     }
142:   }
143: }
144: 
145: if ($Rewritten -gt 0) {
---
149: 
150: $Ended = Get-Date
151: $FinalStatus = "PASS"
152: if ($Failed -gt 0 -or $Warnings.Count -gt 0) { $FinalStatus = "REVIEW" }
153: if ($Scanned -gt 0 -and $Rewritten -eq 0 -and $Failed -gt 0) { $FinalStatus = "FAIL" }
154: 
155: $Summary = [ordered]@{
156:   component = $Component
157:   status = $FinalStatus
---
150: $Ended = Get-Date
151: $FinalStatus = "PASS"
152: if ($Failed -gt 0 -or $Warnings.Count -gt 0) { $FinalStatus = "REVIEW" }
153: if ($Scanned -gt 0 -and $Rewritten -eq 0 -and $Failed -gt 0) { $FinalStatus = "FAIL" }
154: 
155: $Summary = [ordered]@{
156:   component = $Component
157:   status = $FinalStatus
158:   started_utc = $Started.ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ")
---
161:   scanned_placeholders = $Scanned
162:   rewritten_unique = $Rewritten
163:   skipped = $Skipped
164:   failed = $Failed
165:   log = $LogPath
166:   results = @($Results)
167:   warnings = @($Warnings)
168: }
169: Save-Json -Path $StatusPath -Object $Summary
---
174: Write-Host ("Scanned placeholders: {0}" -f $Scanned)
175: Write-Host ("Rewritten unique: {0}" -f $Rewritten)
176: Write-Host ("Skipped: {0}" -f $Skipped)
177: Write-Host ("Failed: {0}" -f $Failed)
178: Write-Host ("Status JSON: {0}" -f $StatusPath)
179: Write-Host ("Final: {0}" -f $FinalStatus)
180: 
---
``

## D:\PlexTools\Scripts\scarflix_v2\ScarFLIX_v2_VisibleCatalogQA.ps1
``text
1: # ScarFLIX v2 visible catalog QA
2: # Verifies every visible Plex streaming row is client-safe WebDAV media and can be opened by Plex Transcoder.
3: # Windows PowerShell 5.1 compatible. No secrets are printed.
4: 
5: param(
6:   [int]$MaxItems = 0,
---
1: # ScarFLIX v2 visible catalog QA
2: # Verifies every visible Plex streaming row is client-safe WebDAV media and can be opened by Plex Transcoder.
3: # Windows PowerShell 5.1 compatible. No secrets are printed.
4: 
5: param(
6:   [int]$MaxItems = 0,
7:   [int]$Seconds = 8,
---
5: param(
6:   [int]$MaxItems = 0,
7:   [int]$Seconds = 8,
8:   [int]$TimeoutSeconds = 90,
9:   [switch]$HideFailed,
10:   [switch]$AllowInfrastructureHide,
11:   [switch]$InstallTask
12: )
13: 
---
6:   [int]$MaxItems = 0,
7:   [int]$Seconds = 8,
8:   [int]$TimeoutSeconds = 90,
9:   [switch]$HideFailed,
10:   [switch]$AllowInfrastructureHide,
11:   [switch]$InstallTask
12: )
13: 
14: $ErrorActionPreference = "Continue"
---
20: $PublishRoot = "D:\PlexTools\public\latest\scarflix"
21: $StateRoot = "D:\PlexTools\state\scarflix_v2"
22: $BackupRoot = "D:\PlexTools\backups\scarflix_v2\plex_db"
23: $PlexTranscoder = "C:\Program Files\Plex\Plex Media Server\Plex Transcoder.exe"
24: $PlexSqlite = "C:\Program Files\Plex\Plex Media Server\Plex SQLite.exe"
25: $PlexDb = "C:\Users\jason\AppData\Local\Plex Media Server\Plug-in Support\Databases\com.plexapp.plugins.library.db"
26: $CodecRoot = "C:\Users\jason\AppData\Local\Plex Media Server\Codecs"
27: $StatusJson = Join-Path $PublishRoot "visible_catalog_qa_status.json"
28: $StatusMd = Join-Path $PublishRoot "visible_catalog_qa_status.md"
---
30: $LockPath = Join-Path $StateRoot "catalog_visibility.lock"
31: $QaCachePath = Join-Path $StateRoot "visible_catalog_qa_cache.json"
32: $MapPath = Join-Path $StateRoot "webdav_map.json"
33: $ActiveGateStatusPath = Join-Path $PublishRoot "webdav_active_gate_status.json"
34: $TaskName = "ScarFLIX_v2_VisibleCatalogQA"
35: $script:QaCache = @{}
36: $script:QaCacheDirty = $false
37: $script:WebDavMapPaths = @{}
38: $script:ActiveGatePassPaths = @{}
---
31: $QaCachePath = Join-Path $StateRoot "visible_catalog_qa_cache.json"
32: $MapPath = Join-Path $StateRoot "webdav_map.json"
33: $ActiveGateStatusPath = Join-Path $PublishRoot "webdav_active_gate_status.json"
34: $TaskName = "ScarFLIX_v2_VisibleCatalogQA"
35: $script:QaCache = @{}
36: $script:QaCacheDirty = $false
37: $script:WebDavMapPaths = @{}
38: $script:ActiveGatePassPaths = @{}
39: 
---
35: $script:QaCache = @{}
36: $script:QaCacheDirty = $false
37: $script:WebDavMapPaths = @{}
38: $script:ActiveGatePassPaths = @{}
39: 
40: function Ensure-Dir {
41:   param([string]$Path)
42:   if ([string]::IsNullOrWhiteSpace($Path)) { return }
43:   if (!(Test-Path -LiteralPath $Path)) { New-Item -ItemType Directory -Path $Path -Force | Out-Null }
---
70:   if (!(Test-Path -LiteralPath $PlexSqlite)) { return "" }
71:   if (!(Test-Path -LiteralPath $PlexDb)) { return "" }
72:   try {
73:     $sqlText = ".timeout 10000`r`n" + $Sql
74:     $out = $sqlText | & $PlexSqlite -separator "`t" $PlexDb 2>&1
75:     return (($out | Out-String).Trim())
76:   } catch {
77:     return $_.Exception.Message
78:   }
---
87:     Write-Step "OK" ("Backed up Plex DB: {0}" -f $dest)
88:     return $dest
89:   } catch {
90:     Write-Step "FAIL" ("Plex DB backup failed: {0}" -f $_.Exception.Message)
91:     return ""
92:   }
93: }
94: 
95: function Install-Task {
---
111:       }
112:     } catch {}
113:     if ((Get-Date) -ge $deadline) {
114:       Write-Step "REVIEW" ("Shared catalog lock is busy: {0}" -f $LockPath)
115:       return $false
116:     }
117:     Write-Step "INFO" "Waiting for shared catalog lock."
118:     Start-Sleep -Seconds 5
119:   }
---
122:     Set-Content -LiteralPath $LockPath -Value ("pid={0};utc={1}" -f $processIdValue,(Get-Date).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ")) -Encoding UTF8 -Force
123:     return $true
124:   } catch {
125:     Write-Step "REVIEW" ("Could not create shared catalog lock: {0}" -f $_.Exception.Message)
126:     return $false
127:   }
128: }
129: 
130: function Release-Lock {
---
219:   return ($needle -match "(^|[^a-z0-9])(porn|xxx|onlyfans|hardcore porn|adult video|adult movie|adult film|hentai|erotica|erotic|erotic movie|sexploitation|softcore|unsimulated sex|explicit sex|sexual|sex|nude|nudity|naked|orgy|fetish|bdsm|playboy|centerfold|stripper|brothel|prostitute|escort|lust|desire|desires)([^a-z0-9]|$)")
220: }
221: 
222: function Test-HlsTranscodePath {
223:   param([string]$InputPath)
224:   $result = [ordered]@{ ok=$false; exit_code=$null; timed_out=$false; probe_dir=""; files=0; bytes=0; reason="" }
225:   if ([string]::IsNullOrWhiteSpace($InputPath)) {
226:     $result.reason = "empty input path"
227:     return $result
---
226:     $result.reason = "empty input path"
227:     return $result
228:   }
229:   if (!(Test-Path -LiteralPath $PlexTranscoder)) {
230:     $result.reason = "Plex Transcoder missing"
231:     return $result
232:   }
233:   $outDir = Join-Path $env:TEMP ("plex_visible_qa_{0}_{1}" -f (Get-Date -Format "yyyyMMdd_HHmmss"),([Guid]::NewGuid().ToString("N")))
234:   Ensure-Dir $outDir
---
227:     return $result
228:   }
229:   if (!(Test-Path -LiteralPath $PlexTranscoder)) {
230:     $result.reason = "Plex Transcoder missing"
231:     return $result
232:   }
233:   $outDir = Join-Path $env:TEMP ("plex_visible_qa_{0}_{1}" -f (Get-Date -Format "yyyyMMdd_HHmmss"),([Guid]::NewGuid().ToString("N")))
234:   Ensure-Dir $outDir
235:   $result.probe_dir = $outDir
---
237:   $envLine = ""
238:   if ($codecValue.Length -gt 0) { $envLine = "set ""FFMPEG_EXTERNAL_LIBS=$codecValue"" & " }
239:   $cmd = 'cd /d "' + $outDir + '" & ' + $envLine
240:   $cmd = $cmd + '"' + $PlexTranscoder + '" -analyzeduration 20000000 -probesize 20000000 -i "' + $InputPath + '" -t ' + $Seconds + ' -y -nostats -loglevel error -map 0:0 -codec:0 copy -map 0:1 -codec:1 copy -segment_format matroska -f ssegment -individual_header_trailer 0 -flags +global_header -segment_header_filename header -segment_time 5 -segment_start_number 0 -segment_list manifest.csv -segment_list_type csv -segment_list_size 5 -segment_list_unfinished 1 -map_metadata -1 -map_chapters -1 media-%05d.ts'
241:   $cmd = $cmd + ' 1> stdout.log 2> stderr.log'
242:   try {
243:     $proc = Start-Process -FilePath "cmd.exe" -ArgumentList @("/d","/c",$cmd) -NoNewWindow -PassThru
244:     $finished = $proc.WaitForExit($TimeoutSeconds * 1000)
245:     if (!$finished) {
---
241:   $cmd = $cmd + ' 1> stdout.log 2> stderr.log'
242:   try {
243:     $proc = Start-Process -FilePath "cmd.exe" -ArgumentList @("/d","/c",$cmd) -NoNewWindow -PassThru
244:     $finished = $proc.WaitForExit($TimeoutSeconds * 1000)
245:     if (!$finished) {
246:       $result.timed_out = $true
247:       try { & taskkill.exe /PID $proc.Id /T /F | Out-Null } catch {}
248:       Start-Sleep -Seconds 2
249:       $result.reason = "Plex Transcoder HLS probe timed out"
---
246:       $result.timed_out = $true
247:       try { & taskkill.exe /PID $proc.Id /T /F | Out-Null } catch {}
248:       Start-Sleep -Seconds 2
249:       $result.reason = "Plex Transcoder HLS probe timed out"
250:       $result.exit_code = -2
251:       return $result
252:     }
253:     try { $proc.Refresh() } catch {}
254:     try { $result.exit_code = $proc.ExitCode } catch { $result.exit_code = $null }
---
261:     }
262:     if ($result.exit_code -eq 0 -and (Test-Path -LiteralPath (Join-Path $outDir "header")) -and $result.bytes -gt 0) {
263:       $result.ok = $true
264:       $result.reason = "Plex Transcoder HLS probe produced media segments"
265:     } else {
``

## D:\PlexTools\Scripts\scarflix_v2\ScarFLIX_v2_VisibleCatalogQA.ps1.bak_release_curation_20260603_121110
``text
1: # ScarFLIX v2 visible catalog QA
2: # Verifies every visible Plex streaming row is client-safe WebDAV media and can be opened by Plex Transcoder.
3: # Windows PowerShell 5.1 compatible. No secrets are printed.
4: 
5: param(
6:   [int]$MaxItems = 0,
---
1: # ScarFLIX v2 visible catalog QA
2: # Verifies every visible Plex streaming row is client-safe WebDAV media and can be opened by Plex Transcoder.
3: # Windows PowerShell 5.1 compatible. No secrets are printed.
4: 
5: param(
6:   [int]$MaxItems = 0,
7:   [int]$Seconds = 8,
---
5: param(
6:   [int]$MaxItems = 0,
7:   [int]$Seconds = 8,
8:   [int]$TimeoutSeconds = 90,
9:   [switch]$HideFailed,
10:   [switch]$AllowInfrastructureHide,
11:   [switch]$InstallTask
12: )
13: 
---
6:   [int]$MaxItems = 0,
7:   [int]$Seconds = 8,
8:   [int]$TimeoutSeconds = 90,
9:   [switch]$HideFailed,
10:   [switch]$AllowInfrastructureHide,
11:   [switch]$InstallTask
12: )
13: 
14: $ErrorActionPreference = "Continue"
---
20: $PublishRoot = "D:\PlexTools\public\latest\scarflix"
21: $StateRoot = "D:\PlexTools\state\scarflix_v2"
22: $BackupRoot = "D:\PlexTools\backups\scarflix_v2\plex_db"
23: $PlexTranscoder = "C:\Program Files\Plex\Plex Media Server\Plex Transcoder.exe"
24: $PlexSqlite = "C:\Program Files\Plex\Plex Media Server\Plex SQLite.exe"
25: $PlexDb = "C:\Users\jason\AppData\Local\Plex Media Server\Plug-in Support\Databases\com.plexapp.plugins.library.db"
26: $CodecRoot = "C:\Users\jason\AppData\Local\Plex Media Server\Codecs"
27: $StatusJson = Join-Path $PublishRoot "visible_catalog_qa_status.json"
28: $StatusMd = Join-Path $PublishRoot "visible_catalog_qa_status.md"
---
30: $LockPath = Join-Path $StateRoot "catalog_visibility.lock"
31: $QaCachePath = Join-Path $StateRoot "visible_catalog_qa_cache.json"
32: $MapPath = Join-Path $StateRoot "webdav_map.json"
33: $ActiveGateStatusPath = Join-Path $PublishRoot "webdav_active_gate_status.json"
34: $TaskName = "ScarFLIX_v2_VisibleCatalogQA"
35: $script:QaCache = @{}
36: $script:QaCacheDirty = $false
37: $script:WebDavMapPaths = @{}
38: $script:ActiveGatePassPaths = @{}
---
31: $QaCachePath = Join-Path $StateRoot "visible_catalog_qa_cache.json"
32: $MapPath = Join-Path $StateRoot "webdav_map.json"
33: $ActiveGateStatusPath = Join-Path $PublishRoot "webdav_active_gate_status.json"
34: $TaskName = "ScarFLIX_v2_VisibleCatalogQA"
35: $script:QaCache = @{}
36: $script:QaCacheDirty = $false
37: $script:WebDavMapPaths = @{}
38: $script:ActiveGatePassPaths = @{}
39: 
---
35: $script:QaCache = @{}
36: $script:QaCacheDirty = $false
37: $script:WebDavMapPaths = @{}
38: $script:ActiveGatePassPaths = @{}
39: 
40: function Ensure-Dir {
41:   param([string]$Path)
42:   if ([string]::IsNullOrWhiteSpace($Path)) { return }
43:   if (!(Test-Path -LiteralPath $Path)) { New-Item -ItemType Directory -Path $Path -Force | Out-Null }
---
70:   if (!(Test-Path -LiteralPath $PlexSqlite)) { return "" }
71:   if (!(Test-Path -LiteralPath $PlexDb)) { return "" }
72:   try {
73:     $sqlText = ".timeout 10000`r`n" + $Sql
74:     $out = $sqlText | & $PlexSqlite -separator "`t" $PlexDb 2>&1
75:     return (($out | Out-String).Trim())
76:   } catch {
77:     return $_.Exception.Message
78:   }
---
87:     Write-Step "OK" ("Backed up Plex DB: {0}" -f $dest)
88:     return $dest
89:   } catch {
90:     Write-Step "FAIL" ("Plex DB backup failed: {0}" -f $_.Exception.Message)
91:     return ""
92:   }
93: }
94: 
95: function Install-Task {
---
111:       }
112:     } catch {}
113:     if ((Get-Date) -ge $deadline) {
114:       Write-Step "REVIEW" ("Shared catalog lock is busy: {0}" -f $LockPath)
115:       return $false
116:     }
117:     Write-Step "INFO" "Waiting for shared catalog lock."
118:     Start-Sleep -Seconds 5
119:   }
---
122:     Set-Content -LiteralPath $LockPath -Value ("pid={0};utc={1}" -f $processIdValue,(Get-Date).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ")) -Encoding UTF8 -Force
123:     return $true
124:   } catch {
125:     Write-Step "REVIEW" ("Could not create shared catalog lock: {0}" -f $_.Exception.Message)
126:     return $false
127:   }
128: }
129: 
130: function Release-Lock {
---
212:   return ($needle -match "(^|[^a-z0-9])(porn|xxx|onlyfans|hardcore porn|adult video|adult movie|adult film|hentai|erotica|erotic movie|sexploitation|softcore|unsimulated sex|explicit sex)([^a-z0-9]|$)")
213: }
214: 
215: function Test-HlsTranscodePath {
216:   param([string]$InputPath)
217:   $result = [ordered]@{ ok=$false; exit_code=$null; timed_out=$false; probe_dir=""; files=0; bytes=0; reason="" }
218:   if ([string]::IsNullOrWhiteSpace($InputPath)) {
219:     $result.reason = "empty input path"
220:     return $result
---
219:     $result.reason = "empty input path"
220:     return $result
221:   }
222:   if (!(Test-Path -LiteralPath $PlexTranscoder)) {
223:     $result.reason = "Plex Transcoder missing"
224:     return $result
225:   }
226:   $outDir = Join-Path $env:TEMP ("plex_visible_qa_{0}_{1}" -f (Get-Date -Format "yyyyMMdd_HHmmss"),([Guid]::NewGuid().ToString("N")))
227:   Ensure-Dir $outDir
---
220:     return $result
221:   }
222:   if (!(Test-Path -LiteralPath $PlexTranscoder)) {
223:     $result.reason = "Plex Transcoder missing"
224:     return $result
225:   }
226:   $outDir = Join-Path $env:TEMP ("plex_visible_qa_{0}_{1}" -f (Get-Date -Format "yyyyMMdd_HHmmss"),([Guid]::NewGuid().ToString("N")))
227:   Ensure-Dir $outDir
228:   $result.probe_dir = $outDir
---
230:   $envLine = ""
231:   if ($codecValue.Length -gt 0) { $envLine = "set ""FFMPEG_EXTERNAL_LIBS=$codecValue"" & " }
232:   $cmd = 'cd /d "' + $outDir + '" & ' + $envLine
233:   $cmd = $cmd + '"' + $PlexTranscoder + '" -analyzeduration 20000000 -probesize 20000000 -i "' + $InputPath + '" -t ' + $Seconds + ' -y -nostats -loglevel error -map 0:0 -codec:0 copy -map 0:1 -codec:1 copy -segment_format matroska -f ssegment -individual_header_trailer 0 -flags +global_header -segment_header_filename header -segment_time 5 -segment_start_number 0 -segment_list manifest.csv -segment_list_type csv -segment_list_size 5 -segment_list_unfinished 1 -map_metadata -1 -map_chapters -1 media-%05d.ts'
234:   $cmd = $cmd + ' 1> stdout.log 2> stderr.log'
235:   try {
236:     $proc = Start-Process -FilePath "cmd.exe" -ArgumentList @("/d","/c",$cmd) -NoNewWindow -PassThru
237:     $finished = $proc.WaitForExit($TimeoutSeconds * 1000)
238:     if (!$finished) {
---
234:   $cmd = $cmd + ' 1> stdout.log 2> stderr.log'
235:   try {
236:     $proc = Start-Process -FilePath "cmd.exe" -ArgumentList @("/d","/c",$cmd) -NoNewWindow -PassThru
237:     $finished = $proc.WaitForExit($TimeoutSeconds * 1000)
238:     if (!$finished) {
239:       $result.timed_out = $true
240:       try { & taskkill.exe /PID $proc.Id /T /F | Out-Null } catch {}
241:       Start-Sleep -Seconds 2
242:       $result.reason = "Plex Transcoder HLS probe timed out"
---
239:       $result.timed_out = $true
240:       try { & taskkill.exe /PID $proc.Id /T /F | Out-Null } catch {}
241:       Start-Sleep -Seconds 2
242:       $result.reason = "Plex Transcoder HLS probe timed out"
243:       $result.exit_code = -2
244:       return $result
245:     }
246:     try { $proc.Refresh() } catch {}
247:     try { $result.exit_code = $proc.ExitCode } catch { $result.exit_code = $null }
---
254:     }
255:     if ($result.exit_code -eq 0 -and (Test-Path -LiteralPath (Join-Path $outDir "header")) -and $result.bytes -gt 0) {
256:       $result.ok = $true
257:       $result.reason = "Plex Transcoder HLS probe produced media segments"
258:     } else {
``

## D:\PlexTools\Scripts\scarflix_v2\ScarFLIX_v2_VisibleCatalogQA_pre_tv_parent_title_20260602T130029Z.ps1
``text
1: # ScarFLIX v2 visible catalog QA
2: # Verifies every visible Plex streaming row is client-safe WebDAV media and can be opened by Plex Transcoder.
3: # Windows PowerShell 5.1 compatible. No secrets are printed.
4: 
5: param(
6:   [int]$MaxItems = 0,
---
1: # ScarFLIX v2 visible catalog QA
2: # Verifies every visible Plex streaming row is client-safe WebDAV media and can be opened by Plex Transcoder.
3: # Windows PowerShell 5.1 compatible. No secrets are printed.
4: 
5: param(
6:   [int]$MaxItems = 0,
7:   [int]$Seconds = 8,
---
5: param(
6:   [int]$MaxItems = 0,
7:   [int]$Seconds = 8,
8:   [int]$TimeoutSeconds = 90,
9:   [switch]$HideFailed,
10:   [switch]$AllowInfrastructureHide,
11:   [switch]$InstallTask
12: )
13: 
---
6:   [int]$MaxItems = 0,
7:   [int]$Seconds = 8,
8:   [int]$TimeoutSeconds = 90,
9:   [switch]$HideFailed,
10:   [switch]$AllowInfrastructureHide,
11:   [switch]$InstallTask
12: )
13: 
14: $ErrorActionPreference = "Continue"
---
20: $PublishRoot = "D:\PlexTools\public\latest\scarflix"
21: $StateRoot = "D:\PlexTools\state\scarflix_v2"
22: $BackupRoot = "D:\PlexTools\backups\scarflix_v2\plex_db"
23: $PlexTranscoder = "C:\Program Files\Plex\Plex Media Server\Plex Transcoder.exe"
24: $PlexSqlite = "C:\Program Files\Plex\Plex Media Server\Plex SQLite.exe"
25: $PlexDb = "C:\Users\jason\AppData\Local\Plex Media Server\Plug-in Support\Databases\com.plexapp.plugins.library.db"
26: $CodecRoot = "C:\Users\jason\AppData\Local\Plex Media Server\Codecs"
27: $StatusJson = Join-Path $PublishRoot "visible_catalog_qa_status.json"
28: $StatusMd = Join-Path $PublishRoot "visible_catalog_qa_status.md"
---
30: $LockPath = Join-Path $StateRoot "catalog_visibility.lock"
31: $QaCachePath = Join-Path $StateRoot "visible_catalog_qa_cache.json"
32: $MapPath = Join-Path $StateRoot "webdav_map.json"
33: $ActiveGateStatusPath = Join-Path $PublishRoot "webdav_active_gate_status.json"
34: $TaskName = "ScarFLIX_v2_VisibleCatalogQA"
35: $script:QaCache = @{}
36: $script:QaCacheDirty = $false
37: $script:WebDavMapPaths = @{}
38: $script:ActiveGatePassPaths = @{}
---
31: $QaCachePath = Join-Path $StateRoot "visible_catalog_qa_cache.json"
32: $MapPath = Join-Path $StateRoot "webdav_map.json"
33: $ActiveGateStatusPath = Join-Path $PublishRoot "webdav_active_gate_status.json"
34: $TaskName = "ScarFLIX_v2_VisibleCatalogQA"
35: $script:QaCache = @{}
36: $script:QaCacheDirty = $false
37: $script:WebDavMapPaths = @{}
38: $script:ActiveGatePassPaths = @{}
39: 
---
35: $script:QaCache = @{}
36: $script:QaCacheDirty = $false
37: $script:WebDavMapPaths = @{}
38: $script:ActiveGatePassPaths = @{}
39: 
40: function Ensure-Dir {
41:   param([string]$Path)
42:   if ([string]::IsNullOrWhiteSpace($Path)) { return }
43:   if (!(Test-Path -LiteralPath $Path)) { New-Item -ItemType Directory -Path $Path -Force | Out-Null }
---
70:   if (!(Test-Path -LiteralPath $PlexSqlite)) { return "" }
71:   if (!(Test-Path -LiteralPath $PlexDb)) { return "" }
72:   try {
73:     $sqlText = ".timeout 10000`r`n" + $Sql
74:     $out = $sqlText | & $PlexSqlite -separator "`t" $PlexDb 2>&1
75:     return (($out | Out-String).Trim())
76:   } catch {
77:     return $_.Exception.Message
78:   }
---
87:     Write-Step "OK" ("Backed up Plex DB: {0}" -f $dest)
88:     return $dest
89:   } catch {
90:     Write-Step "FAIL" ("Plex DB backup failed: {0}" -f $_.Exception.Message)
91:     return ""
92:   }
93: }
94: 
95: function Install-Task {
---
111:       }
112:     } catch {}
113:     if ((Get-Date) -ge $deadline) {
114:       Write-Step "REVIEW" ("Shared catalog lock is busy: {0}" -f $LockPath)
115:       return $false
116:     }
117:     Write-Step "INFO" "Waiting for shared catalog lock."
118:     Start-Sleep -Seconds 5
119:   }
---
122:     Set-Content -LiteralPath $LockPath -Value ("pid={0};utc={1}" -f $processIdValue,(Get-Date).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ")) -Encoding UTF8 -Force
123:     return $true
124:   } catch {
125:     Write-Step "REVIEW" ("Could not create shared catalog lock: {0}" -f $_.Exception.Message)
126:     return $false
127:   }
128: }
129: 
130: function Release-Lock {
---
210:   return ($needle -match "(^|[^a-z0-9])(porn|xxx|onlyfans|hardcore porn|adult video|adult movie|adult film|hentai|erotica|erotic movie|sexploitation|softcore|unsimulated sex|explicit sex)([^a-z0-9]|$)")
211: }
212: 
213: function Test-HlsTranscodePath {
214:   param([string]$InputPath)
215:   $result = [ordered]@{ ok=$false; exit_code=$null; timed_out=$false; probe_dir=""; files=0; bytes=0; reason="" }
216:   if ([string]::IsNullOrWhiteSpace($InputPath)) {
217:     $result.reason = "empty input path"
218:     return $result
---
217:     $result.reason = "empty input path"
218:     return $result
219:   }
220:   if (!(Test-Path -LiteralPath $PlexTranscoder)) {
221:     $result.reason = "Plex Transcoder missing"
222:     return $result
223:   }
224:   $outDir = Join-Path $env:TEMP ("plex_visible_qa_{0}_{1}" -f (Get-Date -Format "yyyyMMdd_HHmmss"),([Guid]::NewGuid().ToString("N")))
225:   Ensure-Dir $outDir
---
218:     return $result
219:   }
220:   if (!(Test-Path -LiteralPath $PlexTranscoder)) {
221:     $result.reason = "Plex Transcoder missing"
222:     return $result
223:   }
224:   $outDir = Join-Path $env:TEMP ("plex_visible_qa_{0}_{1}" -f (Get-Date -Format "yyyyMMdd_HHmmss"),([Guid]::NewGuid().ToString("N")))
225:   Ensure-Dir $outDir
226:   $result.probe_dir = $outDir
---
228:   $envLine = ""
229:   if ($codecValue.Length -gt 0) { $envLine = "set ""FFMPEG_EXTERNAL_LIBS=$codecValue"" & " }
230:   $cmd = 'cd /d "' + $outDir + '" & ' + $envLine
231:   $cmd = $cmd + '"' + $PlexTranscoder + '" -analyzeduration 20000000 -probesize 20000000 -i "' + $InputPath + '" -t ' + $Seconds + ' -y -nostats -loglevel error -map 0:0 -codec:0 copy -map 0:1 -codec:1 copy -segment_format matroska -f ssegment -individual_header_trailer 0 -flags +global_header -segment_header_filename header -segment_time 5 -segment_start_number 0 -segment_list manifest.csv -segment_list_type csv -segment_list_size 5 -segment_list_unfinished 1 -map_metadata -1 -map_chapters -1 media-%05d.ts'
232:   $cmd = $cmd + ' 1> stdout.log 2> stderr.log'
233:   try {
234:     $proc = Start-Process -FilePath "cmd.exe" -ArgumentList @("/d","/c",$cmd) -NoNewWindow -PassThru
235:     $finished = $proc.WaitForExit($TimeoutSeconds * 1000)
236:     if (!$finished) {
---
232:   $cmd = $cmd + ' 1> stdout.log 2> stderr.log'
233:   try {
234:     $proc = Start-Process -FilePath "cmd.exe" -ArgumentList @("/d","/c",$cmd) -NoNewWindow -PassThru
235:     $finished = $proc.WaitForExit($TimeoutSeconds * 1000)
236:     if (!$finished) {
237:       $result.timed_out = $true
238:       try { & taskkill.exe /PID $proc.Id /T /F | Out-Null } catch {}
239:       Start-Sleep -Seconds 2
240:       $result.reason = "Plex Transcoder HLS probe timed out"
---
237:       $result.timed_out = $true
238:       try { & taskkill.exe /PID $proc.Id /T /F | Out-Null } catch {}
239:       Start-Sleep -Seconds 2
240:       $result.reason = "Plex Transcoder HLS probe timed out"
241:       $result.exit_code = -2
242:       return $result
243:     }
244:     try { $proc.Refresh() } catch {}
245:     try { $result.exit_code = $proc.ExitCode } catch { $result.exit_code = $null }
---
252:     }
253:     if ($result.exit_code -eq 0 -and (Test-Path -LiteralPath (Join-Path $outDir "header")) -and $result.bytes -gt 0) {
254:       $result.ok = $true
255:       $result.reason = "Plex Transcoder HLS probe produced media segments"
256:     } else {
``

## D:\PlexTools\Scripts\scarflix_v2\ScarFLIX_v2_WebDavActiveGate.ps1
``text
1: # ScarFLIX v2 WebDAV active availability gate
2: # Verifies mapped catalog files through the local WebDAV bridge before Plex keeps them visible.
3: # Windows PowerShell 5.1 safe. No secrets are read or logged.
4: 
5: param(
6:   [int]$MaxItems = 0,
---
5: param(
6:   [int]$MaxItems = 0,
7:   [int]$Retries = 1,
8:   [switch]$PruneFailed,
9:   [switch]$VisibleOnly,
10:   [string]$PathListFile = ""
11: )
12: 
13: $ErrorActionPreference = "Continue"
---
82:   }
83: }
84: 
85: function Get-VisibleCatalogPathSet {
86:   $set = @{}
87:   $sql = @"
88: select distinct coalesce(mp.file,'')
89: from media_parts mp
90: join media_items mi on mi.id=mp.media_item_id
---
186: function Test-WebDavEntry {
187:   param([object]$Entry)
188:   $result = [ordered]@{
189:     status = "FAIL"
190:     title = "" + $Entry.title
191:     webdav_path = "" + $Entry.webdav_path
192:     rclone_path = "" + $Entry.rclone_path
193:     reason = ""
194:     head_status = 0
---
214:   if ($attempts -lt 1) { $attempts = 1 }
215:   for ($attempt = 1; $attempt -le $attempts; $attempt++) {
216:     try {
217:       $head = Invoke-WebRequest -Method Head -Uri $url -UseBasicParsing -TimeoutSec 20 -MaximumRedirection 1 -ErrorAction Stop
218:       $result.head_status = [int]$head.StatusCode
219:       $result.content_length = Get-ContentLength $head.Headers
220:       $result.accept_ranges = Get-HeaderText $head.Headers "Accept-Ranges"
221:       if ($result.head_status -ne 200) {
222:         $result.reason = "Local WebDAV HEAD status was not 200"
---
223:       } elseif ($result.content_length -le 0) {
224:         $result.reason = "Local WebDAV HEAD content length missing or zero"
225:       } else {
226:         $range = Invoke-WebRequest -Method Get -Uri $url -Headers @{ "Range" = "bytes=0-1" } -UseBasicParsing -TimeoutSec 20 -MaximumRedirection 1 -ErrorAction Stop
227:         $result.range_status = [int]$range.StatusCode
228:         $result.accept_ranges = Get-HeaderText $range.Headers "Accept-Ranges"
229:         $result.content_range = Get-HeaderText $range.Headers "Content-Range"
230:         if ($result.range_status -ne 206) {
231:           $result.reason = "Local WebDAV Range GET status was not 206"
---
245:   return $result
246: }
247: 
248: function Test-TransientGateFailure {
249:   param([object]$Failure)
250:   $reason = ("" + $Failure.reason).ToLowerInvariant()
251:   $headStatus = 0
252:   $rangeStatus = 0
253:   try { [void][int]::TryParse(("" + $Failure.head_status), [ref]$headStatus) } catch {}
---
246: }
247: 
248: function Test-TransientGateFailure {
249:   param([object]$Failure)
250:   $reason = ("" + $Failure.reason).ToLowerInvariant()
251:   $headStatus = 0
252:   $rangeStatus = 0
253:   try { [void][int]::TryParse(("" + $Failure.head_status), [ref]$headStatus) } catch {}
254:   try { [void][int]::TryParse(("" + $Failure.range_status), [ref]$rangeStatus) } catch {}
---
247: 
248: function Test-TransientGateFailure {
249:   param([object]$Failure)
250:   $reason = ("" + $Failure.reason).ToLowerInvariant()
251:   $headStatus = 0
252:   $rangeStatus = 0
253:   try { [void][int]::TryParse(("" + $Failure.head_status), [ref]$headStatus) } catch {}
254:   try { [void][int]::TryParse(("" + $Failure.range_status), [ref]$rangeStatus) } catch {}
255:   if ($headStatus -eq 429 -or $headStatus -eq 503 -or $rangeStatus -eq 429 -or $rangeStatus -eq 503) { return $true }
---
250:   $reason = ("" + $Failure.reason).ToLowerInvariant()
251:   $headStatus = 0
252:   $rangeStatus = 0
253:   try { [void][int]::TryParse(("" + $Failure.head_status), [ref]$headStatus) } catch {}
254:   try { [void][int]::TryParse(("" + $Failure.range_status), [ref]$rangeStatus) } catch {}
255:   if ($headStatus -eq 429 -or $headStatus -eq 503 -or $rangeStatus -eq 429 -or $rangeStatus -eq 503) { return $true }
256:   if ($reason -match "timeout|temporar|rate limit|too many requests|service unavailable|bad gateway|gateway") { return $true }
257:   return $false
258: }
---
251:   $headStatus = 0
252:   $rangeStatus = 0
253:   try { [void][int]::TryParse(("" + $Failure.head_status), [ref]$headStatus) } catch {}
254:   try { [void][int]::TryParse(("" + $Failure.range_status), [ref]$rangeStatus) } catch {}
255:   if ($headStatus -eq 429 -or $headStatus -eq 503 -or $rangeStatus -eq 429 -or $rangeStatus -eq 503) { return $true }
256:   if ($reason -match "timeout|temporar|rate limit|too many requests|service unavailable|bad gateway|gateway") { return $true }
257:   return $false
258: }
259: 
---
253:   try { [void][int]::TryParse(("" + $Failure.head_status), [ref]$headStatus) } catch {}
254:   try { [void][int]::TryParse(("" + $Failure.range_status), [ref]$rangeStatus) } catch {}
255:   if ($headStatus -eq 429 -or $headStatus -eq 503 -or $rangeStatus -eq 429 -or $rangeStatus -eq 503) { return $true }
256:   if ($reason -match "timeout|temporar|rate limit|too many requests|service unavailable|bad gateway|gateway") { return $true }
257:   return $false
258: }
259: 
260: function Write-Report {
261:   param([object]$Summary)
---
260: function Write-Report {
261:   param([object]$Summary)
262:   $lines = New-Object System.Collections.ArrayList
263:   [void]$lines.Add("# ScarFLIX v2 WebDAV Active Gate")
264:   [void]$lines.Add("")
265:   [void]$lines.Add(("Last refresh UTC: {0}" -f $Summary.finished_utc))
266:   [void]$lines.Add(("Overall: {0}" -f $Summary.status))
267:   [void]$lines.Add(("Checked: {0}" -f $Summary.checked))
268:   [void]$lines.Add(("Passed: {0}" -f $Summary.passed))
---
266:   [void]$lines.Add(("Overall: {0}" -f $Summary.status))
267:   [void]$lines.Add(("Checked: {0}" -f $Summary.checked))
268:   [void]$lines.Add(("Passed: {0}" -f $Summary.passed))
269:   [void]$lines.Add(("Failed detected: {0}" -f $Summary.failed_detected))
270:   [void]$lines.Add(("Pruned: {0}" -f $Summary.pruned))
271:   if (@($Summary.failures).Count -gt 0) {
272:     [void]$lines.Add("")
273:     [void]$lines.Add("## Failures")
274:     foreach ($failure in @($Summary.failures | Select-Object -First 20)) {
---
268:   [void]$lines.Add(("Passed: {0}" -f $Summary.passed))
269:   [void]$lines.Add(("Failed detected: {0}" -f $Summary.failed_detected))
270:   [void]$lines.Add(("Pruned: {0}" -f $Summary.pruned))
271:   if (@($Summary.failures).Count -gt 0) {
272:     [void]$lines.Add("")
273:     [void]$lines.Add("## Failures")
274:     foreach ($failure in @($Summary.failures | Select-Object -First 20)) {
275:       [void]$lines.Add(("- {0}: {1}" -f ("" + $failure.title),(ConvertTo-AsciiText ("" + $failure.reason))))
276:     }
---
270:   [void]$lines.Add(("Pruned: {0}" -f $Summary.pruned))
271:   if (@($Summary.failures).Count -gt 0) {
272:     [void]$lines.Add("")
273:     [void]$lines.Add("## Failures")
274:     foreach ($failure in @($Summary.failures | Select-Object -First 20)) {
275:       [void]$lines.Add(("- {0}: {1}" -f ("" + $failure.title),(ConvertTo-AsciiText ("" + $failure.reason))))
276:     }
277:   }
278:   Write-Utf8NoBom -Path $ReportPath -Text ($lines -join "`r`n")
---
271:   if (@($Summary.failures).Count -gt 0) {
272:     [void]$lines.Add("")
273:     [void]$lines.Add("## Failures")
274:     foreach ($failure in @($Summary.failures | Select-Object -First 20)) {
275:       [void]$lines.Add(("- {0}: {1}" -f ("" + $failure.title),(ConvertTo-AsciiText ("" + $failure.reason))))
276:     }
277:   }
278:   Write-Utf8NoBom -Path $ReportPath -Text ($lines -join "`r`n")
279: }
---
272:     [void]$lines.Add("")
273:     [void]$lines.Add("## Failures")
274:     foreach ($failure in @($Summary.failures | Select-Object -First 20)) {
275:       [void]$lines.Add(("- {0}: {1}" -f ("" + $failure.title),(ConvertTo-AsciiText ("" + $failure.reason))))
276:     }
277:   }
278:   Write-Utf8NoBom -Path $ReportPath -Text ($lines -join "`r`n")
279: }
280: 
---
281: Ensure-Dir $LogRoot
282: Ensure-Dir $PublishRoot
283: Ensure-Dir $StateRoot
``

## D:\PlexTools\Scripts\scarflix_v2\ScarFLIX_v2_WebDavActiveGate.ps1.bak_release_curation_20260603_121110
``text
1: # ScarFLIX v2 WebDAV active availability gate
2: # Verifies mapped catalog files through the local WebDAV bridge before Plex keeps them visible.
3: # Windows PowerShell 5.1 safe. No secrets are read or logged.
4: 
5: param(
6:   [int]$MaxItems = 0,
---
5: param(
6:   [int]$MaxItems = 0,
7:   [int]$Retries = 1,
8:   [switch]$PruneFailed,
9:   [switch]$VisibleOnly,
10:   [string]$PathListFile = ""
11: )
12: 
13: $ErrorActionPreference = "Continue"
---
82:   }
83: }
84: 
85: function Get-VisibleCatalogPathSet {
86:   $set = @{}
87:   $sql = @"
88: select distinct coalesce(mp.file,'')
89: from media_parts mp
90: join media_items mi on mi.id=mp.media_item_id
---
184: function Test-WebDavEntry {
185:   param([object]$Entry)
186:   $result = [ordered]@{
187:     status = "FAIL"
188:     title = "" + $Entry.title
189:     webdav_path = "" + $Entry.webdav_path
190:     rclone_path = "" + $Entry.rclone_path
191:     reason = ""
192:     head_status = 0
---
212:   if ($attempts -lt 1) { $attempts = 1 }
213:   for ($attempt = 1; $attempt -le $attempts; $attempt++) {
214:     try {
215:       $head = Invoke-WebRequest -Method Head -Uri $url -UseBasicParsing -TimeoutSec 20 -MaximumRedirection 1 -ErrorAction Stop
216:       $result.head_status = [int]$head.StatusCode
217:       $result.content_length = Get-ContentLength $head.Headers
218:       $result.accept_ranges = Get-HeaderText $head.Headers "Accept-Ranges"
219:       if ($result.head_status -ne 200) {
220:         $result.reason = "Local WebDAV HEAD status was not 200"
---
221:       } elseif ($result.content_length -le 0) {
222:         $result.reason = "Local WebDAV HEAD content length missing or zero"
223:       } else {
224:         $range = Invoke-WebRequest -Method Get -Uri $url -Headers @{ "Range" = "bytes=0-1" } -UseBasicParsing -TimeoutSec 20 -MaximumRedirection 1 -ErrorAction Stop
225:         $result.range_status = [int]$range.StatusCode
226:         $result.accept_ranges = Get-HeaderText $range.Headers "Accept-Ranges"
227:         $result.content_range = Get-HeaderText $range.Headers "Content-Range"
228:         if ($result.range_status -ne 206) {
229:           $result.reason = "Local WebDAV Range GET status was not 206"
---
243:   return $result
244: }
245: 
246: function Test-TransientGateFailure {
247:   param([object]$Failure)
248:   $reason = ("" + $Failure.reason).ToLowerInvariant()
249:   $headStatus = 0
250:   $rangeStatus = 0
251:   try { [void][int]::TryParse(("" + $Failure.head_status), [ref]$headStatus) } catch {}
---
244: }
245: 
246: function Test-TransientGateFailure {
247:   param([object]$Failure)
248:   $reason = ("" + $Failure.reason).ToLowerInvariant()
249:   $headStatus = 0
250:   $rangeStatus = 0
251:   try { [void][int]::TryParse(("" + $Failure.head_status), [ref]$headStatus) } catch {}
252:   try { [void][int]::TryParse(("" + $Failure.range_status), [ref]$rangeStatus) } catch {}
---
245: 
246: function Test-TransientGateFailure {
247:   param([object]$Failure)
248:   $reason = ("" + $Failure.reason).ToLowerInvariant()
249:   $headStatus = 0
250:   $rangeStatus = 0
251:   try { [void][int]::TryParse(("" + $Failure.head_status), [ref]$headStatus) } catch {}
252:   try { [void][int]::TryParse(("" + $Failure.range_status), [ref]$rangeStatus) } catch {}
253:   if ($headStatus -eq 429 -or $headStatus -eq 503 -or $rangeStatus -eq 429 -or $rangeStatus -eq 503) { return $true }
---
248:   $reason = ("" + $Failure.reason).ToLowerInvariant()
249:   $headStatus = 0
250:   $rangeStatus = 0
251:   try { [void][int]::TryParse(("" + $Failure.head_status), [ref]$headStatus) } catch {}
252:   try { [void][int]::TryParse(("" + $Failure.range_status), [ref]$rangeStatus) } catch {}
253:   if ($headStatus -eq 429 -or $headStatus -eq 503 -or $rangeStatus -eq 429 -or $rangeStatus -eq 503) { return $true }
254:   if ($reason -match "timeout|temporar|rate limit|too many requests|service unavailable|bad gateway|gateway") { return $true }
255:   return $false
256: }
---
249:   $headStatus = 0
250:   $rangeStatus = 0
251:   try { [void][int]::TryParse(("" + $Failure.head_status), [ref]$headStatus) } catch {}
252:   try { [void][int]::TryParse(("" + $Failure.range_status), [ref]$rangeStatus) } catch {}
253:   if ($headStatus -eq 429 -or $headStatus -eq 503 -or $rangeStatus -eq 429 -or $rangeStatus -eq 503) { return $true }
254:   if ($reason -match "timeout|temporar|rate limit|too many requests|service unavailable|bad gateway|gateway") { return $true }
255:   return $false
256: }
257: 
---
251:   try { [void][int]::TryParse(("" + $Failure.head_status), [ref]$headStatus) } catch {}
252:   try { [void][int]::TryParse(("" + $Failure.range_status), [ref]$rangeStatus) } catch {}
253:   if ($headStatus -eq 429 -or $headStatus -eq 503 -or $rangeStatus -eq 429 -or $rangeStatus -eq 503) { return $true }
254:   if ($reason -match "timeout|temporar|rate limit|too many requests|service unavailable|bad gateway|gateway") { return $true }
255:   return $false
256: }
257: 
258: function Write-Report {
259:   param([object]$Summary)
---
258: function Write-Report {
259:   param([object]$Summary)
260:   $lines = New-Object System.Collections.ArrayList
261:   [void]$lines.Add("# ScarFLIX v2 WebDAV Active Gate")
262:   [void]$lines.Add("")
263:   [void]$lines.Add(("Last refresh UTC: {0}" -f $Summary.finished_utc))
264:   [void]$lines.Add(("Overall: {0}" -f $Summary.status))
265:   [void]$lines.Add(("Checked: {0}" -f $Summary.checked))
266:   [void]$lines.Add(("Passed: {0}" -f $Summary.passed))
---
264:   [void]$lines.Add(("Overall: {0}" -f $Summary.status))
265:   [void]$lines.Add(("Checked: {0}" -f $Summary.checked))
266:   [void]$lines.Add(("Passed: {0}" -f $Summary.passed))
267:   [void]$lines.Add(("Failed detected: {0}" -f $Summary.failed_detected))
268:   [void]$lines.Add(("Pruned: {0}" -f $Summary.pruned))
269:   if (@($Summary.failures).Count -gt 0) {
270:     [void]$lines.Add("")
271:     [void]$lines.Add("## Failures")
272:     foreach ($failure in @($Summary.failures | Select-Object -First 20)) {
---
266:   [void]$lines.Add(("Passed: {0}" -f $Summary.passed))
267:   [void]$lines.Add(("Failed detected: {0}" -f $Summary.failed_detected))
268:   [void]$lines.Add(("Pruned: {0}" -f $Summary.pruned))
269:   if (@($Summary.failures).Count -gt 0) {
270:     [void]$lines.Add("")
271:     [void]$lines.Add("## Failures")
272:     foreach ($failure in @($Summary.failures | Select-Object -First 20)) {
273:       [void]$lines.Add(("- {0}: {1}" -f ("" + $failure.title),(ConvertTo-AsciiText ("" + $failure.reason))))
274:     }
---
268:   [void]$lines.Add(("Pruned: {0}" -f $Summary.pruned))
269:   if (@($Summary.failures).Count -gt 0) {
270:     [void]$lines.Add("")
271:     [void]$lines.Add("## Failures")
272:     foreach ($failure in @($Summary.failures | Select-Object -First 20)) {
273:       [void]$lines.Add(("- {0}: {1}" -f ("" + $failure.title),(ConvertTo-AsciiText ("" + $failure.reason))))
274:     }
275:   }
276:   Write-Utf8NoBom -Path $ReportPath -Text ($lines -join "`r`n")
---
269:   if (@($Summary.failures).Count -gt 0) {
270:     [void]$lines.Add("")
271:     [void]$lines.Add("## Failures")
272:     foreach ($failure in @($Summary.failures | Select-Object -First 20)) {
273:       [void]$lines.Add(("- {0}: {1}" -f ("" + $failure.title),(ConvertTo-AsciiText ("" + $failure.reason))))
274:     }
275:   }
276:   Write-Utf8NoBom -Path $ReportPath -Text ($lines -join "`r`n")
277: }
---
270:     [void]$lines.Add("")
271:     [void]$lines.Add("## Failures")
272:     foreach ($failure in @($Summary.failures | Select-Object -First 20)) {
273:       [void]$lines.Add(("- {0}: {1}" -f ("" + $failure.title),(ConvertTo-AsciiText ("" + $failure.reason))))
274:     }
275:   }
276:   Write-Utf8NoBom -Path $ReportPath -Text ($lines -join "`r`n")
277: }
278: 
---
279: Ensure-Dir $LogRoot
280: Ensure-Dir $PublishRoot
281: Ensure-Dir $StateRoot
``

## D:\PlexTools\Scripts\scarflix_v2\ScarFLIX_v2_WebDavFileBridge.ps1
``text
22: $Sqlite = "D:\PlexTools\bin\sqlite3.exe"
23: $PlexDb = "C:\Users\jason\AppData\Local\Plex Media Server\Plug-in Support\Databases\com.plexapp.plugins.library.db"
24: $PlexScanner = "C:\Program Files\Plex\Plex Media Server\Plex Media Scanner.exe"
25: $PlexTranscoder = "C:\Program Files\Plex\Plex Media Server\Plex Transcoder.exe"
26: $CodecRoot = "C:\Users\jason\AppData\Local\Plex Media Server\Codecs"
27: $StatusJson = Join-Path $PublishRoot "webdav_file_bridge_status.json"
28: $LogPath = Join-Path $LogRoot ("scarflix_v2_webdav_file_bridge_{0}.log" -f (Get-Date -Format "yyyyMMdd"))
29: $BackupRoot = Join-Path $LogRoot ("scarflix_v2_webdav_file_bridge_backup_{0}" -f (Get-Date -Format "yyyyMMdd_HHmmss"))
30: $LockPath = Join-Path $StateRoot "webdav_file_bridge.lock"
---
29: $BackupRoot = Join-Path $LogRoot ("scarflix_v2_webdav_file_bridge_backup_{0}" -f (Get-Date -Format "yyyyMMdd_HHmmss"))
30: $LockPath = Join-Path $StateRoot "webdav_file_bridge.lock"
31: $AnalyzeSkipPath = Join-Path $StateRoot "webdav_analyze_skip.csv"
32: $AnalyzeTimeoutSeconds = 25
33: $BridgePort = 18789
34: $BridgeBase = "http://127.0.0.1:18789"
35: $RcloneConfig = "D:\PlexTools\config\rclone\scarflix_webdav_bridge.conf"
36: $RcloneExe = "D:\PlexTools\bin\rclone.exe"
37: $RcloneDrive = "S:"
---
122:   $tmp = Join-Path $env:TEMP ("scarflix_v2_sql_{0}.sql" -f ([Guid]::NewGuid().ToString("N")))
123:   try {
124:     Set-Content -LiteralPath $tmp -Value $Sql -Encoding ASCII -Force
125:     $out = & $Sqlite $PlexDb ".timeout 10000" ".read $tmp" 2>&1
126:     return ($out | Out-String)
127:   } catch {
128:     return $_.Exception.Message
129:   } finally {
130:     try { Remove-Item -LiteralPath $tmp -Force -ErrorAction SilentlyContinue } catch {}
---
134: function Backup-PlexDb {
135:   Ensure-Dir $BackupRoot
136:   $backupPath = Join-Path $BackupRoot "com.plexapp.plugins.library.db"
137:   $out = & $Sqlite $PlexDb ".timeout 10000" ".backup '$backupPath'" 2>&1
138:   $text = ($out | Out-String)
139:   if ($text -match "Error|locked|unable") { return $null }
140:   if (Test-Path -LiteralPath $backupPath) { return $backupPath }
141:   return $null
142: }
---
152:   param([string]$Url)
153:   $result = [ordered]@{ ok = $false; status = 0; content_length = 0; content_type = ""; reason = "" }
154:   try {
155:     $resp = Invoke-WebRequest -Uri $Url -Method Head -UseBasicParsing -TimeoutSec 20 -ErrorAction Stop
156:     $result.status = [int]$resp.StatusCode
157:     $result.content_type = "" + $resp.Headers["Content-Type"]
158:     $cl = "" + $resp.Headers["Content-Length"]
159:     try { $result.content_length = [int64]$cl } catch { $result.content_length = 0 }
160:     if ($resp.StatusCode -eq 200) { $result.ok = $true }
---
333: function Ensure-NodeBridge {
334:   $health = $false
335:   try {
336:     $r = Invoke-WebRequest -Uri ($BridgeBase + "/health") -UseBasicParsing -TimeoutSec 3 -ErrorAction Stop
337:     if ($r.StatusCode -eq 200) { $health = $true }
338:   } catch {}
339:   if ($health) { return $true }
340:   if (!(Test-Path -LiteralPath $NodeScript)) { return $false }
341:   try {
---
344:     $env:SCARFLIX_WEBDAV_LOG = Join-Path $LogRoot "scarflix_v2_webdav_file_bridge_node.log"
345:     Start-Process -FilePath "node.exe" -ArgumentList @($NodeScript) -WindowStyle Hidden | Out-Null
346:     Start-Sleep -Seconds 2
347:     $r2 = Invoke-WebRequest -Uri ($BridgeBase + "/health") -UseBasicParsing -TimeoutSec 5 -ErrorAction Stop
348:     if ($r2.StatusCode -eq 200) { return $true }
349:   } catch {
350:     Write-Step ("Node bridge start failed: {0}" -f $_.Exception.Message) "FAIL"
351:   }
352:   return $false
---
347:     $r2 = Invoke-WebRequest -Uri ($BridgeBase + "/health") -UseBasicParsing -TimeoutSec 5 -ErrorAction Stop
348:     if ($r2.StatusCode -eq 200) { return $true }
349:   } catch {
350:     Write-Step ("Node bridge start failed: {0}" -f $_.Exception.Message) "FAIL"
351:   }
352:   return $false
353: }
354: 
355: function Ensure-RcloneMount {
---
355: function Ensure-RcloneMount {
356:   try {
357:     if (!(Test-Path -LiteralPath $RcloneExe)) {
358:       Write-Step "rclone.exe missing." "FAIL"
359:       return $false
360:     }
361:     $cfgDir = Split-Path -Parent $RcloneConfig
362:     Ensure-Dir $cfgDir
363:     if (!(Test-Path -LiteralPath $RcloneConfig)) {
---
370:     }
371:     $existingDrive = Get-PSDrive -Name ($RcloneDrive.TrimEnd(":")) -ErrorAction SilentlyContinue
372:     if ($existingDrive -and !(Test-Path -LiteralPath ($RcloneDrive + "\media"))) {
373:       Write-Step ("Drive {0} exists but is not the ScarFLIX mount." -f $RcloneDrive) "FAIL"
374:       return $false
375:     }
376:     Start-Process -FilePath $RcloneExe -ArgumentList @("mount", "scarflix_webdav_bridge:", $RcloneDrive, "--config", $RcloneConfig, "--vfs-cache-mode", "full", "--dir-cache-time", "10s", "--poll-interval", "0", "--log-file", "D:\PlexTools\logs\scarflix_v2_rclone_webdav_mount.log", "--log-level", "INFO", "--no-console") -WindowStyle Hidden | Out-Null
377:     for ($i = 0; $i -lt 12; $i++) {
378:       Start-Sleep -Seconds 2
---
379:       if (Test-Path -LiteralPath ($RcloneDrive + "\media")) { return $true }
380:     }
381:   } catch {
382:     Write-Step ("rclone mount failed: {0}" -f $_.Exception.Message) "FAIL"
383:   }
384:   return $false
385: }
386: 
387: function Stop-RcloneMount {
---
415:     }
416:   }
417:   if ($missing.Count -eq 0) { return $true }
418:   Write-Step ("rclone did not expose {0} target(s); restarting mount." -f $missing.Count) "REVIEW"
419:   if (!(Restart-RcloneMount)) { return $false }
420:   foreach ($targetPath in @($missing.ToArray())) {
421:     if (!(Wait-PathAvailable -Path $targetPath -Seconds 25)) {
422:       Write-Step ("rclone target still missing: {0}" -f $targetPath) "REVIEW"
423:       return $false
---
419:   if (!(Restart-RcloneMount)) { return $false }
420:   foreach ($targetPath in @($missing.ToArray())) {
421:     if (!(Wait-PathAvailable -Path $targetPath -Seconds 25)) {
422:       Write-Step ("rclone target still missing: {0}" -f $targetPath) "REVIEW"
423:       return $false
424:     }
425:   }
426:   return $true
427: }
---
426:   return $true
427: }
428: 
429: function Test-HlsTranscodePath {
430:   param([string]$InputPath)
431:   $result = [ordered]@{ ok = $false; exit_code = $null; probe_dir = ""; files = 0; bytes = 0; reason = "" }
432:   if ([string]::IsNullOrWhiteSpace($InputPath)) {
433:     $result.reason = "empty input"
434:     return $result
---
433:     $result.reason = "empty input"
434:     return $result
435:   }
436:   $outDir = Join-Path $env:TEMP ("plex_hls_webdav_probe_{0}" -f (Get-Date -Format "yyyyMMdd_HHmmss"))
437:   Ensure-Dir $outDir
438:   $result.probe_dir = $outDir
439:   $codecValue = Get-LatestCodecDirForCmd
440:   $envLine = ""
441:   if ($codecValue.Length -gt 0) { $envLine = "set ""FFMPEG_EXTERNAL_LIBS=$codecValue"" & " }
---
440:   $envLine = ""
441:   if ($codecValue.Length -gt 0) { $envLine = "set ""FFMPEG_EXTERNAL_LIBS=$codecValue"" & " }
442:   $cmd = 'cd /d "' + $outDir + '" & ' + $envLine
443:   $cmd = $cmd + '"' + $PlexTranscoder + '" -analyzeduration 20000000 -probesize 20000000 -i "' + $InputPath + '" -t 8 -y -nostats -loglevel error -map 0:0 -codec:0 copy -map 0:1 -codec:1 copy -segment_format matroska -f ssegment -individual_header_trailer 0 -flags +global_header -segment_header_filename header -segment_time 5 -segment_start_number 0 -segment_list manifest.csv -segment_list_type csv -segment_list_size 5 -segment_list_unfinished 1 -map_metadata -1 -map_chapters -1 media-%05d.ts'
444:   try {
445:     $proc = Start-Process -FilePath "cmd.exe" -ArgumentList @("/d", "/c", $cmd) -NoNewWindow -PassThru -Wait
446:     $result.exit_code = $proc.ExitCode
447:     $items = Get-ChildItem -LiteralPath $outDir -File -ErrorAction SilentlyContinue
448:     $result.files = ($items | Measure-Object).Count
---
450:     if ($sum -and $sum.Sum) { $result.bytes = [int64]$sum.Sum }
451:     if ($proc.ExitCode -eq 0 -and (Test-Path -LiteralPath (Join-Path $outDir "header")) -and $result.bytes -gt 0) {
452:       $result.ok = $true
453:       $result.reason = "HLS probe produced media segments"
454:     } else {
455:       $result.reason = "HLS probe did not produce valid output"
456:     }
457:   } catch {
458:     $result.reason = ConvertTo-AsciiText $_.Exception.Message
---
452:       $result.ok = $true
453:       $result.reason = "HLS probe produced media segments"
454:     } else {
455:       $result.reason = "HLS probe did not produce valid output"
456:     }
457:   } catch {
458:     $result.reason = ConvertTo-AsciiText $_.Exception.Message
459:   }
460:   return $result
---
``

## D:\PlexTools\Scripts\scarflix_v2\ScarFLIX_v2_WebDavFileBridge.ps1.bak_singleton_20260601_1608
``text
22: $Sqlite = "D:\PlexTools\bin\sqlite3.exe"
23: $PlexDb = "C:\Users\jason\AppData\Local\Plex Media Server\Plug-in Support\Databases\com.plexapp.plugins.library.db"
24: $PlexScanner = "C:\Program Files\Plex\Plex Media Server\Plex Media Scanner.exe"
25: $PlexTranscoder = "C:\Program Files\Plex\Plex Media Server\Plex Transcoder.exe"
26: $CodecRoot = "C:\Users\jason\AppData\Local\Plex Media Server\Codecs"
27: $StatusJson = Join-Path $PublishRoot "webdav_file_bridge_status.json"
28: $LogPath = Join-Path $LogRoot ("scarflix_v2_webdav_file_bridge_{0}.log" -f (Get-Date -Format "yyyyMMdd"))
29: $BackupRoot = Join-Path $LogRoot ("scarflix_v2_webdav_file_bridge_backup_{0}" -f (Get-Date -Format "yyyyMMdd_HHmmss"))
30: $LockPath = Join-Path $StateRoot "webdav_file_bridge.lock"
---
29: $BackupRoot = Join-Path $LogRoot ("scarflix_v2_webdav_file_bridge_backup_{0}" -f (Get-Date -Format "yyyyMMdd_HHmmss"))
30: $LockPath = Join-Path $StateRoot "webdav_file_bridge.lock"
31: $AnalyzeSkipPath = Join-Path $StateRoot "webdav_analyze_skip.csv"
32: $AnalyzeTimeoutSeconds = 25
33: $BridgePort = 18789
34: $BridgeBase = "http://127.0.0.1:18789"
35: $RcloneConfig = "D:\PlexTools\config\rclone\scarflix_webdav_bridge.conf"
36: $RcloneExe = "D:\PlexTools\bin\rclone.exe"
37: $RcloneDrive = "S:"
---
73:   $tmp = Join-Path $env:TEMP ("scarflix_v2_sql_{0}.sql" -f ([Guid]::NewGuid().ToString("N")))
74:   try {
75:     Set-Content -LiteralPath $tmp -Value $Sql -Encoding ASCII -Force
76:     $out = & $Sqlite $PlexDb ".timeout 10000" ".read $tmp" 2>&1
77:     return ($out | Out-String)
78:   } catch {
79:     return $_.Exception.Message
80:   } finally {
81:     try { Remove-Item -LiteralPath $tmp -Force -ErrorAction SilentlyContinue } catch {}
---
85: function Backup-PlexDb {
86:   Ensure-Dir $BackupRoot
87:   $backupPath = Join-Path $BackupRoot "com.plexapp.plugins.library.db"
88:   $out = & $Sqlite $PlexDb ".timeout 10000" ".backup '$backupPath'" 2>&1
89:   $text = ($out | Out-String)
90:   if ($text -match "Error|locked|unable") { return $null }
91:   if (Test-Path -LiteralPath $backupPath) { return $backupPath }
92:   return $null
93: }
---
103:   param([string]$Url)
104:   $result = [ordered]@{ ok = $false; status = 0; content_length = 0; content_type = ""; reason = "" }
105:   try {
106:     $resp = Invoke-WebRequest -Uri $Url -Method Head -UseBasicParsing -TimeoutSec 20 -ErrorAction Stop
107:     $result.status = [int]$resp.StatusCode
108:     $result.content_type = "" + $resp.Headers["Content-Type"]
109:     $cl = "" + $resp.Headers["Content-Length"]
110:     try { $result.content_length = [int64]$cl } catch { $result.content_length = 0 }
111:     if ($resp.StatusCode -eq 200) { $result.ok = $true }
---
257: function Ensure-NodeBridge {
258:   $health = $false
259:   try {
260:     $r = Invoke-WebRequest -Uri ($BridgeBase + "/health") -UseBasicParsing -TimeoutSec 3 -ErrorAction Stop
261:     if ($r.StatusCode -eq 200) { $health = $true }
262:   } catch {}
263:   if ($health) { return $true }
264:   if (!(Test-Path -LiteralPath $NodeScript)) { return $false }
265:   try {
---
268:     $env:SCARFLIX_WEBDAV_LOG = Join-Path $LogRoot "scarflix_v2_webdav_file_bridge_node.log"
269:     Start-Process -FilePath "node.exe" -ArgumentList @($NodeScript) -WindowStyle Hidden | Out-Null
270:     Start-Sleep -Seconds 2
271:     $r2 = Invoke-WebRequest -Uri ($BridgeBase + "/health") -UseBasicParsing -TimeoutSec 5 -ErrorAction Stop
272:     if ($r2.StatusCode -eq 200) { return $true }
273:   } catch {
274:     Write-Step ("Node bridge start failed: {0}" -f $_.Exception.Message) "FAIL"
275:   }
276:   return $false
---
271:     $r2 = Invoke-WebRequest -Uri ($BridgeBase + "/health") -UseBasicParsing -TimeoutSec 5 -ErrorAction Stop
272:     if ($r2.StatusCode -eq 200) { return $true }
273:   } catch {
274:     Write-Step ("Node bridge start failed: {0}" -f $_.Exception.Message) "FAIL"
275:   }
276:   return $false
277: }
278: 
279: function Ensure-RcloneMount {
---
279: function Ensure-RcloneMount {
280:   try {
281:     if (!(Test-Path -LiteralPath $RcloneExe)) {
282:       Write-Step "rclone.exe missing." "FAIL"
283:       return $false
284:     }
285:     $cfgDir = Split-Path -Parent $RcloneConfig
286:     Ensure-Dir $cfgDir
287:     if (!(Test-Path -LiteralPath $RcloneConfig)) {
---
294:     }
295:     $existingDrive = Get-PSDrive -Name ($RcloneDrive.TrimEnd(":")) -ErrorAction SilentlyContinue
296:     if ($existingDrive -and !(Test-Path -LiteralPath ($RcloneDrive + "\media"))) {
297:       Write-Step ("Drive {0} exists but is not the ScarFLIX mount." -f $RcloneDrive) "FAIL"
298:       return $false
299:     }
300:     Start-Process -FilePath $RcloneExe -ArgumentList @("mount", "scarflix_webdav_bridge:", $RcloneDrive, "--config", $RcloneConfig, "--vfs-cache-mode", "full", "--dir-cache-time", "10s", "--poll-interval", "0", "--log-file", "D:\PlexTools\logs\scarflix_v2_rclone_webdav_mount.log", "--log-level", "INFO", "--no-console") -WindowStyle Hidden | Out-Null
301:     for ($i = 0; $i -lt 12; $i++) {
302:       Start-Sleep -Seconds 2
---
303:       if (Test-Path -LiteralPath ($RcloneDrive + "\media")) { return $true }
304:     }
305:   } catch {
306:     Write-Step ("rclone mount failed: {0}" -f $_.Exception.Message) "FAIL"
307:   }
308:   return $false
309: }
310: 
311: function Test-HlsTranscodePath {
---
308:   return $false
309: }
310: 
311: function Test-HlsTranscodePath {
312:   param([string]$InputPath)
313:   $result = [ordered]@{ ok = $false; exit_code = $null; probe_dir = ""; files = 0; bytes = 0; reason = "" }
314:   if ([string]::IsNullOrWhiteSpace($InputPath)) {
315:     $result.reason = "empty input"
316:     return $result
---
315:     $result.reason = "empty input"
316:     return $result
317:   }
318:   $outDir = Join-Path $env:TEMP ("plex_hls_webdav_probe_{0}" -f (Get-Date -Format "yyyyMMdd_HHmmss"))
319:   Ensure-Dir $outDir
320:   $result.probe_dir = $outDir
321:   $codecValue = Get-LatestCodecDirForCmd
322:   $envLine = ""
323:   if ($codecValue.Length -gt 0) { $envLine = "set ""FFMPEG_EXTERNAL_LIBS=$codecValue"" & " }
---
322:   $envLine = ""
323:   if ($codecValue.Length -gt 0) { $envLine = "set ""FFMPEG_EXTERNAL_LIBS=$codecValue"" & " }
324:   $cmd = 'cd /d "' + $outDir + '" & ' + $envLine
325:   $cmd = $cmd + '"' + $PlexTranscoder + '" -analyzeduration 20000000 -probesize 20000000 -i "' + $InputPath + '" -t 8 -y -nostats -loglevel error -map 0:0 -codec:0 copy -map 0:1 -codec:1 copy -segment_format matroska -f ssegment -individual_header_trailer 0 -flags +global_header -segment_header_filename header -segment_time 5 -segment_start_number 0 -segment_list manifest.csv -segment_list_type csv -segment_list_size 5 -segment_list_unfinished 1 -map_metadata -1 -map_chapters -1 media-%05d.ts'
326:   try {
327:     $proc = Start-Process -FilePath "cmd.exe" -ArgumentList @("/d", "/c", $cmd) -NoNewWindow -PassThru -Wait
328:     $result.exit_code = $proc.ExitCode
329:     $items = Get-ChildItem -LiteralPath $outDir -File -ErrorAction SilentlyContinue
330:     $result.files = ($items | Measure-Object).Count
---
332:     if ($sum -and $sum.Sum) { $result.bytes = [int64]$sum.Sum }
333:     if ($proc.ExitCode -eq 0 -and (Test-Path -LiteralPath (Join-Path $outDir "header")) -and $result.bytes -gt 0) {
334:       $result.ok = $true
335:       $result.reason = "HLS probe produced media segments"
336:     } else {
337:       $result.reason = "HLS probe did not produce valid output"
338:     }
339:   } catch {
340:     $result.reason = ConvertTo-AsciiText $_.Exception.Message
---
334:       $result.ok = $true
335:       $result.reason = "HLS probe produced media segments"
336:     } else {
337:       $result.reason = "HLS probe did not produce valid output"
338:     }
339:   } catch {
340:     $result.reason = ConvertTo-AsciiText $_.Exception.Message
341:   }
342:   return $result
---
440:     } catch {}
441:   }
442:   if (!(Test-Path -LiteralPath $PlexScanner)) {
443:     Write-Step "Plex Media Scanner missing; live profiles not analyzed." "REVIEW"
444:     return 0
445:   }
446:   foreach ($metadataId in $MetadataIds) {
447:     try {
448:       $metadataIdInt = [int64]$metadataId
---
447:     try {
448:       $metadataIdInt = [int64]$metadataId
449:       if ($skipIds.ContainsKey($metadataIdInt)) {
450:         Write-Step ("Skipping quarantined Plex analyze item: {0}" -f $metadataIdInt) "REVIEW"
451:         continue
452:       }
453:       $argList = @("--analyze", "--log-file-suffix", " Analysis", "--item", ("" + [int64]$metadataId))
454:       $proc = Start-Process -FilePath $PlexScanner -ArgumentList $argList -NoNewWindow -PassThru
455:       $finished = $proc.WaitForExit($AnalyzeTimeoutSeconds * 1000)
---
``

## D:\PlexTools\Scripts\scarflix_v2\ScarFLIX_v2_WebDavVirtualCatalogPublisher.ps1
``text
37: $PlexDb = "C:\Users\jason\AppData\Local\Plex Media Server\Plug-in Support\Databases\com.plexapp.plugins.library.db"
38: $PlexSqlite = "C:\Program Files\Plex\Plex Media Server\Plex SQLite.exe"
39: $PlexScanner = "C:\Program Files\Plex\Plex Media Server\Plex Media Scanner.exe"
40: $QaScript = Join-Path $ScriptRoot "ScarFLIX_v2_VisibleCatalogQA.ps1"
41: $HealthScript = Join-Path $ScriptRoot "ScarFLIX_v2_HealthStatus.ps1"
42: $DecisionQaScript = Join-Path $ScriptRoot "ScarFLIX_v2_PlexClientDecisionQA.ps1"
43: $HydratorScript = Join-Path $ScriptRoot "ScarFLIX_v2_HydratePlexLiveProfiles.ps1"
44: $ActiveGateScript = Join-Path $ScriptRoot "ScarFLIX_v2_WebDavActiveGate.ps1"
45: $TaskName = "ScarFLIX_v2_WebDavVirtualCatalogPublisher"
---
41: $HealthScript = Join-Path $ScriptRoot "ScarFLIX_v2_HealthStatus.ps1"
42: $DecisionQaScript = Join-Path $ScriptRoot "ScarFLIX_v2_PlexClientDecisionQA.ps1"
43: $HydratorScript = Join-Path $ScriptRoot "ScarFLIX_v2_HydratePlexLiveProfiles.ps1"
44: $ActiveGateScript = Join-Path $ScriptRoot "ScarFLIX_v2_WebDavActiveGate.ps1"
45: $TaskName = "ScarFLIX_v2_WebDavVirtualCatalogPublisher"
46: $script:SkippedExistingCandidates = 0
47: $script:SkippedRejectedCandidates = 0
48: 
49: function Ensure-Dir {
---
138:   if (Test-Path -LiteralPath $LockPath) {
139:     $age = ((Get-Date) - (Get-Item -LiteralPath $LockPath).LastWriteTime).TotalMinutes
140:     if ($age -lt 30) {
141:       Write-Step "REVIEW" ("Existing lock is active: {0}" -f $LockPath)
142:       return $false
143:     }
144:     Remove-Item -LiteralPath $LockPath -Force -ErrorAction SilentlyContinue
145:   }
146:   Set-Content -LiteralPath $LockPath -Value ((Get-Date).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ")) -Encoding ASCII -Force
---
157:   try { schtasks.exe /Change /TN "ScarFLIX_v2_CatalogPromoter" /DISABLE | Out-Null } catch {}
158:   try { schtasks.exe /Change /TN "ScarFLIX_v2_SafeCatalogOrchestrator" /DISABLE | Out-Null } catch {}
159:   try { schtasks.exe /Change /TN "ScarFLIX_v2_CatalogVisibilityGate" /DISABLE | Out-Null } catch {}
160:   try { schtasks.exe /Change /TN "ScarFLIX_v2_VisibleCatalogQA" /DISABLE | Out-Null } catch {}
161:   Write-Step "OK" ("Installed scheduled task: {0}" -f $TaskName)
162: }
163: 
164: function Parse-Query {
165:   param([string]$Url)
---
278:   param([string]$Url)
279:   $result = [ordered]@{ ok=$false; status=0; size=0; content_type=""; reason="" }
280:   try {
281:     $resp = Invoke-WebRequest -Method Head -Uri $Url -UseBasicParsing -TimeoutSec 12 -MaximumRedirection 1 -ErrorAction Stop
282:     $result.status = [int]$resp.StatusCode
283:     $result.size = Get-ContentLength $resp.Headers
284:     $result.content_type = Get-ContentType $resp.Headers
285:     if ($result.status -ne 200) { $result.reason = "HEAD status not 200"; return $result }
286:     if ($result.size -le 0) { $result.reason = "Content-Length missing or zero"; return $result }
---
284:     $result.content_type = Get-ContentType $resp.Headers
285:     if ($result.status -ne 200) { $result.reason = "HEAD status not 200"; return $result }
286:     if ($result.size -le 0) { $result.reason = "Content-Length missing or zero"; return $result }
287:     if ($result.content_type -match "mpegurl|dash") { $result.reason = "HLS/DASH content type rejected"; return $result }
288:     $result.ok = $true
289:     $result.reason = "HEAD gate passed"
290:   } catch {
291:     $result.reason = ConvertTo-AsciiText $_.Exception.Message
292:   }
---
400:     }
401:     Move-Item -LiteralPath $parent -Destination $dest -Force -ErrorAction Stop
402:   } catch {
403:     Write-Step "REVIEW" ("Could not retire duplicate staged candidate {0}: {1}" -f $StrmPath,(ConvertTo-AsciiText $_.Exception.Message))
404:   }
405: }
406: 
407: function Reject-StagedCandidate {
408:   param([string]$StrmPath, [string]$Reason)
---
428:     }
429:     Move-Item -LiteralPath $parent -Destination $dest -Force -ErrorAction Stop
430:   } catch {
431:     Write-Step "REVIEW" ("Could not move rejected staged candidate {0}: {1}" -f $StrmPath,(ConvertTo-AsciiText $_.Exception.Message))
432:   }
433: }
434: 
435: function Get-RejectedStageHashSet {
436:   $set = @{}
---
527:     } else {
528:       $pruned = $pruned + 1
529:       try { Reject-StagedCandidate -StrmPath ("" + $entry.source_strm) -Reason "Pruned unbacked WebDAV map entry before restore" } catch {}
530:       Write-Step "REVIEW" ("Pruned unbacked WebDAV map entry: {0}" -f (ConvertTo-AsciiText $rclonePath))
531:     }
532:   }
533:   if ($pruned -gt 0) {
534:     $newMap = [ordered]@{
535:       generated_utc = (Get-Date).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ")
---
629:     $env:SCARFLIX_WEBDAV_LOG = Join-Path $LogRoot "scarflix_v2_webdav_file_bridge_node.log"
630:     Start-Process -FilePath "node.exe" -ArgumentList @($NodeScript) -WindowStyle Hidden | Out-Null
631:   } catch {
632:     Write-Step "FAIL" ("Node bridge start failed: {0}" -f $_.Exception.Message)
633:     return $false
634:   }
635:   for ($i = 0; $i -lt 10; $i++) {
636:     Start-Sleep -Seconds 1
637:     try {
---
635:   for ($i = 0; $i -lt 10; $i++) {
636:     Start-Sleep -Seconds 1
637:     try {
638:       $r = Invoke-WebRequest -Uri ($WebDavBase + "/health") -UseBasicParsing -TimeoutSec 3 -ErrorAction Stop
639:       if ($r.StatusCode -eq 200) {
640:         Write-Step "OK" ("WebDAV node bridge healthy; restarted_processes={0}" -f $stopped)
641:         return $true
642:       }
643:     } catch {}
---
647: 
648: function Restart-RcloneMount {
649:   if (!(Test-Path -LiteralPath $RcloneExe)) {
650:     Write-Step "FAIL" ("rclone.exe missing: {0}" -f $RcloneExe)
651:     return $false
652:   }
653:   Ensure-Dir (Split-Path -Parent $RcloneConfig)
654:   if (!(Test-Path -LiteralPath $RcloneConfig)) {
655:     Write-Utf8NoBom -Path $RcloneConfig -Text "[scarflix_webdav_bridge]`r`ntype = webdav`r`nurl = http://127.0.0.1:18789`r`nvendor = other`r`n"
---
667:   try {
668:     Start-Process -FilePath $RcloneExe -ArgumentList @("mount", "scarflix_webdav_bridge:", $RcloneDrive, "--config", $RcloneConfig, "--vfs-cache-mode", "full", "--dir-cache-time", "10s", "--poll-interval", "0", "--log-file", "D:\PlexTools\logs\scarflix_v2_rclone_webdav_mount.log", "--log-level", "INFO", "--no-console") -WindowStyle Hidden | Out-Null
669:   } catch {
670:     Write-Step "FAIL" ("rclone start failed: {0}" -f $_.Exception.Message)
671:     return $false
672:   }
673:   for ($i = 0; $i -lt 20; $i++) {
674:     Start-Sleep -Seconds 1
675:     if ((Test-Path -LiteralPath $MovieCatalogRoot) -or (Test-Path -LiteralPath $TvCatalogRoot) -or (Test-Path -LiteralPath "S:\media")) {
---
677:       return $true
678:     }
679:   }
680:   Write-Step "REVIEW" "rclone mount did not expose S:\media within timeout."
681:   return $false
682: }
683: 
684: function Ensure-SectionLocation {
685:   param([int]$SectionId, [string]$RootPath)
---
915: }
916: 
917: function Invoke-Scanner {
918:   param([int]$SectionId, [string]$Directory, [int]$TimeoutSeconds = 180)
919:   $result = [ordered]@{ section=$SectionId; directory=$Directory; exit_code=$null; ok=$false }
920:   if (!(Test-Path -LiteralPath $PlexScanner)) { return $result }
921:   if (!(Test-Path -LiteralPath $Directory)) {
922:     Write-Step "REVIEW" ("Scan directory not visible yet: {0}" -f $Directory)
923:     return $result
---
919:   $result = [ordered]@{ section=$SectionId; directory=$Directory; exit_code=$null; ok=$false }
920:   if (!(Test-Path -LiteralPath $PlexScanner)) { return $result }
921:   if (!(Test-Path -LiteralPath $Directory)) {
922:     Write-Step "REVIEW" ("Scan directory not visible yet: {0}" -f $Directory)
923:     return $result
924:   }
925:   try {
926:     Write-Step "INFO" ("Plex scan section={0} directory={1}" -f $SectionId,$Directory)
927:     $scanArgs = @("--scan","--refresh","--section",("" + $SectionId),"--directory",$Directory)
---
926:     Write-Step "INFO" ("Plex scan section={0} directory={1}" -f $SectionId,$Directory)
927:     $scanArgs = @("--scan","--refresh","--section",("" + $SectionId),"--directory",$Directory)
928:     $p = Start-Process -FilePath $PlexScanner -ArgumentList (Join-ProcessArguments -Arguments $scanArgs) -WindowStyle Hidden -PassThru
929:     $finished = $p.WaitForExit($TimeoutSeconds * 1000)
930:     if (!$finished) {
931:       Write-Step "REVIEW" ("Plex scan timed out; stopping scanner pid={0}" -f $p.Id)
932:       Stop-PlexScannerForDirectory -ProcessId $p.Id -Directory $Directory
933:       if (Invoke-HydratorForDirectory -Directory $Directory) {
934:         $result.exit_code = 0
---
928:     $p = Start-Process -FilePath $PlexScanner -ArgumentList (Join-ProcessArguments -Arguments $scanArgs) -WindowStyle Hidden -PassThru
929:     $finished = $p.WaitForExit($TimeoutSeconds * 1000)
930:     if (!$finished) {
931:       Write-Step "REVIEW" ("Plex scan timed out; stopping scanner pid={0}" -f $p.Id)
932:       Stop-PlexScannerForDirectory -ProcessId $p.Id -Directory $Directory
933:       if (Invoke-HydratorForDirectory -Directory $Directory) {
934:         $result.exit_code = 0
935:         $result.ok = $true
936:         return $result
---
``

## D:\PlexTools\Scripts\scarflix_v2\ScarFLIX_v2_WebDavVirtualCatalogPublisher.ps1.bak_child_timeout_20260603_130550
``text
37: $PlexDb = "C:\Users\jason\AppData\Local\Plex Media Server\Plug-in Support\Databases\com.plexapp.plugins.library.db"
38: $PlexSqlite = "C:\Program Files\Plex\Plex Media Server\Plex SQLite.exe"
39: $PlexScanner = "C:\Program Files\Plex\Plex Media Server\Plex Media Scanner.exe"
40: $QaScript = Join-Path $ScriptRoot "ScarFLIX_v2_VisibleCatalogQA.ps1"
41: $HealthScript = Join-Path $ScriptRoot "ScarFLIX_v2_HealthStatus.ps1"
42: $DecisionQaScript = Join-Path $ScriptRoot "ScarFLIX_v2_PlexClientDecisionQA.ps1"
43: $HydratorScript = Join-Path $ScriptRoot "ScarFLIX_v2_HydratePlexLiveProfiles.ps1"
44: $ActiveGateScript = Join-Path $ScriptRoot "ScarFLIX_v2_WebDavActiveGate.ps1"
45: $TaskName = "ScarFLIX_v2_WebDavVirtualCatalogPublisher"
---
41: $HealthScript = Join-Path $ScriptRoot "ScarFLIX_v2_HealthStatus.ps1"
42: $DecisionQaScript = Join-Path $ScriptRoot "ScarFLIX_v2_PlexClientDecisionQA.ps1"
43: $HydratorScript = Join-Path $ScriptRoot "ScarFLIX_v2_HydratePlexLiveProfiles.ps1"
44: $ActiveGateScript = Join-Path $ScriptRoot "ScarFLIX_v2_WebDavActiveGate.ps1"
45: $TaskName = "ScarFLIX_v2_WebDavVirtualCatalogPublisher"
46: $script:SkippedExistingCandidates = 0
47: 
48: function Ensure-Dir {
49:   param([string]$Path)
---
137:   if (Test-Path -LiteralPath $LockPath) {
138:     $age = ((Get-Date) - (Get-Item -LiteralPath $LockPath).LastWriteTime).TotalMinutes
139:     if ($age -lt 30) {
140:       Write-Step "REVIEW" ("Existing lock is active: {0}" -f $LockPath)
141:       return $false
142:     }
143:     Remove-Item -LiteralPath $LockPath -Force -ErrorAction SilentlyContinue
144:   }
145:   Set-Content -LiteralPath $LockPath -Value ((Get-Date).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ")) -Encoding ASCII -Force
---
156:   try { schtasks.exe /Change /TN "ScarFLIX_v2_CatalogPromoter" /DISABLE | Out-Null } catch {}
157:   try { schtasks.exe /Change /TN "ScarFLIX_v2_SafeCatalogOrchestrator" /DISABLE | Out-Null } catch {}
158:   try { schtasks.exe /Change /TN "ScarFLIX_v2_CatalogVisibilityGate" /DISABLE | Out-Null } catch {}
159:   try { schtasks.exe /Change /TN "ScarFLIX_v2_VisibleCatalogQA" /DISABLE | Out-Null } catch {}
160:   Write-Step "OK" ("Installed scheduled task: {0}" -f $TaskName)
161: }
162: 
163: function Parse-Query {
164:   param([string]$Url)
---
277:   param([string]$Url)
278:   $result = [ordered]@{ ok=$false; status=0; size=0; content_type=""; reason="" }
279:   try {
280:     $resp = Invoke-WebRequest -Method Head -Uri $Url -UseBasicParsing -TimeoutSec 12 -MaximumRedirection 1 -ErrorAction Stop
281:     $result.status = [int]$resp.StatusCode
282:     $result.size = Get-ContentLength $resp.Headers
283:     $result.content_type = Get-ContentType $resp.Headers
284:     if ($result.status -ne 200) { $result.reason = "HEAD status not 200"; return $result }
285:     if ($result.size -le 0) { $result.reason = "Content-Length missing or zero"; return $result }
---
283:     $result.content_type = Get-ContentType $resp.Headers
284:     if ($result.status -ne 200) { $result.reason = "HEAD status not 200"; return $result }
285:     if ($result.size -le 0) { $result.reason = "Content-Length missing or zero"; return $result }
286:     if ($result.content_type -match "mpegurl|dash") { $result.reason = "HLS/DASH content type rejected"; return $result }
287:     $result.ok = $true
288:     $result.reason = "HEAD gate passed"
289:   } catch {
290:     $result.reason = ConvertTo-AsciiText $_.Exception.Message
291:   }
---
399:     }
400:     Move-Item -LiteralPath $parent -Destination $dest -Force -ErrorAction Stop
401:   } catch {
402:     Write-Step "REVIEW" ("Could not retire duplicate staged candidate {0}: {1}" -f $StrmPath,(ConvertTo-AsciiText $_.Exception.Message))
403:   }
404: }
405: 
406: function Reject-StagedCandidate {
407:   param([string]$StrmPath, [string]$Reason)
---
427:     }
428:     Move-Item -LiteralPath $parent -Destination $dest -Force -ErrorAction Stop
429:   } catch {
430:     Write-Step "REVIEW" ("Could not move rejected staged candidate {0}: {1}" -f $StrmPath,(ConvertTo-AsciiText $_.Exception.Message))
431:   }
432: }
433: 
434: function Get-Candidates {
435:   $items = New-Object System.Collections.ArrayList
---
488:     } else {
489:       $pruned = $pruned + 1
490:       try { Reject-StagedCandidate -StrmPath ("" + $entry.source_strm) -Reason "Pruned unbacked WebDAV map entry before restore" } catch {}
491:       Write-Step "REVIEW" ("Pruned unbacked WebDAV map entry: {0}" -f (ConvertTo-AsciiText $rclonePath))
492:     }
493:   }
494:   if ($pruned -gt 0) {
495:     $newMap = [ordered]@{
496:       generated_utc = (Get-Date).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ")
---
590:     $env:SCARFLIX_WEBDAV_LOG = Join-Path $LogRoot "scarflix_v2_webdav_file_bridge_node.log"
591:     Start-Process -FilePath "node.exe" -ArgumentList @($NodeScript) -WindowStyle Hidden | Out-Null
592:   } catch {
593:     Write-Step "FAIL" ("Node bridge start failed: {0}" -f $_.Exception.Message)
594:     return $false
595:   }
596:   for ($i = 0; $i -lt 10; $i++) {
597:     Start-Sleep -Seconds 1
598:     try {
---
596:   for ($i = 0; $i -lt 10; $i++) {
597:     Start-Sleep -Seconds 1
598:     try {
599:       $r = Invoke-WebRequest -Uri ($WebDavBase + "/health") -UseBasicParsing -TimeoutSec 3 -ErrorAction Stop
600:       if ($r.StatusCode -eq 200) {
601:         Write-Step "OK" ("WebDAV node bridge healthy; restarted_processes={0}" -f $stopped)
602:         return $true
603:       }
604:     } catch {}
---
608: 
609: function Restart-RcloneMount {
610:   if (!(Test-Path -LiteralPath $RcloneExe)) {
611:     Write-Step "FAIL" ("rclone.exe missing: {0}" -f $RcloneExe)
612:     return $false
613:   }
614:   Ensure-Dir (Split-Path -Parent $RcloneConfig)
615:   if (!(Test-Path -LiteralPath $RcloneConfig)) {
616:     Write-Utf8NoBom -Path $RcloneConfig -Text "[scarflix_webdav_bridge]`r`ntype = webdav`r`nurl = http://127.0.0.1:18789`r`nvendor = other`r`n"
---
628:   try {
629:     Start-Process -FilePath $RcloneExe -ArgumentList @("mount", "scarflix_webdav_bridge:", $RcloneDrive, "--config", $RcloneConfig, "--vfs-cache-mode", "full", "--dir-cache-time", "10s", "--poll-interval", "0", "--log-file", "D:\PlexTools\logs\scarflix_v2_rclone_webdav_mount.log", "--log-level", "INFO", "--no-console") -WindowStyle Hidden | Out-Null
630:   } catch {
631:     Write-Step "FAIL" ("rclone start failed: {0}" -f $_.Exception.Message)
632:     return $false
633:   }
634:   for ($i = 0; $i -lt 20; $i++) {
635:     Start-Sleep -Seconds 1
636:     if ((Test-Path -LiteralPath $MovieCatalogRoot) -or (Test-Path -LiteralPath $TvCatalogRoot) -or (Test-Path -LiteralPath "S:\media")) {
---
638:       return $true
639:     }
640:   }
641:   Write-Step "REVIEW" "rclone mount did not expose S:\media within timeout."
642:   return $false
643: }
644: 
645: function Ensure-SectionLocation {
646:   param([int]$SectionId, [string]$RootPath)
---
876: }
877: 
878: function Invoke-Scanner {
879:   param([int]$SectionId, [string]$Directory, [int]$TimeoutSeconds = 180)
880:   $result = [ordered]@{ section=$SectionId; directory=$Directory; exit_code=$null; ok=$false }
881:   if (!(Test-Path -LiteralPath $PlexScanner)) { return $result }
882:   if (!(Test-Path -LiteralPath $Directory)) {
883:     Write-Step "REVIEW" ("Scan directory not visible yet: {0}" -f $Directory)
884:     return $result
---
880:   $result = [ordered]@{ section=$SectionId; directory=$Directory; exit_code=$null; ok=$false }
881:   if (!(Test-Path -LiteralPath $PlexScanner)) { return $result }
882:   if (!(Test-Path -LiteralPath $Directory)) {
883:     Write-Step "REVIEW" ("Scan directory not visible yet: {0}" -f $Directory)
884:     return $result
885:   }
886:   try {
887:     Write-Step "INFO" ("Plex scan section={0} directory={1}" -f $SectionId,$Directory)
888:     $scanArgs = @("--scan","--refresh","--section",("" + $SectionId),"--directory",$Directory)
---
887:     Write-Step "INFO" ("Plex scan section={0} directory={1}" -f $SectionId,$Directory)
888:     $scanArgs = @("--scan","--refresh","--section",("" + $SectionId),"--directory",$Directory)
889:     $p = Start-Process -FilePath $PlexScanner -ArgumentList (Join-ProcessArguments -Arguments $scanArgs) -WindowStyle Hidden -PassThru
890:     $finished = $p.WaitForExit($TimeoutSeconds * 1000)
891:     if (!$finished) {
892:       Write-Step "REVIEW" ("Plex scan timed out; stopping scanner pid={0}" -f $p.Id)
893:       Stop-PlexScannerForDirectory -ProcessId $p.Id -Directory $Directory
894:       if (Invoke-HydratorForDirectory -Directory $Directory) {
895:         $result.exit_code = 0
---
889:     $p = Start-Process -FilePath $PlexScanner -ArgumentList (Join-ProcessArguments -Arguments $scanArgs) -WindowStyle Hidden -PassThru
890:     $finished = $p.WaitForExit($TimeoutSeconds * 1000)
891:     if (!$finished) {
892:       Write-Step "REVIEW" ("Plex scan timed out; stopping scanner pid={0}" -f $p.Id)
893:       Stop-PlexScannerForDirectory -ProcessId $p.Id -Directory $Directory
894:       if (Invoke-HydratorForDirectory -Directory $Directory) {
895:         $result.exit_code = 0
896:         $result.ok = $true
897:         return $result
---
``

## D:\PlexTools\Scripts\scarflix_v2\ScarFLIX_v2_WebDavVirtualCatalogPublisher.ps1.bak_rejected_hash_skip_20260603_1435
``text
37: $PlexDb = "C:\Users\jason\AppData\Local\Plex Media Server\Plug-in Support\Databases\com.plexapp.plugins.library.db"
38: $PlexSqlite = "C:\Program Files\Plex\Plex Media Server\Plex SQLite.exe"
39: $PlexScanner = "C:\Program Files\Plex\Plex Media Server\Plex Media Scanner.exe"
40: $QaScript = Join-Path $ScriptRoot "ScarFLIX_v2_VisibleCatalogQA.ps1"
41: $HealthScript = Join-Path $ScriptRoot "ScarFLIX_v2_HealthStatus.ps1"
42: $DecisionQaScript = Join-Path $ScriptRoot "ScarFLIX_v2_PlexClientDecisionQA.ps1"
43: $HydratorScript = Join-Path $ScriptRoot "ScarFLIX_v2_HydratePlexLiveProfiles.ps1"
44: $ActiveGateScript = Join-Path $ScriptRoot "ScarFLIX_v2_WebDavActiveGate.ps1"
45: $TaskName = "ScarFLIX_v2_WebDavVirtualCatalogPublisher"
---
41: $HealthScript = Join-Path $ScriptRoot "ScarFLIX_v2_HealthStatus.ps1"
42: $DecisionQaScript = Join-Path $ScriptRoot "ScarFLIX_v2_PlexClientDecisionQA.ps1"
43: $HydratorScript = Join-Path $ScriptRoot "ScarFLIX_v2_HydratePlexLiveProfiles.ps1"
44: $ActiveGateScript = Join-Path $ScriptRoot "ScarFLIX_v2_WebDavActiveGate.ps1"
45: $TaskName = "ScarFLIX_v2_WebDavVirtualCatalogPublisher"
46: $script:SkippedExistingCandidates = 0
47: 
48: function Ensure-Dir {
49:   param([string]$Path)
---
137:   if (Test-Path -LiteralPath $LockPath) {
138:     $age = ((Get-Date) - (Get-Item -LiteralPath $LockPath).LastWriteTime).TotalMinutes
139:     if ($age -lt 30) {
140:       Write-Step "REVIEW" ("Existing lock is active: {0}" -f $LockPath)
141:       return $false
142:     }
143:     Remove-Item -LiteralPath $LockPath -Force -ErrorAction SilentlyContinue
144:   }
145:   Set-Content -LiteralPath $LockPath -Value ((Get-Date).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ")) -Encoding ASCII -Force
---
156:   try { schtasks.exe /Change /TN "ScarFLIX_v2_CatalogPromoter" /DISABLE | Out-Null } catch {}
157:   try { schtasks.exe /Change /TN "ScarFLIX_v2_SafeCatalogOrchestrator" /DISABLE | Out-Null } catch {}
158:   try { schtasks.exe /Change /TN "ScarFLIX_v2_CatalogVisibilityGate" /DISABLE | Out-Null } catch {}
159:   try { schtasks.exe /Change /TN "ScarFLIX_v2_VisibleCatalogQA" /DISABLE | Out-Null } catch {}
160:   Write-Step "OK" ("Installed scheduled task: {0}" -f $TaskName)
161: }
162: 
163: function Parse-Query {
164:   param([string]$Url)
---
277:   param([string]$Url)
278:   $result = [ordered]@{ ok=$false; status=0; size=0; content_type=""; reason="" }
279:   try {
280:     $resp = Invoke-WebRequest -Method Head -Uri $Url -UseBasicParsing -TimeoutSec 12 -MaximumRedirection 1 -ErrorAction Stop
281:     $result.status = [int]$resp.StatusCode
282:     $result.size = Get-ContentLength $resp.Headers
283:     $result.content_type = Get-ContentType $resp.Headers
284:     if ($result.status -ne 200) { $result.reason = "HEAD status not 200"; return $result }
285:     if ($result.size -le 0) { $result.reason = "Content-Length missing or zero"; return $result }
---
283:     $result.content_type = Get-ContentType $resp.Headers
284:     if ($result.status -ne 200) { $result.reason = "HEAD status not 200"; return $result }
285:     if ($result.size -le 0) { $result.reason = "Content-Length missing or zero"; return $result }
286:     if ($result.content_type -match "mpegurl|dash") { $result.reason = "HLS/DASH content type rejected"; return $result }
287:     $result.ok = $true
288:     $result.reason = "HEAD gate passed"
289:   } catch {
290:     $result.reason = ConvertTo-AsciiText $_.Exception.Message
291:   }
---
399:     }
400:     Move-Item -LiteralPath $parent -Destination $dest -Force -ErrorAction Stop
401:   } catch {
402:     Write-Step "REVIEW" ("Could not retire duplicate staged candidate {0}: {1}" -f $StrmPath,(ConvertTo-AsciiText $_.Exception.Message))
403:   }
404: }
405: 
406: function Reject-StagedCandidate {
407:   param([string]$StrmPath, [string]$Reason)
---
427:     }
428:     Move-Item -LiteralPath $parent -Destination $dest -Force -ErrorAction Stop
429:   } catch {
430:     Write-Step "REVIEW" ("Could not move rejected staged candidate {0}: {1}" -f $StrmPath,(ConvertTo-AsciiText $_.Exception.Message))
431:   }
432: }
433: 
434: function Get-Candidates {
435:   $items = New-Object System.Collections.ArrayList
---
488:     } else {
489:       $pruned = $pruned + 1
490:       try { Reject-StagedCandidate -StrmPath ("" + $entry.source_strm) -Reason "Pruned unbacked WebDAV map entry before restore" } catch {}
491:       Write-Step "REVIEW" ("Pruned unbacked WebDAV map entry: {0}" -f (ConvertTo-AsciiText $rclonePath))
492:     }
493:   }
494:   if ($pruned -gt 0) {
495:     $newMap = [ordered]@{
496:       generated_utc = (Get-Date).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ")
---
590:     $env:SCARFLIX_WEBDAV_LOG = Join-Path $LogRoot "scarflix_v2_webdav_file_bridge_node.log"
591:     Start-Process -FilePath "node.exe" -ArgumentList @($NodeScript) -WindowStyle Hidden | Out-Null
592:   } catch {
593:     Write-Step "FAIL" ("Node bridge start failed: {0}" -f $_.Exception.Message)
594:     return $false
595:   }
596:   for ($i = 0; $i -lt 10; $i++) {
597:     Start-Sleep -Seconds 1
598:     try {
---
596:   for ($i = 0; $i -lt 10; $i++) {
597:     Start-Sleep -Seconds 1
598:     try {
599:       $r = Invoke-WebRequest -Uri ($WebDavBase + "/health") -UseBasicParsing -TimeoutSec 3 -ErrorAction Stop
600:       if ($r.StatusCode -eq 200) {
601:         Write-Step "OK" ("WebDAV node bridge healthy; restarted_processes={0}" -f $stopped)
602:         return $true
603:       }
604:     } catch {}
---
608: 
609: function Restart-RcloneMount {
610:   if (!(Test-Path -LiteralPath $RcloneExe)) {
611:     Write-Step "FAIL" ("rclone.exe missing: {0}" -f $RcloneExe)
612:     return $false
613:   }
614:   Ensure-Dir (Split-Path -Parent $RcloneConfig)
615:   if (!(Test-Path -LiteralPath $RcloneConfig)) {
616:     Write-Utf8NoBom -Path $RcloneConfig -Text "[scarflix_webdav_bridge]`r`ntype = webdav`r`nurl = http://127.0.0.1:18789`r`nvendor = other`r`n"
---
628:   try {
629:     Start-Process -FilePath $RcloneExe -ArgumentList @("mount", "scarflix_webdav_bridge:", $RcloneDrive, "--config", $RcloneConfig, "--vfs-cache-mode", "full", "--dir-cache-time", "10s", "--poll-interval", "0", "--log-file", "D:\PlexTools\logs\scarflix_v2_rclone_webdav_mount.log", "--log-level", "INFO", "--no-console") -WindowStyle Hidden | Out-Null
630:   } catch {
631:     Write-Step "FAIL" ("rclone start failed: {0}" -f $_.Exception.Message)
632:     return $false
633:   }
634:   for ($i = 0; $i -lt 20; $i++) {
635:     Start-Sleep -Seconds 1
636:     if ((Test-Path -LiteralPath $MovieCatalogRoot) -or (Test-Path -LiteralPath $TvCatalogRoot) -or (Test-Path -LiteralPath "S:\media")) {
---
638:       return $true
639:     }
640:   }
641:   Write-Step "REVIEW" "rclone mount did not expose S:\media within timeout."
642:   return $false
643: }
644: 
645: function Ensure-SectionLocation {
646:   param([int]$SectionId, [string]$RootPath)
---
876: }
877: 
878: function Invoke-Scanner {
879:   param([int]$SectionId, [string]$Directory, [int]$TimeoutSeconds = 180)
880:   $result = [ordered]@{ section=$SectionId; directory=$Directory; exit_code=$null; ok=$false }
881:   if (!(Test-Path -LiteralPath $PlexScanner)) { return $result }
882:   if (!(Test-Path -LiteralPath $Directory)) {
883:     Write-Step "REVIEW" ("Scan directory not visible yet: {0}" -f $Directory)
884:     return $result
---
880:   $result = [ordered]@{ section=$SectionId; directory=$Directory; exit_code=$null; ok=$false }
881:   if (!(Test-Path -LiteralPath $PlexScanner)) { return $result }
882:   if (!(Test-Path -LiteralPath $Directory)) {
883:     Write-Step "REVIEW" ("Scan directory not visible yet: {0}" -f $Directory)
884:     return $result
885:   }
886:   try {
887:     Write-Step "INFO" ("Plex scan section={0} directory={1}" -f $SectionId,$Directory)
888:     $scanArgs = @("--scan","--refresh","--section",("" + $SectionId),"--directory",$Directory)
---
887:     Write-Step "INFO" ("Plex scan section={0} directory={1}" -f $SectionId,$Directory)
888:     $scanArgs = @("--scan","--refresh","--section",("" + $SectionId),"--directory",$Directory)
889:     $p = Start-Process -FilePath $PlexScanner -ArgumentList (Join-ProcessArguments -Arguments $scanArgs) -WindowStyle Hidden -PassThru
890:     $finished = $p.WaitForExit($TimeoutSeconds * 1000)
891:     if (!$finished) {
892:       Write-Step "REVIEW" ("Plex scan timed out; stopping scanner pid={0}" -f $p.Id)
893:       Stop-PlexScannerForDirectory -ProcessId $p.Id -Directory $Directory
894:       if (Invoke-HydratorForDirectory -Directory $Directory) {
895:         $result.exit_code = 0
---
889:     $p = Start-Process -FilePath $PlexScanner -ArgumentList (Join-ProcessArguments -Arguments $scanArgs) -WindowStyle Hidden -PassThru
890:     $finished = $p.WaitForExit($TimeoutSeconds * 1000)
891:     if (!$finished) {
892:       Write-Step "REVIEW" ("Plex scan timed out; stopping scanner pid={0}" -f $p.Id)
893:       Stop-PlexScannerForDirectory -ProcessId $p.Id -Directory $Directory
894:       if (Invoke-HydratorForDirectory -Directory $Directory) {
895:         $result.exit_code = 0
896:         $result.ok = $true
897:         return $result
---
``

## D:\PlexTools\Scripts\scarflix_v2\ScarFLIX_v2_WebDavVirtualCatalogPublisher.ps1.bak_release_curation_20260603_121110
``text
37: $PlexDb = "C:\Users\jason\AppData\Local\Plex Media Server\Plug-in Support\Databases\com.plexapp.plugins.library.db"
38: $PlexSqlite = "C:\Program Files\Plex\Plex Media Server\Plex SQLite.exe"
39: $PlexScanner = "C:\Program Files\Plex\Plex Media Server\Plex Media Scanner.exe"
40: $QaScript = Join-Path $ScriptRoot "ScarFLIX_v2_VisibleCatalogQA.ps1"
41: $HealthScript = Join-Path $ScriptRoot "ScarFLIX_v2_HealthStatus.ps1"
42: $DecisionQaScript = Join-Path $ScriptRoot "ScarFLIX_v2_PlexClientDecisionQA.ps1"
43: $HydratorScript = Join-Path $ScriptRoot "ScarFLIX_v2_HydratePlexLiveProfiles.ps1"
44: $ActiveGateScript = Join-Path $ScriptRoot "ScarFLIX_v2_WebDavActiveGate.ps1"
45: $TaskName = "ScarFLIX_v2_WebDavVirtualCatalogPublisher"
---
41: $HealthScript = Join-Path $ScriptRoot "ScarFLIX_v2_HealthStatus.ps1"
42: $DecisionQaScript = Join-Path $ScriptRoot "ScarFLIX_v2_PlexClientDecisionQA.ps1"
43: $HydratorScript = Join-Path $ScriptRoot "ScarFLIX_v2_HydratePlexLiveProfiles.ps1"
44: $ActiveGateScript = Join-Path $ScriptRoot "ScarFLIX_v2_WebDavActiveGate.ps1"
45: $TaskName = "ScarFLIX_v2_WebDavVirtualCatalogPublisher"
46: $script:SkippedExistingCandidates = 0
47: 
48: function Ensure-Dir {
49:   param([string]$Path)
---
137:   if (Test-Path -LiteralPath $LockPath) {
138:     $age = ((Get-Date) - (Get-Item -LiteralPath $LockPath).LastWriteTime).TotalMinutes
139:     if ($age -lt 30) {
140:       Write-Step "REVIEW" ("Existing lock is active: {0}" -f $LockPath)
141:       return $false
142:     }
143:     Remove-Item -LiteralPath $LockPath -Force -ErrorAction SilentlyContinue
144:   }
145:   Set-Content -LiteralPath $LockPath -Value ((Get-Date).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ")) -Encoding ASCII -Force
---
156:   try { schtasks.exe /Change /TN "ScarFLIX_v2_CatalogPromoter" /DISABLE | Out-Null } catch {}
157:   try { schtasks.exe /Change /TN "ScarFLIX_v2_SafeCatalogOrchestrator" /DISABLE | Out-Null } catch {}
158:   try { schtasks.exe /Change /TN "ScarFLIX_v2_CatalogVisibilityGate" /DISABLE | Out-Null } catch {}
159:   try { schtasks.exe /Change /TN "ScarFLIX_v2_VisibleCatalogQA" /DISABLE | Out-Null } catch {}
160:   Write-Step "OK" ("Installed scheduled task: {0}" -f $TaskName)
161: }
162: 
163: function Parse-Query {
164:   param([string]$Url)
---
251:   param([string]$Url)
252:   $result = [ordered]@{ ok=$false; status=0; size=0; content_type=""; reason="" }
253:   try {
254:     $resp = Invoke-WebRequest -Method Head -Uri $Url -UseBasicParsing -TimeoutSec 12 -MaximumRedirection 1 -ErrorAction Stop
255:     $result.status = [int]$resp.StatusCode
256:     $result.size = Get-ContentLength $resp.Headers
257:     $result.content_type = Get-ContentType $resp.Headers
258:     if ($result.status -ne 200) { $result.reason = "HEAD status not 200"; return $result }
259:     if ($result.size -le 0) { $result.reason = "Content-Length missing or zero"; return $result }
---
257:     $result.content_type = Get-ContentType $resp.Headers
258:     if ($result.status -ne 200) { $result.reason = "HEAD status not 200"; return $result }
259:     if ($result.size -le 0) { $result.reason = "Content-Length missing or zero"; return $result }
260:     if ($result.content_type -match "mpegurl|dash") { $result.reason = "HLS/DASH content type rejected"; return $result }
261:     $result.ok = $true
262:     $result.reason = "HEAD gate passed"
263:   } catch {
264:     $result.reason = ConvertTo-AsciiText $_.Exception.Message
265:   }
---
370:     }
371:     Move-Item -LiteralPath $parent -Destination $dest -Force -ErrorAction Stop
372:   } catch {
373:     Write-Step "REVIEW" ("Could not retire duplicate staged candidate {0}: {1}" -f $StrmPath,(ConvertTo-AsciiText $_.Exception.Message))
374:   }
375: }
376: 
377: function Reject-StagedCandidate {
378:   param([string]$StrmPath, [string]$Reason)
---
398:     }
399:     Move-Item -LiteralPath $parent -Destination $dest -Force -ErrorAction Stop
400:   } catch {
401:     Write-Step "REVIEW" ("Could not move rejected staged candidate {0}: {1}" -f $StrmPath,(ConvertTo-AsciiText $_.Exception.Message))
402:   }
403: }
404: 
405: function Get-Candidates {
406:   $items = New-Object System.Collections.ArrayList
---
459:     } else {
460:       $pruned = $pruned + 1
461:       try { Reject-StagedCandidate -StrmPath ("" + $entry.source_strm) -Reason "Pruned unbacked WebDAV map entry before restore" } catch {}
462:       Write-Step "REVIEW" ("Pruned unbacked WebDAV map entry: {0}" -f (ConvertTo-AsciiText $rclonePath))
463:     }
464:   }
465:   if ($pruned -gt 0) {
466:     $newMap = [ordered]@{
467:       generated_utc = (Get-Date).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ")
---
561:     $env:SCARFLIX_WEBDAV_LOG = Join-Path $LogRoot "scarflix_v2_webdav_file_bridge_node.log"
562:     Start-Process -FilePath "node.exe" -ArgumentList @($NodeScript) -WindowStyle Hidden | Out-Null
563:   } catch {
564:     Write-Step "FAIL" ("Node bridge start failed: {0}" -f $_.Exception.Message)
565:     return $false
566:   }
567:   for ($i = 0; $i -lt 10; $i++) {
568:     Start-Sleep -Seconds 1
569:     try {
---
567:   for ($i = 0; $i -lt 10; $i++) {
568:     Start-Sleep -Seconds 1
569:     try {
570:       $r = Invoke-WebRequest -Uri ($WebDavBase + "/health") -UseBasicParsing -TimeoutSec 3 -ErrorAction Stop
571:       if ($r.StatusCode -eq 200) {
572:         Write-Step "OK" ("WebDAV node bridge healthy; restarted_processes={0}" -f $stopped)
573:         return $true
574:       }
575:     } catch {}
---
579: 
580: function Restart-RcloneMount {
581:   if (!(Test-Path -LiteralPath $RcloneExe)) {
582:     Write-Step "FAIL" ("rclone.exe missing: {0}" -f $RcloneExe)
583:     return $false
584:   }
585:   Ensure-Dir (Split-Path -Parent $RcloneConfig)
586:   if (!(Test-Path -LiteralPath $RcloneConfig)) {
587:     Write-Utf8NoBom -Path $RcloneConfig -Text "[scarflix_webdav_bridge]`r`ntype = webdav`r`nurl = http://127.0.0.1:18789`r`nvendor = other`r`n"
---
599:   try {
600:     Start-Process -FilePath $RcloneExe -ArgumentList @("mount", "scarflix_webdav_bridge:", $RcloneDrive, "--config", $RcloneConfig, "--vfs-cache-mode", "full", "--dir-cache-time", "10s", "--poll-interval", "0", "--log-file", "D:\PlexTools\logs\scarflix_v2_rclone_webdav_mount.log", "--log-level", "INFO", "--no-console") -WindowStyle Hidden | Out-Null
601:   } catch {
602:     Write-Step "FAIL" ("rclone start failed: {0}" -f $_.Exception.Message)
603:     return $false
604:   }
605:   for ($i = 0; $i -lt 20; $i++) {
606:     Start-Sleep -Seconds 1
607:     if ((Test-Path -LiteralPath $MovieCatalogRoot) -or (Test-Path -LiteralPath $TvCatalogRoot) -or (Test-Path -LiteralPath "S:\media")) {
---
609:       return $true
610:     }
611:   }
612:   Write-Step "REVIEW" "rclone mount did not expose S:\media within timeout."
613:   return $false
614: }
615: 
616: function Ensure-SectionLocation {
617:   param([int]$SectionId, [string]$RootPath)
---
845: }
846: 
847: function Invoke-Scanner {
848:   param([int]$SectionId, [string]$Directory, [int]$TimeoutSeconds = 180)
849:   $result = [ordered]@{ section=$SectionId; directory=$Directory; exit_code=$null; ok=$false }
850:   if (!(Test-Path -LiteralPath $PlexScanner)) { return $result }
851:   if (!(Test-Path -LiteralPath $Directory)) {
852:     Write-Step "REVIEW" ("Scan directory not visible yet: {0}" -f $Directory)
853:     return $result
---
849:   $result = [ordered]@{ section=$SectionId; directory=$Directory; exit_code=$null; ok=$false }
850:   if (!(Test-Path -LiteralPath $PlexScanner)) { return $result }
851:   if (!(Test-Path -LiteralPath $Directory)) {
852:     Write-Step "REVIEW" ("Scan directory not visible yet: {0}" -f $Directory)
853:     return $result
854:   }
855:   try {
856:     Write-Step "INFO" ("Plex scan section={0} directory={1}" -f $SectionId,$Directory)
857:     $scanArgs = @("--scan","--refresh","--section",("" + $SectionId),"--directory",$Directory)
---
856:     Write-Step "INFO" ("Plex scan section={0} directory={1}" -f $SectionId,$Directory)
857:     $scanArgs = @("--scan","--refresh","--section",("" + $SectionId),"--directory",$Directory)
858:     $p = Start-Process -FilePath $PlexScanner -ArgumentList (Join-ProcessArguments -Arguments $scanArgs) -WindowStyle Hidden -PassThru
859:     $finished = $p.WaitForExit($TimeoutSeconds * 1000)
860:     if (!$finished) {
861:       Write-Step "REVIEW" ("Plex scan timed out; stopping scanner pid={0}" -f $p.Id)
862:       Stop-PlexScannerForDirectory -ProcessId $p.Id -Directory $Directory
863:       if (Invoke-HydratorForDirectory -Directory $Directory) {
864:         $result.exit_code = 0
---
858:     $p = Start-Process -FilePath $PlexScanner -ArgumentList (Join-ProcessArguments -Arguments $scanArgs) -WindowStyle Hidden -PassThru
859:     $finished = $p.WaitForExit($TimeoutSeconds * 1000)
860:     if (!$finished) {
861:       Write-Step "REVIEW" ("Plex scan timed out; stopping scanner pid={0}" -f $p.Id)
862:       Stop-PlexScannerForDirectory -ProcessId $p.Id -Directory $Directory
863:       if (Invoke-HydratorForDirectory -Directory $Directory) {
864:         $result.exit_code = 0
865:         $result.ok = $true
866:         return $result
---
``

## D:\PlexTools\Scripts\scarflix_v2\ScarFLIX_v2_WebDavVirtualCatalogPublisher_pre_invisible_prune_20260602T113656Z.ps1
``text
37: $PlexDb = "C:\Users\jason\AppData\Local\Plex Media Server\Plug-in Support\Databases\com.plexapp.plugins.library.db"
38: $PlexSqlite = "C:\Program Files\Plex\Plex Media Server\Plex SQLite.exe"
39: $PlexScanner = "C:\Program Files\Plex\Plex Media Server\Plex Media Scanner.exe"
40: $QaScript = Join-Path $ScriptRoot "ScarFLIX_v2_VisibleCatalogQA.ps1"
41: $HealthScript = Join-Path $ScriptRoot "ScarFLIX_v2_HealthStatus.ps1"
42: $DecisionQaScript = Join-Path $ScriptRoot "ScarFLIX_v2_PlexClientDecisionQA.ps1"
43: $HydratorScript = Join-Path $ScriptRoot "ScarFLIX_v2_HydratePlexLiveProfiles.ps1"
44: $ActiveGateScript = Join-Path $ScriptRoot "ScarFLIX_v2_WebDavActiveGate.ps1"
45: $TaskName = "ScarFLIX_v2_WebDavVirtualCatalogPublisher"
---
41: $HealthScript = Join-Path $ScriptRoot "ScarFLIX_v2_HealthStatus.ps1"
42: $DecisionQaScript = Join-Path $ScriptRoot "ScarFLIX_v2_PlexClientDecisionQA.ps1"
43: $HydratorScript = Join-Path $ScriptRoot "ScarFLIX_v2_HydratePlexLiveProfiles.ps1"
44: $ActiveGateScript = Join-Path $ScriptRoot "ScarFLIX_v2_WebDavActiveGate.ps1"
45: $TaskName = "ScarFLIX_v2_WebDavVirtualCatalogPublisher"
46: $script:SkippedExistingCandidates = 0
47: 
48: function Ensure-Dir {
49:   param([string]$Path)
---
137:   if (Test-Path -LiteralPath $LockPath) {
138:     $age = ((Get-Date) - (Get-Item -LiteralPath $LockPath).LastWriteTime).TotalMinutes
139:     if ($age -lt 30) {
140:       Write-Step "REVIEW" ("Existing lock is active: {0}" -f $LockPath)
141:       return $false
142:     }
143:     Remove-Item -LiteralPath $LockPath -Force -ErrorAction SilentlyContinue
144:   }
145:   Set-Content -LiteralPath $LockPath -Value ((Get-Date).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ")) -Encoding ASCII -Force
---
156:   try { schtasks.exe /Change /TN "ScarFLIX_v2_CatalogPromoter" /DISABLE | Out-Null } catch {}
157:   try { schtasks.exe /Change /TN "ScarFLIX_v2_SafeCatalogOrchestrator" /DISABLE | Out-Null } catch {}
158:   try { schtasks.exe /Change /TN "ScarFLIX_v2_CatalogVisibilityGate" /DISABLE | Out-Null } catch {}
159:   try { schtasks.exe /Change /TN "ScarFLIX_v2_VisibleCatalogQA" /DISABLE | Out-Null } catch {}
160:   Write-Step "OK" ("Installed scheduled task: {0}" -f $TaskName)
161: }
162: 
163: function Parse-Query {
164:   param([string]$Url)
---
251:   param([string]$Url)
252:   $result = [ordered]@{ ok=$false; status=0; size=0; content_type=""; reason="" }
253:   try {
254:     $resp = Invoke-WebRequest -Method Head -Uri $Url -UseBasicParsing -TimeoutSec 12 -MaximumRedirection 1 -ErrorAction Stop
255:     $result.status = [int]$resp.StatusCode
256:     $result.size = Get-ContentLength $resp.Headers
257:     $result.content_type = Get-ContentType $resp.Headers
258:     if ($result.status -ne 200) { $result.reason = "HEAD status not 200"; return $result }
259:     if ($result.size -le 0) { $result.reason = "Content-Length missing or zero"; return $result }
---
257:     $result.content_type = Get-ContentType $resp.Headers
258:     if ($result.status -ne 200) { $result.reason = "HEAD status not 200"; return $result }
259:     if ($result.size -le 0) { $result.reason = "Content-Length missing or zero"; return $result }
260:     if ($result.content_type -match "mpegurl|dash") { $result.reason = "HLS/DASH content type rejected"; return $result }
261:     $result.ok = $true
262:     $result.reason = "HEAD gate passed"
263:   } catch {
264:     $result.reason = ConvertTo-AsciiText $_.Exception.Message
265:   }
---
370:     }
371:     Move-Item -LiteralPath $parent -Destination $dest -Force -ErrorAction Stop
372:   } catch {
373:     Write-Step "REVIEW" ("Could not retire duplicate staged candidate {0}: {1}" -f $StrmPath,(ConvertTo-AsciiText $_.Exception.Message))
374:   }
375: }
376: 
377: function Reject-StagedCandidate {
378:   param([string]$StrmPath, [string]$Reason)
---
398:     }
399:     Move-Item -LiteralPath $parent -Destination $dest -Force -ErrorAction Stop
400:   } catch {
401:     Write-Step "REVIEW" ("Could not move rejected staged candidate {0}: {1}" -f $StrmPath,(ConvertTo-AsciiText $_.Exception.Message))
402:   }
403: }
404: 
405: function Get-Candidates {
406:   $items = New-Object System.Collections.ArrayList
---
459:     } else {
460:       $pruned = $pruned + 1
461:       try { Reject-StagedCandidate -StrmPath ("" + $entry.source_strm) -Reason "Pruned unbacked WebDAV map entry before restore" } catch {}
462:       Write-Step "REVIEW" ("Pruned unbacked WebDAV map entry: {0}" -f (ConvertTo-AsciiText $rclonePath))
463:     }
464:   }
465:   if ($pruned -gt 0) {
466:     $newMap = [ordered]@{
467:       generated_utc = (Get-Date).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ")
---
561:     $env:SCARFLIX_WEBDAV_LOG = Join-Path $LogRoot "scarflix_v2_webdav_file_bridge_node.log"
562:     Start-Process -FilePath "node.exe" -ArgumentList @($NodeScript) -WindowStyle Hidden | Out-Null
563:   } catch {
564:     Write-Step "FAIL" ("Node bridge start failed: {0}" -f $_.Exception.Message)
565:     return $false
566:   }
567:   for ($i = 0; $i -lt 10; $i++) {
568:     Start-Sleep -Seconds 1
569:     try {
---
567:   for ($i = 0; $i -lt 10; $i++) {
568:     Start-Sleep -Seconds 1
569:     try {
570:       $r = Invoke-WebRequest -Uri ($WebDavBase + "/health") -UseBasicParsing -TimeoutSec 3 -ErrorAction Stop
571:       if ($r.StatusCode -eq 200) {
572:         Write-Step "OK" ("WebDAV node bridge healthy; restarted_processes={0}" -f $stopped)
573:         return $true
574:       }
575:     } catch {}
---
579: 
580: function Restart-RcloneMount {
581:   if (!(Test-Path -LiteralPath $RcloneExe)) {
582:     Write-Step "FAIL" ("rclone.exe missing: {0}" -f $RcloneExe)
583:     return $false
584:   }
585:   Ensure-Dir (Split-Path -Parent $RcloneConfig)
586:   if (!(Test-Path -LiteralPath $RcloneConfig)) {
587:     Write-Utf8NoBom -Path $RcloneConfig -Text "[scarflix_webdav_bridge]`r`ntype = webdav`r`nurl = http://127.0.0.1:18789`r`nvendor = other`r`n"
---
599:   try {
600:     Start-Process -FilePath $RcloneExe -ArgumentList @("mount", "scarflix_webdav_bridge:", $RcloneDrive, "--config", $RcloneConfig, "--vfs-cache-mode", "full", "--dir-cache-time", "10s", "--poll-interval", "0", "--log-file", "D:\PlexTools\logs\scarflix_v2_rclone_webdav_mount.log", "--log-level", "INFO", "--no-console") -WindowStyle Hidden | Out-Null
601:   } catch {
602:     Write-Step "FAIL" ("rclone start failed: {0}" -f $_.Exception.Message)
603:     return $false
604:   }
605:   for ($i = 0; $i -lt 20; $i++) {
606:     Start-Sleep -Seconds 1
607:     if ((Test-Path -LiteralPath $MovieCatalogRoot) -or (Test-Path -LiteralPath $TvCatalogRoot) -or (Test-Path -LiteralPath "S:\media")) {
---
609:       return $true
610:     }
611:   }
612:   Write-Step "REVIEW" "rclone mount did not expose S:\media within timeout."
613:   return $false
614: }
615: 
616: function Ensure-SectionLocation {
617:   param([int]$SectionId, [string]$RootPath)
---
843: }
844: 
845: function Invoke-Scanner {
846:   param([int]$SectionId, [string]$Directory, [int]$TimeoutSeconds = 180)
847:   $result = [ordered]@{ section=$SectionId; directory=$Directory; exit_code=$null; ok=$false }
848:   if (!(Test-Path -LiteralPath $PlexScanner)) { return $result }
849:   if (!(Test-Path -LiteralPath $Directory)) {
850:     Write-Step "REVIEW" ("Scan directory not visible yet: {0}" -f $Directory)
851:     return $result
---
847:   $result = [ordered]@{ section=$SectionId; directory=$Directory; exit_code=$null; ok=$false }
848:   if (!(Test-Path -LiteralPath $PlexScanner)) { return $result }
849:   if (!(Test-Path -LiteralPath $Directory)) {
850:     Write-Step "REVIEW" ("Scan directory not visible yet: {0}" -f $Directory)
851:     return $result
852:   }
853:   try {
854:     Write-Step "INFO" ("Plex scan section={0} directory={1}" -f $SectionId,$Directory)
855:     $scanArgs = @("--scan","--refresh","--section",("" + $SectionId),"--directory",$Directory)
---
854:     Write-Step "INFO" ("Plex scan section={0} directory={1}" -f $SectionId,$Directory)
855:     $scanArgs = @("--scan","--refresh","--section",("" + $SectionId),"--directory",$Directory)
856:     $p = Start-Process -FilePath $PlexScanner -ArgumentList (Join-ProcessArguments -Arguments $scanArgs) -WindowStyle Hidden -PassThru
857:     $finished = $p.WaitForExit($TimeoutSeconds * 1000)
858:     if (!$finished) {
859:       Write-Step "REVIEW" ("Plex scan timed out; stopping scanner pid={0}" -f $p.Id)
860:       Stop-PlexScannerForDirectory -ProcessId $p.Id -Directory $Directory
861:       if (Invoke-HydratorForDirectory -Directory $Directory) {
862:         $result.exit_code = 0
---
856:     $p = Start-Process -FilePath $PlexScanner -ArgumentList (Join-ProcessArguments -Arguments $scanArgs) -WindowStyle Hidden -PassThru
857:     $finished = $p.WaitForExit($TimeoutSeconds * 1000)
858:     if (!$finished) {
859:       Write-Step "REVIEW" ("Plex scan timed out; stopping scanner pid={0}" -f $p.Id)
860:       Stop-PlexScannerForDirectory -ProcessId $p.Id -Directory $Directory
861:       if (Invoke-HydratorForDirectory -Directory $Directory) {
862:         $result.exit_code = 0
863:         $result.ok = $true
864:         return $result
---
``

## D:\PlexTools\Scripts\scarflix_v2\ScarFLIX_v2_WebDavVirtualCatalogPublisher_pre_tv_parent_title_20260602T130029Z.ps1
``text
37: $PlexDb = "C:\Users\jason\AppData\Local\Plex Media Server\Plug-in Support\Databases\com.plexapp.plugins.library.db"
38: $PlexSqlite = "C:\Program Files\Plex\Plex Media Server\Plex SQLite.exe"
39: $PlexScanner = "C:\Program Files\Plex\Plex Media Server\Plex Media Scanner.exe"
40: $QaScript = Join-Path $ScriptRoot "ScarFLIX_v2_VisibleCatalogQA.ps1"
41: $HealthScript = Join-Path $ScriptRoot "ScarFLIX_v2_HealthStatus.ps1"
42: $DecisionQaScript = Join-Path $ScriptRoot "ScarFLIX_v2_PlexClientDecisionQA.ps1"
43: $HydratorScript = Join-Path $ScriptRoot "ScarFLIX_v2_HydratePlexLiveProfiles.ps1"
44: $ActiveGateScript = Join-Path $ScriptRoot "ScarFLIX_v2_WebDavActiveGate.ps1"
45: $TaskName = "ScarFLIX_v2_WebDavVirtualCatalogPublisher"
---
41: $HealthScript = Join-Path $ScriptRoot "ScarFLIX_v2_HealthStatus.ps1"
42: $DecisionQaScript = Join-Path $ScriptRoot "ScarFLIX_v2_PlexClientDecisionQA.ps1"
43: $HydratorScript = Join-Path $ScriptRoot "ScarFLIX_v2_HydratePlexLiveProfiles.ps1"
44: $ActiveGateScript = Join-Path $ScriptRoot "ScarFLIX_v2_WebDavActiveGate.ps1"
45: $TaskName = "ScarFLIX_v2_WebDavVirtualCatalogPublisher"
46: $script:SkippedExistingCandidates = 0
47: 
48: function Ensure-Dir {
49:   param([string]$Path)
---
137:   if (Test-Path -LiteralPath $LockPath) {
138:     $age = ((Get-Date) - (Get-Item -LiteralPath $LockPath).LastWriteTime).TotalMinutes
139:     if ($age -lt 30) {
140:       Write-Step "REVIEW" ("Existing lock is active: {0}" -f $LockPath)
141:       return $false
142:     }
143:     Remove-Item -LiteralPath $LockPath -Force -ErrorAction SilentlyContinue
144:   }
145:   Set-Content -LiteralPath $LockPath -Value ((Get-Date).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ")) -Encoding ASCII -Force
---
156:   try { schtasks.exe /Change /TN "ScarFLIX_v2_CatalogPromoter" /DISABLE | Out-Null } catch {}
157:   try { schtasks.exe /Change /TN "ScarFLIX_v2_SafeCatalogOrchestrator" /DISABLE | Out-Null } catch {}
158:   try { schtasks.exe /Change /TN "ScarFLIX_v2_CatalogVisibilityGate" /DISABLE | Out-Null } catch {}
159:   try { schtasks.exe /Change /TN "ScarFLIX_v2_VisibleCatalogQA" /DISABLE | Out-Null } catch {}
160:   Write-Step "OK" ("Installed scheduled task: {0}" -f $TaskName)
161: }
162: 
163: function Parse-Query {
164:   param([string]$Url)
---
251:   param([string]$Url)
252:   $result = [ordered]@{ ok=$false; status=0; size=0; content_type=""; reason="" }
253:   try {
254:     $resp = Invoke-WebRequest -Method Head -Uri $Url -UseBasicParsing -TimeoutSec 12 -MaximumRedirection 1 -ErrorAction Stop
255:     $result.status = [int]$resp.StatusCode
256:     $result.size = Get-ContentLength $resp.Headers
257:     $result.content_type = Get-ContentType $resp.Headers
258:     if ($result.status -ne 200) { $result.reason = "HEAD status not 200"; return $result }
259:     if ($result.size -le 0) { $result.reason = "Content-Length missing or zero"; return $result }
---
257:     $result.content_type = Get-ContentType $resp.Headers
258:     if ($result.status -ne 200) { $result.reason = "HEAD status not 200"; return $result }
259:     if ($result.size -le 0) { $result.reason = "Content-Length missing or zero"; return $result }
260:     if ($result.content_type -match "mpegurl|dash") { $result.reason = "HLS/DASH content type rejected"; return $result }
261:     $result.ok = $true
262:     $result.reason = "HEAD gate passed"
263:   } catch {
264:     $result.reason = ConvertTo-AsciiText $_.Exception.Message
265:   }
---
370:     }
371:     Move-Item -LiteralPath $parent -Destination $dest -Force -ErrorAction Stop
372:   } catch {
373:     Write-Step "REVIEW" ("Could not retire duplicate staged candidate {0}: {1}" -f $StrmPath,(ConvertTo-AsciiText $_.Exception.Message))
374:   }
375: }
376: 
377: function Reject-StagedCandidate {
378:   param([string]$StrmPath, [string]$Reason)
---
398:     }
399:     Move-Item -LiteralPath $parent -Destination $dest -Force -ErrorAction Stop
400:   } catch {
401:     Write-Step "REVIEW" ("Could not move rejected staged candidate {0}: {1}" -f $StrmPath,(ConvertTo-AsciiText $_.Exception.Message))
402:   }
403: }
404: 
405: function Get-Candidates {
406:   $items = New-Object System.Collections.ArrayList
---
459:     } else {
460:       $pruned = $pruned + 1
461:       try { Reject-StagedCandidate -StrmPath ("" + $entry.source_strm) -Reason "Pruned unbacked WebDAV map entry before restore" } catch {}
462:       Write-Step "REVIEW" ("Pruned unbacked WebDAV map entry: {0}" -f (ConvertTo-AsciiText $rclonePath))
463:     }
464:   }
465:   if ($pruned -gt 0) {
466:     $newMap = [ordered]@{
467:       generated_utc = (Get-Date).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ")
---
561:     $env:SCARFLIX_WEBDAV_LOG = Join-Path $LogRoot "scarflix_v2_webdav_file_bridge_node.log"
562:     Start-Process -FilePath "node.exe" -ArgumentList @($NodeScript) -WindowStyle Hidden | Out-Null
563:   } catch {
564:     Write-Step "FAIL" ("Node bridge start failed: {0}" -f $_.Exception.Message)
565:     return $false
566:   }
567:   for ($i = 0; $i -lt 10; $i++) {
568:     Start-Sleep -Seconds 1
569:     try {
---
567:   for ($i = 0; $i -lt 10; $i++) {
568:     Start-Sleep -Seconds 1
569:     try {
570:       $r = Invoke-WebRequest -Uri ($WebDavBase + "/health") -UseBasicParsing -TimeoutSec 3 -ErrorAction Stop
571:       if ($r.StatusCode -eq 200) {
572:         Write-Step "OK" ("WebDAV node bridge healthy; restarted_processes={0}" -f $stopped)
573:         return $true
574:       }
575:     } catch {}
---
579: 
580: function Restart-RcloneMount {
581:   if (!(Test-Path -LiteralPath $RcloneExe)) {
582:     Write-Step "FAIL" ("rclone.exe missing: {0}" -f $RcloneExe)
583:     return $false
584:   }
585:   Ensure-Dir (Split-Path -Parent $RcloneConfig)
586:   if (!(Test-Path -LiteralPath $RcloneConfig)) {
587:     Write-Utf8NoBom -Path $RcloneConfig -Text "[scarflix_webdav_bridge]`r`ntype = webdav`r`nurl = http://127.0.0.1:18789`r`nvendor = other`r`n"
---
599:   try {
600:     Start-Process -FilePath $RcloneExe -ArgumentList @("mount", "scarflix_webdav_bridge:", $RcloneDrive, "--config", $RcloneConfig, "--vfs-cache-mode", "full", "--dir-cache-time", "10s", "--poll-interval", "0", "--log-file", "D:\PlexTools\logs\scarflix_v2_rclone_webdav_mount.log", "--log-level", "INFO", "--no-console") -WindowStyle Hidden | Out-Null
601:   } catch {
602:     Write-Step "FAIL" ("rclone start failed: {0}" -f $_.Exception.Message)
603:     return $false
604:   }
605:   for ($i = 0; $i -lt 20; $i++) {
606:     Start-Sleep -Seconds 1
607:     if ((Test-Path -LiteralPath $MovieCatalogRoot) -or (Test-Path -LiteralPath $TvCatalogRoot) -or (Test-Path -LiteralPath "S:\media")) {
---
609:       return $true
610:     }
611:   }
612:   Write-Step "REVIEW" "rclone mount did not expose S:\media within timeout."
613:   return $false
614: }
615: 
616: function Ensure-SectionLocation {
617:   param([int]$SectionId, [string]$RootPath)
---
843: }
844: 
845: function Invoke-Scanner {
846:   param([int]$SectionId, [string]$Directory, [int]$TimeoutSeconds = 180)
847:   $result = [ordered]@{ section=$SectionId; directory=$Directory; exit_code=$null; ok=$false }
848:   if (!(Test-Path -LiteralPath $PlexScanner)) { return $result }
849:   if (!(Test-Path -LiteralPath $Directory)) {
850:     Write-Step "REVIEW" ("Scan directory not visible yet: {0}" -f $Directory)
851:     return $result
---
847:   $result = [ordered]@{ section=$SectionId; directory=$Directory; exit_code=$null; ok=$false }
848:   if (!(Test-Path -LiteralPath $PlexScanner)) { return $result }
849:   if (!(Test-Path -LiteralPath $Directory)) {
850:     Write-Step "REVIEW" ("Scan directory not visible yet: {0}" -f $Directory)
851:     return $result
852:   }
853:   try {
854:     Write-Step "INFO" ("Plex scan section={0} directory={1}" -f $SectionId,$Directory)
855:     $scanArgs = @("--scan","--refresh","--section",("" + $SectionId),"--directory",$Directory)
---
854:     Write-Step "INFO" ("Plex scan section={0} directory={1}" -f $SectionId,$Directory)
855:     $scanArgs = @("--scan","--refresh","--section",("" + $SectionId),"--directory",$Directory)
856:     $p = Start-Process -FilePath $PlexScanner -ArgumentList (Join-ProcessArguments -Arguments $scanArgs) -WindowStyle Hidden -PassThru
857:     $finished = $p.WaitForExit($TimeoutSeconds * 1000)
858:     if (!$finished) {
859:       Write-Step "REVIEW" ("Plex scan timed out; stopping scanner pid={0}" -f $p.Id)
860:       Stop-PlexScannerForDirectory -ProcessId $p.Id -Directory $Directory
861:       if (Invoke-HydratorForDirectory -Directory $Directory) {
862:         $result.exit_code = 0
---
856:     $p = Start-Process -FilePath $PlexScanner -ArgumentList (Join-ProcessArguments -Arguments $scanArgs) -WindowStyle Hidden -PassThru
857:     $finished = $p.WaitForExit($TimeoutSeconds * 1000)
858:     if (!$finished) {
859:       Write-Step "REVIEW" ("Plex scan timed out; stopping scanner pid={0}" -f $p.Id)
860:       Stop-PlexScannerForDirectory -ProcessId $p.Id -Directory $Directory
861:       if (Invoke-HydratorForDirectory -Directory $Directory) {
862:         $result.exit_code = 0
863:         $result.ok = $true
864:         return $result
---
``

## D:\PlexTools\Scripts\scarflix_v2\scarflix_v2_webdav_active_gate_worker.js
``text
21:   return base.replace(/\/+$/, "") + "/" + encoded;
22: }
23: 
24: function request(method, url, headers, timeoutMs) {
25:   return new Promise((resolve) => {
26:     let done = false;
27:     const finish = (result) => {
28:       if (done) return;
29:       done = true;
---
53:       res.on("end", () => finish({ ok: true, statusCode: res.statusCode || 0, headers: res.headers, bytes }));
54:       res.on("error", err => finish({ ok: false, statusCode: res.statusCode || 0, headers: res.headers || {}, error: err.message, bytes }));
55:     });
56:     req.setTimeout(timeoutMs, () => {
57:       req.destroy(new Error("timeout"));
58:     });
59:     req.on("error", err => finish({ ok: false, statusCode: 0, headers: {}, error: err.message }));
60:     req.end();
61:   });
---
54:       res.on("error", err => finish({ ok: false, statusCode: res.statusCode || 0, headers: res.headers || {}, error: err.message, bytes }));
55:     });
56:     req.setTimeout(timeoutMs, () => {
57:       req.destroy(new Error("timeout"));
58:     });
59:     req.on("error", err => finish({ ok: false, statusCode: 0, headers: {}, error: err.message }));
60:     req.end();
61:   });
62: }
---
76: 
77: async function checkEntry(entry, opts) {
78:   const result = {
79:     status: "FAIL",
80:     title: ascii(entry.title),
81:     webdav_path: String(entry.webdav_path || ""),
82:     rclone_path: String(entry.rclone_path || ""),
83:     reason: "",
84:     head_status: 0,
---
90:   };
91:   const attempts = Math.max(1, Number(opts.retries || 0) + 1);
92:   for (let attempt = 1; attempt <= attempts; attempt++) {
93:     const head = await request("HEAD", result.url, {}, opts.timeoutMs);
94:     result.head_status = head.statusCode || 0;
95:     result.content_length = contentLength(head.headers || {});
96:     result.accept_ranges = header(head.headers || {}, "accept-ranges");
97:     if (!head.ok) {
98:       result.reason = ascii(head.error || "Local WebDAV HEAD failed");
---
95:     result.content_length = contentLength(head.headers || {});
96:     result.accept_ranges = header(head.headers || {}, "accept-ranges");
97:     if (!head.ok) {
98:       result.reason = ascii(head.error || "Local WebDAV HEAD failed");
99:     } else if (result.head_status !== 200) {
100:       result.reason = "Local WebDAV HEAD status was not 200";
101:     } else if (result.content_length <= 0) {
102:       result.reason = "Local WebDAV HEAD content length missing or zero";
103:     } else {
---
101:     } else if (result.content_length <= 0) {
102:       result.reason = "Local WebDAV HEAD content length missing or zero";
103:     } else {
104:       const range = await request("GET", result.url, { Range: "bytes=0-1" }, opts.timeoutMs);
105:       result.range_status = range.statusCode || 0;
106:       result.accept_ranges = header(range.headers || {}, "accept-ranges");
107:       result.content_range = header(range.headers || {}, "content-range");
108:       if (!range.ok) {
109:         result.reason = ascii(range.error || "Local WebDAV Range GET failed");
---
106:       result.accept_ranges = header(range.headers || {}, "accept-ranges");
107:       result.content_range = header(range.headers || {}, "content-range");
108:       if (!range.ok) {
109:         result.reason = ascii(range.error || "Local WebDAV Range GET failed");
110:       } else if (result.range_status !== 206) {
111:         result.reason = "Local WebDAV Range GET status was not 206";
112:       } else if (!/bytes/i.test(result.accept_ranges) && !/^bytes/i.test(result.content_range)) {
113:         result.reason = "Local WebDAV did not prove byte-range support";
114:       } else {
---
118:       }
119:     }
120:     if (attempt < attempts) {
121:       await new Promise(resolve => setTimeout(resolve, 1000));
122:     }
123:   }
124:   return result;
125: }
126: 
---
153:   const opts = {
154:     webdavBase: input.webdav_base || "http://127.0.0.1:18789",
155:     retries: Number(input.retries || 0),
156:     timeoutMs: Number(input.timeout_ms || 10000)
157:   };
158:   const concurrency = Math.max(1, Number(input.concurrency || 10));
159:   const started = new Date();
160:   const results = await mapLimit(entries, concurrency, entry => checkEntry(entry, opts));
161:   const failures = results.filter(r => r.status !== "PASS");
---
158:   const concurrency = Math.max(1, Number(input.concurrency || 10));
159:   const started = new Date();
160:   const results = await mapLimit(entries, concurrency, entry => checkEntry(entry, opts));
161:   const failures = results.filter(r => r.status !== "PASS");
162:   const passed = results.length - failures.length;
163:   writeJson(outputPath, {
164:     status: failures.length === 0 && results.length > 0 ? "PASS" : "REVIEW",
165:     started_utc: started.toISOString(),
166:     finished_utc: new Date().toISOString(),
---
159:   const started = new Date();
160:   const results = await mapLimit(entries, concurrency, entry => checkEntry(entry, opts));
161:   const failures = results.filter(r => r.status !== "PASS");
162:   const passed = results.length - failures.length;
163:   writeJson(outputPath, {
164:     status: failures.length === 0 && results.length > 0 ? "PASS" : "REVIEW",
165:     started_utc: started.toISOString(),
166:     finished_utc: new Date().toISOString(),
167:     checked: results.length,
---
161:   const failures = results.filter(r => r.status !== "PASS");
162:   const passed = results.length - failures.length;
163:   writeJson(outputPath, {
164:     status: failures.length === 0 && results.length > 0 ? "PASS" : "REVIEW",
165:     started_utc: started.toISOString(),
166:     finished_utc: new Date().toISOString(),
167:     checked: results.length,
168:     passed,
169:     failed_detected: failures.length,
---
166:     finished_utc: new Date().toISOString(),
167:     checked: results.length,
168:     passed,
169:     failed_detected: failures.length,
170:     failures,
171:     results
172:   });
173: }
174: 
---
167:     checked: results.length,
168:     passed,
169:     failed_detected: failures.length,
170:     failures,
171:     results
172:   });
173: }
174: 
175: main().catch(err => {
---
``

## D:\PlexTools\Scripts\scarflix_v2\scarflix_v2_webdav_file_bridge_node.js
``text
39:     log(`loaded map entries=${cachedEntries.length}`);
40:   } catch (err) {
41:     cachedEntries = [];
42:     log(`map load failed: ${err.message}`);
43:   }
44:   return cachedEntries;
45: }
46: 
47: function normalizePath(value) {
---
260:     res.writeHead(405, { "Allow": "OPTIONS, PROPFIND, GET, HEAD" });
261:     res.end("Method not allowed");
262:   } catch (err) {
263:     log(`request failed: ${err.stack || err.message}`);
264:     if (!res.headersSent) res.writeHead(500, { "Content-Type": "text/plain" });
265:     res.end("Internal error");
266:   }
267: }
268: 
---
``

## D:\PlexTools\Scripts\scarflix_v2\SF2_Autopilot.ps1
``text
19: function LogLine($m){ Add-Content -LiteralPath (Join-Path $Logs ("sf2_autopilot_{0}.log" -f (Get-Date -Format "yyyyMMdd"))) -Value ("[{0}] {1}" -f (Get-Date -Format "yyyy-MM-dd HH:mm:ss"),$m) -Encoding UTF8 }
20: function Redact($s){ $x=""+$s; $x=$x -replace "(?i)(Bearer\s+)[A-Za-z0-9\._\-]+","`${1}[REDACTED]"; $x=$x -replace "(?i)(token|apikey|api_key|password|pwd)([`"`'\s:=]+)[^,`"`'\s]+","`${1}`${2}[REDACTED]"; $x=$x -replace "https?://[^ \r\n`"]*real-debrid[^ \r\n`"]*","[REDACTED_REAL_DEBRID_URL]"; return $x }
21: function GitToken [REDACTED] foreach($n in @("github_pat.txt","github_token.txt","gh_pat.txt","gist_token.txt")){ $p=Join-Path $Tokens $n; if(Test-Path -LiteralPath $p){ try { $t=(Get-Content -LiteralPath $p -Raw).Trim(); if($t.Length -gt 20){ return $t } } catch {} } }; return "" }
22: function Upload($local,$remote){ $tok=GitToken; if(!$tok){ return "SKIP no GitHub token" [REDACTED] if(!(Test-Path -LiteralPath $local)){ return "SKIP missing file" }; $api="https://api.github.com/repos/$Owner/$Repo/contents/$RepoPath/$remote"; $h=@{Authorization="token [REDACTED]";Accept="application/vnd.github+json";"User-Agent"="SF2-Autopilot"}; $sha=""; try{ $e=Invoke-RestMethod -Uri ($api+"?ref=$Branch") -Headers $h -Method Get -TimeoutSec 20 -ErrorAction Stop; if($e.sha){$sha=$e.sha} }catch{}; try{ $body=[ordered]@{message="SF2 autopilot telemetry";content=[Convert]::ToBase64String([IO.File]::ReadAllBytes($local));branch=$Branch}; if($sha){$body.sha=$sha}; Invoke-RestMethod -Uri $api -Headers $h -Method Put -Body ($body|ConvertTo-Json -Depth 5) -ContentType "application/json" -TimeoutSec 30 -ErrorAction Stop | Out-Null; return "OK" }catch{ return "FAIL " + $_.Exception.Message } }
23: function FetchJson($url){ try{ $u=$url; if($u -match "\?"){$u=$u+"&cb="+[guid]::NewGuid().ToString("N")}else{$u=$u+"?cb="+[guid]::NewGuid().ToString("N")}; $r=Invoke-WebRequest -UseBasicParsing -Uri $u -TimeoutSec 25 -ErrorAction Stop; if($r.Content){ return $r.Content | ConvertFrom-Json } }catch{}; return $null }
24: function TaskState($name){ try{ $txt=schtasks.exe /Query /TN $name /FO LIST /V 2>&1 | Out-String; if($txt -match "(?im)^\s*(Status|State):\s*Running\s*$"){return "Running"}; if($txt -match "(?im)^\s*(Status|State):\s*Ready\s*$"){return "Ready"}; if($txt -match "ERROR:"){return "Missing"}; return "Present" }catch{ return "Missing" } }
25: function Runners{ $a=@(); try{ $a=@(Get-CimInstance Win32_Process | Where-Object { (""+$_.CommandLine) -match "ScarFLIX_v2_PlatformGate|PlatformGate_LocalRunner|VisibleCatalogQA|PlexDecisionQA|ConcurrentQA|AutonomousController|SafeWebDavExpansion|CandidateSourceModel" }) }catch{}; return $a }
26: function Quiesce{ $disabled=@(); try{ $tasks=schtasks.exe /Query /FO CSV /V 2>$null | ConvertFrom-Csv; foreach($t in $tasks){ $n=""+$t.TaskName; if(($n -match "ScarFLIX_v2" -or $n -match "SF2_") -and $n -notmatch "SF2_Autopilot"){ try{schtasks.exe /End /TN $n 2>$null|Out-Null}catch{}; try{schtasks.exe /Change /TN $n /DISABLE 2>$null|Out-Null}catch{}; $disabled+=$n } } }catch{}; $killed=@(); foreach($p in @(Runners)){ if($p.ProcessId -ne $PID){ try{ Stop-Process -Id $p.ProcessId -Force -ErrorAction SilentlyContinue; $killed+=("PID {0}: {1}" -f $p.ProcessId,$p.Name) }catch{} } }; return [ordered]@{disabled=$disabled;killed=$killed} }
27: function LatestLog($patterns){ $files=@(); foreach($pat in $patterns){ try{ $files+=@(Get-ChildItem -LiteralPath $Logs -File -Filter $pat -ErrorAction SilentlyContinue) }catch{} }; $files=@($files|Sort-Object LastWriteTime -Descending|Select-Object -First 1); if($files.Count -gt 0){return $files[0].FullName}; return "" }
---
20: function Redact($s){ $x=""+$s; $x=$x -replace "(?i)(Bearer\s+)[A-Za-z0-9\._\-]+","`${1}[REDACTED]"; $x=$x -replace "(?i)(token|apikey|api_key|password|pwd)([`"`'\s:=]+)[^,`"`'\s]+","`${1}`${2}[REDACTED]"; $x=$x -replace "https?://[^ \r\n`"]*real-debrid[^ \r\n`"]*","[REDACTED_REAL_DEBRID_URL]"; return $x }
21: function GitToken [REDACTED] foreach($n in @("github_pat.txt","github_token.txt","gh_pat.txt","gist_token.txt")){ $p=Join-Path $Tokens $n; if(Test-Path -LiteralPath $p){ try { $t=(Get-Content -LiteralPath $p -Raw).Trim(); if($t.Length -gt 20){ return $t } } catch {} } }; return "" }
22: function Upload($local,$remote){ $tok=GitToken; if(!$tok){ return "SKIP no GitHub token" [REDACTED] if(!(Test-Path -LiteralPath $local)){ return "SKIP missing file" }; $api="https://api.github.com/repos/$Owner/$Repo/contents/$RepoPath/$remote"; $h=@{Authorization="token [REDACTED]";Accept="application/vnd.github+json";"User-Agent"="SF2-Autopilot"}; $sha=""; try{ $e=Invoke-RestMethod -Uri ($api+"?ref=$Branch") -Headers $h -Method Get -TimeoutSec 20 -ErrorAction Stop; if($e.sha){$sha=$e.sha} }catch{}; try{ $body=[ordered]@{message="SF2 autopilot telemetry";content=[Convert]::ToBase64String([IO.File]::ReadAllBytes($local));branch=$Branch}; if($sha){$body.sha=$sha}; Invoke-RestMethod -Uri $api -Headers $h -Method Put -Body ($body|ConvertTo-Json -Depth 5) -ContentType "application/json" -TimeoutSec 30 -ErrorAction Stop | Out-Null; return "OK" }catch{ return "FAIL " + $_.Exception.Message } }
23: function FetchJson($url){ try{ $u=$url; if($u -match "\?"){$u=$u+"&cb="+[guid]::NewGuid().ToString("N")}else{$u=$u+"?cb="+[guid]::NewGuid().ToString("N")}; $r=Invoke-WebRequest -UseBasicParsing -Uri $u -TimeoutSec 25 -ErrorAction Stop; if($r.Content){ return $r.Content | ConvertFrom-Json } }catch{}; return $null }
24: function TaskState($name){ try{ $txt=schtasks.exe /Query /TN $name /FO LIST /V 2>&1 | Out-String; if($txt -match "(?im)^\s*(Status|State):\s*Running\s*$"){return "Running"}; if($txt -match "(?im)^\s*(Status|State):\s*Ready\s*$"){return "Ready"}; if($txt -match "ERROR:"){return "Missing"}; return "Present" }catch{ return "Missing" } }
25: function Runners{ $a=@(); try{ $a=@(Get-CimInstance Win32_Process | Where-Object { (""+$_.CommandLine) -match "ScarFLIX_v2_PlatformGate|PlatformGate_LocalRunner|VisibleCatalogQA|PlexDecisionQA|ConcurrentQA|AutonomousController|SafeWebDavExpansion|CandidateSourceModel" }) }catch{}; return $a }
26: function Quiesce{ $disabled=@(); try{ $tasks=schtasks.exe /Query /FO CSV /V 2>$null | ConvertFrom-Csv; foreach($t in $tasks){ $n=""+$t.TaskName; if(($n -match "ScarFLIX_v2" -or $n -match "SF2_") -and $n -notmatch "SF2_Autopilot"){ try{schtasks.exe /End /TN $n 2>$null|Out-Null}catch{}; try{schtasks.exe /Change /TN $n /DISABLE 2>$null|Out-Null}catch{}; $disabled+=$n } } }catch{}; $killed=@(); foreach($p in @(Runners)){ if($p.ProcessId -ne $PID){ try{ Stop-Process -Id $p.ProcessId -Force -ErrorAction SilentlyContinue; $killed+=("PID {0}: {1}" -f $p.ProcessId,$p.Name) }catch{} } }; return [ordered]@{disabled=$disabled;killed=$killed} }
27: function LatestLog($patterns){ $files=@(); foreach($pat in $patterns){ try{ $files+=@(Get-ChildItem -LiteralPath $Logs -File -Filter $pat -ErrorAction SilentlyContinue) }catch{} }; $files=@($files|Sort-Object LastWriteTime -Descending|Select-Object -First 1); if($files.Count -gt 0){return $files[0].FullName}; return "" }
28: function Tail($path,$n){ if($path -and (Test-Path -LiteralPath $path)){ try{return Redact ((Get-Content -LiteralPath $path -Tail $n -ErrorAction SilentlyContinue)-join [Environment]::NewLine)}catch{} }; return "" }
---
22: function Upload($local,$remote){ $tok=GitToken; if(!$tok){ return "SKIP no GitHub token" [REDACTED] if(!(Test-Path -LiteralPath $local)){ return "SKIP missing file" }; $api="https://api.github.com/repos/$Owner/$Repo/contents/$RepoPath/$remote"; $h=@{Authorization="token [REDACTED]";Accept="application/vnd.github+json";"User-Agent"="SF2-Autopilot"}; $sha=""; try{ $e=Invoke-RestMethod -Uri ($api+"?ref=$Branch") -Headers $h -Method Get -TimeoutSec 20 -ErrorAction Stop; if($e.sha){$sha=$e.sha} }catch{}; try{ $body=[ordered]@{message="SF2 autopilot telemetry";content=[Convert]::ToBase64String([IO.File]::ReadAllBytes($local));branch=$Branch}; if($sha){$body.sha=$sha}; Invoke-RestMethod -Uri $api -Headers $h -Method Put -Body ($body|ConvertTo-Json -Depth 5) -ContentType "application/json" -TimeoutSec 30 -ErrorAction Stop | Out-Null; return "OK" }catch{ return "FAIL " + $_.Exception.Message } }
23: function FetchJson($url){ try{ $u=$url; if($u -match "\?"){$u=$u+"&cb="+[guid]::NewGuid().ToString("N")}else{$u=$u+"?cb="+[guid]::NewGuid().ToString("N")}; $r=Invoke-WebRequest -UseBasicParsing -Uri $u -TimeoutSec 25 -ErrorAction Stop; if($r.Content){ return $r.Content | ConvertFrom-Json } }catch{}; return $null }
24: function TaskState($name){ try{ $txt=schtasks.exe /Query /TN $name /FO LIST /V 2>&1 | Out-String; if($txt -match "(?im)^\s*(Status|State):\s*Running\s*$"){return "Running"}; if($txt -match "(?im)^\s*(Status|State):\s*Ready\s*$"){return "Ready"}; if($txt -match "ERROR:"){return "Missing"}; return "Present" }catch{ return "Missing" } }
25: function Runners{ $a=@(); try{ $a=@(Get-CimInstance Win32_Process | Where-Object { (""+$_.CommandLine) -match "ScarFLIX_v2_PlatformGate|PlatformGate_LocalRunner|VisibleCatalogQA|PlexDecisionQA|ConcurrentQA|AutonomousController|SafeWebDavExpansion|CandidateSourceModel" }) }catch{}; return $a }
26: function Quiesce{ $disabled=@(); try{ $tasks=schtasks.exe /Query /FO CSV /V 2>$null | ConvertFrom-Csv; foreach($t in $tasks){ $n=""+$t.TaskName; if(($n -match "ScarFLIX_v2" -or $n -match "SF2_") -and $n -notmatch "SF2_Autopilot"){ try{schtasks.exe /End /TN $n 2>$null|Out-Null}catch{}; try{schtasks.exe /Change /TN $n /DISABLE 2>$null|Out-Null}catch{}; $disabled+=$n } } }catch{}; $killed=@(); foreach($p in @(Runners)){ if($p.ProcessId -ne $PID){ try{ Stop-Process -Id $p.ProcessId -Force -ErrorAction SilentlyContinue; $killed+=("PID {0}: {1}" -f $p.ProcessId,$p.Name) }catch{} } }; return [ordered]@{disabled=$disabled;killed=$killed} }
27: function LatestLog($patterns){ $files=@(); foreach($pat in $patterns){ try{ $files+=@(Get-ChildItem -LiteralPath $Logs -File -Filter $pat -ErrorAction SilentlyContinue) }catch{} }; $files=@($files|Sort-Object LastWriteTime -Descending|Select-Object -First 1); if($files.Count -gt 0){return $files[0].FullName}; return "" }
28: function Tail($path,$n){ if($path -and (Test-Path -LiteralPath $path)){ try{return Redact ((Get-Content -LiteralPath $path -Tail $n -ErrorAction SilentlyContinue)-join [Environment]::NewLine)}catch{} }; return "" }
29: function Telemetry($signal,$reason,$next){ $run=@(Runners); $g=Get-Date -Format "yyyy-MM-dd HH:mm:ss"; $obj=[ordered]@{generated_at=$g;agent_version=$Version;signal=$signal;reason=$reason;next_action=$next;visible_count=78;catalogue_changed=$false;expansion_enabled=$false;runner_process_count=$run.Count;autonomous_controller=TaskState "ScarFLIX_v2_AutonomousController";platformgate_detached=TaskState "ScarFLIX_v2_PlatformGate_LocalRunner_Detached";platformgate_manual=TaskState "ScarFLIX_v2_PlatformGate_Manual_OneShot";expansion_task=TaskState "ScarFLIX_v2_SafeWebDavExpansionPipeline";autopilot_task=TaskState "SF2_Autopilot";codex_used=$false}; SaveText (Join-Path $Public "status_compact.json") ($obj|ConvertTo-Json -Depth 8); $a=@("ScarFLIX v2 status for ChatGPT.","","Generated: $g","Agent version: $Version","Signal: $signal","Reason: $reason","Next action: $next","","Visible: 78","Catalogue changed: False","Expansion enabled: False",("Runner process count: {0}" -f $run.Count),("Autonomous controller task: {0}" -f (TaskState "ScarFLIX_v2_AutonomousController")),("PlatformGate detached task: {0}" -f (TaskState "ScarFLIX_v2_PlatformGate_LocalRunner_Detached")),("PlatformGate manual task: {0}" -f (TaskState "ScarFLIX_v2_PlatformGate_Manual_OneShot")),("Expansion task: {0}" -f (TaskState "ScarFLIX_v2_SafeWebDavExpansionPipeline")),("Autopilot task: {0}" -f (TaskState "SF2_Autopilot")),"Codex used: False"); SaveText (Join-Path $Public "ASK_CHATGPT_SUMMARY.md") $a; SaveText (Join-Path $Public "TELEMETRY_FOR_CHATGPT.md") $a; $u=@(); foreach($f in @("status_compact.json","ASK_CHATGPT_SUMMARY.md","TELEMETRY_FOR_CHATGPT.md")){ $u+=($f+": "+(Upload (Join-Path $Public $f) $f)) }; SaveText (Join-Path $Public "telemetry_upload_results.md") $u }
30: function Diagnostics{ $r=@("# ScarFLIX v2 Autopilot Diagnostics","",("Generated: {0}" -f (Get-Date -Format "yyyy-MM-dd HH:mm:ss")),"No Codex. No catalogue change. No expansion."); foreach($pair in @(@("WebDAV ActiveGate",@("*webdav*active*gate*.log","*ActiveGate*.log")),@("PlatformGate",@("*platform*gate*.log","*PlatformGate*.log")),@("Visible Catalog QA",@("*visible*catalog*.log","*VisibleCatalog*.log")),@("Plex Decision QA",@("*plex*decision*.log","*PlexDecision*.log")),@("Concurrent QA",@("*concurrent*.log","*Concurrent*.log")))){ $r+=""; $r+="## "+$pair[0]; $p=LatestLog $pair[1]; $r+="Source: "+$p; $r+="````text"; $t=Tail $p 140; if(!$t){$t="No matching log found."}; $r+=$t; $r+="````" }; $out=Join-Path $Public "AUTOPILOT_DIAGNOSTICS.md"; SaveText $out $r; Upload $out "AUTOPILOT_DIAGNOSTICS.md" | Out-Null }
---
26: function Quiesce{ $disabled=@(); try{ $tasks=schtasks.exe /Query /FO CSV /V 2>$null | ConvertFrom-Csv; foreach($t in $tasks){ $n=""+$t.TaskName; if(($n -match "ScarFLIX_v2" -or $n -match "SF2_") -and $n -notmatch "SF2_Autopilot"){ try{schtasks.exe /End /TN $n 2>$null|Out-Null}catch{}; try{schtasks.exe /Change /TN $n /DISABLE 2>$null|Out-Null}catch{}; $disabled+=$n } } }catch{}; $killed=@(); foreach($p in @(Runners)){ if($p.ProcessId -ne $PID){ try{ Stop-Process -Id $p.ProcessId -Force -ErrorAction SilentlyContinue; $killed+=("PID {0}: {1}" -f $p.ProcessId,$p.Name) }catch{} } }; return [ordered]@{disabled=$disabled;killed=$killed} }
27: function LatestLog($patterns){ $files=@(); foreach($pat in $patterns){ try{ $files+=@(Get-ChildItem -LiteralPath $Logs -File -Filter $pat -ErrorAction SilentlyContinue) }catch{} }; $files=@($files|Sort-Object LastWriteTime -Descending|Select-Object -First 1); if($files.Count -gt 0){return $files[0].FullName}; return "" }
28: function Tail($path,$n){ if($path -and (Test-Path -LiteralPath $path)){ try{return Redact ((Get-Content -LiteralPath $path -Tail $n -ErrorAction SilentlyContinue)-join [Environment]::NewLine)}catch{} }; return "" }
29: function Telemetry($signal,$reason,$next){ $run=@(Runners); $g=Get-Date -Format "yyyy-MM-dd HH:mm:ss"; $obj=[ordered]@{generated_at=$g;agent_version=$Version;signal=$signal;reason=$reason;next_action=$next;visible_count=78;catalogue_changed=$false;expansion_enabled=$false;runner_process_count=$run.Count;autonomous_controller=TaskState "ScarFLIX_v2_AutonomousController";platformgate_detached=TaskState "ScarFLIX_v2_PlatformGate_LocalRunner_Detached";platformgate_manual=TaskState "ScarFLIX_v2_PlatformGate_Manual_OneShot";expansion_task=TaskState "ScarFLIX_v2_SafeWebDavExpansionPipeline";autopilot_task=TaskState "SF2_Autopilot";codex_used=$false}; SaveText (Join-Path $Public "status_compact.json") ($obj|ConvertTo-Json -Depth 8); $a=@("ScarFLIX v2 status for ChatGPT.","","Generated: $g","Agent version: $Version","Signal: $signal","Reason: $reason","Next action: $next","","Visible: 78","Catalogue changed: False","Expansion enabled: False",("Runner process count: {0}" -f $run.Count),("Autonomous controller task: {0}" -f (TaskState "ScarFLIX_v2_AutonomousController")),("PlatformGate detached task: {0}" -f (TaskState "ScarFLIX_v2_PlatformGate_LocalRunner_Detached")),("PlatformGate manual task: {0}" -f (TaskState "ScarFLIX_v2_PlatformGate_Manual_OneShot")),("Expansion task: {0}" -f (TaskState "ScarFLIX_v2_SafeWebDavExpansionPipeline")),("Autopilot task: {0}" -f (TaskState "SF2_Autopilot")),"Codex used: False"); SaveText (Join-Path $Public "ASK_CHATGPT_SUMMARY.md") $a; SaveText (Join-Path $Public "TELEMETRY_FOR_CHATGPT.md") $a; $u=@(); foreach($f in @("status_compact.json","ASK_CHATGPT_SUMMARY.md","TELEMETRY_FOR_CHATGPT.md")){ $u+=($f+": "+(Upload (Join-Path $Public $f) $f)) }; SaveText (Join-Path $Public "telemetry_upload_results.md") $u }
30: function Diagnostics{ $r=@("# ScarFLIX v2 Autopilot Diagnostics","",("Generated: {0}" -f (Get-Date -Format "yyyy-MM-dd HH:mm:ss")),"No Codex. No catalogue change. No expansion."); foreach($pair in @(@("WebDAV ActiveGate",@("*webdav*active*gate*.log","*ActiveGate*.log")),@("PlatformGate",@("*platform*gate*.log","*PlatformGate*.log")),@("Visible Catalog QA",@("*visible*catalog*.log","*VisibleCatalog*.log")),@("Plex Decision QA",@("*plex*decision*.log","*PlexDecision*.log")),@("Concurrent QA",@("*concurrent*.log","*Concurrent*.log")))){ $r+=""; $r+="## "+$pair[0]; $p=LatestLog $pair[1]; $r+="Source: "+$p; $r+="````text"; $t=Tail $p 140; if(!$t){$t="No matching log found."}; $r+=$t; $r+="````" }; $out=Join-Path $Public "AUTOPILOT_DIAGNOSTICS.md"; SaveText $out $r; Upload $out "AUTOPILOT_DIAGNOSTICS.md" | Out-Null }
31: function Snippets{ $terms="HLS|Transcoder|VisibleCatalog|Visible catalog|PlexDecision|client decision|ActiveGate|WebDAV active|TimeoutSeconds|timeout|REVIEW|FAIL|PlatformGate|Concurrent"; $lines=@("ScarFLIX v2 script snippets for ChatGPT.","",("Generated: {0}" -f (Get-Date -Format "yyyy-MM-dd HH:mm:ss")),"No Codex. No restart. No catalogue change. No expansion."); $files=@(); try{$files=@(Get-ChildItem -LiteralPath $Scripts -Recurse -File -Include *.ps1,*.psm1,*.js,*.cmd -ErrorAction SilentlyContinue)}catch{}; foreach($f in $files){ $hits=@(); try{ $c=@(Get-Content -LiteralPath $f.FullName -ErrorAction SilentlyContinue); for($i=0;$i -lt $c.Count;$i++){ if((""+$c[$i]) -match $terms){ $s=[Math]::Max(0,$i-3); $e=[Math]::Min($c.Count-1,$i+5); for($j=$s;$j -le $e;$j++){ $hits+=("{0}: {1}" -f ($j+1),(Redact $c[$j])) }; $hits+="---" } } }catch{}; if($hits.Count -gt 0){ $lines+=""; $lines+="## "+$f.FullName; $lines+="````text"; foreach($h in ($hits|Select-Object -First 180)){$lines+=$h}; $lines+="````" } }; $out=Join-Path $Public "SCRIPT_SNIPPETS_FOR_CHATGPT.md"; SaveText $out $lines; Copy-Item -LiteralPath $out -Destination (Join-Path $Public "ASK_CHATGPT_SUMMARY.md") -Force -ErrorAction SilentlyContinue; Upload $out "SCRIPT_SNIPPETS_FOR_CHATGPT.md"|Out-Null; Upload (Join-Path $Public "ASK_CHATGPT_SUMMARY.md") "ASK_CHATGPT_SUMMARY.md"|Out-Null }
32: function Planner{ $flag=Join-Path $Tokens "sf2_enable_openai_planner.flag"; if(!(Test-Path -LiteralPath $flag)){return "Planner disabled"}; $key=""; $kf=Join-Path $Tokens "openai_api_key.txt"; if(Test-Path -LiteralPath $kf){try{$key=(Get-Content -LiteralPath $kf -Raw).Trim()}catch{}}; if(!$key -and $env:OPENAI_API_KEY){$key=$env:OPENAI_API_KEY}; if(!$key){return "No OpenAI API key"}; $model="gpt-5.1"; $mf=Join-Path $Tokens "openai_model.txt"; if(Test-Path -LiteralPath $mf){try{$m=(Get-Content -LiteralPath $mf -Raw).Trim(); if($m){$model=$m}}catch{}}; $summary=ReadText (Join-Path $Public "TELEMETRY_FOR_CHATGPT.md"); $prompt="Return one JSON object only with action=status|quiesce|diagnostic|script_snippets|stop, reason, risk, requires_user. Telemetry:`n"+$summary; try{ $h=@{Authorization="Bearer $key";"Content-Type"="application/json"}; $body=@{model=$model;input=$prompt}|ConvertTo-Json -Depth 5; $r=Invoke-RestMethod -Uri "https://api.openai.com/v1/responses" -Headers $h -Method Post -Body $body -TimeoutSec 60; $txt=($r|ConvertTo-Json -Depth 12); SaveText (Join-Path $Public "OPENAI_PLANNER_RESULT.json") $txt; Upload (Join-Path $Public "OPENAI_PLANNER_RESULT.json") "OPENAI_PLANNER_RESULT.json"|Out-Null; return "Planner result published" }catch{return "Planner failed: "+$_.Exception.Message} }
33: function RunAction($a){ $x=(""+$a).ToLower(); if(!$x){$x="status"}; if($x -eq "status"){Telemetry "QUIESCED" "Autopilot status published." "No action unless status changes."; return}; if($x -eq "quiesce"){$q=Quiesce; Telemetry "QUIESCED" "Quiesce executed." "Autopilot remains active."; return}; if($x -eq "diagnostic"){Diagnostics; Telemetry "DIAGNOSTIC_READY" "Diagnostics published." "ChatGPT can inspect GitHub."; return}; if($x -eq "script_snippets"){Snippets; Telemetry "SCRIPT_SNIPPETS_READY" "Script snippets published." "ChatGPT can inspect GitHub."; return}; if($x -eq "openai_plan"){$r=Planner; Telemetry "PLANNER_RESULT" $r "Review planner result."; return}; Telemetry "ATTN_UNSUPPORTED_COMMAND" ("Unsupported action: "+$x) "Review command.json." }
34: function CheckCommand{ $cmd=FetchJson $CommandUrl; if($null -eq $cmd){return "none"}; if($cmd.enabled -ne $true){return "disabled"}; $id=""+$cmd.id; if(!$id){return "missing id"}; $lastPath=Join-Path $State "last_command_id.txt"; $last=ReadText $lastPath; if($last.Trim() -eq $id){return "already"}; $exp=""+$cmd.expires_utc; if($exp){ try{if(([datetime]$exp) -lt (Get-Date).ToUniversalTime()){return "expired"}}catch{} }; RunAction $cmd.action; SaveText $lastPath $id; $res=[ordered]@{generated_at=(Get-Date -Format "yyyy-MM-dd HH:mm:ss");command_id=$id;action=(""+$cmd.action);result="processed"}; SaveText (Join-Path $Public "command_result.json") ($res|ConvertTo-Json -Depth 5); Upload (Join-Path $Public "command_result.json") "command_result.json"|Out-Null; return "processed" }
---
27: function LatestLog($patterns){ $files=@(); foreach($pat in $patterns){ try{ $files+=@(Get-ChildItem -LiteralPath $Logs -File -Filter $pat -ErrorAction SilentlyContinue) }catch{} }; $files=@($files|Sort-Object LastWriteTime -Descending|Select-Object -First 1); if($files.Count -gt 0){return $files[0].FullName}; return "" }
28: function Tail($path,$n){ if($path -and (Test-Path -LiteralPath $path)){ try{return Redact ((Get-Content -LiteralPath $path -Tail $n -ErrorAction SilentlyContinue)-join [Environment]::NewLine)}catch{} }; return "" }
29: function Telemetry($signal,$reason,$next){ $run=@(Runners); $g=Get-Date -Format "yyyy-MM-dd HH:mm:ss"; $obj=[ordered]@{generated_at=$g;agent_version=$Version;signal=$signal;reason=$reason;next_action=$next;visible_count=78;catalogue_changed=$false;expansion_enabled=$false;runner_process_count=$run.Count;autonomous_controller=TaskState "ScarFLIX_v2_AutonomousController";platformgate_detached=TaskState "ScarFLIX_v2_PlatformGate_LocalRunner_Detached";platformgate_manual=TaskState "ScarFLIX_v2_PlatformGate_Manual_OneShot";expansion_task=TaskState "ScarFLIX_v2_SafeWebDavExpansionPipeline";autopilot_task=TaskState "SF2_Autopilot";codex_used=$false}; SaveText (Join-Path $Public "status_compact.json") ($obj|ConvertTo-Json -Depth 8); $a=@("ScarFLIX v2 status for ChatGPT.","","Generated: $g","Agent version: $Version","Signal: $signal","Reason: $reason","Next action: $next","","Visible: 78","Catalogue changed: False","Expansion enabled: False",("Runner process count: {0}" -f $run.Count),("Autonomous controller task: {0}" -f (TaskState "ScarFLIX_v2_AutonomousController")),("PlatformGate detached task: {0}" -f (TaskState "ScarFLIX_v2_PlatformGate_LocalRunner_Detached")),("PlatformGate manual task: {0}" -f (TaskState "ScarFLIX_v2_PlatformGate_Manual_OneShot")),("Expansion task: {0}" -f (TaskState "ScarFLIX_v2_SafeWebDavExpansionPipeline")),("Autopilot task: {0}" -f (TaskState "SF2_Autopilot")),"Codex used: False"); SaveText (Join-Path $Public "ASK_CHATGPT_SUMMARY.md") $a; SaveText (Join-Path $Public "TELEMETRY_FOR_CHATGPT.md") $a; $u=@(); foreach($f in @("status_compact.json","ASK_CHATGPT_SUMMARY.md","TELEMETRY_FOR_CHATGPT.md")){ $u+=($f+": "+(Upload (Join-Path $Public $f) $f)) }; SaveText (Join-Path $Public "telemetry_upload_results.md") $u }
30: function Diagnostics{ $r=@("# ScarFLIX v2 Autopilot Diagnostics","",("Generated: {0}" -f (Get-Date -Format "yyyy-MM-dd HH:mm:ss")),"No Codex. No catalogue change. No expansion."); foreach($pair in @(@("WebDAV ActiveGate",@("*webdav*active*gate*.log","*ActiveGate*.log")),@("PlatformGate",@("*platform*gate*.log","*PlatformGate*.log")),@("Visible Catalog QA",@("*visible*catalog*.log","*VisibleCatalog*.log")),@("Plex Decision QA",@("*plex*decision*.log","*PlexDecision*.log")),@("Concurrent QA",@("*concurrent*.log","*Concurrent*.log")))){ $r+=""; $r+="## "+$pair[0]; $p=LatestLog $pair[1]; $r+="Source: "+$p; $r+="````text"; $t=Tail $p 140; if(!$t){$t="No matching log found."}; $r+=$t; $r+="````" }; $out=Join-Path $Public "AUTOPILOT_DIAGNOSTICS.md"; SaveText $out $r; Upload $out "AUTOPILOT_DIAGNOSTICS.md" | Out-Null }
31: function Snippets{ $terms="HLS|Transcoder|VisibleCatalog|Visible catalog|PlexDecision|client decision|ActiveGate|WebDAV active|TimeoutSeconds|timeout|REVIEW|FAIL|PlatformGate|Concurrent"; $lines=@("ScarFLIX v2 script snippets for ChatGPT.","",("Generated: {0}" -f (Get-Date -Format "yyyy-MM-dd HH:mm:ss")),"No Codex. No restart. No catalogue change. No expansion."); $files=@(); try{$files=@(Get-ChildItem -LiteralPath $Scripts -Recurse -File -Include *.ps1,*.psm1,*.js,*.cmd -ErrorAction SilentlyContinue)}catch{}; foreach($f in $files){ $hits=@(); try{ $c=@(Get-Content -LiteralPath $f.FullName -ErrorAction SilentlyContinue); for($i=0;$i -lt $c.Count;$i++){ if((""+$c[$i]) -match $terms){ $s=[Math]::Max(0,$i-3); $e=[Math]::Min($c.Count-1,$i+5); for($j=$s;$j -le $e;$j++){ $hits+=("{0}: {1}" -f ($j+1),(Redact $c[$j])) }; $hits+="---" } } }catch{}; if($hits.Count -gt 0){ $lines+=""; $lines+="## "+$f.FullName; $lines+="````text"; foreach($h in ($hits|Select-Object -First 180)){$lines+=$h}; $lines+="````" } }; $out=Join-Path $Public "SCRIPT_SNIPPETS_FOR_CHATGPT.md"; SaveText $out $lines; Copy-Item -LiteralPath $out -Destination (Join-Path $Public "ASK_CHATGPT_SUMMARY.md") -Force -ErrorAction SilentlyContinue; Upload $out "SCRIPT_SNIPPETS_FOR_CHATGPT.md"|Out-Null; Upload (Join-Path $Public "ASK_CHATGPT_SUMMARY.md") "ASK_CHATGPT_SUMMARY.md"|Out-Null }
32: function Planner{ $flag=Join-Path $Tokens "sf2_enable_openai_planner.flag"; if(!(Test-Path -LiteralPath $flag)){return "Planner disabled"}; $key=""; $kf=Join-Path $Tokens "openai_api_key.txt"; if(Test-Path -LiteralPath $kf){try{$key=(Get-Content -LiteralPath $kf -Raw).Trim()}catch{}}; if(!$key -and $env:OPENAI_API_KEY){$key=$env:OPENAI_API_KEY}; if(!$key){return "No OpenAI API key"}; $model="gpt-5.1"; $mf=Join-Path $Tokens "openai_model.txt"; if(Test-Path -LiteralPath $mf){try{$m=(Get-Content -LiteralPath $mf -Raw).Trim(); if($m){$model=$m}}catch{}}; $summary=ReadText (Join-Path $Public "TELEMETRY_FOR_CHATGPT.md"); $prompt="Return one JSON object only with action=status|quiesce|diagnostic|script_snippets|stop, reason, risk, requires_user. Telemetry:`n"+$summary; try{ $h=@{Authorization="Bearer $key";"Content-Type"="application/json"}; $body=@{model=$model;input=$prompt}|ConvertTo-Json -Depth 5; $r=Invoke-RestMethod -Uri "https://api.openai.com/v1/responses" -Headers $h -Method Post -Body $body -TimeoutSec 60; $txt=($r|ConvertTo-Json -Depth 12); SaveText (Join-Path $Public "OPENAI_PLANNER_RESULT.json") $txt; Upload (Join-Path $Public "OPENAI_PLANNER_RESULT.json") "OPENAI_PLANNER_RESULT.json"|Out-Null; return "Planner result published" }catch{return "Planner failed: "+$_.Exception.Message} }
33: function RunAction($a){ $x=(""+$a).ToLower(); if(!$x){$x="status"}; if($x -eq "status"){Telemetry "QUIESCED" "Autopilot status published." "No action unless status changes."; return}; if($x -eq "quiesce"){$q=Quiesce; Telemetry "QUIESCED" "Quiesce executed." "Autopilot remains active."; return}; if($x -eq "diagnostic"){Diagnostics; Telemetry "DIAGNOSTIC_READY" "Diagnostics published." "ChatGPT can inspect GitHub."; return}; if($x -eq "script_snippets"){Snippets; Telemetry "SCRIPT_SNIPPETS_READY" "Script snippets published." "ChatGPT can inspect GitHub."; return}; if($x -eq "openai_plan"){$r=Planner; Telemetry "PLANNER_RESULT" $r "Review planner result."; return}; Telemetry "ATTN_UNSUPPORTED_COMMAND" ("Unsupported action: "+$x) "Review command.json." }
34: function CheckCommand{ $cmd=FetchJson $CommandUrl; if($null -eq $cmd){return "none"}; if($cmd.enabled -ne $true){return "disabled"}; $id=""+$cmd.id; if(!$id){return "missing id"}; $lastPath=Join-Path $State "last_command_id.txt"; $last=ReadText $lastPath; if($last.Trim() -eq $id){return "already"}; $exp=""+$cmd.expires_utc; if($exp){ try{if(([datetime]$exp) -lt (Get-Date).ToUniversalTime()){return "expired"}}catch{} }; RunAction $cmd.action; SaveText $lastPath $id; $res=[ordered]@{generated_at=(Get-Date -Format "yyyy-MM-dd HH:mm:ss");command_id=$id;action=(""+$cmd.action);result="processed"}; SaveText (Join-Path $Public "command_result.json") ($res|ConvertTo-Json -Depth 5); Upload (Join-Path $Public "command_result.json") "command_result.json"|Out-Null; return "processed" }
35: try{ LogLine "tick start"; $r=CheckCommand; LogLine ("command="+$r); $rc=@(Runners).Count; if($rc -gt 4){ Quiesce|Out-Null; Telemetry "QUIESCED" ("Autopilot quiesced excessive runner count: "+$rc) "No Codex. Autopilot remains active." } elseif($r -match "none|disabled|already|expired|missing"){ Telemetry "QUIESCED" "Autopilot heartbeat. No active command. ScarFLIX remains paused safely." "ChatGPT can write command.json to GitHub, or user can type 1." }; LogLine "tick end" } catch { LogLine ("error="+$_.Exception.Message); Telemetry "ATTN_AUTOPILOT_ERROR" $_.Exception.Message "Type 1; autopilot kept telemetry alive." }
---
28: function Tail($path,$n){ if($path -and (Test-Path -LiteralPath $path)){ try{return Redact ((Get-Content -LiteralPath $path -Tail $n -ErrorAction SilentlyContinue)-join [Environment]::NewLine)}catch{} }; return "" }
29: function Telemetry($signal,$reason,$next){ $run=@(Runners); $g=Get-Date -Format "yyyy-MM-dd HH:mm:ss"; $obj=[ordered]@{generated_at=$g;agent_version=$Version;signal=$signal;reason=$reason;next_action=$next;visible_count=78;catalogue_changed=$false;expansion_enabled=$false;runner_process_count=$run.Count;autonomous_controller=TaskState "ScarFLIX_v2_AutonomousController";platformgate_detached=TaskState "ScarFLIX_v2_PlatformGate_LocalRunner_Detached";platformgate_manual=TaskState "ScarFLIX_v2_PlatformGate_Manual_OneShot";expansion_task=TaskState "ScarFLIX_v2_SafeWebDavExpansionPipeline";autopilot_task=TaskState "SF2_Autopilot";codex_used=$false}; SaveText (Join-Path $Public "status_compact.json") ($obj|ConvertTo-Json -Depth 8); $a=@("ScarFLIX v2 status for ChatGPT.","","Generated: $g","Agent version: $Version","Signal: $signal","Reason: $reason","Next action: $next","","Visible: 78","Catalogue changed: False","Expansion enabled: False",("Runner process count: {0}" -f $run.Count),("Autonomous controller task: {0}" -f (TaskState "ScarFLIX_v2_AutonomousController")),("PlatformGate detached task: {0}" -f (TaskState "ScarFLIX_v2_PlatformGate_LocalRunner_Detached")),("PlatformGate manual task: {0}" -f (TaskState "ScarFLIX_v2_PlatformGate_Manual_OneShot")),("Expansion task: {0}" -f (TaskState "ScarFLIX_v2_SafeWebDavExpansionPipeline")),("Autopilot task: {0}" -f (TaskState "SF2_Autopilot")),"Codex used: False"); SaveText (Join-Path $Public "ASK_CHATGPT_SUMMARY.md") $a; SaveText (Join-Path $Public "TELEMETRY_FOR_CHATGPT.md") $a; $u=@(); foreach($f in @("status_compact.json","ASK_CHATGPT_SUMMARY.md","TELEMETRY_FOR_CHATGPT.md")){ $u+=($f+": "+(Upload (Join-Path $Public $f) $f)) }; SaveText (Join-Path $Public "telemetry_upload_results.md") $u }
30: function Diagnostics{ $r=@("# ScarFLIX v2 Autopilot Diagnostics","",("Generated: {0}" -f (Get-Date -Format "yyyy-MM-dd HH:mm:ss")),"No Codex. No catalogue change. No expansion."); foreach($pair in @(@("WebDAV ActiveGate",@("*webdav*active*gate*.log","*ActiveGate*.log")),@("PlatformGate",@("*platform*gate*.log","*PlatformGate*.log")),@("Visible Catalog QA",@("*visible*catalog*.log","*VisibleCatalog*.log")),@("Plex Decision QA",@("*plex*decision*.log","*PlexDecision*.log")),@("Concurrent QA",@("*concurrent*.log","*Concurrent*.log")))){ $r+=""; $r+="## "+$pair[0]; $p=LatestLog $pair[1]; $r+="Source: "+$p; $r+="````text"; $t=Tail $p 140; if(!$t){$t="No matching log found."}; $r+=$t; $r+="````" }; $out=Join-Path $Public "AUTOPILOT_DIAGNOSTICS.md"; SaveText $out $r; Upload $out "AUTOPILOT_DIAGNOSTICS.md" | Out-Null }
31: function Snippets{ $terms="HLS|Transcoder|VisibleCatalog|Visible catalog|PlexDecision|client decision|ActiveGate|WebDAV active|TimeoutSeconds|timeout|REVIEW|FAIL|PlatformGate|Concurrent"; $lines=@("ScarFLIX v2 script snippets for ChatGPT.","",("Generated: {0}" -f (Get-Date -Format "yyyy-MM-dd HH:mm:ss")),"No Codex. No restart. No catalogue change. No expansion."); $files=@(); try{$files=@(Get-ChildItem -LiteralPath $Scripts -Recurse -File -Include *.ps1,*.psm1,*.js,*.cmd -ErrorAction SilentlyContinue)}catch{}; foreach($f in $files){ $hits=@(); try{ $c=@(Get-Content -LiteralPath $f.FullName -ErrorAction SilentlyContinue); for($i=0;$i -lt $c.Count;$i++){ if((""+$c[$i]) -match $terms){ $s=[Math]::Max(0,$i-3); $e=[Math]::Min($c.Count-1,$i+5); for($j=$s;$j -le $e;$j++){ $hits+=("{0}: {1}" -f ($j+1),(Redact $c[$j])) }; $hits+="---" } } }catch{}; if($hits.Count -gt 0){ $lines+=""; $lines+="## "+$f.FullName; $lines+="````text"; foreach($h in ($hits|Select-Object -First 180)){$lines+=$h}; $lines+="````" } }; $out=Join-Path $Public "SCRIPT_SNIPPETS_FOR_CHATGPT.md"; SaveText $out $lines; Copy-Item -LiteralPath $out -Destination (Join-Path $Public "ASK_CHATGPT_SUMMARY.md") -Force -ErrorAction SilentlyContinue; Upload $out "SCRIPT_SNIPPETS_FOR_CHATGPT.md"|Out-Null; Upload (Join-Path $Public "ASK_CHATGPT_SUMMARY.md") "ASK_CHATGPT_SUMMARY.md"|Out-Null }
32: function Planner{ $flag=Join-Path $Tokens "sf2_enable_openai_planner.flag"; if(!(Test-Path -LiteralPath $flag)){return "Planner disabled"}; $key=""; $kf=Join-Path $Tokens "openai_api_key.txt"; if(Test-Path -LiteralPath $kf){try{$key=(Get-Content -LiteralPath $kf -Raw).Trim()}catch{}}; if(!$key -and $env:OPENAI_API_KEY){$key=$env:OPENAI_API_KEY}; if(!$key){return "No OpenAI API key"}; $model="gpt-5.1"; $mf=Join-Path $Tokens "openai_model.txt"; if(Test-Path -LiteralPath $mf){try{$m=(Get-Content -LiteralPath $mf -Raw).Trim(); if($m){$model=$m}}catch{}}; $summary=ReadText (Join-Path $Public "TELEMETRY_FOR_CHATGPT.md"); $prompt="Return one JSON object only with action=status|quiesce|diagnostic|script_snippets|stop, reason, risk, requires_user. Telemetry:`n"+$summary; try{ $h=@{Authorization="Bearer $key";"Content-Type"="application/json"}; $body=@{model=$model;input=$prompt}|ConvertTo-Json -Depth 5; $r=Invoke-RestMethod -Uri "https://api.openai.com/v1/responses" -Headers $h -Method Post -Body $body -TimeoutSec 60; $txt=($r|ConvertTo-Json -Depth 12); SaveText (Join-Path $Public "OPENAI_PLANNER_RESULT.json") $txt; Upload (Join-Path $Public "OPENAI_PLANNER_RESULT.json") "OPENAI_PLANNER_RESULT.json"|Out-Null; return "Planner result published" }catch{return "Planner failed: "+$_.Exception.Message} }
33: function RunAction($a){ $x=(""+$a).ToLower(); if(!$x){$x="status"}; if($x -eq "status"){Telemetry "QUIESCED" "Autopilot status published." "No action unless status changes."; return}; if($x -eq "quiesce"){$q=Quiesce; Telemetry "QUIESCED" "Quiesce executed." "Autopilot remains active."; return}; if($x -eq "diagnostic"){Diagnostics; Telemetry "DIAGNOSTIC_READY" "Diagnostics published." "ChatGPT can inspect GitHub."; return}; if($x -eq "script_snippets"){Snippets; Telemetry "SCRIPT_SNIPPETS_READY" "Script snippets published." "ChatGPT can inspect GitHub."; return}; if($x -eq "openai_plan"){$r=Planner; Telemetry "PLANNER_RESULT" $r "Review planner result."; return}; Telemetry "ATTN_UNSUPPORTED_COMMAND" ("Unsupported action: "+$x) "Review command.json." }
34: function CheckCommand{ $cmd=FetchJson $CommandUrl; if($null -eq $cmd){return "none"}; if($cmd.enabled -ne $true){return "disabled"}; $id=""+$cmd.id; if(!$id){return "missing id"}; $lastPath=Join-Path $State "last_command_id.txt"; $last=ReadText $lastPath; if($last.Trim() -eq $id){return "already"}; $exp=""+$cmd.expires_utc; if($exp){ try{if(([datetime]$exp) -lt (Get-Date).ToUniversalTime()){return "expired"}}catch{} }; RunAction $cmd.action; SaveText $lastPath $id; $res=[ordered]@{generated_at=(Get-Date -Format "yyyy-MM-dd HH:mm:ss");command_id=$id;action=(""+$cmd.action);result="processed"}; SaveText (Join-Path $Public "command_result.json") ($res|ConvertTo-Json -Depth 5); Upload (Join-Path $Public "command_result.json") "command_result.json"|Out-Null; return "processed" }
35: try{ LogLine "tick start"; $r=CheckCommand; LogLine ("command="+$r); $rc=@(Runners).Count; if($rc -gt 4){ Quiesce|Out-Null; Telemetry "QUIESCED" ("Autopilot quiesced excessive runner count: "+$rc) "No Codex. Autopilot remains active." } elseif($r -match "none|disabled|already|expired|missing"){ Telemetry "QUIESCED" "Autopilot heartbeat. No active command. ScarFLIX remains paused safely." "ChatGPT can write command.json to GitHub, or user can type 1." }; LogLine "tick end" } catch { LogLine ("error="+$_.Exception.Message); Telemetry "ATTN_AUTOPILOT_ERROR" $_.Exception.Message "Type 1; autopilot kept telemetry alive." }
---
29: function Telemetry($signal,$reason,$next){ $run=@(Runners); $g=Get-Date -Format "yyyy-MM-dd HH:mm:ss"; $obj=[ordered]@{generated_at=$g;agent_version=$Version;signal=$signal;reason=$reason;next_action=$next;visible_count=78;catalogue_changed=$false;expansion_enabled=$false;runner_process_count=$run.Count;autonomous_controller=TaskState "ScarFLIX_v2_AutonomousController";platformgate_detached=TaskState "ScarFLIX_v2_PlatformGate_LocalRunner_Detached";platformgate_manual=TaskState "ScarFLIX_v2_PlatformGate_Manual_OneShot";expansion_task=TaskState "ScarFLIX_v2_SafeWebDavExpansionPipeline";autopilot_task=TaskState "SF2_Autopilot";codex_used=$false}; SaveText (Join-Path $Public "status_compact.json") ($obj|ConvertTo-Json -Depth 8); $a=@("ScarFLIX v2 status for ChatGPT.","","Generated: $g","Agent version: $Version","Signal: $signal","Reason: $reason","Next action: $next","","Visible: 78","Catalogue changed: False","Expansion enabled: False",("Runner process count: {0}" -f $run.Count),("Autonomous controller task: {0}" -f (TaskState "ScarFLIX_v2_AutonomousController")),("PlatformGate detached task: {0}" -f (TaskState "ScarFLIX_v2_PlatformGate_LocalRunner_Detached")),("PlatformGate manual task: {0}" -f (TaskState "ScarFLIX_v2_PlatformGate_Manual_OneShot")),("Expansion task: {0}" -f (TaskState "ScarFLIX_v2_SafeWebDavExpansionPipeline")),("Autopilot task: {0}" -f (TaskState "SF2_Autopilot")),"Codex used: False"); SaveText (Join-Path $Public "ASK_CHATGPT_SUMMARY.md") $a; SaveText (Join-Path $Public "TELEMETRY_FOR_CHATGPT.md") $a; $u=@(); foreach($f in @("status_compact.json","ASK_CHATGPT_SUMMARY.md","TELEMETRY_FOR_CHATGPT.md")){ $u+=($f+": "+(Upload (Join-Path $Public $f) $f)) }; SaveText (Join-Path $Public "telemetry_upload_results.md") $u }
30: function Diagnostics{ $r=@("# ScarFLIX v2 Autopilot Diagnostics","",("Generated: {0}" -f (Get-Date -Format "yyyy-MM-dd HH:mm:ss")),"No Codex. No catalogue change. No expansion."); foreach($pair in @(@("WebDAV ActiveGate",@("*webdav*active*gate*.log","*ActiveGate*.log")),@("PlatformGate",@("*platform*gate*.log","*PlatformGate*.log")),@("Visible Catalog QA",@("*visible*catalog*.log","*VisibleCatalog*.log")),@("Plex Decision QA",@("*plex*decision*.log","*PlexDecision*.log")),@("Concurrent QA",@("*concurrent*.log","*Concurrent*.log")))){ $r+=""; $r+="## "+$pair[0]; $p=LatestLog $pair[1]; $r+="Source: "+$p; $r+="````text"; $t=Tail $p 140; if(!$t){$t="No matching log found."}; $r+=$t; $r+="````" }; $out=Join-Path $Public "AUTOPILOT_DIAGNOSTICS.md"; SaveText $out $r; Upload $out "AUTOPILOT_DIAGNOSTICS.md" | Out-Null }
31: function Snippets{ $terms="HLS|Transcoder|VisibleCatalog|Visible catalog|PlexDecision|client decision|ActiveGate|WebDAV active|TimeoutSeconds|timeout|REVIEW|FAIL|PlatformGate|Concurrent"; $lines=@("ScarFLIX v2 script snippets for ChatGPT.","",("Generated: {0}" -f (Get-Date -Format "yyyy-MM-dd HH:mm:ss")),"No Codex. No restart. No catalogue change. No expansion."); $files=@(); try{$files=@(Get-ChildItem -LiteralPath $Scripts -Recurse -File -Include *.ps1,*.psm1,*.js,*.cmd -ErrorAction SilentlyContinue)}catch{}; foreach($f in $files){ $hits=@(); try{ $c=@(Get-Content -LiteralPath $f.FullName -ErrorAction SilentlyContinue); for($i=0;$i -lt $c.Count;$i++){ if((""+$c[$i]) -match $terms){ $s=[Math]::Max(0,$i-3); $e=[Math]::Min($c.Count-1,$i+5); for($j=$s;$j -le $e;$j++){ $hits+=("{0}: {1}" -f ($j+1),(Redact $c[$j])) }; $hits+="---" } } }catch{}; if($hits.Count -gt 0){ $lines+=""; $lines+="## "+$f.FullName; $lines+="````text"; foreach($h in ($hits|Select-Object -First 180)){$lines+=$h}; $lines+="````" } }; $out=Join-Path $Public "SCRIPT_SNIPPETS_FOR_CHATGPT.md"; SaveText $out $lines; Copy-Item -LiteralPath $out -Destination (Join-Path $Public "ASK_CHATGPT_SUMMARY.md") -Force -ErrorAction SilentlyContinue; Upload $out "SCRIPT_SNIPPETS_FOR_CHATGPT.md"|Out-Null; Upload (Join-Path $Public "ASK_CHATGPT_SUMMARY.md") "ASK_CHATGPT_SUMMARY.md"|Out-Null }
32: function Planner{ $flag=Join-Path $Tokens "sf2_enable_openai_planner.flag"; if(!(Test-Path -LiteralPath $flag)){return "Planner disabled"}; $key=""; $kf=Join-Path $Tokens "openai_api_key.txt"; if(Test-Path -LiteralPath $kf){try{$key=(Get-Content -LiteralPath $kf -Raw).Trim()}catch{}}; if(!$key -and $env:OPENAI_API_KEY){$key=$env:OPENAI_API_KEY}; if(!$key){return "No OpenAI API key"}; $model="gpt-5.1"; $mf=Join-Path $Tokens "openai_model.txt"; if(Test-Path -LiteralPath $mf){try{$m=(Get-Content -LiteralPath $mf -Raw).Trim(); if($m){$model=$m}}catch{}}; $summary=ReadText (Join-Path $Public "TELEMETRY_FOR_CHATGPT.md"); $prompt="Return one JSON object only with action=status|quiesce|diagnostic|script_snippets|stop, reason, risk, requires_user. Telemetry:`n"+$summary; try{ $h=@{Authorization="Bearer $key";"Content-Type"="application/json"}; $body=@{model=$model;input=$prompt}|ConvertTo-Json -Depth 5; $r=Invoke-RestMethod -Uri "https://api.openai.com/v1/responses" -Headers $h -Method Post -Body $body -TimeoutSec 60; $txt=($r|ConvertTo-Json -Depth 12); SaveText (Join-Path $Public "OPENAI_PLANNER_RESULT.json") $txt; Upload (Join-Path $Public "OPENAI_PLANNER_RESULT.json") "OPENAI_PLANNER_RESULT.json"|Out-Null; return "Planner result published" }catch{return "Planner failed: "+$_.Exception.Message} }
33: function RunAction($a){ $x=(""+$a).ToLower(); if(!$x){$x="status"}; if($x -eq "status"){Telemetry "QUIESCED" "Autopilot status published." "No action unless status changes."; return}; if($x -eq "quiesce"){$q=Quiesce; Telemetry "QUIESCED" "Quiesce executed." "Autopilot remains active."; return}; if($x -eq "diagnostic"){Diagnostics; Telemetry "DIAGNOSTIC_READY" "Diagnostics published." "ChatGPT can inspect GitHub."; return}; if($x -eq "script_snippets"){Snippets; Telemetry "SCRIPT_SNIPPETS_READY" "Script snippets published." "ChatGPT can inspect GitHub."; return}; if($x -eq "openai_plan"){$r=Planner; Telemetry "PLANNER_RESULT" $r "Review planner result."; return}; Telemetry "ATTN_UNSUPPORTED_COMMAND" ("Unsupported action: "+$x) "Review command.json." }
34: function CheckCommand{ $cmd=FetchJson $CommandUrl; if($null -eq $cmd){return "none"}; if($cmd.enabled -ne $true){return "disabled"}; $id=""+$cmd.id; if(!$id){return "missing id"}; $lastPath=Join-Path $State "last_command_id.txt"; $last=ReadText $lastPath; if($last.Trim() -eq $id){return "already"}; $exp=""+$cmd.expires_utc; if($exp){ try{if(([datetime]$exp) -lt (Get-Date).ToUniversalTime()){return "expired"}}catch{} }; RunAction $cmd.action; SaveText $lastPath $id; $res=[ordered]@{generated_at=(Get-Date -Format "yyyy-MM-dd HH:mm:ss");command_id=$id;action=(""+$cmd.action);result="processed"}; SaveText (Join-Path $Public "command_result.json") ($res|ConvertTo-Json -Depth 5); Upload (Join-Path $Public "command_result.json") "command_result.json"|Out-Null; return "processed" }
35: try{ LogLine "tick start"; $r=CheckCommand; LogLine ("command="+$r); $rc=@(Runners).Count; if($rc -gt 4){ Quiesce|Out-Null; Telemetry "QUIESCED" ("Autopilot quiesced excessive runner count: "+$rc) "No Codex. Autopilot remains active." } elseif($r -match "none|disabled|already|expired|missing"){ Telemetry "QUIESCED" "Autopilot heartbeat. No active command. ScarFLIX remains paused safely." "ChatGPT can write command.json to GitHub, or user can type 1." }; LogLine "tick end" } catch { LogLine ("error="+$_.Exception.Message); Telemetry "ATTN_AUTOPILOT_ERROR" $_.Exception.Message "Type 1; autopilot kept telemetry alive." }
---
30: function Diagnostics{ $r=@("# ScarFLIX v2 Autopilot Diagnostics","",("Generated: {0}" -f (Get-Date -Format "yyyy-MM-dd HH:mm:ss")),"No Codex. No catalogue change. No expansion."); foreach($pair in @(@("WebDAV ActiveGate",@("*webdav*active*gate*.log","*ActiveGate*.log")),@("PlatformGate",@("*platform*gate*.log","*PlatformGate*.log")),@("Visible Catalog QA",@("*visible*catalog*.log","*VisibleCatalog*.log")),@("Plex Decision QA",@("*plex*decision*.log","*PlexDecision*.log")),@("Concurrent QA",@("*concurrent*.log","*Concurrent*.log")))){ $r+=""; $r+="## "+$pair[0]; $p=LatestLog $pair[1]; $r+="Source: "+$p; $r+="````text"; $t=Tail $p 140; if(!$t){$t="No matching log found."}; $r+=$t; $r+="````" }; $out=Join-Path $Public "AUTOPILOT_DIAGNOSTICS.md"; SaveText $out $r; Upload $out "AUTOPILOT_DIAGNOSTICS.md" | Out-Null }
31: function Snippets{ $terms="HLS|Transcoder|VisibleCatalog|Visible catalog|PlexDecision|client decision|ActiveGate|WebDAV active|TimeoutSeconds|timeout|REVIEW|FAIL|PlatformGate|Concurrent"; $lines=@("ScarFLIX v2 script snippets for ChatGPT.","",("Generated: {0}" -f (Get-Date -Format "yyyy-MM-dd HH:mm:ss")),"No Codex. No restart. No catalogue change. No expansion."); $files=@(); try{$files=@(Get-ChildItem -LiteralPath $Scripts -Recurse -File -Include *.ps1,*.psm1,*.js,*.cmd -ErrorAction SilentlyContinue)}catch{}; foreach($f in $files){ $hits=@(); try{ $c=@(Get-Content -LiteralPath $f.FullName -ErrorAction SilentlyContinue); for($i=0;$i -lt $c.Count;$i++){ if((""+$c[$i]) -match $terms){ $s=[Math]::Max(0,$i-3); $e=[Math]::Min($c.Count-1,$i+5); for($j=$s;$j -le $e;$j++){ $hits+=("{0}: {1}" -f ($j+1),(Redact $c[$j])) }; $hits+="---" } } }catch{}; if($hits.Count -gt 0){ $lines+=""; $lines+="## "+$f.FullName; $lines+="````text"; foreach($h in ($hits|Select-Object -First 180)){$lines+=$h}; $lines+="````" } }; $out=Join-Path $Public "SCRIPT_SNIPPETS_FOR_CHATGPT.md"; SaveText $out $lines; Copy-Item -LiteralPath $out -Destination (Join-Path $Public "ASK_CHATGPT_SUMMARY.md") -Force -ErrorAction SilentlyContinue; Upload $out "SCRIPT_SNIPPETS_FOR_CHATGPT.md"|Out-Null; Upload (Join-Path $Public "ASK_CHATGPT_SUMMARY.md") "ASK_CHATGPT_SUMMARY.md"|Out-Null }
32: function Planner{ $flag=Join-Path $Tokens "sf2_enable_openai_planner.flag"; if(!(Test-Path -LiteralPath $flag)){return "Planner disabled"}; $key=""; $kf=Join-Path $Tokens "openai_api_key.txt"; if(Test-Path -LiteralPath $kf){try{$key=(Get-Content -LiteralPath $kf -Raw).Trim()}catch{}}; if(!$key -and $env:OPENAI_API_KEY){$key=$env:OPENAI_API_KEY}; if(!$key){return "No OpenAI API key"}; $model="gpt-5.1"; $mf=Join-Path $Tokens "openai_model.txt"; if(Test-Path -LiteralPath $mf){try{$m=(Get-Content -LiteralPath $mf -Raw).Trim(); if($m){$model=$m}}catch{}}; $summary=ReadText (Join-Path $Public "TELEMETRY_FOR_CHATGPT.md"); $prompt="Return one JSON object only with action=status|quiesce|diagnostic|script_snippets|stop, reason, risk, requires_user. Telemetry:`n"+$summary; try{ $h=@{Authorization="Bearer $key";"Content-Type"="application/json"}; $body=@{model=$model;input=$prompt}|ConvertTo-Json -Depth 5; $r=Invoke-RestMethod -Uri "https://api.openai.com/v1/responses" -Headers $h -Method Post -Body $body -TimeoutSec 60; $txt=($r|ConvertTo-Json -Depth 12); SaveText (Join-Path $Public "OPENAI_PLANNER_RESULT.json") $txt; Upload (Join-Path $Public "OPENAI_PLANNER_RESULT.json") "OPENAI_PLANNER_RESULT.json"|Out-Null; return "Planner result published" }catch{return "Planner failed: "+$_.Exception.Message} }
33: function RunAction($a){ $x=(""+$a).ToLower(); if(!$x){$x="status"}; if($x -eq "status"){Telemetry "QUIESCED" "Autopilot status published." "No action unless status changes."; return}; if($x -eq "quiesce"){$q=Quiesce; Telemetry "QUIESCED" "Quiesce executed." "Autopilot remains active."; return}; if($x -eq "diagnostic"){Diagnostics; Telemetry "DIAGNOSTIC_READY" "Diagnostics published." "ChatGPT can inspect GitHub."; return}; if($x -eq "script_snippets"){Snippets; Telemetry "SCRIPT_SNIPPETS_READY" "Script snippets published." "ChatGPT can inspect GitHub."; return}; if($x -eq "openai_plan"){$r=Planner; Telemetry "PLANNER_RESULT" $r "Review planner result."; return}; Telemetry "ATTN_UNSUPPORTED_COMMAND" ("Unsupported action: "+$x) "Review command.json." }
34: function CheckCommand{ $cmd=FetchJson $CommandUrl; if($null -eq $cmd){return "none"}; if($cmd.enabled -ne $true){return "disabled"}; $id=""+$cmd.id; if(!$id){return "missing id"}; $lastPath=Join-Path $State "last_command_id.txt"; $last=ReadText $lastPath; if($last.Trim() -eq $id){return "already"}; $exp=""+$cmd.expires_utc; if($exp){ try{if(([datetime]$exp) -lt (Get-Date).ToUniversalTime()){return "expired"}}catch{} }; RunAction $cmd.action; SaveText $lastPath $id; $res=[ordered]@{generated_at=(Get-Date -Format "yyyy-MM-dd HH:mm:ss");command_id=$id;action=(""+$cmd.action);result="processed"}; SaveText (Join-Path $Public "command_result.json") ($res|ConvertTo-Json -Depth 5); Upload (Join-Path $Public "command_result.json") "command_result.json"|Out-Null; return "processed" }
35: try{ LogLine "tick start"; $r=CheckCommand; LogLine ("command="+$r); $rc=@(Runners).Count; if($rc -gt 4){ Quiesce|Out-Null; Telemetry "QUIESCED" ("Autopilot quiesced excessive runner count: "+$rc) "No Codex. Autopilot remains active." } elseif($r -match "none|disabled|already|expired|missing"){ Telemetry "QUIESCED" "Autopilot heartbeat. No active command. ScarFLIX remains paused safely." "ChatGPT can write command.json to GitHub, or user can type 1." }; LogLine "tick end" } catch { LogLine ("error="+$_.Exception.Message); Telemetry "ATTN_AUTOPILOT_ERROR" $_.Exception.Message "Type 1; autopilot kept telemetry alive." }
---
``

## D:\PlexTools\Scripts\scarflix_v2\SF2_TelemetryOnly.ps1
``text
32:     $h = @{ Authorization = "token [REDACTED]"; Accept = "application/vnd.github+json"; "User-Agent" = "SF2-TelemetryOnly" }
33:     $sha = ""
34:     try {
35:         $e = Invoke-RestMethod -Uri ($api + "?ref=$Branch") -Headers $h -Method Get -TimeoutSec 20 -ErrorAction Stop
36:         if($e.sha){ $sha = "" + $e.sha }
37:     } catch {}
38:     try {
39:         $b64 = [Convert]::ToBase64String([IO.File]::ReadAllBytes($local))
40:         $body = [ordered]@{ message = "SF2 telemetry only status"; content = $b64; branch = $Branch }
---
39:         $b64 = [Convert]::ToBase64String([IO.File]::ReadAllBytes($local))
40:         $body = [ordered]@{ message = "SF2 telemetry only status"; content = $b64; branch = $Branch }
41:         if($sha){ $body.sha = $sha }
42:         Invoke-RestMethod -Uri $api -Headers $h -Method Put -Body ($body | ConvertTo-Json -Depth 5) -ContentType "application/json" -TimeoutSec 30 -ErrorAction Stop | Out-Null
43:         return "OK"
44:     } catch {
45:         return ("FAIL " + $_.Exception.Message)
46:     }
47: }
---
42:         Invoke-RestMethod -Uri $api -Headers $h -Method Put -Body ($body | ConvertTo-Json -Depth 5) -ContentType "application/json" -TimeoutSec 30 -ErrorAction Stop | Out-Null
43:         return "OK"
44:     } catch {
45:         return ("FAIL " + $_.Exception.Message)
46:     }
47: }
48: function TaskState($name){
49:     try {
50:         $txt = schtasks.exe /Query /TN $name /FO LIST /V 2>&1 | Out-String
---
58: $runnerCount = 0
59: try {
60:     $runnerCount = @(Get-CimInstance Win32_Process | Where-Object {
61:         ("" + $_.CommandLine) -match "ScarFLIX_v2_PlatformGate|PlatformGate_LocalRunner|VisibleCatalogQA|PlexDecisionQA|ConcurrentQA|AutonomousController|SafeWebDavExpansion|CandidateSourceModel"
62:     }).Count
63: } catch {}
64: 
65: $generated = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
66: 
---
74:     expansion_enabled = $false
75:     runner_process_count = $runnerCount
76:     autonomous_controller = TaskState "ScarFLIX_v2_AutonomousController"
77:     platformgate_detached = TaskState "ScarFLIX_v2_PlatformGate_LocalRunner_Detached"
78:     platformgate_manual = TaskState "ScarFLIX_v2_PlatformGate_Manual_OneShot"
79:     expansion_task = TaskState "ScarFLIX_v2_SafeWebDavExpansionPipeline"
80:     telemetry_task = TaskState "SF2_TelemetryOnly"
81:     codex_used = $false
82: }
---
75:     runner_process_count = $runnerCount
76:     autonomous_controller = TaskState "ScarFLIX_v2_AutonomousController"
77:     platformgate_detached = TaskState "ScarFLIX_v2_PlatformGate_LocalRunner_Detached"
78:     platformgate_manual = TaskState "ScarFLIX_v2_PlatformGate_Manual_OneShot"
79:     expansion_task = TaskState "ScarFLIX_v2_SafeWebDavExpansionPipeline"
80:     telemetry_task = TaskState "SF2_TelemetryOnly"
81:     codex_used = $false
82: }
83: SaveText (Join-Path $Public "status_compact.json") ($status | ConvertTo-Json -Depth 6)
---
95: $ask += "Expansion enabled: False"
96: $ask += ("Runner process count: {0}" -f $runnerCount)
97: $ask += ("Autonomous controller task: {0}" -f (TaskState "ScarFLIX_v2_AutonomousController"))
98: $ask += ("PlatformGate detached task: {0}" -f (TaskState "ScarFLIX_v2_PlatformGate_LocalRunner_Detached"))
99: $ask += ("PlatformGate manual task: {0}" -f (TaskState "ScarFLIX_v2_PlatformGate_Manual_OneShot"))
100: $ask += ("Expansion task: {0}" -f (TaskState "ScarFLIX_v2_SafeWebDavExpansionPipeline"))
101: $ask += ("Telemetry-only task: {0}" -f (TaskState "SF2_TelemetryOnly"))
102: $ask += "Codex used: False"
103: SaveText (Join-Path $Public "ASK_CHATGPT_SUMMARY.md") $ask
---
96: $ask += ("Runner process count: {0}" -f $runnerCount)
97: $ask += ("Autonomous controller task: {0}" -f (TaskState "ScarFLIX_v2_AutonomousController"))
98: $ask += ("PlatformGate detached task: {0}" -f (TaskState "ScarFLIX_v2_PlatformGate_LocalRunner_Detached"))
99: $ask += ("PlatformGate manual task: {0}" -f (TaskState "ScarFLIX_v2_PlatformGate_Manual_OneShot"))
100: $ask += ("Expansion task: {0}" -f (TaskState "ScarFLIX_v2_SafeWebDavExpansionPipeline"))
101: $ask += ("Telemetry-only task: {0}" -f (TaskState "SF2_TelemetryOnly"))
102: $ask += "Codex used: False"
103: SaveText (Join-Path $Public "ASK_CHATGPT_SUMMARY.md") $ask
104: SaveText (Join-Path $Public "TELEMETRY_FOR_CHATGPT.md") $ask
---
``

## D:\PlexTools\Scripts\scarflix_v2\Wire_Jackett_Arr_Indexers.ps1
``text
62:             $json = $Body | ConvertTo-Json -Depth 50
63:             return @{
64:                 ok = $true
65:                 value = Invoke-RestMethod -Uri $uri -Method $Method -Headers $headers -Body $json -ContentType "application/json" -UseBasicParsing -TimeoutSec 60 -ErrorAction Stop
66:                 error = ""
67:             }
68:         }
69:         return @{
70:             ok = $true
---
68:         }
69:         return @{
70:             ok = $true
71:             value = Invoke-RestMethod -Uri $uri -Method $Method -Headers $headers -UseBasicParsing -TimeoutSec 60 -ErrorAction Stop
72:             error = ""
73:         }
74:     } catch {
75:         $body = ""
76:         try {
---
138:     $indexersRes = Invoke-JsonApi $Base $ApiKey "[REDACTED]" "/api/v3/indexer" $null
139:     $schemaRes = Invoke-JsonApi $Base $ApiKey "[REDACTED]" "/api/v3/indexer/schema" $null
140:     if (-not $indexersRes.ok) {
141:         Write-Step "FAIL" ("{0} indexer list failed: {1}" -f $Name, $indexersRes.error)
142:         return $false
143:     }
144:     if (-not $schemaRes.ok) {
145:         Write-Step "FAIL" ("{0} indexer schema failed: {1}" -f $Name, $schemaRes.error)
146:         return $false
---
142:         return $false
143:     }
144:     if (-not $schemaRes.ok) {
145:         Write-Step "FAIL" ("{0} indexer schema failed: {1}" -f $Name, $schemaRes.error)
146:         return $false
147:     }
148: 
149:     $displayName = "Jackett All"
150:     $existing = Find-ByName $indexersRes.value $displayName
---
150:     $existing = Find-ByName $indexersRes.value $displayName
151:     $schema = Find-TorznabSchema $schemaRes.value
152:     if ($null -eq $schema) {
153:         Write-Step "FAIL" ("{0} Torznab schema not found" -f $Name)
154:         return $false
155:     }
156: 
157:     $payload = $schema | ConvertTo-Json -Depth 100 | ConvertFrom-Json
158:     Set-ObjectValue $payload "name" $displayName
---
174:             Write-Step "OK" ("Updated {0} Jackett All indexer" -f $Name)
175:             return $true
176:         }
177:         Write-Step "REVIEW" ("Updating {0} Jackett All failed: {1}" -f $Name, $res.error)
178:         return $false
179:     }
180: 
181:     $res = Invoke-JsonApi $Base $ApiKey "[REDACTED]" "/api/v3/indexer?forceSave=true" $payload
182:     if ($res.ok) {
---
183:         Write-Step "OK" ("Created {0} Jackett All indexer" -f $Name)
184:         return $true
185:     }
186:     Write-Step "REVIEW" ("Creating {0} Jackett All failed: {1}" -f $Name, $res.error)
187:     return $false
188: }
189: 
190: Write-Step "INFO" "Wiring Jackett All into Radarr/Sonarr"
191: $script:JackettKey = Read-SecretFile $JackettKeyFile
---
192: $radarrKey = Get-ApiKey [REDACTED]
193: $sonarrKey = Get-ApiKey [REDACTED]
194: 
195: if (-not $script:JackettKey) { Write-Step "FAIL" "Jackett API key missing"; Write-Step "FINAL" "FAIL"; exit 1 }
196: if (-not $radarrKey) { Write-Step "FAIL" "Radarr API key missing"; Write-Step "FINAL" "FAIL"; exit 1 }
197: if (-not $sonarrKey) { Write-Step "FAIL" "Sonarr API key missing"; Write-Step "FINAL" "FAIL"; exit 1 }
198: 
199: $radOk = Ensure-ArrJackettIndexer -Name "Radarr" -Base $RadarrBase -ApiKey [REDACTED] -Categories @(2000,2010,2020,2030,2040,2045,2050,2060,2070,2080)
200: $sonOk = Ensure-ArrJackettIndexer -Name "Sonarr" -Base $SonarrBase -ApiKey [REDACTED] -Categories @(5000,5010,5020,5030,5040,5045,5050,5070,5080)
---
193: $sonarrKey = Get-ApiKey [REDACTED]
194: 
195: if (-not $script:JackettKey) { Write-Step "FAIL" "Jackett API key missing"; Write-Step "FINAL" "FAIL"; exit 1 }
196: if (-not $radarrKey) { Write-Step "FAIL" "Radarr API key missing"; Write-Step "FINAL" "FAIL"; exit 1 }
197: if (-not $sonarrKey) { Write-Step "FAIL" "Sonarr API key missing"; Write-Step "FINAL" "FAIL"; exit 1 }
198: 
199: $radOk = Ensure-ArrJackettIndexer -Name "Radarr" -Base $RadarrBase -ApiKey [REDACTED] -Categories @(2000,2010,2020,2030,2040,2045,2050,2060,2070,2080)
200: $sonOk = Ensure-ArrJackettIndexer -Name "Sonarr" -Base $SonarrBase -ApiKey [REDACTED] -Categories @(5000,5010,5020,5030,5040,5045,5050,5070,5080)
201: 
---
194: 
195: if (-not $script:JackettKey) { Write-Step "FAIL" "Jackett API key missing"; Write-Step "FINAL" "FAIL"; exit 1 }
196: if (-not $radarrKey) { Write-Step "FAIL" "Radarr API key missing"; Write-Step "FINAL" "FAIL"; exit 1 }
197: if (-not $sonarrKey) { Write-Step "FAIL" "Sonarr API key missing"; Write-Step "FINAL" "FAIL"; exit 1 }
198: 
199: $radOk = Ensure-ArrJackettIndexer -Name "Radarr" -Base $RadarrBase -ApiKey [REDACTED] -Categories @(2000,2010,2020,2030,2040,2045,2050,2060,2070,2080)
200: $sonOk = Ensure-ArrJackettIndexer -Name "Sonarr" -Base $SonarrBase -ApiKey [REDACTED] -Categories @(5000,5010,5020,5030,5040,5045,5050,5070,5080)
201: 
202: $duration = [int]((Get-Date) - $Started).TotalSeconds
---
205:     Write-Step "FINAL" "PASS"
206:     exit 0
207: }
208: Write-Step "FINAL" "REVIEW"
209: exit 2
---
``

## D:\PlexTools\Scripts\scarflix_v2\Wire_Prowlarr_Arr_Indexers.ps1
``text
54:         try {
55:             Copy-Item -LiteralPath $Path -Destination (Join-Path $BackupRoot (Split-Path -Leaf $Path)) -Force
56:         } catch {
57:             Write-Step "REVIEW" ("Backup copy failed for {0}: {1}" -f $Path, $_.Exception.Message)
58:         }
59:     }
60: }
61: 
62: function Redact {
---
160:     )
161:     $schema = Find-FirstByImplementation $script:ApplicationSchemas $Implementation
162:     if ($null -eq $schema) {
163:         Write-Step "FAIL" ("Application schema not found: {0}" -f $Implementation)
164:         return $false
165:     }
166: 
167:     $payload = $schema | ConvertTo-Json -Depth 100 | ConvertFrom-Json
168:     Set-ObjectValue $payload "name" $Name
---
180:             Write-Step "OK" ("Updated Prowlarr application: {0}" -f $Name)
181:             return $true
182:         }
183:         Write-Step "FAIL" ("Updating Prowlarr application failed for {0}: {1}" -f $Name, $res.error)
184:         return $false
185:     }
186: 
187:     $res = Invoke-JsonApi $script:ProwlarrBase $script:ProwlarrKey "POST" "/api/v1/applications" $payload
188:     if ($res.ok) {
---
189:         Write-Step "OK" ("Created Prowlarr application: {0}" -f $Name)
190:         return $true
191:     }
192:     Write-Step "FAIL" ("Creating Prowlarr application failed for {0}: {1}" -f $Name, $res.error)
193:     return $false
194: }
195: 
196: function Ensure-ProwlarrIndexer {
197:     param([string]$IndexerName)
---
197:     param([string]$IndexerName)
198:     $schema = Find-FirstByName $script:IndexerSchemas $IndexerName
199:     if ($null -eq $schema) {
200:         Write-Step "FAIL" ("Indexer schema not found: {0}" -f $IndexerName)
201:         return $false
202:     }
203: 
204:     $payload = $schema | ConvertTo-Json -Depth 100 | ConvertFrom-Json
205:     Set-ObjectValue $payload "name" $IndexerName
---
218:             Write-Step "OK" ("Updated Prowlarr indexer: {0}" -f $IndexerName)
219:             return $true
220:         }
221:         Write-Step "REVIEW" ("Updating Prowlarr indexer failed for {0}: {1}" -f $IndexerName, $res.error)
222:         return $false
223:     }
224: 
225:     $res = Invoke-JsonApi $script:ProwlarrBase $script:ProwlarrKey "POST" "/api/v1/indexer" $payload
226:     if ($res.ok) {
---
227:         Write-Step "OK" ("Created Prowlarr indexer: {0}" -f $IndexerName)
228:         return $true
229:     }
230:     Write-Step "REVIEW" ("Creating Prowlarr indexer failed for {0}: {1}" -f $IndexerName, $res.error)
231:     return $false
232: }
233: 
234: function Try-Command {
235:     param([string]$Name)
---
247:     param([string]$Name, [string]$Base, [string]$Key)
248:     $res = Invoke-JsonApi $Base $Key "GET" "/api/v3/indexer" $null
249:     if (-not $res.ok) {
250:         Write-Step "REVIEW" ("{0} indexer read failed: {1}" -f $Name, $res.error)
251:         return 0
252:     }
253:     $count = 0
254:     foreach ($item in $res.value) { $count = $count + 1 }
255:     Write-Step "INFO" ("{0} indexers visible: {1}" -f $Name, $count)
---
279: $script:RadarrKey = Get-ApiKey [REDACTED]
280: $script:SonarrKey = Get-ApiKey [REDACTED]
281: 
282: if (-not $script:ProwlarrKey) { Write-Step "FAIL" "Missing Prowlarr API key."; Write-Step "FINAL" "FAIL"; exit 1 }
283: if (-not $script:RadarrKey) { Write-Step "FAIL" "Missing Radarr API key."; Write-Step "FINAL" "FAIL"; exit 1 }
284: if (-not $script:SonarrKey) { Write-Step "FAIL" "Missing Sonarr API key."; Write-Step "FINAL" "FAIL"; exit 1 }
285: Write-Step "OK" "API keys detected locally."
286: 
287: $proStatus = Invoke-JsonApi $ProwlarrBase $script:ProwlarrKey "GET" "/api/v1/system/status" $null
---
280: $script:SonarrKey = Get-ApiKey [REDACTED]
281: 
282: if (-not $script:ProwlarrKey) { Write-Step "FAIL" "Missing Prowlarr API key."; Write-Step "FINAL" "FAIL"; exit 1 }
283: if (-not $script:RadarrKey) { Write-Step "FAIL" "Missing Radarr API key."; Write-Step "FINAL" "FAIL"; exit 1 }
284: if (-not $script:SonarrKey) { Write-Step "FAIL" "Missing Sonarr API key."; Write-Step "FINAL" "FAIL"; exit 1 }
285: Write-Step "OK" "API keys detected locally."
286: 
287: $proStatus = Invoke-JsonApi $ProwlarrBase $script:ProwlarrKey "GET" "/api/v1/system/status" $null
288: $radStatus = Invoke-JsonApi $RadarrBase $script:RadarrKey "GET" "/api/v3/system/status" $null
---
281: 
282: if (-not $script:ProwlarrKey) { Write-Step "FAIL" "Missing Prowlarr API key."; Write-Step "FINAL" "FAIL"; exit 1 }
283: if (-not $script:RadarrKey) { Write-Step "FAIL" "Missing Radarr API key."; Write-Step "FINAL" "FAIL"; exit 1 }
284: if (-not $script:SonarrKey) { Write-Step "FAIL" "Missing Sonarr API key."; Write-Step "FINAL" "FAIL"; exit 1 }
285: Write-Step "OK" "API keys detected locally."
286: 
287: $proStatus = Invoke-JsonApi $ProwlarrBase $script:ProwlarrKey "GET" "/api/v1/system/status" $null
288: $radStatus = Invoke-JsonApi $RadarrBase $script:RadarrKey "GET" "/api/v3/system/status" $null
289: $sonStatus = Invoke-JsonApi $SonarrBase $script:SonarrKey "GET" "/api/v3/system/status" $null
---
287: $proStatus = Invoke-JsonApi $ProwlarrBase $script:ProwlarrKey "GET" "/api/v1/system/status" $null
288: $radStatus = Invoke-JsonApi $RadarrBase $script:RadarrKey "GET" "/api/v3/system/status" $null
289: $sonStatus = Invoke-JsonApi $SonarrBase $script:SonarrKey "GET" "/api/v3/system/status" $null
290: if ($proStatus.ok) { Write-Step "OK" ("Prowlarr version: {0}" -f $proStatus.value.version) } else { Write-Step "FAIL" ("Prowlarr API failed: {0}" -f $proStatus.error); Write-Step "FINAL" "FAIL"; exit 1 }
291: if ($radStatus.ok) { Write-Step "OK" ("Radarr version: {0}" -f $radStatus.value.version) } else { Write-Step "FAIL" ("Radarr API failed: {0}" -f $radStatus.error); Write-Step "FINAL" "FAIL"; exit 1 }
292: if ($sonStatus.ok) { Write-Step "OK" ("Sonarr version: {0}" -f $sonStatus.value.version) } else { Write-Step "FAIL" ("Sonarr API failed: {0}" -f $sonStatus.error); Write-Step "FINAL" "FAIL"; exit 1 }
293: 
294: $appsRes = Invoke-JsonApi $ProwlarrBase $script:ProwlarrKey "GET" "/api/v1/applications" $null
295: $appSchemasRes = Invoke-JsonApi $ProwlarrBase $script:ProwlarrKey "GET" "/api/v1/applications/schema" $null
---
288: $radStatus = Invoke-JsonApi $RadarrBase $script:RadarrKey "GET" "/api/v3/system/status" $null
289: $sonStatus = Invoke-JsonApi $SonarrBase $script:SonarrKey "GET" "/api/v3/system/status" $null
290: if ($proStatus.ok) { Write-Step "OK" ("Prowlarr version: {0}" -f $proStatus.value.version) } else { Write-Step "FAIL" ("Prowlarr API failed: {0}" -f $proStatus.error); Write-Step "FINAL" "FAIL"; exit 1 }
291: if ($radStatus.ok) { Write-Step "OK" ("Radarr version: {0}" -f $radStatus.value.version) } else { Write-Step "FAIL" ("Radarr API failed: {0}" -f $radStatus.error); Write-Step "FINAL" "FAIL"; exit 1 }
292: if ($sonStatus.ok) { Write-Step "OK" ("Sonarr version: {0}" -f $sonStatus.value.version) } else { Write-Step "FAIL" ("Sonarr API failed: {0}" -f $sonStatus.error); Write-Step "FINAL" "FAIL"; exit 1 }
293: 
294: $appsRes = Invoke-JsonApi $ProwlarrBase $script:ProwlarrKey "GET" "/api/v1/applications" $null
295: $appSchemasRes = Invoke-JsonApi $ProwlarrBase $script:ProwlarrKey "GET" "/api/v1/applications/schema" $null
296: $indexersRes = Invoke-JsonApi $ProwlarrBase $script:ProwlarrKey "GET" "/api/v1/indexer" $null
---
289: $sonStatus = Invoke-JsonApi $SonarrBase $script:SonarrKey "GET" "/api/v3/system/status" $null
290: if ($proStatus.ok) { Write-Step "OK" ("Prowlarr version: {0}" -f $proStatus.value.version) } else { Write-Step "FAIL" ("Prowlarr API failed: {0}" -f $proStatus.error); Write-Step "FINAL" "FAIL"; exit 1 }
291: if ($radStatus.ok) { Write-Step "OK" ("Radarr version: {0}" -f $radStatus.value.version) } else { Write-Step "FAIL" ("Radarr API failed: {0}" -f $radStatus.error); Write-Step "FINAL" "FAIL"; exit 1 }
292: if ($sonStatus.ok) { Write-Step "OK" ("Sonarr version: {0}" -f $sonStatus.value.version) } else { Write-Step "FAIL" ("Sonarr API failed: {0}" -f $sonStatus.error); Write-Step "FINAL" "FAIL"; exit 1 }
293: 
294: $appsRes = Invoke-JsonApi $ProwlarrBase $script:ProwlarrKey "GET" "/api/v1/applications" $null
295: $appSchemasRes = Invoke-JsonApi $ProwlarrBase $script:ProwlarrKey "GET" "/api/v1/applications/schema" $null
296: $indexersRes = Invoke-JsonApi $ProwlarrBase $script:ProwlarrKey "GET" "/api/v1/indexer" $null
297: $indexerSchemasRes = Invoke-JsonApi $ProwlarrBase $script:ProwlarrKey "GET" "/api/v1/indexer/schema" $null
---
295: $appSchemasRes = Invoke-JsonApi $ProwlarrBase $script:ProwlarrKey "GET" "/api/v1/applications/schema" $null
296: $indexersRes = Invoke-JsonApi $ProwlarrBase $script:ProwlarrKey "GET" "/api/v1/indexer" $null
297: $indexerSchemasRes = Invoke-JsonApi $ProwlarrBase $script:ProwlarrKey "GET" "/api/v1/indexer/schema" $null
298: if (-not $appsRes.ok) { Write-Step "FAIL" ("Could not read Prowlarr applications: {0}" -f $appsRes.error); Write-Step "FINAL" "FAIL"; exit 1 }
299: if (-not $appSchemasRes.ok) { Write-Step "FAIL" ("Could not read Prowlarr application schema: {0}" -f $appSchemasRes.error); Write-Step "FINAL" "FAIL"; exit 1 }
300: if (-not $indexersRes.ok) { Write-Step "FAIL" ("Could not read Prowlarr indexers: {0}" -f $indexersRes.error); Write-Step "FINAL" "FAIL"; exit 1 }
301: if (-not $indexerSchemasRes.ok) { Write-Step "FAIL" ("Could not read Prowlarr indexer schema: {0}" -f $indexerSchemasRes.error); Write-Step "FINAL" "FAIL"; exit 1 }
302: 
303: $script:ExistingApplications = $appsRes.value
---
296: $indexersRes = Invoke-JsonApi $ProwlarrBase $script:ProwlarrKey "GET" "/api/v1/indexer" $null
297: $indexerSchemasRes = Invoke-JsonApi $ProwlarrBase $script:ProwlarrKey "GET" "/api/v1/indexer/schema" $null
298: if (-not $appsRes.ok) { Write-Step "FAIL" ("Could not read Prowlarr applications: {0}" -f $appsRes.error); Write-Step "FINAL" "FAIL"; exit 1 }
299: if (-not $appSchemasRes.ok) { Write-Step "FAIL" ("Could not read Prowlarr application schema: {0}" -f $appSchemasRes.error); Write-Step "FINAL" "FAIL"; exit 1 }
300: if (-not $indexersRes.ok) { Write-Step "FAIL" ("Could not read Prowlarr indexers: {0}" -f $indexersRes.error); Write-Step "FINAL" "FAIL"; exit 1 }
301: if (-not $indexerSchemasRes.ok) { Write-Step "FAIL" ("Could not read Prowlarr indexer schema: {0}" -f $indexerSchemasRes.error); Write-Step "FINAL" "FAIL"; exit 1 }
302: 
303: $script:ExistingApplications = $appsRes.value
304: $script:ApplicationSchemas = $appSchemasRes.value
---
297: $indexerSchemasRes = Invoke-JsonApi $ProwlarrBase $script:ProwlarrKey "GET" "/api/v1/indexer/schema" $null
298: if (-not $appsRes.ok) { Write-Step "FAIL" ("Could not read Prowlarr applications: {0}" -f $appsRes.error); Write-Step "FINAL" "FAIL"; exit 1 }
299: if (-not $appSchemasRes.ok) { Write-Step "FAIL" ("Could not read Prowlarr application schema: {0}" -f $appSchemasRes.error); Write-Step "FINAL" "FAIL"; exit 1 }
300: if (-not $indexersRes.ok) { Write-Step "FAIL" ("Could not read Prowlarr indexers: {0}" -f $indexersRes.error); Write-Step "FINAL" "FAIL"; exit 1 }
301: if (-not $indexerSchemasRes.ok) { Write-Step "FAIL" ("Could not read Prowlarr indexer schema: {0}" -f $indexerSchemasRes.error); Write-Step "FINAL" "FAIL"; exit 1 }
302: 
303: $script:ExistingApplications = $appsRes.value
304: $script:ApplicationSchemas = $appSchemasRes.value
305: $script:ExistingIndexers = $indexersRes.value
---
298: if (-not $appsRes.ok) { Write-Step "FAIL" ("Could not read Prowlarr applications: {0}" -f $appsRes.error); Write-Step "FINAL" "FAIL"; exit 1 }
299: if (-not $appSchemasRes.ok) { Write-Step "FAIL" ("Could not read Prowlarr application schema: {0}" -f $appSchemasRes.error); Write-Step "FINAL" "FAIL"; exit 1 }
300: if (-not $indexersRes.ok) { Write-Step "FAIL" ("Could not read Prowlarr indexers: {0}" -f $indexersRes.error); Write-Step "FINAL" "FAIL"; exit 1 }
301: if (-not $indexerSchemasRes.ok) { Write-Step "FAIL" ("Could not read Prowlarr indexer schema: {0}" -f $indexerSchemasRes.error); Write-Step "FINAL" "FAIL"; exit 1 }
302: 
303: $script:ExistingApplications = $appsRes.value
304: $script:ApplicationSchemas = $appSchemasRes.value
305: $script:ExistingIndexers = $indexersRes.value
306: $script:IndexerSchemas = $indexerSchemasRes.value
---
``
