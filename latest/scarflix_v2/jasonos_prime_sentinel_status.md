# JasonOS Prime Sentinel

Updated UTC: 2026-06-10T11:35:01Z
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
- watchdog_age_minutes: 9
- dashboard_status: PASS
- dashboard_age_minutes: 5
- mirror_status: PASS
- mirror_age_minutes: 2
- checkpoint_status: PASS
- checkpoint_step: platform_gate_pass
- checkpoint_age_minutes: 3496
- durable_platform_gate_age_minutes: 3496
- platform_progress_fresh: false

## Recovery Actions
- ScarFLIX_v2_Watchdog_StallDetector: watchdog_stale_or_failed (PASS) enable pid=36136; run pid=3580
- ScarFLIX_v2_AutonomousController: controller_stale_or_blocked (PASS) enable pid=27300; run pid=4124

## Notes
- None.