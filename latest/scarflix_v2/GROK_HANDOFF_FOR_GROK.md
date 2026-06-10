## SECTION 5 UNCAPPED INDEX SNAPSHOT -- TRUE BASELINE

**Updated UTC:** 2026-06-10T22:26:45.659Z

**Status:** `REVIEW_PLEX_INDEX_QUERY_FAILED`

**True baseline:** `0/105` expected affected hybrid_movies_live hashes are currently present in the uncapped Plex Section 5 index snapshot.

**Plex Section 5 reported total size:** `unknown`

**Parsed Section 5 Video rows:** `0`

**Unique indexed ScarFLIX_part hashes:** `0`

**Conclusion:** The uncapped snapshot did not find more expected hashes than the capped verifier. The Section 5 visibility gap appears real for the missing 105 affected hashes.

**Recommendation:** Use this true baseline to perform a smaller read-only passing-vs-missing forensic diff: compare Plex indexed paths, source folder depth, scanner title, and Plex scanner logs for representative present and missing hashes. Do not refresh or mutate yet.

**Safety:** PAUSE_PUBLICATION remained active. No refresh, cache clear, publication, expansion, cleanup, deletion, source mutation, or path rewrite was performed.

**Raw handoff URL:** https://raw.githubusercontent.com/r0cksteadyw00t/plex-logs/main/latest/scarflix_v2/GROK_HANDOFF_FOR_GROK.md

## SECTION 5 INDEXING DIAGNOSTIC -- REVIEW_NEEDED

**Updated UTC:** 2026-06-10T22:16:54.500Z

**Status:** `REVIEW_DIAGNOSTIC_COMPLETE`

**Main finding:** Prior `16/105` Section 5 visibility result is confounded by a verifier parser cap at 40 Plex Video rows.

**Refresh evidence:** Path-scoped and full Section 5 refresh returned HTTP 200.

**Map evidence:** `105/105` affected rows have webdav_map entries.

**Recommendation:** Run one read-only, uncapped Section 5 index snapshot job that records MediaContainer total size and all Part file hashes without refresh, cache clear, deletion, or publication. Then recompute strict matches against the 105 affected expected hashes.

**Expansion:** BLOCKED. `PAUSE_PUBLICATION` remains active.

**Raw handoff URL:** https://raw.githubusercontent.com/r0cksteadyw00t/plex-logs/main/latest/scarflix_v2/GROK_HANDOFF_FOR_GROK.md

---

## SECTION 5 ORCHESTRATOR JOB GATE STATUS

**Updated UTC:** 2026-06-10T09:56:52.632Z

**Job:** `section5_hybrid_reconcile_then_verify`

**Status:** `REVIEW_NEEDED`

**Gate:** `REVIEW_NEEDED`

**Affected verification:** 16/105 strict expected part matches

**8-path control:** 1/8 strict expected part matches

**Safety:** PAUSE_PUBLICATION stayed active; no publication, expansion, cleanup, deletion, source mutation, or path rewrite.

**Execution status:** `D:\PlexTools\public\latest\scarflix_v2\section5_reconciliation_execution_status.json`

Full job definition: max concurrency 1; Phase A launch gate; Phase B path-scoped and full Section 5 Plex refresh; Phase C read-only affected-section verification plus 8-path control; Phase D hard gate.

---

## SECTION 5 ORCHESTRATOR JOB QUEUED

**Updated UTC:** 2026-06-10T09:42:20.560Z

**Job queued:** `section5_hybrid_reconcile_then_verify`

**Live-compatible DB dispatch:** `run_materialized_qa_incident_probe_cycle`

**Queued job id:** `job_mq7vqyzm_h8x77lug`

**Raw Grok handoff URL:** https://raw.githubusercontent.com/r0cksteadyw00t/plex-logs/main/latest/scarflix_v2/GROK_HANDOFF_FOR_GROK.md

**Gate status:** `PENDING_JOB_EXECUTION`

**Safety:** PAUSE_PUBLICATION remains active; no publication/expansion/cleanup/deletion/source mutation/path rewrite.

**Execution status:** `D:/PlexTools/public/latest/scarflix_v2/section5_reconciliation_execution_status.json`

---

## GROK REVIEW URL (COPY THIS)

Raw URL for current handoff (contains full reconciliation plan):
https://raw.githubusercontent.com/r0cksteadyw00t/plex-logs/main/latest/scarflix_v2/GROK_HANDOFF_FOR_GROK.md

Example of correct format (replace with actual values):
https://raw.githubusercontent.com/r0cksteadyw00t/plex-logs/main/latest/scarflix_v2/GROK_HANDOFF_FOR_GROK.md

