# JasonOS Prime Sentinel

Updated UTC: 2026-06-27T20:54:02Z
Status: ALERT
Alert level: HIGH
Jason action required: false
Codex action required: true

## Signals
- controller_status: RUNNING
- controller_milestone: PLATFORM_GATE_RUNNING
- controller_age_minutes: 418
- watchdog_status: REVIEW
- watchdog_risk: Medium
- watchdog_age_minutes: 418
- dashboard_status: PASS
- dashboard_age_minutes: 417
- mirror_status: RUNNING
- mirror_age_minutes: 0
- checkpoint_status: REVIEW
- checkpoint_step: platform_gate_review
- checkpoint_age_minutes: 422
- durable_platform_gate_age_minutes: 422
- platform_progress_fresh: false

## Recovery Actions
- ScarFLIX_v2_Watchdog_StallDetector: watchdog_stale_or_failed (PASS) enable pid=3012; run pid=7192
- ScarFLIX_v2_AutonomousController: controller_stale_or_blocked (PASS) enable pid=10740; run pid=1852
- JasonOS_Prime_OutcomeDashboard: dashboard_stale (PASS) enable pid=13812; run pid=2960
- ScarFLIX_v2_Watchdog_StallDetector: platform_checkpoint_stale (PASS) enable pid=9100; run pid=13552
- ScarFLIX_v2_AutonomousController: platform_checkpoint_stale (PASS) enable pid=8; run pid=6048
- ScarFLIX_v2_DurablePlatformGateRunner: platform_checkpoint_stale (PASS) enable pid=4920; run pid=14128

## Notes
- Same unresolved sentinel signature repeated for three cycles.