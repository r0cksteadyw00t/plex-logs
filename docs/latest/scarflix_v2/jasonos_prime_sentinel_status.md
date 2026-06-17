# JasonOS Prime Sentinel

Updated UTC: 2026-06-17T08:30:34Z
Status: ALERT
Alert level: HIGH
Jason action required: false
Codex action required: true

## Signals
- controller_status: PASS
- controller_milestone: CANDIDATE_SOURCE_MODEL_PASS
- controller_age_minutes: 6
- watchdog_status: REVIEW
- watchdog_risk: Medium
- watchdog_age_minutes: 8
- dashboard_status: PASS
- dashboard_age_minutes: 3
- mirror_status: REVIEW_RECOVERABLE
- mirror_age_minutes: 6
- checkpoint_status: PASS
- checkpoint_step: platform_gate_pass
- checkpoint_age_minutes: 13392
- durable_platform_gate_age_minutes: 13392
- platform_progress_fresh: false

## Recovery Actions
- ScarFLIX_v2_Watchdog_StallDetector: watchdog_stale_or_failed (PASS) enable pid=29020; run pid=32912
- ScarFLIX_v2_AutonomousController: controller_stale_or_blocked (PASS) enable pid=36420; run pid=5692

## Notes
- Same unresolved sentinel signature repeated for three cycles.