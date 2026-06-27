# JasonOS Prime Sentinel

Updated UTC: 2026-06-27T15:50:37Z
Status: ALERT
Alert level: HIGH
Jason action required: false
Codex action required: true

## Signals
- controller_status: RUNNING
- controller_milestone: PLATFORM_GATE_RUNNING
- controller_age_minutes: 115
- watchdog_status: REVIEW
- watchdog_risk: Medium
- watchdog_age_minutes: 114
- dashboard_status: PASS
- dashboard_age_minutes: 113
- mirror_status: RUNNING
- mirror_age_minutes: 0
- checkpoint_status: REVIEW
- checkpoint_step: platform_gate_review
- checkpoint_age_minutes: 119
- durable_platform_gate_age_minutes: 119
- platform_progress_fresh: false

## Recovery Actions
- ScarFLIX_v2_Watchdog_StallDetector: watchdog_stale_or_failed (PASS) enable pid=7772; run pid=12184
- ScarFLIX_v2_AutonomousController: controller_stale_or_blocked (PASS) enable pid=4148; run pid=13944
- JasonOS_Prime_OutcomeDashboard: dashboard_stale (PASS) enable pid=8552; run pid=10884
- ScarFLIX_v2_Watchdog_StallDetector: platform_checkpoint_stale (PASS) enable pid=12408; run pid=11172
- ScarFLIX_v2_AutonomousController: platform_checkpoint_stale (PASS) enable pid=11800; run pid=9060
- ScarFLIX_v2_DurablePlatformGateRunner: platform_checkpoint_stale (PASS) enable pid=7512; run pid=7236

## Notes
- Same unresolved sentinel signature repeated for three cycles.