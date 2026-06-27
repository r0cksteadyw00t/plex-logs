# JasonOS Prime Sentinel

Updated UTC: 2026-06-27T15:04:22Z
Status: ALERT
Alert level: HIGH
Jason action required: false
Codex action required: true

## Signals
- controller_status: RUNNING
- controller_milestone: PLATFORM_GATE_RUNNING
- controller_age_minutes: 69
- watchdog_status: REVIEW
- watchdog_risk: Medium
- watchdog_age_minutes: 68
- dashboard_status: PASS
- dashboard_age_minutes: 67
- mirror_status: RUNNING
- mirror_age_minutes: 0
- checkpoint_status: REVIEW
- checkpoint_step: platform_gate_review
- checkpoint_age_minutes: 72
- durable_platform_gate_age_minutes: 72
- platform_progress_fresh: false

## Recovery Actions
- ScarFLIX_v2_Watchdog_StallDetector: watchdog_stale_or_failed (PASS) enable pid=5956; run pid=12208
- ScarFLIX_v2_AutonomousController: controller_stale_or_blocked (PASS) enable pid=6484; run pid=6836
- JasonOS_Prime_OutcomeDashboard: dashboard_stale (PASS) enable pid=1332; run pid=9932
- ScarFLIX_v2_Watchdog_StallDetector: platform_checkpoint_stale (PASS) enable pid=2440; run pid=12424
- ScarFLIX_v2_AutonomousController: platform_checkpoint_stale (PASS) enable pid=3344; run pid=8
- ScarFLIX_v2_DurablePlatformGateRunner: platform_checkpoint_stale (PASS) enable pid=10088; run pid=4720

## Notes
- Same unresolved sentinel signature repeated for three cycles.