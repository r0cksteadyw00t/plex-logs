# Section 5 Uncapped Index Snapshot

- Updated UTC: 2026-06-10T22:26:45.659Z
- Status: `REVIEW_PLEX_INDEX_QUERY_FAILED`
- Read-only: true
- PAUSE_PUBLICATION active: true
- Plex Section 5 reported total size: unknown
- Parsed Section 5 Video rows: 0
- Pages read: 1
- Unique indexed ScarFLIX_part hashes: 0
- Expected affected hashes present: 0/105 (0%)
- Expected affected hashes missing: 105

## Conclusion

The uncapped snapshot did not find more expected hashes than the capped verifier. The Section 5 visibility gap appears real for the missing 105 affected hashes.

## Next Safe Action

Use this true baseline to perform a smaller read-only passing-vs-missing forensic diff: compare Plex indexed paths, source folder depth, scanner title, and Plex scanner logs for representative present and missing hashes. Do not refresh or mutate yet.

## Present Samples


## Missing Samples

- `scarflix_part-81107989d2e30cfb` Anna
- `scarflix_part-c08b683f68e4e49e` Annabelle
- `scarflix_part-d8b22fb3f498688e` Annihilation
- `scarflix_part-2eaab8df357724dc` Armageddon
- `scarflix_part-6bc868616f378edf` The Ballerina
- `scarflix_part-8aa2235ef7c1e0f6` Battleship
- `scarflix_part-bd37929b54c7c1bf` Crank
- `scarflix_part-8312e4b6385fd16c` Creed

No refresh, cache clear, publication, expansion, cleanup, deletion, source mutation, or path rewrite was performed.