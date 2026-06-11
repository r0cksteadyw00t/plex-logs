# Path 2 Service Context Verification Diagnostic

**Updated:** 2026-06-11T01:20:23.262Z
**Status:** REVIEW_PATH2_VERIFICATION_STRATEGY_NEEDS_ADJUSTMENT
**Mode:** Read-only. No pilot reattempt. No structural changes.

## Launch Health Gate

- cmd /c echo alive checks: 28ms, 22ms, 23ms
- Average: 24ms
- Timeouts: 0

## Current Safety Snapshot

- Sentinel: REVIEW / MEDIUM
- Orchestrator: PASS
- Service account: LocalSystem
- PAUSE_PUBLICATION: active
- Current baseline: 74/105 visible, 31 missing

## Pilot Evidence Reviewed

- Annihilation (2018) (scarflix_part-d8b22fb3f498688e)
  - Local dir symlink object: exists -> S:\media\ScarFLIX_part-d8b22fb3f498688e
  - Pilot legacy stream lstat: ENOENT: no such file or directory, lstat 'D:\StremioCatalog\_Hybrid\Movies\_ScarFLIXLive\06 Discover Movies\Annihilation (2018)\ScarFLIX_part-d8b22fb3f498688e\stream.mkv'
  - Pilot WebDAV HEAD: FAIL timeout
  - Current alias path: D:\StremioCatalog\_Hybrid\Movies\_ScarFLIXLive\06 Discover Movies\Annihilation (2018)\Annihilation (2018).mkv
  - Current alias lstat after rollback: absent as expected
- Armageddon (1998) (scarflix_part-2eaab8df357724dc)
  - Local dir symlink object: exists -> S:\media\ScarFLIX_part-2eaab8df357724dc
  - Pilot legacy stream lstat: ENOENT: no such file or directory, lstat 'D:\StremioCatalog\_Hybrid\Movies\_ScarFLIXLive\06 Discover Movies\Armageddon (1998)\ScarFLIX_part-2eaab8df357724dc\stream.mkv'
  - Pilot WebDAV HEAD: FAIL HTTP 503
  - Current alias path: D:\StremioCatalog\_Hybrid\Movies\_ScarFLIXLive\06 Discover Movies\Armageddon (1998)\Armageddon (1998).mkv
  - Current alias lstat after rollback: absent as expected
- Battleship (2012) (scarflix_part-8aa2235ef7c1e0f6)
  - Local dir symlink object: exists -> S:\media\ScarFLIX_part-8aa2235ef7c1e0f6
  - Pilot legacy stream lstat: ENOENT: no such file or directory, lstat 'D:\StremioCatalog\_Hybrid\Movies\_ScarFLIXLive\06 Discover Movies\Battleship (2012)\ScarFLIX_part-8aa2235ef7c1e0f6\stream.mkv'
  - Pilot WebDAV HEAD: FAIL timeout
  - Current alias path: D:\StremioCatalog\_Hybrid\Movies\_ScarFLIXLive\06 Discover Movies\Battleship (2012)\Battleship (2012).mkv
  - Current alias lstat after rollback: absent as expected

## Bounded WebDAV Recheck

- Annihilation (2018): HTTP 200 in 1475ms
- Armageddon (1998): timeout in 2512ms
- Battleship (2012): HTTP 200 in 1392ms

## Findings

- The Orchestrator service runs as LocalSystem. The selected ScarFLIX_part directories are symlinks to S:\media\ScarFLIX_part-* targets.
- Service-context verification failed on legacy_lstat for stream.mkv because dereferencing the ScarFLIX_part directory symlink depends on the S: rclone mount being visible to LocalSystem. The failure mode is ENOENT for all three pilot titles.
- The created traditional aliases were only lstat-verified as symlink objects before rollback. That does not prove their targets can be dereferenced; their relative targets still traverse the same ScarFLIX_part directory symlinks and therefore inherit the same S: visibility risk.
- The WebDAV HEAD checks in the pilot targeted the original /media/ScarFLIX_part-*/stream.mkv paths, not the new traditional aliases. Those failures are therefore not evidence that the alias naming itself is invalid.
- A bounded read-only recheck later returned HTTP 200 for Annihilation and Battleship and a timeout for Armageddon. This points to transient WebDAV/backend/source latency for the HEAD layer, not a deterministic missing-path condition for all three.

## Root Cause Summary

The pilot failed because the current verification strategy mixes two unreliable checks for this service context: LocalSystem dereferencing of S:-backed symlinks and single-attempt WebDAV HEAD. The local path failure is a known context-visibility issue; the WebDAV failure appears transient or source-latency-sensitive. The evidence does not prove Path 2 is structurally invalid, but it does prove the current verification gate is not fit for scaling.

## Recommendation

- Path 2 remains potentially viable, but the current verification strategy is not safe to scale.
- Do not reattempt migration or scale Stage B yet.
- Patch the protected runner verification design before any further pilot:
  - Treat LocalSystem dereference of S:-backed symlinks as a service-context limitation, not immediate content failure.
  - Verify symlink objects and readlink targets separately.
  - Require WebDAV preflight with retry/backoff before alias creation.
  - Use user-context or Plex/API verification for actual media dereference/playability checks.
- Next pilot, if authorized later, should be one title only.
