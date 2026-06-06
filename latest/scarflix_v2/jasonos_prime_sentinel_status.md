# JasonOS Prime Sentinel

Updated UTC: 2026-06-06T14:23:03Z
Status: REVIEW
Alert level: MEDIUM
Jason action required: false
Codex action required: false

## Signals
- controller_status: RUNNING
- controller_milestone: PLATFORM_GATE_RUNNING
- controller_age_minutes: 6
- watchdog_status: REVIEW
- watchdog_risk: Medium
- watchdog_age_minutes: 6
- dashboard_status: PASS
- dashboard_age_minutes: 0
- mirror_status: PASS
- mirror_age_minutes: 0
- checkpoint_status: RUNNING
- checkpoint_step: adopting_existing_platform_gate_child
- checkpoint_age_minutes: 0

## Recovery Actions
- ScarFLIX_v2_Watchdog_StallDetector: watchdog_stale_or_failed (PASS) enable pid=40344; run pid=45508
- ScarFLIX_v2_AutonomousController: controller_stale_or_blocked (PASS) enable pid=43176; run pid=28060

## Notes
- None.