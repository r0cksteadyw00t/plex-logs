# ScarFLIX v2 Watchdog + Stall Detector

Updated UTC: 2026-06-25T21:05:18Z
Status: REVIEW
Stall risk: Medium
Will progress without Codex: True
Current milestone: PLATFORM_GATE_RUNNING

## Signals
- Controller age minutes: 80
- Platform checkpoint age minutes: 18
- Dashboard age minutes: 5
- Mirror age minutes: 2
- Movie STRM count: 3598
- TV STRM count: 1
- Total STRM count: 3599

## Actions
- ScarFLIX_v2_AutonomousController: run_triggered
- ScarFLIX_v2_AutonomousController: run_triggered
- JasonOS_Prime_PublicMirrorPublisher: skipped_orchestrator_owned

## Notes
- Controller status is stale or missing; watchdog triggered controller task.
- PlatformGate progress is stale during PlatformGate milestone; watchdog triggered controller/runner.
- Public mirror status was disabled or stale; watchdog triggered mirror task.
- Swarm escalation requested: multiple recovery actions were needed in one watchdog cycle.
