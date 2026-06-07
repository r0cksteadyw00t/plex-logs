# JasonOS Prime Sentinel

Updated UTC: 2026-06-07T10:15:04Z
Status: REVIEW
Alert level: MEDIUM
Jason action required: false
Codex action required: false

## Signals
- controller_status: FAIL_ENGINEERING
- controller_milestone: BLOCKED_DECISION
- controller_age_minutes: 2
- watchdog_status: PASS
- watchdog_risk: Low
- watchdog_age_minutes: 2
- dashboard_status: PASS
- dashboard_age_minutes: 1
- mirror_status: PASS
- mirror_age_minutes: 2
- checkpoint_status: RUNNING
- checkpoint_step: running_platform_gate_attempt_1
- checkpoint_age_minutes: 2
- durable_platform_gate_age_minutes: 2
- platform_progress_fresh: false

## Recovery Actions
- ScarFLIX_v2_AutonomousController: controller_stale_or_blocked (PASS) enable pid=42680; run pid=41532

## Notes
- None.