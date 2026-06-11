# Path 2 Stage B Migration Design and Execution Hold

Created UTC: 2026-06-11T00:17:25.714Z
Status: HELD_BEFORE_STRUCTURAL_MIGRATION
Stage A backup root: D:/PlexTools/Backups/path2_stage_a_20260610T235616Z

## Executive Decision

Stage B live migration was not executed. Stage A backup validation passed, and the target design plus phased migration plan are complete, but live structural changes are held because the path layer did not pass a safe enough preflight for mutation. A bounded live symlink/file probe timed out during path mechanics inspection, and the migration would alter live Plex-indexed paths and mapping semantics.

This is a safety stop, not a design failure. The correct next action is a dedicated pilot migration job, not a big-bang migration.

## Phase 1 - Stage A Backup Validation

Validated Stage A artifacts at `D:/PlexTools/Backups/path2_stage_a_20260610T235616Z`:

- Backup manifest exists and reports `PASS_BACKUP_CREATED`.
- Rollback procedure exists.
- Affected path manifest exists with `105` entries.
- Visible list exists with `83` entries.
- Missing list exists with `22` entries.
- Current locked baseline: `83/105` visible, `22` missing.

## Phase 2 - Target Traditional Folder Structure

### Target Movie Layout

Current hash layout:

`D:\StremioCatalog\_Hybrid\Movies\_ScarFLIXLive\06 Discover Movies\Movie Name (Year)\ScarFLIX_part-<hash>\stream.mkv`

Target traditional layout:

`D:\StremioCatalog\_Hybrid\Movies\_ScarFLIXLive\06 Discover Movies\Movie Name (Year)\Movie Name (Year).mkv`

### Preservation Rules

- Preserve underlying WebDAV/debrid delivery target.
- Preserve legacy `ScarFLIX_part-<hash>` folder during transition.
- Add new traditional alias path first; do not replace or delete legacy path during pilot.
- Extend `webdav_map.json` additively with fields such as `legacy_hash`, `legacy_local_path`, `path2_local_path`, `path2_status`, and `rollback_local_path`.
- Do not change publication state while `PAUSE_PUBLICATION` is active.
- Keep the 22 missing hashes held/retryable until the visible set migration is proven.

### Movies vs TV

This Stage B scope is Movies Section 5 / `hybrid_movies_live`. TV structure must be handled later under separate section-aware rules.

## Phase 3 - Phased Migration Plan

### Phase B0 - Preflight Only

- Revalidate Stage A backup.
- Re-run bounded launch health.
- Snapshot Orchestrator jobs.
- Confirm no active Section 5 probe/reconcile jobs.
- Confirm `PAUSE_PUBLICATION` is active.

### Phase B1 - Pilot Alias Creation, 3-5 Visible Titles

- Select 3-5 currently visible titles from the 83.
- For each title, create an additive traditional alias path while keeping the legacy hash path untouched.
- Do not remove `ScarFLIX_part-*`.
- Update `webdav_map.json` only additively for pilot rows.
- Keep a per-title rollback entry.

### Phase B2 - Pilot Verification Gate

- Verify local alias path metadata without traversing slow WebDAV targets.
- Run bounded WebDAV HEAD checks for pilot only.
- Run a Plex Section 5 read-only snapshot before and after any explicitly approved scan/index operation.
- Gate requirement: no regression in the original 83 visible set and pilot titles remain resolvable.

### Phase B3 - Visible Set Migration

Only after B1/B2 pass:

- Migrate the remaining visible titles in small batches.
- Keep legacy paths until full post-migration verification is complete.
- Missing 22 remain held/retryable.

### Phase B4 - Final Verification

- Re-run uncapped Section 5 snapshot.
- Compare before/after visible count against Stage A baseline.
- Confirm WebDAV delivery for migrated aliases.
- Confirm no new systemic missing pattern.

### Rollback Triggers

