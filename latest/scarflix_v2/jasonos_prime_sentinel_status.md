# JasonOS Prime Sentinel

Updated UTC: 2026-06-06T22:08:02Z
Status: REVIEW
Alert level: MEDIUM
Jason action required: false
Codex action required: false

## Signals
- controller_status: RUNNING
- controller_milestone: PLATFORM_GATE_RUNNING
- controller_age_minutes: 5
- watchdog_status: PASS
- watchdog_risk: Low
- watchdog_age_minutes: 5
- dashboard_status: PASS
- dashboard_age_minutes: 1
- mirror_status: PASS
- mirror_age_minutes: 0
- checkpoint_status: RUNNING
- checkpoint_step: running_platform_gate_attempt_1
- checkpoint_age_minutes: 6
- durable_platform_gate_age_minutes: 6
- platform_progress_fresh: false

## Recovery Actions
- ScarFLIX_v2_Watchdog_StallDetector: platform_checkpoint_stale (PASS) enable pid=38312; run pid=25392
- ScarFLIX_v2_AutonomousController: platform_checkpoint_stale (PASS) enable pid=21404; run pid=27832
- ScarFLIX_v2_DurablePlatformGateRunner: platform_checkpoint_stale (PASS) enable pid=29900; run pid=14024

## Notes
- None.