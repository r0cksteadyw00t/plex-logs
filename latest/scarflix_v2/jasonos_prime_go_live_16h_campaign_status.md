# JasonOS Prime Go-Live 16h Campaign Status

- Status: RUNNING
- Updated UTC: 2026-06-15T00:55:30Z
- Started UTC: 2026-06-15T00:40:15Z
- Ends UTC: 2026-06-15T16:40:16Z
- Cycle: 3
- Launch health: 40 ms
- Sentinel: PASS / LOW
- Active Plex sessions: 0
- Materialized QA: REVIEW checked=3 passed=1 failed=2
- QA cursor: 9
- Last action: ran_playback_path_recovery_once, ran_mission2_threadfin_apply, ran_mission2_threadfin_verify, ran_retry_held_rechecker, ran_bounded_materialized_qa_batch, ran_watch_now_collection_publisher, ran_go_live_readiness_audit_once
- Last blocker: 

Safety:
- PAUSE_PUBLICATION remains active.
- No publication or broad catalogue expansion is performed by this runner.
- Materialized QA runs only in bounded batches and is stopped when launch health degrades or Plex sessions appear.
- Plex may be started/recovered, but running Plex is not killed unless a future explicit restart policy is added.
