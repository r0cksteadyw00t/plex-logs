# ScarFLIX v2 Current State

Last refresh UTC: 2026-05-30T09:47:45Z

## User Goal
- Replicate the Stremio experience inside Plex as closely as Plex allows.
- Plex should show broad movie and TV catalog browsing, not only owned/downloaded media.
- Selecting a live catalog item should stream through Torrentio/Real-Debrid via the local ScarFLIX proxy when a cached source exists.
- Request/materialize workflows remain as fallback for titles that cannot be streamed live.

## Current Architecture
- The primary Stremio-like UX is now the live Streaming-library catalog under `_ScarFLIXLive`.
- Live `.strm` files point to `http://192.168.1.184:18788/live?...`; upstream RD URLs are resolved on demand and DPAPI-protected locally.
- The live proxy now admits cached Debrid streams only, rejects `[RD download]` placeholder clips, rejects undersized media, allows `application/force-download`, and normalizes Plex-facing responses to `application/octet-stream`.
- Live source selection now prefers 720p/1080p H.264-style sources and demotes 4K, HEVC/x265, remux, DV/HDR, and cam-style releases.
- Request libraries are local-file backed only. No `.strm` files remain in ScarFLIX request libraries.
- Legacy request placeholders and request/materialize automation remain as fallback, not the main Stremio-like playback path.
- qBittorrent/Prowlarr/Radarr/Sonarr remain fallback and orchestration lanes, not the only resolver path.
- Rolling TMDb seeding now uses Plex folder lanes for Stremio-like categories under `_Catalog`.
- A Plex self-test validates the real Plex-indexed media rows so the previous `s1001` class of failure is caught automatically.
- A new live proxy lane lets Streaming library `.strm` items resolve Torrentio/RD at play time instead of playing a placeholder.

## Completed
- Fixed the Plex `s1001 (Network)` failure by removing request-library `.strm` playback.
- Migrated 43 legacy `.strm` catalog/request items to local MP4 placeholders.
- Rewrote placeholders to unique files so Plex does not collapse them as renames.
- Added a small valid placeholder asset at `D:\PlexTools\Assets\scarflix_placeholder_small_av.mp4`.
- Validated a full success path with `Night of the Living Dead E2E (1968)`: catalog -> request -> resolver -> materializer -> Plex DB stream verification.
- Added health/status publishing.
- Added rolling TMDb catalog seeding.
- Added category-aware catalog lanes for Trending, Popular, Top Rated, Now Playing/On The Air, Upcoming, and Discover.
- Added no-source retry policy so failed source lookups can return to CATALOG instead of dead-ending.
- Added catalog enrichment for legacy placeholder records, using TMDb and adjacent request metadata.
- Added Plex-facing self-test automation.
- Added live Streaming-library `.strm` catalog generation.
- Added live proxy self-test; `12 Angry Men (1957)` and `Night of the Living Dead (1968)` pass live HEAD and Range checks.
- Retired old placeholder-only catalog folders from ScarFLIX request libraries into archive, so users do not keep selecting 5-second trigger videos.
- Retired old `_ScarFLIXv2` and `_ScarFLIXv2_Direct` folders from Streaming libraries so users do not keep selecting stale proxy-key entries.
- Fixed the Real-Debrid placeholder bug by rejecting tiny RD "download in progress" clips before Plex can play them.
- Verified Plex-facing LAN `.strm` URLs for `12 Angry Men (1957)` and `Night of the Living Dead (1968)` return real media-sized byte-range streams.

## Current Health
- Overall health: PASS.
- Request-library `.strm` files: 0.
- Plex request-library `.strm` parts: 0.
- Plex request-library local media parts: 7.
- Plex request-library video/audio streams: 7/7.
- Request-library catalog placeholders: 0.
- Plex self-test: PASS.
- Live self-test: PASS.
- Live `.strm` entries indexed by Plex: 80.
- Old `_ScarFLIXv2` / `_ScarFLIXv2_Direct` Plex parts: 0.
- Latest live self-test sample: 5 checked, 5 passed.
- `12 Angry Men (1957)`: PASS, 734077147 bytes, Range 206.
- `Night of the Living Dead (1968)`: PASS, 59472710133 bytes, Range 206.

## Active Scheduled Tasks
- `ScarFLIX_v2_RequestServer`
- `ScarFLIX_v2_StreamProxy`
- `ScarFLIX_v2_StremioDirectResolver`
- `ScarFLIX_v2_MaterializeReady`
- `ScarFLIX_v2_CatalogPlayWatcher`
- `ScarFLIX_v2_HealthStatus`
- `ScarFLIX_v2_CatalogSeeder`
- `ScarFLIX_v2_CatalogEnricher`
- `ScarFLIX_v2_LiveCatalogSeeder`
- `ScarFLIX_v2_LiveSelfTest`
- `ScarFLIX_v2_RetirePlaceholderCatalog`
- `ScarFLIX_v2_RetryPolicy`
- `ScarFLIX_v2_PlexSelfTest`

## Next Work
- Keep expanding live catalog coverage incrementally through the rolling TMDb seeder.
- Continue improving source ranking so Plex clients get the most compatible cached source available.
- Add no-live-source fallback routing into Decypharr/Zurg/Radarr/Sonarr materialization for titles with no cached admitted live source.
- Monitor Plex scan time and database growth as catalog count increases.

## NEED JASON
- None.
