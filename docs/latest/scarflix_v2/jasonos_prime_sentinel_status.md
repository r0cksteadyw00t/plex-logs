# JasonOS Prime Sentinel

Updated UTC: 2026-06-25T13:20:01Z
Status: REVIEW
Alert level: MEDIUM
Jason action required: false
Codex action required: false

## Signals
- controller_status: WAITING_RETRY
- controller_milestone: PLATFORM_GATE_RUNNING
- controller_age_minutes: 10
- watchdog_status: REVIEW
- watchdog_risk: Medium
- watchdog_age_minutes: 10
- dashboard_status: PASS
- dashboard_age_minutes: 5
- mirror_status: PASS
- mirror_age_minutes: 2
- checkpoint_status: REVIEW
- checkpoint_step: platform_gate_review
- checkpoint_age_minutes: 13
- durable_platform_gate_age_minutes: 13
- platform_progress_fresh: false

## Recovery Actions
- ScarFLIX_v2_Watchdog_StallDetector: watchdog_stale_or_failed (PASS) enable pid=17716; run pid=10824
- ScarFLIX_v2_AutonomousController: controller_stale_or_blocked (PASS) enable pid=25756; run pid=33712
- ScarFLIX_v2_Watchdog_StallDetector: platform_checkpoint_stale (PASS) enable pid=23220; run pid=10664
- ScarFLIX_v2_AutonomousController: platform_checkpoint_stale (PASS) enable pid=18200; run pid=13348
- ScarFLIX_v2_DurablePlatformGateRunner: platform_checkpoint_stale (PASS) enable pid=12156; run pid=21608

## Notes
- None.