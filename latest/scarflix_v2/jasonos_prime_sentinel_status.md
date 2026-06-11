# JasonOS Prime Sentinel

Updated UTC: 2026-06-11T14:55:02Z
Status: ALERT
Alert level: HIGH
Jason action required: false
Codex action required: true

## Signals
- controller_status: PASS
- controller_milestone: CANDIDATE_SOURCE_MODEL_PASS
- controller_age_minutes: 20
- watchdog_status: REVIEW
- watchdog_risk: Medium
- watchdog_age_minutes: 7
- dashboard_status: PASS
- dashboard_age_minutes: 5
- mirror_status: PASS
- mirror_age_minutes: 3
- checkpoint_status: PASS
- checkpoint_step: platform_gate_pass
- checkpoint_age_minutes: 5136
- durable_platform_gate_age_minutes: 5136
- platform_progress_fresh: false

## Recovery Actions
- autonomous_controller.lock: stale_lock (FAIL) ENOENT: no such file or directory, unlink 'D:\PlexTools\state\scarflix_v2\autonomous_controller.lock'
- ScarFLIX_v2_Watchdog_StallDetector: watchdog_stale_or_failed (PASS) enable pid=17420; run pid=7904
- ScarFLIX_v2_AutonomousController: controller_stale_or_blocked (PASS) enable pid=18892; run pid=9052

## Notes
- One or more detached recovery launches failed.