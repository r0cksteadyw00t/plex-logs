# JasonOS Prime Sentinel

Updated UTC: 2026-06-12T08:23:12Z
Status: REVIEW
Alert level: MEDIUM
Jason action required: false
Codex action required: false

## Signals
- controller_status: PASS
- controller_milestone: CANDIDATE_SOURCE_MODEL_PASS
- controller_age_minutes: 10
- watchdog_status: REVIEW
- watchdog_risk: Medium
- watchdog_age_minutes: 6
- dashboard_status: PASS
- dashboard_age_minutes: 3
- mirror_status: PASS
- mirror_age_minutes: 2
- checkpoint_status: PASS
- checkpoint_step: platform_gate_pass
- checkpoint_age_minutes: 6184
- durable_platform_gate_age_minutes: 6184
- platform_progress_fresh: false

## Recovery Actions
- autonomous_controller.lock: stale_lock (PASS) removed age_min=6 backup=D:/PlexTools/state/scarflix_v2/autonomous_controller.lock.stale_20260612082312.bak
- ScarFLIX_v2_Watchdog_StallDetector: watchdog_stale_or_failed (PASS) enable pid=29640; run pid=32168
- ScarFLIX_v2_AutonomousController: controller_stale_or_blocked (PASS) enable pid=34780; run pid=30704

## Notes
- None.