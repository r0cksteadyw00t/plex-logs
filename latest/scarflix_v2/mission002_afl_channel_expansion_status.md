# Mission 002 AFL Source Scope Correction - PASS

Updated UTC: 2026-06-15T09:39:50Z

Status: PASS_CORRECTED_FTA_SCOPE_WITH_PAID_AFL_HELD

Correction applied: free-to-air channels are Melbourne/Sydney only. Regional Seven and 7mate channels have been removed from the active Plex/Threadfin lineup.

## Active Lineup

- Active curated M3U channels: 33
- Threadfin lineup channels: 33
- Plex enabled DVR mappings: 33
- Plex EPG channel tags: 33
- Forbidden regional FTA entries present: false

## AFL-Relevant Active Channels

- 7 Melbourne
- 7 Sydney
- 7mate Melbourne
- 7mate Sydney
- 7plus AFL Live

## Verification

- Threadfin verifier: PASS_THREADFIN_VIRTUAL_ADAPTER_REACHABLE.
- Plex DVR mapping: 33 enabled mappings, no Brisbane/Adelaide/Perth/regional Seven or 7mate mappings.
- Plex EPG DB: 33 channel tags, 7067 metadata items, 7121 media items, no forbidden regional tags.
- Corrected AFL stream probe: PASS_CORRECTED_AFL_CHANNELS_STREAMABLE, 5/5 PASS.

## Paid / Non-Aerial AFL Sources

- Fox Footy: HELD - Required for every-game AFL coverage, but no configured legal Plex-compatible M3U/XMLTV source exposes it.
- Kayo Sports AFL live events: HELD - Official paid OTT app/DRM lane; needs a subscription-backed legal adapter before Plex Live TV inclusion.
- Foxtel / Fox Sports AFL live events: HELD - Official paid broadcast lane; held until a Plex-compatible, ToS-compliant IP source adapter exists.

Current blocker: Fox Footy, Fox Sports, and Kayo are required for complete every-game AFL coverage, but the configured legal Plex-ready M3U/XMLTV inputs do not expose those channels. They are held as a paid OTT adapter requirement, not substituted with regional FTA channels.

## Safety

- IPTV-only. No physical tuner was used.
- PAUSE_PUBLICATION remains preserved for ScarFLIX.
- No ScarFLIX publication or catalogue expansion occurred.
- Backup root: D:\PlexTools\Backups\mission002_correct_fta_scope_and_afl_paid_gap_20260615T093349Z
