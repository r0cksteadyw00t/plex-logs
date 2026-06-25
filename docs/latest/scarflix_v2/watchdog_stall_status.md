# ScarFLIX v2 Watchdog + Stall Detector

Updated UTC: 2026-06-25T19:50:17Z
Status: REVIEW
Stall risk: Medium
Will progress without Codex: True
Current milestone: PLATFORM_GATE_RUNNING

## Signals
- Controller age minutes: 4
- Platform checkpoint age minutes: 13
- Dashboard age minutes: 0
- Mirror age minutes: 0
- Movie STRM count: 0
- TV STRM count: 0
- Total STRM count: 0

## Actions
- ScarFLIX_v2_AutonomousController: run_triggered
- JasonOS_Prime_PublicMirrorPublisher: skipped_orchestrator_owned

## Notes
- PlatformGate progress is stale during PlatformGate milestone; watchdog triggered controller/runner.
- Public mirror status was disabled or stale; watchdog triggered mirror task.
