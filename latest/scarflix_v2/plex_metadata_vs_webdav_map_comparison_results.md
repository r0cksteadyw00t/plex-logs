# Plex Metadata vs WebDAV Map Comparison

- Updated UTC: 2026-06-10T08:47:09.222Z
- Status: `PASS_SAME_SAMPLE_METADATA_COMPARISON_COMPLETE`
- Incident: `INC-MQA-HYBRID-MOVIES-LIVE-TIMEOUT-20260610`
- Paths probed: 8
- Expected ScarFLIX_part matches in Plex metadata: 0
- Same-section path mismatches: 0
- Same-section rows without part files: 0
- Titles found in other sections: 0
- Titles not found/not indexed: 8
- Rows with Plex part files: 0

## Classification Counts

- `plex_title_not_found_or_not_indexed`: 8

## Assessment

- Plex metadata/search did not expose any matching ScarFLIX_part-* path for the confirmed 8-path sample.
- At least one sample title was not found by same-section title lookup or global hub search, supporting a Plex indexing/cache gap.

## Sample Results

| Title | Expected Part | Classification | Plex Rows | Same Section | Other Section | Part Rows |
|---|---:|---|---:|---:|---:|---:|
| 9½ Weeks | `ScarFLIX_part-2248c141861c0a2c` | `plex_title_not_found_or_not_indexed` | 0 | 0 | 0 | 0 |
| Annabelle | `ScarFLIX_part-c08b683f68e4e49e` | `plex_title_not_found_or_not_indexed` | 0 | 0 | 0 | 0 |
| Anna | `ScarFLIX_part-81107989d2e30cfb` | `plex_title_not_found_or_not_indexed` | 0 | 0 | 0 | 0 |
| Annihilation | `ScarFLIX_part-d8b22fb3f498688e` | `plex_title_not_found_or_not_indexed` | 0 | 0 | 0 | 0 |
| Armageddon | `ScarFLIX_part-2eaab8df357724dc` | `plex_title_not_found_or_not_indexed` | 0 | 0 | 0 | 0 |
| Battleship | `ScarFLIX_part-8aa2235ef7c1e0f6` | `plex_title_not_found_or_not_indexed` | 0 | 0 | 0 | 0 |
| Crank | `ScarFLIX_part-bd37929b54c7c1bf` | `plex_title_not_found_or_not_indexed` | 0 | 0 | 0 | 0 |
| Creed | `ScarFLIX_part-8312e4b6385fd16c` | `plex_title_not_found_or_not_indexed` | 0 | 0 | 0 | 0 |

## Hypothesis Update

- `H1_SERVICE_CONTEXT_PATH_VISIBILITY`: HIGH_RECONFIRMED
- `H2_RESOLVER_INDEXING_TIMING_LOAD`: MEDIUM_HIGH
- `H3_WEBDAV_RCLONE_LATENCY_UNDER_LOAD`: LOW_MEDIUM
- `H4_QA_HARNESS_TIMEOUT_THRESHOLD_MISMATCH`: LOW_MEDIUM
- `H5_PLEX_SECTION_CACHE_OR_METADATA_BEHAVIOR`: HIGH

No publication, expansion, cleanup, deletion, source mutation, path rewrite, broad QA retry, PlatformGate, PlexDecisionQA, ConcurrentQA, or publisher job was run.