# JasonOS Prime Sentinel

Updated UTC: 2026-06-27T20:38:02Z
Status: ALERT
Alert level: HIGH
Jason action required: false
Codex action required: true

## Signals
- controller_status: RUNNING
- controller_milestone: PLATFORM_GATE_RUNNING
- controller_age_minutes: 402
- watchdog_status: REVIEW
- watchdog_risk: Medium
- watchdog_age_minutes: 402
- dashboard_status: PASS
- dashboard_age_minutes: 401
- mirror_status: RUNNING
- mirror_age_minutes: 0
- checkpoint_status: REVIEW
- checkpoint_step: platform_gate_review
- checkpoint_age_minutes: 406
- durable_platform_gate_age_minutes: 406
- platform_progress_fresh: false

## Recovery Actions
- ScarFLIX_v2_Watchdog_StallDetector: watchdog_stale_or_failed (PASS) enable pid=9256; run pid=13144
- ScarFLIX_v2_AutonomousController: controller_stale_or_blocked (PASS) enable pid=12988; run pid=2392
- JasonOS_Prime_OutcomeDashboard: dashboard_stale (PASS) enable pid=7940; run pid=10884
- ScarFLIX_v2_Watchdog_StallDetector: platform_checkpoint_stale (PASS) enable pid=2044; run pid=2104
- ScarFLIX_v2_AutonomousController: platform_checkpoint_stale (PASS) enable pid=11108; run pid=1892
- ScarFLIX_v2_DurablePlatformGateRunner: platform_checkpoint_stale (PASS) enable pid=9596; run pid=7044

## Notes
- Same unresolved sentinel signature repeated for three cycles.