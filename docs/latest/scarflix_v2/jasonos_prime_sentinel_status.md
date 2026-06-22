# JasonOS Prime Sentinel

Updated UTC: 2026-06-22T17:55:40Z
Status: REVIEW
Alert level: MEDIUM
Jason action required: false
Codex action required: false

## Signals
- controller_status: RUNNING
- controller_milestone: PLATFORM_GATE_RUNNING
- controller_age_minutes: 13
- watchdog_status: REVIEW
- watchdog_risk: Medium
- watchdog_age_minutes: 7
- dashboard_status: PASS
- dashboard_age_minutes: 3
- mirror_status: RUNNING
- mirror_age_minutes: 1
- checkpoint_status: REVIEW
- checkpoint_step: platform_gate_review
- checkpoint_age_minutes: 7
- durable_platform_gate_age_minutes: 7
- platform_progress_fresh: false

## Recovery Actions
- ScarFLIX_v2_Watchdog_StallDetector: watchdog_stale_or_failed (PASS) enable pid=46568; run pid=13444
- ScarFLIX_v2_AutonomousController: controller_stale_or_blocked (PASS) enable pid=37564; run pid=47040
- ScarFLIX_v2_Watchdog_StallDetector: platform_checkpoint_stale (PASS) enable pid=32588; run pid=6204
- ScarFLIX_v2_AutonomousController: platform_checkpoint_stale (PASS) enable pid=11428; run pid=26912
- ScarFLIX_v2_DurablePlatformGateRunner: platform_checkpoint_stale (PASS) enable pid=24572; run pid=20620

## Notes
- None.