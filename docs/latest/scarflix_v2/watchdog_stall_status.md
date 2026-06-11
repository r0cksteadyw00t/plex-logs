# ScarFLIX v2 Watchdog + Stall Detector

Updated UTC: 2026-06-11T16:30:53Z
Status: REVIEW
Stall risk: Medium
Will progress without Codex: True
Current milestone: BLOCKED_DECISION

## Signals
- Controller age minutes: 9
- Platform checkpoint age minutes: 5231
- Dashboard age minutes: 0
- Mirror age minutes: 3
- Movie STRM count: 0
- TV STRM count: 1
- Total STRM count: 1

## Actions
- ScarFLIX_v2_AutonomousController: run_triggered
- JasonOS_Prime_PublicMirrorPublisher: skipped_orchestrator_owned

## Notes
- Controller status is stale or missing; watchdog triggered controller task.
- Public mirror status was disabled or stale; watchdog triggered mirror task.
