# JasonOS Prime Sentinel

Updated UTC: 2026-06-20T09:32:09Z
Status: REVIEW
Alert level: MEDIUM
Jason action required: false
Codex action required: false

## Signals
- controller_status: PASS
- controller_milestone: CANDIDATE_SOURCE_MODEL_PASS
- controller_age_minutes: 1
- watchdog_status: REVIEW
- watchdog_risk: Medium
- watchdog_age_minutes: 1
- dashboard_status: PASS
- dashboard_age_minutes: 1
- mirror_status: RUNNING
- mirror_age_minutes: 0
- checkpoint_status: PASS
- checkpoint_step: platform_gate_pass
- checkpoint_age_minutes: 5
- durable_platform_gate_age_minutes: 5
- platform_progress_fresh: false

## Recovery Actions
- platform_gate.lock: stale_lock (PASS) removed age_min=5 backup=D:/PlexTools/state/scarflix_v2/platform_gate.lock.stale_20260620093209.bak

## Notes
- None.