# JasonOS Prime Go-Live 16h Campaign Status

- Status: HELD_SENTINEL
- Updated UTC: 2026-06-13T16:58:34Z
- Started UTC: 2026-06-13T13:22:00Z
- Ends UTC: 2026-06-14T05:22:00Z
- Cycle: 36
- Launch health: 24 ms
- Sentinel: ALERT / HIGH
- Active Plex sessions: 0
- Materialized QA: REVIEW checked=2 passed=0 failed=2
- QA cursor: 102
- Last action: suppressed_noncritical_tasks, held_qa_due_sentinel
- Last blocker: sentinel_alert_or_high

Safety:
- PAUSE_PUBLICATION remains active.
- No publication or broad catalogue expansion is performed by this runner.
- Materialized QA runs only in bounded batches and is stopped when launch health degrades or Plex sessions appear.
- Plex may be started/recovered, but running Plex is not killed unless a future explicit restart policy is added.
