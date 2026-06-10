# Section 5 Uncapped Index Snapshot

- Updated UTC: 2026-06-10T23:09:27.980Z
- Status: `PASS_UNCAPPED_BASELINE_CAPTURED`
- Read-only: true
- PAUSE_PUBLICATION active: true
- Plex Section 5 reported total size: 257
- Parsed Section 5 Video rows: 257
- Pages read: 1
- Unique indexed ScarFLIX_part hashes: 207
- Expected affected hashes present: 95/105 (90.5%)
- Expected affected hashes missing: 10

## Conclusion

The previous 16/105 result was at least partly a measurement artifact. The uncapped snapshot found 95/105 expected affected hashes currently present in Plex Section 5.

## Next Safe Action

Use this true baseline to perform a smaller read-only passing-vs-missing forensic diff: compare Plex indexed paths, source folder depth, scanner title, and Plex scanner logs for representative present and missing hashes. Do not refresh or mutate yet.

## Present Samples

- `scarflix_part-81107989d2e30cfb` Anna -> ScarFLIX Part 81107989d2e30cfb
- `scarflix_part-c08b683f68e4e49e` Annabelle -> ScarFLIX Part C08b683f68e4e49e
- `scarflix_part-d8b22fb3f498688e` Annihilation -> ScarFLIX Part D8b22fb3f498688e
- `scarflix_part-2eaab8df357724dc` Armageddon -> ScarFLIX Part 2eaab8df357724dc
- `scarflix_part-6bc868616f378edf` The Ballerina -> ScarFLIX Part 6bc868616f378edf
- `scarflix_part-8aa2235ef7c1e0f6` Battleship -> ScarFLIX Part 8aa2235ef7c1e0f6
- `scarflix_part-bd37929b54c7c1bf` Crank -> ScarFLIX Part Bd37929b54c7c1bf
- `scarflix_part-8312e4b6385fd16c` Creed -> ScarFLIX Part 8312e4b6385fd16c

## Missing Samples

- `scarflix_part-7c4868fe7b1db021` Dawn of the Dead
- `scarflix_part-db3f532fdd48fe57` Dolittle
- `scarflix_part-942255f029875306` Gremlins
- `scarflix_part-bf8b8fcb4150df6b` Man in the Mirror: The Michael Jackson Story
- `scarflix_part-2248c141861c0a2c` 9½ Weeks
- `scarflix_part-ea2489ddc0285b99` Reservoir Dogs
- `scarflix_part-3ac0e5bd2415a5fc` Silent Hill
- `scarflix_part-d708c8b30a147319` Stand by Me

No refresh, cache clear, publication, expansion, cleanup, deletion, source mutation, or path rewrite was performed.