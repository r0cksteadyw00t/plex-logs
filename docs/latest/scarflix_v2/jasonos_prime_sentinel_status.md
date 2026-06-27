# JasonOS Prime Sentinel

Updated UTC: 2026-06-27T21:42:56Z
Status: ALERT
Alert level: HIGH
Jason action required: false
Codex action required: true

## Signals
- controller_status: RUNNING
- controller_milestone: PLATFORM_GATE_RUNNING
- controller_age_minutes: 3
- watchdog_status: REVIEW
- watchdog_risk: Medium
- watchdog_age_minutes: 466
- dashboard_status: PASS
- dashboard_age_minutes: 466
- mirror_status: RUNNING
- mirror_age_minutes: 0
- checkpoint_status: REVIEW
- checkpoint_step: platform_gate_review
- checkpoint_age_minutes: 6
- durable_platform_gate_age_minutes: 6
- platform_progress_fresh: false

## Recovery Actions
- platform_gate.lock: stale_lock (PASS) removed age_min=7 backup=D:/PlexTools/state/scarflix_v2/platform_gate.lock.stale_20260627214256.bak
- ScarFLIX_v2_Watchdog_StallDetector: watchdog_stale_or_failed (PASS) enable pid=26800; run pid=29336
- JasonOS_Prime_OutcomeDashboard: dashboard_stale (PASS) enable pid=28528; run pid=4884
- ScarFLIX_v2_Watchdog_StallDetector: platform_checkpoint_stale (PASS) enable pid=10860; run pid=13684
- ScarFLIX_v2_AutonomousController: platform_checkpoint_stale (PASS) enable pid=8168; run pid=35260
- ScarFLIX_v2_DurablePlatformGateRunner: platform_checkpoint_stale (PASS) enable pid=31944; run pid=29176

## Notes
- Same unresolved sentinel signature repeated for three cycles.