# JasonOS Prime Sentinel

Updated UTC: 2026-06-07T18:53:08Z
Status: ALERT
Alert level: HIGH
Jason action required: false
Codex action required: true

## Signals
- controller_status: FAIL_ENGINEERING
- controller_milestone: BLOCKED_DECISION
- controller_age_minutes: 2
- watchdog_status: PASS
- watchdog_risk: Low
- watchdog_age_minutes: 2
- dashboard_status: PASS
- dashboard_age_minutes: 2
- mirror_status: PASS
- mirror_age_minutes: 1
- checkpoint_status: PASS
- checkpoint_step: platform_gate_pass
- checkpoint_age_minutes: 514
- durable_platform_gate_age_minutes: 514
- platform_progress_fresh: false

## Recovery Actions
- ScarFLIX_v2_AutonomousController: controller_stale_or_blocked (FAIL) enable pid=10736; run spawn UNKNOWN

## Notes
- One or more detached recovery launches failed.