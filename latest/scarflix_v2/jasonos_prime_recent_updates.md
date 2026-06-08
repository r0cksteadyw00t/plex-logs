# JasonOS Prime Recent Updates

Updated UTC: 2026-06-08T02:44:01.233Z
Source: live status merge

- 2026-06-08T02:43:33.939Z - PlatformGate child QA active: Health: Latest child QA line: [2026-06-08T02:43:33Z] [INFO] Health status publishing
- 2026-06-08T02:42:59.428Z - PlatformGate child QA active: WebDAV active gate: Latest child QA line: [2026-06-08T02:42:59Z] [INFO] Running concurrent WebDAV active gate worker for 6 entries.
- 2026-06-08T02:40:14.950Z - 5-Concurrent QA Decoupled From PlatformGate/Canary Publishing - 2026-06-08 11:20: Jason approved the forensic correction that 5-concurrent QA must not block PlatformGate/Canary when the PlatformGate snapshot has only one visible row. Current result: PlatformGate core gates are PASS for the current snapshot: ActiveGate `PASS`
- 2026-06-08T02:40:12.003Z - PlatformGate child QA active: 5-concurrent stream QA: Latest child QA line: [2026-06-08T02:40:12Z] [REVIEW] Final: REVIEW
- 2026-06-08T02:40:07Z - Autonomous controller: candidate_source_model_review: Candidate-source model requires engineering review before catalogue expansion
- 2026-06-08T02:36:00.845Z - PlatformGate child QA active: Plex visible/HLS QA: Latest child QA line: [2026-06-08T02:36:00Z] [PASS] QA passed: part=112885 title=The Stolen Eagle
- 2026-06-08T02:25:08Z - Autonomous controller: candidate_source_model_pending_platform_gate: Candidate-source model is pending PlatformGate PASS
- 2026-06-08T02:08:01.548Z - PlatformGate child QA active: Plex client decision QA: Latest child QA line: [2026-06-08T02:08:01Z] [PASS] Decision passed: metadata=41608 title=That '70s Pilot
- 2026-06-08T01:18:52Z - Durable PlatformGate runner PASS: Step platform_gate_pass; owner_pid=44064; child_pid=
- 2026-06-08T01:18:52Z - PlatformGate checkpoint PASS: Step platform_gate_pass; visible=1; blockers=0
- 2026-06-08T01:17:46Z - Durable PlatformGate runner RUNNING: Step running_platform_gate_attempt_1; owner_pid=44064; child_pid=39572
- 2026-06-08T01:17:46Z - PlatformGate checkpoint RUNNING: Step running_platform_gate_attempt_1; visible=1; blockers=0
- 2026-06-08T01:15:19.893Z - Direct STRM Playback QA Failing; Publisher Paused - 2026-06-08 10:10: Current audit result: Actual direct `.strm` files visible in Streaming libraries: movies `43`, TV `24`, total `67`. Staged candidate publisher now has `50` staged candidates held. Direct URL/range testing is not the blocker: 5 direct `.strm` sample URLs passed byte-range testing (`5/5` returned `206`).
- 2026-06-08T01:15:10Z - Autonomous controller: PLATFORM_GATE_CHILD_ACTIVE: PlatformGate child QA activity is fresh; no duplicate runner launch