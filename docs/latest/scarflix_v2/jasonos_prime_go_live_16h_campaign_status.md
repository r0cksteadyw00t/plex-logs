# JasonOS Prime Go-Live 16h Campaign Status

- Status: HELD_ACTIVE_PLAYBACK
- Updated UTC: 2026-06-14T21:39:19Z
- Started UTC: 2026-06-13T13:22:00Z
- Ends UTC: 2026-06-15T00:36:58Z
- Cycle: 294
- Launch health: 23 ms
- Sentinel: PASS / LOW
- Active Plex sessions: 1
- Materialized QA: REVIEW_PARTIAL_BATCH_PASS checked=4 passed=4 failed=0
- QA cursor: 46
- Last action: stopped_materialized_qa_due_active_playback
- Last blocker: active_plex_playback_detected

Safety:
- PAUSE_PUBLICATION remains active.
- No publication or broad catalogue expansion is performed by this runner.
- Materialized QA runs only in bounded batches and is stopped when launch health degrades or Plex sessions appear.
- Plex may be started/recovered, but running Plex is not killed unless a future explicit restart policy is added.
