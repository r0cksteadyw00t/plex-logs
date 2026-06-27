# JasonOS Prime Sentinel

Updated UTC: 2026-06-27T19:50:31Z
Status: ALERT
Alert level: HIGH
Jason action required: false
Codex action required: true

## Signals
- controller_status: RUNNING
- controller_milestone: PLATFORM_GATE_RUNNING
- controller_age_minutes: 355
- watchdog_status: REVIEW
- watchdog_risk: Medium
- watchdog_age_minutes: 354
- dashboard_status: PASS
- dashboard_age_minutes: 353
- mirror_status: RUNNING
- mirror_age_minutes: 0
- checkpoint_status: REVIEW
- checkpoint_step: platform_gate_review
- checkpoint_age_minutes: 359
- durable_platform_gate_age_minutes: 359
- platform_progress_fresh: false

## Recovery Actions
- ScarFLIX_v2_Watchdog_StallDetector: watchdog_stale_or_failed (PASS) enable pid=9488; run pid=12572
- ScarFLIX_v2_AutonomousController: controller_stale_or_blocked (PASS) enable pid=2912; run pid=7828
- JasonOS_Prime_OutcomeDashboard: dashboard_stale (PASS) enable pid=3528; run pid=10928
- ScarFLIX_v2_Watchdog_StallDetector: platform_checkpoint_stale (PASS) enable pid=3952; run pid=9240
- ScarFLIX_v2_AutonomousController: platform_checkpoint_stale (PASS) enable pid=11696; run pid=11784
- ScarFLIX_v2_DurablePlatformGateRunner: platform_checkpoint_stale (PASS) enable pid=14092; run pid=2116

## Notes
- Same unresolved sentinel signature repeated for three cycles.