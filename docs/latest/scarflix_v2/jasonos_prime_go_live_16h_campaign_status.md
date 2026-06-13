# JasonOS Prime Go-Live 16h Campaign Status

- Status: RUNNING
- Updated UTC: 2026-06-13T21:08:43Z
- Started UTC: 2026-06-13T13:22:00Z
- Ends UTC: 2026-06-14T05:22:00Z
- Cycle: 73
- Launch health: 30 ms
- Sentinel: PASS / LOW
- Active Plex sessions: 0
- Materialized QA: REVIEW_PARTIAL_BATCH_PASS checked=3 passed=3 failed=0
- QA cursor: 98
- Last action: ran_playback_path_recovery_once, held_materialized_qa_due_playback_path_recovery, ran_go_live_readiness_audit_once
- Last blocker: playback_path_recovery_not_pass

Safety:
- PAUSE_PUBLICATION remains active.
- No publication or broad catalogue expansion is performed by this runner.
- Materialized QA runs only in bounded batches and is stopped when launch health degrades or Plex sessions appear.
- Plex may be started/recovered, but running Plex is not killed unless a future explicit restart policy is added.
