# JasonOS Prime Sentinel

Updated UTC: 2026-06-07T05:02:01Z
Status: REVIEW
Alert level: MEDIUM
Jason action required: false
Codex action required: false

## Signals
- controller_status: RUNNING
- controller_milestone: PLATFORM_GATE_RUNNING
- controller_age_minutes: 4
- watchdog_status: PASS
- watchdog_risk: Low
- watchdog_age_minutes: 4
- dashboard_status: PASS
- dashboard_age_minutes: 1
- mirror_status: PASS
- mirror_age_minutes: 1
- checkpoint_status: RUNNING
- checkpoint_step: running_platform_gate_attempt_2
- checkpoint_age_minutes: 0
- durable_platform_gate_age_minutes: 0
- platform_progress_fresh: true

## Recovery Actions
- platform_gate.lock: stale_lock (PASS) removed age_min=5 backup=D:/PlexTools/state/scarflix_v2/platform_gate.lock.stale_20260607050201.bak

## Notes
- None.