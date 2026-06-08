# ScarFLIX v2 Watchdog + Stall Detector

Updated UTC: 2026-06-08T15:30:54Z
Status: REVIEW
Stall risk: Medium
Will progress without Codex: True
Current milestone: CANDIDATE_SOURCE_MODEL_PENDING

## Signals
- Controller age minutes: 11
- Platform checkpoint age minutes: 852
- Dashboard age minutes: 2
- Mirror age minutes: 6
- Movie STRM count: 2
- TV STRM count: 0
- Total STRM count: 2

## Actions
- ScarFLIX_v2_AutonomousController: run_triggered
- JasonOS_Prime_PublicMirrorPublisher: run_triggered
- ScarFLIX_v2_AutonomousController: run_triggered

## Notes
- Controller status is stale or missing; watchdog triggered controller task.
- Public mirror status was disabled or stale; watchdog triggered mirror task.
- Catalogue count has not changed during expansion/candidate milestone; watchdog triggered controller.
- Swarm escalation requested: multiple recovery actions were needed in one watchdog cycle.
