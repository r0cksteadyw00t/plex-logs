# JasonOS Prime Sentinel

Updated UTC: 2026-06-09T20:10:01Z
Status: REVIEW
Alert level: MEDIUM
Jason action required: false
Codex action required: false

## Signals
- controller_status: FAIL_ENGINEERING
- controller_milestone: BLOCKED_DECISION
- controller_age_minutes: 6
- watchdog_status: REVIEW
- watchdog_risk: Medium
- watchdog_age_minutes: 6
- dashboard_status: PASS
- dashboard_age_minutes: 0
- mirror_status: PASS
- mirror_age_minutes: 0
- checkpoint_status: PASS
- checkpoint_step: platform_gate_pass
- checkpoint_age_minutes: 2571
- durable_platform_gate_age_minutes: 2571
- platform_progress_fresh: false

## Recovery Actions
- ScarFLIX_v2_Watchdog_StallDetector: watchdog_stale_or_failed (PASS) enable pid=35932; run pid=36432
- ScarFLIX_v2_AutonomousController: controller_stale_or_blocked (PASS) enable pid=40724; run pid=43420

## Notes
- None.