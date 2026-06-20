# ScarFLIX v2 Watchdog + Stall Detector

Updated UTC: 2026-06-20T09:23:52Z
Status: REVIEW
Stall risk: Medium
Will progress without Codex: True
Current milestone: PLATFORM_GATE_RUNNING

## Signals
- Controller age minutes: 5
- Platform checkpoint age minutes: 2
- Dashboard age minutes: 7
- Mirror age minutes: 0
- Movie STRM count: 7
- TV STRM count: 0
- Total STRM count: 7

## Actions
- autonomous_controller.lock: removed_stale_lock_age_5_min_backup_D:\PlexTools\state\scarflix_v2\autonomous_controller.lock.stale_20260620_190307.bak
- JasonOS_Prime_OutcomeDashboard: run_triggered
- JasonOS_Prime_PublicMirrorPublisher: skipped_orchestrator_owned

## Notes
- Stale lock recovered: removed_stale_lock_age_5_min_backup_D:\PlexTools\state\scarflix_v2\autonomous_controller.lock.stale_20260620_190307.bak
- Dashboard status was disabled or stale; watchdog triggered dashboard task.
- Public mirror status was disabled or stale; watchdog triggered mirror task.
- Swarm escalation requested: multiple recovery actions were needed in one watchdog cycle.
