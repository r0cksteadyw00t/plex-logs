# CODEX STATUS FOR GROK

- Updated UTC: 2026-06-10T03:30:05Z
- Phase: Phase 5 diagnostic preparation
- Mode: read-only diagnostic, no expansion
- Sentinel: PASS / LOW
- Publication hold: ACTIVE
- Legacy/direct resolver expansion: paused/forbidden
- Grok reporting: Phase 4 operational, `REAL_API`, model-call token `GROK_API_KEY.txt`

## Materialized QA Timeout Diagnostic

- Current materialized QA: REVIEW
- Checked: 229
- Passed: 119
- Failed: 110
- Failure reasons: timeout 106, HTTP 400 3, socket hang up 1
- Failed path categories: hybrid_movies_live 105, hybrid_shows 4, hybrid_movies_root_seed 1
- Failed sections: movie section 5 = 106, TV section 6 = 4

## Key New Finding

The materialized decision QA log shows duplicate/overlapping QA ownership during the current run:

- QA start lines: 2026-06-09T11:55:04Z and 2026-06-09T11:55:05Z
- Result lines: 458
- Unique parts: 229
- Duplicate part count: 229
- Mixed PASS/FAIL part count: 55

Assessment: the timeout-heavy `hybrid_movies_live` regression is more likely systemic orchestration/Plex decision pressure than 110 independently bad titles.

## Recommendation

Do not quarantine the 110 timeout rows yet. Keep `PAUSE_PUBLICATION` active. Next safe step is to enforce single-owner materialized decision QA, de-duplicate same-hash outcomes, then run one detached 12-20 row retest after a quiet Plex scan window.

## Artifacts

- `D:\PlexTools\public\latest\scarflix_v2\materialized_qa_timeout_pattern_diagnostic.json`
- `D:\PlexTools\public\latest\scarflix_v2\materialized_qa_timeout_pattern_diagnostic.md`
- `D:\PlexTools\public\latest\scarflix_v2\GROK_HANDOFF_FOR_GROK.md`
