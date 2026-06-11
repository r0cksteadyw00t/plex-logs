# JasonOS Prime Sentinel

Updated UTC: 2026-06-11T02:28:32Z
Status: REVIEW
Alert level: MEDIUM
Jason action required: false
Codex action required: false

## Signals
- controller_status: PASS
- controller_milestone: CANDIDATE_SOURCE_MODEL_PASS
- controller_age_minutes: 12
- watchdog_status: REVIEW
- watchdog_risk: Medium
- watchdog_age_minutes: 6
- dashboard_status: PASS
- dashboard_age_minutes: 4
- mirror_status: PASS
- mirror_age_minutes: 2
- checkpoint_status: PASS
- checkpoint_step: platform_gate_pass
- checkpoint_age_minutes: 4390
- durable_platform_gate_age_minutes: 4390
- platform_progress_fresh: false

## Recovery Actions
- autonomous_controller.lock: stale_lock (PASS) removed age_min=6 backup=D:/PlexTools/state/scarflix_v2/autonomous_controller.lock.stale_20260611022832.bak
- ScarFLIX_v2_Watchdog_StallDetector: watchdog_stale_or_failed (PASS) enable pid=38216; run pid=9728
- ScarFLIX_v2_AutonomousController: controller_stale_or_blocked (PASS) enable pid=25332; run pid=37652

## Notes
- None.