# Section 5 Uncapped Index Snapshot

- Updated UTC: 2026-06-11T15:09:24.163Z
- Status: `PASS_UNCAPPED_BASELINE_CAPTURED`
- Read-only: true
- PAUSE_PUBLICATION active: true
- Plex Section 5 reported total size: 204
- Parsed Section 5 Video rows: 204
- Pages read: 1
- Unique indexed ScarFLIX_part hashes: 191
- Expected affected hashes present: 95/105 (90.5%)
- Expected affected hashes missing: 10

## Conclusion

The previous 16/105 result was at least partly a measurement artifact. The uncapped snapshot found 95/105 expected affected hashes currently present in Plex Section 5.

## Next Safe Action

Use this true baseline to perform a smaller read-only passing-vs-missing forensic diff: compare Plex indexed paths, source folder depth, scanner title, and Plex scanner logs for representative present and missing hashes. Do not refresh or mutate yet.

## Present Samples

- `scarflix_part-81107989d2e30cfb` Anna -> Anna
- `scarflix_part-c08b683f68e4e49e` Annabelle -> Annabelle
- `scarflix_part-d8b22fb3f498688e` Annihilation -> Annihilation
- `scarflix_part-2eaab8df357724dc` Armageddon -> Armageddon
- `scarflix_part-6bc868616f378edf` The Ballerina -> ScarFLIX Part 6bc868616f378edf
- `scarflix_part-8aa2235ef7c1e0f6` Battleship -> ScarFLIX Part 8aa2235ef7c1e0f6
- `scarflix_part-bd37929b54c7c1bf` Crank -> ScarFLIX Part Bd37929b54c7c1bf
- `scarflix_part-8312e4b6385fd16c` Creed -> ScarFLIX Part 8312e4b6385fd16c

## Missing Samples

- `scarflix_part-700e6d7fdb8236a0` Friday
- `scarflix_part-3150adb80410deb7` The Curse of La Llorona
- `scarflix_part-d99a060ace386b52` The Devil's Advocate
- `scarflix_part-761f0288a98ecf2c` The Equalizer 2
- `scarflix_part-b9efe1904b5d339b` The Human Centipede III (Final Sequence)
- `scarflix_part-78ebe23593166235` The Jungle Book
- `scarflix_part-a0692a530078eae1` The Mitchells vs. the Machines
- `scarflix_part-94fc82206168aa0b` Witch!

No refresh, cache clear, publication, expansion, cleanup, deletion, source mutation, or path rewrite was performed.