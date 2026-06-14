# JasonOS Prime Go-Live 16h Campaign Status

- Status: RUNNING
- Updated UTC: 2026-06-14T18:34:35Z
- Started UTC: 2026-06-13T13:22:00Z
- Ends UTC: 2026-06-15T00:36:58Z
- Cycle: 269
- Launch health: 26 ms
- Sentinel: PASS / LOW
- Active Plex sessions: 0
- Materialized QA: REVIEW_PARTIAL_BATCH_PASS checked=7 passed=7 failed=0
- QA cursor: 71
- Last action: ran_playback_path_recovery_once, ran_mission2_threadfin_apply, ran_mission2_threadfin_verify, ran_bounded_materialized_qa_batch, ran_go_live_readiness_audit_once
- Last blocker: 

Safety:
- PAUSE_PUBLICATION remains active.
- No publication or broad catalogue expansion is performed by this runner.
- Materialized QA runs only in bounded batches and is stopped when launch health degrades or Plex sessions appear.
- Plex may be started/recovered, but running Plex is not killed unless a future explicit restart policy is added.
