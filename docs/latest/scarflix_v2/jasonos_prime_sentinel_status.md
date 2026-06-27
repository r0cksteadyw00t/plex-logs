# JasonOS Prime Sentinel

Updated UTC: 2026-06-27T20:07:16Z
Status: ALERT
Alert level: HIGH
Jason action required: false
Codex action required: true

## Signals
- controller_status: RUNNING
- controller_milestone: PLATFORM_GATE_RUNNING
- controller_age_minutes: 372
- watchdog_status: REVIEW
- watchdog_risk: Medium
- watchdog_age_minutes: 371
- dashboard_status: PASS
- dashboard_age_minutes: 370
- mirror_status: RUNNING
- mirror_age_minutes: 0
- checkpoint_status: REVIEW
- checkpoint_step: platform_gate_review
- checkpoint_age_minutes: 375
- durable_platform_gate_age_minutes: 375
- platform_progress_fresh: false

## Recovery Actions
- ScarFLIX_v2_Watchdog_StallDetector: watchdog_stale_or_failed (PASS) enable pid=12408; run pid=14144
- ScarFLIX_v2_AutonomousController: controller_stale_or_blocked (PASS) enable pid=11860; run pid=11668
- JasonOS_Prime_OutcomeDashboard: dashboard_stale (PASS) enable pid=9528; run pid=8400
- ScarFLIX_v2_Watchdog_StallDetector: platform_checkpoint_stale (PASS) enable pid=11672; run pid=4596
- ScarFLIX_v2_AutonomousController: platform_checkpoint_stale (PASS) enable pid=13056; run pid=10016
- ScarFLIX_v2_DurablePlatformGateRunner: platform_checkpoint_stale (PASS) enable pid=4772; run pid=12488

## Notes
- Same unresolved sentinel signature repeated for three cycles.