# JasonOS Prime Recent Updates

Updated UTC: 2026-06-06T10:41:34Z

- 2026-06-06T10:41:34Z - Dashboard stall recovered: Watchdog task was re-enabled, stale PlatformGate locks were backed up and removed, controller was retriggered, and InstantStatus was made non-recursive.
- 2026-06-06T09:36:00Z - Five-minute watchdog and retry hardening applied: Installed the watchdog scheduled task, added five-minute stall detection, and changed repeated transient PlatformGate reviews to retry/backoff instead of BLOCKED_LOOP.
- 2026-06-06T08:25:00Z - Watchdog and stall detector added: Created a persistent stall detector, dashboard-triggered fallback, watchdog status files, and Stall Risk dashboard column.
- 2026-06-06T08:19:40Z - Controller schedule re-enabled: Autonomous controller task was enabled and relaunched so future progress does not depend on Codex.
- 2026-06-06T08:18:42Z - Autonomous progress visibility added: Dashboard now shows recent achievements, heartbeat freshness, stall-watch state, and whether Codex is needed.
- 2026-06-06T07:33:14Z - Phone-readable dashboard published: Generated a rendered HTML dashboard and mirrored it to the public repository.
- 2026-06-06T07:14:24Z - Controller/PlatformGate reliability patched: Bounded checkpoint publishing, child-active detection, orphan-lock recovery, and 15-minute stale-progress recovery were added.
- 2026-06-06T07:04:47Z - PlatformGate cycle relaunched locally: Detached PlatformGate restarted with catalogue expansion still disabled.
