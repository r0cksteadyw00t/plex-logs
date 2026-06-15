# Mission 2 Plex Online Sources Curated-Only Status

**Updated UTC:** 2026-06-15T04:21:55Z  
**Status:** BLOCKED_ACCOUNT_TOKEN_REQUIRED  
**Apply requested:** False

## Intended User Outcome

Plex Live TV should show the personally curated Threadfin/DVR channels only. The current Threadfin lineup is already curated-only; extra default channels come from Plex-owned online media sources.

## Safety

- IPTV only: true
- Physical tuner used: false
- Plex server database touched: false
- Plex restarted: false
- Threadfin lineup curated-only: true

## Requested Opt-Out Settings

- tv.plex.provider.epg = opt_out
- tv.plex.provider.vod = opt_out
- includeDiscoverSource = opt_out
- includeMetadataInSearch = opt_out
- includeAvailabilities = opt_out

## Actions

- none

## Errors

- No available local token was accepted by plex.tv account endpoints. Local Plex server token may still be valid for server APIs but cannot change account online media source settings.

## Next Safe Action

Use a valid Plex account token or logged-in browser session to apply Online Media Sources opt-outs; Threadfin itself is already curated-only.