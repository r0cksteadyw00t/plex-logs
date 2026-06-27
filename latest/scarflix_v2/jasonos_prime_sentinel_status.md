# JasonOS Prime Sentinel

Updated UTC: 2026-06-27T21:09:48Z
Status: ALERT
Alert level: HIGH
Jason action required: false
Codex action required: true

## Signals
- controller_status: RUNNING
- controller_milestone: PLATFORM_GATE_RUNNING
- controller_age_minutes: 434
- watchdog_status: REVIEW
- watchdog_risk: Medium
- watchdog_age_minutes: 433
- dashboard_status: PASS
- dashboard_age_minutes: 433
- mirror_status: RUNNING
- mirror_age_minutes: 0
- checkpoint_status: REVIEW
- checkpoint_step: platform_gate_review
- checkpoint_age_minutes: 438
- durable_platform_gate_age_minutes: 438
- platform_progress_fresh: false

## Recovery Actions
- ScarFLIX_v2_Watchdog_StallDetector: watchdog_stale_or_failed (PASS) enable pid=2224; run pid=10656
- ScarFLIX_v2_AutonomousController: controller_stale_or_blocked (PASS) enable pid=14124; run pid=8652
- JasonOS_Prime_OutcomeDashboard: dashboard_stale (PASS) enable pid=5256; run pid=2528
- ScarFLIX_v2_Watchdog_StallDetector: platform_checkpoint_stale (PASS) enable pid=7944; run pid=9596
- ScarFLIX_v2_AutonomousController: platform_checkpoint_stale (PASS) enable pid=8456; run pid=6660
- ScarFLIX_v2_DurablePlatformGateRunner: platform_checkpoint_stale (PASS) enable pid=10684; run pid=10904

## Notes
- Same unresolved sentinel signature repeated for three cycles.