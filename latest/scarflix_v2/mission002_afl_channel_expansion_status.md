# Mission 002 AFL Channel Expansion - PASS

Updated UTC: 2026-06-15T09:13:43Z

Status: PASS_AFL_CHANNELS_EXPANDED_AND_STREAM_VERIFIED

User outcome: Plex real Live TV/DVR now includes the curated AFL-relevant Seven, 7mate, and 7plus IP streams from the all-Australia IPTV feed.

## Current Counts

- Active curated M3U channels: 47
- Threadfin lineup channels: 47
- Plex enabled DVR mappings: 47
- Plex EPG channel tags: 47
- AFL-relevant Plex mappings: 19
- AFL stream probe: 17/17 PASS after targeted retry

## AFL Channels Enabled

- 7 Adelaide
- 7 Brisbane
- 7 Cairns
- 7 Mackay
- 7 Melbourne
- 7 Perth
- 7 Rockhampton
- 7 Sunshine Coast
- 7 Sydney
- 7 Toowoomba
- 7 Townsville
- 7 Wide Bay
- 7mate Adelaide
- 7mate Brisbane
- 7mate Melbourne
- 7mate Perth
- 7mate Regional
- 7mate Sydney
- 7plus AFL Live

## Verification Evidence

- Threadfin verifier: PASS_THREADFIN_VIRTUAL_ADAPTER_REACHABLE, active M3U 47, lineup 47.
- Plex DVR mapping: 47 enabled mappings, 19 AFL-relevant Seven/7mate/7plus mappings.
- Plex EPG DB: 47 channel tags, 19 AFL-relevant tags, 7118 metadata items, 9806 media items.
- AFL stream probe: PASS_AFL_CHANNELS_STREAMABLE_AFTER_RETRY, 17 checked, 17 passed, 0 failed.
- 7 Adelaide initially returned a zero-byte timeout but passed 3/3 targeted 12-second retries.

## Safety

- IPTV-only. No physical tuner was used.
- PAUSE_PUBLICATION remains preserved for ScarFLIX.
- No ScarFLIX publication or catalogue expansion occurred.
- Backups were created before package and Plex DVR mapping changes:
  - D:\PlexTools\Backups\mission002_afl_channel_expansion_20260615T085452Z
  - D:\PlexTools\Backups\mission002_afl_plex_dvr_mapping_update_20260615T090332Z

## Remaining Hold

- FIFA+ remains held after the earlier ffmpeg segment-load failure and should not be added until it passes a separate bounded stream validation.
