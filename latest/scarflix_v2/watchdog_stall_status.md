# ScarFLIX v2 Watchdog + Stall Detector

Updated UTC: 2026-06-20T05:42:46Z
Status: REVIEW
Stall risk: Medium
Will progress without Codex: True
Current milestone: PLATFORM_GATE_RUNNING

## Signals
- Controller age minutes: 2
- Platform checkpoint age minutes: 9
- Dashboard age minutes: 1
- Mirror age minutes: 3
- Movie STRM count: 42
- TV STRM count: 1
- Total STRM count: 43

## Actions
- ScarFLIX_v2_AutonomousController: run_triggered
- ScarFLIX_v2_DurablePlatformGateRunner: run_triggered
- JasonOS_Prime_PublicMirrorPublisher: skipped_orchestrator_owned

## Notes
- PlatformGate progress is stale during PlatformGate milestone; watchdog triggered controller/runner.
- Public mirror status was disabled or stale; watchdog triggered mirror task.
- Swarm escalation requested: multiple recovery actions were needed in one watchdog cycle.
