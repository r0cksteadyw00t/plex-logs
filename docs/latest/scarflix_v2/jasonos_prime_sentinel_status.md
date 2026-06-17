# JasonOS Prime Sentinel

Updated UTC: 2026-06-17T21:20:03Z
Status: REVIEW
Alert level: MEDIUM
Jason action required: false
Codex action required: false

## Signals
- controller_status: PASS
- controller_milestone: CANDIDATE_SOURCE_MODEL_PASS
- controller_age_minutes: 10
- watchdog_status: REVIEW
- watchdog_risk: Medium
- watchdog_age_minutes: 1
- dashboard_status: PASS
- dashboard_age_minutes: 5
- mirror_status: REVIEW_RECOVERABLE
- mirror_age_minutes: 0
- checkpoint_status: PASS
- checkpoint_step: platform_gate_pass
- checkpoint_age_minutes: 14161
- durable_platform_gate_age_minutes: 14161
- platform_progress_fresh: false

## Recovery Actions
- ScarFLIX_v2_AutonomousController: controller_stale_or_blocked (PASS) enable pid=39396; run pid=31704

## Notes
- None.