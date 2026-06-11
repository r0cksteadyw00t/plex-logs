# JasonOS Prime Sentinel

Updated UTC: 2026-06-11T15:00:02Z
Status: REVIEW
Alert level: MEDIUM
Jason action required: false
Codex action required: false

## Signals
- controller_status: PASS
- controller_milestone: CANDIDATE_SOURCE_MODEL_PASS
- controller_age_minutes: 12
- watchdog_status: REVIEW
- watchdog_risk: Medium
- watchdog_age_minutes: 3
- dashboard_status: PASS
- dashboard_age_minutes: 5
- mirror_status: PASS
- mirror_age_minutes: 3
- checkpoint_status: PASS
- checkpoint_step: platform_gate_pass
- checkpoint_age_minutes: 5141
- durable_platform_gate_age_minutes: 5141
- platform_progress_fresh: false

## Recovery Actions
- ScarFLIX_v2_AutonomousController: controller_stale_or_blocked (PASS) enable pid=8660; run pid=31424

## Notes
- None.