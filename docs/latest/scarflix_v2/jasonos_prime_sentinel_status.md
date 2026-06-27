# JasonOS Prime Sentinel

Updated UTC: 2026-06-27T15:19:53Z
Status: ALERT
Alert level: HIGH
Jason action required: false
Codex action required: true

## Signals
- controller_status: RUNNING
- controller_milestone: PLATFORM_GATE_RUNNING
- controller_age_minutes: 84
- watchdog_status: REVIEW
- watchdog_risk: Medium
- watchdog_age_minutes: 83
- dashboard_status: PASS
- dashboard_age_minutes: 83
- mirror_status: RUNNING
- mirror_age_minutes: 0
- checkpoint_status: REVIEW
- checkpoint_step: platform_gate_review
- checkpoint_age_minutes: 88
- durable_platform_gate_age_minutes: 88
- platform_progress_fresh: false

## Recovery Actions
- ScarFLIX_v2_Watchdog_StallDetector: watchdog_stale_or_failed (PASS) enable pid=6084; run pid=5384
- ScarFLIX_v2_AutonomousController: controller_stale_or_blocked (PASS) enable pid=2364; run pid=13688
- JasonOS_Prime_OutcomeDashboard: dashboard_stale (PASS) enable pid=13852; run pid=13264
- ScarFLIX_v2_Watchdog_StallDetector: platform_checkpoint_stale (PASS) enable pid=1688; run pid=4168
- ScarFLIX_v2_AutonomousController: platform_checkpoint_stale (PASS) enable pid=2864; run pid=5060
- ScarFLIX_v2_DurablePlatformGateRunner: platform_checkpoint_stale (PASS) enable pid=14332; run pid=5780

## Notes
- Same unresolved sentinel signature repeated for three cycles.