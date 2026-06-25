# JasonOS Prime Sentinel

Updated UTC: 2026-06-25T11:15:02Z
Status: REVIEW
Alert level: MEDIUM
Jason action required: false
Codex action required: false

## Signals
- controller_status: WAITING_RETRY
- controller_milestone: PLATFORM_GATE_RUNNING
- controller_age_minutes: 12
- watchdog_status: REVIEW
- watchdog_risk: Medium
- watchdog_age_minutes: 10
- dashboard_status: PASS
- dashboard_age_minutes: 5
- mirror_status: PASS
- mirror_age_minutes: 3
- checkpoint_status: REVIEW
- checkpoint_step: platform_gate_review
- checkpoint_age_minutes: 11
- durable_platform_gate_age_minutes: 11
- platform_progress_fresh: false

## Recovery Actions
- ScarFLIX_v2_Watchdog_StallDetector: watchdog_stale_or_failed (PASS) enable pid=14316; run pid=32504
- ScarFLIX_v2_AutonomousController: controller_stale_or_blocked (PASS) enable pid=24436; run pid=28920
- ScarFLIX_v2_Watchdog_StallDetector: platform_checkpoint_stale (PASS) enable pid=10544; run pid=30332
- ScarFLIX_v2_AutonomousController: platform_checkpoint_stale (PASS) enable pid=37340; run pid=2336
- ScarFLIX_v2_DurablePlatformGateRunner: platform_checkpoint_stale (PASS) enable pid=14716; run pid=37956

## Notes
- None.