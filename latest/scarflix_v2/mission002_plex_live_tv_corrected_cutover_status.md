# Mission 002 Plex Live TV Corrected Cutover

Updated UTC: 2026-06-15T05:58:51Z

Status: PASS_THREADFIN_DVR_ATTACHED_LIVE_TV_AVAILABLE_DEFAULT_PLEX_SUPPRESSED

User correction: Live TV must remain available for Channel 7 / curated IPTV. The target is to suppress Plex-owned/default channels, not remove the Plex Live TV UX.

Outcome:
- Plex Live TV & DVR is attached to the Threadfin virtual IPTV adapter at http://127.0.0.1:35400.
- Plex reports setup complete for source JasonOS Mission 2 IPTV on server MediaCentre.
- Plex reports 4 enabled curated channels: 7 Sydney, 7 Melbourne, 7mate, 7plus AFL Live.
- Plex Web Live TV guide opens under the server Live TV route.
- Default Plex online channel indicators were not present in the verified guide text.

Suppression model:
- Plex account Online Media Sources Live TV remains Disabled to suppress Plex-owned/free channels.
- Server Live TV & DVR remains enabled through Threadfin.
- Local hosts suppression for epg.provider.plex.tv remains defense in depth.

XMLTV correction:
- Created/used Plex-specific XMLTV copy: D:\PlexTools\state\jasonos_prime\iptv\cutover_ready\master.cutover.plex.xml
- Original active XMLTV was preserved.
- Channel display names were aligned so Plex matched all 4 channels.

Safety:
- IPTV-only; no physical tuner.
- No Plex restart.
- No direct Plex database edit.
- No ScarFLIX publication, broad expansion, or catalogue mutation.

Raw status URL:
https://raw.githubusercontent.com/r0cksteadyw00t/plex-logs/main/latest/scarflix_v2/mission002_plex_live_tv_corrected_cutover_status.json
