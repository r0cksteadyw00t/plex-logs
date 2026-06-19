# Mission 002 IPTV Threadfin Virtual Adapter Verification

**Updated UTC:** 2026-06-15T12:19:47Z  
**Status:** PASS_THREADFIN_VIRTUAL_ADAPTER_REACHABLE

## Safety

- IPTV only: true
- Physical tuner used: false
- Plex touched: false
- ScarFLIX modified: false

## Package

- Held M3U exists: True
- Held XMLTV exists: True
- Decision manifest exists: True
- Held M3U channel count: 4
- Active M3U exists: True
- Active XMLTV exists: True
- Active M3U channel count: 33
- Expanded M3U exists: True
- Expanded XMLTV exists: True
- Expanded M3U channel count: 33
- Threadfin lineup parse status: PARSED
- Threadfin lineup channel count: 33
- Plex tuner base URL: redacted-url-9867f906ad99

## Container

- Docker available: True
- Container running: True
- Container line: jasonos-mission002-threadfin|Up 3 hours
- Error: 

## Endpoints

- redacted-url-efcfbe8382e6 ok=True, http=200, ms=58, error=
- redacted-url-386a3beb9592 ok=True, http=200, ms=10, error=
- redacted-url-1e2bd938c1b7 ok=True, http=200, ms=26, error=
- redacted-url-bc5c634221c0 ok=True, http=200, ms=13, error=

## Plex Tuner Entrypoint

- redacted-url-7a92281e03ce ok=True, http=200, ms=13, error=

## Decision

This verifier checks the IPTV virtual-adapter path and Plex's local tuner stream entrypoint. Plex Live TV/DVR attachment is not changed here. PASS requires Threadfin to expose at least one channel in /lineup.json and TCP 5004 to answer a bounded tuner request.


Public redaction applied: 2026-06-19T23:34:31.258Z
