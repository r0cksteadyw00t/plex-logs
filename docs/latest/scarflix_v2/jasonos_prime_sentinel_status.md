# JasonOS Prime Sentinel

Updated UTC: 2026-06-20T02:24:01Z
Status: ALERT
Alert level: HIGH
Jason action required: false
Codex action required: true

## Signals
- controller_status: RUNNING
- controller_milestone: PLATFORM_GATE_RUNNING
- controller_age_minutes: 4
- watchdog_status: REVIEW
- watchdog_risk: Medium
- watchdog_age_minutes: 4
- dashboard_status: PASS
- dashboard_age_minutes: 1
- mirror_status: REVIEW
- mirror_age_minutes: 16
- checkpoint_status: RUNNING
- checkpoint_step: running_platform_gate_attempt_1
- checkpoint_age_minutes: 0
- durable_platform_gate_age_minutes: 0
- platform_progress_fresh: true

## Recovery Actions
- JasonOS_Prime_PublicMirrorPublisher: mirror_stale (PASS) skipped_orchestrator_owned job=run_public_mirror_publisher

## Notes
- Same unresolved sentinel signature repeated for three cycles.