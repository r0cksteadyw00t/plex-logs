# Section 5 Uncapped Index Snapshot

- Updated UTC: 2026-06-12T00:15:41.875Z
- Status: `PASS_UNCAPPED_BASELINE_CAPTURED`
- Read-only: true
- PAUSE_PUBLICATION active: true
- Plex Section 5 reported total size: 186
- Parsed Section 5 Video rows: 186
- Pages read: 1
- Unique indexed ScarFLIX_part hashes: 183
- Expected affected hashes present: 87/105 (82.9%)
- Expected affected hashes missing: 18

## Conclusion

The previous 16/105 result was at least partly a measurement artifact. The uncapped snapshot found 87/105 expected affected hashes currently present in Plex Section 5.

## Next Safe Action

Use this true baseline to perform a smaller read-only passing-vs-missing forensic diff: compare Plex indexed paths, source folder depth, scanner title, and Plex scanner logs for representative present and missing hashes. Do not refresh or mutate yet.

## Present Samples

- `scarflix_part-6bc868616f378edf` The Ballerina -> The Ballerina
- `scarflix_part-d1ce9c47a23732b3` Fargo -> Fargo
- `scarflix_part-f96ecae0bf043548` Final Destination -> Final Destination
- `scarflix_part-c017966a31451921` Final Destination 5 -> Final Destination 5
- `scarflix_part-61f18dcc8c34f579` Fracture -> Fracture
- `scarflix_part-700e6d7fdb8236a0` Friday -> ScarFLIX Part 700e6d7fdb8236a0
- `scarflix_part-942255f029875306` Gremlins -> Gremlins
- `scarflix_part-e9c1718338c9d187` Hachi: A Dog's Tale -> Hachi: A Dog&#39;s Tale

## Missing Samples

- `scarflix_part-81107989d2e30cfb` Anna
- `scarflix_part-c08b683f68e4e49e` Annabelle
- `scarflix_part-d8b22fb3f498688e` Annihilation
- `scarflix_part-2eaab8df357724dc` Armageddon
- `scarflix_part-8aa2235ef7c1e0f6` Battleship
- `scarflix_part-bd37929b54c7c1bf` Crank
- `scarflix_part-8312e4b6385fd16c` Creed
- `scarflix_part-b9dbad7c5a4378f1` Dances with Wolves

No refresh, cache clear, publication, expansion, cleanup, deletion, source mutation, or path rewrite was performed.