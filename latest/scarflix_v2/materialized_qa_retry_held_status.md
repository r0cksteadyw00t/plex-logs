# Materialized QA Retry-Held Source Status

- Status: TRACKING_RETRY_SOURCES
- Updated UTC: 2026-06-14T00:48:50Z
- Threshold: 3
- Tracked: 11
- Held: 0
- Publication allowed: false
- Broad expansion allowed: false

Policy: source/release-only retry and quarantine. Titles remain wanted and retryable.

## Items

- Amadeus: TRACKING_RETRY; failures=1; held=false; reason=HTTP 400
- American Pie: Reunion: TRACKING_RETRY; failures=1; held=false; reason=HTTP 400
- Anna: TRACKING_RETRY; failures=1; held=false; reason=HTTP 400
- Annabelle: TRACKING_RETRY; failures=1; held=false; reason=Layered streaming validation blocked Plex decision: webdav_head_timeout
- Armageddon: TRACKING_RETRY; failures=1; held=false; reason=Layered streaming validation blocked Plex decision: webdav_head_timeout
- The Ballerina: TRACKING_RETRY; failures=1; held=false; reason=Layered streaming validation blocked Plex decision: webdav_head_timeout
- Commando: TRACKING_RETRY; failures=1; held=false; reason=Layered streaming validation blocked Plex decision: webdav_head_upstream_server_error
- Escape Plan 2: Hades: TRACKING_RETRY; failures=1; held=false; reason=Layered streaming validation blocked Plex decision: webdav_head_upstream_server_error
- Final Destination 5: TRACKING_RETRY; failures=1; held=false; reason=Layered streaming validation blocked Plex decision: webdav_head_timeout
- Home: TRACKING_RETRY; failures=1; held=false; reason=Layered streaming validation blocked Plex decision: webdav_head_upstream_server_error
- ScarFLIX Part 31696108f69a37b9: TRACKING_RETRY; failures=1; held=false; reason=Layered streaming validation blocked Plex decision: webdav_head_upstream_server_error

Next action: After the threshold, quarantine only the failed source/release and keep the title wanted for alternate candidates.
