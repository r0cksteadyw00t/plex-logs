# JasonOS Prime Sentinel

Updated UTC: 2026-06-26T00:35:02Z
Status: REVIEW
Alert level: MEDIUM
Jason action required: false
Codex action required: false

## Signals
- controller_status: WAITING_RETRY
- controller_milestone: PLATFORM_GATE_RUNNING
- controller_age_minutes: 60
- watchdog_status: REVIEW
- watchdog_risk: Medium
- watchdog_age_minutes: 9
- dashboard_status: PASS
- dashboard_age_minutes: 5
- mirror_status: PASS
- mirror_age_minutes: 2
- checkpoint_status: REVIEW
- checkpoint_step: platform_gate_review
- checkpoint_age_minutes: 17
- durable_platform_gate_age_minutes: 17
- platform_progress_fresh: false

## Recovery Actions
- ScarFLIX_v2_Watchdog_StallDetector: watchdog_stale_or_failed (PASS) enable pid=40412; run pid=43384
- ScarFLIX_v2_AutonomousController: controller_stale_or_blocked (PASS) enable pid=4908; run pid=2308
- ScarFLIX_v2_Watchdog_StallDetector: platform_checkpoint_stale (PASS) enable pid=17288; run pid=36952
- ScarFLIX_v2_AutonomousController: platform_checkpoint_stale (PASS) enable pid=33632; run pid=2284
- ScarFLIX_v2_DurablePlatformGateRunner: platform_checkpoint_stale (PASS) enable pid=43352; run pid=1028

## Notes
- None.