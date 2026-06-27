# JasonOS Prime Sentinel

Updated UTC: 2026-06-27T19:34:30Z
Status: ALERT
Alert level: HIGH
Jason action required: false
Codex action required: true

## Signals
- controller_status: RUNNING
- controller_milestone: PLATFORM_GATE_RUNNING
- controller_age_minutes: 339
- watchdog_status: REVIEW
- watchdog_risk: Medium
- watchdog_age_minutes: 338
- dashboard_status: PASS
- dashboard_age_minutes: 337
- mirror_status: RUNNING
- mirror_age_minutes: 0
- checkpoint_status: REVIEW
- checkpoint_step: platform_gate_review
- checkpoint_age_minutes: 343
- durable_platform_gate_age_minutes: 343
- platform_progress_fresh: false

## Recovery Actions
- ScarFLIX_v2_Watchdog_StallDetector: watchdog_stale_or_failed (PASS) enable pid=12852; run pid=8848
- ScarFLIX_v2_AutonomousController: controller_stale_or_blocked (PASS) enable pid=156; run pid=6636
- JasonOS_Prime_OutcomeDashboard: dashboard_stale (PASS) enable pid=13124; run pid=6048
- ScarFLIX_v2_Watchdog_StallDetector: platform_checkpoint_stale (PASS) enable pid=14164; run pid=5248
- ScarFLIX_v2_AutonomousController: platform_checkpoint_stale (PASS) enable pid=6336; run pid=7648
- ScarFLIX_v2_DurablePlatformGateRunner: platform_checkpoint_stale (PASS) enable pid=13628; run pid=13096

## Notes
- Same unresolved sentinel signature repeated for three cycles.