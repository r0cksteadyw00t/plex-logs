# ScarFLIX v2 Watchdog + Stall Detector

Updated UTC: 2026-06-08T01:55:04Z
Status: REVIEW
Stall risk: Medium
Will progress without Codex: True
Current milestone: CANDIDATE_SOURCE_MODEL_PENDING

## Signals
- Controller age minutes: 5
- Platform checkpoint age minutes: 36
- Dashboard age minutes: 0
- Mirror age minutes: 0
- Movie STRM count: 52
- TV STRM count: 30
- Total STRM count: 82

## Actions
- ScarFLIX_v2_AutonomousController: run_triggered

## Notes
- Catalogue count has not changed during expansion/candidate milestone; watchdog triggered controller.
- Transient provider/WebDAV failures are being held for retry, not pruned: 3
