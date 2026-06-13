# Mission 002 IPTV Threadfin Virtual Adapter Apply

**Updated UTC:** 2026-06-13T10:43:52Z  
**Status:** FAIL_THREADFIN_DOCKER_START_FAILED

## Safety

- IPTV only: true
- Physical tuner used: false
- Plex touched: false
- ScarFLIX modified: false
- Cutover enabled: false
- Active Plex sessions: 0

## Actions

- active_m3u_xmltv_copied_from_held_package

## Warnings

- none

## Errors

- docker_compose_up_failed

## Decision

This script starts only the Threadfin virtual IPTV adapter when gates permit. It does not configure Plex Live TV/DVR automatically and it does not use physical TV tuner hardware.
