# Materialized QA Incident Hypothesis Ledger

- Incident: `INC-MQA-HYBRID-MOVIES-LIVE-TIMEOUT-20260610`
- Updated UTC: 2026-06-10T22:29:20.937Z
- Current status: `REVIEW_PLEX_INDEX_QUERY_FAILED`
- Current hypothesis: No trustworthy Section 5 visibility baseline was captured because the read-only Plex Section 5 index query failed before any rows were returned.
- Next safe action: Verify Plex Media Server is running and reachable from the Orchestrator context, then rerun this same read-only uncapped snapshot. Do not refresh, mutate, publish, or expand before a successful baseline is captured.

## Latest Uncapped Section 5 Snapshot

- Plex reported Section 5 total size: unknown
- Parsed Section 5 Video rows: 0
- Unique indexed ScarFLIX_part hashes: 0
- Expected affected hashes present: unknown/105
- Expected affected hashes missing: unknown

No publication, expansion, cleanup, deletion, source mutation, path rewrite, refresh, or cache clear was performed.