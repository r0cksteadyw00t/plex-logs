# ScarFLIX v2 Watchdog + Stall Detector

Updated UTC: 2026-06-24T21:55:42Z
Status: REVIEW
Stall risk: Medium
Will progress without Codex: True
Current milestone: PLATFORM_GATE_RUNNING

## Signals
- Controller age minutes: 9
- Platform checkpoint age minutes: 7
- Dashboard age minutes: 10
- Mirror age minutes: 5
- Movie STRM count: 0
- TV STRM count: 0
- Total STRM count: 0

## Actions
- ScarFLIX_v2_AutonomousController: run_triggered
- ScarFLIX_v2_AutonomousController: run_triggered
- ScarFLIX_v2_DurablePlatformGateRunner: run_triggered
- JasonOS_Prime_OutcomeDashboard: run_triggered
- JasonOS_Prime_PublicMirrorPublisher: skipped_orchestrator_owned

## Notes
- Controller status is stale or missing; watchdog triggered controller task.
- PlatformGate progress is stale during PlatformGate milestone; watchdog triggered controller/runner.
- Dashboard status was disabled or stale; watchdog triggered dashboard task.
- Public mirror status was disabled or stale; watchdog triggered mirror task.
- Swarm escalation requested: multiple recovery actions were needed in one watchdog cycle.
