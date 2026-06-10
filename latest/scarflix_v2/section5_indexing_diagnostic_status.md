# Section 5 Indexing Diagnostic

- Updated UTC: 2026-06-10T22:16:54.500Z
- Status: `REVIEW_DIAGNOSTIC_COMPLETE`
- Incident: `INC-MQA-HYBRID-MOVIES-LIVE-TIMEOUT-20260610`
- Read-only: true
- PAUSE_PUBLICATION respected: true
- No new refresh, Plex API index query, publication, expansion, cleanup, deletion, source mutation, or path rewrite was performed.

## Key Finding

The prior `16/105` figure is not authoritative because the Section 5 verifier capped parsed Plex `Video` rows at 40 and the artifact hit exactly `video_count=40`.

## Evidence

- Path-scoped refresh HTTP: 200
- Full Section 5 refresh HTTP: 200
- webdav_map alignment: 105/105
- Affected strict matches from capped verifier: 16/105
- 8-path control from capped verifier: 1/8

## Recommendation

Run one read-only, uncapped Section 5 index snapshot job that records MediaContainer total size and all Part file hashes without refresh, cache clear, deletion, or publication. Then recompute strict matches against the 105 affected expected hashes.

Expansion remains blocked.