# JasonOS Prime Sentinel

Updated UTC: 2026-06-06T12:40:04Z
Status: REVIEW
Alert level: MEDIUM
Jason action required: false
Codex action required: false

## Signals
- controller_status: WAITING_RETRY
- controller_milestone: PLATFORM_GATE_REVIEW_TRANSIENT_RETRY_SCHEDULED
- controller_age_minutes: 3
- watchdog_status: REVIEW
- watchdog_risk: Medium
- watchdog_age_minutes: 4
- dashboard_status: PASS
- dashboard_age_minutes: 4
- mirror_status: PASS
- mirror_age_minutes: 3
- checkpoint_status: RUNNING
- checkpoint_step: running_platform_gate_attempt_1
- checkpoint_age_minutes: 24

## Recovery Actions
- ScarFLIX_v2_Watchdog_StallDetector: platform_checkpoint_stale (PASS) enable pid=35748; run pid=39340
- ScarFLIX_v2_AutonomousController: platform_checkpoint_stale (PASS) enable pid=37540; run pid=38612
- ScarFLIX_v2_PlatformGate_LocalRunner_Detached: platform_checkpoint_stale (PASS) enable pid=8712; run pid=40892

## Notes
- None.