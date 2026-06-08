# JasonOS Prime Recent Updates

Updated UTC: 2026-06-08T02:22:01.506Z
Source: live status merge

- 2026-06-08T02:20:15.239Z - 5-Concurrent QA Decoupled From PlatformGate/Canary Publishing - 2026-06-08 11:20: Jason approved the forensic correction that 5-concurrent QA must not block PlatformGate/Canary when the PlatformGate snapshot has only one visible row. Current result: PlatformGate core gates are PASS for the current snapshot: ActiveGate `PASS`
- 2026-06-08T02:20:11.439Z - PlatformGate child QA active: 5-concurrent stream QA: Latest child QA line: [2026-06-08T02:20:11Z] [REVIEW] Final: REVIEW
- 2026-06-08T02:20:07Z - Autonomous controller: candidate_source_model_pending_platform_gate: Candidate-source model is pending PlatformGate PASS
- 2026-06-08T02:10:53.400Z - PlatformGate child QA active: Health: Latest child QA line: [2026-06-08T02:10:53Z] [INFO] Health status publishing
- 2026-06-08T02:08:57.391Z - PlatformGate child QA active: WebDAV active gate: Latest child QA line: [2026-06-08T02:08:57Z] [INFO] Running concurrent WebDAV active gate worker for 18 entries.
- 2026-06-08T02:08:01.548Z - PlatformGate child QA active: Plex client decision QA: Latest child QA line: [2026-06-08T02:08:01Z] [PASS] Decision passed: metadata=41608 title=That '70s Pilot
- 2026-06-08T02:05:07Z - Autonomous controller: candidate_source_model_review: Candidate-source model requires engineering review before catalogue expansion
- 2026-06-08T02:05:02.861Z - PlatformGate child QA active: Plex visible/HLS QA: Latest child QA line: [2026-06-08T02:05:02Z] [OK] Backed up Plex DB: D:\PlexTools\backups\scarflix_v2\plex_db\plex_before_visible_catalog_qa_20260608_120501.db
- 2026-06-08T01:18:52Z - Durable PlatformGate runner PASS: Step platform_gate_pass; owner_pid=44064; child_pid=
- 2026-06-08T01:18:52Z - PlatformGate checkpoint PASS: Step platform_gate_pass; visible=1; blockers=0
- 2026-06-08T01:17:46Z - Durable PlatformGate runner RUNNING: Step running_platform_gate_attempt_1; owner_pid=44064; child_pid=39572
- 2026-06-08T01:17:46Z - PlatformGate checkpoint RUNNING: Step running_platform_gate_attempt_1; visible=1; blockers=0
- 2026-06-08T01:15:19.893Z - Direct STRM Playback QA Failing; Publisher Paused - 2026-06-08 10:10: Current audit result: Actual direct `.strm` files visible in Streaming libraries: movies `43`, TV `24`, total `67`. Staged candidate publisher now has `50` staged candidates held. Direct URL/range testing is not the blocker: 5 direct `.strm` sample URLs passed byte-range testing (`5/5` returned `206`).
- 2026-06-08T01:15:10Z - Autonomous controller: PLATFORM_GATE_CHILD_ACTIVE: PlatformGate child QA activity is fresh; no duplicate runner launch