# Playback First Stability Guard

**Updated UTC:** 2026-06-20T18:59:25Z  
**Status:** PASS_IDLE_OFFPEAK_MAINTENANCE_ALLOWED

## Scope

Playback quality and stability only. No publication, no expansion, no source mutation, no path rewrite.

## Command Launch

- Average: 0ms
- Degraded checks: 0

## Plex Playback Priority

- Session detection OK: True
- Active Plex sessions: 0
- Plex base used: http://192.168.1.184:32400
- Token source used: plex_token.txt
- Off-peak window: 2:00-6:00
- In off-peak window: True
- Background work suppressed: False
- Reason: idle_off_peak_maintenance_allowed

## Plex Background Jobs

- pid=3368 Plex Media Scanner stopped=False verified_gone= reason=off_peak_maintenance_allowed error=maintenance_allowed
- pid=3956 Plex Media Scanner stopped=False verified_gone= reason=off_peak_maintenance_allowed error=maintenance_allowed
- pid=8072 Plex Media Scanner stopped=False verified_gone= reason=off_peak_maintenance_allowed error=maintenance_allowed
- pid=10268 Plex Media Scanner stopped=False verified_gone= reason=off_peak_maintenance_allowed error=maintenance_allowed
- pid=10948 Plex Media Scanner stopped=False verified_gone= reason=off_peak_maintenance_allowed error=maintenance_allowed
- pid=11276 Plex Media Scanner stopped=False verified_gone= reason=off_peak_maintenance_allowed error=maintenance_allowed
- pid=13000 Plex Media Scanner stopped=False verified_gone= reason=off_peak_maintenance_allowed error=maintenance_allowed
- pid=16408 Plex Media Scanner stopped=False verified_gone= reason=off_peak_maintenance_allowed error=maintenance_allowed
- pid=20336 Plex Media Scanner stopped=False verified_gone= reason=off_peak_maintenance_allowed error=maintenance_allowed
- pid=37368 Plex Media Scanner stopped=False verified_gone= reason=off_peak_maintenance_allowed error=maintenance_allowed
- pid=37664 Plex Media Scanner stopped=False verified_gone= reason=off_peak_maintenance_allowed error=maintenance_allowed
- pid=41216 Plex Media Scanner stopped=False verified_gone= reason=off_peak_maintenance_allowed error=maintenance_allowed
- pid=43444 Plex Media Scanner stopped=False verified_gone= reason=off_peak_maintenance_allowed error=maintenance_allowed
- pid=44356 Plex Media Scanner stopped=False verified_gone= reason=off_peak_maintenance_allowed error=maintenance_allowed
- pid=45796 Plex Media Scanner stopped=False verified_gone= reason=off_peak_maintenance_allowed error=maintenance_allowed
- pid=46888 Plex Media Scanner stopped=False verified_gone= reason=off_peak_maintenance_allowed error=maintenance_allowed
- pid=48464 Plex Media Scanner stopped=False verified_gone= reason=off_peak_maintenance_allowed error=maintenance_allowed

## Recent rclone/WebDAV Error Pressure

- Recent error count: 0
- Top affected hashes:
- none

## Decision

Keep QA/expansion held; verify Plex-client playback only after rclone/WebDAV error pressure falls and background scanner/analyzer load is quiet.
