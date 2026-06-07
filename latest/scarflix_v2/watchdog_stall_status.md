# ScarFLIX v2 Watchdog + Stall Detector

Updated UTC: 2026-06-07T12:39:52Z
Status: REVIEW
Stall risk: Medium
Will progress without Codex: True
Current milestone: CANDIDATE_SOURCE_MODEL_PENDING

## Signals
- Controller age minutes: 4
- Platform checkpoint age minutes: 141
- Dashboard age minutes: 1
- Mirror age minutes: 7
- Movie STRM count: 28
- TV STRM count: 10
- Total STRM count: 38

## Actions
- JasonOS_Prime_PublicMirrorPublisher: run_triggered
- ScarFLIX_v2_AutonomousController: run_triggered

## Notes
- Public mirror status was disabled or stale; watchdog triggered mirror task.
- Catalogue count has not changed during expansion/candidate milestone; watchdog triggered controller.
