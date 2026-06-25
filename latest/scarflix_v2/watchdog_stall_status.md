# ScarFLIX v2 Watchdog + Stall Detector

Updated UTC: 2026-06-25T10:36:07Z
Status: REVIEW
Stall risk: Medium
Will progress without Codex: True
Current milestone: PLATFORM_GATE_RUNNING

## Signals
- Controller age minutes: 2
- Platform checkpoint age minutes: 9
- Dashboard age minutes: 1
- Mirror age minutes: 0
- Movie STRM count: 492
- TV STRM count: 0
- Total STRM count: 492

## Actions
- ScarFLIX_v2_AutonomousController: run_triggered
- ScarFLIX_v2_DurablePlatformGateRunner: run_triggered
- JasonOS_Prime_PublicMirrorPublisher: skipped_orchestrator_owned

## Notes
- PlatformGate progress is stale during PlatformGate milestone; watchdog triggered controller/runner.
- Public mirror status was disabled or stale; watchdog triggered mirror task.
- Swarm escalation requested: multiple recovery actions were needed in one watchdog cycle.
