# ScarFLIX v2 Watchdog + Stall Detector

Updated UTC: 2026-06-06T09:55:26Z
Status: REVIEW
Stall risk: Medium
Will progress without Codex: True
Current milestone: PLATFORM_GATE_RUNNING

## Signals
- Controller age minutes: 11
- Platform checkpoint age minutes: 12
- Dashboard age minutes: 2
- Mirror age minutes: 5
- Movie STRM count: 1
- TV STRM count: 0
- Total STRM count: 1

## Actions
- ScarFLIX_v2_AutonomousController: run_triggered
- ScarFLIX_v2_AutonomousController: run_triggered

## Notes
- Controller status is stale or missing; watchdog triggered controller task.
- PlatformGate progress is stale during PlatformGate milestone; watchdog triggered controller/runner.
- Transient provider/WebDAV failures are being held for retry, not pruned: 8
