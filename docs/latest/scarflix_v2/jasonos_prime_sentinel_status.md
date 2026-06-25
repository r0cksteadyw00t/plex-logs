# JasonOS Prime Sentinel

Updated UTC: 2026-06-25T22:40:01Z
Status: REVIEW
Alert level: MEDIUM
Jason action required: false
Codex action required: false

## Signals
- controller_status: WAITING_RETRY
- controller_milestone: PLATFORM_GATE_RUNNING
- controller_age_minutes: 48
- watchdog_status: REVIEW
- watchdog_risk: Medium
- watchdog_age_minutes: 5
- dashboard_status: PASS
- dashboard_age_minutes: 5
- mirror_status: PASS
- mirror_age_minutes: 4
- checkpoint_status: REVIEW
- checkpoint_step: platform_gate_review
- checkpoint_age_minutes: 20
- durable_platform_gate_age_minutes: 20
- platform_progress_fresh: false

## Recovery Actions
- ScarFLIX_v2_AutonomousController: controller_stale_or_blocked (PASS) enable pid=44372; run pid=33176
- ScarFLIX_v2_Watchdog_StallDetector: platform_checkpoint_stale (PASS) enable pid=1680; run pid=42496
- ScarFLIX_v2_AutonomousController: platform_checkpoint_stale (PASS) enable pid=43296; run pid=28256
- ScarFLIX_v2_DurablePlatformGateRunner: platform_checkpoint_stale (PASS) enable pid=40076; run pid=41592

## Notes
- None.