# JasonOS Prime Sentinel

Updated UTC: 2026-06-17T11:35:24Z
Status: ALERT
Alert level: HIGH
Jason action required: false
Codex action required: true

## Signals
- controller_status: PASS
- controller_milestone: CANDIDATE_SOURCE_MODEL_PASS
- controller_age_minutes: 134
- watchdog_status: REVIEW
- watchdog_risk: Medium
- watchdog_age_minutes: 0
- dashboard_status: PASS
- dashboard_age_minutes: 85
- mirror_status: REVIEW
- mirror_age_minutes: 1
- checkpoint_status: PASS
- checkpoint_step: platform_gate_pass
- checkpoint_age_minutes: 13577
- durable_platform_gate_age_minutes: 13577
- platform_progress_fresh: false

## Recovery Actions
- ScarFLIX_v2_AutonomousController: controller_stale_or_blocked (PASS) enable pid=54952; run pid=8940
- JasonOS_Prime_OutcomeDashboard: dashboard_stale (PASS) enable pid=53420; run pid=56112

## Notes
- Same unresolved sentinel signature repeated for three cycles.