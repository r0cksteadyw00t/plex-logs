# JasonOS Prime Sentinel

Updated UTC: 2026-06-26T03:33:41Z
Status: ALERT
Alert level: HIGH
Jason action required: false
Codex action required: true

## Signals
- controller_status: RUNNING
- controller_milestone: PLATFORM_GATE_RUNNING
- controller_age_minutes: 4
- watchdog_status: 
- watchdog_risk: 
- watchdog_age_minutes: null
- dashboard_status: 
- dashboard_age_minutes: 29
- mirror_status: RUNNING
- mirror_age_minutes: 0
- checkpoint_status: REVIEW
- checkpoint_step: platform_gate_review
- checkpoint_age_minutes: 6
- durable_platform_gate_age_minutes: 6
- platform_progress_fresh: false

## Recovery Actions
- ScarFLIX_v2_Watchdog_StallDetector: watchdog_stale_or_failed (PASS) enable pid=4228; run pid=23428
- JasonOS_Prime_OutcomeDashboard: dashboard_stale (PASS) enable pid=37136; run pid=24408
- ScarFLIX_v2_Watchdog_StallDetector: platform_checkpoint_stale (PASS) enable pid=36136; run pid=28904
- ScarFLIX_v2_AutonomousController: platform_checkpoint_stale (PASS) enable pid=25596; run pid=23488
- ScarFLIX_v2_DurablePlatformGateRunner: platform_checkpoint_stale (PASS) enable pid=15072; run pid=35572

## Notes
- Same unresolved sentinel signature repeated for three cycles.