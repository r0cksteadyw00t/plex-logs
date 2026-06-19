# JasonOS Prime Sentinel

Updated UTC: 2026-06-19T18:00:05Z
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
- dashboard_age_minutes: 10
- mirror_status: PASS
- mirror_age_minutes: 4
- checkpoint_status: PASS
- checkpoint_step: platform_gate_pass
- checkpoint_age_minutes: 16841
- durable_platform_gate_age_minutes: 16841
- platform_progress_fresh: false

## Recovery Actions
- autonomous_controller.lock: stale_lock (PASS) removed age_min=5 backup=D:/PlexTools/state/scarflix_v2/autonomous_controller.lock.stale_20260619180005.bak
- JasonOS_Prime_OutcomeDashboard: dashboard_stale (PASS) enable pid=30664; run pid=39688

## Notes
- Same unresolved sentinel signature repeated for three cycles.