# ScarFLIX v2 Watchdog + Stall Detector

Updated UTC: 2026-06-27T00:31:23Z
Status: REVIEW
Stall risk: Medium
Will progress without Codex: True
Current milestone: PLATFORM_GATE_RUNNING

## Signals
- Controller age minutes: 6
- Platform checkpoint age minutes: 1
- Dashboard age minutes: 6
- Mirror age minutes: 3
- Movie STRM count: 58251
- TV STRM count: 1
- Total STRM count: 58252

## Actions
- JasonOS_Prime_OutcomeDashboard: run_triggered
- JasonOS_Prime_PublicMirrorPublisher: skipped_orchestrator_owned

## Notes
- Controller status is stale, but PlatformGate durable progress is fresh; no recovery action required.
- Dashboard status was disabled or stale; watchdog triggered dashboard task.
- Public mirror status was disabled or stale; watchdog triggered mirror task.
