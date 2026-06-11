# Path 2 Verification Model Fix + Single-Title Pilot Result

**Updated:** 2026-06-11T01:36:46.412Z
**Status:** HELD_SENTINEL_ALERT_AFTER_RUNNER_PATCH

## Verification Model Changes

- Service-context verification now checks symlink objects/readlink metadata only.
- LocalSystem dereference of S:-backed stream.mkv paths is explicitly skipped.
- WebDAV preflight with retry/backoff runs before alias creation.
- Post-mutation verification uses alias symlink object/readlink checks, Plex baseline index presence, and bounded WebDAV retry.
- Rollback path remains intact.

## Single-Title Pilot Attempt

- Title: Annihilation (2018)
- Hash: scarflix_part-d8b22fb3f498688e
- Job: job_831e1ddc0f2ff83f
- Result: HELD_SENTINEL_ALERT
- Reason: Sentinel is ALERT/HIGH; pilot mutation is not allowed.

## Safety Result

- Sentinel: ALERT/HIGH
- PAUSE_PUBLICATION: active
- Alias exists after hold: false
- Alias rows in webdav_map: 0
- Publication/expansion: not started

## Assessment

The runner patch is complete and syntax-checked, but the single-title pilot did not execute because Sentinel returned ALERT/HIGH before mutation. This is the correct safety behavior. The updated verification model has not yet been proven by a completed pilot.

## Recommendation

Do not retry while Sentinel is ALERT/HIGH. Once Sentinel returns to REVIEW/MEDIUM or PASS/LOW and launch health remains stable, rerun the same one-title pilot only. Do not scale beyond one title until that pass is verified.
