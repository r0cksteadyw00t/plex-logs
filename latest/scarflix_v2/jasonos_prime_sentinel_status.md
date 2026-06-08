# JasonOS Prime Sentinel

Updated UTC: 2026-06-08T12:52:03Z
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
- mirror_status: PASS
- mirror_age_minutes: 3
- checkpoint_status: PASS
- checkpoint_step: platform_gate_pass
- checkpoint_age_minutes: 693
- durable_platform_gate_age_minutes: 693
- platform_progress_fresh: false

## Recovery Actions
- ScarFLIX_v2_Watchdog_StallDetector: watchdog_stale_or_failed (PASS) enable pid=44320; run pid=37712
- ScarFLIX_v2_AutonomousController: controller_stale_or_blocked (PASS) enable pid=39060; run pid=43640

## Notes
- None.