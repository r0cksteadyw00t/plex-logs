# JasonOS Prime Sentinel

Updated UTC: 2026-06-20T08:26:55Z
Status: REVIEW
Alert level: MEDIUM
Jason action required: false
Codex action required: false

## Signals
- controller_status: RUNNING
- controller_milestone: PLATFORM_GATE_RUNNING
- controller_age_minutes: 7
- watchdog_status: REVIEW
- watchdog_risk: Medium
- watchdog_age_minutes: 0
- dashboard_status: PASS
- dashboard_age_minutes: 2
- mirror_status: RUNNING
- mirror_age_minutes: 0
- checkpoint_status: PASS
- checkpoint_step: platform_gate_pass
- checkpoint_age_minutes: 5
- durable_platform_gate_age_minutes: 5
- platform_progress_fresh: true

## Recovery Actions
- platform_gate.lock: stale_lock (PASS) removed age_min=5 backup=D:/PlexTools/state/scarflix_v2/platform_gate.lock.stale_20260620082655.bak

## Notes
- Controller status is stale, but durable PlatformGate progress is fresh.