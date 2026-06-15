# Mission 002 Corrected Live TV Cutover - PASS

Updated UTC: 2026-06-15T09:40:15Z

Status: PASS_CORRECTED_MELB_SYD_FTA_LIVE_TV

User outcome delivered: Plex real Live TV/DVR is corrected to Melbourne/Sydney-only free-to-air plus 7plus AFL. Regional Seven and 7mate variants have been removed.

## Counts

- Active curated M3U channels: 33
- Threadfin lineup channels: 33
- Plex enabled DVR mappings: 33
- Plex EPG channel tags: 33
- Active AFL-relevant channels: 5
- Forbidden regional FTA entries present: false

## Active AFL-Relevant Channels

- 7 Melbourne
- 7 Sydney
- 7mate Melbourne
- 7mate Sydney
- 7plus AFL Live

## Paid / Non-Aerial AFL State

- Fox Footy: HELD_NO_LEGAL_PLEX_COMPATIBLE_M3U
- Kayo Sports: HELD_PAID_OTT_ADAPTER_REQUIRED
- Foxtel / Fox Sports: HELD_PAID_OTT_ADAPTER_REQUIRED

These are the real non-aerial AFL sources for full coverage, but they are not exposed by the current legal Plex-compatible M3U/XMLTV input sources. They require a dedicated paid OTT adapter feasibility spike before Plex inclusion.

## Verification

- Threadfin virtual tuner is reachable and reports 33 lineup channels.
- Plex DVR mapping now has 33 enabled mappings and no regional Seven/7mate mappings.
- Plex XMLTV provider DB has 33 channel tags and no forbidden regional tags.
- Corrected AFL stream probe status is PASS_CORRECTED_AFL_CHANNELS_STREAMABLE, 5/5 PASS.

## Safety

IPTV-only remains enforced. No physical tuner was used. PAUSE_PUBLICATION remains active for ScarFLIX. No ScarFLIX publication or catalogue expansion was performed.
