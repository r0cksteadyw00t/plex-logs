# JasonOS Prime Sentinel

Updated UTC: 2026-06-10T14:05:02Z
Status: REVIEW
Alert level: MEDIUM
Jason action required: false
Codex action required: false

## Signals
- controller_status: PASS
- controller_milestone: CANDIDATE_SOURCE_MODEL_PASS
- controller_age_minutes: 9
- watchdog_status: REVIEW
- watchdog_risk: Medium
- watchdog_age_minutes: 9
- dashboard_status: PASS
- dashboard_age_minutes: 5
- mirror_status: PASS
- mirror_age_minutes: 3
- checkpoint_status: PASS
- checkpoint_step: platform_gate_pass
- checkpoint_age_minutes: 3646
- durable_platform_gate_age_minutes: 3646
- platform_progress_fresh: false

## Recovery Actions
- ScarFLIX_v2_Watchdog_StallDetector: watchdog_stale_or_failed (PASS) enable pid=33824; run pid=34548
- ScarFLIX_v2_AutonomousController: controller_stale_or_blocked (PASS) enable pid=15648; run pid=32424

## Notes
- None.