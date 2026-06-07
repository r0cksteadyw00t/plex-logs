# JasonOS Prime Sentinel

Updated UTC: 2026-06-07T18:56:05Z
Status: REVIEW
Alert level: MEDIUM
Jason action required: false
Codex action required: false

## Signals
- controller_status: FAIL_ENGINEERING
- controller_milestone: BLOCKED_DECISION
- controller_age_minutes: 5
- watchdog_status: PASS
- watchdog_risk: Low
- watchdog_age_minutes: 5
- dashboard_status: PASS
- dashboard_age_minutes: 0
- mirror_status: PASS
- mirror_age_minutes: 2
- checkpoint_status: PASS
- checkpoint_step: platform_gate_pass
- checkpoint_age_minutes: 517
- durable_platform_gate_age_minutes: 517
- platform_progress_fresh: false

## Recovery Actions
- ScarFLIX_v2_AutonomousController: controller_stale_or_blocked (PASS) enable pid=44148; run pid=20396

## Notes
- None.