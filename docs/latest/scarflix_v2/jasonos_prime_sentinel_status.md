# JasonOS Prime Sentinel

Updated UTC: 2026-06-28T01:05:02Z
Status: REVIEW
Alert level: MEDIUM
Jason action required: false
Codex action required: false

## Signals
- controller_status: WAITING_RETRY
- controller_milestone: PLATFORM_GATE_RUNNING
- controller_age_minutes: 5
- watchdog_status: REVIEW
- watchdog_risk: Medium
- watchdog_age_minutes: 4
- dashboard_status: PASS
- dashboard_age_minutes: 5
- mirror_status: PASS
- mirror_age_minutes: 1
- checkpoint_status: REVIEW
- checkpoint_step: platform_gate_review
- checkpoint_age_minutes: 9
- durable_platform_gate_age_minutes: 9
- platform_progress_fresh: false

## Recovery Actions
- ScarFLIX_v2_Watchdog_StallDetector: platform_checkpoint_stale (PASS) enable pid=38288; run pid=17944
- ScarFLIX_v2_AutonomousController: platform_checkpoint_stale (PASS) enable pid=30340; run pid=32200
- ScarFLIX_v2_DurablePlatformGateRunner: platform_checkpoint_stale (PASS) enable pid=1312; run pid=28648

## Notes
- None.