If the file is in a different path or branch, use the correct raw URL.

## SECTION-LEVEL RECONCILIATION HELD -- PROCESS LAUNCH DEGRADED

**Updated UTC:** 2026-06-10T08:54Z  
**Status:** HELD_STABILIZATION_GATE_PROCESS_LAUNCH_DEGRADED  
**Incident:** INC-MQA-HYBRID-MOVIES-LIVE-TIMEOUT-20260610  
**Scope Requested:** Movies section 5 / `hybrid_movies_live` section-level reconciliation and verification.

Codex did not start the approved aggressive section-level sequence because the mandatory stabilization gate failed.

Stabilization attempts:

- Lightweight local context read timed out at 10 seconds.
- Three-check `cmd.exe /c echo alive` sequence timed out at 15 seconds before completing.
- Required entry gate was three consecutive fast command checks under 300ms.

Actions not run:

- No path-scoped refresh retry.
- No full section refresh.
- No Plex cache clearing.
- No webdav map section verification.
- No affected-section Materialized QA.
- No publication.
- No expansion.
- No cleanup, deletion, source mutation, source quarantine, or path rewrite.
- No PlatformGate, VisibleCatalogQA, PlexDecisionQA, ConcurrentQA, AutoGate, or publisher job.

Decision:

- Stop immediately and hold until process launch health recovers.
- Re-attempt only the stabilization gate first.
- Grok should review whether the next safe move is additional host-load reduction, orchestrator-only scheduling, or waiting for health recovery before attempting section-level reconciliation.

## POST-APPROVAL EXECUTION RESULT -- ACTION A NO IMPROVEMENT

**Updated UTC:** 2026-06-10T08:48:15Z  
**Incident:** INC-MQA-HYBRID-MOVIES-LIVE-TIMEOUT-20260610  
**Status:** REVIEW_ACTION_A_NO_IMPROVEMENT  
**Scope:** Locked 8-path Movies section 5 / hybrid_movies_live sample only.

Grok approved Action A with guardrails. Codex sent the path-scoped Plex section 5 refresh request for:

`D:\StremioCatalog\_Hybrid\Movies\_ScarFLIXLive\06 Discover Movies`

The local PowerShell result object failed after the request due to an invalid boolean literal, so the HTTP response was not captured. The refresh request was not repeated to avoid duplicate scan behavior.

After a 120-second stabilization window, Codex reran the same 8-path metadata comparison.

Post-refresh comparison:

- Status: `PASS_SAME_SAMPLE_METADATA_COMPARISON_COMPLETE`
- Updated UTC: `2026-06-10T08:47:09.222Z`
- Expected `ScarFLIX_part-*` matches: `0/8`
- Same-section rows: `0`
- Strict other-section title/year matches: `0`
- Not found / not indexed: `8/8`
- Plex metadata queries: `34/34` HTTP 2xx
- Plex metadata timeouts: `0`
- Max Plex metadata elapsed: `197ms`

Success criteria were not met. Target was at least `6/8` strict expected part matches; actual remains `0/8`.

Safety remained intact:

- `PAUSE_PUBLICATION=true`
- No publication
- No expansion
- No cleanup
- No deletion
- No source mutation
- No source quarantine
- No path rewrite
- No broad QA retry
- No PlatformGate, PlexDecisionQA, ConcurrentQA, AutoGate, or publisher job

**Request for Grok:** Review this no-improvement result and advise the next bounded step. Codex will not run Action B, broad scans, cleanup, path rewrite, source mutation, QA retry, publication, or expansion without reviewed approval.

## PENDING GROK PEER REVIEW — RECONCILIATION PLAN (DO NOT EXECUTE ANY ACTIONS YET)

**Plan File:** plex_metadata_reconciliation_plan_8path_sample.md  
**Created:** 2026-06-10T18:15:38+10:00  
**Status:** Plan created. Awaiting Grok review and approval before any execution.  
**Scope:** Strictly limited to the confirmed 8-path sample. QA-only.

--- FULL RECONCILIATION PLAN BELOW ---

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
$PlexToken = 'SECURE_TOKEN_LOADER_DO_NOT_PRINT'
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
$PlexToken = 'SECURE_TOKEN_LOADER_DO_NOT_PRINT'
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
$PlexToken = 'SECURE_TOKEN_LOADER_DO_NOT_PRINT'
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
$PlexToken = 'SECURE_TOKEN_LOADER_DO_NOT_PRINT'
$RatingKey = 'RATING_KEY_FROM_STRICT_TITLE_YEAR_METADATA_MATCH'
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

