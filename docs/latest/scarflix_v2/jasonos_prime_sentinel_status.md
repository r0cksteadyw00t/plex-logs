# JasonOS Prime Sentinel

Updated UTC: 2026-06-27T18:30:28Z
Status: ALERT
Alert level: HIGH
Jason action required: false
Codex action required: true

## Signals
- controller_status: RUNNING
- controller_milestone: PLATFORM_GATE_RUNNING
- controller_age_minutes: 275
- watchdog_status: REVIEW
- watchdog_risk: Medium
- watchdog_age_minutes: 274
- dashboard_status: PASS
- dashboard_age_minutes: 273
- mirror_status: RUNNING
- mirror_age_minutes: 0
- checkpoint_status: REVIEW
- checkpoint_step: platform_gate_review
- checkpoint_age_minutes: 279
- durable_platform_gate_age_minutes: 279
- platform_progress_fresh: false

## Recovery Actions
- ScarFLIX_v2_Watchdog_StallDetector: watchdog_stale_or_failed (PASS) enable pid=2720; run pid=6952
- ScarFLIX_v2_AutonomousController: controller_stale_or_blocked (PASS) enable pid=1468; run pid=4144
- JasonOS_Prime_OutcomeDashboard: dashboard_stale (PASS) enable pid=2656; run pid=2872
- ScarFLIX_v2_Watchdog_StallDetector: platform_checkpoint_stale (PASS) enable pid=12796; run pid=6028
- ScarFLIX_v2_AutonomousController: platform_checkpoint_stale (PASS) enable pid=6356; run pid=3756
- ScarFLIX_v2_DurablePlatformGateRunner: platform_checkpoint_stale (PASS) enable pid=2620; run pid=11532

## Notes
- Same unresolved sentinel signature repeated for three cycles.