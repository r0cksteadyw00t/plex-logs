# JasonOS Prime Sentinel

Updated UTC: 2026-06-21T17:55:02Z
Status: REVIEW
Alert level: MEDIUM
Jason action required: false
Codex action required: false

## Signals
- controller_status: RUNNING
- controller_milestone: PLATFORM_GATE_RUNNING
- controller_age_minutes: 4
- watchdog_status: REVIEW
- watchdog_risk: Medium
- watchdog_age_minutes: 4
- dashboard_status: PASS
- dashboard_age_minutes: 0
- mirror_status: PASS
- mirror_age_minutes: 2
- checkpoint_status: REVIEW
- checkpoint_step: platform_gate_review
- checkpoint_age_minutes: 3
- durable_platform_gate_age_minutes: 3
- platform_progress_fresh: true

## Recovery Actions
- autonomous_controller.lock: stale_lock (PASS) removed age_min=5 backup=D:/PlexTools/state/scarflix_v2/autonomous_controller.lock.stale_20260621175502.bak

## Notes
- None.