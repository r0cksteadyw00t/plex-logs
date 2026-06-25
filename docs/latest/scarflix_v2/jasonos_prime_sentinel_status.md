# JasonOS Prime Sentinel

Updated UTC: 2026-06-25T22:33:30Z
Status: REVIEW
Alert level: MEDIUM
Jason action required: false
Codex action required: false

## Signals
- controller_status: RUNNING
- controller_milestone: PLATFORM_GATE_RUNNING
- controller_age_minutes: 4
- watchdog_status: REVIEW
- watchdog_risk: Medium
- watchdog_age_minutes: 3
- dashboard_status: PASS
- dashboard_age_minutes: 3
- mirror_status: RUNNING
- mirror_age_minutes: 0
- checkpoint_status: REVIEW
- checkpoint_step: platform_gate_review
- checkpoint_age_minutes: 13
- durable_platform_gate_age_minutes: 13
- platform_progress_fresh: false

## Recovery Actions
- autonomous_controller.lock: stale_lock (PASS) removed age_min=5 backup=D:/PlexTools/state/scarflix_v2/autonomous_controller.lock.stale_20260625223330.bak
- ScarFLIX_v2_Watchdog_StallDetector: platform_checkpoint_stale (PASS) enable pid=30860; run pid=19928
- ScarFLIX_v2_AutonomousController: platform_checkpoint_stale (PASS) enable pid=38236; run pid=35024
- ScarFLIX_v2_DurablePlatformGateRunner: platform_checkpoint_stale (PASS) enable pid=19688; run pid=42976

## Notes
- None.