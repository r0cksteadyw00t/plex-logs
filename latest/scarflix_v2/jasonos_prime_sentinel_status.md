# JasonOS Prime Sentinel

Updated UTC: 2026-06-27T21:26:33Z
Status: ALERT
Alert level: HIGH
Jason action required: false
Codex action required: true

## Signals
- controller_status: RUNNING
- controller_milestone: PLATFORM_GATE_RUNNING
- controller_age_minutes: 451
- watchdog_status: REVIEW
- watchdog_risk: Medium
- watchdog_age_minutes: 450
- dashboard_status: PASS
- dashboard_age_minutes: 449
- mirror_status: RUNNING
- mirror_age_minutes: 0
- checkpoint_status: REVIEW
- checkpoint_step: platform_gate_review
- checkpoint_age_minutes: 455
- durable_platform_gate_age_minutes: 455
- platform_progress_fresh: false

## Recovery Actions
- ScarFLIX_v2_Watchdog_StallDetector: watchdog_stale_or_failed (PASS) enable pid=10584; run pid=2212
- ScarFLIX_v2_AutonomousController: controller_stale_or_blocked (PASS) enable pid=13100; run pid=6072
- JasonOS_Prime_OutcomeDashboard: dashboard_stale (PASS) enable pid=5940; run pid=12440
- ScarFLIX_v2_Watchdog_StallDetector: platform_checkpoint_stale (PASS) enable pid=7624; run pid=1996
- ScarFLIX_v2_AutonomousController: platform_checkpoint_stale (PASS) enable pid=3824; run pid=8292
- ScarFLIX_v2_DurablePlatformGateRunner: platform_checkpoint_stale (PASS) enable pid=12872; run pid=8668

## Notes
- Same unresolved sentinel signature repeated for three cycles.