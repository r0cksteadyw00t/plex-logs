# Playback First Stability Guard

**Updated UTC:** 2026-06-19T19:36:36Z  
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

- pid=440 Plex Media Scanner stopped=False verified_gone= reason=off_peak_maintenance_allowed error=maintenance_allowed
- pid=1360 Plex Media Scanner stopped=False verified_gone= reason=off_peak_maintenance_allowed error=maintenance_allowed
- pid=6140 Plex Media Scanner stopped=False verified_gone= reason=off_peak_maintenance_allowed error=maintenance_allowed
- pid=8884 Plex Media Scanner stopped=False verified_gone= reason=off_peak_maintenance_allowed error=maintenance_allowed
- pid=9404 Plex Media Scanner stopped=False verified_gone= reason=off_peak_maintenance_allowed error=maintenance_allowed
- pid=10016 Plex Media Scanner stopped=False verified_gone= reason=off_peak_maintenance_allowed error=maintenance_allowed
- pid=11868 Plex Media Scanner stopped=False verified_gone= reason=off_peak_maintenance_allowed error=maintenance_allowed
- pid=12408 Plex Media Scanner stopped=False verified_gone= reason=off_peak_maintenance_allowed error=maintenance_allowed
- pid=13156 Plex Media Scanner stopped=False verified_gone= reason=off_peak_maintenance_allowed error=maintenance_allowed
- pid=13796 Plex Media Scanner stopped=False verified_gone= reason=off_peak_maintenance_allowed error=maintenance_allowed
- pid=15480 Plex Media Scanner stopped=False verified_gone= reason=off_peak_maintenance_allowed error=maintenance_allowed
- pid=17200 Plex Media Scanner stopped=False verified_gone= reason=off_peak_maintenance_allowed error=maintenance_allowed
- pid=24660 Plex Media Scanner stopped=False verified_gone= reason=off_peak_maintenance_allowed error=maintenance_allowed
- pid=25080 Plex Media Scanner stopped=False verified_gone= reason=off_peak_maintenance_allowed error=maintenance_allowed
- pid=25248 Plex Media Scanner stopped=False verified_gone= reason=off_peak_maintenance_allowed error=maintenance_allowed
- pid=30660 Plex Media Scanner stopped=False verified_gone= reason=off_peak_maintenance_allowed error=maintenance_allowed
- pid=33300 Plex Media Scanner stopped=False verified_gone= reason=off_peak_maintenance_allowed error=maintenance_allowed
- pid=34544 Plex Media Scanner stopped=False verified_gone= reason=off_peak_maintenance_allowed error=maintenance_allowed
- pid=35448 Plex Media Scanner stopped=False verified_gone= reason=off_peak_maintenance_allowed error=maintenance_allowed
- pid=36216 Plex Media Scanner stopped=False verified_gone= reason=off_peak_maintenance_allowed error=maintenance_allowed
- pid=36316 Plex Media Scanner stopped=False verified_gone= reason=off_peak_maintenance_allowed error=maintenance_allowed
- pid=37224 Plex Media Scanner stopped=False verified_gone= reason=off_peak_maintenance_allowed error=maintenance_allowed
- pid=42480 Plex Media Scanner stopped=False verified_gone= reason=off_peak_maintenance_allowed error=maintenance_allowed
- pid=43532 Plex Media Scanner stopped=False verified_gone= reason=off_peak_maintenance_allowed error=maintenance_allowed
- pid=44256 Plex Media Scanner stopped=False verified_gone= reason=off_peak_maintenance_allowed error=maintenance_allowed
- pid=44504 Plex Media Scanner stopped=False verified_gone= reason=off_peak_maintenance_allowed error=maintenance_allowed
- pid=44756 Plex Media Scanner stopped=False verified_gone= reason=off_peak_maintenance_allowed error=maintenance_allowed

## Recent rclone/WebDAV Error Pressure

- Recent error count: 0
- Top affected hashes:
- none

## Decision

Keep QA/expansion held; verify Plex-client playback only after rclone/WebDAV error pressure falls and background scanner/analyzer load is quiet.
