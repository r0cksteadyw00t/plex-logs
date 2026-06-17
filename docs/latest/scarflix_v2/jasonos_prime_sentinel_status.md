# JasonOS Prime Sentinel

Updated UTC: 2026-06-17T10:27:40Z
Status: ALERT
Alert level: HIGH
Jason action required: false
Codex action required: true

## Signals
- controller_status: PASS
- controller_milestone: CANDIDATE_SOURCE_MODEL_PASS
- controller_age_minutes: 68
- watchdog_status: REVIEW
- watchdog_risk: Medium
- watchdog_age_minutes: 22
- dashboard_status: PASS
- dashboard_age_minutes: 27
- mirror_status: REVIEW
- mirror_age_minutes: 15
- checkpoint_status: PASS
- checkpoint_step: platform_gate_pass
- checkpoint_age_minutes: 13509
- durable_platform_gate_age_minutes: 13509
- platform_progress_fresh: false

## Recovery Actions
- ScarFLIX_v2_Watchdog_StallDetector: watchdog_stale_or_failed (PASS) enable pid=52948; run pid=45976
- ScarFLIX_v2_AutonomousController: controller_stale_or_blocked (PASS) enable pid=41328; run pid=46564
- JasonOS_Prime_OutcomeDashboard: dashboard_stale (PASS) enable pid=50072; run pid=39108
- JasonOS_Prime_PublicMirrorPublisher: mirror_stale (PASS) skipped_orchestrator_owned job=run_public_mirror_publisher

## Notes
- Same unresolved sentinel signature repeated for three cycles.