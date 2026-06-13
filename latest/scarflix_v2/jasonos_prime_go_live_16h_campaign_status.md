# JasonOS Prime Go-Live 16h Campaign Status

- Status: RUNNING
- Updated UTC: 2026-06-13T19:43:55Z
- Started UTC: 2026-06-13T13:22:00Z
- Ends UTC: 2026-06-14T05:22:00Z
- Cycle: 60
- Launch health: 44 ms
- Sentinel: PASS / LOW
- Active Plex sessions: 0
- Materialized QA: REVIEW checked=2 passed=0 failed=2
- QA cursor: 62
- Last action: suppressed_noncritical_tasks, ran_playback_path_recovery_once, ran_mission2_threadfin_apply, ran_mission2_threadfin_verify, ran_bounded_materialized_qa_batch, ran_go_live_readiness_audit_once
- Last blocker: 

Safety:
- PAUSE_PUBLICATION remains active.
- No publication or broad catalogue expansion is performed by this runner.
- Materialized QA runs only in bounded batches and is stopped when launch health degrades or Plex sessions appear.
- Plex may be started/recovered, but running Plex is not killed unless a future explicit restart policy is added.
