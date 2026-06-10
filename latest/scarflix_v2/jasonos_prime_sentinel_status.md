# JasonOS Prime Sentinel

Updated UTC: 2026-06-10T13:40:01Z
Status: ALERT
Alert level: HIGH
Jason action required: false
Codex action required: true

## Signals
- controller_status: FAIL_ENGINEERING
- controller_milestone: BLOCKED_DECISION
- controller_age_minutes: 12
- watchdog_status: REVIEW
- watchdog_risk: Medium
- watchdog_age_minutes: 12
- dashboard_status: PASS
- dashboard_age_minutes: 5
- mirror_status: PASS
- mirror_age_minutes: 3
- checkpoint_status: PASS
- checkpoint_step: platform_gate_pass
- checkpoint_age_minutes: 3621
- durable_platform_gate_age_minutes: 3621
- platform_progress_fresh: false

## Recovery Actions
- ScarFLIX_v2_Watchdog_StallDetector: watchdog_stale_or_failed (PASS) enable pid=9608; run pid=33648
- ScarFLIX_v2_AutonomousController: controller_stale_or_blocked (PASS) enable pid=1128; run pid=15128

## Notes
- Same unresolved sentinel signature repeated for three cycles.