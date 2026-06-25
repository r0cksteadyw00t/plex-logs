# JasonOS Prime Sentinel

Updated UTC: 2026-06-25T19:50:04Z
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
- dashboard_age_minutes: 0
- mirror_status: RUNNING
- mirror_age_minutes: 0
- checkpoint_status: REVIEW
- checkpoint_step: platform_gate_review
- checkpoint_age_minutes: 13
- durable_platform_gate_age_minutes: 13
- platform_progress_fresh: false

## Recovery Actions
- autonomous_controller.lock: stale_lock (PASS) removed age_min=5 backup=D:/PlexTools/state/scarflix_v2/autonomous_controller.lock.stale_20260625195004.bak
- ScarFLIX_v2_Watchdog_StallDetector: platform_checkpoint_stale (PASS) enable pid=40244; run pid=42596
- ScarFLIX_v2_AutonomousController: platform_checkpoint_stale (PASS) enable pid=22460; run pid=41476
- ScarFLIX_v2_DurablePlatformGateRunner: platform_checkpoint_stale (PASS) enable pid=16352; run pid=25516

## Notes
- Same unresolved sentinel signature repeated for three cycles.