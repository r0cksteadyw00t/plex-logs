# ScarFLIX v2 Watchdog + Stall Detector

Updated UTC: 2026-06-07T10:59:19Z
Status: REVIEW
Stall risk: Medium
Will progress without Codex: True
Current milestone: CANDIDATE_SOURCE_MODEL_PENDING

## Signals
- Controller age minutes: 11
- Platform checkpoint age minutes: 40
- Dashboard age minutes: 0
- Mirror age minutes: 1
- Movie STRM count: 1
- TV STRM count: 0
- Total STRM count: 1

## Actions
- ScarFLIX_v2_AutonomousController: run_triggered
- ScarFLIX_v2_AutonomousController: run_triggered

## Notes
- Controller status is stale or missing; watchdog triggered controller task.
- Catalogue count has not changed during expansion/candidate milestone; watchdog triggered controller.
- Transient provider/WebDAV failures are being held for retry, not pruned: 7
