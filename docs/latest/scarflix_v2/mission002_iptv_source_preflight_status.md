# Mission 002 IPTV Source Preflight

**Updated UTC:** 2026-06-13T09:33:25Z  
**Status:** PASS_HELD_SOURCE_PREFLIGHT_READY

## Safety

- Plex touched: false
- ScarFLIX modified: false
- Publishes to Plex: false
- Network fetch performed: false
- Credentials present: false

## Counts

- Source count: 4
- Enabled source count: 4
- Provider URL count: 4
- Mapping count: 4

## Sources

- mjh_au_sydney_raw_tv / enabled: True / provider_url_present: True / mode: ACTIVE_VALIDATE_ONLY
- mjh_au_sydney_epg / enabled: True / provider_url_present: True / mode: ACTIVE_VALIDATE_ONLY
- mjh_au_melbourne_raw_tv / enabled: True / provider_url_present: True / mode: ACTIVE_VALIDATE_ONLY
- mjh_au_melbourne_epg / enabled: True / provider_url_present: True / mode: ACTIVE_VALIDATE_ONLY

## Decision

Preflight is held because source inputs are placeholders only. This is expected for Phase 0. No IPTV output may be pointed at Plex until legal provider URLs are added in validate-only mode, bounded stream validation passes, and Guardian reaches PASS.

## Next Safe Action

Add legal provider source inputs in held validate-only mode, then run bounded stream validation before Guardian can allow Plex output.
