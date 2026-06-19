# ScarFLIX v2 Watchdog + Stall Detector

Updated UTC: 2026-06-19T16:41:22Z
Status: REVIEW
Stall risk: Medium
Will progress without Codex: True
Current milestone: CANDIDATE_SOURCE_MODEL_PASS

## Signals
- Controller age minutes: 8
- Platform checkpoint age minutes: 16762
- Dashboard age minutes: 1
- Mirror age minutes: 2
- Movie STRM count: 44
- TV STRM count: 1
- Total STRM count: 45

## Actions
- ScarFLIX_v2_AutonomousController: run_triggered
- JasonOS_Prime_PublicMirrorPublisher: skipped_orchestrator_owned

## Notes
- Controller status is stale or missing; watchdog triggered controller task.
- Public mirror status was disabled or stale; watchdog triggered mirror task.
