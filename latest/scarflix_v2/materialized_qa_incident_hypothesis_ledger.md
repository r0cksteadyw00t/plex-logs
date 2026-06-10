# Materialized QA Incident Hypothesis Ledger

- Updated UTC: 2026-06-10T22:55:22.489Z
- Current status: `PASS_FORENSIC_DIFF_COMPLETE`
- Current hypothesis: The remaining 18 missing rows are not explained by map alignment, path depth, `06 Discover Movies` placement, or `stream.mkv` naming. They appear to be per-folder Plex indexing/database misses within an otherwise working Section 5 path family.
- Recommendation: Do not proceed to broad expansion yet. The safest next action is a tiny read-only Plex metadata/database forensic check for 3 missing and 3 present hashes, plus Plex scanner log correlation if available. If Jason wants forward progress before closing the residual gap, controlled work should be limited to the 87 currently visible hashes with PAUSE_PUBLICATION still active and an explicit verification gate.

## Latest Section 5 Forensic Diff

- Missing hashes: 18
- Present sample hashes: 15
- Findings:
  - The trusted uncapped baseline remains 87/105 present and 18/105 missing.
  - Both missing and present rows are under the same `06 Discover Movies` folder.
  - Both groups use the same `stream.mkv` leaf filename pattern.
  - All missing rows still have webdav_map entries; the gap is not explained by missing map rows.
  - Service-context filesystem access cannot see the target hash folders for the missing rows.
  - Service-context filesystem access also cannot see sampled present hash folders, so service-context filesystem visibility does not distinguish missing from present.
  - The missing 18 do not show a unique path-depth, parent-folder, grandparent-folder, or stream filename pattern compared with sampled present hashes.
  - The most defensible current explanation is residual Plex scanner/index/database selection behavior for individual folders rather than webdav_map alignment or broad path-shape failure.

No refresh, cache clear, publication, expansion, cleanup, deletion, source mutation, or path rewrite was performed.