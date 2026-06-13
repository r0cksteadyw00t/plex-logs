# Playback Recovery Mode Status

**Updated UTC:** 2026-06-13T05:44:22Z  
**Status:** MONITORING_PASS_WEB_DAV_WITH_FILESYSTEM_CAUTION

## Latest Heartbeat Check

- Command launch: PASS (76ms, 58ms, 60ms).
- Plex identity: PASS HTTP 200.
- WebDAV bridge health: PASS HTTP 200.
- rclone: running as PID 18336.
- Caution: direct S:\ filesystem path probe timed out after 24 seconds.

## Watch Now Recheck

- Gremlins / scarflix_part-942255f029875306 - PASS HTTP 200, 1513ms.
- Anna / scarflix_part-81107989d2e30cfb - PASS HTTP 200, 1383ms.

## Decision

WebDAV playback path is currently healthy for the limited Watch Now lane, but the direct Windows filesystem mount probe timed out. Keep PAUSE_PUBLICATION active and keep catalogue expansion paused until filesystem-path stability is proven over more cycles.
