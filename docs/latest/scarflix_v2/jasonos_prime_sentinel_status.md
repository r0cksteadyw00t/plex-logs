# JasonOS Prime Sentinel

Updated UTC: 2026-06-27T19:18:29Z
Status: ALERT
Alert level: HIGH
Jason action required: false
Codex action required: true

## Signals
- controller_status: RUNNING
- controller_milestone: PLATFORM_GATE_RUNNING
- controller_age_minutes: 323
- watchdog_status: REVIEW
- watchdog_risk: Medium
- watchdog_age_minutes: 322
- dashboard_status: PASS
- dashboard_age_minutes: 321
- mirror_status: RUNNING
- mirror_age_minutes: 0
- checkpoint_status: REVIEW
- checkpoint_step: platform_gate_review
- checkpoint_age_minutes: 327
- durable_platform_gate_age_minutes: 327
- platform_progress_fresh: false

## Recovery Actions
- ScarFLIX_v2_Watchdog_StallDetector: watchdog_stale_or_failed (PASS) enable pid=11676; run pid=5328
- ScarFLIX_v2_AutonomousController: controller_stale_or_blocked (PASS) enable pid=4836; run pid=1416
- JasonOS_Prime_OutcomeDashboard: dashboard_stale (PASS) enable pid=8292; run pid=14276
- ScarFLIX_v2_Watchdog_StallDetector: platform_checkpoint_stale (PASS) enable pid=12672; run pid=13540
- ScarFLIX_v2_AutonomousController: platform_checkpoint_stale (PASS) enable pid=12192; run pid=8804
- ScarFLIX_v2_DurablePlatformGateRunner: platform_checkpoint_stale (PASS) enable pid=2328; run pid=14040

## Notes
- Same unresolved sentinel signature repeated for three cycles.