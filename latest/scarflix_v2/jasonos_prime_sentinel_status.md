# JasonOS Prime Sentinel

Updated UTC: 2026-06-09T17:25:02Z
Status: REVIEW
Alert level: MEDIUM
Jason action required: false
Codex action required: false

## Signals
- controller_status: FAIL_ENGINEERING
- controller_milestone: BLOCKED_DECISION
- controller_age_minutes: 1
- watchdog_status: REVIEW
- watchdog_risk: Medium
- watchdog_age_minutes: 2
- dashboard_status: PASS
- dashboard_age_minutes: 1
- mirror_status: PASS
- mirror_age_minutes: 0
- checkpoint_status: PASS
- checkpoint_step: platform_gate_pass
- checkpoint_age_minutes: 2406
- durable_platform_gate_age_minutes: 2406
- platform_progress_fresh: false

## Recovery Actions
- ScarFLIX_v2_AutonomousController: controller_stale_or_blocked (PASS) enable pid=45100; run pid=36740

## Notes
- None.