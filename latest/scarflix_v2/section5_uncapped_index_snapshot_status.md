# Section 5 Uncapped Index Snapshot

- Updated UTC: 2026-06-11T06:14:36.681Z
- Status: `PASS_UNCAPPED_BASELINE_CAPTURED`
- Read-only: true
- PAUSE_PUBLICATION active: true
- Plex Section 5 reported total size: 244
- Parsed Section 5 Video rows: 244
- Pages read: 1
- Unique indexed ScarFLIX_part hashes: 203
- Expected affected hashes present: 95/105 (90.5%)
- Expected affected hashes missing: 10

## Conclusion

The previous 16/105 result was at least partly a measurement artifact. The uncapped snapshot found 95/105 expected affected hashes currently present in Plex Section 5.

## Next Safe Action

Use this true baseline to perform a smaller read-only passing-vs-missing forensic diff: compare Plex indexed paths, source folder depth, scanner title, and Plex scanner logs for representative present and missing hashes. Do not refresh or mutate yet.

## Present Samples

- `scarflix_part-81107989d2e30cfb` Anna -> Anna
- `scarflix_part-c08b683f68e4e49e` Annabelle -> Annabelle
- `scarflix_part-d8b22fb3f498688e` Annihilation -> ScarFLIX Part D8b22fb3f498688e
- `scarflix_part-2eaab8df357724dc` Armageddon -> ScarFLIX Part 2eaab8df357724dc
- `scarflix_part-6bc868616f378edf` The Ballerina -> ScarFLIX Part 6bc868616f378edf
- `scarflix_part-8aa2235ef7c1e0f6` Battleship -> ScarFLIX Part 8aa2235ef7c1e0f6
- `scarflix_part-bd37929b54c7c1bf` Crank -> ScarFLIX Part Bd37929b54c7c1bf
- `scarflix_part-8312e4b6385fd16c` Creed -> ScarFLIX Part 8312e4b6385fd16c

## Missing Samples

- `scarflix_part-d1ce9c47a23732b3` Fargo
- `scarflix_part-31696108f69a37b9` Hulk
- `scarflix_part-fb19346714d96cd7` Speed
- `scarflix_part-0e360325f9b2603d` Teen Wolf: The Movie
- `scarflix_part-6a30d1aa558bac1f` Terminator: Dark Fate
- `scarflix_part-f5edc313355fa64c` The Empty Man
- `scarflix_part-ba7d61952f40f7bc` The Transporter
- `scarflix_part-5d08e120806b8ae9` The Whale

No refresh, cache clear, publication, expansion, cleanup, deletion, source mutation, or path rewrite was performed.