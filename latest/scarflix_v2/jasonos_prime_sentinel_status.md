# JasonOS Prime Sentinel

Updated UTC: 2026-06-17T00:30:20Z
Status: ALERT
Alert level: HIGH
Jason action required: false
Codex action required: true

## Signals
- controller_status: PASS
- controller_milestone: CANDIDATE_SOURCE_MODEL_PASS
- controller_age_minutes: 10
- watchdog_status: REVIEW
- watchdog_risk: Medium
- watchdog_age_minutes: 10
- dashboard_status: PASS
- dashboard_age_minutes: 7
- mirror_status: PASS
- mirror_age_minutes: 8
- checkpoint_status: PASS
- checkpoint_step: platform_gate_pass
- checkpoint_age_minutes: 12911
- durable_platform_gate_age_minutes: 12911
- platform_progress_fresh: false

## Recovery Actions
- ScarFLIX_v2_Watchdog_StallDetector: watchdog_stale_or_failed (PASS) enable pid=36788; run pid=36800
- ScarFLIX_v2_AutonomousController: controller_stale_or_blocked (PASS) enable pid=36808; run pid=36816
- JasonOS_Prime_OutcomeDashboard: dashboard_stale (PASS) enable pid=36824; run pid=35948

## Notes
- Same unresolved sentinel signature repeated for three cycles.