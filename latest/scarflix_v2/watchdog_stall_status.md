# ScarFLIX v2 Watchdog + Stall Detector

Updated UTC: 2026-06-08T11:15:04Z
Status: REVIEW
Stall risk: Medium
Will progress without Codex: True
Current milestone: CANDIDATE_SOURCE_MODEL_PENDING

## Signals
- Controller age minutes: 4
- Platform checkpoint age minutes: 596
- Dashboard age minutes: 
- Mirror age minutes: 2
- Movie STRM count: 1
- TV STRM count: 0
- Total STRM count: 1

## Actions
- JasonOS_Prime_OutcomeDashboard: run_triggered
- ScarFLIX_v2_AutonomousController: run_triggered

## Notes
- Dashboard status was disabled or stale; watchdog triggered dashboard task.
- Catalogue count has not changed during expansion/candidate milestone; watchdog triggered controller.
