# JasonOS Prime Sentinel

Updated UTC: 2026-06-06T15:07:00Z
Status: REVIEW
Alert level: MEDIUM
Jason action required: false
Codex action required: false

## Signals
- controller_status: RUNNING
- controller_milestone: PLATFORM_GATE_RUNNING
- controller_age_minutes: 7
- watchdog_status: PASS
- watchdog_risk: Low
- watchdog_age_minutes: 7
- dashboard_status: PASS
- dashboard_age_minutes: 0
- mirror_status: PASS
- mirror_age_minutes: 0
- checkpoint_status: RUNNING
- checkpoint_step: running_platform_gate_attempt_1
- checkpoint_age_minutes: 0
- durable_platform_gate_age_minutes: 0
- platform_progress_fresh: true

## Recovery Actions
- platform_gate.lock: stale_lock (PASS) removed age_min=6 backup=D:/PlexTools/state/scarflix_v2/platform_gate.lock.stale_20260606150700.bak
- ScarFLIX_v2_Watchdog_StallDetector: watchdog_stale_or_failed (PASS) enable pid=32480; run pid=31272

## Notes
- Controller status is stale, but durable PlatformGate progress is fresh.