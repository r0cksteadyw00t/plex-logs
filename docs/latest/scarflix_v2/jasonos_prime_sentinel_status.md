# JasonOS Prime Sentinel

Updated UTC: 2026-06-25T21:40:02Z
Status: REVIEW
Alert level: MEDIUM
Jason action required: false
Codex action required: false

## Signals
- controller_status: RUNNING
- controller_milestone: PLATFORM_GATE_RUNNING
- controller_age_minutes: 8
- watchdog_status: REVIEW
- watchdog_risk: Medium
- watchdog_age_minutes: 8
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
- ScarFLIX_v2_Watchdog_StallDetector: watchdog_stale_or_failed (PASS) enable pid=31048; run pid=35876
- ScarFLIX_v2_AutonomousController: controller_stale_or_blocked (PASS) enable pid=12796; run pid=32432
- ScarFLIX_v2_Watchdog_StallDetector: platform_checkpoint_stale (PASS) enable pid=43688; run pid=36460
- ScarFLIX_v2_AutonomousController: platform_checkpoint_stale (PASS) enable pid=24492; run pid=8800
- ScarFLIX_v2_DurablePlatformGateRunner: platform_checkpoint_stale (PASS) enable pid=4748; run pid=21776

## Notes
- None.