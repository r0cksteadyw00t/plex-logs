# JasonOS Prime Sentinel

Updated UTC: 2026-06-26T02:15:04Z
Status: REVIEW
Alert level: MEDIUM
Jason action required: false
Codex action required: false

## Signals
- controller_status: WAITING_RETRY
- controller_milestone: PLATFORM_GATE_REVIEW_TRANSIENT_RETRY_SCHEDULED
- controller_age_minutes: 23
- watchdog_status: REVIEW
- watchdog_risk: Medium
- watchdog_age_minutes: 6
- dashboard_status: PASS
- dashboard_age_minutes: 5
- mirror_status: PASS
- mirror_age_minutes: 1
- checkpoint_status: REVIEW
- checkpoint_step: platform_gate_review
- checkpoint_age_minutes: 21
- durable_platform_gate_age_minutes: 21
- platform_progress_fresh: false

## Recovery Actions
- ScarFLIX_v2_Watchdog_StallDetector: watchdog_stale_or_failed (PASS) enable pid=14112; run pid=44208
- ScarFLIX_v2_AutonomousController: controller_stale_or_blocked (PASS) enable pid=43456; run pid=2480
- ScarFLIX_v2_Watchdog_StallDetector: platform_checkpoint_stale (PASS) enable pid=27864; run pid=21852
- ScarFLIX_v2_AutonomousController: platform_checkpoint_stale (PASS) enable pid=6792; run pid=39752
- ScarFLIX_v2_DurablePlatformGateRunner: platform_checkpoint_stale (PASS) enable pid=15004; run pid=24448

## Notes
- None.