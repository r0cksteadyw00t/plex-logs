# ScarFLIX v2 Watchdog + Stall Detector

Updated UTC: 2026-06-27T09:17:12Z
Status: REVIEW
Stall risk: Medium
Will progress without Codex: True
Current milestone: PLATFORM_GATE_RUNNING

## Signals
- Controller age minutes: 6
- Platform checkpoint age minutes: 1
- Dashboard age minutes: 4
- Mirror age minutes: 4
- Movie STRM count: 58245
- TV STRM count: 1
- Total STRM count: 58246

## Actions
- JasonOS_Prime_PublicMirrorPublisher: skipped_orchestrator_owned

## Notes
- Controller status is stale, but PlatformGate durable progress is fresh; no recovery action required.
- Public mirror status was disabled or stale; watchdog triggered mirror task.
