# JasonOS Prime Sentinel

Updated UTC: 2026-06-17T09:17:15Z
Status: ALERT
Alert level: HIGH
Jason action required: false
Codex action required: true

## Signals
- controller_status: PASS
- controller_milestone: CANDIDATE_SOURCE_MODEL_PASS
- controller_age_minutes: 43
- watchdog_status: REVIEW
- watchdog_risk: Medium
- watchdog_age_minutes: 10
- dashboard_status: PASS
- dashboard_age_minutes: 15
- mirror_status: PASS
- mirror_age_minutes: 23
- checkpoint_status: PASS
- checkpoint_step: platform_gate_pass
- checkpoint_age_minutes: 13438
- durable_platform_gate_age_minutes: 13438
- platform_progress_fresh: false

## Recovery Actions
- autonomous_controller.lock: stale_lock (PASS) removed age_min=5 backup=D:/PlexTools/state/scarflix_v2/autonomous_controller.lock.stale_20260617091708.bak
- ScarFLIX_v2_Watchdog_StallDetector: watchdog_stale_or_failed (PASS) enable pid=29016; run pid=42048
- ScarFLIX_v2_AutonomousController: controller_stale_or_blocked (PASS) enable pid=42060; run pid=42068
- JasonOS_Prime_OutcomeDashboard: dashboard_stale (PASS) enable pid=42080; run pid=42104
- JasonOS_Prime_PublicMirrorPublisher: mirror_stale (PASS) skipped_orchestrator_owned job=run_public_mirror_publisher

## Notes
- Same unresolved sentinel signature repeated for three cycles.