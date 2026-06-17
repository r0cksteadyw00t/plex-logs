# JasonOS Prime Sentinel

Updated UTC: 2026-06-17T09:56:25Z
Status: ALERT
Alert level: HIGH
Jason action required: false
Codex action required: true

## Signals
- controller_status: PASS
- controller_milestone: CANDIDATE_SOURCE_MODEL_PASS
- controller_age_minutes: 18
- watchdog_status: REVIEW
- watchdog_risk: Medium
- watchdog_age_minutes: 2
- dashboard_status: PASS
- dashboard_age_minutes: 11
- mirror_status: PASS
- mirror_age_minutes: 14
- checkpoint_status: PASS
- checkpoint_step: platform_gate_pass
- checkpoint_age_minutes: 13478
- durable_platform_gate_age_minutes: 13478
- platform_progress_fresh: false

## Recovery Actions
- ScarFLIX_v2_AutonomousController: controller_stale_or_blocked (PASS) enable pid=44372; run pid=49356
- JasonOS_Prime_OutcomeDashboard: dashboard_stale (PASS) enable pid=23164; run pid=48172
- JasonOS_Prime_PublicMirrorPublisher: mirror_stale (PASS) skipped_orchestrator_owned job=run_public_mirror_publisher

## Notes
- Same unresolved sentinel signature repeated for three cycles.