# JasonOS Prime Sentinel

Updated UTC: 2026-06-25T17:05:04Z
Status: ALERT
Alert level: HIGH
Jason action required: false
Codex action required: true

## Signals
- controller_status: RUNNING
- controller_milestone: PLATFORM_GATE_RUNNING
- controller_age_minutes: 1
- watchdog_status: REVIEW
- watchdog_risk: Medium
- watchdog_age_minutes: 0
- dashboard_status: PASS
- dashboard_age_minutes: 0
- mirror_status: RUNNING
- mirror_age_minutes: 0
- checkpoint_status: REVIEW
- checkpoint_step: platform_gate_review
- checkpoint_age_minutes: 19
- durable_platform_gate_age_minutes: 19
- platform_progress_fresh: false

## Recovery Actions
- ScarFLIX_v2_Watchdog_StallDetector: platform_checkpoint_stale (PASS) enable pid=5812; run pid=23784
- ScarFLIX_v2_AutonomousController: platform_checkpoint_stale (PASS) enable pid=36276; run pid=13460
- ScarFLIX_v2_DurablePlatformGateRunner: platform_checkpoint_stale (PASS) enable pid=41120; run pid=33304

## Notes
- Same unresolved sentinel signature repeated for three cycles.