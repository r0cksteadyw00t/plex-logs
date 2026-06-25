# ScarFLIX v2 Watchdog + Stall Detector

Updated UTC: 2026-06-25T15:38:52Z
Status: REVIEW
Stall risk: Medium
Will progress without Codex: True
Current milestone: PLATFORM_GATE_RUNNING

## Signals
- Controller age minutes: 0
- Platform checkpoint age minutes: 14
- Dashboard age minutes: 4
- Mirror age minutes: 1
- Movie STRM count: 120
- TV STRM count: 0
- Total STRM count: 120

## Actions
- autonomous_controller.lock: removed_stale_lock_age_5_min_backup_D:\PlexTools\state\scarflix_v2\autonomous_controller.lock.stale_20260626_013851.bak
- ScarFLIX_v2_AutonomousController: run_triggered
- JasonOS_Prime_PublicMirrorPublisher: skipped_orchestrator_owned

## Notes
- Stale lock recovered: removed_stale_lock_age_5_min_backup_D:\PlexTools\state\scarflix_v2\autonomous_controller.lock.stale_20260626_013851.bak
- PlatformGate progress is stale during PlatformGate milestone; watchdog triggered controller/runner.
- Public mirror status was disabled or stale; watchdog triggered mirror task.
- Swarm escalation requested: multiple recovery actions were needed in one watchdog cycle.
