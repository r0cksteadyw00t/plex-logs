# FORENSIC HANDOFF FOR GROK

**Trigger Reason:**  
Phase 5 controlled preparation: read-only Materialized QA failure triage completed under Orchestrator ownership. No cleanup, publication, expansion, source movement, or inline validation was executed.

**Current State Summary:**  
- Phase 4 direct Orchestrator-to-Grok reporting: complete and operational.
- Grok model-call credential: `GROK_API_KEY.txt` only.
- Grok management key: `GROK_MANAGEMENT_KEY.txt` remains credential-awareness/account-management metadata only; not attempted for model calls.
- Orchestrator service: `JasonOS_Prime_Orchestrator`, running.
- Recent Orchestrator health: `/healthz` HTTP `200`, status `PASS`.
- Read-only triage job: `triage_materialized_qa_failures`, status `PASS_READ_ONLY`.
- Triage output:
  - `D:\PlexTools\public\latest\scarflix_v2\materialized_qa_failure_triage.json`
  - `D:\PlexTools\public\latest\scarflix_v2\materialized_qa_failure_triage.md`
- Plan-only recovery output:
  - `D:\PlexTools\public\latest\scarflix_v2\materialized_qa_recovery_plan.json`
  - `D:\PlexTools\public\latest\scarflix_v2\materialized_qa_recovery_plan.md`
- Materialized QA: `REVIEW`, checked `229`, passed `119`, failed `110`.
- Failure reasons: timeout `106`, HTTP `400` `3`, socket hang-up `1`.
- Failed sections: movies section `5` failed `106`, TV section `6` failed `4`.
- Failed path categories: `hybrid_movies_live` `105`, `hybrid_shows` `4`, `hybrid_movies_root_seed` `1`.
- `PAUSE_PUBLICATION`: active.
- ScarFLIX expansion: not started.
- Cleanup/source changes: not started.
- Legacy/direct resolver expansion: forbidden.

**What I have already tried:**  
- Added a read-only Orchestrator job type `triage_materialized_qa_failures`.
- The job reads only the existing `materialized_canary_decision_qa_status.json`.
- The job groups failed rows by reason, HTTP status, Plex section, path category, and repeated target hash.
- The job writes triage JSON/MD plus a plan-only recovery document.
- Updated `ORCHESTRATOR_GROK_CYCLE_REPORT.json/.md` generation so the next autonomous Grok report includes the triage summary.
- Updated `PROJECT_PLAN.md` with Phase 5 prep findings.

**My hypothesis on root cause:**  
The current Materialized QA regression is timeout-dominant. `106/110` failures are timeouts, concentrated in movie section `5` and live materialized movie paths. This looks more like timing/load/indexing sensitivity or a batch-scale Plex decision bottleneck than 110 independently bad titles. The small HTTP `400` subset is a stronger source/row-specific cleanup candidate.

**Proposed next steps:**  
1. Keep `PAUSE_PUBLICATION` active and keep all expansion held.
2. Generate a dry-run cleanup candidate list from the existing failed rows; do not move/hide/quarantine anything yet.
3. Split candidates into timeout-dominant rows vs HTTP `400`/socket rows. Treat HTTP `400` rows as the lowest-risk cleanup review set.
4. Preserve title retryability for every candidate.
5. After any approved source-only cleanup, rerun targeted materialized QA via detached/local automation, not inline.
6. Resume controlled materialized/WebDAV batches only after targeted QA returns PASS and concurrent QA remains representative/pass.

**Data/files to review:**  
- `D:\PlexTools\public\latest\scarflix_v2\materialized_qa_failure_triage.json`
- `D:\PlexTools\public\latest\scarflix_v2\materialized_qa_failure_triage.md`
- `D:\PlexTools\public\latest\scarflix_v2\materialized_qa_recovery_plan.json`
- `D:\PlexTools\public\latest\scarflix_v2\materialized_qa_recovery_plan.md`
- `D:\PlexTools\public\latest\scarflix_v2\materialized_canary_decision_qa_status.json`
- `D:\PlexTools\public\latest\scarflix_v2\ORCHESTRATOR_GROK_CYCLE_REPORT.json`
- `D:\PlexTools\public\latest\scarflix_v2\jasonos_prime_orchestrator_managed_jobs_status.json`
- `D:\PlexTools\Foundry\orchestrator\JasonOS_Prime_Orchestrator.js`
