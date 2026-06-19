# Playback First Stability Guard

**Updated UTC:** 2026-06-19T05:17:12Z  
**Status:** REVIEW_SESSION_DETECTION_UNAVAILABLE_BACKGROUND_SUPPRESSED

## Scope

Playback quality and stability only. No publication, no expansion, no source mutation, no path rewrite.

## Command Launch

- Average: 0ms
- Degraded checks: 0

## Plex Playback Priority

- Session detection OK: False
- Active Plex sessions: -1
- Plex base used: 
- Token source used: 
- Off-peak window: 2:00-6:00
- In off-peak window: False
- Background work suppressed: True
- Reason: session_detection_unavailable_background_suppressed

## Plex Background Jobs

- none

## Recent rclone/WebDAV Error Pressure

- Recent error count: 0
- Top affected hashes:
- none

## Decision

Keep QA/expansion held; verify Plex-client playback only after rclone/WebDAV error pressure falls and background scanner/analyzer load is quiet.
