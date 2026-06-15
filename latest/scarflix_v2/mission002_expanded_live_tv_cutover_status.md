# Mission 002 Expanded AFL Live TV Cutover - PASS

Updated UTC: 2026-06-15T09:13:43Z

Status: PASS_EXPANDED_AFL_CURATED_LIVE_TV_USER_VERIFIED

User outcome delivered: Plex's real Live TV/DVR guide is populated with the expanded 47-channel curated IPTV lineup, including 19 AFL-relevant Seven, 7mate, and 7plus channel mappings.

## Counts

- Active curated M3U channels: 47
- Threadfin lineup channels: 47
- Plex enabled DVR mappings: 47
- Plex EPG channel tags: 47
- AFL-relevant Plex mappings: 19
- AFL stream probe: 17/17 PASS after targeted retry

## AFL Channels Now In Plex Mapping

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

## Verification

- Threadfin virtual tuner is reachable and reports 47 lineup channels.
- Plex DVR mapping now has 47 enabled mappings and 19 AFL-relevant mappings.
- Plex XMLTV provider DB has 47 channel tags and 19 AFL-relevant tags.
- AFL stream probe status is PASS_AFL_CHANNELS_STREAMABLE_AFTER_RETRY.

## Safety

IPTV-only remains enforced. No physical tuner was used. PAUSE_PUBLICATION remains active for ScarFLIX. No ScarFLIX publication or catalogue expansion was performed. The raw all-provider channel catalogue is used only as input data; Plex receives the curated selection only.

## Held

FIFA+ remains held after the earlier ffmpeg segment-load failure and should not be added until separately validated.
