# JasonOS Prime Sentinel

Updated UTC: 2026-06-06T12:56:03Z
Status: REVIEW
Alert level: MEDIUM
Jason action required: false
Codex action required: false

## Signals
- controller_status: RUNNING
- controller_milestone: PLATFORM_GATE_RUNNING
- controller_age_minutes: 13
- watchdog_status: REVIEW
- watchdog_risk: Medium
- watchdog_age_minutes: 6
- dashboard_status: PASS
- dashboard_age_minutes: 0
- mirror_status: PASS
- mirror_age_minutes: 6
- checkpoint_status: RUNNING
- checkpoint_step: running_platform_gate_attempt_1
- checkpoint_age_minutes: 13

## Recovery Actions
- autonomous_controller.lock: stale_lock (PASS) removed age_min=6 backup=D:/PlexTools/state/scarflix_v2/autonomous_controller.lock.stale_20260606125603.bak
- ScarFLIX_v2_Watchdog_StallDetector: watchdog_stale_or_failed (PASS) enable pid=34896; run pid=45676
- ScarFLIX_v2_AutonomousController: controller_stale_or_blocked (PASS) enable pid=43232; run pid=19304
- ScarFLIX_v2_Watchdog_StallDetector: platform_checkpoint_stale (PASS) enable pid=39392; run pid=18108
- ScarFLIX_v2_AutonomousController: platform_checkpoint_stale (PASS) enable pid=24920; run pid=36032
- ScarFLIX_v2_PlatformGate_LocalRunner_Detached: platform_checkpoint_stale (PASS) enable pid=41764; run pid=42484

## Notes
- None.