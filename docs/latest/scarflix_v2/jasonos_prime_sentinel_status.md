# JasonOS Prime Sentinel

Updated UTC: 2026-06-13T07:00:01Z
Status: REVIEW
Alert level: MEDIUM
Jason action required: false
Codex action required: false

## Signals
- controller_status: PASS
- controller_milestone: CANDIDATE_SOURCE_MODEL_PASS
- controller_age_minutes: 9
- watchdog_status: REVIEW
- watchdog_risk: Medium
- watchdog_age_minutes: 10
- dashboard_status: PASS
- dashboard_age_minutes: 5
- mirror_status: PASS
- mirror_age_minutes: 4
- checkpoint_status: PASS
- checkpoint_step: platform_gate_pass
- checkpoint_age_minutes: 7541
- durable_platform_gate_age_minutes: 7541
- platform_progress_fresh: false

## Recovery Actions
- ScarFLIX_v2_Watchdog_StallDetector: watchdog_stale_or_failed (PASS) enable pid=3676; run pid=29428
- ScarFLIX_v2_AutonomousController: controller_stale_or_blocked (PASS) enable pid=1320; run pid=31372

## Notes
- None.