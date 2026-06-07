# JasonOS Prime Recent Updates

Updated UTC: 2026-06-07T21:36:08.884Z
Source: live status merge

- 2026-06-07T21:35:12.337Z - PlatformGate child QA active: 5-concurrent stream QA: Latest child QA line: [2026-06-07T21:35:12Z] [REVIEW] Final: REVIEW
- 2026-06-07T21:35:08Z - Durable PlatformGate runner REVIEW: Step waiting_for_overlap; owner_pid=25452; child_pid=
- 2026-06-07T21:35:08Z - PlatformGate checkpoint REVIEW: Step waiting_for_overlap; visible=1; blockers=0
- 2026-06-07T21:34:01Z - Durable PlatformGate runner RUNNING: Step starting; owner_pid=27400; child_pid=
- 2026-06-07T21:34:01Z - PlatformGate checkpoint RUNNING: Step starting; visible=1; blockers=0
- 2026-06-07T21:33:15.876Z - Direct STRM Admission Gate Added After Maze Runner Playback Failure - 2026-06-08 07:15: Jason reported that `The Maze Runner (2014)` failed in Plex with a `/video/:/transcode/universal/decision` network error. Forensic result: The visible Plex library file was `D:\StremioCatalog\_Hybrid\Movies\The Maze Runner (2014).strm`. Its content was a local resolver URL: `http://127.0.0.1:18788/live?...`, not a s...
- 2026-06-07T21:33:08Z - Autonomous controller: unclassified_review_platform_gate_relaunch: PlatformGate REVIEW was unclassified; relaunched detached PlatformGate runner instead of blocking for Jason
- 2026-06-07T21:23:03Z - Autonomous controller: PLATFORM_GATE_RUNNING: PlatformGate runner already running; no inline wait
- 2026-06-07T21:09:27.645Z - PlatformGate child QA active: Plex client decision QA: Latest child QA line: [2026-06-07T21:09:27Z] [INFO] Plex client decision QA starting MaxItems=0 TimeoutSeconds=20 Retries=0
- 2026-06-07T21:08:14.156Z - PlatformGate Snapshot Health Contract Patched - 2026-06-07 20:23: Jason approved the forensic conclusion that the latest PlatformGate failure was a health-contract mismatch, not a playback blocker. Current result: PlatformGate now requires snapshot-scoped QA only: ActiveGate, VisibleCatalogQA, PlexClientDecisionQA, and ConcurrentStreamQA. Global `scarflix_v2_health.json` remains v...
- 2026-06-07T20:54:04.701Z - PlatformGate child QA active: Health: Latest child QA line: [2026-06-07T20:54:04Z] [INFO] Health status publishing
- 2026-06-07T20:48:04Z - Autonomous controller: candidate_source_model_pending_platform_gate: Candidate-source model is pending PlatformGate PASS
- 2026-06-07T18:51:09Z - Autonomous controller: unhandled_platform_gate_state: none
- 2026-06-07T12:48:11Z - Autonomous controller: candidate_source_model_review: Candidate-source model requires engineering review before catalogue expansion