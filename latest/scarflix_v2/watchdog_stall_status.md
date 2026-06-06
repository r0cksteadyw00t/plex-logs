# ScarFLIX v2 Watchdog + Stall Detector

Updated UTC: 2026-06-06T10:16:12Z
Status: REVIEW
Stall risk: Medium
Will progress without Codex: True
Current milestone: PLATFORM_GATE_RUNNING

## Signals
- Controller age minutes: 5
- Platform checkpoint age minutes: 15
- Dashboard age minutes: 5
- Mirror age minutes: 6
- Movie STRM count: 1
- TV STRM count: 0
- Total STRM count: 1

## Actions
- ScarFLIX_v2_AutonomousController: enabled
- ScarFLIX_v2_AutonomousController: run_triggered
- ScarFLIX_v2_PlatformGate_LocalRunner_Detached: enabled
- JasonOS_Prime_PublicMirrorPublisher: run_triggered

## Notes
- Controller task was disabled; watchdog attempted to enable and run it.
- PlatformGate progress is stale during PlatformGate milestone; watchdog triggered controller/runner.
- Public mirror status was disabled or stale; watchdog triggered mirror task.
- Transient provider/WebDAV failures are being held for retry, not pruned: 8
- Swarm escalation requested: multiple recovery actions were needed in one watchdog cycle.
