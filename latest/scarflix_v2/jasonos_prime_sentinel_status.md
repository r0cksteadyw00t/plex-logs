# JasonOS Prime Sentinel

Updated UTC: 2026-06-27T22:00:15Z
Status: ALERT
Alert level: HIGH
Jason action required: false
Codex action required: true

## Signals
- controller_status: RUNNING
- controller_milestone: PLATFORM_GATE_RUNNING
- controller_age_minutes: 5
- watchdog_status: REVIEW
- watchdog_risk: Medium
- watchdog_age_minutes: 5
- dashboard_status: PASS
- dashboard_age_minutes: 5
- mirror_status: PASS
- mirror_age_minutes: 1
- checkpoint_status: REVIEW
- checkpoint_step: platform_gate_review
- checkpoint_age_minutes: 7
- durable_platform_gate_age_minutes: 7
- platform_progress_fresh: false

## Recovery Actions
- platform_gate.lock: stale_lock (PASS) removed age_min=8 backup=D:/PlexTools/state/scarflix_v2/platform_gate.lock.stale_20260627220015.bak
- ScarFLIX_v2_Watchdog_StallDetector: platform_checkpoint_stale (PASS) enable pid=37600; run pid=35448
- ScarFLIX_v2_AutonomousController: platform_checkpoint_stale (PASS) enable pid=15272; run pid=35212
- ScarFLIX_v2_DurablePlatformGateRunner: platform_checkpoint_stale (PASS) enable pid=34200; run pid=33260

## Notes
- Same unresolved sentinel signature repeated for three cycles.