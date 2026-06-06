# JasonOS Prime Sentinel

Updated UTC: 2026-06-06T17:22:03Z
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
- watchdog_age_minutes: 6
- dashboard_status: PASS
- dashboard_age_minutes: 0
- mirror_status: PASS
- mirror_age_minutes: 0
- checkpoint_status: RUNNING
- checkpoint_step: running_platform_gate_attempt_2
- checkpoint_age_minutes: 1
- durable_platform_gate_age_minutes: 1
- platform_progress_fresh: true

## Recovery Actions
- platform_gate.lock: stale_lock (PASS) removed age_min=6 backup=D:/PlexTools/state/scarflix_v2/platform_gate.lock.stale_20260606172203.bak

## Notes
- Watchdog status is stale, but durable PlatformGate progress is fresh.