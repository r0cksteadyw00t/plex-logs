# JasonOS Prime Sentinel

Updated UTC: 2026-06-17T01:20:04Z
Status: ALERT
Alert level: HIGH
Jason action required: false
Codex action required: true

## Signals
- controller_status: PASS
- controller_milestone: CANDIDATE_SOURCE_MODEL_PASS
- controller_age_minutes: 5
- watchdog_status: REVIEW
- watchdog_risk: Medium
- watchdog_age_minutes: 5
- dashboard_status: PASS
- dashboard_age_minutes: 5
- mirror_status: REVIEW_RECOVERABLE
- mirror_age_minutes: 0
- checkpoint_status: PASS
- checkpoint_step: platform_gate_pass
- checkpoint_age_minutes: 12961
- durable_platform_gate_age_minutes: 12961
- platform_progress_fresh: false

## Recovery Actions
- autonomous_controller.lock: stale_lock (PASS) removed age_min=5 backup=D:/PlexTools/state/scarflix_v2/autonomous_controller.lock.stale_20260617012004.bak

## Notes
- Same unresolved sentinel signature repeated for three cycles.