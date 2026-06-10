# Plex Metadata Reconciliation Plan - 8 Path Sample

- Created UTC: 2026-06-10T07:53:14Z
- Created local: 2026-06-10 17:53 Australia/Sydney
- Status: REVIEW_READY_FOR_GROK_PEER_REVIEW
- Incident: INC-MQA-HYBRID-MOVIES-LIVE-TIMEOUT-20260610
- Scope: QA-only planning for the same 8 Movies section 5 / hybrid_movies_live materialized sample.
- Execution state: NOT EXECUTED
- Review gate: Grok peer review is required before any reconciliation action is run.

## Current Evidence

- Materialized QA remains REVIEW: checked 229, passed 119, failed 110.
- Timeout cluster: 106 timeout-class failures, heavily concentrated in Movies section 5 / hybrid_movies_live.
- Timing probe on the same 8-path sample:
  - Service context inaccessible: 8/8.
  - User context OK: 8/8.
  - WebDAV HEAD 2xx: 7/8.
  - WebDAV timeouts: 0/8.
  - Plex metadata 2xx: 8/8.
  - Plex metadata timeouts: 0/8.
  - Plex metadata matching expected ScarFLIX_part-* paths: 0/8.
- Same-sample Plex metadata vs webdav_map.json comparison:
  - Expected ScarFLIX_part-* matches: 0/8.
  - Same-section Plex rows: 0/8.
  - Strict title/year-filtered other-section matches: 0/8.
  - Not found / not indexed by Plex metadata search: 8/8.

## Sample Locked For This Plan

| # | Title | Folder | Section | Expected Part | Current Comparison |
|---|-------|--------|---------|---------------|--------------------|
| 1 | 9 1/2 Weeks | Nine 1 2 Weeks (1986) | 5 | ScarFLIX_part-2248c141861c0a2c | plex_title_not_found_or_not_indexed |
| 2 | Annabelle | Annabelle (2014) | 5 | ScarFLIX_part-c08b683f68e4e49e | plex_title_not_found_or_not_indexed |
| 3 | Anna | Anna (2019) | 5 | ScarFLIX_part-81107989d2e30cfb | plex_title_not_found_or_not_indexed |
| 4 | Annihilation | Annihilation (2018) | 5 | ScarFLIX_part-d8b22fb3f498688e | plex_title_not_found_or_not_indexed |
| 5 | Armageddon | Armageddon (1998) | 5 | ScarFLIX_part-2eaab8df357724dc | plex_title_not_found_or_not_indexed |
| 6 | Battleship | Battleship (2012) | 5 | ScarFLIX_part-8aa2235ef7c1e0f6 | plex_title_not_found_or_not_indexed |
| 7 | Crank | Crank (2006) | 5 | ScarFLIX_part-bd37929b54c7c1bf | plex_title_not_found_or_not_indexed |
| 8 | Creed | Creed (2015) | 5 | ScarFLIX_part-8312e4b6385fd16c | plex_title_not_found_or_not_indexed |

## Working Hypothesis

The dominant issue is Plex metadata/indexing/cache visibility for the materialized hybrid_movies_live sample. The materialized target files exist from user context, WebDAV is responsive on the sample, and Plex metadata endpoints are responsive, but Plex does not currently surface strict title/year metadata rows or expected ScarFLIX_part-* paths for the sample.

Service-context path visibility remains a separate structural constraint: the Orchestrator service must remain metadata-first and must not follow user-session rclone symlinks by default.

## Read-Only Root-Cause Confirmation Steps

These steps are safe to run before any mitigation, but this plan does not execute them.

1. Re-read the locked comparison artifact.
   - File: D:\PlexTools\public\latest\scarflix_v2\plex_metadata_vs_webdav_map_comparison_results.json
   - Confirm status remains PASS_SAME_SAMPLE_METADATA_COMPARISON_COMPLETE.
   - Confirm 0/8 expected ScarFLIX_part-* matches and 8/8 not-found/not-indexed classifications.

2. Re-read the locked timing artifact.
   - File: D:\PlexTools\public\latest\scarflix_v2\materialized_qa_timing_probe_results.json
   - Confirm user-context OK remains 8/8 and WebDAV/Plex metadata calls have no timeout regression.

3. Confirm section 5 library location visibility from Plex metadata only.
   - Method: call Plex library sections API and inspect section 5 locations.
   - Future command, review required before execution:

```powershell
$PlexBase = 'http://192.168.1.184:32400'
$PlexToken = '<secure token loader; do not print>'
Invoke-WebRequest -UseBasicParsing -Method Get -Uri "$PlexBase/library/sections/5?X-Plex-Token=$PlexToken" -TimeoutSec 15
```

4. Confirm title search still does not surface the sample in section 5.
   - Method: repeat the existing Orchestrator job run_plex_metadata_vs_webdav_map_comparison.
   - Constraint: same 8 paths, concurrency 1, status-only.
   - Future method, review required before execution:

```text
Queue Orchestrator job type: run_plex_metadata_vs_webdav_map_comparison
Payload: same locked 8-path sample, read_only=true, max_concurrency=1
```

5. Check Plex scanner/index logs for the sample title names and ScarFLIX_part hashes.
   - Method: read-only log search only, no service restart, no cleanup.
   - Future command, review required before execution:

```powershell
$LogRoot = "$env:LOCALAPPDATA\Plex Media Server\Logs"
Select-String -Path (Join-Path $LogRoot 'Plex Media Scanner*.log') -Pattern 'ScarFLIX_part-2248c141861c0a2c','Annabelle (2014)','Anna (2019)','Annihilation (2018)','Armageddon (1998)','Battleship (2012)','Crank (2006)','Creed (2015)' -SimpleMatch
```

