# JasonOS Prime Sentinel

Updated UTC: 2026-06-26T03:27:42Z
Status: REVIEW
Alert level: MEDIUM
Jason action required: false
Codex action required: false

## Signals
- controller_status: RUNNING
- controller_milestone: PLATFORM_GATE_RUNNING
- controller_age_minutes: 1
- watchdog_status: 
- watchdog_risk: 
- watchdog_age_minutes: null
- dashboard_status: PASS
- dashboard_age_minutes: 56
- mirror_status: PASS
- mirror_age_minutes: 54
- checkpoint_status: REVIEW
- checkpoint_step: platform_gate_review
- checkpoint_age_minutes: 0
- durable_platform_gate_age_minutes: 0
- platform_progress_fresh: true

## Recovery Actions
- JasonOS_Prime_OutcomeDashboard: dashboard_stale (PASS) enable pid=26120; run pid=29176
- JasonOS_Prime_PublicMirrorPublisher: mirror_stale (PASS) skipped_orchestrator_owned job=run_public_mirror_publisher

## Notes
- Watchdog status is stale, but durable PlatformGate progress is fresh.