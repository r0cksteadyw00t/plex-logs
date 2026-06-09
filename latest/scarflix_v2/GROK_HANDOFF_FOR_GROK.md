### FORENSIC HANDOFF FOR GROK

**Trigger Reason:**  
New materialized decision QA regression after process launch recovered: latest targeted materialized QA is `REVIEW`, with `3/88` checked rows passing and `85` failing. This blocks concurrent QA, controlled expansion scaling, and full expansion.

**Current State Summary:**  
- Current phase: Phase 0 - Stabilisation & Foundation.
- Direct `.strm` before Four Seasons quarantine: Movies `1`, TV `1`, total `2`.
- Four Seasons old direct resolver `.strm` was quarantined to `D:\PlexTools\quarantine\scarflix_v2\legacy_direct_resolver\20260609T072355Z\The Four Seasons - S01E01.strm`.
- Expected direct `.strm` after quarantine: Movies `1`, TV `0`, total `1`.
- Remaining direct `.strm`: `D:\StremioCatalog\_Hybrid\Movies\The Garfield Movie (2024).strm`.
- Materialized/WebDAV artifact count: `127`.
- Materialized decision QA current result:
  - status `REVIEW`
  - target_count `129`
  - rows_found `99`
  - checked `88`
  - passed `3`
  - failed `85`
  - updated `2026-06-09T06:58:58Z`
- Playback QA controller:
  - status `REVIEW_MATERIALIZED_DECISION_FAILURE`
  - current_step `materialized_decision_failed`
  - next_action `Quarantine failed materialized source/release and keep title retryable.`
- Public mirror last read: `PASS`, updated `2026-06-09T07:21:48.564Z`.
- Sentinel: `PASS`, `LOW`.
- Legacy/direct resolver expansion remains paused.
- `ScarFLIX_v2_SafeWebDavExpansionPipeline` remains disabled from last successful task read.

**What I have already tried:**  
- Re-read latest public `GROK_FORENSIC_PARTNER.md`.
- Confirmed basic process launch recovered (`cmd /c echo alive`).
- Read current dashboard/status files using a lightweight Node-only status read.
- Verified patched concurrent QA worker syntax: `node --check` PASS.
- Verified patched concurrent QA wrapper parse: PASS.
- Confirmed the old Four Seasons direct `.strm` still existed and pointed to `http://127.0.0.1:18788/live?...`.
- Quarantined only that obsolete Four Seasons direct `.strm`; title remains retryable through materialized path.
- Did not start concurrent QA because targeted materialized QA is now REVIEW.

**My hypothesis on root cause:**  
There are two separate issues:

1. Four Seasons Fire TV failure was likely caused by the obsolete direct resolver `.strm`, now quarantined.
2. The broader materialized decision QA regression is not yet explained. Failure sample shows many `HTTP 400` decision failures and one `socket hang up`, while some known user-tested titles still pass. The pattern may be:
   - Plex indexing/metadata collision for newly added `ScarFLIX Part ...` rows,
   - decision QA using rows before Plex analysis/metadata stabilizes,
   - invalid/partial materialized sources,
   - or decision request assumptions that fail for a subset of materialized rows.

Because failures include many rows and not just Four Seasons, expansion must remain held until the failed-row class is separated into transient index lag vs source/release failure.

**Proposed next steps:**  
1. Compare the `85` failed rows against Plex scanner/analyzer logs to classify `HTTP 400` causes.
2. Separate rows with temporary Plex scan/index lag from real source/release failures.
3. Quarantine only confirmed failed materialized source/release rows while keeping titles retryable.
4. Re-run targeted materialized Plex decision QA via existing detached task only after cleanup/index stabilization.
5. Start patched `ScarFLIX_v2_ConcurrentStreamQA` only after targeted materialized decision QA returns PASS.
6. Increase controlled materialized batches to 30-50 only after targeted decision QA and 5+ concurrent QA pass.

**Data/files to review:**  
- `D:\PlexTools\public\latest\scarflix_v2\materialized_canary_decision_qa_status.json`
- `D:\PlexTools\public\latest\scarflix_v2\jasonos_prime_playback_qa_controller_status.json`
- `D:\PlexTools\public\latest\scarflix_v2\four_seasons_firetv_investigation_status.json`
- `D:\PlexTools\public\latest\scarflix_v2\jasonos_prime_outcome_dashboard.json`
- `D:\PlexTools\Scripts\scarflix_v2\ScarFLIX_v2_ConcurrentStreamQA.ps1`
- `D:\PlexTools\Scripts\scarflix_v2\scarflix_v2_concurrent_stream_qa_node.js`
- `D:\PlexTools\state\scarflix_v2\webdav_map.json`
- Plex logs around `2026-06-09T06:55Z` to `2026-06-09T07:00Z`.
