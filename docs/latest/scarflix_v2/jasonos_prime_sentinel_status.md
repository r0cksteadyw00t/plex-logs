# JasonOS Prime Sentinel

Updated UTC: 2026-06-17T09:38:28Z
Status: ALERT
Alert level: HIGH
Jason action required: false
Codex action required: true

## Signals
- controller_status: PASS
- controller_milestone: CANDIDATE_SOURCE_MODEL_PASS
- controller_age_minutes: 48
- watchdog_status: REVIEW
- watchdog_risk: Medium
- watchdog_age_minutes: 11
- dashboard_status: PASS
- dashboard_age_minutes: 12
- mirror_status: PASS
- mirror_age_minutes: 12
- checkpoint_status: PASS
- checkpoint_step: platform_gate_pass
- checkpoint_age_minutes: 13459
- durable_platform_gate_age_minutes: 13459
- platform_progress_fresh: false

## Recovery Actions
- autonomous_controller.lock: stale_lock (PASS) removed age_min=10 backup=D:/PlexTools/state/scarflix_v2/autonomous_controller.lock.stale_20260617093807.bak
- ScarFLIX_v2_Watchdog_StallDetector: watchdog_stale_or_failed (PASS) enable pid=17884; run pid=43000
- ScarFLIX_v2_AutonomousController: controller_stale_or_blocked (PASS) enable pid=42576; run pid=11632
- JasonOS_Prime_OutcomeDashboard: dashboard_stale (PASS) enable pid=26080; run pid=42992
- JasonOS_Prime_PublicMirrorPublisher: mirror_stale (PASS) skipped_orchestrator_owned job=run_public_mirror_publisher

## Notes
- Same unresolved sentinel signature repeated for three cycles.