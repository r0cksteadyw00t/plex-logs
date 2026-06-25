# JasonOS Prime Sentinel

Updated UTC: 2026-06-25T12:05:02Z
Status: REVIEW
Alert level: MEDIUM
Jason action required: false
Codex action required: false

## Signals
- controller_status: RUNNING
- controller_milestone: PLATFORM_GATE_RUNNING
- controller_age_minutes: 2
- watchdog_status: REVIEW
- watchdog_risk: Medium
- watchdog_age_minutes: 12
- dashboard_status: PASS
- dashboard_age_minutes: 5
- mirror_status: PASS
- mirror_age_minutes: 2
- checkpoint_status: REVIEW
- checkpoint_step: platform_gate_review
- checkpoint_age_minutes: 11
- durable_platform_gate_age_minutes: 11
- platform_progress_fresh: false

## Recovery Actions
- ScarFLIX_v2_Watchdog_StallDetector: watchdog_stale_or_failed (PASS) enable pid=24660; run pid=38224
- ScarFLIX_v2_Watchdog_StallDetector: platform_checkpoint_stale (PASS) enable pid=23820; run pid=27244
- ScarFLIX_v2_AutonomousController: platform_checkpoint_stale (PASS) enable pid=25504; run pid=35904
- ScarFLIX_v2_DurablePlatformGateRunner: platform_checkpoint_stale (PASS) enable pid=16044; run pid=15300

## Notes
- None.