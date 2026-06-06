# JasonOS Prime Sentinel

Updated UTC: 2026-06-06T12:16:01Z
Status: ALERT
Alert level: HIGH
Jason action required: false
Codex action required: true

## Signals
- controller_status: RUNNING
- controller_milestone: PLATFORM_GATE_RUNNING
- controller_age_minutes: 20
- watchdog_status: REVIEW
- watchdog_risk: Medium
- watchdog_age_minutes: 6
- dashboard_status: PASS
- dashboard_age_minutes: 0
- mirror_status: PASS
- mirror_age_minutes: 6
- checkpoint_status: RUNNING
- checkpoint_step: running_platform_gate_attempt_1
- checkpoint_age_minutes: 5

## Recovery Actions
- platform_gate_local_runner.lock: stale_lock (PASS) removed age_min=5 backup=D:/PlexTools/state/scarflix_v2/platform_gate_local_runner.lock.stale_20260606121601.bak
- ScarFLIX_v2_Watchdog_StallDetector: watchdog_stale_or_failed (PASS) enable pid=30424; run pid=25032
- ScarFLIX_v2_AutonomousController: controller_stale_or_blocked (PASS) enable pid=29824; run pid=44576

## Notes
- Same unresolved sentinel signature repeated for three cycles.