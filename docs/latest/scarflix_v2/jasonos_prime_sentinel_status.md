# JasonOS Prime Sentinel

Updated UTC: 2026-06-26T01:30:03Z
Status: ALERT
Alert level: HIGH
Jason action required: false
Codex action required: true

## Signals
- controller_status: WAITING_RETRY
- controller_milestone: PLATFORM_GATE_REVIEW_TRANSIENT_RETRY_SCHEDULED
- controller_age_minutes: 30
- watchdog_status: REVIEW
- watchdog_risk: Medium
- watchdog_age_minutes: 10
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
- ScarFLIX_v2_Watchdog_StallDetector: watchdog_stale_or_failed (PASS) enable pid=31740; run pid=44656
- ScarFLIX_v2_AutonomousController: controller_stale_or_blocked (PASS) enable pid=46448; run pid=41336
- ScarFLIX_v2_Watchdog_StallDetector: platform_checkpoint_stale (PASS) enable pid=38384; run pid=43788
- ScarFLIX_v2_AutonomousController: platform_checkpoint_stale (PASS) enable pid=15896; run pid=46900
- ScarFLIX_v2_DurablePlatformGateRunner: platform_checkpoint_stale (PASS) enable pid=18236; run pid=46692

## Notes
- Same unresolved sentinel signature repeated for three cycles.