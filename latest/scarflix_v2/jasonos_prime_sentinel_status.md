# JasonOS Prime Sentinel

Updated UTC: 2026-06-27T14:31:36Z
Status: ALERT
Alert level: HIGH
Jason action required: false
Codex action required: true

## Signals
- controller_status: RUNNING
- controller_milestone: PLATFORM_GATE_RUNNING
- controller_age_minutes: 36
- watchdog_status: REVIEW
- watchdog_risk: Medium
- watchdog_age_minutes: 35
- dashboard_status: PASS
- dashboard_age_minutes: 34
- mirror_status: RUNNING
- mirror_age_minutes: 0
- checkpoint_status: REVIEW
- checkpoint_step: platform_gate_review
- checkpoint_age_minutes: 40
- durable_platform_gate_age_minutes: 40
- platform_progress_fresh: false

## Recovery Actions
- ScarFLIX_v2_Watchdog_StallDetector: watchdog_stale_or_failed (PASS) enable pid=2452; run pid=9408
- ScarFLIX_v2_AutonomousController: controller_stale_or_blocked (PASS) enable pid=2484; run pid=12504
- JasonOS_Prime_OutcomeDashboard: dashboard_stale (PASS) enable pid=14164; run pid=4972
- ScarFLIX_v2_Watchdog_StallDetector: platform_checkpoint_stale (PASS) enable pid=3344; run pid=2816
- ScarFLIX_v2_AutonomousController: platform_checkpoint_stale (PASS) enable pid=1368; run pid=11132
- ScarFLIX_v2_DurablePlatformGateRunner: platform_checkpoint_stale (PASS) enable pid=2328; run pid=12272

## Notes
- Same unresolved sentinel signature repeated for three cycles.