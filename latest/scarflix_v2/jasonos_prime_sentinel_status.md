# JasonOS Prime Sentinel

Updated UTC: 2026-06-17T11:41:05Z
Status: ALERT
Alert level: HIGH
Jason action required: false
Codex action required: true

## Signals
- controller_status: PASS
- controller_milestone: CANDIDATE_SOURCE_MODEL_PASS
- controller_age_minutes: 3
- watchdog_status: REVIEW
- watchdog_risk: Medium
- watchdog_age_minutes: 2
- dashboard_status: PASS
- dashboard_age_minutes: 6
- mirror_status: REVIEW
- mirror_age_minutes: 2
- checkpoint_status: PASS
- checkpoint_step: platform_gate_pass
- checkpoint_age_minutes: 13582
- durable_platform_gate_age_minutes: 13582
- platform_progress_fresh: false

## Recovery Actions
- JasonOS_Prime_OutcomeDashboard: dashboard_stale (PASS) enable pid=5908; run pid=54736

## Notes
- Same unresolved sentinel signature repeated for three cycles.