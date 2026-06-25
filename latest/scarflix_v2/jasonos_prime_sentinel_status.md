# JasonOS Prime Sentinel

Updated UTC: 2026-06-25T14:03:45Z
Status: ALERT
Alert level: HIGH
Jason action required: false
Codex action required: true

## Signals
- controller_status: RUNNING
- controller_milestone: PLATFORM_GATE_RUNNING
- controller_age_minutes: 18
- watchdog_status: REVIEW
- watchdog_risk: Medium
- watchdog_age_minutes: 18
- dashboard_status: PASS
- dashboard_age_minutes: 3
- mirror_status: RUNNING
- mirror_age_minutes: 0
- checkpoint_status: REVIEW
- checkpoint_step: platform_gate_review
- checkpoint_age_minutes: 18
- durable_platform_gate_age_minutes: 18
- platform_progress_fresh: false

## Recovery Actions
- ScarFLIX_v2_Watchdog_StallDetector: watchdog_stale_or_failed (PASS) enable pid=39032; run pid=15220
- ScarFLIX_v2_AutonomousController: controller_stale_or_blocked (PASS) enable pid=39076; run pid=9028
- ScarFLIX_v2_Watchdog_StallDetector: platform_checkpoint_stale (PASS) enable pid=3948; run pid=23320
- ScarFLIX_v2_AutonomousController: platform_checkpoint_stale (PASS) enable pid=13248; run pid=11420
- ScarFLIX_v2_DurablePlatformGateRunner: platform_checkpoint_stale (PASS) enable pid=38032; run pid=39836

## Notes
- Same unresolved sentinel signature repeated for three cycles.