# JasonOS Prime Sentinel

Updated UTC: 2026-06-09T13:02:01Z
Status: ALERT
Alert level: HIGH
Jason action required: false
Codex action required: true

## Signals
- controller_status: PASS
- controller_milestone: CANDIDATE_SOURCE_MODEL_PASS
- controller_age_minutes: 6
- watchdog_status: REVIEW
- watchdog_risk: Medium
- watchdog_age_minutes: 6
- dashboard_status: PASS
- dashboard_age_minutes: 1
- mirror_status: REVIEW_RECOVERABLE
- mirror_age_minutes: 18
- checkpoint_status: PASS
- checkpoint_step: platform_gate_pass
- checkpoint_age_minutes: 2143
- durable_platform_gate_age_minutes: 2143
- platform_progress_fresh: false

## Recovery Actions
- ScarFLIX_v2_Watchdog_StallDetector: watchdog_stale_or_failed (PASS) enable pid=33960; run pid=37016
- ScarFLIX_v2_AutonomousController: controller_stale_or_blocked (PASS) enable pid=35232; run pid=43568
- JasonOS_Prime_PublicMirrorPublisher: mirror_stale (PASS) enable pid=41060; run pid=8048

## Notes
- Same unresolved sentinel signature repeated for three cycles.