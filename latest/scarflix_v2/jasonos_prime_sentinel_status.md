# JasonOS Prime Sentinel

Updated UTC: 2026-06-06T11:06:03Z
Status: ALERT
Alert level: HIGH
Jason action required: false
Codex action required: true

## Signals
- controller_status: RUNNING
- controller_milestone: PLATFORM_GATE_RUNNING
- controller_age_minutes: 20
- watchdog_status: REVIEW
- watchdog_risk: Medium
- watchdog_age_minutes: 11
- dashboard_status: PASS
- dashboard_age_minutes: 0
- mirror_status: PASS
- mirror_age_minutes: 6
- checkpoint_status: RUNNING
- checkpoint_step: running_platform_gate_attempt_1
- checkpoint_age_minutes: 10

## Recovery Actions
- platform_gate.lock: stale_lock (PASS) removed age_min=9 backup=D:/PlexTools/state/scarflix_v2/platform_gate.lock.stale_20260606110603.bak
- platform_gate_local_runner.lock: stale_lock (PASS) removed age_min=10 backup=D:/PlexTools/state/scarflix_v2/platform_gate_local_runner.lock.stale_20260606110603.bak
- autonomous_controller.lock: stale_lock (PASS) removed age_min=8 backup=D:/PlexTools/state/scarflix_v2/autonomous_controller.lock.stale_20260606110603.bak
- ScarFLIX_v2_Watchdog_StallDetector: watchdog_stale_or_failed (PASS) enable pid=33044; run pid=45464
- ScarFLIX_v2_AutonomousController: controller_stale_or_blocked (PASS) enable pid=15996; run pid=29900
- ScarFLIX_v2_Watchdog_StallDetector: platform_checkpoint_stale (PASS) enable pid=37252; run pid=11056
- ScarFLIX_v2_AutonomousController: platform_checkpoint_stale (PASS) enable pid=20728; run pid=44992
- ScarFLIX_v2_PlatformGate_LocalRunner_Detached: platform_checkpoint_stale (PASS) enable pid=10964; run pid=11780

## Notes
- Same unresolved sentinel signature repeated for three cycles.