# ScarFLIX v2 Autonomous Controller

Status: WAITING_RETRY
Milestone state: PLATFORM_GATE_REVIEW_TRANSIENT_RETRY_SCHEDULED
Milestone: Complete same-snapshot PlatformGate checkpoint
Updated UTC: 2026-06-25T14:20:00Z
Current step: stale_platform_gate_backoff_retry
Jason action required: False

## PlatformGate
- runner_running: True
- status: RUNNING
- stage: existing_durable_owner_active
- visible: 0
- transient_failures: 0
- prunable_failures: 0

## Candidate Source Model
- status: PASS
- status_file: D:\PlexTools\public\latest\scarflix_v2\candidate_source_model_status.json

## Infrastructure
- rclone_mount_status: FAIL
- s_media_ready: False
- s_catalog_ready: False
- mount_selfheal_attempted: False

## Action
- action_taken: PlatformGate became stale repeatedly; watchdog/controller retriggered runner and scheduled backoff retry
- next_check_utc: 2026-06-25T14:43:23Z

## Blockers
- none