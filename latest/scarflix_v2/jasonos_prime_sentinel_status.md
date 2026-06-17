# JasonOS Prime Sentinel

Updated UTC: 2026-06-17T11:00:35Z
Status: ALERT
Alert level: HIGH
Jason action required: false
Codex action required: true

## Signals
- controller_status: PASS
- controller_milestone: CANDIDATE_SOURCE_MODEL_PASS
- controller_age_minutes: 100
- watchdog_status: REVIEW
- watchdog_risk: Medium
- watchdog_age_minutes: 55
- dashboard_status: PASS
- dashboard_age_minutes: 60
- mirror_status: PASS
- mirror_age_minutes: 14
- checkpoint_status: PASS
- checkpoint_step: platform_gate_pass
- checkpoint_age_minutes: 13542
- durable_platform_gate_age_minutes: 13542
- platform_progress_fresh: false

## Recovery Actions
- ScarFLIX_v2_Watchdog_StallDetector: watchdog_stale_or_failed (PASS) enable pid=51712; run pid=44468
- ScarFLIX_v2_AutonomousController: controller_stale_or_blocked (PASS) enable pid=41500; run pid=48772
- JasonOS_Prime_OutcomeDashboard: dashboard_stale (PASS) enable pid=52884; run pid=12756
- JasonOS_Prime_PublicMirrorPublisher: mirror_stale (PASS) skipped_orchestrator_owned job=run_public_mirror_publisher

## Notes
- Same unresolved sentinel signature repeated for three cycles.