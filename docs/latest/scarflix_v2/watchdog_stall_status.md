# ScarFLIX v2 Watchdog + Stall Detector

Updated UTC: 2026-06-19T09:24:06Z
Status: REVIEW
Stall risk: Medium
Will progress without Codex: True
Current milestone: CANDIDATE_SOURCE_MODEL_PASS

## Signals
- Controller age minutes: 4
- Platform checkpoint age minutes: 16325
- Dashboard age minutes: 4
- Mirror age minutes: 1
- Movie STRM count: 16
- TV STRM count: 1
- Total STRM count: 17

## Actions
- JasonOS_Prime_PublicMirrorPublisher: skipped_orchestrator_owned
- ScarFLIX_v2_AutonomousController: run_triggered

## Notes
- Public mirror status was disabled or stale; watchdog triggered mirror task.
- Catalogue count has not changed during expansion/candidate milestone; watchdog triggered controller.
