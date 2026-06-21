# ScarFLIX v2 Watchdog + Stall Detector

Updated UTC: 2026-06-21T16:53:13Z
Status: REVIEW
Stall risk: Medium
Will progress without Codex: True
Current milestone: PLATFORM_GATE_RUNNING

## Signals
- Controller age minutes: 13
- Platform checkpoint age minutes: 2
- Dashboard age minutes: 0
- Mirror age minutes: 0
- Movie STRM count: 25
- TV STRM count: 1
- Total STRM count: 26

## Actions
- platform_gate.lock: removed_stale_lock_age_5_min_backup_D:\PlexTools\state\scarflix_v2\platform_gate.lock.stale_20260622_025313.bak
- JasonOS_Prime_PublicMirrorPublisher: skipped_orchestrator_owned

## Notes
- Stale lock recovered: removed_stale_lock_age_5_min_backup_D:\PlexTools\state\scarflix_v2\platform_gate.lock.stale_20260622_025313.bak
- Controller status is stale, but PlatformGate durable progress is fresh; no recovery action required.
- Public mirror status was disabled or stale; watchdog triggered mirror task.
