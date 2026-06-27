# JasonOS Prime Sentinel

Updated UTC: 2026-06-27T01:00:02Z
Status: REVIEW
Alert level: MEDIUM
Jason action required: false
Codex action required: false

## Signals
- controller_status: RUNNING
- controller_milestone: PLATFORM_GATE_RUNNING
- controller_age_minutes: 5
- watchdog_status: REVIEW
- watchdog_risk: Medium
- watchdog_age_minutes: 4
- dashboard_status: PASS
- dashboard_age_minutes: 5
- mirror_status: PASS
- mirror_age_minutes: 2
- checkpoint_status: REVIEW
- checkpoint_step: platform_gate_review
- checkpoint_age_minutes: 4
- durable_platform_gate_age_minutes: 4
- platform_progress_fresh: true

## Recovery Actions
- platform_gate.lock: stale_lock (PASS) removed age_min=5 backup=D:/PlexTools/state/scarflix_v2/platform_gate.lock.stale_20260627010002.bak

## Notes
- None.