# JasonOS Prime Sentinel

Updated UTC: 2026-06-25T15:54:48Z
Status: REVIEW
Alert level: MEDIUM
Jason action required: false
Codex action required: false

## Signals
- controller_status: WAITING_RETRY
- controller_milestone: PLATFORM_GATE_RUNNING
- controller_age_minutes: 61
- watchdog_status: REVIEW
- watchdog_risk: Medium
- watchdog_age_minutes: 7
- dashboard_status: PASS
- dashboard_age_minutes: 5
- mirror_status: RUNNING
- mirror_age_minutes: 0
- checkpoint_status: REVIEW
- checkpoint_step: platform_gate_review
- checkpoint_age_minutes: 10
- durable_platform_gate_age_minutes: 10
- platform_progress_fresh: false

## Recovery Actions
- ScarFLIX_v2_Watchdog_StallDetector: watchdog_stale_or_failed (PASS) enable pid=36928; run pid=29260
- ScarFLIX_v2_AutonomousController: controller_stale_or_blocked (PASS) enable pid=32332; run pid=38452
- ScarFLIX_v2_Watchdog_StallDetector: platform_checkpoint_stale (PASS) enable pid=4656; run pid=41956
- ScarFLIX_v2_AutonomousController: platform_checkpoint_stale (PASS) enable pid=37392; run pid=18180
- ScarFLIX_v2_DurablePlatformGateRunner: platform_checkpoint_stale (PASS) enable pid=17724; run pid=39844

## Notes
- None.