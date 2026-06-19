# ScarFLIX v2 Watchdog + Stall Detector

Updated UTC: 2026-06-19T23:27:03Z
Status: REVIEW
Stall risk: Medium
Will progress without Codex: True
Current milestone: PLATFORM_GATE_RUNNING

## Signals
- Controller age minutes: 7
- Platform checkpoint age minutes: 1
- Dashboard age minutes: 1
- Mirror age minutes: 3
- Movie STRM count: 43
- TV STRM count: 0
- Total STRM count: 43

## Actions
- JasonOS_Prime_PublicMirrorPublisher: skipped_orchestrator_owned

## Notes
- Controller status is stale, but PlatformGate durable progress is fresh; no recovery action required.
- Public mirror status was disabled or stale; watchdog triggered mirror task.
- Transient provider/WebDAV failures are being held for retry, not pruned: 1
