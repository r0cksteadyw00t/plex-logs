# ScarFLIX v2 Watchdog + Stall Detector

Updated UTC: 2026-06-06T11:19:03Z
Status: REVIEW
Stall risk: Medium
Will progress without Codex: True
Current milestone: PLATFORM_GATE_RUNNING

## Signals
- Controller age minutes: 3
- Platform checkpoint age minutes: 13
- Dashboard age minutes: 3
- Mirror age minutes: 4
- Movie STRM count: 1
- TV STRM count: 0
- Total STRM count: 1

## Actions
- ScarFLIX_v2_AutonomousController: run_triggered

## Notes
- PlatformGate progress is stale during PlatformGate milestone; watchdog triggered controller/runner.
- Transient provider/WebDAV failures are being held for retry, not pruned: 8
