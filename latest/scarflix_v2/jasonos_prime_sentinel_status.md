# JasonOS Prime Sentinel

Updated UTC: 2026-06-09T17:29:01Z
Status: ALERT
Alert level: HIGH
Jason action required: false
Codex action required: true

## Signals
- controller_status: FAIL_ENGINEERING
- controller_milestone: BLOCKED_DECISION
- controller_age_minutes: 5
- watchdog_status: REVIEW
- watchdog_risk: Medium
- watchdog_age_minutes: 6
- dashboard_status: PASS
- dashboard_age_minutes: 1
- mirror_status: PASS
- mirror_age_minutes: 0
- checkpoint_status: PASS
- checkpoint_step: platform_gate_pass
- checkpoint_age_minutes: 2410
- durable_platform_gate_age_minutes: 2410
- platform_progress_fresh: false

## Recovery Actions
- ScarFLIX_v2_Watchdog_StallDetector: watchdog_stale_or_failed (PASS) enable pid=8576; run pid=32404
- ScarFLIX_v2_AutonomousController: controller_stale_or_blocked (PASS) enable pid=40728; run pid=20792

## Notes
- Same unresolved sentinel signature repeated for three cycles.