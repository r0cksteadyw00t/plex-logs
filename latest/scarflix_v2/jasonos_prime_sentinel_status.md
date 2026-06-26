# JasonOS Prime Sentinel

Updated UTC: 2026-06-26T20:07:33Z
Status: REVIEW
Alert level: MEDIUM
Jason action required: false
Codex action required: false

## Signals
- controller_status: RUNNING
- controller_milestone: PLATFORM_GATE_RUNNING
- controller_age_minutes: 1
- watchdog_status: REVIEW
- watchdog_risk: Medium
- watchdog_age_minutes: 1
- dashboard_status: PASS
- dashboard_age_minutes: 6
- mirror_status: PASS
- mirror_age_minutes: 4
- checkpoint_status: RUNNING
- checkpoint_step: running_platform_gate_attempt_1
- checkpoint_age_minutes: 2
- durable_platform_gate_age_minutes: 2
- platform_progress_fresh: true

## Recovery Actions
- JasonOS_Prime_OutcomeDashboard: dashboard_stale (PASS) enable pid=39748; run pid=23808

## Notes
- None.