# JasonOS Prime Sentinel

Updated UTC: 2026-06-08T12:39:02Z
Status: ALERT
Alert level: HIGH
Jason action required: false
Codex action required: true

## Signals
- controller_status: REVIEW_TRANSIENT
- controller_milestone: CANDIDATE_SOURCE_MODEL_PENDING
- controller_age_minutes: 0
- watchdog_status: REVIEW
- watchdog_risk: Medium
- watchdog_age_minutes: 2
- dashboard_status: 
- dashboard_age_minutes: null
- mirror_status: PASS
- mirror_age_minutes: 2
- checkpoint_status: PASS
- checkpoint_step: platform_gate_pass
- checkpoint_age_minutes: 680
- durable_platform_gate_age_minutes: 680
- platform_progress_fresh: false

## Recovery Actions
- JasonOS_Prime_OutcomeDashboard: dashboard_stale (PASS) enable pid=28568; run pid=19560

## Notes
- Same unresolved sentinel signature repeated for three cycles.