# JasonOS Prime Sentinel

Updated UTC: 2026-06-25T20:45:03Z
Status: REVIEW
Alert level: MEDIUM
Jason action required: false
Codex action required: false

## Signals
- controller_status: WAITING_RETRY
- controller_milestone: PLATFORM_GATE_REVIEW_TRANSIENT_RETRY_SCHEDULED
- controller_age_minutes: 30
- watchdog_status: REVIEW
- watchdog_risk: Medium
- watchdog_age_minutes: 7
- dashboard_status: PASS
- dashboard_age_minutes: 5
- mirror_status: PASS
- mirror_age_minutes: 2
- checkpoint_status: REVIEW
- checkpoint_step: platform_gate_review
- checkpoint_age_minutes: 29
- durable_platform_gate_age_minutes: 29
- platform_progress_fresh: false

## Recovery Actions
- ScarFLIX_v2_Watchdog_StallDetector: watchdog_stale_or_failed (PASS) enable pid=42700; run pid=12700
- ScarFLIX_v2_AutonomousController: controller_stale_or_blocked (PASS) enable pid=30500; run pid=5920
- ScarFLIX_v2_Watchdog_StallDetector: platform_checkpoint_stale (PASS) enable pid=36868; run pid=42160
- ScarFLIX_v2_AutonomousController: platform_checkpoint_stale (PASS) enable pid=37096; run pid=38236
- ScarFLIX_v2_DurablePlatformGateRunner: platform_checkpoint_stale (PASS) enable pid=4604; run pid=12664

## Notes
- None.