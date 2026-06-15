# Mission 002 Plex Online Channels Suppression

## User Outcome

Plex Live TV should expose only the curated Mission 002 IPTV/Threadfin source. Plex-owned default/free "Live TV on Plex" channels should not be visible as the primary user-facing TV experience.

## Preferred Fix

Plex's durable supported control is account-level **Online Media Sources** disablement for the Plex free Live TV source. The existing worker `jasonos/iptv/scripts/Invoke-Mission002PlexOnlineSourcesCuratedOnly.ps1` attempts that path by setting:

- `tv.plex.provider.epg = opt_out`
- `tv.plex.provider.vod = opt_out`
- `includeDiscoverSource = opt_out`
- `includeMetadataInSearch = opt_out`
- `includeAvailabilities = opt_out`

That path requires a valid Plex account token or authenticated account session. Local server tokens currently fail Plex account API validation with HTTP 401, so the supported account-level opt-out remains blocked until a valid account token/session is available.

## Current Reversible Workaround

`jasonos/iptv/scripts/Invoke-Mission002PlexOnlineChannelsSuppression.ps1` applies a narrow Windows hosts-file suppression for the Plex free-live-TV provider endpoint:

- Blocks only `epg.provider.plex.tv`.
- Does not block Plex metadata, sign-in, account, or library domains.
- Does not touch the Plex server database.
- Does not restart Plex.
- Does not change Threadfin, M3U, XMLTV, or any physical tuner setting.
- Is reversible through `-Mode RollbackHostsBlock`.

The script writes status to:

- `D:\PlexTools\public\latest\scarflix_v2\mission002_plex_online_channels_suppression_status.json`
- `D:\PlexTools\public\latest\scarflix_v2\mission002_plex_online_channels_suppression_status.md`

## Limitation

This workaround is local to the Windows/Plex host. If a Plex client fetches Plex online channels directly from Plex cloud rather than through the host resolver path, the client may still show Plex-owned channels until account-level Online Media Sources disablement or router/DNS-level suppression is applied.

## Rollback

Run:

```powershell
powershell -NoLogo -NoProfile -ExecutionPolicy Bypass -File "jasonos\iptv\scripts\Invoke-Mission002PlexOnlineChannelsSuppression.ps1" -Mode RollbackHostsBlock
```

The apply mode backs up the hosts file under `D:\PlexTools\Backups\mission002_plex_online_channels_suppression_<UTC>\hosts.bak`.
