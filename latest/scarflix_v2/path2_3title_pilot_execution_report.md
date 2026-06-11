# Path 2 3-Title Additive Pilot Execution Report

**Updated UTC:** 2026-06-11T03:12:07.771Z
**Status:** `PASS_3TITLE_ADDITIVE_PILOT_COMPLETE_NO_REGRESSION`

## Summary

The prepared 3-title additive pilot completed using `Path2PilotMigrationRunner` with the service-context-safe verification model. No rollback was required. PAUSE_PUBLICATION remained active and no publication, expansion, cleanup, deletion, or source mutation occurred.

## Pilot Titles

| Title | Hash | Alias rows | Legacy rows | Plex present | WebDAV verification |
|---|---|---:|---:|---|---|
| Annabelle (2014) | `scarflix_part-c08b683f68e4e49e` | 1 | 1 | PASS | PASS HTTP 200 in 1791ms |
| Armageddon (1998) | `scarflix_part-2eaab8df357724dc` | 1 | 1 | PASS | PASS HTTP 200 in 1296ms |
| Battleship (2012) | `scarflix_part-8aa2235ef7c1e0f6` | 1 | 1 | PASS | PASS HTTP 200 in 1199ms |

## Baseline / Regression Check

- Pre-pilot baseline: `87/105` visible
- Post-pilot baseline: `88/105` visible, `17` missing (`83.8%`)
- Lost pre-pilot visible hashes: `0`
- Lost non-pilot visible hashes: `0`
- Newly visible hashes: `1` (`scarflix_part-3150adb80410deb7`)

## Runner Verification

- Runner status: `PASS_PROTECTED_ADDITIVE_PILOT_COMPLETE`
- Preflight count: `3`
- Verification count: `3`
- Rollback performed: `false`
- Rollback source: `D:\PlexTools\Backups\path2_pilot_2026-06-11T030859315Z\webdav_map.json.bak`

## Assessment

The 3-title additive pilot preserved pilot and non-pilot visibility and passed runner plus independent bounded WebDAV retry verification.

## Recommendation

Safe to consider a larger bounded pilot next, but not full visible-set migration yet. Suggested next step: 10-title additive pilot after one more fresh baseline and Sentinel PASS/LOW or REVIEW/MEDIUM.