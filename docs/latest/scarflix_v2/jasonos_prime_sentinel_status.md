# JasonOS Prime Sentinel

Updated UTC: 2026-06-17T08:20:46Z
Status: ALERT
Alert level: HIGH
Jason action required: false
Codex action required: true

## Signals
- controller_status: PASS
- controller_milestone: CANDIDATE_SOURCE_MODEL_PASS
- controller_age_minutes: 5
- watchdog_status: REVIEW
- watchdog_risk: Medium
- watchdog_age_minutes: 2
- dashboard_status: PASS
- dashboard_age_minutes: 6
- mirror_status: PASS
- mirror_age_minutes: 17
- checkpoint_status: PASS
- checkpoint_step: platform_gate_pass
- checkpoint_age_minutes: 13382
- durable_platform_gate_age_minutes: 13382
- platform_progress_fresh: false

## Recovery Actions
- JasonOS_Prime_OutcomeDashboard: dashboard_stale (PASS) enable pid=28868; run pid=34148
- JasonOS_Prime_PublicMirrorPublisher: mirror_stale (PASS) skipped_orchestrator_owned job=run_public_mirror_publisher

## Notes
- Same unresolved sentinel signature repeated for three cycles.