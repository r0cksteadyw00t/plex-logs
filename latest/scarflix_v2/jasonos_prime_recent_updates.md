# JasonOS Prime Recent Updates

Updated UTC: 2026-06-18T00:00:14.966Z
Source: live status merge

- 2026-06-17T23:55:17Z - Autonomous controller: candidate_source_model_pass: PlatformGate PASS; candidate-source retry/quarantine model verified
- 2026-06-13T07:08:43.775Z - PlatformGate child QA active: Plex client decision QA: Latest child QA line: [2026-06-13T07:08:43Z] [PASS] Decision passed: metadata=46093 title=The Bourne Identity
- 2026-06-08T01:18:52Z - Durable PlatformGate runner PASS: Step platform_gate_pass; owner_pid=44064; child_pid=
- 2026-06-08T01:18:52Z - PlatformGate checkpoint PASS: Step platform_gate_pass; visible=1; blockers=0
- 2026-06-06T10:55:00Z - Watchdog-of-watchdog sentinel added: Added Node sentinel triggered by dashboard and mirror workers so disabled watchdogs, stale locks, stale checkpoints, and stale dashboard/mirror status self-detect and recover without blocking on PowerShell.
- 2026-06-06T10:50:00Z - Redundant sentinel added: Added JasonOS_Prime_Sentinel as watchdog-of-watchdog to re-enable stalled tasks, retrigger recovery, and publish alert state when self-heal cannot resolve.
- 2026-06-06T10:41:34Z - Dashboard stall recovered: Watchdog task was re-enabled, stale PlatformGate locks were backed up and removed, controller was retriggered, and InstantStatus was made non-recursive.
- 2026-06-06T09:36:00Z - Five-minute watchdog and retry hardening applied: Installed the watchdog scheduled task, added five-minute stall detection, and changed repeated transient PlatformGate reviews to retry/backoff instead of BLOCKED_LOOP.
- 2026-06-06T08:25:00Z - Watchdog and stall detector added: Created a persistent stall detector, dashboard-triggered fallback, watchdog status files, and Stall Risk dashboard column.
- 2026-06-06T08:19:40Z - Controller schedule re-enabled: Autonomous controller task was enabled and relaunched so future progress does not depend on Codex.
- 2026-06-06T08:18:42Z - Autonomous progress visibility added: Dashboard now shows recent achievements, heartbeat freshness, stall-watch state, and whether Codex is needed.
- 2026-06-06T07:33:14Z - Phone-readable dashboard published: Generated a rendered HTML dashboard and mirrored it to the public repository.
- 2026-06-06T07:14:24Z - Controller/PlatformGate reliability patched: Bounded checkpoint publishing, child-active detection, orphan-lock recovery, and 15-minute stale-progress recovery were added.
- 2026-06-06T07:04:47Z - PlatformGate cycle relaunched locally: Detached PlatformGate restarted with catalogue expansion still disabled.