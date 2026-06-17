# ScarFLIX v2 Watchdog + Stall Detector

Updated UTC: 2026-06-17T19:22:11Z
Status: REVIEW
Stall risk: Medium
Will progress without Codex: True
Current milestone: CANDIDATE_SOURCE_MODEL_PASS

## Signals
- Controller age minutes: 401
- Platform checkpoint age minutes: 14042
- Dashboard age minutes: 401
- Mirror age minutes: 398
- Movie STRM count: 0
- TV STRM count: 0
- Total STRM count: 0

## Actions
- ScarFLIX_v2_AutonomousController: run_triggered
- JasonOS_Prime_OutcomeDashboard: run_triggered
- JasonOS_Prime_PublicMirrorPublisher: skipped_orchestrator_owned
- ScarFLIX_v2_AutonomousController: run_triggered

## Notes
- Controller status is stale or missing; watchdog triggered controller task.
- Dashboard status was disabled or stale; watchdog triggered dashboard task.
- Public mirror status was disabled or stale; watchdog triggered mirror task.
- Catalogue count has not changed during expansion/candidate milestone; watchdog triggered controller.
- Swarm escalation requested: multiple recovery actions were needed in one watchdog cycle.
