# JasonOS Prime Sentinel

Updated UTC: 2026-06-27T17:10:26Z
Status: ALERT
Alert level: HIGH
Jason action required: false
Codex action required: true

## Signals
- controller_status: RUNNING
- controller_milestone: PLATFORM_GATE_RUNNING
- controller_age_minutes: 195
- watchdog_status: REVIEW
- watchdog_risk: Medium
- watchdog_age_minutes: 194
- dashboard_status: PASS
- dashboard_age_minutes: 193
- mirror_status: RUNNING
- mirror_age_minutes: 0
- checkpoint_status: REVIEW
- checkpoint_step: platform_gate_review
- checkpoint_age_minutes: 199
- durable_platform_gate_age_minutes: 199
- platform_progress_fresh: false

## Recovery Actions
- ScarFLIX_v2_Watchdog_StallDetector: watchdog_stale_or_failed (PASS) enable pid=13992; run pid=7204
- ScarFLIX_v2_AutonomousController: controller_stale_or_blocked (PASS) enable pid=13812; run pid=9528
- JasonOS_Prime_OutcomeDashboard: dashboard_stale (PASS) enable pid=168; run pid=2092
- ScarFLIX_v2_Watchdog_StallDetector: platform_checkpoint_stale (PASS) enable pid=10936; run pid=11552
- ScarFLIX_v2_AutonomousController: platform_checkpoint_stale (PASS) enable pid=2244; run pid=7228
- ScarFLIX_v2_DurablePlatformGateRunner: platform_checkpoint_stale (PASS) enable pid=11212; run pid=14220

## Notes
- Same unresolved sentinel signature repeated for three cycles.