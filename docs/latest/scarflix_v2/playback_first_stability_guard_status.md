# Playback First Stability Guard

**Updated UTC:** 2026-06-21T19:31:33Z  
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

- pid=904 Plex Media Scanner stopped=False verified_gone= reason=off_peak_maintenance_allowed error=maintenance_allowed
- pid=1048 Plex Media Scanner stopped=False verified_gone= reason=off_peak_maintenance_allowed error=maintenance_allowed
- pid=5964 Plex Media Scanner stopped=False verified_gone= reason=off_peak_maintenance_allowed error=maintenance_allowed
- pid=13688 Plex Media Scanner stopped=False verified_gone= reason=off_peak_maintenance_allowed error=maintenance_allowed
- pid=13816 Plex Media Scanner stopped=False verified_gone= reason=off_peak_maintenance_allowed error=maintenance_allowed
- pid=16432 Plex Media Scanner stopped=False verified_gone= reason=off_peak_maintenance_allowed error=maintenance_allowed
- pid=27464 Plex Media Scanner stopped=False verified_gone= reason=off_peak_maintenance_allowed error=maintenance_allowed
- pid=30996 Plex Media Scanner stopped=False verified_gone= reason=off_peak_maintenance_allowed error=maintenance_allowed
- pid=35164 Plex Media Scanner stopped=False verified_gone= reason=off_peak_maintenance_allowed error=maintenance_allowed
- pid=37752 Plex Media Scanner stopped=False verified_gone= reason=off_peak_maintenance_allowed error=maintenance_allowed
- pid=46756 Plex Media Scanner stopped=False verified_gone= reason=off_peak_maintenance_allowed error=maintenance_allowed
- pid=49580 Plex Media Scanner stopped=False verified_gone= reason=off_peak_maintenance_allowed error=maintenance_allowed

## Recent rclone/WebDAV Error Pressure

- Recent error count: 0
- Top affected hashes:
- none

## Decision

Keep QA/expansion held; verify Plex-client playback only after rclone/WebDAV error pressure falls and background scanner/analyzer load is quiet.
