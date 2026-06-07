# JasonOS Prime Sentinel

Updated UTC: 2026-06-07T12:43:04Z
Status: REVIEW
Alert level: MEDIUM
Jason action required: false
Codex action required: false

## Signals
- controller_status: REVIEW_TRANSIENT
- controller_milestone: CANDIDATE_SOURCE_MODEL_PENDING
- controller_age_minutes: 7
- watchdog_status: REVIEW
- watchdog_risk: Medium
- watchdog_age_minutes: 3
- dashboard_status: PASS
- dashboard_age_minutes: 0
- mirror_status: PASS
- mirror_age_minutes: 2
- checkpoint_status: PASS
- checkpoint_step: platform_gate_pass
- checkpoint_age_minutes: 144
- durable_platform_gate_age_minutes: 144
- platform_progress_fresh: false

## Recovery Actions
- ScarFLIX_v2_AutonomousController: controller_stale_or_blocked (PASS) enable pid=13416; run pid=3564

## Notes
- None.