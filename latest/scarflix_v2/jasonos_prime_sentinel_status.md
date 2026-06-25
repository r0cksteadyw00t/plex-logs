# JasonOS Prime Sentinel

Updated UTC: 2026-06-25T15:10:02Z
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
- watchdog_age_minutes: 7
- dashboard_status: PASS
- dashboard_age_minutes: 5
- mirror_status: PASS
- mirror_age_minutes: 2
- checkpoint_status: REVIEW
- checkpoint_step: platform_gate_review
- checkpoint_age_minutes: 6
- durable_platform_gate_age_minutes: 6
- platform_progress_fresh: false

## Recovery Actions
- ScarFLIX_v2_Watchdog_StallDetector: watchdog_stale_or_failed (PASS) enable pid=39732; run pid=36892
- ScarFLIX_v2_Watchdog_StallDetector: platform_checkpoint_stale (PASS) enable pid=13292; run pid=36328
- ScarFLIX_v2_AutonomousController: platform_checkpoint_stale (PASS) enable pid=38432; run pid=23920
- ScarFLIX_v2_DurablePlatformGateRunner: platform_checkpoint_stale (PASS) enable pid=39856; run pid=35252

## Notes
- None.