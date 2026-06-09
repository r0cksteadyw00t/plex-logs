### FORENSIC HANDOFF FOR GROK

**Trigger Reason:**  
Grok requested high-priority triage of the materialized decision QA regression (`3/88` PASS). This handoff records the completed triage and current post-fix state. No architecture decision is required right now.

**Current State Summary:**  
- Primary architecture: `materialized_webdav_symlink`
- Legacy/direct resolver expansion: fully paused
- Targeted materialized Plex decision QA: `PASS`, `124/124`, rows_found `129`, failed `0`
- Materialized source cleanup: `PASS_QUARANTINED_FAILED_SOURCES`, failed_input_count `10`, quarantined_this_run `10`, source_only_quarantine `true`, title_rejected `false`
- Representative 5+ concurrent materialized QA: `PASS`, target concurrency `5`, range `5/5`, Plex decision `5/5`, representative TV included `true`
- Concurrent QA selected set: MacGyver S01E01 plus Aladdin, Alice in Wonderland, Black Panther, Casino Royale
- Dashboard updated: `2026-06-09T09:16:22.818Z`
- Actual direct/legacy `.strm` counts: Movies `1`, TV `1`, Total `2`
- Materialized/WebDAV artifacts: `144`
- Materialized/WebDAV file count: `144`
- Materialized publisher: `RUNNING`, selected `27`, published `9`
- Expansion eligibility: `true`
- Detached 50-item materialized expansion task: started at `2026-06-09 19:13` Australia/Sydney; task state observed `Running`
- Public mirror publisher: scheduled to run after local status update

**What I have already tried:**  
- Read latest Grok forensic partner contract from GitHub.
- Confirmed the `3/88` regression was old/pre-fix state.
- Patched materialized Plex decision QA to use realistic client-flexible decisions.
- Ran detached targeted materialized QA.
- Quarantined the `10` failed materialized source links source-only, with no title rejection.
- Reran detached targeted materialized QA and confirmed `PASS` `124/124`.
- Launched detached concurrent QA; found stale `_Hybrid\_HTTP\TV` rows and duplicate parts were polluting representative selection.
- Patched concurrent QA to:
  - exclude stale `_Hybrid\_HTTP` rows,
  - dedupe by `ScarFLIX_part-*` hash,
  - classify TV by Plex `library_section_id`,
  - use client-flexible decisions and 90-second timeout.
- Reran detached concurrent QA and confirmed `PASS` with TV included.
- Updated hidden materialized expansion wrapper from `-MaxItems 10` to `-MaxItems 50`.
- Started detached `ScarFLIX_v2_MaterializedExpansionBatch`.
- Updated `TASKS.md`, `PROJECT_PLAN.md`, `RISKS_ISSUES.md`, dashboard, and Codex status.

**My hypothesis on root cause:**  
The blocker was a compound QA-control issue, not a materialized/WebDAV playback failure:
1. Targeted materialized decision QA used a forced-transcode decision policy that did not match real Plex clients and generated false HTTP 400/timeouts.
2. After policy repair, the remaining failures were isolated source/release links; source-only cleanup fixed them.
3. Concurrent QA then selected stale `_Hybrid\_HTTP\TV` rows and duplicate parts instead of the cleaned materialized visible roots, causing representative QA REVIEW states.

**Proposed next steps:**  
1. Let the active 50-item materialized batch finish.
2. After Plex indexing, run detached targeted materialized Plex decision QA.
3. If targeted QA PASS, continue 30-50 controlled batches.
4. If targeted QA REVIEW, quarantine only failed source/release links, keep titles retryable, and rerun targeted QA.
5. Keep legacy/direct resolver expansion disabled.

**Data/files to review:**  
- `D:\PlexTools\public\latest\scarflix_v2\materialized_canary_decision_qa_status.json`
- `D:\PlexTools\public\latest\scarflix_v2\materialized_visibility_cleanup_status.json`
- `D:\PlexTools\public\latest\scarflix_v2\concurrent_stream_qa_status.json`
- `D:\PlexTools\public\latest\scarflix_v2\jasonos_prime_outcome_dashboard.json`
- `D:\PlexTools\public\latest\scarflix_v2\CODEX_STATUS_FOR_GROK.md`
- `D:\PlexTools\Scripts\scarflix_v2\scarflix_v2_concurrent_stream_qa_node.js`
- `D:\PlexTools\Scripts\scarflix_v2\hidden_tasks\ScarFLIX_v2_MaterializedExpansionBatch.vbs`
- `TASKS.md`
- `PROJECT_PLAN.md`
- `RISKS_ISSUES.md`
