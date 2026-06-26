# JasonOS Prime Sentinel

Updated UTC: 2026-06-26T03:30:02Z
Status: REVIEW
Alert level: MEDIUM
Jason action required: false
Codex action required: false

## Signals
- controller_status: RUNNING
- controller_milestone: PLATFORM_GATE_RUNNING
- controller_age_minutes: 3
- watchdog_status: 
- watchdog_risk: 
- watchdog_age_minutes: null
- dashboard_status: PASS
- dashboard_age_minutes: 35
- mirror_status: RUNNING
- mirror_age_minutes: 0
- checkpoint_status: REVIEW
- checkpoint_step: platform_gate_review
- checkpoint_age_minutes: 2
- durable_platform_gate_age_minutes: 2
- platform_progress_fresh: true

## Recovery Actions
- JasonOS_Prime_OutcomeDashboard: dashboard_stale (PASS) enable pid=28860; run pid=31284

## Notes
- Watchdog status is stale, but durable PlatformGate progress is fresh.