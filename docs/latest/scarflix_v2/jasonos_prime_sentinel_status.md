# JasonOS Prime Sentinel

Updated UTC: 2026-06-25T18:34:08Z
Status: REVIEW
Alert level: MEDIUM
Jason action required: false
Codex action required: false

## Signals
- controller_status: RUNNING
- controller_milestone: PLATFORM_GATE_RUNNING
- controller_age_minutes: 1
- watchdog_status: REVIEW
- watchdog_risk: Medium
- watchdog_age_minutes: 1
- dashboard_status: PASS
- dashboard_age_minutes: 4
- mirror_status: RUNNING
- mirror_age_minutes: 0
- checkpoint_status: REVIEW
- checkpoint_step: platform_gate_review
- checkpoint_age_minutes: 14
- durable_platform_gate_age_minutes: 14
- platform_progress_fresh: false

## Recovery Actions
- ScarFLIX_v2_Watchdog_StallDetector: platform_checkpoint_stale (PASS) enable pid=40136; run pid=41048
- ScarFLIX_v2_AutonomousController: platform_checkpoint_stale (PASS) enable pid=31252; run pid=43532
- ScarFLIX_v2_DurablePlatformGateRunner: platform_checkpoint_stale (PASS) enable pid=40076; run pid=5864

## Notes
- None.