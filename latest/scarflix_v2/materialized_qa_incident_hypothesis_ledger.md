# Materialized QA Incident Hypothesis Ledger

- Incident: `INC-MQA-HYBRID-MOVIES-LIVE-TIMEOUT-20260610`
- Updated UTC: 2026-06-13T03:13:06.467Z
- Current status: `PASS_UNCAPPED_BASELINE_CAPTURED`
- Current hypothesis: The previous 16/105 result was at least partly a measurement artifact. The uncapped snapshot found 105/105 expected affected hashes currently present in Plex Section 5.
- Next safe action: Rerun the focused Section 5 verification gate with the corrected uncapped verifier logic before considering any controlled expansion.

## Latest Uncapped Section 5 Snapshot

- Plex reported Section 5 total size: 227
- Parsed Section 5 Video rows: 227
- Unique indexed ScarFLIX_part hashes: 224
- Expected affected hashes present: 105/105
- Expected affected hashes missing: 0

No publication, expansion, cleanup, deletion, source mutation, path rewrite, refresh, or cache clear was performed.