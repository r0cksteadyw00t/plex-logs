# Path 2 Pilot Migration Verification Report

**Updated:** 2026-06-11T01:05:16.095Z
**Status:** ROLLED_BACK_PILOT_VERIFICATION_FAILED

## Baseline Gate

- Expected affected hashes: 105
- Visible at gate: 74
- Missing at gate: 31
- Minimum required visible count: 74
- Gate result: PASS

## Pilot Targets

- scarflix_part-d8b22fb3f498688e: D:\StremioCatalog\_Hybrid\Movies\_ScarFLIXLive\06 Discover Movies\Annihilation (2018)\Annihilation (2018).mkv
- scarflix_part-2eaab8df357724dc: D:\StremioCatalog\_Hybrid\Movies\_ScarFLIXLive\06 Discover Movies\Armageddon (1998)\Armageddon (1998).mkv
- scarflix_part-8aa2235ef7c1e0f6: D:\StremioCatalog\_Hybrid\Movies\_ScarFLIXLive\06 Discover Movies\Battleship (2012)\Battleship (2012).mkv

## Verification Result

Status: ROLLED_BACK_PILOT_VERIFICATION_FAILED

Rollback reasons:

- WebDAV HEAD failed for scarflix_part-d8b22fb3f498688e
- WebDAV HEAD failed for scarflix_part-2eaab8df357724dc
- WebDAV HEAD failed for scarflix_part-8aa2235ef7c1e0f6

Rollback actions:

- removed_alias_symlink: D:\StremioCatalog\_Hybrid\Movies\_ScarFLIXLive\06 Discover Movies\Battleship (2012)\Battleship (2012).mkv
- removed_alias_symlink: D:\StremioCatalog\_Hybrid\Movies\_ScarFLIXLive\06 Discover Movies\Armageddon (1998)\Armageddon (1998).mkv
- removed_alias_symlink: D:\StremioCatalog\_Hybrid\Movies\_ScarFLIXLive\06 Discover Movies\Annihilation (2018)\Annihilation (2018).mkv
- restored_webdav_map_backup: D:\PlexTools\state\scarflix_v2\webdav_map.json

## Safety Result

- PAUSE_PUBLICATION respected: yes
- Publication started: no
- Expansion started: no
- Cleanup performed: no
- Deletion performed: no

## Recommendation

Do not proceed to larger pilot or visible-set migration. Diagnose service-context verification and WebDAV HEAD failures first.
