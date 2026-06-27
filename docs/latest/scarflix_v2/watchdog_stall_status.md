# ScarFLIX v2 Watchdog + Stall Detector

Updated UTC: 2026-06-27T13:17:02Z
Status: REVIEW
Stall risk: Medium
Will progress without Codex: True
Current milestone: PLATFORM_GATE_RUNNING

## Signals
- Controller age minutes: 6
- Platform checkpoint age minutes: 5
- Dashboard age minutes: 7
- Mirror age minutes: 2
- Movie STRM count: 2
- TV STRM count: 0
- Total STRM count: 2

## Actions
- platform_gate.lock: removed_stale_lock_age_6_min_backup_D:\PlexTools\state\scarflix_v2\platform_gate.lock.stale_20260627_231646.bak
- JasonOS_Prime_OutcomeDashboard: run_triggered
- JasonOS_Prime_PublicMirrorPublisher: skipped_orchestrator_owned

## Notes
- Stale lock recovered: removed_stale_lock_age_6_min_backup_D:\PlexTools\state\scarflix_v2\platform_gate.lock.stale_20260627_231646.bak
- Controller status is stale, but PlatformGate durable progress is fresh; no recovery action required.
- Dashboard status was disabled or stale; watchdog triggered dashboard task.
- Public mirror status was disabled or stale; watchdog triggered mirror task.
- Swarm escalation requested: multiple recovery actions were needed in one watchdog cycle.
