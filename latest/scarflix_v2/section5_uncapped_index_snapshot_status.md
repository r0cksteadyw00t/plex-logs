# Section 5 Uncapped Index Snapshot

- Updated UTC: 2026-06-11T00:57:36.821Z
- Status: `PASS_UNCAPPED_BASELINE_CAPTURED`
- Read-only: true
- PAUSE_PUBLICATION active: true
- Plex Section 5 reported total size: 152
- Parsed Section 5 Video rows: 152
- Pages read: 1
- Unique indexed ScarFLIX_part hashes: 146
- Expected affected hashes present: 74/105 (70.5%)
- Expected affected hashes missing: 31

## Conclusion

The previous 16/105 result was at least partly a measurement artifact. The uncapped snapshot found 74/105 expected affected hashes currently present in Plex Section 5.

## Next Safe Action

Use this true baseline to perform a smaller read-only passing-vs-missing forensic diff: compare Plex indexed paths, source folder depth, scanner title, and Plex scanner logs for representative present and missing hashes. Do not refresh or mutate yet.

## Present Samples

- `scarflix_part-d8b22fb3f498688e` Annihilation -> ScarFLIX Part D8b22fb3f498688e
- `scarflix_part-2eaab8df357724dc` Armageddon -> ScarFLIX Part 2eaab8df357724dc
- `scarflix_part-8aa2235ef7c1e0f6` Battleship -> ScarFLIX Part 8aa2235ef7c1e0f6
- `scarflix_part-bd37929b54c7c1bf` Crank -> ScarFLIX Part Bd37929b54c7c1bf
- `scarflix_part-8312e4b6385fd16c` Creed -> ScarFLIX Part 8312e4b6385fd16c
- `scarflix_part-b9dbad7c5a4378f1` Dances with Wolves -> ScarFLIX Part B9dbad7c5a4378f1
- `scarflix_part-8ce42f7e275d1e85` Daredevil -> ScarFLIX Part 8ce42f7e275d1e85
- `scarflix_part-7c4868fe7b1db021` Dawn of the Dead -> ScarFLIX Part 7c4868fe7b1db021

## Missing Samples

- `scarflix_part-81107989d2e30cfb` Anna
- `scarflix_part-c08b683f68e4e49e` Annabelle
- `scarflix_part-6bc868616f378edf` The Ballerina
- `scarflix_part-d04bde274e598c57` Despicable Me 3
- `scarflix_part-d1ce9c47a23732b3` Fargo
- `scarflix_part-c017966a31451921` Final Destination 5
- `scarflix_part-61f18dcc8c34f579` Fracture
- `scarflix_part-700e6d7fdb8236a0` Friday

No refresh, cache clear, publication, expansion, cleanup, deletion, source mutation, or path rewrite was performed.