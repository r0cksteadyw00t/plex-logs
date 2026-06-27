# ScarFLIX v2 Watchdog + Stall Detector

Updated UTC: 2026-06-27T12:51:49Z
Status: REVIEW
Stall risk: Medium
Will progress without Codex: True
Current milestone: PLATFORM_GATE_RUNNING

## Signals
- Controller age minutes: 6
- Platform checkpoint age minutes: 5
- Dashboard age minutes: 4
- Mirror age minutes: 1
- Movie STRM count: 6
- TV STRM count: 0
- Total STRM count: 6

## Actions
- platform_gate.lock: removed_stale_lock_age_6_min_backup_D:\PlexTools\state\scarflix_v2\platform_gate.lock.stale_20260627_225135.bak
- JasonOS_Prime_PublicMirrorPublisher: skipped_orchestrator_owned

## Notes
- Stale lock recovered: removed_stale_lock_age_6_min_backup_D:\PlexTools\state\scarflix_v2\platform_gate.lock.stale_20260627_225135.bak
- Controller status is stale, but PlatformGate durable progress is fresh; no recovery action required.
- Public mirror status was disabled or stale; watchdog triggered mirror task.
