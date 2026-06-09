### FORENSIC HANDOFF FOR GROK

**Trigger Reason:**  
Plex decision QA on the larger materialized set was blocking scaling. Investigation found the QA workers were forcing transcode decisions that do not match real successful Plex client behavior.

**Current State Summary:**  
- Updated: 2026-06-09T08:12:00Z / 2026-06-09 18:12 Australia/Sydney
- Primary architecture: `materialized_webdav_symlink`
- Legacy/direct resolver expansion: paused
- Last dashboard direct `.strm` counts: Movies `1`, TV `1`, Total `2`
- Last dashboard materialized artifact count: `130`
- Last dashboard materialized publisher: `PASS`, selected `10`, published `4`, retry `6`
- Last targeted materialized decision QA before patch: `REVIEW`, target `129`, rows_found `99`, checked `88`, passed `3`, failed `85`
- Last concurrent materialized QA before patch: range `5/5` PASS, Plex decisions `0/5` timeout
- Patched targeted materialized QA is now running detached; log shows many PASS rows under the new client-flexible policy
- Observed detached QA PID: `34408`
- Process launch/polling became unstable while detached QA was active; Codex stopped live polling

**What I have already tried:**  
- Re-read public Grok forensic contract.
- Inspected local dashboard, playback QA controller status, materialized QA status, concurrent QA status, task state, and Plex logs.
- Confirmed playback QA controller already triggered Plex scans for sections `5` and `6`.
- Parsed materialized QA failures: `84` HTTP `400`, one socket hang-up before patch.
- Checked Plex logs and found real client-style decisions returning HTTP `200` while forced-transcode QA returned `400`/timeouts.
- Backed up and patched:
  - `D:\PlexTools\Foundry\workers\ScarFLIX_v2_MaterializedPlexDecisionQA_Node.js`
  - `D:\PlexTools\Scripts\scarflix_v2\scarflix_v2_concurrent_stream_qa_node.js`
- Syntax checked both workers.
- Started detached `ScarFLIX_v2_MaterializedPlexDecisionQA`.
- Updated `TASKS.md`, `PROJECT_PLAN.md`, and `RISKS_ISSUES.md`.

**My hypothesis on root cause:**  
The main blocker was a QA policy bug, not a materialized/WebDAV architecture failure. The automated QA forced a transcode-only decision (`directPlay=0`, `directStream=0`) while Jason's successful clients and Plex logs use flexible client decisions that allow direct play/direct stream. Forced-transcode remains useful diagnostic evidence, but it should not block materialized/WebDAV expansion when the primary user path is client-flexible playback.

**Proposed next steps:**  
1. Let detached patched targeted materialized QA finish.
2. If final status is PASS, launch patched detached representative 5+ concurrent materialized QA.
3. If concurrent QA passes, scale controlled materialized/WebDAV batches to 30-50.
4. If final status remains REVIEW due isolated rows, run detached materialized visibility cleanup/source quarantine, keep titles retryable, rescan, and rerun QA.
5. Keep legacy/direct resolver expansion paused.

**Data/files to review:**  
- `D:\PlexTools\logs\scarflix_v2_materialized_plex_decision_qa_node_20260609.log`
- `D:\PlexTools\public\latest\scarflix_v2\materialized_canary_decision_qa_status.json`
- `D:\PlexTools\public\latest\scarflix_v2\concurrent_stream_qa_status.json`
- `D:\PlexTools\public\latest\scarflix_v2\jasonos_prime_outcome_dashboard.json`
- `D:\PlexTools\Foundry\workers\ScarFLIX_v2_MaterializedPlexDecisionQA_Node.js`
- `D:\PlexTools\Scripts\scarflix_v2\scarflix_v2_concurrent_stream_qa_node.js`
- Plex Media Server logs around 2026-06-09 16:55-17:42 AEST
