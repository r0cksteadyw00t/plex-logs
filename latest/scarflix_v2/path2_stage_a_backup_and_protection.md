# Path 2 Stage A Backup, Documentation, Protection, and Rollback

Created UTC: 2026-06-11T00:00:11.503Z
Status: PASS_STAGE_A_COMPLETE
Backup root: D:/PlexTools/Backups/path2_stage_a_20260610T235616Z

## Current State

Section 5 currently uses hash-based folders named `ScarFLIX_part-<hash>` under `D:\StremioCatalog\_Hybrid\Movies\_ScarFLIXLive\06 Discover Movies`. The structure gives each materialized/WebDAV stream a stable hash identity and maps Plex-visible paths back to `webdav_map.json`. The latest uncapped Section 5 baseline is 83/105 visible (79%), with 22 missing.

## Backup Contents

- Full `webdav_map.json` copied and hashed.
- Latest Section 5 uncapped snapshot and current-missing correlation artifacts copied.
- Hypothesis ledger, GROK handoff, Codex status, PROJECT_PLAN, Orchestrator/Sentinel/dashboard status files copied.
- Orchestrator database file and recent job snapshot copied/captured.
- 105 affected path identities captured in `affected_path_manifest.json`. Direct media/symlink target backup was intentionally not performed; the manifest records exact path identities without traversing media targets.
- Visible hash list: 83. Missing hash list: 22.

## Current Visible Hashes

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
- scarflix_part-ebdde087ccdf789d - Her
- scarflix_part-ec10430fcf0b3b3a - Hidden Figures
- scarflix_part-02ca4b68340aafa1 - Idiocracy
- scarflix_part-b6f5180a4a7d0823 - Ikiru
- scarflix_part-1ce460822ca1239a - In the Mood for Love
- scarflix_part-52c63b31fc203627 - Indecent Proposal
- scarflix_part-d2dc1715682f383c - Influencers
- scarflix_part-0d465a7414c7c73a - Legends of the Fall
- scarflix_part-a7b67ffdd3c5808a - Life of Pi
- scarflix_part-8f866cc77c432167 - Lucy Shimmers and the Prince of Peace
- scarflix_part-574e40d64a636c74 - Maleficent: Mistress of Evil
- scarflix_part-bf8b8fcb4150df6b - Man in the Mirror: The Michael Jackson Story
- scarflix_part-68e1e99370505860 - Man on Fire
- scarflix_part-5e6de7f21f05908e - Mr. & Mrs. Smith
- scarflix_part-a5f5f717cb4537ea - Mulholland Drive
- scarflix_part-b73c939b16cf8b54 - Night at the Museum
- scarflix_part-2248c141861c0a2c - 9½ Weeks
- scarflix_part-5a66bfd3dde459fc - Ninja Assassin
- scarflix_part-65332ae6a08e3599 - Rambo: Last Blood
- scarflix_part-f075d703d4a5b5aa - Raya and the Last Dragon
- scarflix_part-ea2489ddc0285b99 - Reservoir Dogs
- scarflix_part-9ba42fdb610c4448 - RoboCop
- scarflix_part-8b621219c5c83619 - Robots
- scarflix_part-d191dec440cc3227 - Rocky III
- scarflix_part-17c22fece3c579f9 - Sense and Sensibility
- scarflix_part-0e300705b506774a - Sherlock Holmes
- scarflix_part-9340c96017dac230 - Shrek Forever After
- scarflix_part-3ac0e5bd2415a5fc - Silent Hill
- scarflix_part-24f719d304fd7aa0 - Sin Nombre
- scarflix_part-ffcfe7a189f19f24 - Sing
- scarflix_part-0cc30734b0488863 - Snow White and the Seven Dwarfs
- scarflix_part-059885f26b12b915 - Spartacus
- scarflix_part-9f1e4252bdcbf864 - Split
- scarflix_part-94620cf0a7e850ab - Spy
- scarflix_part-d708c8b30a147319 - Stand by Me
- scarflix_part-5c339a3b095f4e6e - Superman
- scarflix_part-0e360325f9b2603d - Teen Wolf: The Movie
- scarflix_part-89731919b552c615 - Terminator Salvation
- scarflix_part-491a4bfccb102f1e - The Big Short
- scarflix_part-e88bc8bc09b28631 - The Boy and the Heron
- scarflix_part-6d4172141ef2dd2a - The Boy in the Striped Pyjamas
- scarflix_part-1a32188f5276f482 - The Count of Monte Cristo
- scarflix_part-fe1550d7876cebb7 - The Count of Monte Cristo
- scarflix_part-1bbb5a07bba0ecb0 - The Creator
- scarflix_part-3150adb80410deb7 - The Curse of La Llorona
- scarflix_part-b0824386b672f488 - The Deadly Little Mermaid
- scarflix_part-d99a060ace386b52 - The Devil's Advocate
- scarflix_part-f5edc313355fa64c - The Empty Man
- scarflix_part-761f0288a98ecf2c - The Equalizer 2
- scarflix_part-b9efe1904b5d339b - The Human Centipede III (Final Sequence)
- scarflix_part-7a2e0f853be1ef51 - The Last Samurai
- scarflix_part-cfe52e744ff27d3c - The Lord of the Rings: The War of the Rohirrim
- scarflix_part-479e0ebd60d6e6ff - The Magic Faraway Tree
- scarflix_part-ea09f142010b00aa - The Magnificent Seven
- scarflix_part-5c4c8ab3132bfd55 - The Mummy: Tomb of the Dragon Emperor
- scarflix_part-a432cc9ab11b9fa4 - New Moon
- scarflix_part-94fc82206168aa0b - Witch!
- scarflix_part-df980ff53f4cea5d - There Will Be Blood
- scarflix_part-64c1bfd3e5881850 - Undisputed III: Redemption
- scarflix_part-68c43fa40f40a5e5 - Valerian and the City of a Thousand Planets
- scarflix_part-ac22c691d6568126 - Vertigo
- scarflix_part-ac3865f01b2e1ab8 - Warcraft: The Beginning
- scarflix_part-76f35a894c119454 - Wicked: For Good

