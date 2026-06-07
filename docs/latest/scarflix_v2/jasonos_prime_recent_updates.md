# JasonOS Prime Recent Updates

Updated UTC: 2026-06-07T23:13:01.975Z
Source: live status merge

- 2026-06-07T23:12:35Z - Durable PlatformGate runner REVIEW: Step platform_gate_review; owner_pid=36608; child_pid=
- 2026-06-07T23:12:35Z - PlatformGate checkpoint REVIEW: Step platform_gate_review; visible=1; blockers=0
- 2026-06-07T23:12:30.657Z - PlatformGate child QA active: 5-concurrent stream QA: Latest child QA line: [2026-06-07T23:12:30Z] [REVIEW] Final: REVIEW
- 2026-06-07T23:10:11.309Z - Direct STRM Admission Gate Added After Maze Runner Playback Failure - 2026-06-08 07:15: Jason reported that `The Maze Runner (2014)` failed in Plex with a `/video/:/transcode/universal/decision` network error. Forensic result: The visible Plex library file was `D:\StremioCatalog\_Hybrid\Movies\The Maze Runner (2014).strm`. Its content was a local resolver URL: `http://127.0.0.1:18788/live?...`, not a s...
- 2026-06-07T23:10:05Z - Autonomous controller: PLATFORM_GATE_RUNNING: PlatformGate runner already running; no inline wait
- 2026-06-07T23:06:04Z - Durable PlatformGate runner RUNNING: Step running_platform_gate_attempt_1; owner_pid=19636; child_pid=17532
- 2026-06-07T23:06:04Z - PlatformGate checkpoint RUNNING: Step running_platform_gate_attempt_1; visible=1; blockers=0
- 2026-06-07T23:02:31.284Z - PlatformGate child QA active: Plex visible/HLS QA: Latest child QA line: [2026-06-07T23:02:31Z] [PASS] QA passed: part=112587 title=This Is What Happens
- 2026-06-07T22:57:05Z - Autonomous controller: unclassified_review_platform_gate_relaunch: PlatformGate REVIEW was unclassified; relaunched detached PlatformGate runner instead of blocking for Jason
- 2026-06-07T22:27:06Z - Autonomous controller: waiting_for_overlap_after_unclassified_review: PlatformGate REVIEW is unclassified; waiting for active validation overlap before retry
- 2026-06-07T21:58:19Z - Autonomous controller: PLATFORM_GATE_CHILD_ACTIVE: PlatformGate child QA activity is fresh; no duplicate runner launch
- 2026-06-07T21:09:27.645Z - PlatformGate child QA active: Plex client decision QA: Latest child QA line: [2026-06-07T21:09:27Z] [INFO] Plex client decision QA starting MaxItems=0 TimeoutSeconds=20 Retries=0
- 2026-06-07T21:08:14.156Z - PlatformGate Snapshot Health Contract Patched - 2026-06-07 20:23: Jason approved the forensic conclusion that the latest PlatformGate failure was a health-contract mismatch, not a playback blocker. Current result: PlatformGate now requires snapshot-scoped QA only: ActiveGate, VisibleCatalogQA, PlexClientDecisionQA, and ConcurrentStreamQA. Global `scarflix_v2_health.json` remains v...
- 2026-06-07T20:54:04.701Z - PlatformGate child QA active: Health: Latest child QA line: [2026-06-07T20:54:04Z] [INFO] Health status publishing