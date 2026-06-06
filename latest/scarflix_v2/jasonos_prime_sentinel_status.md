# JasonOS Prime Sentinel

Updated UTC: 2026-06-06T11:46:02Z
Status: ALERT
Alert level: HIGH
Jason action required: false
Codex action required: true

## Signals
- controller_status: RUNNING
- controller_milestone: PLATFORM_GATE_RUNNING
- controller_age_minutes: 9
- watchdog_status: REVIEW
- watchdog_risk: Medium
- watchdog_age_minutes: 5
- dashboard_status: PASS
- dashboard_age_minutes: 0
- mirror_status: PASS
- mirror_age_minutes: 6
- checkpoint_status: RUNNING
- checkpoint_step: running_platform_gate_attempt_1
- checkpoint_age_minutes: 10

## Recovery Actions
- ScarFLIX_v2_AutonomousController: controller_stale_or_blocked (PASS) enable pid=29124; run pid=4712
- ScarFLIX_v2_Watchdog_StallDetector: platform_checkpoint_stale (PASS) enable pid=17296; run pid=36180
- ScarFLIX_v2_AutonomousController: platform_checkpoint_stale (PASS) enable pid=10948; run pid=26568
- ScarFLIX_v2_PlatformGate_LocalRunner_Detached: platform_checkpoint_stale (PASS) enable pid=23404; run pid=16604

## Notes
- Same unresolved sentinel signature repeated for three cycles.