# ScarFLIX v2 Watchdog + Stall Detector

Updated UTC: 2026-06-18T10:50:16Z
Status: REVIEW
Stall risk: Medium
Will progress without Codex: True
Current milestone: CANDIDATE_SOURCE_MODEL_PASS

## Signals
- Controller age minutes: 5
- Platform checkpoint age minutes: 14971
- Dashboard age minutes: 1
- Mirror age minutes: 1
- Movie STRM count: 0
- TV STRM count: 0
- Total STRM count: 0

## Actions
- autonomous_controller.lock: removed_stale_lock_age_5_min_backup_D:\PlexTools\state\scarflix_v2\autonomous_controller.lock.stale_20260618_205007.bak
- JasonOS_Prime_PublicMirrorPublisher: skipped_orchestrator_owned
- ScarFLIX_v2_AutonomousController: run_triggered

## Notes
- Stale lock recovered: removed_stale_lock_age_5_min_backup_D:\PlexTools\state\scarflix_v2\autonomous_controller.lock.stale_20260618_205007.bak
- Public mirror status was disabled or stale; watchdog triggered mirror task.
- Catalogue count has not changed during expansion/candidate milestone; watchdog triggered controller.
- Swarm escalation requested: multiple recovery actions were needed in one watchdog cycle.
