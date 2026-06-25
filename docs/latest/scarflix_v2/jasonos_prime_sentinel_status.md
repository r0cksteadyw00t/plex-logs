# JasonOS Prime Sentinel

Updated UTC: 2026-06-25T17:50:02Z
Status: REVIEW
Alert level: MEDIUM
Jason action required: false
Codex action required: false

## Signals
- controller_status: WAITING_RETRY
- controller_milestone: PLATFORM_GATE_RUNNING
- controller_age_minutes: 101
- watchdog_status: REVIEW
- watchdog_risk: Medium
- watchdog_age_minutes: 6
- dashboard_status: PASS
- dashboard_age_minutes: 5
- mirror_status: PASS
- mirror_age_minutes: 2
- checkpoint_status: REVIEW
- checkpoint_step: platform_gate_review
- checkpoint_age_minutes: 14
- durable_platform_gate_age_minutes: 14
- platform_progress_fresh: false

## Recovery Actions
- ScarFLIX_v2_Watchdog_StallDetector: watchdog_stale_or_failed (PASS) enable pid=31260; run pid=44116
- ScarFLIX_v2_AutonomousController: controller_stale_or_blocked (PASS) enable pid=24980; run pid=34412
- ScarFLIX_v2_Watchdog_StallDetector: platform_checkpoint_stale (PASS) enable pid=36564; run pid=39800
- ScarFLIX_v2_AutonomousController: platform_checkpoint_stale (PASS) enable pid=34508; run pid=33376
- ScarFLIX_v2_DurablePlatformGateRunner: platform_checkpoint_stale (PASS) enable pid=32652; run pid=38796

## Notes
- None.