# Section 5 Uncapped Index Snapshot

- Updated UTC: 2026-06-10T22:49:22.581Z
- Status: `PASS_UNCAPPED_BASELINE_CAPTURED`
- Read-only: true
- PAUSE_PUBLICATION active: true
- Plex Section 5 reported total size: 231
- Parsed Section 5 Video rows: 231
- Pages read: 1
- Unique indexed ScarFLIX_part hashes: 181
- Expected affected hashes present: 87/105 (82.9%)
- Expected affected hashes missing: 18

## Conclusion

The previous 16/105 result was at least partly a measurement artifact. The uncapped snapshot found 87/105 expected affected hashes currently present in Plex Section 5.

## Next Safe Action

Use this true baseline to perform a smaller read-only passing-vs-missing forensic diff: compare Plex indexed paths, source folder depth, scanner title, and Plex scanner logs for representative present and missing hashes. Do not refresh or mutate yet.

## Present Samples

- `scarflix_part-c08b683f68e4e49e` Annabelle -> ScarFLIX Part C08b683f68e4e49e
- `scarflix_part-d8b22fb3f498688e` Annihilation -> ScarFLIX Part D8b22fb3f498688e
- `scarflix_part-2eaab8df357724dc` Armageddon -> ScarFLIX Part 2eaab8df357724dc
- `scarflix_part-6bc868616f378edf` The Ballerina -> ScarFLIX Part 6bc868616f378edf
- `scarflix_part-8aa2235ef7c1e0f6` Battleship -> ScarFLIX Part 8aa2235ef7c1e0f6
- `scarflix_part-bd37929b54c7c1bf` Crank -> ScarFLIX Part Bd37929b54c7c1bf
- `scarflix_part-8312e4b6385fd16c` Creed -> ScarFLIX Part 8312e4b6385fd16c
- `scarflix_part-b9dbad7c5a4378f1` Dances with Wolves -> Dances with Wolves

## Missing Samples

- `scarflix_part-81107989d2e30cfb` Anna
- `scarflix_part-7c4868fe7b1db021` Dawn of the Dead
- `scarflix_part-db3f532fdd48fe57` Dolittle
- `scarflix_part-d00eaa269e0555aa` Donnie Darko
- `scarflix_part-942255f029875306` Gremlins
- `scarflix_part-0d465a7414c7c73a` Legends of the Fall
- `scarflix_part-bf8b8fcb4150df6b` Man in the Mirror: The Michael Jackson Story
- `scarflix_part-b73c939b16cf8b54` Night at the Museum

No refresh, cache clear, publication, expansion, cleanup, deletion, source mutation, or path rewrite was performed.