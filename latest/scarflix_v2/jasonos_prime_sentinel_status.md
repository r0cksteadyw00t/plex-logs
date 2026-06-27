# JasonOS Prime Sentinel

Updated UTC: 2026-06-27T12:35:13Z
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
- watchdog_age_minutes: 4
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
- platform_gate.lock: stale_lock (PASS) removed age_min=8 backup=D:/PlexTools/state/scarflix_v2/platform_gate.lock.stale_20260627123512.bak
- ScarFLIX_v2_Watchdog_StallDetector: platform_checkpoint_stale (PASS) enable pid=2400; run pid=30764
- ScarFLIX_v2_AutonomousController: platform_checkpoint_stale (PASS) enable pid=19184; run pid=6552
- ScarFLIX_v2_DurablePlatformGateRunner: platform_checkpoint_stale (PASS) enable pid=24612; run pid=36704

## Notes
- None.