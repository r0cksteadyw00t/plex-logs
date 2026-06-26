# JasonOS Prime Sentinel

Updated UTC: 2026-06-26T00:28:49Z
Status: ALERT
Alert level: HIGH
Jason action required: false
Codex action required: true

## Signals
- controller_status: RUNNING
- controller_milestone: PLATFORM_GATE_RUNNING
- controller_age_minutes: 4
- watchdog_status: REVIEW
- watchdog_risk: Medium
- watchdog_age_minutes: 3
- dashboard_status: PASS
- dashboard_age_minutes: 2
- mirror_status: RUNNING
- mirror_age_minutes: 0
- checkpoint_status: REVIEW
- checkpoint_step: platform_gate_review
- checkpoint_age_minutes: 10
- durable_platform_gate_age_minutes: 10
- platform_progress_fresh: false

## Recovery Actions
- ScarFLIX_v2_Watchdog_StallDetector: platform_checkpoint_stale (PASS) enable pid=41396; run pid=21020
- ScarFLIX_v2_AutonomousController: platform_checkpoint_stale (PASS) enable pid=42608; run pid=23816
- ScarFLIX_v2_DurablePlatformGateRunner: platform_checkpoint_stale (PASS) enable pid=33692; run pid=7140

## Notes
- Same unresolved sentinel signature repeated for three cycles.