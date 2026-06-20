# JasonOS Prime Sentinel

Updated UTC: 2026-06-20T09:23:40Z
Status: ALERT
Alert level: HIGH
Jason action required: false
Codex action required: true

## Signals
- controller_status: RUNNING
- controller_milestone: PLATFORM_GATE_RUNNING
- controller_age_minutes: 26
- watchdog_status: REVIEW
- watchdog_risk: Medium
- watchdog_age_minutes: 19
- dashboard_status: PASS
- dashboard_age_minutes: 23
- mirror_status: RUNNING
- mirror_age_minutes: 10
- checkpoint_status: PASS
- checkpoint_step: platform_gate_pass
- checkpoint_age_minutes: 23
- durable_platform_gate_age_minutes: 23
- platform_progress_fresh: false

## Recovery Actions
- ScarFLIX_v2_Watchdog_StallDetector: watchdog_stale_or_failed (PASS) enable pid=41716; run pid=45916
- ScarFLIX_v2_AutonomousController: controller_stale_or_blocked (PASS) enable pid=47376; run pid=44268
- JasonOS_Prime_OutcomeDashboard: dashboard_stale (PASS) enable pid=36432; run pid=45396
- ScarFLIX_v2_Watchdog_StallDetector: platform_checkpoint_stale (PASS) enable pid=33192; run pid=42452
- ScarFLIX_v2_AutonomousController: platform_checkpoint_stale (PASS) enable pid=45552; run pid=10644
- ScarFLIX_v2_DurablePlatformGateRunner: platform_checkpoint_stale (PASS) enable pid=32200; run pid=16832

## Notes
- Same unresolved sentinel signature repeated for three cycles.