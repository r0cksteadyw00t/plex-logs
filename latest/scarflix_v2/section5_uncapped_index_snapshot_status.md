# Section 5 Uncapped Index Snapshot

- Updated UTC: 2026-06-11T17:40:05.961Z
- Status: `PASS_UNCAPPED_BASELINE_CAPTURED`
- Read-only: true
- PAUSE_PUBLICATION active: true
- Plex Section 5 reported total size: 217
- Parsed Section 5 Video rows: 217
- Pages read: 1
- Unique indexed ScarFLIX_part hashes: 216
- Expected affected hashes present: 99/105 (94.3%)
- Expected affected hashes missing: 6

## Conclusion

The previous 16/105 result was at least partly a measurement artifact. The uncapped snapshot found 99/105 expected affected hashes currently present in Plex Section 5.

## Next Safe Action

Use this true baseline to perform a smaller read-only passing-vs-missing forensic diff: compare Plex indexed paths, source folder depth, scanner title, and Plex scanner logs for representative present and missing hashes. Do not refresh or mutate yet.

## Present Samples

- `scarflix_part-81107989d2e30cfb` Anna -> Anna
- `scarflix_part-c08b683f68e4e49e` Annabelle -> Annabelle
- `scarflix_part-d8b22fb3f498688e` Annihilation -> Annihilation
- `scarflix_part-2eaab8df357724dc` Armageddon -> Armageddon
- `scarflix_part-6bc868616f378edf` The Ballerina -> The Ballerina
- `scarflix_part-8aa2235ef7c1e0f6` Battleship -> Battleship
- `scarflix_part-bd37929b54c7c1bf` Crank -> Crank
- `scarflix_part-8312e4b6385fd16c` Creed -> Creed

## Missing Samples

- `scarflix_part-700e6d7fdb8236a0` Friday
- `scarflix_part-2248c141861c0a2c` 9½ Weeks
- `scarflix_part-3150adb80410deb7` The Curse of La Llorona
- `scarflix_part-b9efe1904b5d339b` The Human Centipede III (Final Sequence)
- `scarflix_part-a0692a530078eae1` The Mitchells vs. the Machines
- `scarflix_part-bd7eda1ae6bf343a` Zombieland

No refresh, cache clear, publication, expansion, cleanup, deletion, source mutation, or path rewrite was performed.