# ScarFLIX v2 Watchdog + Stall Detector

Updated UTC: 2026-06-25T22:15:08Z
Status: REVIEW
Stall risk: Medium
Will progress without Codex: True
Current milestone: PLATFORM_GATE_RUNNING

## Signals
- Controller age minutes: 7
- Platform checkpoint age minutes: 15
- Dashboard age minutes: 0
- Mirror age minutes: 0
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
