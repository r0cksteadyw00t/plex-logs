# ScarFLIX v2 Watchdog + Stall Detector

Updated UTC: 2026-06-26T01:31:02Z
Status: REVIEW
Stall risk: Medium
Will progress without Codex: True
Current milestone: PLATFORM_GATE_REVIEW_TRANSIENT_RETRY_SCHEDULED

## Signals
- Controller age minutes: 31
- Platform checkpoint age minutes: 30
- Dashboard age minutes: 6
- Mirror age minutes: 3
- Movie STRM count: 29498
- TV STRM count: 1
- Total STRM count: 29499

## Actions
- ScarFLIX_v2_AutonomousController: run_triggered
- ScarFLIX_v2_AutonomousController: run_triggered
- JasonOS_Prime_OutcomeDashboard: run_triggered
- JasonOS_Prime_PublicMirrorPublisher: skipped_orchestrator_owned

## Notes
- Controller status is stale or missing; watchdog triggered controller task.
- PlatformGate progress is stale during PlatformGate milestone; watchdog triggered controller/runner.
- Dashboard status was disabled or stale; watchdog triggered dashboard task.
- Public mirror status was disabled or stale; watchdog triggered mirror task.
- Swarm escalation requested: multiple recovery actions were needed in one watchdog cycle.
