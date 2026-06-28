# ScarFLIX v2 Watchdog + Stall Detector

Updated UTC: 2026-06-28T01:50:40Z
Status: REVIEW
Stall risk: Medium
Will progress without Codex: True
Current milestone: PLATFORM_GATE_RUNNING

## Signals
- Controller age minutes: 5
- Platform checkpoint age minutes: 5
- Dashboard age minutes: 6
- Mirror age minutes: 4
- Movie STRM count: 17
- TV STRM count: 0
- Total STRM count: 17

## Actions
- JasonOS_Prime_OutcomeDashboard: run_triggered
- JasonOS_Prime_PublicMirrorPublisher: skipped_orchestrator_owned

## Notes
- Dashboard status was disabled or stale; watchdog triggered dashboard task.
- Public mirror status was disabled or stale; watchdog triggered mirror task.
