# JasonOS Prime Sentinel

Updated UTC: 2026-06-06T23:45:00Z
Status: REVIEW
Alert level: MEDIUM
Jason action required: false
Codex action required: false

## Signals
- controller_status: RUNNING
- controller_milestone: PLATFORM_GATE_RUNNING
- controller_age_minutes: 2
- watchdog_status: PASS
- watchdog_risk: Low
- watchdog_age_minutes: 2
- dashboard_status: PASS
- dashboard_age_minutes: 1
- mirror_status: PASS
- mirror_age_minutes: 2
- checkpoint_status: RUNNING
- checkpoint_step: existing_durable_owner_active
- checkpoint_age_minutes: 6
- durable_platform_gate_age_minutes: 6
- platform_progress_fresh: false

## Recovery Actions
- ScarFLIX_v2_Watchdog_StallDetector: platform_checkpoint_stale (PASS) enable pid=35328; run pid=22460
- ScarFLIX_v2_AutonomousController: platform_checkpoint_stale (PASS) enable pid=27936; run pid=45408
- ScarFLIX_v2_DurablePlatformGateRunner: platform_checkpoint_stale (PASS) enable pid=40064; run pid=9752

## Notes
- None.