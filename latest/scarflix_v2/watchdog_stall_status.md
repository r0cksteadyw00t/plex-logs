# ScarFLIX v2 Watchdog + Stall Detector

Updated UTC: 2026-06-11T14:29:50Z
Status: REVIEW
Stall risk: Medium
Will progress without Codex: True
Current milestone: CANDIDATE_SOURCE_MODEL_PASS

## Signals
- Controller age minutes: 24
- Platform checkpoint age minutes: 5111
- Dashboard age minutes: 5
- Mirror age minutes: 3
- Movie STRM count: 0
- TV STRM count: 0
- Total STRM count: 0

## Actions
- autonomous_controller.lock: removed_stale_lock_age_7_min_backup_D:\PlexTools\state\scarflix_v2\autonomous_controller.lock.stale_20260612_002949.bak
- ScarFLIX_v2_AutonomousController: run_triggered
- JasonOS_Prime_PublicMirrorPublisher: skipped_orchestrator_owned

## Notes
- Stale lock recovered: removed_stale_lock_age_7_min_backup_D:\PlexTools\state\scarflix_v2\autonomous_controller.lock.stale_20260612_002949.bak
- Controller status is stale or missing; watchdog triggered controller task.
- Public mirror status was disabled or stale; watchdog triggered mirror task.
- Swarm escalation requested: multiple recovery actions were needed in one watchdog cycle.
