# JasonOS Prime Sentinel

Updated UTC: 2026-06-26T02:20:02Z
Status: REVIEW
Alert level: MEDIUM
Jason action required: false
Codex action required: false

## Signals
- controller_status: WAITING_RETRY
- controller_milestone: PLATFORM_GATE_REVIEW_TRANSIENT_RETRY_SCHEDULED
- controller_age_minutes: 28
- watchdog_status: REVIEW
- watchdog_risk: Medium
- watchdog_age_minutes: 11
- dashboard_status: PASS
- dashboard_age_minutes: 3
- mirror_status: PASS
- mirror_age_minutes: 0
- checkpoint_status: REVIEW
- checkpoint_step: platform_gate_review
- checkpoint_age_minutes: 26
- durable_platform_gate_age_minutes: 26
- platform_progress_fresh: false

## Recovery Actions
- ScarFLIX_v2_Watchdog_StallDetector: watchdog_stale_or_failed (PASS) enable pid=35852; run pid=24064
- ScarFLIX_v2_AutonomousController: controller_stale_or_blocked (PASS) enable pid=40332; run pid=19176
- ScarFLIX_v2_Watchdog_StallDetector: platform_checkpoint_stale (PASS) enable pid=39660; run pid=40780
- ScarFLIX_v2_AutonomousController: platform_checkpoint_stale (PASS) enable pid=15808; run pid=38968
- ScarFLIX_v2_DurablePlatformGateRunner: platform_checkpoint_stale (PASS) enable pid=9912; run pid=2156

## Notes
- None.