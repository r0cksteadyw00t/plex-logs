# JasonOS Prime Sentinel

Updated UTC: 2026-06-25T22:25:02Z
Status: PASS
Alert level: LOW
Jason action required: false
Codex action required: false

## Signals
- controller_status: RUNNING
- controller_milestone: PLATFORM_GATE_RUNNING
- controller_age_minutes: 6
- watchdog_status: REVIEW
- watchdog_risk: Medium
- watchdog_age_minutes: 6
- dashboard_status: PASS
- dashboard_age_minutes: 4
- mirror_status: PASS
- mirror_age_minutes: 2
- checkpoint_status: REVIEW
- checkpoint_step: platform_gate_review
- checkpoint_age_minutes: 5
- durable_platform_gate_age_minutes: 5
- platform_progress_fresh: true

## Recovery Actions
- None.

## Notes
- Watchdog status is stale, but durable PlatformGate progress is fresh.
- Controller status is stale, but durable PlatformGate progress is fresh.