## Proposed QA-Only Reconciliation Actions

No action in this section may be executed until Grok peer review approves the plan.

### Action A - Path-Scoped Section 5 Refresh

Preferred first action if Plex accepts a path-scoped refresh.

Purpose: ask Plex to rescan only the ScarFLIX live Movies folder family that contains the 8-path sample.

Future command, review required before execution:

```powershell
$PlexBase = 'http://192.168.1.184:32400'
$PlexToken = '<secure token loader; do not print>'
$RefreshPath = 'D:\StremioCatalog\_Hybrid\Movies\_ScarFLIXLive\06 Discover Movies'
$EncodedPath = [System.Uri]::EscapeDataString($RefreshPath)
Invoke-WebRequest -UseBasicParsing -Method Get -Uri "$PlexBase/library/sections/5/refresh?path=$EncodedPath&X-Plex-Token=$PlexToken" -TimeoutSec 15
```

Expected result:

- Plex accepts the refresh request.
- No files are changed.
- No publication state changes.
- After a settle window of 5-10 minutes, the same comparison is rerun and expected ScarFLIX_part-* matches improve.

Blast radius:

- Intended to be limited to one Movies subfolder path.
- If Plex ignores the path parameter and scans all of section 5, stop further actions and record that observed behavior.

Rollback:

- No filesystem rollback is available or needed because no content changes are made.
- If unexpected metadata churn appears, stop and escalate; do not run cleanup, empty trash, optimize database, or broad refresh loops.

### Action B - Targeted Section 5 Refresh

Fallback only if Action A is unsupported or inconclusive.

Purpose: ask Plex to rescan Movies section 5 once.

Future command, review required before execution:

```powershell
$PlexBase = 'http://192.168.1.184:32400'
$PlexToken = '<secure token loader; do not print>'
Invoke-WebRequest -UseBasicParsing -Method Get -Uri "$PlexBase/library/sections/5/refresh?X-Plex-Token=$PlexToken" -TimeoutSec 15
```

Expected result:

- Section 5 refresh begins.
- After a settle window of 10-15 minutes, rerun only the same-sample metadata comparison.

Blast radius:

- Section 5 only.
- Higher load than Action A, but still QA-only and non-destructive.

Rollback:

- Stop after one request.
- Do not chain repeated refreshes.
- Do not empty trash, clean bundles, optimize database, clear cache, or delete metadata.

### Action C - Rating-Key Metadata Refresh

Hold action. Only eligible if a future read-only comparison finds strict title/year Plex rows with rating keys but stale or missing media part paths.

Future command template, review required before execution:

```powershell
$PlexBase = 'http://192.168.1.184:32400'
$PlexToken = '<secure token loader; do not print>'
$RatingKey = '<rating key from strict title/year metadata match>'
Invoke-WebRequest -UseBasicParsing -Method Get -Uri "$PlexBase/library/metadata/$RatingKey/refresh?X-Plex-Token=$PlexToken" -TimeoutSec 15
```

Current eligibility:

- Not eligible yet because the comparison found strict rows 0/8.

### Action D - Post-Refresh Same-Sample Verification

Purpose: verify only whether Plex metadata now sees the sample.

Future method, review required before execution:

```text
Queue Orchestrator job type: run_plex_metadata_vs_webdav_map_comparison
Payload: same locked 8-path sample, read_only=true, max_concurrency=1
```

Success threshold:

- Minimum 6/8 strict expected ScarFLIX_part-* metadata matches.
- 0 wrong-title strict matches.
- 0 same-section stale HTTP/direct resolver part rows.
- No change to PAUSE_PUBLICATION.

## Forbidden Actions

These are explicitly out of scope for this plan:

- Publication or expansion.
- Broad Materialized QA retry.
- PlatformGate, VisibleCatalogQA, PlexDecisionQA, ConcurrentQA, AutoGate, or full catalogue checks inline.
- File deletion, cleanup, source mutation, source quarantine, path rewrite, symlink rewrite, or moving files.
- Emptying Plex trash.
- Cleaning Plex bundles.
- Optimizing or repairing the Plex database.
- Clearing Plex metadata caches.
- Repeated scan loops.
- System-level rclone mount changes or service account changes.

## Success Criteria

The plan is successful only if a reviewed and approved execution later produces:

- PAUSE_PUBLICATION remains true throughout.
- Sentinel remains PASS/LOW or REVIEW/MEDIUM; no ALERT/HIGH.
- Process launch health remains below degraded threshold.
- Same-sample comparison improves from 0/8 to at least 6/8 strict expected ScarFLIX_part-* matches.
- No wrong-title metadata match is introduced.
- No legacy/direct resolver row becomes newly visible.
- No publication, expansion, cleanup, deletion, path rewrite, or source mutation occurs.

## Stop Conditions

Stop and escalate if any of the following occur:

- Sentinel becomes ALERT/HIGH.
- Process launch health degrades.
- Plex refresh API returns unexpected authentication/permission failures.
- Path-scoped refresh appears to trigger broad unexpected scan churn.
- Any metadata result suggests wrong-title matching or legacy direct resolver reappearance.
- Any proposed next step would require destructive cleanup, database/cache mutation, source quarantine, path rewrite, or publication.

## Review Request For Grok

Please review whether the proposed sequence is safe and technically coherent:

1. Read-only confirmation.
2. One path-scoped section 5 refresh if supported.
3. One section 5 refresh only if path-scoped refresh is unsupported or inconclusive.
4. Same-sample comparison rerun.
5. Escalate before any broader mitigation.

No execution should occur until Grok approves or revises this plan.

