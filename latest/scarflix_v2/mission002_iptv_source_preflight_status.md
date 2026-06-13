# Mission 002 IPTV Source Preflight

**Updated UTC:** 2026-06-13T09:15:12Z  
**Status:** HELD_NO_PROVIDER_INPUTS

## Safety

- Plex touched: false
- ScarFLIX modified: false
- Publishes to Plex: false
- Network fetch performed: false
- Credentials present: false

## Counts

- Source count: 2
- Enabled source count: 0
- Provider URL count: 0
- Mapping count: 4

## Sources

- au_public_fta_placeholder / enabled: False / provider_url_present: False / mode: HELD_CONFIG_ONLY
- afl_event_placeholder / enabled: False / provider_url_present: False / mode: HELD_CONFIG_ONLY

## Decision

Preflight is held because source inputs are placeholders only. This is expected for Phase 0. No IPTV output may be pointed at Plex until legal provider URLs are added in validate-only mode, bounded stream validation passes, and Guardian reaches PASS.

## Next Safe Action

Add legal provider source inputs in held validate-only mode, then run bounded stream validation before Guardian can allow Plex output.
