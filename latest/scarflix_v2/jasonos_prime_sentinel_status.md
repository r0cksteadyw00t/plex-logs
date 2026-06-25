# JasonOS Prime Sentinel

Updated UTC: 2026-06-25T11:30:02Z
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
- watchdog_age_minutes: 13
- dashboard_status: PASS
- dashboard_age_minutes: 5
- mirror_status: PASS
- mirror_age_minutes: 4
- checkpoint_status: REVIEW
- checkpoint_step: platform_gate_review
- checkpoint_age_minutes: 12
- durable_platform_gate_age_minutes: 12
- platform_progress_fresh: false

## Recovery Actions
- ScarFLIX_v2_Watchdog_StallDetector: watchdog_stale_or_failed (PASS) enable pid=31756; run pid=2028
- ScarFLIX_v2_AutonomousController: controller_stale_or_blocked (PASS) enable pid=10460; run pid=25088
- ScarFLIX_v2_Watchdog_StallDetector: platform_checkpoint_stale (PASS) enable pid=22280; run pid=35700
- ScarFLIX_v2_AutonomousController: platform_checkpoint_stale (PASS) enable pid=8320; run pid=37232
- ScarFLIX_v2_DurablePlatformGateRunner: platform_checkpoint_stale (PASS) enable pid=14652; run pid=31992

## Notes
- None.