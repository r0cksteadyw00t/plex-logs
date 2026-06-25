# JasonOS Prime Sentinel

Updated UTC: 2026-06-25T19:15:02Z
Status: ALERT
Alert level: HIGH
Jason action required: false
Codex action required: true

## Signals
- controller_status: RUNNING
- controller_milestone: PLATFORM_GATE_RUNNING
- controller_age_minutes: 10
- watchdog_status: REVIEW
- watchdog_risk: Medium
- watchdog_age_minutes: 9
- dashboard_status: PASS
- dashboard_age_minutes: 0
- mirror_status: RUNNING
- mirror_age_minutes: 0
- checkpoint_status: REVIEW
- checkpoint_step: platform_gate_review
- checkpoint_age_minutes: 8
- durable_platform_gate_age_minutes: 8
- platform_progress_fresh: false

## Recovery Actions
- ScarFLIX_v2_Watchdog_StallDetector: watchdog_stale_or_failed (PASS) enable pid=39604; run pid=32752
- ScarFLIX_v2_AutonomousController: controller_stale_or_blocked (PASS) enable pid=25840; run pid=12532
- ScarFLIX_v2_Watchdog_StallDetector: platform_checkpoint_stale (PASS) enable pid=14048; run pid=41052
- ScarFLIX_v2_AutonomousController: platform_checkpoint_stale (PASS) enable pid=44088; run pid=41480
- ScarFLIX_v2_DurablePlatformGateRunner: platform_checkpoint_stale (PASS) enable pid=40108; run pid=41928

## Notes
- Same unresolved sentinel signature repeated for three cycles.