- Any drop below the Stage A visible baseline of 83 without a documented transient explanation.
- Any WebDAV delivery failure on previously working visible titles.
- Any Plex API/indexing error affecting the migrated pilot.
- Process launch degradation above the 800ms average gate or timeout recurrence.

## Why Full Migration Was Held

The user requested a complete Stage B migration in one run, but the safe execution preconditions are not met. A full live migration requires path rewrites and Plex re-index behavior. Because live path probing timed out, executing structural changes now would create a non-trivial chance of reducing the currently visible set. The correct engineering action is to hold before mutation and run a pilot under Orchestrator ownership.

## Current Visible Hashes Held For Future Pilot

- scarflix_part-c08b683f68e4e49e - Annabelle
- scarflix_part-d8b22fb3f498688e - Annihilation
- scarflix_part-2eaab8df357724dc - Armageddon
- scarflix_part-8aa2235ef7c1e0f6 - Battleship
- scarflix_part-bd37929b54c7c1bf - Crank
- scarflix_part-8312e4b6385fd16c - Creed
- scarflix_part-b9dbad7c5a4378f1 - Dances with Wolves
- scarflix_part-8ce42f7e275d1e85 - Daredevil
- scarflix_part-7c4868fe7b1db021 - Dawn of the Dead
- scarflix_part-db3f532fdd48fe57 - Dolittle
- scarflix_part-d00eaa269e0555aa - Donnie Darko
- scarflix_part-00effd68c382bc07 - Dr. No
- scarflix_part-f6f047a41becc4ce - Drive
- scarflix_part-519e46c6da7cf797 - Dumb and Dumber
- scarflix_part-d1ce9c47a23732b3 - Fargo
- scarflix_part-f96ecae0bf043548 - Final Destination
- scarflix_part-854736eb92c08f81 - Finding Dory
- scarflix_part-942255f029875306 - Gremlins
- scarflix_part-e9c1718338c9d187 - Hachi: A Dog's Tale
- scarflix_part-6c8723c088689b1a - Harakiri

... 63 additional visible entries are listed in `path2_stage_a_visible_hashes.json`.

## Current Missing Hashes Held/Retryable

- scarflix_part-81107989d2e30cfb - Anna
- scarflix_part-6bc868616f378edf - The Ballerina
- scarflix_part-d04bde274e598c57 - Despicable Me 3
- scarflix_part-c017966a31451921 - Final Destination 5
- scarflix_part-61f18dcc8c34f579 - Fracture
- scarflix_part-700e6d7fdb8236a0 - Friday
- scarflix_part-31696108f69a37b9 - Hulk
- scarflix_part-5f2b46ebc01460e6 - My Hero Academia: You're Next
- scarflix_part-73b16faf4582f6ed - Nacho Libre
- scarflix_part-fb19346714d96cd7 - Speed
- scarflix_part-6a30d1aa558bac1f - Terminator: Dark Fate
- scarflix_part-78ebe23593166235 - The Jungle Book
- scarflix_part-93599b6b163a4b72 - The Mist
- scarflix_part-a0692a530078eae1 - The Mitchells vs. the Machines
- scarflix_part-ba7d61952f40f7bc - The Transporter
- scarflix_part-5d08e120806b8ae9 - The Whale
- scarflix_part-be2edbceddc0dd6f - They Call Me Trinity
- scarflix_part-99fa62934c2d677c - To Wong Foo, Thanks for Everything! Julie Newmar
- scarflix_part-b6caef61efed54f1 - Twister
- scarflix_part-c2fa5a32a4d5e81c - Watchmen
- scarflix_part-fe9eb00f9fe3c79f - Wrong Turn 5: Bloodlines
- scarflix_part-bd7eda1ae6bf343a - Zombieland

## Safety Confirmation

No live Stage B migration was performed. No publication, expansion, refresh, cache clear, cleanup, deletion, source mutation, folder move, symlink change, mapping change, or path rewrite was performed.
