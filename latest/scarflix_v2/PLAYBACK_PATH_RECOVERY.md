# Playback Path Recovery

Last updated: 2026-06-13 15:54 Australia/Sydney.

## Purpose

`JasonOS_Prime_PlaybackPathRecovery` is the failback layer for Plex playback infrastructure. It exists because Plex can have indexed metadata while the backing WebDAV/rclone path is unavailable, which produces Plex client errors such as `Content is unavailable`.

This worker protects the playback path without starting ScarFLIX expansion or mutating catalogue state.

## Worker

- Script: `D:\PlexTools\Scripts\scarflix_v2\JasonOS_Prime_PlaybackPathRecovery.ps1`
- Hidden launcher: `D:\PlexTools\Scripts\scarflix_v2\hidden_tasks\JasonOS_Prime_PlaybackPathRecovery.vbs`
- Scheduled task: `JasonOS_Prime_PlaybackPathRecovery`
- Logon task: `JasonOS_Prime_PlaybackPathRecovery_Logon`

## Outputs

- `D:\PlexTools\public\latest\scarflix_v2\jasonos_prime_playback_path_recovery_status.json`
- `D:\PlexTools\public\latest\scarflix_v2\jasonos_prime_playback_path_recovery_status.md`
- `D:\PlexTools\public\latest\scarflix_v2\playback_recovery_mode_status.json`
- `D:\PlexTools\public\latest\scarflix_v2\playback_recovery_mode_status.md`

## Recovery Logic

1. Run bounded `cmd /c echo alive` checks.
2. Check WebDAV bridge health.
3. Start the Node-only WebDAV bridge only if it is unhealthy and no bridge process exists.
4. Probe `S:\media` and `S:\media\catalog` with bounded jobs so a stuck mount cannot hang the worker.
5. Run the existing rclone mount keepalive only when WebDAV is healthy and mount readiness is missing.
6. Check Plex identity.
7. Run cooldown-limited Watch Now WebDAV HEAD probes and label them as fresh or cached.

## Boundaries

Allowed:

- Start the Node WebDAV bridge.
- Run `ScarFLIX_v2_RcloneMountKeepalive.ps1`.
- Write status JSON/Markdown.
- Perform bounded, read-only health probes.

Forbidden:

- Publication.
- Expansion.
- Plex DB mutation.
- Source mutation.
- Path rewrites.
- Cleanup/deletion.
- PlatformGate or full QA.

## Current Result

Latest verified run at `2026-06-13T05:53:48Z`:

- Status: `PASS`.
- WebDAV bridge: PASS.
- Plex identity: PASS.
- rclone process count: `1`.
- `S:\media`: visible, no timeout.
- `S:\media\catalog`: visible, no timeout.
- No publication or expansion started.

## Operating Decision

Plex remains protected by `JasonOS_Prime_PlexWatchdog`; Plex service conversion is held unless it can be done under the same user/profile context. The safer immediate path is Plex watchdog plus WebDAV/rclone playback-path recovery.
