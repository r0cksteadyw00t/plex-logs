# ScarFLIX v2 Watchdog + Stall Detector

Updated UTC: 2026-06-25T17:43:41Z
Status: REVIEW
Stall risk: Medium
Will progress without Codex: True
Current milestone: PLATFORM_GATE_RUNNING

## Signals
- Controller age minutes: 0
- Platform checkpoint age minutes: 7
- Dashboard age minutes: 3
- Mirror age minutes: 1
- Movie STRM count: 0
- TV STRM count: 0
- Total STRM count: 0

## Actions
- ScarFLIX_v2_AutonomousController: run_triggered
- ScarFLIX_v2_DurablePlatformGateRunner: run_triggered
- JasonOS_Prime_PublicMirrorPublisher: skipped_orchestrator_owned

## Notes
- PlatformGate progress is stale during PlatformGate milestone; watchdog triggered controller/runner.
- Public mirror status was disabled or stale; watchdog triggered mirror task.
- Swarm escalation requested: multiple recovery actions were needed in one watchdog cycle.
