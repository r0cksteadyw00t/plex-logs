# JasonOS Prime Sentinel

Updated UTC: 2026-06-19T18:45:01Z
Status: REVIEW
Alert level: MEDIUM
Jason action required: false
Codex action required: false

## Signals
- controller_status: PASS
- controller_milestone: CANDIDATE_SOURCE_MODEL_PASS
- controller_age_minutes: 15
- watchdog_status: REVIEW
- watchdog_risk: Medium
- watchdog_age_minutes: 15
- dashboard_status: PASS
- dashboard_age_minutes: 5
- mirror_status: PASS
- mirror_age_minutes: 3
- checkpoint_status: PASS
- checkpoint_step: platform_gate_pass
- checkpoint_age_minutes: 16886
- durable_platform_gate_age_minutes: 16886
- platform_progress_fresh: false

## Recovery Actions
- ScarFLIX_v2_Watchdog_StallDetector: watchdog_stale_or_failed (PASS) enable pid=23196; run pid=25120
- ScarFLIX_v2_AutonomousController: controller_stale_or_blocked (PASS) enable pid=34616; run pid=33932

## Notes
- None.