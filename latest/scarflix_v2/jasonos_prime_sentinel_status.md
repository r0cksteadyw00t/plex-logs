# JasonOS Prime Sentinel

Updated UTC: 2026-06-26T00:00:04Z
Status: ALERT
Alert level: HIGH
Jason action required: false
Codex action required: true

## Signals
- controller_status: RUNNING
- controller_milestone: PLATFORM_GATE_RUNNING
- controller_age_minutes: 8
- watchdog_status: REVIEW
- watchdog_risk: Medium
- watchdog_age_minutes: 5
- dashboard_status: PASS
- dashboard_age_minutes: 5
- mirror_status: PASS
- mirror_age_minutes: 2
- checkpoint_status: REVIEW
- checkpoint_step: platform_gate_review
- checkpoint_age_minutes: 19
- durable_platform_gate_age_minutes: 19
- platform_progress_fresh: false

## Recovery Actions
- autonomous_controller.lock: stale_lock (PASS) removed age_min=9 backup=D:/PlexTools/state/scarflix_v2/autonomous_controller.lock.stale_20260626000003.bak
- ScarFLIX_v2_AutonomousController: controller_stale_or_blocked (PASS) enable pid=31664; run pid=19964
- ScarFLIX_v2_Watchdog_StallDetector: platform_checkpoint_stale (PASS) enable pid=37428; run pid=32624
- ScarFLIX_v2_AutonomousController: platform_checkpoint_stale (PASS) enable pid=5924; run pid=44148
- ScarFLIX_v2_DurablePlatformGateRunner: platform_checkpoint_stale (PASS) enable pid=39784; run pid=43036

## Notes
- Same unresolved sentinel signature repeated for three cycles.