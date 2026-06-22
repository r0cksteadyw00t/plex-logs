# Playback First Stability Guard

**Updated UTC:** 2026-06-22T18:25:13Z  
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

- pid=6704 Plex Media Scanner stopped=False verified_gone= reason=off_peak_maintenance_allowed error=maintenance_allowed
- pid=7056 Plex Media Scanner stopped=False verified_gone= reason=off_peak_maintenance_allowed error=maintenance_allowed
- pid=8356 Plex Media Scanner stopped=False verified_gone= reason=off_peak_maintenance_allowed error=maintenance_allowed
- pid=10092 Plex Media Scanner sto# Playback First Stability Guard

**Updated UTC:** 2026-06-22T18:25:18Z  
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

- pid=6704 Plex Media Scanner stopped=False verified_gone= reason=off_peak_maintenance_allowed error=maintenance_allowed
- pid=7056 Plex Media Scanner stopped=False verified_gone= reason=off_peak_maintenance_allowed error=maintenance_allowed
- pid=8356 Plex Media Scanner stopped=False verified_gone= reason=off_peak_maintenance_allowed error=maintenance_allowed
- pid=10092 Plex Media Scanner stopped=False verified_gone= reason=off_peak_maintenance_allowed error=maintenance_allowed
- pid=12668 Plex Media Scanner stopped=False verified_gone= reason=off_peak_maintenance_allowed error=maintenance_allowed
- pid=12840 Plex Media Scanner stopped=False verified_gone= reason=off_peak_maintenance_allowed error=maintenance_allowed
- pid=16100 Plex Media Scanner stopped=False verified_gone= reason=off_peak_maintenance_allowed error=maintenance_allowed
- pid=17404 Plex Media Scanner stopped=False verified_gone= reason=off_peak_maintenance_allowed error=maintenance_allowed
- pid=22452 Plex Media Scanner stopped=False verified_gone= reason=off_peak_maintenance_allowed error=maintenance_allowed
- pid=24600 Plex Media Scanner stopped=False verified_gone= reason=off_peak_maintenance_allowed error=maintenance_allowed
- pid=30440 Plex Media Scanner stopped=False verified_gone= reason=off_peak_maintenance_allowed error=maintenance_allowed
- pid=34256 Plex Media Scanner stopped=False verified_gone= reason=off_peak_maintenance_allowed error=maintenance_allowed
- pid=34508 Plex Media Scanner stopped=False verified_gone= reason=off_peak_maintenance_allowed error=maintenance_allowed
- pid=34536 Plex Media Scanner stopped=False verified_gone= reason=off_peak_maintenance_allowed error=maintenance_allowed
- pid=37240 Plex Media Scanner stopped=False verified_gone= reason=off_peak_maintenance_allowed error=maintenance_allowed
- pid=37816 Plex Media Scanner stopped=False verified_gone= reason=off_peak_maintenance_allowed error=maintenance_allowed
- pid=39044 Plex Media Scanner stopped=False verified_gone= reason=off_peak_maintenance_allowed error=maintenance_allowed
- pid=39204 Plex Media Scanner stopped=False verified_gone= reason=off_peak_maintenance_allowed error=maintenance_allowed
- pid=39828 Plex Media Scanner stopped=False verified_gone= reason=off_peak_maintenance_allowed error=maintenance_allowed
- pid=41936 Plex Media Scanner stopped=False verified_gone= reason=off_peak_maintenance_allowed error=maintenance_allowed
- pid=43212 Plex Media Scanner stopped=False verified_gone= reason=off_peak_maintenance_allowed error=maintenance_allowed
- pid=46244 Plex Media Scanner stopped=False verified_gone= reason=off_peak_maintenance_allowed error=maintenance_allowed
- pid=46988 Plex Media Scanner stopped=False verified_gone= reason=off_peak_maintenance_allowed error=maintenance_allowed
- pid=49112 Plex Media Scanner stopped=False verified_gone= reason=off_peak_maintenance_allowed error=maintenance_allowed
- pid=49156 Plex Media Scanner stopped=False verified_gone= reason=off_peak_maintenance_allowed error=maintenance_allowed
- pid=49584 Plex Media Scanner stopped=False verified_gone= reason=off_peak_maintenance_allowed error=maintenance_allowed
- pid=54624 Plex Media Scanner stopped=False verified_gone= reason=off_peak_maintenance_allowed error=maintenance_allowed

## Recent rclone/WebDAV Error Pressure

- Recent error count: 0
- Top affected hashes:
- none

## Decision

Keep QA/expansion held; verify Plex-client playback only after rclone/WebDAV error pressure falls and background scanner/analyzer load is quiet.
