# Section 5 Uncapped Index Snapshot

- Updated UTC: 2026-06-10T22:29:20.937Z
- Status: `REVIEW_PLEX_INDEX_QUERY_FAILED`
- Read-only: true
- PAUSE_PUBLICATION active: true
- Plex Section 5 reported total size: unknown
- Parsed Section 5 Video rows: 0
- Pages read: 1
- Unique indexed ScarFLIX_part hashes: 0
- Expected affected hashes present: unknown/105 (unknown%)
- Expected affected hashes missing: unknown

## Conclusion

No trustworthy Section 5 visibility baseline was captured because the read-only Plex Section 5 index query failed before any rows were returned.

## Next Safe Action

Verify Plex Media Server is running and reachable from the Orchestrator context, then rerun this same read-only uncapped snapshot. Do not refresh, mutate, publish, or expand before a successful baseline is captured.

## Present Samples


## Missing Samples


No refresh, cache clear, publication, expansion, cleanup, deletion, source mutation, or path rewrite was performed.