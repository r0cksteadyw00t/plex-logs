# JasonOS Prime Sentinel

Updated UTC: 2026-06-27T20:22:46Z
Status: ALERT
Alert level: HIGH
Jason action required: false
Codex action required: true

## Signals
- controller_status: RUNNING
- controller_milestone: PLATFORM_GATE_RUNNING
- controller_age_minutes: 387
- watchdog_status: REVIEW
- watchdog_risk: Medium
- watchdog_age_minutes: 386
- dashboard_status: PASS
- dashboard_age_minutes: 386
- mirror_status: RUNNING
- mirror_age_minutes: 0
- checkpoint_status: REVIEW
- checkpoint_step: platform_gate_review
- checkpoint_age_minutes: 391
- durable_platform_gate_age_minutes: 391
- platform_progress_fresh: false

## Recovery Actions
- ScarFLIX_v2_Watchdog_StallDetector: watchdog_stale_or_failed (PASS) enable pid=4432; run pid=1644
- ScarFLIX_v2_AutonomousController: controller_stale_or_blocked (PASS) enable pid=4800; run pid=13060
- JasonOS_Prime_OutcomeDashboard: dashboard_stale (PASS) enable pid=5304; run pid=2948
- ScarFLIX_v2_Watchdog_StallDetector: platform_checkpoint_stale (PASS) enable pid=6472; run pid=8268
- ScarFLIX_v2_AutonomousController: platform_checkpoint_stale (PASS) enable pid=8300; run pid=7868
- ScarFLIX_v2_DurablePlatformGateRunner: platform_checkpoint_stale (PASS) enable pid=7464; run pid=11304

## Notes
- Same unresolved sentinel signature repeated for three cycles.