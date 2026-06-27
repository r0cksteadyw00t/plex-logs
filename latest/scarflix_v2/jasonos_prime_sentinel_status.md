# JasonOS Prime Sentinel

Updated UTC: 2026-06-27T17:59:12Z
Status: ALERT
Alert level: HIGH
Jason action required: false
Codex action required: true

## Signals
- controller_status: RUNNING
- controller_milestone: PLATFORM_GATE_RUNNING
- controller_age_minutes: 244
- watchdog_status: REVIEW
- watchdog_risk: Medium
- watchdog_age_minutes: 243
- dashboard_status: PASS
- dashboard_age_minutes: 242
- mirror_status: RUNNING
- mirror_age_minutes: 0
- checkpoint_status: REVIEW
- checkpoint_step: platform_gate_review
- checkpoint_age_minutes: 247
- durable_platform_gate_age_minutes: 247
- platform_progress_fresh: false

## Recovery Actions
- ScarFLIX_v2_Watchdog_StallDetector: watchdog_stale_or_failed (PASS) enable pid=13492; run pid=2964
- ScarFLIX_v2_AutonomousController: controller_stale_or_blocked (PASS) enable pid=3748; run pid=4752
- JasonOS_Prime_OutcomeDashboard: dashboard_stale (PASS) enable pid=4920; run pid=7124
- ScarFLIX_v2_Watchdog_StallDetector: platform_checkpoint_stale (PASS) enable pid=668; run pid=2248
- ScarFLIX_v2_AutonomousController: platform_checkpoint_stale (PASS) enable pid=5332; run pid=2860
- ScarFLIX_v2_DurablePlatformGateRunner: platform_checkpoint_stale (PASS) enable pid=7088; run pid=2872

## Notes
- Same unresolved sentinel signature repeated for three cycles.