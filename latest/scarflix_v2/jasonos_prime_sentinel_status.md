# JasonOS Prime Sentinel

Updated UTC: 2026-06-27T15:35:08Z
Status: ALERT
Alert level: HIGH
Jason action required: false
Codex action required: true

## Signals
- controller_status: RUNNING
- controller_milestone: PLATFORM_GATE_RUNNING
- controller_age_minutes: 100
- watchdog_status: REVIEW
- watchdog_risk: Medium
- watchdog_age_minutes: 99
- dashboard_status: PASS
- dashboard_age_minutes: 98
- mirror_status: RUNNING
- mirror_age_minutes: 0
- checkpoint_status: REVIEW
- checkpoint_step: platform_gate_review
- checkpoint_age_minutes: 103
- durable_platform_gate_age_minutes: 103
- platform_progress_fresh: false

## Recovery Actions
- ScarFLIX_v2_Watchdog_StallDetector: watchdog_stale_or_failed (PASS) enable pid=9824; run pid=8200
- ScarFLIX_v2_AutonomousController: controller_stale_or_blocked (PASS) enable pid=8268; run pid=6696
- JasonOS_Prime_OutcomeDashboard: dashboard_stale (PASS) enable pid=2344; run pid=11092
- ScarFLIX_v2_Watchdog_StallDetector: platform_checkpoint_stale (PASS) enable pid=13428; run pid=5988
- ScarFLIX_v2_AutonomousController: platform_checkpoint_stale (PASS) enable pid=9516; run pid=10620
- ScarFLIX_v2_DurablePlatformGateRunner: platform_checkpoint_stale (PASS) enable pid=13044; run pid=10668

## Notes
- Same unresolved sentinel signature repeated for three cycles.