# JasonOS Prime Sentinel

Updated UTC: 2026-06-27T21:50:23Z
Status: ALERT
Alert level: HIGH
Jason action required: false
Codex action required: true

## Signals
- controller_status: RUNNING
- controller_milestone: PLATFORM_GATE_RUNNING
- controller_age_minutes: 5
- watchdog_status: REVIEW
- watchdog_risk: Medium
- watchdog_age_minutes: 474
- dashboard_status: PASS
- dashboard_age_minutes: 473
- mirror_status: PASS
- mirror_age_minutes: 5
- checkpoint_status: REVIEW
- checkpoint_step: platform_gate_review
- checkpoint_age_minutes: 6
- durable_platform_gate_age_minutes: 6
- platform_progress_fresh: false

## Recovery Actions
- platform_gate.lock: stale_lock (PASS) removed age_min=7 backup=D:/PlexTools/state/scarflix_v2/platform_gate.lock.stale_20260627215020.bak
- ScarFLIX_v2_Watchdog_StallDetector: watchdog_stale_or_failed (PASS) enable pid=6088; run pid=35896
- JasonOS_Prime_OutcomeDashboard: dashboard_stale (PASS) enable pid=34396; run pid=29864
- ScarFLIX_v2_Watchdog_StallDetector: platform_checkpoint_stale (PASS) enable pid=7092; run pid=27732
- ScarFLIX_v2_AutonomousController: platform_checkpoint_stale (PASS) enable pid=36884; run pid=9588
- ScarFLIX_v2_DurablePlatformGateRunner: platform_checkpoint_stale (PASS) enable pid=36296; run pid=25264

## Notes
- Same unresolved sentinel signature repeated for three cycles.