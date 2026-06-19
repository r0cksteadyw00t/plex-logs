# ScarFLIX v2 Watchdog + Stall Detector

Updated UTC: 2026-06-19T16:33:12Z
Status: REVIEW
Stall risk: Medium
Will progress without Codex: True
Current milestone: CANDIDATE_SOURCE_MODEL_PASS

## Signals
- Controller age minutes: 11
- Platform checkpoint age minutes: 16754
- Dashboard age minutes: 1
- Mirror age minutes: 0
- Movie STRM count: 20
- TV STRM count: 1
- Total STRM count: 21

## Actions
- ScarFLIX_v2_AutonomousController: run_triggered
- JasonOS_Prime_PublicMirrorPublisher: skipped_orchestrator_owned

## Notes
- Controller status is stale or missing; watchdog triggered controller task.
- Public mirror status was disabled or stale; watchdog triggered mirror task.
