# JasonOS Prime Sentinel

Updated UTC: 2026-06-17T11:16:10Z
Status: ALERT
Alert level: HIGH
Jason action required: false
Codex action required: true

## Signals
- controller_status: PASS
- controller_milestone: CANDIDATE_SOURCE_MODEL_PASS
- controller_age_minutes: 116
- watchdog_status: REVIEW
- watchdog_risk: Medium
- watchdog_age_minutes: 70
- dashboard_status: PASS
- dashboard_age_minutes: 75
- mirror_status: PASS
- mirror_age_minutes: 13
- checkpoint_status: PASS
- checkpoint_step: platform_gate_pass
- checkpoint_age_minutes: 13557
- durable_platform_gate_age_minutes: 13557
- platform_progress_fresh: false

## Recovery Actions
- ScarFLIX_v2_Watchdog_StallDetector: watchdog_stale_or_failed (PASS) enable pid=44840; run pid=5028
- ScarFLIX_v2_AutonomousController: controller_stale_or_blocked (PASS) enable pid=22844; run pid=38648
- JasonOS_Prime_OutcomeDashboard: dashboard_stale (PASS) enable pid=29560; run pid=8216
- JasonOS_Prime_PublicMirrorPublisher: mirror_stale (PASS) skipped_orchestrator_owned job=run_public_mirror_publisher

## Notes
- Same unresolved sentinel signature repeated for three cycles.