# Materialized QA Incident Hypothesis Ledger

- Incident: `INC-MQA-HYBRID-MOVIES-LIVE-TIMEOUT-20260610`
- Updated UTC: 2026-06-10T22:26:45.659Z
- Current status: `REVIEW_PLEX_INDEX_QUERY_FAILED`
- Current hypothesis: The uncapped snapshot did not find more expected hashes than the capped verifier. The Section 5 visibility gap appears real for the missing 105 affected hashes.
- Next safe action: Use this true baseline to perform a smaller read-only passing-vs-missing forensic diff: compare Plex indexed paths, source folder depth, scanner title, and Plex scanner logs for representative present and missing hashes. Do not refresh or mutate yet.

## Latest Uncapped Section 5 Snapshot

- Plex reported Section 5 total size: unknown
- Parsed Section 5 Video rows: 0
- Unique indexed ScarFLIX_part hashes: 0
- Expected affected hashes present: 0/105
- Expected affected hashes missing: 105

No publication, expansion, cleanup, deletion, source mutation, path rewrite, refresh, or cache clear was performed.