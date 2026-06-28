# JasonOS Prime Sentinel

Updated UTC: 2026-06-28T04:00:02Z
Status: REVIEW
Alert level: MEDIUM
Jason action required: false
Codex action required: false

## Signals
- controller_status: RUNNING
- controller_milestone: PLATFORM_GATE_RUNNING
- controller_age_minutes: 9
- watchdog_status: REVIEW
- watchdog_risk: Medium
- watchdog_age_minutes: 2
- dashboard_status: PASS
- dashboard_age_minutes: 5
- mirror_status: PASS
- mirror_age_minutes: 4
- checkpoint_status: REVIEW
- checkpoint_step: platform_gate_review
- checkpoint_age_minutes: 9
- durable_platform_gate_age_minutes: 9
- platform_progress_fresh: false

## Recovery Actions
- ScarFLIX_v2_AutonomousController: controller_stale_or_blocked (PASS) enable pid=3244; run pid=33980
- ScarFLIX_v2_Watchdog_StallDetector: platform_checkpoint_stale (PASS) enable pid=36696; run pid=26016
- ScarFLIX_v2_AutonomousController: platform_checkpoint_stale (PASS) enable pid=38228; run pid=25856
- ScarFLIX_v2_DurablePlatformGateRunner: platform_checkpoint_stale (PASS) enable pid=24700; run pid=34344

## Notes
- None.