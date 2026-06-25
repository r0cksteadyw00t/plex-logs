# ScarFLIX v2 Watchdog + Stall Detector

Updated UTC: 2026-06-25T16:40:08Z
Status: REVIEW
Stall risk: Medium
Will progress without Codex: True
Current milestone: PLATFORM_GATE_RUNNING

## Signals
- Controller age minutes: 0
- Platform checkpoint age minutes: 14
- Dashboard age minutes: 5
- Mirror age minutes: 2
- Movie STRM count: 120
- TV STRM count: 0
- Total STRM count: 120

## Actions
- ScarFLIX_v2_AutonomousController: run_triggered
- JasonOS_Prime_PublicMirrorPublisher: skipped_orchestrator_owned

## Notes
- PlatformGate progress is stale during PlatformGate milestone; watchdog triggered controller/runner.
- Public mirror status was disabled or stale; watchdog triggered mirror task.
