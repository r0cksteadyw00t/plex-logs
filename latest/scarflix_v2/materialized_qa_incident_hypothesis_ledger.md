# Materialized QA Incident Hypothesis Ledger

- Incident: `INC-MQA-HYBRID-MOVIES-LIVE-TIMEOUT-20260610`
- Updated UTC: 2026-06-11T17:09:35.600Z
- Current status: `PASS_UNCAPPED_BASELINE_CAPTURED`
- Current hypothesis: The previous 16/105 result was at least partly a measurement artifact. The uncapped snapshot found 98/105 expected affected hashes currently present in Plex Section 5.
- Next safe action: Use this true baseline to perform a smaller read-only passing-vs-missing forensic diff: compare Plex indexed paths, source folder depth, scanner title, and Plex scanner logs for representative present and missing hashes. Do not refresh or mutate yet.

## Latest Uncapped Section 5 Snapshot

- Plex reported Section 5 total size: 211
- Parsed Section 5 Video rows: 211
- Unique indexed ScarFLIX_part hashes: 208
- Expected affected hashes present: 98/105
- Expected affected hashes missing: 7

No publication, expansion, cleanup, deletion, source mutation, path rewrite, refresh, or cache clear was performed.