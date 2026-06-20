# JasonOS Prime Sentinel

Updated UTC: 2026-06-20T04:27:02Z
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
- mirror_status: REVIEW_RECOVERABLE
- mirror_age_minutes: 2
- checkpoint_status: PASS
- checkpoint_step: platform_gate_pass
- checkpoint_age_minutes: 9
- durable_platform_gate_age_minutes: 9
- platform_progress_fresh: false

## Recovery Actions
- ScarFLIX_v2_Watchdog_StallDetector: platform_checkpoint_stale (PASS) enable pid=39116; run pid=7684
- ScarFLIX_v2_AutonomousController: platform_checkpoint_stale (PASS) enable pid=12408; run pid=24720
- ScarFLIX_v2_DurablePlatformGateRunner: platform_checkpoint_stale (PASS) enable pid=7144; run pid=13800

## Notes
- None.