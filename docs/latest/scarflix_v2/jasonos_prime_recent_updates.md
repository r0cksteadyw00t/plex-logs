# JasonOS Prime Recent Updates

Updated UTC: 2026-06-07T00:26:02.815Z
Source: live status merge

- 2026-06-07T00:25:51.032Z - PlatformGate child QA active: Plex visible/HLS QA: Latest child QA line: [2026-06-07T00:25:51Z] [REVIEW] QA failed: part=112088 title=Harry Potter and the Goblet of Fire reason=Plex Transcoder HLS probe timed out
- 2026-06-07T00:25:50Z - Durable PlatformGate runner RUNNING: Step running_platform_gate_attempt_1; owner_pid=13964; child_pid=38248
- 2026-06-07T00:25:50Z - PlatformGate checkpoint RUNNING: Step running_platform_gate_attempt_1; visible=78; blockers=0
- 2026-06-07T00:23:26.892Z - JasonOS Prime / ScarFLIX Update - 2026-06-07 10:22: Jason reported the status continued to look unchanged since overnight. Finding: This was a real control-flow stall, not just a stale dashboard. The repeated loop was: PlatformGate REVIEW -> WebDAV ActiveGate transient HTTP `503` failures -> relaunch PlatformGate -> same REVIEW.
- 2026-06-07T00:23:07Z - Autonomous controller: PLATFORM_GATE_CHILD_ACTIVE: PlatformGate child QA activity is fresh; no duplicate runner launch
- 2026-06-07T00:19:02.845Z - JasonOS Prime / ScarFLIX Update - 2026-06-07 09:58: Jason reported the dashboard/status still looked unchanged since overnight. Finding: The system was not simply idle; it was caught in a control-loop. Latest ActiveGate result: `REVIEW`, visible checked `78`, passed `65`, failed `13`.
- 2026-06-07T00:13:44.700Z - PlatformGate child QA active: WebDAV active gate: Latest child QA line: [2026-06-07T00:13:44Z] [INFO] Running concurrent WebDAV active gate worker for 65 entries.
- 2026-06-07T00:11:23Z - Autonomous controller: repeated_transient_source_quarantine_started: Repeated transient-only PlatformGate REVIEW reached retry cap; started source/release quarantine with IncludeTransient so failed sources are removed from visibility while titles remain wanted
- 2026-06-07T00:05:41Z - Durable PlatformGate runner REVIEW: Step platform_gate_review; owner_pid=28312; child_pid=
- 2026-06-07T00:05:41Z - PlatformGate checkpoint REVIEW: Step platform_gate_review; visible=78; blockers=0
- 2026-06-06T23:59:52Z - Autonomous controller: PLATFORM_GATE_RUNNING: PlatformGate runner already running; no inline wait
- 2026-06-06T23:53:09.986Z - JasonOS Prime / ScarFLIX Update - 2026-06-07 08:47: PlatformGate progress was checked after Jason reported no visible dashboard update since `Durable PlatformGate runner RUNNING 2026-06-06T22:32:39Z`. Finding: PlatformGate had not stalled. Durable runner/checkpoint progress was fresh at `2026-06-06T22:47:10Z`.
- 2026-06-06T22:43:28.018Z - JasonOS Prime / ScarFLIX Update - 2026-06-07 08:21: Phone-facing GitHub Pages dashboard delivery was repaired. Cause: GitHub Pages for `r0cksteadyw00t/plex-logs` is configured to publish from `main:/docs`. `JasonOS_Prime_PublicMirrorPublisher.js` was publishing live dashboard HTML/JSON to repository-root `latest/...`, which made raw/API status current but left the Pa...
- 2026-06-06T22:18:23.534Z - JasonOS Prime / ScarFLIX Update - 2026-06-07 08:12: The dashboard `Recent achievements` panel was stale even though the main dashboard/status JSON was current. Cause: `D:\PlexTools\public\latest\scarflix_v2\jasonos_prime_recent_updates.json` was frozen at `2026-06-06T10:55:00Z`. `JasonOS_Prime_OutcomeDashboard.js` returned that stored file unchanged whenever it existed.