## Current Missing Hashes

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

## Dependencies On Hash-Based Structure

- Plex Section 5 metadata rows currently reference `ScarFLIX_part-*` paths.
- `webdav_map.json` maps local materialized paths to WebDAV/debrid delivery.
- Section 5 diagnostic workers compare Plex Part hashes to `webdav_map.json`.
- Orchestrator incident and FastTrack gates can schedule work against the current hash-based structure.
- Public handoff/status files and the materialized QA hypothesis ledger describe current hash-based evidence.

Known dependency files inspected: 7. See backup manifest for details.

## In-Flight Work Protection

Cancelled queued conflicting jobs: 1.

- job_42a3d85d9666d8fc (autonomous_incident_manager) - Path 2 Stage A protective cancellation

Request file actions were recorded in the backup manifest. No task or file was deleted.

## Replacement Expectations For Stage B

- Replace hash-path assumptions in Section 5 diagnostics with a path abstraction that supports traditional folders and explicit IDs.
- Replace visible/missing hash gates with title/path identity gates backed by a migration map.
- Keep `webdav_map.json` or its successor as the authoritative delivery map until the new structure is verified.
- Keep PAUSE_PUBLICATION active until a post-migration verification gate passes.

## Rollback

See `D:/PlexTools/Backups/path2_stage_a_20260610T235616Z/docs/rollback_procedure.md`. Stage A verified backup creation and rollback dry-run documentation only; no destructive restore was executed.

## Safety Confirmation

No structural changes, folder moves, symlink changes, mapping changes, Plex refreshes, cache clears, publication, expansion, cleanup, deletion, source mutation, or path rewrite were performed. PAUSE_PUBLICATION remains required.

## Manifest Summary

```json
{
  "backup_root": "D:/PlexTools/Backups/path2_stage_a_20260610T235616Z",
  "copied_files": 36,
  "failed_copies": [
    {
      "source": "D:/PlexTools/Foundry/workers/JasonOS_Prime_Orchestrator.js",
      "copied": false,
      "reason": "missing"
    }
  ],
  "cancelled_jobs": 1,
  "visible": 83,
  "missing": 22
}
```

## Stage A Open Item

- Alternate Orchestrator entrypoint filename search exceeded the bounded runtime and was stopped. Known Section 5 workers, request files, job snapshots, DB copy, and status files are backed up. No Stage B migration work depends on this search result.
