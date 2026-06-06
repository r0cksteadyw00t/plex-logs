# JasonOS Prime Sentinel

Updated UTC: 2026-06-06T13:20:04Z
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
- watchdog_age_minutes: 4
- dashboard_status: PASS
- dashboard_age_minutes: 4
- mirror_status: PASS
- mirror_age_minutes: 3
- checkpoint_status: RUNNING
- checkpoint_step: running_platform_gate_attempt_1
- checkpoint_age_minutes: 6

## Recovery Actions
- platform_gate.lock: stale_lock (PASS) removed age_min=6 backup=D:/PlexTools/state/scarflix_v2/platform_gate.lock.stale_20260606132004.bak
- platform_gate_local_runner.lock: stale_lock (PASS) removed age_min=6 backup=D:/PlexTools/state/scarflix_v2/platform_gate_local_runner.lock.stale_20260606132004.bak
- ScarFLIX_v2_AutonomousController: controller_stale_or_blocked (PASS) enable pid=37008; run pid=37524
- ScarFLIX_v2_Watchdog_StallDetector: platform_checkpoint_stale (PASS) enable pid=14820; run pid=38048
- ScarFLIX_v2_AutonomousController: platform_checkpoint_stale (PASS) enable pid=4684; run pid=5596
- ScarFLIX_v2_PlatformGate_LocalRunner_Detached: platform_checkpoint_stale (PASS) enable pid=44192; run pid=22948

## Notes
- None.