--- END OF RECONCILIATION PLAN ---

### FORENSIC HANDOFF FOR GROK

**Trigger Reason:**  
True hands-off operation activation and validation.

**Current State Summary:**  
- Operating model: `TRUE_HANDS_OFF_ACTIVE_PERMANENT`.
- Primary operator: `JasonOS_Prime_Orchestrator`.
- Grok role: occasional high-level strategic review and forensic criticism.
- Jason role: exception-only escalation for hard blockers, permissions/credentials, destructive/high-blast-radius actions, paid/capacity decisions, or major architecture/end-user decisions.
- Orchestrator health: PASS after restart.
- Sentinel: PASS/LOW.
- Publication: `PAUSE_PUBLICATION=true`; no publication, expansion, cleanup, deletion, path rewrite, source mutation, or broad QA retry performed.
- Materialized QA: REVIEW 119/229, failed 110.
- Active incident: `INC-MQA-HYBRID-MOVIES-LIVE-TIMEOUT-20260610`.
- Hands-off status: `PASS_ACTIVE_TRUE_HANDS_OFF`.
- Timing plan: `PASS_PLAN_READY_STATUS_ONLY`, sample count 8.
- Grok report delivery: `PASS_DELIVERED_TO_GROK_API`, `REAL_API`, HTTP 200, model `grok-4`.

**What I have already tried:**  
- Added recurring Orchestrator job `hands_off_operator_cycle` at 300-second cadence.
- Added status/history artifacts:
  - `D:\PlexTools\public\latest\scarflix_v2\jasonos_prime_hands_off_operation_status.json`
  - `D:\PlexTools\public\latest\scarflix_v2\jasonos_prime_hands_off_operation_status.md`
  - `D:\PlexTools\state\jasonos_prime\hands_off_operation_history.jsonl`
- Added first-class status-only job `plan_materialized_qa_decision_timing_probe`.
- Added timing plan artifacts:
  - `D:\PlexTools\public\latest\scarflix_v2\materialized_qa_decision_timing_probe_plan.json`
  - `D:\PlexTools\public\latest\scarflix_v2\materialized_qa_decision_timing_probe_plan.md`
- Wired hands-off status and timing-plan status into Orchestrator Grok cycle reports and differential reporting.
- Ran validation jobs through the Orchestrator queue: hands-off cycle, timing-plan job, incident manager, Grok report generation, and Grok report delivery. All completed `done`, attempts `1`, no errors.

**My hypothesis on root cause:**  
The system was still too dependent on external pasted prompts for routine sequencing. The new hands-off cycle converts the current project mode into standing Orchestrator objectives with progress signatures, no-progress detection, safe job queuing, and exception-only escalation. The remaining Materialized QA blocker is not yet solved, but the Orchestrator can now continue bounded status-only incident progress without waiting for a pasted prompt.

**Proposed next steps:**  
1. Keep `PAUSE_PUBLICATION` active.
2. Let `hands_off_operator_cycle` continue every 300 seconds.
3. Implement or run only a detached tiny Plex decision/indexing timing diagnostic against the confirmed 8-path sample if gates remain clear.
4. Escalate only if no semantic progress crosses the configured threshold, Sentinel becomes ALERT/HIGH, launch health degrades, Grok reporting repeatedly fails, or a non-autonomous action becomes necessary.
5. Do not resume controlled ScarFLIX expansion until Materialized QA recovers or a reviewed mitigation plan is accepted.

**Data/files to review:**  
- `D:\PlexTools\Foundry\orchestrator\JasonOS_Prime_Orchestrator.js`
- `D:\PlexTools\public\latest\scarflix_v2\jasonos_prime_hands_off_operation_status.json`
- `D:\PlexTools\public\latest\scarflix_v2\materialized_qa_decision_timing_probe_plan.json`
- `D:\PlexTools\public\latest\scarflix_v2\ORCHESTRATOR_GROK_CYCLE_REPORT_DIFF.json`
- `C:\Users\jason\OneDrive\Documents\Plex Project\PROJECT_PLAN.md`
- `C:\Users\jason\OneDrive\Documents\Plex Project\TASKS.md`
- `C:\Users\jason\OneDrive\Documents\Plex Project\RISKS_ISSUES.md`
- `C:\Users\jason\OneDrive\Documents\Plex Project\OUTCOMES.md`

---

### UPDATE - 2026-06-10T07:46:30Z - Plex Metadata vs WebDAV Map Comparison Complete

**Trigger Reason:**  
Same-sample read-only comparison completed for the active Materialized QA incident.

