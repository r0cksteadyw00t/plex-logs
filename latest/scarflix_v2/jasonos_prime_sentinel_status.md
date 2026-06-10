# JasonOS Prime Sentinel

Updated UTC: 2026-06-10T16:30:02Z
Status: ALERT
Alert level: HIGH
Jason action required: false
Codex action required: true

## Signals
- controller_status: PASS
- controller_milestone: CANDIDATE_SOURCE_MODEL_PASS
- controller_age_minutes: 15
- watchdog_status: REVIEW
- watchdog_risk: Medium
- watchdog_age_minutes: 0
- dashboard_status: PASS
- dashboard_age_minutes: 5
- mirror_status: PASS
- mirror_age_minutes: 2
- checkpoint_status: PASS
- checkpoint_step: platform_gate_pass
- checkpoint_age_minutes: 3791
- durable_platform_gate_age_minutes: 3791
- platform_progress_fresh: false

## Recovery Actions
- ScarFLIX_v2_AutonomousController: controller_stale_or_blocked (PASS) enable pid=38732; run pid=4780

## Notes
- Same unresolved sentinel signature repeated for three cycles.