# JasonOS Prime Sentinel

Updated UTC: 2026-06-06T12:28:19Z
Status: REVIEW
Alert level: MEDIUM
Jason action required: false
Codex action required: false

## Signals
- controller_status: RUNNING
- controller_milestone: PLATFORM_GATE_RUNNING
- controller_age_minutes: 6
- watchdog_status: REVIEW
- watchdog_risk: Medium
- watchdog_age_minutes: 0
- dashboard_status: PASS
- dashboard_age_minutes: 2
- mirror_status: PASS
- mirror_age_minutes: 8
- checkpoint_status: RUNNING
- checkpoint_step: running_platform_gate_attempt_1
- checkpoint_age_minutes: 12

## Recovery Actions
- ScarFLIX_v2_AutonomousController: controller_stale_or_blocked (PASS) enable pid=4132; run pid=22852
- ScarFLIX_v2_Watchdog_StallDetector: platform_checkpoint_stale (PASS) enable pid=27908; run pid=12872
- ScarFLIX_v2_AutonomousController: platform_checkpoint_stale (PASS) enable pid=34128; run pid=43536
- ScarFLIX_v2_PlatformGate_LocalRunner_Detached: platform_checkpoint_stale (PASS) enable pid=9576; run pid=39524

## Notes
- None.