# JasonOS Prime Sentinel

Updated UTC: 2026-06-06T12:06:02Z
Status: REVIEW
Alert level: MEDIUM
Jason action required: false
Codex action required: false

## Signals
- controller_status: RUNNING
- controller_milestone: PLATFORM_GATE_RUNNING
- controller_age_minutes: 10
- watchdog_status: REVIEW
- watchdog_risk: Medium
- watchdog_age_minutes: 10
- dashboard_status: PASS
- dashboard_age_minutes: 0
- mirror_status: PASS
- mirror_age_minutes: 6
- checkpoint_status: RUNNING
- checkpoint_step: running_platform_gate_attempt_1
- checkpoint_age_minutes: 10

## Recovery Actions
- platform_gate.lock: stale_lock (PASS) removed age_min=10 backup=D:/PlexTools/state/scarflix_v2/platform_gate.lock.stale_20260606120602.bak
- platform_gate_local_runner.lock: stale_lock (PASS) removed age_min=10 backup=D:/PlexTools/state/scarflix_v2/platform_gate_local_runner.lock.stale_20260606120602.bak
- ScarFLIX_v2_Watchdog_StallDetector: watchdog_stale_or_failed (PASS) enable pid=38980; run pid=38720
- ScarFLIX_v2_AutonomousController: controller_stale_or_blocked (PASS) enable pid=39176; run pid=44488
- ScarFLIX_v2_Watchdog_StallDetector: platform_checkpoint_stale (PASS) enable pid=46304; run pid=44068
- ScarFLIX_v2_AutonomousController: platform_checkpoint_stale (PASS) enable pid=26164; run pid=46820
- ScarFLIX_v2_PlatformGate_LocalRunner_Detached: platform_checkpoint_stale (PASS) enable pid=37092; run pid=38992

## Notes
- None.