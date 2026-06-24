# JasonOS Prime Sentinel

Updated UTC: 2026-06-24T21:45:13Z
Status: REVIEW
Alert level: MEDIUM
Jason action required: false
Codex action required: false

## Signals
- controller_status: RUNNING
- controller_milestone: PLATFORM_GATE_RUNNING
- controller_age_minutes: 290
- watchdog_status: REVIEW
- watchdog_risk: Medium
- watchdog_age_minutes: 290
- dashboard_status: PASS
- dashboard_age_minutes: 286
- mirror_status: PASS
- mirror_age_minutes: 288
- checkpoint_status: RUNNING
- checkpoint_step: running_platform_gate_attempt_1
- checkpoint_age_minutes: 286
- durable_platform_gate_age_minutes: 286
- platform_progress_fresh: false

## Recovery Actions
- ScarFLIX_v2_Watchdog_StallDetector: watchdog_stale_or_failed (PASS) enable pid=17372; run pid=6416
- ScarFLIX_v2_AutonomousController: controller_stale_or_blocked (PASS) enable pid=8408; run pid=18356
- JasonOS_Prime_OutcomeDashboard: dashboard_stale (PASS) enable pid=30888; run pid=29348
- JasonOS_Prime_PublicMirrorPublisher: mirror_stale (PASS) skipped_orchestrator_owned job=run_public_mirror_publisher
- ScarFLIX_v2_Watchdog_StallDetector: platform_checkpoint_stale (PASS) enable pid=30832; run pid=31512
- ScarFLIX_v2_AutonomousController: platform_checkpoint_stale (PASS) enable pid=32672; run pid=18964
- ScarFLIX_v2_DurablePlatformGateRunner: platform_checkpoint_stale (PASS) enable pid=5752; run pid=29968

## Notes
- None.