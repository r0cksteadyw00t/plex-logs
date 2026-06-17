# JasonOS Prime Sentinel

Updated UTC: 2026-06-17T00:40:03Z
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
- mirror_status: PASS
- mirror_age_minutes: 2
- checkpoint_status: PASS
- checkpoint_step: platform_gate_pass
- checkpoint_age_minutes: 12921
- durable_platform_gate_age_minutes: 12921
- platform_progress_fresh: false

## Recovery Actions
- autonomous_controller.lock: stale_lock (FAIL) ENOENT: no such file or directory, unlink 'D:\PlexTools\state\scarflix_v2\autonomous_controller.lock'

## Notes
- One or more detached recovery launches failed.