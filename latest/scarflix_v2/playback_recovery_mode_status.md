# Playback Recovery Mode Status

**Updated UTC:** 2026-06-13T05:31:37Z  
**Status:** PARTIAL_PASS_LIMITED_WATCH_NOW_LANE_READY

## Root Cause

Plex was online, but S:\media was missing because the rclone WebDAV mount was not active after reboot. Plex could see library items but could not access the underlying media path.

## Recovery Actions

- Stopped Path 2 campaign runner earlier and disabled non-critical high-churn workers.
- Ran ScarFLIX_v2_RcloneMountKeepalive.ps1.
- rclone started and S:\media plus S:\media\catalog became available.
- Plex identity: PASS HTTP 200.
- WebDAV bridge health: PASS HTTP 200.
- Command launch recovered to 157ms, 101ms, 65ms.

## Limited Watch Now Lane

- Gremlins / scarflix_part-942255f029875306 - HTTP 200, 1802ms
- Anna / scarflix_part-81107989d2e30cfb - HTTP 200, 7482ms
- Annabelle / scarflix_part-c08b683f68e4e49e - HTTP 200, 8992ms
- Annihilation / scarflix_part-d8b22fb3f498688e - HTTP 200, 8979ms
- Armageddon / scarflix_part-2eaab8df357724dc - HTTP 200, 7414ms
- Battleship / scarflix_part-8aa2235ef7c1e0f6 - HTTP 200, 7220ms

## Safety

PAUSE_PUBLICATION remains active. Expansion remains paused. WebDAV HEAD works but latency is still high on several titles, so this is limited playback recovery rather than broad expansion clearance.
