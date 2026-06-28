# ScarFLIX v2 Watchdog + Stall Detector

Updated UTC: 2026-06-28T00:30:34Z
Status: REVIEW
Stall risk: Medium
Will progress without Codex: True
Current milestone: PLATFORM_GATE_RUNNING

## Signals
- Controller age minutes: 5
- Platform checkpoint age minutes: 4
- Dashboard age minutes: 6
- Mirror age minutes: 3
- Movie STRM count: 13
- TV STRM count: 0
- Total STRM count: 13

## Actions
- JasonOS_Prime_OutcomeDashboard: run_triggered
- JasonOS_Prime_PublicMirrorPublisher: skipped_orchestrator_owned

## Notes
- Dashboard status was disabled or stale; watchdog triggered dashboard task.
- Public mirror status was disabled or stale; watchdog triggered mirror task.
