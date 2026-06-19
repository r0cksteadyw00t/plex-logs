# JasonOS Prime Sentinel

Updated UTC: 2026-06-19T04:46:56Z
Status: REVIEW
Alert level: MEDIUM
Jason action required: false
Codex action required: false

## Signals
- controller_status: PASS
- controller_milestone: CANDIDATE_SOURCE_MODEL_PASS
- controller_age_minutes: 6
- watchdog_status: REVIEW
- watchdog_risk: Medium
- watchdog_age_minutes: 6
- dashboard_status: PASS
- dashboard_age_minutes: 7
- mirror_status: PASS
- mirror_age_minutes: 4
- checkpoint_status: PASS
- checkpoint_step: platform_gate_pass
- checkpoint_age_minutes: 16048
- durable_platform_gate_age_minutes: 16048
- platform_progress_fresh: false

## Recovery Actions
- ScarFLIX_v2_Watchdog_StallDetector: watchdog_stale_or_failed (PASS) enable pid=21060; run pid=2916
- ScarFLIX_v2_AutonomousController: controller_stale_or_blocked (PASS) enable pid=14080; run pid=31488
- JasonOS_Prime_OutcomeDashboard: dashboard_stale (PASS) enable pid=6952; run pid=11572

## Notes
- None.