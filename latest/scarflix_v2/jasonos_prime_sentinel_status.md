# JasonOS Prime Sentinel

Updated UTC: 2026-06-06T11:56:02Z
Status: ALERT
Alert level: HIGH
Jason action required: false
Codex action required: true

## Signals
- controller_status: RUNNING
- controller_milestone: PLATFORM_GATE_RUNNING
- controller_age_minutes: 6
- watchdog_status: REVIEW
- watchdog_risk: Medium
- watchdog_age_minutes: 6
- dashboard_status: PASS
- dashboard_age_minutes: 0
- mirror_status: PASS
- mirror_age_minutes: 5
- checkpoint_status: RUNNING
- checkpoint_step: running_platform_gate_attempt_1
- checkpoint_age_minutes: 20

## Recovery Actions
- ScarFLIX_v2_Watchdog_StallDetector: watchdog_stale_or_failed (PASS) enable pid=23444; run pid=27204
- ScarFLIX_v2_AutonomousController: controller_stale_or_blocked (PASS) enable pid=39436; run pid=27280
- ScarFLIX_v2_Watchdog_StallDetector: platform_checkpoint_stale (PASS) enable pid=36252; run pid=44072
- ScarFLIX_v2_AutonomousController: platform_checkpoint_stale (PASS) enable pid=12512; run pid=43228
- ScarFLIX_v2_PlatformGate_LocalRunner_Detached: platform_checkpoint_stale (PASS) enable pid=43216; run pid=26844

## Notes
- Same unresolved sentinel signature repeated for three cycles.