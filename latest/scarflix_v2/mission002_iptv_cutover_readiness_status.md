# Mission 002 IPTV Cutover Readiness

**Updated UTC:** 2026-06-13T09:32:16Z  
**Status:** PASS_CUTOVER_PACKAGE_READY_HELD  
**Cutover enabled:** false

## Safety

- Plex touched: false
- ScarFLIX modified: false
- Publishes to Plex: false
- Generated outputs are held.
- This run fetched public IPTV/EPG source manifests only.

## Readiness Counts

- Required channels selected: 4 / 4
- Total selected channels: 4
- Parsed M3U entries: 366
- Stream checks OK: 4
- Stream checks failed: 0
- XMLTV channels: 4
- XMLTV programmes: 714

## Decisions

- au.7.sydney: SELECTED_HELD via mjh-seven-syd (mjh_au_sydney_raw_tv)
- au.7.melbourne: SELECTED_HELD via mjh-seven-mel (mjh_au_melbourne_raw_tv)
- au.7mate: SELECTED_HELD via mjh-7mate-syd (mjh_au_sydney_raw_tv)
- au.7plus.afl: SELECTED_HELD via mjh-7mate-mel (mjh_au_melbourne_raw_tv)

## Stream Checks

- au.7.sydney: ok=True, http=200, ms=1971, bytes=41967
- au.7.melbourne: ok=True, http=200, ms=2596, bytes=42099
- au.7mate: ok=True, http=200, ms=1557, bytes=41673
- au.7plus.afl: ok=True, http=200, ms=1585, bytes=41841

## Held Artifacts

- Master M3U: D:\PlexTools\state\jasonos_prime\iptv\cutover_ready\master.cutover.held.m3u
- Master XMLTV: D:\PlexTools\state\jasonos_prime\iptv\cutover_ready\master.cutover.held.xml
- Decision manifest: D:\PlexTools\state\jasonos_prime\iptv\cutover_ready\iptv_cutover_decision_manifest.json
- Guardian report: D:\PlexTools\state\jasonos_prime\iptv\cutover_ready\iptv_cutover_guardian_report.json
- Rollback plan: D:\PlexTools\state\jasonos_prime\iptv\cutover_ready\iptv_cutover_rollback_plan.md

## Guardian Decision

Cutover package is generated but held. Plex cutover requires explicit cutover_enabled=true plus a production playback quiet window. Do not point Plex at these outputs while active playback is present or while Plex scanner/analyzer jobs are still being suppressed.
