# JasonOS Prime Sentinel

Updated UTC: 2026-06-27T18:46:59Z
Status: ALERT
Alert level: HIGH
Jason action required: false
Codex action required: true

## Signals
- controller_status: RUNNING
- controller_milestone: PLATFORM_GATE_RUNNING
- controller_age_minutes: 291
- watchdog_status: REVIEW
- watchdog_risk: Medium
- watchdog_age_minutes: 291
- dashboard_status: PASS
- dashboard_age_minutes: 290
- mirror_status: RUNNING
- mirror_age_minutes: 0
- checkpoint_status: REVIEW
- checkpoint_step: platform_gate_review
- checkpoint_age_minutes: 295
- durable_platform_gate_age_minutes: 295
- platform_progress_fresh: false

## Recovery Actions
- ScarFLIX_v2_Watchdog_StallDetector: watchdog_stale_or_failed (PASS) enable pid=10636; run pid=2060
- ScarFLIX_v2_AutonomousController: controller_stale_or_blocked (PASS) enable pid=8660; run pid=6992
- JasonOS_Prime_OutcomeDashboard: dashboard_stale (PASS) enable pid=8272; run pid=4492
- ScarFLIX_v2_Watchdog_StallDetector: platform_checkpoint_stale (PASS) enable pid=6448; run pid=5936
- ScarFLIX_v2_AutonomousController: platform_checkpoint_stale (PASS) enable pid=7044; run pid=13932
- ScarFLIX_v2_DurablePlatformGateRunner: platform_checkpoint_stale (PASS) enable pid=2948; run pid=2384

## Notes
- Same unresolved sentinel signature repeated for three cycles.