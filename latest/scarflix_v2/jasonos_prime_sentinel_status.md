# JasonOS Prime Sentinel

Updated UTC: 2026-06-06T18:32:03Z
Status: REVIEW
Alert level: MEDIUM
Jason action required: false
Codex action required: false

## Signals
- controller_status: RUNNING
- controller_milestone: PLATFORM_GATE_RUNNING
- controller_age_minutes: 4
- watchdog_status: PASS
- watchdog_risk: Low
- watchdog_age_minutes: 4
- dashboard_status: 
- dashboard_age_minutes: null
- mirror_status: PASS
- mirror_age_minutes: 1
- checkpoint_status: RUNNING
- checkpoint_step: running_platform_gate_attempt_1
- checkpoint_age_minutes: 0
- durable_platform_gate_age_minutes: 0
- platform_progress_fresh: true

## Recovery Actions
- JasonOS_Prime_OutcomeDashboard: dashboard_stale (PASS) enable pid=40036; run pid=35304

## Notes
- None.