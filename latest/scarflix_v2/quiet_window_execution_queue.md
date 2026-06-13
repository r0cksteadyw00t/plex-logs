# Quiet-Window Execution Queue

Created UTC: 2026-06-13T11:03:53Z  
Status: HELD_ACTIVE_PLEX_PLAYBACK

This queue defines what can resume when production Plex reports zero active sessions for two consecutive checks.

## Resume Gates

- Active Plex sessions: `0`.
- Consecutive zero-session checks: `2`.
- Sentinel: `PASS/LOW` or `REVIEW/MEDIUM`.
- `PAUSE_PUBLICATION`: active.
- Plex background process count: `0`.
- `cmd /c echo alive` average: under `300ms`.

## Queued Steps

1. Resume minimal status control plane.
2. Mission 2 Threadfin virtual adapter verification only.
3. Playback path verification for current Watch Now lane.
4. ScarFLIX Materialized QA recovery planning only.

## Still Blocked During Playback

- Plex restart or stop.
- Plex scans or refreshes.
- Threadfin/Plex Live TV attach.
- ScarFLIX publication or expansion.
- Heavy QA.
- Path mutation, cleanup, deletion, source mutation, broad retries.

FastTrack remains disabled until playback stability is proven.
