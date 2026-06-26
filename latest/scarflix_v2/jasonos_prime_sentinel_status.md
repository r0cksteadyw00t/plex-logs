# JasonOS Prime Sentinel

Updated UTC: 2026-06-26T02:00:03Z
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
- watchdog_age_minutes: 7
- dashboard_status: PASS
- dashboard_age_minutes: 4
- mirror_status: PASS
- mirror_age_minutes: 2
- checkpoint_status: REVIEW
- checkpoint_step: platform_gate_review
- checkpoint_age_minutes: 6
- durable_platform_gate_age_minutes: 6
- platform_progress_fresh: false

## Recovery Actions
- autonomous_controller.lock: stale_lock (PASS) removed age_min=8 backup=D:/PlexTools/state/scarflix_v2/autonomous_controller.lock.stale_20260626020003.bak
- ScarFLIX_v2_Watchdog_StallDetector: watchdog_stale_or_failed (PASS) enable pid=37540; run pid=37892
- ScarFLIX_v2_AutonomousController: controller_stale_or_blocked (PASS) enable pid=39084; run pid=15492
- ScarFLIX_v2_Watchdog_StallDetector: platform_checkpoint_stale (PASS) enable pid=35148; run pid=26352
- ScarFLIX_v2_AutonomousController: platform_checkpoint_stale (PASS) enable pid=44108; run pid=25524
- ScarFLIX_v2_DurablePlatformGateRunner: platform_checkpoint_stale (PASS) enable pid=36572; run pid=27612

## Notes
- None.