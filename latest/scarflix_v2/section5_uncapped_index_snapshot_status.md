# Section 5 Uncapped Index Snapshot

- Updated UTC: 2026-06-11T12:48:28.409Z
- Status: `PASS_UNCAPPED_BASELINE_CAPTURED`
- Read-only: true
- PAUSE_PUBLICATION active: true
- Plex Section 5 reported total size: 176
- Parsed Section 5 Video rows: 176
- Pages read: 1
- Unique indexed ScarFLIX_part hashes: 171
- Expected affected hashes present: 89/105 (84.8%)
- Expected affected hashes missing: 16

## Conclusion

The previous 16/105 result was at least partly a measurement artifact. The uncapped snapshot found 89/105 expected affected hashes currently present in Plex Section 5.

## Next Safe Action

Use this true baseline to perform a smaller read-only passing-vs-missing forensic diff: compare Plex indexed paths, source folder depth, scanner title, and Plex scanner logs for representative present and missing hashes. Do not refresh or mutate yet.

## Present Samples

- `scarflix_part-81107989d2e30cfb` Anna -> Anna
- `scarflix_part-c08b683f68e4e49e` Annabelle -> ScarFLIX Part C08b683f68e4e49e
- `scarflix_part-d8b22fb3f498688e` Annihilation -> Annihilation
- `scarflix_part-2eaab8df357724dc` Armageddon -> Armageddon
- `scarflix_part-6bc868616f378edf` The Ballerina -> ScarFLIX Part 6bc868616f378edf
- `scarflix_part-8aa2235ef7c1e0f6` Battleship -> ScarFLIX Part 8aa2235ef7c1e0f6
- `scarflix_part-bd37929b54c7c1bf` Crank -> ScarFLIX Part Bd37929b54c7c1bf
- `scarflix_part-7c4868fe7b1db021` Dawn of the Dead -> Dawn of the Dead

## Missing Samples

- `scarflix_part-8312e4b6385fd16c` Creed
- `scarflix_part-b9dbad7c5a4378f1` Dances with Wolves
- `scarflix_part-8ce42f7e275d1e85` Daredevil
- `scarflix_part-d04bde274e598c57` Despicable Me 3
- `scarflix_part-00effd68c382bc07` Dr. No
- `scarflix_part-700e6d7fdb8236a0` Friday
- `scarflix_part-5f2b46ebc01460e6` My Hero Academia: You're Next
- `scarflix_part-3150adb80410deb7` The Curse of La Llorona

No refresh, cache clear, publication, expansion, cleanup, deletion, source mutation, or path rewrite was performed.