# ScarFLIX v2 Watchdog + Stall Detector

Updated UTC: 2026-06-06T08:36:05Z
Status: REVIEW
Stall risk: Medium
Will progress without Codex: True
Current milestone: PLATFORM_GATE_RUNNING

## Signals
- Controller age minutes: 3
- Platform checkpoint age minutes: 17
- Dashboard age minutes: 5
- Mirror age minutes: 6
- Movie STRM count: 1
- TV STRM count: 0
- Total STRM count: 1

## Actions
- ScarFLIX_v2_AutonomousController: run_triggered
- ScarFLIX_v2_PlatformGate_LocalRunner_Detached: run_triggered

## Notes
- PlatformGate checkpoint reports blocked_by_runner_lock; watchdog triggered safe recovery tasks.
- Transient provider/WebDAV failures are being held for retry, not pruned: 6
