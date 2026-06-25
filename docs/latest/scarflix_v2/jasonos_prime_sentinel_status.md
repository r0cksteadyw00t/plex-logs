# JasonOS Prime Sentinel

Updated UTC: 2026-06-25T16:15:02Z
Status: REVIEW
Alert level: MEDIUM
Jason action required: false
Codex action required: false

## Signals
- controller_status: RUNNING
- controller_milestone: PLATFORM_GATE_RUNNING
- controller_age_minutes: 1
- watchdog_status: REVIEW
- watchdog_risk: Medium
- watchdog_age_minutes: 10
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
- autonomous_controller.lock: stale_lock (PASS) removed age_min=6 backup=D:/PlexTools/state/scarflix_v2/autonomous_controller.lock.stale_20260625161502.bak
- ScarFLIX_v2_Watchdog_StallDetector: watchdog_stale_or_failed (PASS) enable pid=38640; run pid=35856
- ScarFLIX_v2_Watchdog_StallDetector: platform_checkpoint_stale (PASS) enable pid=8332; run pid=37652
- ScarFLIX_v2_AutonomousController: platform_checkpoint_stale (PASS) enable pid=18772; run pid=25012
- ScarFLIX_v2_DurablePlatformGateRunner: platform_checkpoint_stale (PASS) enable pid=18240; run pid=30468

## Notes
- None.