# JasonOS Prime Sentinel

Updated UTC: 2026-06-19T09:22:10Z
Status: ALERT
Alert level: HIGH
Jason action required: false
Codex action required: true

## Signals
- controller_status: PASS
- controller_milestone: CANDIDATE_SOURCE_MODEL_PASS
- controller_age_minutes: 2
- watchdog_status: REVIEW
- watchdog_risk: Medium
- watchdog_age_minutes: 2
- dashboard_status: PASS
- dashboard_age_minutes: 2
- mirror_status: PASS
- mirror_age_minutes: 19
- checkpoint_status: PASS
- checkpoint_step: platform_gate_pass
- checkpoint_age_minutes: 16323
- durable_platform_gate_age_minutes: 16323
- platform_progress_fresh: false

## Recovery Actions
- JasonOS_Prime_PublicMirrorPublisher: mirror_stale (PASS) skipped_orchestrator_owned job=run_public_mirror_publisher

## Notes
- Same unresolved sentinel signature repeated for three cycles.