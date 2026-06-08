# JasonOS Prime Recent Updates

Updated UTC: 2026-06-08T01:25:02.611Z
Source: live status merge

- 2026-06-08T01:23:45.908Z - PlatformGate child QA active: Health: Latest child QA line: [2026-06-08T01:23:45Z] [INFO] Health status publishing
- 2026-06-08T01:22:34.613Z - 5-Concurrent QA Decoupled From PlatformGate/Canary Publishing - 2026-06-08 11:20: Jason approved the forensic correction that 5-concurrent QA must not block PlatformGate/Canary when the PlatformGate snapshot has only one visible row. Current result: PlatformGate core gates are PASS for the current snapshot: ActiveGate `PASS`
- 2026-06-08T01:20:16.625Z - PlatformGate child QA active: 5-concurrent stream QA: Latest child QA line: [2026-06-08T01:20:16Z] [REVIEW] Final: REVIEW
- 2026-06-08T01:20:05Z - Autonomous controller: candidate_source_model_review: Candidate-source model requires engineering review before catalogue expansion
- 2026-06-08T01:18:52Z - Durable PlatformGate runner PASS: Step platform_gate_pass; owner_pid=44064; child_pid=
- 2026-06-08T01:18:52Z - PlatformGate checkpoint PASS: Step platform_gate_pass; visible=1; blockers=0
- 2026-06-08T01:17:46Z - Durable PlatformGate runner RUNNING: Step running_platform_gate_attempt_1; owner_pid=44064; child_pid=39572
- 2026-06-08T01:17:46Z - PlatformGate checkpoint RUNNING: Step running_platform_gate_attempt_1; visible=1; blockers=0
- 2026-06-08T01:15:19.893Z - Direct STRM Playback QA Failing; Publisher Paused - 2026-06-08 10:10: Current audit result: Actual direct `.strm` files visible in Streaming libraries: movies `43`, TV `24`, total `67`. Staged candidate publisher now has `50` staged candidates held. Direct URL/range testing is not the blocker: 5 direct `.strm` sample URLs passed byte-range testing (`5/5` returned `206`).
- 2026-06-08T01:15:10Z - Autonomous controller: PLATFORM_GATE_CHILD_ACTIVE: PlatformGate child QA activity is fresh; no duplicate runner launch
- 2026-06-08T01:13:49Z - Durable PlatformGate runner REVIEW: Step platform_gate_review; owner_pid=27612; child_pid=
- 2026-06-08T01:13:49Z - PlatformGate checkpoint REVIEW: Step platform_gate_review; visible=1; blockers=0
- 2026-06-08T01:10:06Z - Autonomous controller: PLATFORM_GATE_RUNNING: PlatformGate runner already running; no inline wait
- 2026-06-08T01:00:12Z - Autonomous controller: unclassified_review_platform_gate_relaunch: PlatformGate REVIEW was unclassified; relaunched detached PlatformGate runner instead of blocking for Jason