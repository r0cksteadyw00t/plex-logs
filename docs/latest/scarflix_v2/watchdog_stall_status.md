# ScarFLIX v2 Watchdog + Stall Detector

Updated UTC: 2026-06-28T00:50:22Z
Status: REVIEW
Stall risk: Medium
Will progress without Codex: True
Current milestone: PLATFORM_GATE_RUNNING

## Signals
- Controller age minutes: 5
- Platform checkpoint age minutes: 3
- Dashboard age minutes: 5
- Mirror age minutes: 1
- Movie STRM count: 14
- TV STRM count: 0
- Total STRM count: 14

## Actions
- platform_gate.lock: removed_stale_lock_age_5_min_backup_D:\PlexTools\state\scarflix_v2\platform_gate.lock.stale_20260628_105021.bak
- JasonOS_Prime_PublicMirrorPublisher: skipped_orchestrator_owned

## Notes
- Stale lock recovered: removed_stale_lock_age_5_min_backup_D:\PlexTools\state\scarflix_v2\platform_gate.lock.stale_20260628_105021.bak
- Public mirror status was disabled or stale; watchdog triggered mirror task.
