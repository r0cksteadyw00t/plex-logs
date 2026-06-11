# JasonOS Prime Sentinel

Updated UTC: 2026-06-11T11:45:02Z
Status: ALERT
Alert level: HIGH
Jason action required: false
Codex action required: true

## Signals
- controller_status: PASS
- controller_milestone: CANDIDATE_SOURCE_MODEL_PASS
- controller_age_minutes: 23
- watchdog_status: REVIEW
- watchdog_risk: Medium
- watchdog_age_minutes: 5
- dashboard_status: PASS
- dashboard_age_minutes: 5
- mirror_status: PASS
- mirror_age_minutes: 3
- checkpoint_status: PASS
- checkpoint_step: platform_gate_pass
- checkpoint_age_minutes: 4946
- durable_platform_gate_age_minutes: 4946
- platform_progress_fresh: false

## Recovery Actions
- autonomous_controller.lock: stale_lock (PASS) removed age_min=7 backup=D:/PlexTools/state/scarflix_v2/autonomous_controller.lock.stale_20260611114502.bak
- ScarFLIX_v2_AutonomousController: controller_stale_or_blocked (PASS) enable pid=22160; run pid=39324

## Notes
- Same unresolved sentinel signature repeated for three cycles.