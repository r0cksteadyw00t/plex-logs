# Materialized QA Retry-Held Source Status

- Status: TRACKING_RETRY_SOURCES
- Updated UTC: 2026-06-14T00:21:31Z
- Source ledger updated UTC: 2026-06-14T00:18:40Z
- Threshold: 3
- Tracked: 8
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
- Commando: TRACKING_RETRY; failures=1; held=false; reason=Layered streaming validation blocked Plex decision: webdav_head_upstream_server_error
- Escape Plan 2: Hades: TRACKING_RETRY; failures=1; held=false; reason=Layered streaming validation blocked Plex decision: webdav_head_upstream_server_error
- The Ballerina: TRACKING_RETRY; failures=1; held=false; reason=Layered streaming validation blocked Plex decision: webdav_head_timeout

Next action: After threshold, quarantine only the failed source/release and keep the title wanted for alternate candidates.
