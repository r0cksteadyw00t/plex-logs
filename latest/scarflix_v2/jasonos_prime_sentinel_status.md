# JasonOS Prime Sentinel

Updated UTC: 2026-06-17T19:20:31Z
Status: REVIEW
Alert level: MEDIUM
Jason action required: false
Codex action required: false

## Signals
- controller_status: PASS
- controller_milestone: CANDIDATE_SOURCE_MODEL_PASS
- controller_age_minutes: 400
- watchdog_status: REVIEW
- watchdog_risk: Medium
- watchdog_age_minutes: 400
- dashboard_status: PASS
- dashboard_age_minutes: 400
- mirror_status: PASS
- mirror_age_minutes: 397
- checkpoint_status: PASS
- checkpoint_step: platform_gate_pass
- checkpoint_age_minutes: 14042
- durable_platform_gate_age_minutes: 14042
- platform_progress_fresh: false

## Recovery Actions
- ScarFLIX_v2_Watchdog_StallDetector: watchdog_stale_or_failed (PASS) enable pid=36480; run pid=36496
- ScarFLIX_v2_AutonomousController: controller_stale_or_blocked (PASS) enable pid=36504; run pid=36528
- JasonOS_Prime_OutcomeDashboard: dashboard_stale (PASS) enable pid=36548; run pid=36556
- JasonOS_Prime_PublicMirrorPublisher: mirror_stale (PASS) skipped_orchestrator_owned job=run_public_mirror_publisher

## Notes
- None.