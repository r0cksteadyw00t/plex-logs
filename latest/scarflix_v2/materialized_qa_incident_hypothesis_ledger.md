# Materialized QA Incident Hypothesis Ledger

- Updated UTC: 2026-06-10T22:16:54.500Z
- Latest event: `section5_indexing_diagnostic`
- Key finding: The previous Section 5 verification result is not a reliable proof that Plex only exposes 16/105 expected paths because the verifier's section index parser capped parsed Video rows at 40, and the artifact hit exactly video_count=40.
- Leading hypothesis: Current evidence supports a diagnostic measurement flaw plus possible Plex scanner/indexing behavior issue. The strongest immediate finding is that the 16/105 result is under-instrumented because the verifier capped parsed Section 5 rows at 40; the next step must establish true Section 5 index cardinality before deciding whether Plex is ignoring most ScarFLIX_part paths.
- Next safe action: Run one read-only, uncapped Section 5 index snapshot job that records MediaContainer total size and all Part file hashes without refresh, cache clear, deletion, or publication. Then recompute strict matches against the 105 affected expected hashes.
- Expansion remains blocked.