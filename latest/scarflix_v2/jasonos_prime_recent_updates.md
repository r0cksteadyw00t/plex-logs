# JasonOS Prime Recent Updates

Updated UTC: 2026-06-08T01:17:01.450Z
Source: live status merge

- 2026-06-08T01:15:24Z - Durable PlatformGate runner PASS: Step platform_gate_pass; owner_pid=9704; child_pid=
- 2026-06-08T01:15:24Z - PlatformGate checkpoint PASS: Step platform_gate_pass; visible=1; blockers=0
- 2026-06-08T01:15:19.893Z - Direct STRM Playback QA Failing; Publisher Paused - 2026-06-08 10:10: Current audit result: Actual direct `.strm` files visible in Streaming libraries: movies `43`, TV `24`, total `67`. Staged candidate publisher now has `50` staged candidates held. Direct URL/range testing is not the blocker: 5 direct `.strm` sample URLs passed byte-range testing (`5/5` returned `206`).
- 2026-06-08T01:15:10Z - Autonomous controller: PLATFORM_GATE_CHILD_ACTIVE: PlatformGate child QA activity is fresh; no duplicate runner launch
- 2026-06-08T01:14:40.045Z - PlatformGate child QA active: Health: Latest child QA line: [2026-06-08T01:14:39Z] [INFO] Health status publishing
- 2026-06-08T01:14:05Z - Durable PlatformGate runner RUNNING: Step running_platform_gate_attempt_1; owner_pid=9704; child_pid=16840
- 2026-06-08T01:14:05Z - PlatformGate checkpoint RUNNING: Step running_platform_gate_attempt_1; visible=1; blockers=0
- 2026-06-08T01:13:49Z - Durable PlatformGate runner REVIEW: Step platform_gate_review; owner_pid=27612; child_pid=
- 2026-06-08T01:13:49Z - PlatformGate checkpoint REVIEW: Step platform_gate_review; visible=1; blockers=0
- 2026-06-08T01:13:43.265Z - PlatformGate child QA active: 5-concurrent stream QA: Latest child QA line: [2026-06-08T01:13:43Z] [REVIEW] Final: REVIEW
- 2026-06-08T01:10:06Z - Autonomous controller: PLATFORM_GATE_RUNNING: PlatformGate runner already running; no inline wait
- 2026-06-08T01:00:12Z - Autonomous controller: unclassified_review_platform_gate_relaunch: PlatformGate REVIEW was unclassified; relaunched detached PlatformGate runner instead of blocking for Jason
- 2026-06-08T01:00:07.657Z - PlatformGate child QA active: Plex client decision QA: Latest child QA line: [2026-06-08T01:00:07Z] [INFO] Plex client decision QA starting MaxItems=0 TimeoutSeconds=45 Retries=1
- 2026-06-08T00:05:17.301Z - Direct STRM Admission Gate Added After Maze Runner Playback Failure - 2026-06-08 07:15: Jason reported that `The Maze Runner (2014)` failed in Plex with a `/video/:/transcode/universal/decision` network error. Forensic result: The visible Plex library file was `D:\StremioCatalog\_Hybrid\Movies\The Maze Runner (2014).strm`. Its content was a local resolver URL: `http://127.0.0.1:18788/live?...`, not a s...