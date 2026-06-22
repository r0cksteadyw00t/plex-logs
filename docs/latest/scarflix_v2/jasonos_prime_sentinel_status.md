# JasonOS Prime Sentinel

Updated UTC: 2026-06-22T18:33:01Z
Status: ALERT
Alert level: HIGH
Jason action required: false
Codex action required: true

## Signals
- controller_status: FAIL_ENGINEERING
- controller_milestone: BLOCKED_DECISION
- controller_age_minutes: 7
- watchdog_status: REVIEW
- watchdog_risk: Medium
- watchdog_age_minutes: 6
- dashboard_status: PASS
- dashboard_age_minutes: 0
- mirror_status: RUNNING
- mirror_age_minutes: 0
- checkpoint_status: REVIEW
- checkpoint_step: platform_gate_review
- checkpoint_age_minutes: 6
- durable_platform_gate_age_minutes: 6
- platform_progress_fresh: false

## Recovery Actions
- platform_gate.lock: stale_lock (PASS) removed age_min=7 backup=D:/PlexTools/state/scarflix_v2/platform_gate.lock.stale_20260622183301.bak
- ScarFLIX_v2_Watchdog_StallDetector: watchdog_stale_or_failed (PASS) enable pid=45892; run pid=46376
- ScarFLIX_v2_AutonomousController: controller_stale_or_blocked (PASS) enable pid=54096; run pid=42428

## Notes
- Same unresolved sentinel signature repeated for three cycles.