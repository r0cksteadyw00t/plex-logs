# JasonOS Prime Sentinel

Updated UTC: 2026-06-20T09:23:23Z
Status: ALERT
Alert level: HIGH
Jason action required: false
Codex action required: true

## Signals
- controller_status: RUNNING
- controller_milestone: PLATFORM_GATE_RUNNING
- controller_age_minutes: 25
- watchdog_status: REVIEW
- watchdog_risk: Medium
- watchdog_age_minutes: 18
- dashboard_status: PASS
- dashboard_age_minutes: 22
- mirror_status: RUNNING
- mirror_age_minutes: 9
- checkpoint_status: PASS
- checkpoint_step: platform_gate_pass
- checkpoint_age_minutes: 22
- durable_platform_gate_age_minutes: 22
- platform_progress_fresh: false

## Recovery Actions
- autonomous_controller.lock: stale_lock (PASS) removed age_min=7 backup=D:/PlexTools/state/scarflix_v2/autonomous_controller.lock.stale_20260620092234.bak
- ScarFLIX_v2_Watchdog_StallDetector: watchdog_stale_or_failed (PASS) enable pid=44412; run pid=23188
- ScarFLIX_v2_AutonomousController: controller_stale_or_blocked (PASS) enable pid=8172; run pid=43044
- JasonOS_Prime_OutcomeDashboard: dashboard_stale (PASS) enable pid=43364; run pid=47528
- ScarFLIX_v2_Watchdog_StallDetector: platform_checkpoint_stale (PASS) enable pid=31412; run pid=26812
- ScarFLIX_v2_AutonomousController: platform_checkpoint_stale (PASS) enable pid=44460; run pid=20740
- ScarFLIX_v2_DurablePlatformGateRunner: platform_checkpoint_stale (PASS) enable pid=18000; run pid=45300

## Notes
- Same unresolved sentinel signature repeated for three cycles.