# JasonOS Prime Sentinel

Updated UTC: 2026-06-09T18:40:02Z
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
- watchdog_age_minutes: 9
- dashboard_status: PASS
- dashboard_age_minutes: 1
- mirror_status: PASS
- mirror_age_minutes: 0
- checkpoint_status: PASS
- checkpoint_step: platform_gate_pass
- checkpoint_age_minutes: 2481
- durable_platform_gate_age_minutes: 2481
- platform_progress_fresh: false

## Recovery Actions
- ScarFLIX_v2_Watchdog_StallDetector: watchdog_stale_or_failed (PASS) enable pid=24276; run pid=42872
- ScarFLIX_v2_AutonomousController: controller_stale_or_blocked (PASS) enable pid=39572; run pid=9540

## Notes
- Same unresolved sentinel signature repeated for three cycles.