# Section 5 Forensic Diff

- Updated UTC: 2026-06-10T22:55:22.489Z
- Status: `PASS_FORENSIC_DIFF_COMPLETE`
- Missing hashes: 18
- Present sample hashes: 15

## Missing Hashes

- `scarflix_part-81107989d2e30cfb`
- `scarflix_part-7c4868fe7b1db021`
- `scarflix_part-db3f532fdd48fe57`
- `scarflix_part-d00eaa269e0555aa`
- `scarflix_part-942255f029875306`
- `scarflix_part-0d465a7414c7c73a`
- `scarflix_part-bf8b8fcb4150df6b`
- `scarflix_part-b73c939b16cf8b54`
- `scarflix_part-2248c141861c0a2c`
- `scarflix_part-ea2489ddc0285b99`
- `scarflix_part-17c22fece3c579f9`
- `scarflix_part-3ac0e5bd2415a5fc`
- `scarflix_part-d708c8b30a147319`
- `scarflix_part-89731919b552c615`
- `scarflix_part-491a4bfccb102f1e`
- `scarflix_part-cfe52e744ff27d3c`
- `scarflix_part-ea09f142010b00aa`
- `scarflix_part-c2fa5a32a4d5e81c`

## Findings

- The trusted uncapped baseline remains 87/105 present and 18/105 missing.
- Both missing and present rows are under the same `06 Discover Movies` folder.
- Both groups use the same `stream.mkv` leaf filename pattern.
- All missing rows still have webdav_map entries; the gap is not explained by missing map rows.
- Service-context filesystem access cannot see the target hash folders for the missing rows.
- Service-context filesystem access also cannot see sampled present hash folders, so service-context filesystem visibility does not distinguish missing from present.
- The missing 18 do not show a unique path-depth, parent-folder, grandparent-folder, or stream filename pattern compared with sampled present hashes.
- The most defensible current explanation is residual Plex scanner/index/database selection behavior for individual folders rather than webdav_map alignment or broad path-shape failure.

## Recommendation

Do not proceed to broad expansion yet. The safest next action is a tiny read-only Plex metadata/database forensic check for 3 missing and 3 present hashes, plus Plex scanner log correlation if available. If Jason wants forward progress before closing the residual gap, controlled work should be limited to the 87 currently visible hashes with PAUSE_PUBLICATION still active and an explicit verification gate.

No Plex query, refresh, cache clear, publication, expansion, cleanup, deletion, source mutation, or path rewrite was performed.