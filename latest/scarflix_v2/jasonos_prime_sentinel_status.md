# JasonOS Prime Sentinel

Updated UTC: 2026-06-09T14:02:01Z
Status: REVIEW
Alert level: MEDIUM
Jason action required: false
Codex action required: false

## Signals
- controller_status: PASS
- controller_milestone: CANDIDATE_SOURCE_MODEL_PASS
- controller_age_minutes: 7
- watchdog_status: REVIEW
- watchdog_risk: Medium
- watchdog_age_minutes: 7
- dashboard_status: PASS
- dashboard_age_minutes: 1
- mirror_status: REVIEW_RECOVERABLE
- mirror_age_minutes: 11
- checkpoint_status: PASS
- checkpoint_step: platform_gate_pass
- checkpoint_age_minutes: 2203
- durable_platform_gate_age_minutes: 2203
- platform_progress_fresh: false

## Recovery Actions
- ScarFLIX_v2_Watchdog_StallDetector: watchdog_stale_or_failed (PASS) enable pid=43220; run pid=19884
- ScarFLIX_v2_AutonomousController: controller_stale_or_blocked (PASS) enable pid=42240; run pid=35416
- JasonOS_Prime_PublicMirrorPublisher: mirror_stale (PASS) enable pid=33920; run pid=16304

## Notes
- None.