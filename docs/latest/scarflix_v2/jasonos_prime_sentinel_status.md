# JasonOS Prime Sentinel

Updated UTC: 2026-06-07T00:12:03Z
Status: REVIEW
Alert level: MEDIUM
Jason action required: false
Codex action required: false

## Signals
- controller_status: RUNNING
- controller_milestone: PLATFORM_GATE_FAIL_SOURCE_QUARANTINE_REQUIRED
- controller_age_minutes: 1
- watchdog_status: PASS
- watchdog_risk: Low
- watchdog_age_minutes: 4
- dashboard_status: PASS
- dashboard_age_minutes: 1
- mirror_status: PASS
- mirror_age_minutes: 1
- checkpoint_status: REVIEW
- checkpoint_step: platform_gate_review
- checkpoint_age_minutes: 6
- durable_platform_gate_age_minutes: 6
- platform_progress_fresh: false

## Recovery Actions
- ScarFLIX_v2_Watchdog_StallDetector: platform_checkpoint_stale (PASS) enable pid=35980; run pid=15748
- ScarFLIX_v2_AutonomousController: platform_checkpoint_stale (PASS) enable pid=13952; run pid=6604
- ScarFLIX_v2_DurablePlatformGateRunner: platform_checkpoint_stale (PASS) enable pid=45108; run pid=32464

## Notes
- None.