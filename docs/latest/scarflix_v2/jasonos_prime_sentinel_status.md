# JasonOS Prime Sentinel

Updated UTC: 2026-06-11T05:05:02Z
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
- watchdog_age_minutes: 9
- dashboard_status: PASS
- dashboard_age_minutes: 5
- mirror_status: PASS
- mirror_age_minutes: 3
- checkpoint_status: PASS
- checkpoint_step: platform_gate_pass
- checkpoint_age_minutes: 4546
- durable_platform_gate_age_minutes: 4546
- platform_progress_fresh: false

## Recovery Actions
- autonomous_controller.lock: stale_lock (PASS) removed age_min=9 backup=D:/PlexTools/state/scarflix_v2/autonomous_controller.lock.stale_20260611050502.bak
- ScarFLIX_v2_Watchdog_StallDetector: watchdog_stale_or_failed (PASS) enable pid=20452; run pid=39512
- ScarFLIX_v2_AutonomousController: controller_stale_or_blocked (PASS) enable pid=36716; run pid=8980

## Notes
- None.