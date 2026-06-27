# JasonOS Prime Sentinel

Updated UTC: 2026-06-27T12:17:18Z
Status: REVIEW
Alert level: MEDIUM
Jason action required: false
Codex action required: false

## Signals
- controller_status: WAITING_RETRY
- controller_milestone: PLATFORM_GATE_RUNNING
- controller_age_minutes: 2
- watchdog_status: REVIEW
- watchdog_risk: Medium
- watchdog_age_minutes: 0
- dashboard_status: PASS
- dashboard_age_minutes: 5
- mirror_status: PASS
- mirror_age_minutes: 3
- checkpoint_status: REVIEW
- checkpoint_step: platform_gate_review
- checkpoint_age_minutes: 6
- durable_platform_gate_age_minutes: 6
- platform_progress_fresh: false

## Recovery Actions
- ScarFLIX_v2_Watchdog_StallDetector: platform_checkpoint_stale (PASS) enable pid=30996; run pid=14576
- ScarFLIX_v2_AutonomousController: platform_checkpoint_stale (PASS) enable pid=37112; run pid=39224
- ScarFLIX_v2_DurablePlatformGateRunner: platform_checkpoint_stale (PASS) enable pid=22536; run pid=31308

## Notes
- None.