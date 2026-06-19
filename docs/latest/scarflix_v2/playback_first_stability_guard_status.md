# Playback First Stability Guard

**Updated UTC:** 2026-06-19T16:59:43Z  
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

- pid=6272 Plex Media Scanner stopped=False verified_gone= reason=off_peak_maintenance_allowed error=maintenance_allowed
- pid=6660 Plex Media Scanner stopped=False verified_gone= reason=off_peak_maintenance_allowed error=maintenance_allowed
- pid=7152 Plex Media Scanner stopped=False verified_gone= reason=off_peak_maintenance_allowed error=maintenance_allowed
- pid=9008 Plex Media Scanner stopped=False verified_gone= reason=off_peak_maintenance_allowed error=maintenance_allowed
- pid=15588 Plex Media Scanner stopped=False verified_gone= reason=off_peak_maintenance_allowed error=maintenance_allowed
- pid=15976 Plex Media Scanner stopped=False verified_gone= reason=off_peak_maintenance_allowed error=maintenance_allowed
- pid=23756 Plex Media Scanner stopped=False verified_gone= reason=off_peak_maintenance_allowed error=maintenance_allowed
- pid=23860 Plex Media Scanner stopped=False verified_gone= reason=off_peak_maintenance_allowed error=maintenance_allowed
- pid=27480 Plex Media Scanner stopped=False verified_gone= reason=off_peak_maintenance_allowed error=maintenance_allowed
- pid=28724 Plex Media Scanner stopped=False verified_gone= reason=off_peak_maintenance_allowed error=maintenance_allowed
- pid=31876 Plex Media Scanner stopped=False verified_gone= reason=off_peak_maintenance_allowed error=maintenance_allowed
- pid=35168 Plex Media Scanner stopped=False verified_gone= reason=off_peak_maintenance_allowed error=maintenance_allowed
- pid=35260 Plex Media Scanner stopped=False verified_gone= reason=off_peak_maintenance_allowed error=maintenance_allowed
- pid=35512 Plex Media Scanner stopped=False verified_gone= reason=off_peak_maintenance_allowed error=maintenance_allowed
- pid=35920 Plex Media Scanner stopped=False verified_gone= reason=off_peak_maintenance_allowed error=maintenance_allowed
- pid=36172 Plex Media Scanner stopped=False verified_gone= reason=off_peak_maintenance_allowed error=maintenance_allowed
- pid=36576 Plex Media Scanner stopped=False verified_gone= reason=off_peak_maintenance_allowed error=maintenance_allowed
- pid=36920 Plex Media Scanner stopped=False verified_gone= reason=off_peak_maintenance_allowed error=maintenance_allowed
- pid=37488 Plex Media Scanner stopped=False verified_gone= reason=off_peak_maintenance_allowed error=maintenance_allowed
- pid=37496 Plex Media Scanner stopped=False verified_gone= reason=off_peak_maintenance_allowed error=maintenance_allowed
- pid=39020 Plex Media Scanner stopped=False verified_gone= reason=off_peak_maintenance_allowed error=maintenance_allowed
- pid=39564 Plex Media Scanner stopped=False verified_gone= reason=off_peak_maintenance_allowed error=maintenance_allowed
- pid=40920 Plex Media Scanner stopped=False verified_gone= reason=off_peak_maintenance_allowed error=maintenance_allowed
- pid=41004 Plex Media Scanner stopped=False verified_gone= reason=off_peak_maintenance_allowed error=maintenance_allowed

## Recent rclone/WebDAV Error Pressure

- Recent error count: 0
- Top affected hashes:
- none

## Decision

Keep QA/expansion held; verify Plex-client playback only after rclone/WebDAV error pressure falls and background scanner/analyzer load is quiet.
