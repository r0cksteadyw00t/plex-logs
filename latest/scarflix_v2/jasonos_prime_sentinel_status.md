# JasonOS Prime Sentinel

Updated UTC: 2026-06-26T02:30:04Z
Status: REVIEW
Alert level: MEDIUM
Jason action required: false
Codex action required: false

## Signals
- controller_status: WAITING_RETRY
- controller_milestone: PLATFORM_GATE_RUNNING
- controller_age_minutes: 90
- watchdog_status: REVIEW
- watchdog_risk: Medium
- watchdog_age_minutes: 21
- dashboard_status: PASS
- dashboard_age_minutes: 5
- mirror_status: PASS
- mirror_age_minutes: 4
- checkpoint_status: REVIEW
- checkpoint_step: platform_gate_review
- checkpoint_age_minutes: 36
- durable_platform_gate_age_minutes: 36
- platform_progress_fresh: false

## Recovery Actions
- ScarFLIX_v2_Watchdog_StallDetector: watchdog_stale_or_failed (PASS) enable pid=39652; run pid=8716
- ScarFLIX_v2_AutonomousController: controller_stale_or_blocked (PASS) enable pid=2212; run pid=12360
- ScarFLIX_v2_Watchdog_StallDetector: platform_checkpoint_stale (PASS) enable pid=33316; run pid=42004
- ScarFLIX_v2_AutonomousController: platform_checkpoint_stale (PASS) enable pid=31992; run pid=18960
- ScarFLIX_v2_DurablePlatformGateRunner: platform_checkpoint_stale (PASS) enable pid=40408; run pid=36680

## Notes
- None.