# Mission 002 Expanded Live TV Cutover - PASS

**Updated UTC:** 2026-06-15T08:30:09Z  
**Status:** PASS_EXPANDED_CURATED_LIVE_TV_USER_VERIFIED

## User Outcome

Plex's real Live TV/DVR Guide is now populated with the expanded curated IPTV package. Channel 10 playback was verified through Plex Web after fixing the Plex DVR encoded channel mapping and exposing Threadfin's tuner path on TCP 5004.

## Current Numbers

- Active curated channels: 32
- Threadfin lineup channels: 32
- Plex enabled DVR mappings: 32
- Plex EPG channel tags: 32
- Plex EPG metadata items: 7093
- Plex EPG media items: 6959
- Stream probe: 32 pass / 0 fail
- Active Plex sessions after verification: 0

## Plex DVR Evidence

- Device status: alive
- Device URI: http://127.0.0.1:35400
- Advertised tuners: 4
- Channel 10 device identifier: Channel 10

## Channel Tags

mjh-10-vic Channel 10, mjh-10bold-vic 10 Drama, mjh-10peach-vic 10 Comedy, mjh-10shake-vic Nickelodeon, mjh-7afl-fast 7plus AFL Live, mjh-7bravo-fast 7Bravo, mjh-7flix-mel 7flix, mjh-7mate-syd 7mate, mjh-7now-fast 7now, mjh-7two-mel 7two, mjh-9crime-fast 9Crime, mjh-abc-kids ABC Kids, mjh-abc-me ABC Entertains, mjh-abc-news ABC NEWS, mjh-abc-tv-plus ABC Family, mjh-abc-vic ABC TV, mjh-channel-9-vic Channel 9, mjh-gem-vic 9Gem, mjh-go-vic 9Go!, mjh-life-vic 9Life, mjh-racing-fast Racing.com, mjh-racingwa-fast Racing WA, mjh-rush-vic 9Rush, mjh-sbs-2syd SBS VICELAND, mjh-sbs-3syd SBS Food, mjh-sbs-4syd SBS World Movies, mjh-sbs-5nsw NITV, mjh-sbs-6nat SBS WorldWatch, mjh-sbs-sbst SBS, mjh-seven-mel 7 Melbourne, mjh-seven-syd 7 Sydney, mjh-sky-news-now Sky News Now

## Safety

- IPTV only: true
- Physical tuner used: false
- ScarFLIX publication touched: false
- PAUSE_PUBLICATION preserved: true
- TCP 5004 is exposed for Plex tuner traffic; UDP 5004 is intentionally not exposed because Windows owns that port and Plex playback is working over TCP.

## Held

FIFA+ remains held because it previously failed segment-load validation. It should be tested separately before inclusion.
