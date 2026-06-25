# JasonOS Prime Sentinel

Updated UTC: 2026-06-25T14:00:04Z
Status: REVIEW
Alert level: MEDIUM
Jason action required: false
Codex action required: false

## Signals
- controller_status: RUNNING
- controller_milestone: PLATFORM_GATE_RUNNING
- controller_age_minutes: 14
- watchdog_status: REVIEW
- watchdog_risk: Medium
- watchdog_age_minutes: 14
- dashboard_status: PASS
- dashboard_age_minutes: 5
- mirror_status: PASS
- mirror_age_minutes: 2
- checkpoint_status: REVIEW
- checkpoint_step: platform_gate_review
- checkpoint_age_minutes: 15
- durable_platform_gate_age_minutes: 15
- platform_progress_fresh: false

## Recovery Actions
- ScarFLIX_v2_Watchdog_StallDetector: watchdog_stale_or_failed (PASS) enable pid=10940; run pid=35312
- ScarFLIX_v2_AutonomousController: controller_stale_or_blocked (PASS) enable pid=2156; run pid=36328
- ScarFLIX_v2_Watchdog_StallDetector: platform_checkpoint_stale (PASS) enable pid=22712; run pid=6960
- ScarFLIX_v2_AutonomousController: platform_checkpoint_stale (PASS) enable pid=34576; run pid=31160
- ScarFLIX_v2_DurablePlatformGateRunner: platform_checkpoint_stale (PASS) enable pid=39796; run pid=30516

## Notes
- None.