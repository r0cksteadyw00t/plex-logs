# ScarFLIX v2 Watchdog + Stall Detector

Updated UTC: 2026-06-10T12:56:50Z
Status: REVIEW
Stall risk: Medium
Will progress without Codex: True
Current milestone: BLOCKED_DECISION

## Signals
- Controller age minutes: 28
- Platform checkpoint age minutes: 3578
- Dashboard age minutes: 2
- Mirror age minutes: 0
- Movie STRM count: 0
- TV STRM count: 1
- Total STRM count: 1

## Actions
- ScarFLIX_v2_AutonomousController: run_triggered
- JasonOS_Prime_PublicMirrorPublisher: skipped_orchestrator_owned

## Notes
- Controller status is stale or missing; watchdog triggered controller task.
- Public mirror status was disabled or stale; watchdog triggered mirror task.
