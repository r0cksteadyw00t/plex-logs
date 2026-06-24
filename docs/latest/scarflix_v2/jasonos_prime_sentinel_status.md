# JasonOS Prime Sentinel

Updated UTC: 2026-06-24T02:17:01Z
Status: REVIEW
Alert level: MEDIUM
Jason action required: false
Codex action required: false

## Signals
- controller_status: RUNNING
- controller_milestone: PLATFORM_GATE_RUNNING
- controller_age_minutes: 2
- watchdog_status: REVIEW
- watchdog_risk: Medium
- watchdog_age_minutes: 2
- dashboard_status: PASS
- dashboard_age_minutes: 1
- mirror_status: RUNNING
- mirror_age_minutes: 0
- checkpoint_status: RUNNING
- checkpoint_step: existing_durable_owner_active
- checkpoint_age_minutes: 6
- durable_platform_gate_age_minutes: 6
- platform_progress_fresh: false

## Recovery Actions
- ScarFLIX_v2_Watchdog_StallDetector: platform_checkpoint_stale (PASS) enable pid=24072; run pid=45828
- ScarFLIX_v2_AutonomousController: platform_checkpoint_stale (PASS) enable pid=3124; run pid=44360
- ScarFLIX_v2_DurablePlatformGateRunner: platform_checkpoint_stale (PASS) enable pid=47268; run pid=51008

## Notes
- None.