# ScarFLIX v2 Watchdog + Stall Detector

Updated UTC: 2026-06-28T03:57:46Z
Status: REVIEW
Stall risk: Medium
Will progress without Codex: True
Current milestone: PLATFORM_GATE_RUNNING

## Signals
- Controller age minutes: 7
- Platform checkpoint age minutes: 6
- Dashboard age minutes: 3
- Mirror age minutes: 2
- Movie STRM count: 20
- TV STRM count: 0
- Total STRM count: 20

## Actions
- platform_gate.lock: removed_stale_lock_age_7_min_backup_D:\PlexTools\state\scarflix_v2\platform_gate.lock.stale_20260628_135744.bak
- ScarFLIX_v2_AutonomousController: run_triggered
- ScarFLIX_v2_AutonomousController: run_triggered
- ScarFLIX_v2_DurablePlatformGateRunner: run_triggered
- JasonOS_Prime_PublicMirrorPublisher: skipped_orchestrator_owned

## Notes
- Stale lock recovered: removed_stale_lock_age_7_min_backup_D:\PlexTools\state\scarflix_v2\platform_gate.lock.stale_20260628_135744.bak
- Controller status is stale or missing; watchdog triggered controller task.
- PlatformGate progress is stale during PlatformGate milestone; watchdog triggered controller/runner.
- Public mirror status was disabled or stale; watchdog triggered mirror task.
- Swarm escalation requested: multiple recovery actions were needed in one watchdog cycle.
