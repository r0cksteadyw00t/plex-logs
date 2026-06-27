# JasonOS Prime Sentinel

Updated UTC: 2026-06-27T14:14:51Z
Status: REVIEW
Alert level: MEDIUM
Jason action required: false
Codex action required: false

## Signals
- controller_status: RUNNING
- controller_milestone: PLATFORM_GATE_RUNNING
- controller_age_minutes: 19
- watchdog_status: REVIEW
- watchdog_risk: Medium
- watchdog_age_minutes: 18
- dashboard_status: PASS
- dashboard_age_minutes: 18
- mirror_status: RUNNING
- mirror_age_minutes: 16
- checkpoint_status: REVIEW
- checkpoint_step: platform_gate_review
- checkpoint_age_minutes: 23
- durable_platform_gate_age_minutes: 23
- platform_progress_fresh: false

## Recovery Actions
- ScarFLIX_v2_Watchdog_StallDetector: watchdog_stale_or_failed (PASS) enable pid=12536; run pid=11424
- ScarFLIX_v2_AutonomousController: controller_stale_or_blocked (PASS) enable pid=13324; run pid=6028
- JasonOS_Prime_OutcomeDashboard: dashboard_stale (PASS) enable pid=3924; run pid=10312
- JasonOS_Prime_PublicMirrorPublisher: mirror_stale (PASS) skipped_orchestrator_owned job=run_public_mirror_publisher
- ScarFLIX_v2_Watchdog_StallDetector: platform_checkpoint_stale (PASS) enable pid=12236; run pid=2876
- ScarFLIX_v2_AutonomousController: platform_checkpoint_stale (PASS) enable pid=13452; run pid=4760
- ScarFLIX_v2_DurablePlatformGateRunner: platform_checkpoint_stale (PASS) enable pid=1344; run pid=3204

## Notes
- None.