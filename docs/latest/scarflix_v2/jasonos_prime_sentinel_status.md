# JasonOS Prime Sentinel

Updated UTC: 2026-06-25T15:20:02Z
Status: ALERT
Alert level: HIGH
Jason action required: false
Codex action required: true

## Signals
- controller_status: RUNNING
- controller_milestone: PLATFORM_GATE_RUNNING
- controller_age_minutes: 7
- watchdog_status: REVIEW
- watchdog_risk: Medium
- watchdog_age_minutes: 5
- dashboard_status: PASS
- dashboard_age_minutes: 5
- mirror_status: PASS
- mirror_age_minutes: 2
- checkpoint_status: REVIEW
- checkpoint_step: platform_gate_review
- checkpoint_age_minutes: 16
- durable_platform_gate_age_minutes: 16
- platform_progress_fresh: false

## Recovery Actions
- autonomous_controller.lock: stale_lock (PASS) removed age_min=7 backup=D:/PlexTools/state/scarflix_v2/autonomous_controller.lock.stale_20260625152001.bak
- ScarFLIX_v2_AutonomousController: controller_stale_or_blocked (PASS) enable pid=11888; run pid=2948
- ScarFLIX_v2_Watchdog_StallDetector: platform_checkpoint_stale (PASS) enable pid=40004; run pid=8572
- ScarFLIX_v2_AutonomousController: platform_checkpoint_stale (PASS) enable pid=10988; run pid=32556
- ScarFLIX_v2_DurablePlatformGateRunner: platform_checkpoint_stale (PASS) enable pid=18908; run pid=38284

## Notes
- Same unresolved sentinel signature repeated for three cycles.