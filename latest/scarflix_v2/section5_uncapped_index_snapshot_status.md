# Section 5 Uncapped Index Snapshot

- Updated UTC: 2026-06-11T08:30:21.393Z
- Status: `PASS_UNCAPPED_BASELINE_CAPTURED`
- Read-only: true
- PAUSE_PUBLICATION active: true
- Plex Section 5 reported total size: 353
- Parsed Section 5 Video rows: 353
- Pages read: 1
- Unique indexed ScarFLIX_part hashes: 223
- Expected affected hashes present: 104/105 (99%)
- Expected affected hashes missing: 1

## Conclusion

The previous 16/105 result was at least partly a measurement artifact. The uncapped snapshot found 104/105 expected affected hashes currently present in Plex Section 5.

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

- `scarflix_part-ba7d61952f40f7bc` The Transporter

No refresh, cache clear, publication, expansion, cleanup, deletion, source mutation, or path rewrite was performed.