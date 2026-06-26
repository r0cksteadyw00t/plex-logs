# JasonOS Prime Sentinel

Updated UTC: 2026-06-26T09:19:49Z
Status: REVIEW
Alert level: MEDIUM
Jason action required: false
Codex action required: false

## Signals
- controller_status: WAITING_RETRY
- controller_milestone: PLATFORM_GATE_RUNNING
- controller_age_minutes: 5
- watchdog_status: REVIEW
- watchdog_risk: Medium
- watchdog_age_minutes: 4
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
- ScarFLIX_v2_Watchdog_StallDetector: platform_checkpoint_stale (PASS) enable pid=19504; run pid=30788
- ScarFLIX_v2_AutonomousController: platform_checkpoint_stale (PASS) enable pid=38824; run pid=39320
- ScarFLIX_v2_DurablePlatformGateRunner: platform_checkpoint_stale (PASS) enable pid=1836; run pid=9744

## Notes
- None.