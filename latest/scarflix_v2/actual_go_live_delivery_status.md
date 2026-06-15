# Actual Go-Live Delivery Status

**Updated UTC:** 2026-06-15T04:25:06Z  
**Status:** REVIEW_QA_RUNNING_EXPANSION_HELD  
**User priority:** TV first if movies and TV cannot progress concurrently.

## Materialized QA

- Status: RUNNING_PLEX_DECISION_PROBES
- Checked/passed/failed: 65 / 65 / 0
- Rows found: 122
- Retry-held sources: 0 held / 21 tracked

## Source Cleanup

- Latest exact source quarantine: Twister / ScarFLIX_part-b6caef61efed54f1
- Title rejected: false
- Publication allowed: false

## TV-First Expansion Queue

- Enriched unique TV shows: 122
- First wave: tv_active_2026_whole_show
- First-wave unique shows: 64
- Execution state: HELD_QA_GATE_REQUIRED
- Manifest: D:\PlexTools\state\jasonos_prime\catalogue_expansion\held_year_waves_enriched\tv_active_2026_whole_show.enriched.held.json

## Mission 2 IPTV

- Threadfin lineup is curated-only: 4 channels
- Channels: 7 Sydney, 7 Melbourne, 7mate, 7plus AFL Live
- Plex online-source cleanup status: BLOCKED_ACCOUNT_TOKEN_REQUIRED
- Blocker: Plex account Online Media Sources opt-out needs valid Plex account token or authenticated Chrome extension session.

## Safety

- PAUSE_PUBLICATION remains required.
- Publication started: false
- Broad expansion started: false
- Plex restarted: false
- Physical tuner used: false

## Next Safe Actions

1. Let detached full Materialized QA finish; quarantine exact failing sources only if more REVIEW rows appear.
2. If QA reaches PASS, run go-live readiness audit and keep TV-first wave execution held until delivery gates pass.
3. Apply Plex Online Media Sources opt-out once a valid account session/token is available so Plex Live TV shows only curated Threadfin/DVR channels.
4. Execute TV active/returning 2026 whole-show wave before movie waves when expansion is allowed.