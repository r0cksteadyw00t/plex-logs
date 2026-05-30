# ScarFLIX v2 Middleware Review

Last refresh UTC: 2026-05-30T11:39:30Z

## Goal
Replicate the Stremio experience in Plex as closely as possible:
- browse a broad catalog in Plex
- press play
- resolve through Torrentio/Real-Debrid
- stream immediately when a cached/admitted source exists
- fall back to request/materialize when live streaming is not viable

## Current Preferred Path
Use the local ScarFLIX live proxy as the primary UX:
- Plex `.strm` catalog item points to `http://192.168.1.184:18788/live?...`
- live proxy resolves TMDb/IMDb to Torrentio/Stremio streams on demand
- selected stream must pass `HEAD=200` and `Range=206`
- selected stream must be a cached Debrid stream such as `[RD+]`, not an `[RD download]` placeholder
- selected stream must exceed the minimum real-media size threshold
- source ranking prefers 720p/1080p H.264-style cached streams and demotes 4K, HEVC/x265, remux, DV/HDR
- upstream URL is DPAPI-protected in local state and never written to `.strm`
- Plex receives byte-range-capable media through the local proxy

Current live proof:
- `12 Angry Men (1957)` live endpoint: PASS, 734077147 bytes, Range 206
- `Night of the Living Dead (1968)` live endpoint: PASS, 59472710133 bytes, Range 206
- live self-test: PASS, 35 checked / 35 passed
- Plex indexed live `.strm` count: 35
- old `_ScarFLIXv2` / `_ScarFLIXv2_Direct` Plex parts: 0
- failed/no-live-source catalog entries are quarantined automatically after validation

## Reusable Middleware Options

### Decypharr
Best fit for fallback/materialized playback.
It is already running locally and is designed as a Debrid/Usenet media gateway that integrates with Sonarr/Radarr by emulating qBittorrent/SABnzbd. It can make cloud files appear locally through DFS/rclone/WebDAV-style mounting. This is strong for durable Plex libraries, but it is not the fastest path for "press play and immediately stream this exact catalog placeholder."

Use for:
- Radarr/Sonarr fallback
- long-lived library entries
- local/cloud-mounted media workflows

Do not rely on it alone for:
- instant Stremio-like just-in-time play from a Plex catalog item

### Zurg + rclone
Best fit for Real-Debrid cloud library mounting.
Zurg exposes Real-Debrid as WebDAV and rclone can mount it for Plex. This can work well once the item exists in the Debrid cloud, but it still needs a request/resolution step before Plex sees a playable filesystem item.

Use for:
- RD cloud mount experiments
- reducing local disk use
- making RD-hosted files look local to Plex

Risks:
- Windows mount stability
- Plex scan timing
- remote link repair/availability behavior

### plex_debrid
Best fit for watchlist/request automation.
It is specifically built around Plex plus Debrid and can use Torrentio/Prowlarr/Jackett. It is closer to a request/watchlist automation layer than a direct per-title live proxy inside Plex playback.

Use for:
- comparison against our request lane
- possible future replacement of custom request orchestration

### Comet / AIOStreams / MediaFlow-style proxies
Best fit for stream aggregation/proxying.
These are strong Stremio-side middleware patterns and support debrid proxying. They may improve source quality and proxy behavior, but they still need a Plex-facing adapter because Plex is not a Stremio client.

Use for:
- possible upstream resolver replacement if Torrentio-only coverage is weak
- future source aggregation

## Recommendation
Keep two lanes:

1. Live lane, primary UX:
   Plex `.strm` -> ScarFLIX live proxy -> Torrentio/RD -> byte-range stream.

2. Durable fallback lane:
   failed/no-live source -> Decypharr/Radarr/Sonarr/qBittorrent/Zurg/rclone materialization -> Plex library item.

This matches the user expectation better than placeholders and avoids pretending Plex can natively run Stremio add-ons.

## NEED JASON
- None.
