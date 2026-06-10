# JasonOS Prime Sentinel

Updated UTC: 2026-06-10T09:15:01Z
Status: ALERT
Alert level: HIGH
Jason action required: false
Codex action required: true

## Signals
- controller_status: PASS
- controller_milestone: CANDIDATE_SOURCE_MODEL_PASS
- controller_age_minutes: 17
- watchdog_status: REVIEW
- watchdog_risk: Medium
- watchdog_age_minutes: 4
- dashboard_status: PASS
- dashboard_age_minutes: 5
- mirror_status: PASS
- mirror_age_minutes: 3
- checkpoint_status: PASS
- checkpoint_step: platform_gate_pass
- checkpoint_age_minutes: 3356
- durable_platform_gate_age_minutes: 3356
- platform_progress_fresh: false

## Recovery Actions
- autonomous_controller.lock: stale_lock (PASS) removed age_min=8 backup=D:/PlexTools/state/scarflix_v2/autonomous_controller.lock.stale_20260610091501.bak
- ScarFLIX_v2_AutonomousController: controller_stale_or_blocked (PASS) enable pid=16232; run pid=2380

## Notes
- Same unresolved sentinel signature repeated for three cycles.