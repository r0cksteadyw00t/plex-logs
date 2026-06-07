# ScarFLIX v2 Watchdog + Stall Detector

Updated UTC: 2026-06-07T00:12:18Z
Status: REVIEW
Stall risk: Medium
Will progress without Codex: True
Current milestone: PLATFORM_GATE_FAIL_SOURCE_QUARANTINE_REQUIRED

## Signals
- Controller age minutes: 1
- Platform checkpoint age minutes: 7
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
- Transient provider/WebDAV failures are being held for retry, not pruned: 13
