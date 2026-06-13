# JasonOS Prime Sentinel

Updated UTC: 2026-06-13T05:25:42Z
Status: REVIEW
Alert level: MEDIUM
Jason action required: false
Codex action required: false

## Signals
- controller_status: REVIEW_TRANSIENT
- controller_milestone: CANDIDATE_SOURCE_MODEL_PENDING
- controller_age_minutes: 15
- watchdog_status: REVIEW
- watchdog_risk: Medium
- watchdog_age_minutes: 10
- dashboard_status: PASS
- dashboard_age_minutes: 6
- mirror_status: PASS
- mirror_age_minutes: 9
- checkpoint_status: PASS
- checkpoint_step: platform_gate_pass
- checkpoint_age_minutes: 7447
- durable_platform_gate_age_minutes: 7447
- platform_progress_fresh: false

## Recovery Actions
- ScarFLIX_v2_Watchdog_StallDetector: watchdog_stale_or_failed (PASS) enable pid=29016; run pid=2012
- ScarFLIX_v2_AutonomousController: controller_stale_or_blocked (PASS) enable pid=28152; run pid=16864
- JasonOS_Prime_OutcomeDashboard: dashboard_stale (PASS) enable pid=30176; run pid=4832

## Notes
- None.