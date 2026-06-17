# JasonOS Prime Sentinel

Updated UTC: 2026-06-17T09:18:52Z
Status: ALERT
Alert level: HIGH
Jason action required: false
Codex action required: true

## Signals
- controller_status: PASS
- controller_milestone: CANDIDATE_SOURCE_MODEL_PASS
- controller_age_minutes: 29
- watchdog_status: REVIEW
- watchdog_risk: Medium
- watchdog_age_minutes: 11
- dashboard_status: PASS
- dashboard_age_minutes: 5
- mirror_status: REVIEW
- mirror_age_minutes: 1
- checkpoint_status: PASS
- checkpoint_step: platform_gate_pass
- checkpoint_age_minutes: 13440
- durable_platform_gate_age_minutes: 13440
- platform_progress_fresh: false

## Recovery Actions
- ScarFLIX_v2_Watchdog_StallDetector: watchdog_stale_or_failed (PASS) enable pid=37376; run pid=42256
- ScarFLIX_v2_AutonomousController: controller_stale_or_blocked (PASS) enable pid=16108; run pid=40296

## Notes
- Same unresolved sentinel signature repeated for three cycles.