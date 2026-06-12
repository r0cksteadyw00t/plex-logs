# Section 5 Uncapped Index Snapshot

- Updated UTC: 2026-06-12T01:23:13.357Z
- Status: `PASS_UNCAPPED_BASELINE_CAPTURED`
- Read-only: true
- PAUSE_PUBLICATION active: true
- Plex Section 5 reported total size: 214
- Parsed Section 5 Video rows: 214
- Pages read: 1
- Unique indexed ScarFLIX_part hashes: 199
- Expected affected hashes present: 103/105 (98.1%)
- Expected affected hashes missing: 2

## Conclusion

The previous 16/105 result was at least partly a measurement artifact. The uncapped snapshot found 103/105 expected affected hashes currently present in Plex Section 5.

## Next Safe Action

Use this true baseline to perform a smaller read-only passing-vs-missing forensic diff: compare Plex indexed paths, source folder depth, scanner title, and Plex scanner logs for representative present and missing hashes. Do not refresh or mutate yet.

## Present Samples

- `scarflix_part-81107989d2e30cfb` Anna -> Anna
- `scarflix_part-c08b683f68e4e49e` Annabelle -> ScarFLIX Part C08b683f68e4e49e
- `scarflix_part-2eaab8df357724dc` Armageddon -> ScarFLIX Part 2eaab8df357724dc
- `scarflix_part-6bc868616f378edf` The Ballerina -> The Ballerina
- `scarflix_part-8aa2235ef7c1e0f6` Battleship -> Battleship
- `scarflix_part-bd37929b54c7c1bf` Crank -> Crank
- `scarflix_part-8312e4b6385fd16c` Creed -> Creed
- `scarflix_part-b9dbad7c5a4378f1` Dances with Wolves -> ScarFLIX Part B9dbad7c5a4378f1

## Missing Samples

- `scarflix_part-d8b22fb3f498688e` Annihilation
- `scarflix_part-5f2b46ebc01460e6` My Hero Academia: You're Next

No refresh, cache clear, publication, expansion, cleanup, deletion, source mutation, or path rewrite was performed.