## FOR GROK PEER REVIEW -- PLAYBACK QUALITY AND STABILITY INVESTIGATION ACTIVE

**Updated UTC:** 2026-06-13T08:28:12Z  
**Status:** REVIEW_PLAYBACK_PATH_ERROR_PRESSURE_AND_PLEX_BACKGROUND_LOAD  
**Jason symptom:** Plex movie playback is still hit-and-miss / `Content is unavailable`.  
**Primary directive:** quality, stability, QA evidence, and issue isolation before catalogue expansion.

### Current Decision

Expansion remains held. The next success criterion is not indexed item count; it is a verified Plex-client Watch Now lane with stable playback while background automation is quiet.

### Fresh Evidence

- Command launch recovered briefly: `cmd /c echo alive` returned `81ms`, `46ms`, `33ms`.
- Core infra status files were fresh and mostly PASS:
  - Sentinel: `PASS / LOW`.
  - Plex watchdog: `PASS`; Plex identity HTTP 200.
  - Playback path recovery: `PASS`; `S:\media` and `S:\media\catalog` visible.
  - WebDAV bridge health: PASS.
- User-facing playback is still not cleared:
  - materialized decision QA remains `REVIEW 119/229`, failed `110`.
  - materialized playback success rate remains around `52%`.
  - Plex playback sample remains `REVIEW`, range `0/5`, decision `0/5` in dashboard truth metrics.
- Non-critical QA/expansion/campaign tasks are currently disabled, including PlaybackQA_Controller, PlexClientDecisionQA, ConcurrentStreamQA, MaterializedPlexDecisionQA, MaterializedExpansionBatch, PlatformGate runners, DirectStrmAdmissionGate, MaterializedVisibilityCleanup, PublicMirrorPublisher, and FastTrackAccelerator.
- Core tasks remain enabled: PlexWatchdog, PlaybackPathRecovery, RcloneMountKeepalive, InfrastructureKeepalive, Sentinel, Watchdog/StallDetector.

### Active Bottleneck Evidence

Current process/log inspection found Plex background activity still consuming the media path even with ScarFLIX QA tasks disabled:

- Multiple `Plex Media Scanner.exe --scan --section 6` processes.
- Plex background chapter/credit/analysis jobs.
- Background Plex transcoders for thumbnail/credit/index generation on TV files.
- rclone/WebDAV logs show repeated active upstream/cache failures for `ScarFLIX_part-*` paths, especially socket hang-up / 502 / 503 / admission-gate failures.
- One dominant repeated hash in the WebDAV bridge log was `ScarFLIX_part-734e5ca7e95283c8`; another repeated hash was `ScarFLIX_part-b5f5597dbf238204`.

### Engineering Change Attempted

Codex created a new local guard script:

- `D:\PlexTools\Scripts\scarflix_v2\JasonOS_Prime_PlaybackFirstStabilityGuard.ps1`
- `D:\PlexTools\Scripts\scarflix_v2\hidden_tasks\JasonOS_Prime_PlaybackFirstStabilityGuard.vbs`

Purpose:

- Detect command-launch health.
- Detect recent rclone/WebDAV upstream error pressure.
- Identify Plex background scanner/analyzer/thumbnail/credit jobs.
- Stop only Plex background scanner/analyzer jobs during playback-first recovery; never stop Plex Media Server and never mutate ScarFLIX sources.
- Write `playback_first_stability_guard_status.json/.md`.

The inline first run did not return within 90 seconds, and a direct attempt to stop only `Plex Media Scanner` processes did not return within 30 seconds. This means process/control-plane contention remains part of the incident. The guard should run detached/local when launch health permits, not be forced inline from Codex.

### Safety Posture

- Keep `PAUSE_PUBLICATION=true`.
- No publication, expansion, cleanup, deletion, source mutation, path rewrite, Plex DB mutation, cache clear, or broad QA.
- Keep only core playback infrastructure alive.
- Suppress background Plex analysis/scans during active playback recovery where possible.
- Treat infrastructure PASS as insufficient until Plex-client playback is verified.

### Recommended Next Safe Action

1. Run `JasonOS_Prime_PlaybackFirstStabilityGuard.ps1` detached through the hidden launcher once process launch is stable.
2. If it successfully stops background Plex scanners/analyzers, wait 2-5 minutes for rclone/WebDAV pressure to fall.
3. Re-test only a tiny Plex-client Watch Now lane.
4. If a single title still fails, isolate that title end-to-end from Plex metadata row to local path to WebDAV range to Plex logs.
5. Only after a verified lane works should any Path 2 or catalogue expansion resume.

### Review Request For Grok

Please review the shift from expansion/visibility metrics to playback quality gates. The key proposed policy change is: no catalogue growth until the system can distinguish `infrastructure up`, `source reachable`, and `Plex-client playable`, and until background Plex analysis is suppressed during user playback windows.