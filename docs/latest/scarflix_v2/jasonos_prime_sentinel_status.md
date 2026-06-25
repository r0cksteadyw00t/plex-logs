# JasonOS Prime Sentinel

Updated UTC: 2026-06-25T21:20:02Z
Status: REVIEW
Alert level: MEDIUM
Jason action required: false
Codex action required: false

## Signals
- controller_status: RUNNING
- controller_milestone: PLATFORM_GATE_RUNNING
- controller_age_minutes: 13
- watchdog_status: REVIEW
- watchdog_risk: Medium
- watchdog_age_minutes: 9
- dashboard_status: PASS
- dashboard_age_minutes: 5
- mirror_status: PASS
- mirror_age_minutes: 3
- checkpoint_status: REVIEW
- checkpoint_step: platform_gate_review
- checkpoint_age_minutes: 14
- durable_platform_gate_age_minutes: 14
- platform_progress_fresh: false

## Recovery Actions
- autonomous_controller.lock: stale_lock (PASS) removed age_min=9 backup=D:/PlexTools/state/scarflix_v2/autonomous_controller.lock.stale_20260625212002.bak
- ScarFLIX_v2_Watchdog_StallDetector: watchdog_stale_or_failed (PASS) enable pid=12664; run pid=40900
- ScarFLIX_v2_AutonomousController: controller_stale_or_blocked (PASS) enable pid=25852; run pid=38388
- ScarFLIX_v2_Watchdog_StallDetector: platform_checkpoint_stale (PASS) enable pid=9956; run pid=10012
- ScarFLIX_v2_AutonomousController: platform_checkpoint_stale (PASS) enable pid=9168; run pid=15444
- ScarFLIX_v2_DurablePlatformGateRunner: platform_checkpoint_stale (PASS) enable pid=35752; run pid=43152

## Notes
- None.