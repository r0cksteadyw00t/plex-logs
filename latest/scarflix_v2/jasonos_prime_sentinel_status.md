# JasonOS Prime Sentinel

Updated UTC: 2026-06-17T08:51:17Z
Status: ALERT
Alert level: HIGH
Jason action required: false
Codex action required: true

## Signals
- controller_status: PASS
- controller_milestone: CANDIDATE_SOURCE_MODEL_PASS
- controller_age_minutes: 18
- watchdog_status: REVIEW
- watchdog_risk: Medium
- watchdog_age_minutes: 20
- dashboard_status: PASS
- dashboard_age_minutes: 16
- mirror_status: REVIEW
- mirror_age_minutes: 10
- checkpoint_status: PASS
- checkpoint_step: platform_gate_pass
- checkpoint_age_minutes: 13412
- durable_platform_gate_age_minutes: 13412
- platform_progress_fresh: false

## Recovery Actions
- ScarFLIX_v2_Watchdog_StallDetector: watchdog_stale_or_failed (PASS) enable pid=39388; run pid=28004
- ScarFLIX_v2_AutonomousController: controller_stale_or_blocked (PASS) enable pid=27572; run pid=8268
- JasonOS_Prime_OutcomeDashboard: dashboard_stale (PASS) enable pid=36364; run pid=10708

## Notes
- Same unresolved sentinel signature repeated for three cycles.