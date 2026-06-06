# JasonOS Prime Sentinel

Updated UTC: 2026-06-06T11:50:03Z
Status: ALERT
Alert level: HIGH
Jason action required: false
Codex action required: true

## Signals
- controller_status: RUNNING
- controller_milestone: PLATFORM_GATE_RUNNING
- controller_age_minutes: 4
- watchdog_status: REVIEW
- watchdog_risk: Medium
- watchdog_age_minutes: 4
- dashboard_status: PASS
- dashboard_age_minutes: 4
- mirror_status: PASS
- mirror_age_minutes: 3
- checkpoint_status: RUNNING
- checkpoint_step: running_platform_gate_attempt_1
- checkpoint_age_minutes: 14

## Recovery Actions
- ScarFLIX_v2_Watchdog_StallDetector: platform_checkpoint_stale (PASS) enable pid=43976; run pid=7044
- ScarFLIX_v2_AutonomousController: platform_checkpoint_stale (PASS) enable pid=3760; run pid=13724
- ScarFLIX_v2_PlatformGate_LocalRunner_Detached: platform_checkpoint_stale (PASS) enable pid=38864; run pid=45460

## Notes
- Same unresolved sentinel signature repeated for three cycles.