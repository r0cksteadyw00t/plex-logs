# JasonOS Prime Sentinel

Updated UTC: 2026-06-25T12:35:01Z
Status: ALERT
Alert level: HIGH
Jason action required: false
Codex action required: true

## Signals
- controller_status: WAITING_RETRY
- controller_milestone: PLATFORM_GATE_RUNNING
- controller_age_minutes: 32
- watchdog_status: REVIEW
- watchdog_risk: Medium
- watchdog_age_minutes: 14
- dashboard_status: PASS
- dashboard_age_minutes: 5
- mirror_status: PASS
- mirror_age_minutes: 2
- checkpoint_status: REVIEW
- checkpoint_step: platform_gate_review
- checkpoint_age_minutes: 19
- durable_platform_gate_age_minutes: 19
- platform_progress_fresh: false

## Recovery Actions
- ScarFLIX_v2_Watchdog_StallDetector: watchdog_stale_or_failed (PASS) enable pid=38976; run pid=11776
- ScarFLIX_v2_AutonomousController: controller_stale_or_blocked (PASS) enable pid=31080; run pid=39776
- ScarFLIX_v2_Watchdog_StallDetector: platform_checkpoint_stale (PASS) enable pid=38132; run pid=31248
- ScarFLIX_v2_AutonomousController: platform_checkpoint_stale (PASS) enable pid=39732; run pid=27956
- ScarFLIX_v2_DurablePlatformGateRunner: platform_checkpoint_stale (PASS) enable pid=10116; run pid=17908

## Notes
- Same unresolved sentinel signature repeated for three cycles.