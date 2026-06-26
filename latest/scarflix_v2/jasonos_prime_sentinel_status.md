# JasonOS Prime Sentinel

Updated UTC: 2026-06-26T01:20:06Z
Status: REVIEW
Alert level: MEDIUM
Jason action required: false
Codex action required: false

## Signals
- controller_status: WAITING_RETRY
- controller_milestone: PLATFORM_GATE_REVIEW_TRANSIENT_RETRY_SCHEDULED
- controller_age_minutes: 20
- watchdog_status: REVIEW
- watchdog_risk: Medium
- watchdog_age_minutes: 0
- dashboard_status: PASS
- dashboard_age_minutes: 5
- mirror_status: PASS
- mirror_age_minutes: 1
- checkpoint_status: REVIEW
- checkpoint_step: platform_gate_review
- checkpoint_age_minutes: 19
- durable_platform_gate_age_minutes: 19
- platform_progress_fresh: false

## Recovery Actions
- ScarFLIX_v2_AutonomousController: controller_stale_or_blocked (PASS) enable pid=24432; run pid=44736
- ScarFLIX_v2_Watchdog_StallDetector: platform_checkpoint_stale (PASS) enable pid=29752; run pid=36328
- ScarFLIX_v2_AutonomousController: platform_checkpoint_stale (PASS) enable pid=44888; run pid=25464
- ScarFLIX_v2_DurablePlatformGateRunner: platform_checkpoint_stale (PASS) enable pid=28616; run pid=13068

## Notes
- None.