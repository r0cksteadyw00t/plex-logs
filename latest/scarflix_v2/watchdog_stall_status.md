# ScarFLIX v2 Watchdog + Stall Detector

Updated UTC: 2026-06-06T10:55:14Z
Status: REVIEW
Stall risk: Medium
Will progress without Codex: True
Current milestone: PLATFORM_GATE_RUNNING

## Signals
- Controller age minutes: 9
- Platform checkpoint age minutes: 39
- Dashboard age minutes: 4
- Mirror age minutes: 5
- Movie STRM count: 1
- TV STRM count: 0
- Total STRM count: 1

## Actions
- ScarFLIX_v2_AutonomousController: enabled
- ScarFLIX_v2_AutonomousController: run_triggered
- ScarFLIX_v2_AutonomousController: run_triggered
- ScarFLIX_v2_PlatformGate_LocalRunner_Detached: enabled

## Notes
- Controller task was disabled; watchdog attempted to enable and run it.
- Controller status is stale or missing; watchdog triggered controller task.
- PlatformGate progress is stale during PlatformGate milestone; watchdog triggered controller/runner.
- Transient provider/WebDAV failures are being held for retry, not pruned: 8
- Swarm escalation requested: multiple recovery actions were needed in one watchdog cycle.
