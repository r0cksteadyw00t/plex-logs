# ScarFLIX v2 Watchdog + Stall Detector

Updated UTC: 2026-06-07T11:04:13Z
Status: REVIEW
Stall risk: Medium
Will progress without Codex: True
Current milestone: CANDIDATE_SOURCE_MODEL_PENDING

## Signals
- Controller age minutes: 4
- Platform checkpoint age minutes: 45
- Dashboard age minutes: 0
- Mirror age minutes: 2
- Movie STRM count: 1
- TV STRM count: 0
- Total STRM count: 1

## Actions
- ScarFLIX_v2_AutonomousController: run_triggered

## Notes
- Catalogue count has not changed during expansion/candidate milestone; watchdog triggered controller.
- Transient provider/WebDAV failures are being held for retry, not pruned: 7
