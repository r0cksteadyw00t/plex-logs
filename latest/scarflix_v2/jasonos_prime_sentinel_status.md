# JasonOS Prime Sentinel

Updated UTC: 2026-06-26T02:24:10Z
Status: ALERT
Alert level: HIGH
Jason action required: false
Codex action required: true

## Signals
- controller_status: WAITING_RETRY
- controller_milestone: PLATFORM_GATE_REVIEW_TRANSIENT_RETRY_SCHEDULED
- controller_age_minutes: 32
- watchdog_status: REVIEW
- watchdog_risk: Medium
- watchdog_age_minutes: 15
- dashboard_status: PASS
- dashboard_age_minutes: 4
- mirror_status: RUNNING
- mirror_age_minutes: 0
- checkpoint_status: REVIEW
- checkpoint_step: platform_gate_review
- checkpoint_age_minutes: 31
- durable_platform_gate_age_minutes: 31
- platform_progress_fresh: false

## Recovery Actions
- ScarFLIX_v2_Watchdog_StallDetector: watchdog_stale_or_failed (PASS) enable pid=25732; run pid=34004
- ScarFLIX_v2_AutonomousController: controller_stale_or_blocked (PASS) enable pid=17952; run pid=43244
- ScarFLIX_v2_Watchdog_StallDetector: platform_checkpoint_stale (PASS) enable pid=42128; run pid=30016
- ScarFLIX_v2_AutonomousController: platform_checkpoint_stale (PASS) enable pid=23456; run pid=41540
- ScarFLIX_v2_DurablePlatformGateRunner: platform_checkpoint_stale (PASS) enable pid=38396; run pid=22236

## Notes
- Same unresolved sentinel signature repeated for three cycles.