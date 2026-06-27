# ScarFLIX v2 Watchdog + Stall Detector

Updated UTC: 2026-06-27T21:53:00Z
Status: REVIEW
Stall risk: Medium
Will progress without Codex: True
Current milestone: PLATFORM_GATE_RUNNING

## Signals
- Controller age minutes: 8
- Platform checkpoint age minutes: 2
- Dashboard age minutes: 476
- Mirror age minutes: 7
- Movie STRM count: 11
- TV STRM count: 0
- Total STRM count: 11

## Actions
- JasonOS_Prime_OutcomeDashboard: run_triggered
- JasonOS_Prime_PublicMirrorPublisher: skipped_orchestrator_owned

## Notes
- Controller status is stale, but PlatformGate durable progress is fresh; no recovery action required.
- Dashboard status was disabled or stale; watchdog triggered dashboard task.
- Public mirror status was disabled or stale; watchdog triggered mirror task.
