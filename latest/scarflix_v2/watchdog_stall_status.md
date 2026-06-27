# ScarFLIX v2 Watchdog + Stall Detector

Updated UTC: 2026-06-27T10:13:03Z
Status: REVIEW
Stall risk: Medium
Will progress without Codex: True
Current milestone: PLATFORM_GATE_RUNNING

## Signals
- Controller age minutes: 4
- Platform checkpoint age minutes: 2
- Dashboard age minutes: 6
- Mirror age minutes: 3
- Movie STRM count: 58203
- TV STRM count: 1
- Total STRM count: 58204

## Actions
- platform_gate.lock: removed_stale_lock_age_5_min_backup_D:\PlexTools\state\scarflix_v2\platform_gate.lock.stale_20260627_201251.bak
- JasonOS_Prime_OutcomeDashboard: run_triggered
- JasonOS_Prime_PublicMirrorPublisher: skipped_orchestrator_owned

## Notes
- Stale lock recovered: removed_stale_lock_age_5_min_backup_D:\PlexTools\state\scarflix_v2\platform_gate.lock.stale_20260627_201251.bak
- Dashboard status was disabled or stale; watchdog triggered dashboard task.
- Public mirror status was disabled or stale; watchdog triggered mirror task.
- Swarm escalation requested: multiple recovery actions were needed in one watchdog cycle.
