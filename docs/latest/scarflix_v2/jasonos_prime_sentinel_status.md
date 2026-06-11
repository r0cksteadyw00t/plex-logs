# JasonOS Prime Sentinel

Updated UTC: 2026-06-11T04:30:03Z
Status: ALERT
Alert level: HIGH
Jason action required: false
Codex action required: true

## Signals
- controller_status: PASS
- controller_milestone: CANDIDATE_SOURCE_MODEL_PASS
- controller_age_minutes: 25
- watchdog_status: REVIEW
- watchdog_risk: Medium
- watchdog_age_minutes: 7
- dashboard_status: PASS
- dashboard_age_minutes: 5
- mirror_status: PASS
- mirror_age_minutes: 4
- checkpoint_status: PASS
- checkpoint_step: platform_gate_pass
- checkpoint_age_minutes: 4511
- durable_platform_gate_age_minutes: 4511
- platform_progress_fresh: false

## Recovery Actions
- autonomous_controller.lock: stale_lock (PASS) removed age_min=7 backup=D:/PlexTools/state/scarflix_v2/autonomous_controller.lock.stale_20260611043003.bak
- ScarFLIX_v2_Watchdog_StallDetector: watchdog_stale_or_failed (PASS) enable pid=36892; run pid=27768
- ScarFLIX_v2_AutonomousController: controller_stale_or_blocked (PASS) enable pid=7992; run pid=6876

## Notes
- Same unresolved sentinel signature repeated for three cycles.