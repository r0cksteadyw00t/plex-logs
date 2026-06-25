# JasonOS Prime Sentinel

Updated UTC: 2026-06-25T18:49:39Z
Status: ALERT
Alert level: HIGH
Jason action required: false
Codex action required: true

## Signals
- controller_status: WAITING_RETRY
- controller_milestone: PLATFORM_GATE_RUNNING
- controller_age_minutes: 70
- watchdog_status: REVIEW
- watchdog_risk: Medium
- watchdog_age_minutes: 16
- dashboard_status: PASS
- dashboard_age_minutes: 5
- mirror_status: RUNNING
- mirror_age_minutes: 0
- checkpoint_status: REVIEW
- checkpoint_step: platform_gate_review
- checkpoint_age_minutes: 30
- durable_platform_gate_age_minutes: 30
- platform_progress_fresh: false

## Recovery Actions
- ScarFLIX_v2_Watchdog_StallDetector: watchdog_stale_or_failed (PASS) enable pid=32756; run pid=40332
- ScarFLIX_v2_AutonomousController: controller_stale_or_blocked (PASS) enable pid=33464; run pid=40000
- ScarFLIX_v2_Watchdog_StallDetector: platform_checkpoint_stale (PASS) enable pid=16400; run pid=12316
- ScarFLIX_v2_AutonomousController: platform_checkpoint_stale (PASS) enable pid=8548; run pid=38488
- ScarFLIX_v2_DurablePlatformGateRunner: platform_checkpoint_stale (PASS) enable pid=17716; run pid=31884

## Notes
- Same unresolved sentinel signature repeated for three cycles.