# ScarFLIX v2 Watchdog + Stall Detector

Updated UTC: 2026-06-26T02:08:44Z
Status: REVIEW
Stall risk: Medium
Will progress without Codex: True
Current milestone: PLATFORM_GATE_RUNNING

## Signals
- Controller age minutes: 1
- Platform checkpoint age minutes: 15
- Dashboard age minutes: 3
- Mirror age minutes: 1
- Movie STRM count: 37498
- TV STRM count: 1
- Total STRM count: 37499

## Actions
- ScarFLIX_v2_AutonomousController: run_triggered
- JasonOS_Prime_PublicMirrorPublisher: skipped_orchestrator_owned

## Notes
- PlatformGate progress is stale during PlatformGate milestone; watchdog triggered controller/runner.
- Public mirror status was disabled or stale; watchdog triggered mirror task.
