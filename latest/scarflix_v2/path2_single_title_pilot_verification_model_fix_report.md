# Path 2 Verification Model Fix + Single-Title Pilot Result

**Updated UTC:** 2026-06-11T02:34:53.678Z
**Status:** `PASS_SINGLE_TITLE_ADDITIVE_PILOT_COMPLETE__POST_RUN_SENTINEL_ALERT_HOLD`
**Raw Handoff URL:** https://raw.githubusercontent.com/r0cksteadyw00t/plex-logs/main/latest/scarflix_v2/GROK_HANDOFF_FOR_GROK.md

## Result

The corrected Path2PilotMigrationRunner completed the single-title additive pilot for **Annihilation (2018)** / `scarflix_part-d8b22fb3f498688e`.

- Runner status: `PASS_PROTECTED_ADDITIVE_PILOT_COMPLETE`
- Alias created: `D:\StremioCatalog\_Hybrid\Movies\_ScarFLIXLive\06 Discover Movies\Annihilation (2018)\Annihilation (2018).mkv`
- Alias symlink/readlink verification: PASS, readlink=`ScarFLIX_part-d8b22fb3f498688e\stream.mkv`
- Additive webdav_map rows: alias rows=1, legacy rows=1
- WebDAV HEAD on mapped target: PASS HTTP 200 in 1311ms
- Plex Section 5 baseline still sees pilot hash: PASS
- Rollback performed: false
- Rollback source retained: `D:\PlexTools\Backups\path2_pilot_2026-06-11T022547567Z\webdav_map.json.bak`

## Regression Check

A fresh read-only uncapped Section 5 snapshot after the pilot reports **undefined/undefined visible** and **undefined missing** affected hybrid_movies_live hashes. The aggregate count improved from the locked 74/105 baseline, and the pilot hash is present. No broad aggregate regression is indicated.

## Safety State

- PAUSE_PUBLICATION: active
- Publication/expansion: none performed
- Pilot mode: strictly additive
- Sentinel after pilot: `ALERT/HIGH` at 2026-06-11T02:30:05Z

## Important Caveats

- Sentinel returned to `ALERT/HIGH` after the pilot; this blocks any multi-title scaling now.
- The Orchestrator still needs a dispatch registration for `section5_uncapped_index_snapshot`; the post-pilot regression snapshot had to be run by the bounded read-only worker directly after the queued job returned `Unknown job type`.
- The pilot verifies that the traditional local alias exists and maps safely to the existing WebDAV target. It does not prove Plex has reindexed the new traditional alias as a separate movie path because no refresh, cache clear, publication, or expansion action was allowed.

## Recommendation

Hold scaling while Sentinel is ALERT/HIGH. Fix/register the Orchestrator dispatch for section5_uncapped_index_snapshot, then run one quiet soak/recheck. If Sentinel is REVIEW/MEDIUM or PASS/LOW and the one-title alias remains stable, the next safe step is a 3-title additive pilot with the same verification model and rollback gate.
