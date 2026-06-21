# ScarFLIX v2 Watchdog + Stall Detector

Updated UTC: 2026-06-21T17:25:14Z
Status: REVIEW
Stall risk: Medium
Will progress without Codex: True
Current milestone: PLATFORM_GATE_RUNNING

## Signals
- Controller age minutes: 8
- Platform checkpoint age minutes: 0
- Dashboard age minutes: 0
- Mirror age minutes: 0
- Movie STRM count: 21
- TV STRM count: 1
- Total STRM count: 22

## Actions
- JasonOS_Prime_PublicMirrorPublisher: skipped_orchestrator_owned

## Notes
- Controller status is stale, but PlatformGate durable progress is fresh; no recovery action required.
- Public mirror status was disabled or stale; watchdog triggered mirror task.
