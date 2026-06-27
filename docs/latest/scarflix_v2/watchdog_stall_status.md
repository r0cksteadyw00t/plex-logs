# ScarFLIX v2 Watchdog + Stall Detector

Updated UTC: 2026-06-27T12:27:31Z
Status: REVIEW
Stall risk: Medium
Will progress without Codex: True
Current milestone: PLATFORM_GATE_RUNNING

## Signals
- Controller age minutes: 7
- Platform checkpoint age minutes: 9
- Dashboard age minutes: 6
- Mirror age minutes: 5
- Movie STRM count: 8
- TV STRM count: 0
- Total STRM count: 8

## Actions
- ScarFLIX_v2_AutonomousController: run_triggered
- JasonOS_Prime_OutcomeDashboard: run_triggered
- JasonOS_Prime_PublicMirrorPublisher: skipped_orchestrator_owned

## Notes
- Controller status is stale, but PlatformGate durable progress is fresh; no recovery action required.
- PlatformGate progress is stale during PlatformGate milestone; watchdog triggered controller/runner.
- Dashboard status was disabled or stale; watchdog triggered dashboard task.
- Public mirror status was disabled or stale; watchdog triggered mirror task.
- Swarm escalation requested: multiple recovery actions were needed in one watchdog cycle.
