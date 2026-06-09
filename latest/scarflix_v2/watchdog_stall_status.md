# ScarFLIX v2 Watchdog + Stall Detector

Updated UTC: 2026-06-09T11:15:14Z
Status: REVIEW
Stall risk: Medium
Will progress without Codex: True
Current milestone: CANDIDATE_SOURCE_MODEL_PASS

## Signals
- Controller age minutes: 11
- Platform checkpoint age minutes: 2036
- Dashboard age minutes: 1
- Mirror age minutes: 1
- Movie STRM count: 1
- TV STRM count: 1
- Total STRM count: 2

## Actions
- ScarFLIX_v2_AutonomousController: run_triggered
- ScarFLIX_v2_AutonomousController: run_triggered

## Notes
- Controller status is stale or missing; watchdog triggered controller task.
- Catalogue count has not changed during expansion/candidate milestone; watchdog triggered controller.
