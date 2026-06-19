# ScarFLIX v2 Watchdog + Stall Detector

Updated UTC: 2026-06-19T17:05:57Z
Status: REVIEW
Stall risk: Medium
Will progress without Codex: True
Current milestone: CANDIDATE_SOURCE_MODEL_PASS

## Signals
- Controller age minutes: 4
- Platform checkpoint age minutes: 16787
- Dashboard age minutes: 6
- Mirror age minutes: 2
- Movie STRM count: 43
- TV STRM count: 0
- Total STRM count: 43

## Actions
- JasonOS_Prime_OutcomeDashboard: run_triggered
- JasonOS_Prime_PublicMirrorPublisher: skipped_orchestrator_owned

## Notes
- Dashboard status was disabled or stale; watchdog triggered dashboard task.
- Public mirror status was disabled or stale; watchdog triggered mirror task.
