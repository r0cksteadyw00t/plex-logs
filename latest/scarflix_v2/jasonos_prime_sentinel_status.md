# JasonOS Prime Sentinel

Updated UTC: 2026-06-17T09:15:49Z
Status: ALERT
Alert level: HIGH
Jason action required: false
Codex action required: true

## Signals
- controller_status: PASS
- controller_milestone: CANDIDATE_SOURCE_MODEL_PASS
- controller_age_minutes: 41
- watchdog_status: REVIEW
- watchdog_risk: Medium
- watchdog_age_minutes: 8
- dashboard_status: PASS
- dashboard_age_minutes: 13
- mirror_status: PASS
- mirror_age_minutes: 21
- checkpoint_status: PASS
- checkpoint_step: platform_gate_pass
- checkpoint_age_minutes: 13436
- durable_platform_gate_age_minutes: 13436
- platform_progress_fresh: false

## Recovery Actions
- ScarFLIX_v2_Watchdog_StallDetector: watchdog_stale_or_failed (PASS) enable pid=39500; run pid=32244
- ScarFLIX_v2_AutonomousController: controller_stale_or_blocked (PASS) enable pid=7020; run pid=40304
- JasonOS_Prime_OutcomeDashboard: dashboard_stale (PASS) enable pid=16776; run pid=1288
- JasonOS_Prime_PublicMirrorPublisher: mirror_stale (PASS) skipped_orchestrator_owned job=run_public_mirror_publisher

## Notes
- Same unresolved sentinel signature repeated for three cycles.