# ScarFLIX v2 Watchdog + Stall Detector

Updated UTC: 2026-06-26T00:26:13Z
Status: REVIEW
Stall risk: Medium
Will progress without Codex: True
Current milestone: PLATFORM_GATE_RUNNING

## Signals
- Controller age minutes: 1
- Platform checkpoint age minutes: 8
- Dashboard age minutes: 6
- Mirror age minutes: 3
- Movie STRM count: 17498
- TV STRM count: 1
- Total STRM count: 17499

## Actions
- ScarFLIX_v2_AutonomousController: run_triggered
- JasonOS_Prime_OutcomeDashboard: run_triggered
- JasonOS_Prime_PublicMirrorPublisher: skipped_orchestrator_owned

## Notes
- PlatformGate progress is stale during PlatformGate milestone; watchdog triggered controller/runner.
- Dashboard status was disabled or stale; watchdog triggered dashboard task.
- Public mirror status was disabled or stale; watchdog triggered mirror task.
- Swarm escalation requested: multiple recovery actions were needed in one watchdog cycle.
