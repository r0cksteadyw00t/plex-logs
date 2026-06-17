# JasonOS Prime Sentinel

Updated UTC: 2026-06-17T09:23:27Z
Status: ALERT
Alert level: HIGH
Jason action required: false
Codex action required: true

## Signals
- controller_status: PASS
- controller_milestone: CANDIDATE_SOURCE_MODEL_PASS
- controller_age_minutes: 33
- watchdog_status: REVIEW
- watchdog_risk: Medium
- watchdog_age_minutes: 4
- dashboard_status: PASS
- dashboard_age_minutes: 6
- mirror_status: REVIEW
- mirror_age_minutes: 3
- checkpoint_status: PASS
- checkpoint_step: platform_gate_pass
- checkpoint_age_minutes: 13445
- durable_platform_gate_age_minutes: 13445
- platform_progress_fresh: false

## Recovery Actions
- ScarFLIX_v2_AutonomousController: controller_stale_or_blocked (PASS) enable pid=40528; run pid=6616
- JasonOS_Prime_OutcomeDashboard: dashboard_stale (PASS) enable pid=32976; run pid=30608

## Notes
- Same unresolved sentinel signature repeated for three cycles.