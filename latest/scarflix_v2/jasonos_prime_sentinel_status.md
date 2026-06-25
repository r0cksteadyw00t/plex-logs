# JasonOS Prime Sentinel

Updated UTC: 2026-06-25T20:24:27Z
Status: REVIEW
Alert level: MEDIUM
Jason action required: false
Codex action required: false

## Signals
- controller_status: WAITING_RETRY
- controller_milestone: PLATFORM_GATE_RUNNING
- controller_age_minutes: 63
- watchdog_status: REVIEW
- watchdog_risk: Medium
- watchdog_age_minutes: 3
- dashboard_status: PASS
- dashboard_age_minutes: 4
- mirror_status: RUNNING
- mirror_age_minutes: 0
- checkpoint_status: REVIEW
- checkpoint_step: platform_gate_review
- checkpoint_age_minutes: 8
- durable_platform_gate_age_minutes: 8
- platform_progress_fresh: false

## Recovery Actions
- ScarFLIX_v2_AutonomousController: controller_stale_or_blocked (PASS) enable pid=44204; run pid=38188
- ScarFLIX_v2_Watchdog_StallDetector: platform_checkpoint_stale (PASS) enable pid=42356; run pid=43632
- ScarFLIX_v2_AutonomousController: platform_checkpoint_stale (PASS) enable pid=32556; run pid=11420
- ScarFLIX_v2_DurablePlatformGateRunner: platform_checkpoint_stale (PASS) enable pid=32184; run pid=26416

## Notes
- None.