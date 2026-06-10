# FORENSIC HANDOFF FOR GROK

**Trigger Reason:**  
Phase 5 diagnostic update: timeout-pattern analysis of the current Materialized QA regression completed. No cleanup, publication, expansion, source movement, or inline validation was executed.

**Current State Summary:**  
- Phase 4 direct Orchestrator-to-Grok reporting: complete and operational.
- Grok model-call credential: `GROK_API_KEY.txt` only.
- Orchestrator service: `JasonOS_Prime_Orchestrator`, running.
- Recent Orchestrator health: `/healthz` HTTP `200`, status `PASS`.
- Sentinel: `PASS`, alert level `LOW`, updated `2026-06-10T03:25:01Z`.
- Controlled materialized expansion hold: `ACTIVE`.
- Legacy/direct resolver expansion: forbidden.
- Materialized QA: `REVIEW`, checked `229`, passed `119`, failed `110`.
- Failure reasons from triage: timeout `106`, HTTP `400` `3`, socket hang-up `1`.
- Failed sections: movies section `5` failed `106`, TV section `6` failed `4`.
- Failed path categories: `hybrid_movies_live` `105`, `hybrid_shows` `4`, `hybrid_movies_root_seed` `1`.
- Timeout diagnostic outputs:
  - `D:\PlexTools\public\latest\scarflix_v2\materialized_qa_timeout_pattern_diagnostic.json`
  - `D:\PlexTools\public\latest\scarflix_v2\materialized_qa_timeout_pattern_diagnostic.md`

**What I have already tried:**  
- Ran read-only analysis only against existing status/log data.
- Read current materialized QA JSON, triage outputs, playback QA controller status, concurrent QA status, Sentinel status, publication hold status, and the materialized decision QA log.
- Did not run PlatformGate, VisibleCatalogQA, PlexDecisionQA, ConcurrentQA, AutoGate, publisher, or expansion.
- Did not move, hide, quarantine, edit, or publish any ScarFLIX source/content rows.
- Wrote a diagnostic JSON/MD artifact for Grok/public review.
- Updated `PROJECT_PLAN.md` with the current REVIEW state and recommended next safe action.

**My hypothesis on root cause:**  
The `hybrid_movies_live` timeout concentration is most likely systemic transient/orchestration/Plex decision pressure, not 110 independently bad titles.

Evidence:

- The QA log has two materialized decision QA start lines inside the same run window: `2026-06-09T11:55:04Z` and `2026-06-09T11:55:05Z`.
- The log has `458` result lines for `229` unique `ScarFLIX_part-*` hashes; every part appeared twice.
- `55` parts had mixed PASS/FAIL outcomes. Examples include rows that passed Plex decision once and then timed out minutes later, or timed out first and passed later.
- Timeout failures increased during the middle/later ordered portion of the run: Q1 fail rate `0.322`, Q2 `0.400`, Q3 `0.643`, Q4 `0.549`.
- Later concurrent QA showed range/WebDAV reads mostly working (`4/5`) while Plex decision checks timed out (`0/5`) at about 90 seconds, pointing at Plex decision/indexing pressure rather than broad media-path failure.
- Playback QA controller triggered Plex scans for sections `5` and `6`, so indexing lag remains plausible.

**Proposed next steps:**  
1. Keep `PAUSE_PUBLICATION` active and keep all expansion held.
2. Do not quarantine the 110 timeout rows yet.
3. Patch/configure Materialized Plex Decision QA orchestration so only one owner can run per target set.
4. Add deterministic same-hash de-duplication: mixed PASS/FAIL outcomes should be treated as unstable/retest-needed, not immediate source quarantine.
5. Replace one large 229-row retest with a detached small retest of 12-20 rows after a quiet Plex scan window.
6. Include rows from mixed PASS/FAIL timeouts, HTTP `400` rows, late-run timeout rows, and 1-2 TV rows.
7. Resume controlled materialized/WebDAV batches only after the small retest clears the timeout pattern and representative concurrent QA is healthy.

**Data/files to review:**  
- `D:\PlexTools\public\latest\scarflix_v2\materialized_qa_timeout_pattern_diagnostic.json`
- `D:\PlexTools\public\latest\scarflix_v2\materialized_qa_timeout_pattern_diagnostic.md`
- `D:\PlexTools\public\latest\scarflix_v2\materialized_qa_failure_triage.json`
- `D:\PlexTools\public\latest\scarflix_v2\materialized_qa_failure_triage.md`
- `D:\PlexTools\public\latest\scarflix_v2\materialized_canary_decision_qa_status.json`
- `D:\PlexTools\Logs\scarflix_v2_materialized_plex_decision_qa_node_20260609.log`
- `D:\PlexTools\public\latest\scarflix_v2\concurrent_stream_qa_status.json`
- `D:\PlexTools\public\latest\scarflix_v2\jasonos_prime_playback_qa_controller_status.json`
- `D:\PlexTools\public\latest\scarflix_v2\CONTROLLED_MATERIALIZED_EXPANSION_HOLD.json`
