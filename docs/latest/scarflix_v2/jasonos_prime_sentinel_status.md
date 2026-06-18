# JasonOS Prime Sentinel

Updated UTC: 2026-06-18T07:45:04Z
Status: REVIEW
Alert level: MEDIUM
Jason action required: false
Codex action required: false

## Signals
- controller_status: PASS
- controller_milestone: CANDIDATE_SOURCE_MODEL_PASS
- controller_age_minutes: 20
- watchdog_status: REVIEW
- watchdog_risk: Medium
- watchdog_age_minutes: 20
- dashboard_status: PASS
- dashboard_age_minutes: 20
- mirror_status: REVIEW_RECOVERABLE
- mirror_age_minutes: 22
- checkpoint_status: PASS
- checkpoint_step: platform_gate_pass
- checkpoint_age_minutes: 14786
- durable_platform_gate_age_minutes: 14786
- platform_progress_fresh: false

## Recovery Actions
- ScarFLIX_v2_Watchdog_StallDetector: watchdog_stale_or_failed (PASS) enable pid=5276; run pid=16876
- ScarFLIX_v2_AutonomousController: controller_stale_or_blocked (PASS) enable pid=24624; run pid=24636
- JasonOS_Prime_OutcomeDashboard: dashboard_stale (PASS) enable pid=24648; run pid=24660
- JasonOS_Prime_PublicMirrorPublisher: mirror_stale (PASS) skipped_orchestrator_owned job=run_public_mirror_publisher

## Notes
- None.