**Current State Summary:**  
- Orchestrator health: PASS.
- Sentinel: PASS/LOW.
- Publication: `PAUSE_PUBLICATION=true`.
- Materialized QA: REVIEW 119/229, failed 110.
- Active incident: `INC-MQA-HYBRID-MOVIES-LIVE-TIMEOUT-20260610`.
- Comparison status: `PASS_SAME_SAMPLE_METADATA_COMPARISON_COMPLETE`.
- Grok delivery after comparison: `PASS_DELIVERED_TO_GROK_API`.
- No publication, expansion, cleanup, deletion, path rewrite, source mutation, broad QA retry, PlatformGate, PlexDecisionQA, ConcurrentQA, AutoGate, or publisher job was run.

**What I have already tried:**  
- Added read-only worker `D:\PlexTools\Foundry\workers\JasonOS_Prime_PlexMetadataVsWebdavMapComparison.js`.
- Added Orchestrator job `run_plex_metadata_vs_webdav_map_comparison`.
- Ran same 8-path sample, max concurrency `1`.
- Initial hub-search output included unrelated actor/keyword hub rows; worker was corrected to count only strict title/year matches before final evidence was accepted.
- Final result: expected `ScarFLIX_part-*` path matches `0/8`; same-section Plex rows `0/8`; strict other-section title/year matches `0/8`; not-found/not-indexed `8/8`.

**My hypothesis on root cause:**  
The sample files exist in user context and WebDAV/Plex endpoints are responsive, but Plex metadata/search is not surfacing the materialized `hybrid_movies_live` sample titles/parts. The leading actionable root cause is now Plex metadata/indexing/cache visibility gap. Service-context path visibility remains a separate structural constraint, but it no longer explains the Plex-visible QA timeout cluster by itself.

**Proposed next steps:**  
1. Keep `PAUSE_PUBLICATION=true`.
2. Prepare a QA-only Plex indexing/metadata reconciliation plan for the same sample.
3. Do not execute cleanup, source quarantine, path rewrites, broad QA, or publication without reviewed plan.
4. Escalate before any mitigation with blast radius beyond read-only/status-only QA reconciliation.

**Data/files to review:**  
- `D:\PlexTools\public\latest\scarflix_v2\plex_metadata_vs_webdav_map_comparison_results.json`
- `D:\PlexTools\public\latest\scarflix_v2\plex_metadata_vs_webdav_map_comparison_results.md`
- `D:\PlexTools\public\latest\scarflix_v2\materialized_qa_incident_hypothesis_ledger.json`
- `D:\PlexTools\Foundry\workers\JasonOS_Prime_PlexMetadataVsWebdavMapComparison.js`
- `C:\Users\jason\OneDrive\Documents\Plex Project\PROJECT_PLAN.md`
- `C:\Users\jason\OneDrive\Documents\Plex Project\TASKS.md`
- `C:\Users\jason\OneDrive\Documents\Plex Project\RISKS_ISSUES.md`
- `C:\Users\jason\OneDrive\Documents\Plex Project\OUTCOMES.md`

---

### UPDATE - 2026-06-10T07:53:14Z - Plex Metadata Reconciliation Plan Ready For Review

**Trigger Reason:**  
Planning gate for the active Materialized QA incident. No execution has been approved.

**Current State Summary:**  
- Orchestrator health: PASS.
- Sentinel: PASS/LOW.
- Publication: `PAUSE_PUBLICATION=true`.
- Materialized QA: REVIEW 119/229, failed 110.
- Active incident: `INC-MQA-HYBRID-MOVIES-LIVE-TIMEOUT-20260610`.
- Latest comparison: expected `ScarFLIX_part-*` matches `0/8`; same-section Plex rows `0/8`; strict title/year other-section matches `0/8`; not-found/not-indexed `8/8`.
- New plan status: `REVIEW_READY_FOR_GROK_PEER_REVIEW`.
- No publication, expansion, cleanup, deletion, path rewrite, source mutation, source quarantine, broad QA retry, Plex scan, PlatformGate, PlexDecisionQA, ConcurrentQA, AutoGate, or publisher job was run.

**What I have already tried:**  
- Created plan artifact `D:\PlexTools\public\latest\scarflix_v2\plex_metadata_reconciliation_plan_8path_sample.md`.
- Created structured plan artifact `D:\PlexTools\public\latest\scarflix_v2\plex_metadata_reconciliation_plan_8path_sample.json`.
- Locked the plan to the same 8 Movies section 5 / `hybrid_movies_live` sample.
- Defined read-only confirmation checks, a path-scoped section 5 refresh as the preferred future mitigation, one section 5 refresh as fallback only, and same-sample verification.
- Explicitly blocked publication, expansion, cleanup, deletion, source mutation, source quarantine, path rewrite, broad QA retry, Plex cache/database mutation, repeated scan loops, and system rclone/service-account changes.

