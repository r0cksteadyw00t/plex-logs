# TV-First Section 6 Publication Forensic Handoff

Updated UTC: 2026-06-16T01:12:00Z

## Current State

- TV new-episode monitor is active as scheduled task `JasonOS_Prime_TVFirstNewEpisodeMonitor` every 15 minutes.
- Monitor now writes persistent release-watch state and new-episode event queue:
  - private queue: `D:\PlexTools\state\jasonos_prime\catalogue_expansion\tv_first_new_episode_monitor\new_episode_events.json`
  - public status: `D:\PlexTools\public\latest\scarflix_v2\tv_first_new_episode_events_status.json`
- Release watch currently covers 90 shows, including 64 active-2026 shows. Latest event state is `PASS_NO_NEW_EPISODE_DELTAS`.
- Protected TV pilot is full-season ready privately: Haunted Hotel S01, MobLand S01, The Institute S01, 28/28 accepted and validated.
- Visible TV publication remains held after two rollback-protected attempts failed Plex Section 6 verification.

## What Changed

- `JasonOS_Prime_TVFirstAdditivePublicationAdapter.js` now defaults to direct episode file symlinks:
  - old layout: `Show\Season\Episode - ScarFLIX_part-*\stream.mkv`
  - new layout: `Show\Season\Episode - ScarFLIX_part-*.mkv`
- `JasonOS_Prime_TVFirstNewEpisodeMonitor.js` now records release deltas and suppresses repeat visible-publication attempts for 360 minutes after a recent Plex publication rollback.
- Next allowed publication attempt has longer scanner patience:
  - adapter Plex verify timeout default: 45 minutes
  - monitor publication child timeout default: 60 minutes
- Public mirror allowlist now includes the new release-event status JSON/Markdown.

## Evidence

- Directory-symlink publication attempt created 28 aliases and verified WebDAV, but Plex Section 6 did not expose the 28 expected hashes before verifier timeout. Adapter rolled back cleanly.
- File-symlink publication attempt created 28 direct `.mkv` aliases and verified WebDAV, but Plex Section 6 still did not expose the 28 expected hashes before verifier timeout. Adapter rolled back cleanly.
- Plex logs after file-symlink rollback show Section 6 scanner activity lagged behind the rollback:
  - `Haunted Hotel (2025)\Season 01` and other season folders were scanned/skipped around 11:03 local, after rollback at 11:00 local.
  - Existing old MobLand S01E01 directory-symlink control was processed and updated.
  - New 28 file-symlink aliases were already removed by rollback when the visible scanner activity occurred.

## Current Hypothesis

Leading hypothesis: Plex Section 6 scan/indexing latency is longer than the adapter's previous 15-minute verification window, so rollback may remove aliases before the queued scanner pass processes them. A secondary hypothesis remains Plex TV scanner cache behavior around symlinked episode entries.

## Safe Current Mode

- New episode detection continues every 15 minutes.
- Private staging/validation continues.
- Visible TV publication is cooldown-held to avoid repeated mutate/rollback loops.
- PAUSE_PUBLICATION remains active.
- Mission 002 is untouched by this TV path.

## Grok Review Request

Review whether the next safe attempt should be:

1. A single controlled file-symlink retry with 45-minute Plex verification and no additional layout change.
2. An explicit scanner lifecycle change that waits for Plex scanner completion evidence before verification/rollback.
3. A different TV Section 6 indexing strategy, such as pre-created real folders with file symlinks, Plex library location adjustment, or a temporary staging library.

