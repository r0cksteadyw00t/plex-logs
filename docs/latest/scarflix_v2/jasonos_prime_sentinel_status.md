# JasonOS Prime Sentinel

Updated UTC: 2026-06-27T21:55:02Z
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
- watchdog_age_minutes: 2
- dashboard_status: 
- dashboard_age_minutes: null
- mirror_status: RUNNING
- mirror_age_minutes: 0
- checkpoint_status: REVIEW
- checkpoint_step: platform_gate_review
- checkpoint_age_minutes: 2
- durable_platform_gate_age_minutes: 2
- platform_progress_fresh: true

## Recovery Actions
- JasonOS_Prime_OutcomeDashboard: dashboard_stale (PASS) enable pid=27068; run pid=37164

## Notes
- Same unresolved sentinel signature repeated for three cycles.