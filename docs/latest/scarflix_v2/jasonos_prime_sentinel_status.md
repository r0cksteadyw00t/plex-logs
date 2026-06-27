# JasonOS Prime Sentinel

Updated UTC: 2026-06-27T16:54:40Z
Status: ALERT
Alert level: HIGH
Jason action required: false
Codex action required: true

## Signals
- controller_status: RUNNING
- controller_milestone: PLATFORM_GATE_RUNNING
- controller_age_minutes: 179
- watchdog_status: REVIEW
- watchdog_risk: Medium
- watchdog_age_minutes: 178
- dashboard_status: PASS
- dashboard_age_minutes: 177
- mirror_status: RUNNING
- mirror_age_minutes: 0
- checkpoint_status: REVIEW
- checkpoint_step: platform_gate_review
- checkpoint_age_minutes: 183
- durable_platform_gate_age_minutes: 183
- platform_progress_fresh: false

## Recovery Actions
- ScarFLIX_v2_Watchdog_StallDetector: watchdog_stale_or_failed (PASS) enable pid=12476; run pid=9260
- ScarFLIX_v2_AutonomousController: controller_stale_or_blocked (PASS) enable pid=10156; run pid=11104
- JasonOS_Prime_OutcomeDashboard: dashboard_stale (PASS) enable pid=1996; run pid=2444
- ScarFLIX_v2_Watchdog_StallDetector: platform_checkpoint_stale (PASS) enable pid=12504; run pid=1244
- ScarFLIX_v2_AutonomousController: platform_checkpoint_stale (PASS) enable pid=4548; run pid=2844
- ScarFLIX_v2_DurablePlatformGateRunner: platform_checkpoint_stale (PASS) enable pid=10632; run pid=9596

## Notes
- Same unresolved sentinel signature repeated for three cycles.