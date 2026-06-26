# JasonOS Prime Sentinel

Updated UTC: 2026-06-26T01:50:02Z
Status: REVIEW
Alert level: MEDIUM
Jason action required: false
Codex action required: false

## Signals
- controller_status: WAITING_RETRY
- controller_milestone: PLATFORM_GATE_RUNNING
- controller_age_minutes: 70
- watchdog_status: REVIEW
- watchdog_risk: Medium
- watchdog_age_minutes: 8
- dashboard_status: PASS
- dashboard_age_minutes: 4
- mirror_status: PASS
- mirror_age_minutes: 2
- checkpoint_status: REVIEW
- checkpoint_step: platform_gate_review
- checkpoint_age_minutes: 18
- durable_platform_gate_age_minutes: 18
- platform_progress_fresh: false

## Recovery Actions
- ScarFLIX_v2_Watchdog_StallDetector: watchdog_stale_or_failed (PASS) enable pid=41656; run pid=46824
- ScarFLIX_v2_AutonomousController: controller_stale_or_blocked (PASS) enable pid=41148; run pid=14508
- ScarFLIX_v2_Watchdog_StallDetector: platform_checkpoint_stale (PASS) enable pid=44352; run pid=33540
- ScarFLIX_v2_AutonomousController: platform_checkpoint_stale (PASS) enable pid=43324; run pid=45712
- ScarFLIX_v2_DurablePlatformGateRunner: platform_checkpoint_stale (PASS) enable pid=45320; run pid=43268

## Notes
- None.