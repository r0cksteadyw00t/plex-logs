# JasonOS Prime Sentinel

Updated UTC: 2026-06-28T00:00:04Z
Status: REVIEW
Alert level: MEDIUM
Jason action required: false
Codex action required: false

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
- checkpoint_age_minutes: 8
- durable_platform_gate_age_minutes: 8
- platform_progress_fresh: false

## Recovery Actions
- platform_gate.lock: stale_lock (PASS) removed age_min=9 backup=D:/PlexTools/state/scarflix_v2/platform_gate.lock.stale_20260628000004.bak
- ScarFLIX_v2_Watchdog_StallDetector: platform_checkpoint_stale (PASS) enable pid=35456; run pid=18172
- ScarFLIX_v2_AutonomousController: platform_checkpoint_stale (PASS) enable pid=656; run pid=38132
- ScarFLIX_v2_DurablePlatformGateRunner: platform_checkpoint_stale (PASS) enable pid=20236; run pid=29424

## Notes
- None.