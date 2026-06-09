# JasonOS Prime Sentinel

Updated UTC: 2026-06-09T13:04:01Z
Status: ALERT
Alert level: HIGH
Jason action required: false
Codex action required: true

## Signals
- controller_status: PASS
- controller_milestone: CANDIDATE_SOURCE_MODEL_PASS
- controller_age_minutes: 8
- watchdog_status: REVIEW
- watchdog_risk: Medium
- watchdog_age_minutes: 8
- dashboard_status: PASS
- dashboard_age_minutes: 1
- mirror_status: REVIEW_RECOVERABLE
- mirror_age_minutes: 0
- checkpoint_status: PASS
- checkpoint_step: platform_gate_pass
- checkpoint_age_minutes: 2145
- durable_platform_gate_age_minutes: 2145
- platform_progress_fresh: false

## Recovery Actions
- ScarFLIX_v2_Watchdog_StallDetector: watchdog_stale_or_failed (PASS) enable pid=22792; run pid=30212
- ScarFLIX_v2_AutonomousController: controller_stale_or_blocked (PASS) enable pid=41808; run pid=42616

## Notes
- Same unresolved sentinel signature repeated for three cycles.