# JasonOS Prime Sentinel

Updated UTC: 2026-06-24T21:55:14Z
Status: REVIEW
Alert level: MEDIUM
Jason action required: false
Codex action required: false

## Signals
- controller_status: RUNNING
- controller_milestone: PLATFORM_GATE_RUNNING
- controller_age_minutes: 9
- watchdog_status: REVIEW
- watchdog_risk: Medium
- watchdog_age_minutes: 8
- dashboard_status: PASS
- dashboard_age_minutes: 10
- mirror_status: RUNNING
- mirror_age_minutes: 5
- checkpoint_status: RUNNING
- checkpoint_step: starting
- checkpoint_age_minutes: 6
- durable_platform_gate_age_minutes: 6
- platform_progress_fresh: false

## Recovery Actions
- platform_gate_durable.lock: stale_lock (PASS) removed age_min=6 backup=D:/PlexTools/state/scarflix_v2/platform_gate_durable.lock.stale_20260624215513.bak
- ScarFLIX_v2_Watchdog_StallDetector: watchdog_stale_or_failed (PASS) enable pid=11528; run pid=37600
- ScarFLIX_v2_AutonomousController: controller_stale_or_blocked (PASS) enable pid=35968; run pid=36400
- JasonOS_Prime_OutcomeDashboard: dashboard_stale (PASS) enable pid=29212; run pid=37576
- ScarFLIX_v2_Watchdog_StallDetector: platform_checkpoint_stale (PASS) enable pid=22520; run pid=18092
- ScarFLIX_v2_AutonomousController: platform_checkpoint_stale (PASS) enable pid=9384; run pid=32832
- ScarFLIX_v2_DurablePlatformGateRunner: platform_checkpoint_stale (PASS) enable pid=29020; run pid=35516

## Notes
- None.