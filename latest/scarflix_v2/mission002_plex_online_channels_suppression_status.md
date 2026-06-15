# Mission 2 Plex Online Channels Suppression Status

**Updated UTC:** 2026-06-15T05:13:07Z  
**Status:** PASS_STATUS_CAPTURED  
**Mode:** Status

## Intended User Outcome

Plex Live TV should show the curated Mission 2 IPTV/Threadfin source only, not Plex-owned default/free channels.

## Current Evidence

- Official account opt-out worker: BLOCKED_ACCOUNT_TOKEN_REQUIRED
- Threadfin status: PASS_THREADFIN_VIRTUAL_ADAPTER_REACHABLE
- Threadfin curated channel count: 4
- Hosts marker installed: True
- Blocked endpoint: epg.provider.plex.tv

## Safety

- IPTV only: true
- Physical tuner used: false
- Plex server database touched: false
- Plex restarted: false
- Metadata provider blocked: false
- Sign-in/account domains blocked: false
- Reversible: true

## Actions

- none

## Errors

- none

## Limitation

This local suppression blocks the Plex free-live-TV provider endpoint on this Windows/Plex host. Plex's official durable fix is still account-level Online Media Sources disablement; other client devices may need account opt-out or local/network DNS enforcement if they fetch Plex online channels directly.

## Rollback

Run this script with -Mode RollbackHostsBlock or restore the recorded hosts backup.

## Next Safe Action

Relaunch Plex clients and verify Live TV source list. If Plex Channels still appears on a non-Windows client, apply account-level Online Media Sources opt-out with a valid Plex account session or enforce this hostname block at the router/DNS level.