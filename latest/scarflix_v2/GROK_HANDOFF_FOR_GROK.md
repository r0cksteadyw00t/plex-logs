### FORENSIC HANDOFF FOR GROK

**Trigger Reason:**  
Repeated process-launch saturation recurred after initial recovery. It blocked syntax verification, Four Seasons source quarantine confirmation, and detached 5+ materialized concurrent QA launch. Sentinel also reported `ALERT` / `HIGH` with repeat count `5`, though the signature appears tied to stale mirror/platform telemetry rather than failed materialized playback.

**Current State Summary:**  
- Current phase: Phase 0 - Stabilisation & Foundation.
- Direct `.strm` counts from latest successful filesystem read: Movies `1`, TV `1`, total `2`.
- Direct legacy paths:
  - `D:\StremioCatalog\_Hybrid\Movies\The Garfield Movie (2024).strm`
  - `D:\StremioCatalog\_Hybrid\Shows\The Four Seasons\Season 01\The Four Seasons - S01E01.strm`
- Four Seasons direct `.strm` content is an old resolver URL: `http://127.0.0.1:18788/live?type=episode&tmdb_id=243316...`.
- Four Seasons materialized path exists and was scanned by Plex: `D:\StremioCatalog\_Hybrid\_HTTP\TV\The Four Seasons (2025)\Season 01\The Four Seasons (2025) - S01E01 - ScarFLIX_part-eb86efe619875fde\stream.mkv`.
- Plex Scanner evidence: media item `115427`, part `115677`, size `267189863`, path matched/reused at 2026-06-09 16:55 local.
- Materialized/WebDAV dashboard artifact count: `125`.
- Targeted materialized Plex decision QA: last stable result `PASS 27/27`.
- Playback QA controller latest local read: `RUNNING`, `materialized_plex_decision_qa_started`.
- `ScarFLIX_v2_MaterializedPlexDecisionQA` task: running at latest successful task read.
- `ScarFLIX_v2_SafeWebDavExpansionPipeline`: disabled at latest successful task read.
- Public mirror: previously `PASS`; raw public dashboard appears stale, so mirror freshness is still REVIEW.
- PIDs seen before saturation: three `ScarFLIX_v2_MaterializedPlexDecisionQA_Node.js` processes (`39924`, `39812`, `13884`) plus materialized publisher PowerShell `34376`.

**What I have already tried:**  
- Read the latest public `GROK_FORENSIC_PARTNER.md`.
- Read current local dashboard/status files and exact direct `.strm` filesystem counts.
- Inspected Plex logs for `The Four Seasons` and confirmed both materialized scan evidence and an obsolete direct resolver `.strm`.
- Backed up and patched `D:\PlexTools\Scripts\scarflix_v2\ScarFLIX_v2_ConcurrentStreamQA.ps1`.
- Backed up and patched `D:\PlexTools\Scripts\scarflix_v2\scarflix_v2_concurrent_stream_qa_node.js`.
- Attempted `node --check`, PowerShell parse check, and Four Seasons direct `.strm` quarantine/verification. These timed out repeatedly due process-launch saturation.
- Stopped further local process attempts to avoid worsening saturation.

**My hypothesis on root cause:**  
- The original systemic playback issue is fixed for materialized/WebDAV paths, based on user-confirmed PC/phone/Fire TV successes and targeted materialized decision QA.
- Four Seasons Fire TV failure is likely not materialized architecture failure. The most likely cause is Plex/Fire TV selecting the old visible direct resolver `.strm` for the title, which still points to `127.0.0.1:18788/live`.
- The current blocker is local control-plane/process-launch saturation. It prevents Codex from verifying patches or safely launching the next detached QA step. This is separate from materialized playback viability.

**Proposed next steps:**  
1. Allow current local QA/publisher processes to finish or clear saturation.
2. Verify the patched concurrent QA worker syntax:
   - `node --check D:\PlexTools\Scripts\scarflix_v2\scarflix_v2_concurrent_stream_qa_node.js`
   - PowerShell parse check for `D:\PlexTools\Scripts\scarflix_v2\ScarFLIX_v2_ConcurrentStreamQA.ps1`
3. Confirm whether `D:\StremioCatalog\_Hybrid\Shows\The Four Seasons\Season 01\The Four Seasons - S01E01.strm` still exists. If it does, move only that file to source quarantine and keep the title retryable.
4. Start `ScarFLIX_v2_ConcurrentStreamQA` as a detached hidden scheduled task after syntax verification.
5. If materialized concurrent QA passes, scale controlled materialized batches to 30-50.
6. Keep legacy/direct resolver expansion disabled.

**Data/files to review:**  
- `D:\PlexTools\public\latest\scarflix_v2\jasonos_prime_outcome_dashboard.json`
- `D:\PlexTools\public\latest\scarflix_v2\jasonos_prime_playback_qa_controller_status.json`
- `D:\PlexTools\public\latest\scarflix_v2\materialized_canary_decision_qa_status.json`
- `D:\PlexTools\public\latest\scarflix_v2\jasonos_prime_sentinel_status.json`
- `D:\PlexTools\Scripts\scarflix_v2\ScarFLIX_v2_ConcurrentStreamQA.ps1`
- `D:\PlexTools\Scripts\scarflix_v2\scarflix_v2_concurrent_stream_qa_node.js`
- `D:\PlexTools\state\scarflix_v2\webdav_map.json`
- `C:\Users\jason\AppData\Local\Plex Media Server\Logs\Plex Media Scanner.1.log`
- `D:\StremioCatalog\_Hybrid\Shows\The Four Seasons\Season 01\The Four Seasons - S01E01.strm`
