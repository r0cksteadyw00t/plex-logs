# ScarFLIX v2 Watchdog + Stall Detector

Updated UTC: 2026-06-26T03:26:50Z
Status: REVIEW
Stall risk: Medium
Will progress without Codex: True
Current milestone: PLATFORM_GATE_REVIEW_TRANSIENT_RETRY_SCHEDULED

## Signals
- Controller age minutes: 42
- Platform checkpoint age minutes: 42
- Dashboard age minutes: 55
- Mirror age minutes: 53
- Movie STRM count: 43498
- TV STRM count: 1
- Total STRM count: 43499

## Actions
- platform_gate.lock: removed_stale_lock_age_6_min_backup_D:\PlexTools\state\scarflix_v2\platform_gate.lock.stale_20260626_132648.bak
- ScarFLIX_v2_AutonomousController: run_triggered
- ScarFLIX_v2_AutonomousController: run_triggered
- ScarFLIX_v2_DurablePlatformGateRunner: run_triggered
- JasonOS_Prime_OutcomeDashboard: run_triggered
- JasonOS_Prime_PublicMirrorPublisher: skipped_orchestrator_owned

## Notes
- Stale lock recovered: removed_stale_lock_age_6_min_backup_D:\PlexTools\state\scarflix_v2\platform_gate.lock.stale_20260626_132648.bak
- Controller status i# ScarFLIX v2 Watchdog + Stall Detector

Updated UTC: 2026-06-26T03:26:50Z
Status: REVIEW
Stall risk: Medium
Will progress without Codex: True
Current milestone: PLATFORM_GATE_REVIEW_TRANSIENT_RETRY_SCHEDULED

## Signals
- Controller age minutes: 42
- Platform checkpoint age minutes: 42
- Dashboard age minutes: 55
- Mirror age minutes: 53
- Movie STRM count: 43498
- TV STRM count: 1
- Total STRM count: 43499

## Actions
- platform_gate.lock: removed_stale_lock_age_6_min_backup_D:\PlexTools\state\scarflix_v2\platform_gate.lock.stale_20260626_132648.bak
- ScarFLIX_v2_AutonomousController: run_triggered
- ScarFLIX_v2_AutonomousController: run_triggered
- ScarFLIX_v2_DurablePlatformGateRunner: run_triggered
- JasonOS_Prime_OutcomeDashboard: run_triggered
- JasonOS_Prime_PublicMirrorPublisher: skipped_orchestrator_owned

## Notes
- Stale lock recovered: removed_stale_lock_age_6_min_backup_D:\PlexTools\state\scarflix_v2\platform_gate.lock.stale_20260626_132648.bak
- Controller status is stale or missing; watchdog triggered controller task.
- PlatformGate progress is stale during PlatformGate milestone; watchdog triggered controller/runner.
- Dashboard status was disabled or stale; watchdog triggered dashboard task.
- Public mirror status was disabled or stale; watchdog triggered mirror task.
- Swarm escalation requested: multiple recovery actions were needed in one watchdog cycle.
