# Playback Path Recovery Status

**Updated UTC:** 2026-06-20T09:27:53Z  
**Status:** REVIEW

## Scope

Playback infrastructure only. No publication, no expansion, no Plex DB mutation, no source mutation.

## Checks

- WebDAV bridge before: True
- WebDAV bridge after: False
- Plex identity: True
- rclone processes after: 1
- S:\media after: ok=False, timed_out=True
- S:\media\catalog after: ok=False, timed_out=True
- Watch Now probe source: fresh

## Watch Now

- Gremlins / scarflix_part-942255f029875306: FAIL, HTTP 0, 38ms
- Anna / scarflix_part-81107989d2e30cfb: FAIL, HTTP 0, 12ms

## Failures

WebDAV bridge health is not PASS
S: media/catalog path is not reliably ready
Watch Now probe failed: Gremlins
Watch Now probe failed: Anna
