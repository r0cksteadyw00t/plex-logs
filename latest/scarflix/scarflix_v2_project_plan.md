# ScarFLIX v2 Project Plan

Last refresh UTC: 2026-05-30T09:47:45Z

## Target Experience
Plex clients should feel as close to Stremio as Plex permits:
- browse broad movie and TV catalogs directly in Plex
- click/play a title and stream immediately through Torrentio/Real-Debrid when a cached source exists
- fall back to request/materialized playback only when live streaming is not viable

## Design Contract
- Primary browsing lives in the Streaming libraries under `_ScarFLIXLive`.
- Live catalog `.strm` files point to the local ScarFLIX proxy, not directly to RD/Torrentio.
- The proxy resolves Torrentio/Real-Debrid at play time and only admits cached Debrid streams.
- Reject `[RD download]` placeholder clips and any media below the minimum real-media size.
- Prefer 720p/1080p H.264-style cached streams before 4K, HEVC/x265, remux, DV/HDR sources.
- Do not rely on `.strm` playback inside ScarFLIX request libraries.
- Request placeholders and materialized local files remain the fallback lane.
- Catalog growth is rolling and category-aware because Plex cannot dynamically browse the full TMDb/Stremio universe without local entries.

## Stage Status
- Stage 1 Playback blocker: COMPLETE.
- Stage 2 Request/catalog hardening: COMPLETE.
- Stage 3 End-to-end validation: COMPLETE.
- Stage 4 Health/status publishing: COMPLETE.
- Stage 5 Catalog expansion scaffold: COMPLETE.
- Stage 6 Category-aware catalog lanes: COMPLETE.
- Stage 7 No-source retry policy: COMPLETE.
- Stage 8 Plex-facing self-test automation: COMPLETE.
- Stage 9 Legacy catalog enrichment: COMPLETE.
- Stage 10 Live proxy catalog lane: COMPLETE for initial movie catalog proof.
- Stage 11 Placeholder catalog retirement: COMPLETE.
- Stage 12 RD placeholder rejection and cached-source ranking: COMPLETE.

## Active Automation
- `ScarFLIX_v2_LiveCatalogSeeder`: writes live `.strm` catalog entries into Streaming libraries.
- `ScarFLIX_v2_LiveSelfTest`: validates live `.strm` URLs with HEAD, Range, and minimum real-media size checks.
- `ScarFLIX_v2_RetirePlaceholderCatalog`: archives placeholder-only request-library catalog folders after live catalog generation.
- `ScarFLIX_v2_CatalogSeeder`: daily rolling TMDb catalog expansion.
- `ScarFLIX_v2_CatalogEnricher`: daily TMDb metadata enrichment for legacy placeholders.
- `ScarFLIX_v2_CatalogPlayWatcher`: detects Plex placeholder play and creates request.
- `ScarFLIX_v2_StremioDirectResolver`: resolves request to admitted Debrid-backed stream.
- `ScarFLIX_v2_MaterializeReady`: downloads/links READY media locally and verifies Plex streams.
- `ScarFLIX_v2_RetryPolicy`: returns retryable/no-source failures to CATALOG for later attempts.
- `ScarFLIX_v2_PlexSelfTest`: checks Plex DB media rows for local files with video/audio streams.
- `ScarFLIX_v2_HealthStatus`: publishes current health.

## Next Implementation Steps
1. Continue rolling live catalog expansion while monitoring Plex DB size and scan time.
2. Improve source ranking and compatibility scoring using cached stream metadata and admission results.
3. Route no-live-source titles to Decypharr/Zurg/Radarr/Sonarr materialization fallback.
4. Evaluate plex_debrid/Comet/AIOStreams-style resolvers as optional upstream source aggregation, not as the primary Plex play trigger.
5. Add richer Plex-facing artwork/metadata where `.strm` matching is weak.

## Current Acceptance
- Request-library `.strm` count is zero.
- Plex request-library `.strm` parts are zero.
- Plex local media parts all have video/audio streams.
- A controlled catalog item has completed the full request-to-ready path.
- Plex self-test is scheduled and currently PASS.
- Live `.strm` self-test is scheduled and currently PASS.
- Placeholder-only request-library catalog entries have been retired.
- Stale `_ScarFLIXv2` / `_ScarFLIXv2_Direct` Streaming-library entries have been retired.
- RD "download in progress" static clips are rejected before Plex playback.
- `12 Angry Men (1957)` and `Night of the Living Dead (1968)` pass real media-sized live stream checks.
