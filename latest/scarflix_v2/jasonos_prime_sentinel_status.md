# JasonOS Prime Sentinel

Updated UTC: 2026-06-25T16:00:03Z
Status: REVIEW
Alert level: MEDIUM
Jason action required: false
Codex action required: false

## Signals
- controller_status: WAITING_RETRY
- controller_milestone: PLATFORM_GATE_RUNNING
- controller_age_minutes: 67
- watchdog_status: REVIEW
- watchdog_risk: Medium
- watchdog_age_minutes: 12
- dashboard_status: PASS
- dashboard_age_minutes: 4
- mirror_status: PASS
- mirror_age_minutes: 3
- checkpoint_status: REVIEW
- checkpoint_step: platform_gate_review
- checkpoint_age_minutes: 15
- durable_platform_gate_age_minutes: 15
- platform_progress_fresh: false

## Recovery Actions
- ScarFLIX_v2_Watchdog_StallDetector: watchdog_stale_or_failed (PASS) enable pid=41892; run pid=42492
- ScarFLIX_v2_AutonomousController: controller_stale_or_blocked (PASS) enable pid=37392; run pid=35368
- ScarFLIX_v2_Watchdog_StallDetector: platform_checkpoint_stale (PASS) enable pid=43524; run pid=18240
- ScarFLIX_v2_AutonomousController: platform_checkpoint_stale (PASS) enable pid=36292; run pid=2196
- ScarFLIX_v2_DurablePlatformGateRunner: platform_checkpoint_stale (PASS) enable pid=36020; run pid=43628

## Notes
- None.