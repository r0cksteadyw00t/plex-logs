# ScarFLIX v2 Watchdog + Stall Detector

Updated UTC: 2026-06-07T03:42:08Z
Status: REVIEW
Stall risk: Medium
Will progress without Codex: True
Current milestone: PLATFORM_GATE_RUNNING

## Signals
- Controller age minutes: 4
- Platform checkpoint age minutes: 8
- Dashboard age minutes: 0
- Mirror age minutes: 1
- Movie STRM count: 1
- TV STRM count: 0
- Total STRM count: 1

## Actions
- ScarFLIX_v2_AutonomousController: run_triggered
- ScarFLIX_v2_DurablePlatformGateRunner: run_triggered

## Notes
- PlatformGate progress is stale during PlatformGate milestone; watchdog triggered controller/runner.
