# ScarFLIX v2 Watchdog + Stall Detector

Updated UTC: 2026-06-11T04:52:21Z
Status: REVIEW
Stall risk: Medium
Will progress without Codex: True
Current milestone: CANDIDATE_SOURCE_MODEL_PASS

## Signals
- Controller age minutes: 13
- Platform checkpoint age minutes: 4533
- Dashboard age minutes: 2
- Mirror age minutes: 1
- Movie STRM count: 0
- TV STRM count: 1
- Total STRM count: 1

## Actions
- ScarFLIX_v2_AutonomousController: run_triggered
- JasonOS_Prime_PublicMirrorPublisher: skipped_orchestrator_owned
- ScarFLIX_v2_AutonomousController: run_triggered

## Notes
- Controller status is stale or missing; watchdog triggered controller task.
- Public mirror status was disabled or stale; watchdog triggered mirror task.
- Catalogue count has not changed during expansion/candidate milestone; watchdog triggered controller.
- Swarm escalation requested: multiple recovery actions were needed in one watchdog cycle.
