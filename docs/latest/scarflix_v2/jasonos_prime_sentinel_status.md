# JasonOS Prime Sentinel

Updated UTC: 2026-06-07T18:58:02Z
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
- watchdog_age_minutes: 7
- dashboard_status: PASS
- dashboard_age_minutes: 2
- mirror_status: PASS
- mirror_age_minutes: 0
- checkpoint_status: PASS
- checkpoint_step: platform_gate_pass
- checkpoint_age_minutes: 519
- durable_platform_gate_age_minutes: 519
- platform_progress_fresh: false

## Recovery Actions
- ScarFLIX_v2_Watchdog_StallDetector: watchdog_stale_or_failed (PASS) enable pid=15160; run pid=27904
- ScarFLIX_v2_AutonomousController: controller_stale_or_blocked (PASS) enable pid=12784; run pid=27556

## Notes
- None.