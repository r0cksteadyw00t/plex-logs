# JasonOS Prime Sentinel

Updated UTC: 2026-06-27T17:26:11Z
Status: ALERT
Alert level: HIGH
Jason action required: false
Codex action required: true

## Signals
- controller_status: RUNNING
- controller_milestone: PLATFORM_GATE_RUNNING
- controller_age_minutes: 211
- watchdog_status: REVIEW
- watchdog_risk: Medium
- watchdog_age_minutes: 210
- dashboard_status: PASS
- dashboard_age_minutes: 209
- mirror_status: RUNNING
- mirror_age_minutes: 0
- checkpoint_status: REVIEW
- checkpoint_step: platform_gate_review
- checkpoint_age_minutes: 214
- durable_platform_gate_age_minutes: 214
- platform_progress_fresh: false

## Recovery Actions
- ScarFLIX_v2_Watchdog_StallDetector: watchdog_stale_or_failed (PASS) enable pid=8292; run pid=344
- ScarFLIX_v2_AutonomousController: controller_stale_or_blocked (PASS) enable pid=6984; run pid=12712
- JasonOS_Prime_OutcomeDashboard: dashboard_stale (PASS) enable pid=11088; run pid=3952
- ScarFLIX_v2_Watchdog_StallDetector: platform_checkpoint_stale (PASS) enable pid=804; run pid=13596
- ScarFLIX_v2_AutonomousController: platform_checkpoint_stale (PASS) enable pid=12672; run pid=11256
- ScarFLIX_v2_DurablePlatformGateRunner: platform_checkpoint_stale (PASS) enable pid=5332; run pid=12256

## Notes
- Same unresolved sentinel signature repeated for three cycles.