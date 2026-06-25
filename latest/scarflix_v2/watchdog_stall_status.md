# ScarFLIX v2 Watchdog + Stall Detector

Updated UTC: 2026-06-25T22:53:57Z
Status: REVIEW
Stall risk: Medium
Will progress without Codex: True
Current milestone: PLATFORM_GATE_RUNNING

## Signals
- Controller age minutes: 72
- Platform checkpoint age minutes: 13
- Dashboard age minutes: 4
- Mirror age minutes: 1
- Movie STRM count: 7498
- TV STRM count: 1
- Total STRM count: 7499

## Actions
- ScarFLIX_v2_AutonomousController: run_triggered
- ScarFLIX_v2_AutonomousController: run_triggered
- JasonOS_Prime_PublicMirrorPublisher: skipped_orchestrator_owned

## Notes
- Controller status is stale or missing; watchdog triggered controller task.
- PlatformGate progress is stale during PlatformGate milestone; watchdog triggered controller/runner.
- Public mirror status was disabled or stale; watchdog triggered mirror task.
- Swarm escalation requested: multiple recovery actions were needed in one watchdog cycle.
