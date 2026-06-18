# JasonOS Prime Sentinel

Updated UTC: 2026-06-18T08:15:03Z
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
- dashboard_status: 
- dashboard_age_minutes: null
- mirror_status: PASS
- mirror_age_minutes: 2
- checkpoint_status: PASS
- checkpoint_step: platform_gate_pass
- checkpoint_age_minutes: 14816
- durable_platform_gate_age_minutes: 14816
- platform_progress_fresh: false

## Recovery Actions
- autonomous_controller.lock: stale_lock (FAIL) ENOENT: no such file or directory, unlink 'D:\PlexTools\state\scarflix_v2\autonomous_controller.lock'
- JasonOS_Prime_OutcomeDashboard: dashboard_stale (PASS) enable pid=11136; run pid=8380

## Notes
- One or more detached recovery launches failed.