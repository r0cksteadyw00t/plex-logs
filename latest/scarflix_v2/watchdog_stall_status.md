# ScarFLIX v2 Watchdog + Stall Detector

Updated UTC: 2026-06-09T16:55:45Z
Status: REVIEW
Stall risk: Medium
Will progress without Codex: True
Current milestone: CANDIDATE_SOURCE_MODEL_PASS

## Signals
- Controller age minutes: 1
- Platform checkpoint age minutes: 2377
- Dashboard age minutes: 0
- Mirror age minutes: 20
- Movie STRM count: 0
- TV STRM count: 0
- Total STRM count: 0

## Actions
- JasonOS_Prime_PublicMirrorPublisher: run_triggered
- ScarFLIX_v2_AutonomousController: run_triggered

## Notes
- Public mirror status was disabled or stale; watchdog triggered mirror task.
- Catalogue count has not changed during expansion/candidate milestone; watchdog triggered controller.
