# ScarFLIX v2 Watchdog + Stall Detector

Updated UTC: 2026-06-25T11:16:59Z
Status: REVIEW
Stall risk: Medium
Will progress without Codex: True
Current milestone: PLATFORM_GATE_RUNNING

## Signals
- Controller age minutes: 14
- Platform checkpoint age minutes: 0
- Dashboard age minutes: 2
- Mirror age minutes: 0
- Movie STRM count: 128
- TV STRM count: 0
- Total STRM count: 128

## Actions
- JasonOS_Prime_PublicMirrorPublisher: skipped_orchestrator_owned

## Notes
- Controller status is stale, but PlatformGate durable progress is fresh; no recovery action required.
- Public mirror status was disabled or stale; watchdog triggered mirror task.