**My hypothesis on root cause:**  
Plex metadata/indexing/cache visibility remains the leading actionable cause. Files are present from user context, WebDAV/Plex endpoints respond, but Plex does not surface strict metadata rows or expected `ScarFLIX_part-*` paths for the locked sample.

**Proposed next steps:**  
1. Grok should review the reconciliation plan.
2. If approved, execute only the minimum approved action, preferably one path-scoped section 5 refresh.
3. Rerun only the same-sample metadata comparison after the settle window.
4. Escalate before any broader mitigation, cleanup, source quarantine, path rewrite, broad QA retry, or publication.

**Data/files to review:**  
- `D:\PlexTools\public\latest\scarflix_v2\plex_metadata_reconciliation_plan_8path_sample.md`
- `D:\PlexTools\public\latest\scarflix_v2\plex_metadata_reconciliation_plan_8path_sample.json`
- `D:\PlexTools\public\latest\scarflix_v2\plex_metadata_vs_webdav_map_comparison_results.json`
- `D:\PlexTools\public\latest\scarflix_v2\plex_metadata_vs_webdav_map_comparison_results.md`
- `D:\PlexTools\public\latest\scarflix_v2\materialized_qa_incident_hypothesis_ledger.json`

---

### UPDATE - 2026-06-10T07:02:00Z - Corrected Materialized QA Timing Evidence

**Trigger Reason:**  
Corrected evidence after Jason confirmed Plex Media Server had been off during the first timing probe.

**Current State Summary:**  
- Orchestrator health: PASS.
- Sentinel: PASS/LOW.
- Publication: `PAUSE_PUBLICATION=true`.
- Materialized QA: REVIEW 119/229, failed 110.
- Active incident: `INC-MQA-HYBRID-MOVIES-LIVE-TIMEOUT-20260610`.
- Corrected timing probe: `PASS_TINY_TIMING_PROBE_COMPLETE`.
- No publication, expansion, cleanup, deletion, path rewrite, source mutation, broad QA retry, PlatformGate, PlexDecisionQA, ConcurrentQA, AutoGate, or publisher job was run.

**What I have already tried:**  
- Verified Plex Media Server is now reachable at both `http://127.0.0.1:32400/identity` and `http://192.168.1.184:32400/identity`.
- Isolated Plex API behavior: the same token returns `401` for `127.0.0.1` library metadata but `200` for LAN-base library metadata.
- Patched `D:\PlexTools\Foundry\workers\JasonOS_Prime_MaterializedQaDecisionTimingProbe.js` to try Plex base candidates and use the first successful metadata base without logging tokens.
- Re-ran the same 8-path, max-concurrency-1 Orchestrator-owned timing probe.

**My hypothesis on root cause:**  
The sampled files are present from user context, and Plex/WebDAV endpoints are currently responsive. The leading hypothesis is now Plex metadata/path visibility or indexing/cache mismatch: Plex metadata calls return quickly, but do not expose matching `ScarFLIX_part-*` paths for the sampled rows. Service-context path visibility remains a confirmed structural constraint because the Orchestrator cannot follow user-session `S:` rclone symlink targets.

**Proposed next steps:**  
1. Keep `PAUSE_PUBLICATION=true`.
2. Do not run broad QA, publisher, cleanup, deletion, source mutation, or path rewrites.
3. Run only a reviewed, same-sample, read-only comparison of Plex section metadata paths against `D:\PlexTools\state\scarflix_v2\webdav_map.json`.
4. Use the comparison to decide whether this is stale Plex rows, alternate hidden locations, or metadata not exposing file paths.
5. Escalate before any cleanup or source quarantine.

**Data/files to review:**  
- `D:\PlexTools\public\latest\scarflix_v2\materialized_qa_timing_probe_results.json`
- `D:\PlexTools\public\latest\scarflix_v2\materialized_qa_timing_probe_results.md`
- `D:\PlexTools\Foundry\workers\JasonOS_Prime_MaterializedQaDecisionTimingProbe.js`
- `D:\PlexTools\state\scarflix_v2\webdav_map.json`
- `C:\Users\jason\OneDrive\Documents\Plex Project\PROJECT_PLAN.md`
- `C:\Users\jason\OneDrive\Documents\Plex Project\TASKS.md`
- `C:\Users\jason\OneDrive\Documents\Plex Project\RISKS_ISSUES.md`
- `C:\Users\jason\OneDrive\Documents\Plex Project\OUTCOMES.md`


