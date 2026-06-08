# JasonOS Prime Sentinel

Updated UTC: 2026-06-08T10:02:01Z
Status: REVIEW
Alert level: MEDIUM
Jason action required: false
Codex action required: false

## Signals
- controller_status: REVIEW_TRANSIENT
- controller_milestone: CANDIDATE_SOURCE_MODEL_PENDING
- controller_age_minutes: 6
- watchdog_status: REVIEW
- watchdog_risk: Medium
- watchdog_age_minutes: 7
- dashboard_status: PASS
- dashboard_age_minutes: 2
- mirror_status: REVIEW
- mirror_age_minutes: 1
- checkpoint_status: PASS
- checkpoint_step: platform_gate_pass
- checkpoint_age_minutes: 523
- durable_platform_gate_age_minutes: 523
- platform_progress_fresh: false

## Recovery Actions
- ScarFLIX_v2_Watchdog_StallDetector: watchdog_stale_or_failed (PASS) enable pid=20784; run pid=32704
- ScarFLIX_v2_AutonomousController: controller_stale_or_blocked (PASS) enable pid=46552; run pid=7552

## Notes
- None.