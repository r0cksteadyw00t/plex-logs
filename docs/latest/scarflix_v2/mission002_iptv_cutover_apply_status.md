# Mission 002 IPTV Threadfin Virtual Adapter Apply

**Updated UTC:** 2026-06-14T19:34:09Z  
**Status:** PASS_THREADFIN_VIRTUAL_ADAPTER_READY_FOR_PLEX_ATTACH

## Safety

- IPTV only: true
- Physical tuner used: false
- Plex touched: false
- ScarFLIX modified: false
- Cutover enabled: false
- Active Plex sessions: 0

## Actions

- active_m3u_xmltv_copied_from_held_package
- threadfin_container_start_requested

## Warnings

- docker_compose_reported_nonzero_but_container_is_running

## Errors

- none

## Decision

This script starts only the Threadfin virtual IPTV adapter when gates permit. It does not configure Plex Live TV/DVR automatically and it does not use physical TV tuner hardware.
