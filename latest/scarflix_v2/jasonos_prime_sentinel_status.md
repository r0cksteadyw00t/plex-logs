# JasonOS Prime Sentinel

Updated UTC: 2026-06-25T18:40:25Z
Status: REVIEW
Alert level: MEDIUM
Jason action required: false
Codex action required: false

## Signals
- controller_status: WAITING_RETRY
- controller_milestone: PLATFORM_GATE_RUNNING
- controller_age_minutes: 61
- watchdog_status: REVIEW
- watchdog_risk: Medium
- watchdog_age_minutes: 7
- dashboard_status: PASS
- dashboard_age_minutes: 5
- mirror_status: PASS
- mirror_age_minutes: 4
- checkpoint_status: REVIEW
- checkpoint_step: platform_gate_review
- checkpoint_age_minutes: 21
- durable_platform_gate_age_minutes: 21
- platform_progress_fresh: false

## Recovery Actions
- autonomous_controller.lock: stale_lock (PASS) removed age_min=7 backup=D:/PlexTools/state/scarflix_v2/autonomous_controller.lock.stale_20260625184025.bak
- ScarFLIX_v2_Watchdog_StallDetector: watchdog_stale_or_failed (PASS) enable pid=37908; run pid=30992
- ScarFLIX_v2_AutonomousController: controller_stale_or_blocked (PASS) enable pid=43812; run pid=39868
- ScarFLIX_v2_Watchdog_StallDetector: platform_checkpoint_stale (PASS) enable pid=40480; run pid=22544
- ScarFLIX_v2_AutonomousController: platform_checkpoint_stale (PASS) enable pid=39820; run pid=34484
- ScarFLIX_v2_DurablePlatformGateRunner: platform_checkpoint_stale (PASS) enable pid=20048; run pid=29144

## Notes
- None.