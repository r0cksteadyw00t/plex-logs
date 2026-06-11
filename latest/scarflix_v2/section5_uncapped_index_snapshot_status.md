# Section 5 Uncapped Index Snapshot

- Updated UTC: 2026-06-11T10:00:46.775Z
- Status: `PASS_UNCAPPED_BASELINE_CAPTURED`
- Read-only: true
- PAUSE_PUBLICATION active: true
- Plex Section 5 reported total size: 212
- Parsed Section 5 Video rows: 212
- Pages read: 1
- Unique indexed ScarFLIX_part hashes: 211
- Expected affected hashes present: 101/105 (96.2%)
- Expected affected hashes missing: 4

## Conclusion

The previous 16/105 result was at least partly a measurement artifact. The uncapped snapshot found 101/105 expected affected hashes currently present in Plex Section 5.

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

- `scarflix_part-d00eaa269e0555aa` Donnie Darko
- `scarflix_part-0d465a7414c7c73a` Legends of the Fall
- `scarflix_part-a7b67ffdd3c5808a` Life of Pi
- `scarflix_part-ea09f142010b00aa` The Magnificent Seven

No refresh, cache clear, publication, expansion, cleanup, deletion, source mutation, or path rewrite was performed.