# JasonOS Prime Sentinel

Updated UTC: 2026-06-25T23:50:01Z
Status: REVIEW
Alert level: MEDIUM
Jason action required: false
Codex action required: false

## Signals
- controller_status: RUNNING
- controller_milestone: PLATFORM_GATE_RUNNING
- controller_age_minutes: 8
- watchdog_status: REVIEW
- watchdog_risk: Medium
- watchdog_age_minutes: 8
- dashboard_status: PASS
- dashboard_age_minutes: 5
- mirror_status: PASS
- mirror_age_minutes: 2
- checkpoint_status: REVIEW
- checkpoint_step: platform_gate_review
- checkpoint_age_minutes: 9
- durable_platform_gate_age_minutes: 9
- platform_progress_fresh: false

## Recovery Actions
- autonomous_controller.lock: stale_lock (PASS) removed age_min=9 backup=D:/PlexTools/state/scarflix_v2/autonomous_controller.lock.stale_20260625235001.bak
- ScarFLIX_v2_Watchdog_StallDetector: watchdog_stale_or_failed (PASS) enable pid=42776; run pid=39008
- ScarFLIX_v2_AutonomousController: controller_stale_or_blocked (PASS) enable pid=28732; run pid=44268
- ScarFLIX_v2_Watchdog_StallDetector: platform_checkpoint_stale (PASS) enable pid=18144; run pid=24212
- ScarFLIX_v2_AutonomousController: platform_checkpoint_stale (PASS) enable pid=13348; run pid=32980
- ScarFLIX_v2_DurablePlatformGateRunner: platform_checkpoint_stale (PASS) enable pid=34364; run pid=4896

## Notes
- None.