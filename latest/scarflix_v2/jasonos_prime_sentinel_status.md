# JasonOS Prime Sentinel

Updated UTC: 2026-06-25T18:30:02Z
Status: REVIEW
Alert level: MEDIUM
Jason action required: false
Codex action required: false

## Signals
- controller_status: RUNNING
- controller_milestone: PLATFORM_GATE_RUNNING
- controller_age_minutes: 2
- watchdog_status: REVIEW
- watchdog_risk: Medium
- watchdog_age_minutes: 2
- dashboard_status: PASS
- dashboard_age_minutes: 5
- mirror_status: PASS
- mirror_age_minutes: 2
- checkpoint_status: REVIEW
- checkpoint_step: platform_gate_review
- checkpoint_age_minutes: 10
- durable_platform_gate_age_minutes: 10
- platform_progress_fresh: false

## Recovery Actions
- autonomous_controller.lock: stale_lock (PASS) removed age_min=7 backup=D:/PlexTools/state/scarflix_v2/autonomous_controller.lock.stale_20260625183002.bak
- ScarFLIX_v2_Watchdog_StallDetector: platform_checkpoint_stale (PASS) enable pid=41564; run pid=44900
- ScarFLIX_v2_AutonomousController: platform_checkpoint_stale (PASS) enable pid=42260; run pid=15984
- ScarFLIX_v2_DurablePlatformGateRunner: platform_checkpoint_stale (PASS) enable pid=39976; run pid=44656

## Notes
- None.