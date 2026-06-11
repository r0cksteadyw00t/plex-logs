# Path 2 Protected Pilot Migration Runner

**Updated:** 2026-06-11T01:05:16.095Z
**Worker:** D:/PlexTools/Foundry/workers/JasonOS_Prime_Path2PilotMigrationRunner.js
**Orchestrator Job Type:** path2_pilot_migration
**Current Pilot Status:** ROLLED_BACK_PILOT_VERIFICATION_FAILED

## Purpose

This runner is a dedicated, isolated harness for Path 2 pilot migrations from hash-folder style ScarFLIX_part-* entries toward traditional movie file aliases. It is intentionally separate from the general Materialized QA incident probe path.

## Constraints

- Additive only during pilot.
- Accepts 1-5 target hashes only.
- Requires PAUSE_PUBLICATION active.
- Requires Sentinel not ALERT/HIGH.
- Requires launch health not degraded.
- Requires a fresh uncapped baseline at or above the configured minimum visible count.
- Backs up webdav_map.json before any pilot mutation.
- Creates only traditional file symlink aliases for selected hashes.
- Appends path2_alias metadata rows only after the alias is created.
- Rolls back alias symlinks and restores webdav_map.json on any verification failure.

## Pilot Result

The 2026-06-11 pilot reached the mutation step, created three additive aliases, failed bounded verification, and rolled back automatically. The failure reasons were:

- WebDAV HEAD failed for scarflix_part-d8b22fb3f498688e
- WebDAV HEAD failed for scarflix_part-2eaab8df357724dc
- WebDAV HEAD failed for scarflix_part-8aa2235ef7c1e0f6

## Current Recommendation

Do not scale Path 2 Stage B yet. Keep this runner available as a protected harness, but diagnose the verification path before another pilot. The next attempt should be one-title only and should require WebDAV HEAD success before alias creation.
