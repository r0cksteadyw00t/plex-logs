# JasonOS Prime Sentinel

Updated UTC: 2026-06-10T12:30:01Z
Status: ALERT
Alert level: HIGH
Jason action required: false
Codex action required: true

## Signals
- controller_status: PASS
- controller_milestone: CANDIDATE_SOURCE_MODEL_PASS
- controller_age_minutes: 7
- watchdog_status: REVIEW
- watchdog_risk: Medium
- watchdog_age_minutes: 1
- dashboard_status: PASS
- dashboard_age_minutes: 5
- mirror_status: PASS
- mirror_age_minutes: 3
- checkpoint_status: PASS
- checkpoint_step: platform_gate_pass
- checkpoint_age_minutes: 3551
- durable_platform_gate_age_minutes: 3551
- platform_progress_fresh: false

## Recovery Actions
- ScarFLIX_v2_AutonomousController: controller_stale_or_blocked (PASS) enable pid=36408; run pid=36520

## Notes
- Same unresolved sentinel signature repeated for three cycles.