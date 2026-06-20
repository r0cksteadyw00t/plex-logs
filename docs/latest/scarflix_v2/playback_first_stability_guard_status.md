# Playback First Stability Guard

**Updated UTC:** 2026-06-20T06:51:11Z  
**Status:** PASS_IDLE_NON_OFFPEAK_BACKGROUND_SUPPRESSED

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
- In off-peak window: False
- Background work suppressed: True
- Reason: idle_outside_off_peak_window

## Plex Background Jobs

- pid=5272 Plex Media Scanner stopped=True verified_gone=False reason=plex_background_scanner_or_analyzer error=taskkill_reported_no_running_instance
- pid=7756 Plex Media Scanner stopped=True verified_gone=False reason=plex_background_scanner_or_analyzer error=taskkill_reported_no_running_instance
- pid=8812 Plex Media Scanner stopped=True verified_gone=False reason=plex_background_scanner_or_analyzer error=taskkill_reported_no_running_instance
- pid=17344 Plex Media Scanner stopped=True verified_gone=False reason=plex_background_scanner_or_analyzer error=taskkill_reported_no_running_instance
- pid=24080 Plex Media Scanner stopped=True verified_gone=False reason=plex_background_scanner_or_analyzer error=taskkill_reported_no_running_instance
- pid=27064 Plex Media Scanner stopped=True verified_gone=False reason=plex_background_scanner_or_analyzer error=taskkill_reported_no_running_instance
- pid=28560 Plex Media Scanner stopped=True verified_gone=False reason=plex_background_scanner_or_analyzer error=taskkill_reported_no_running_instance
- pid=30760 Plex Media Scanner stopped=True verified_gone=False reason=plex_background_scanner_or_analyzer error=taskkill_reported_no_running_instance
- pid=33056 Plex Media Scanner stopped=True verified_gone=False reason=plex_background_scanner_or_analyzer error=taskkill_reported_no_running_instance
- pid=37040 Plex Media Scanner stopped=True verified_gone=False reason=plex_background_scanner_or_analyzer error=taskkill_reported_no_running_instance
- pid=37848 Plex Media Scanner stopped=True verified_gone=False reason=plex_background_scanner_or_analyzer error=taskkill_reported_no_running_instance
- pid=37952 Plex Media Scanner stopped=True verified_gone=False reason=plex_background_scanner_or_analyzer error=taskkill_reported_no_running_instance
- pid=39548 Plex Media Scanner stopped=True verified_gone=False reason=plex_background_scanner_or_analyzer error=taskkill_reported_no_running_instance
- pid=41076 Plex Media Scanner stopped=True verified_gone=True reason=plex_background_scanner_or_analyzer error=
- pid=41396 Plex Media Scanner stopped=True verified_gone=False reason=plex_background_scanner_or_analyzer error=taskkill_reported_no_running_instance

## Recent rclone/WebDAV Error Pressure

- Recent error count: 0
- Top affected hashes:
- none

## Decision

Keep QA/expansion held; verify Plex-client playback only after rclone/WebDAV error pressure falls and background scanner/analyzer load is quiet.
