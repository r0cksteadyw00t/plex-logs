# Plex Availability Strategy

Last updated: 2026-06-13 12:54 Australia/Sydney.

## Current Decision

Use a user-context watchdog as the immediate protection against Plex Media Server exiting.

Why:

- Plex currently runs as the normal desktop/user app from `C:\Program Files\Plex\Plex Media Server\Plex Media Server.exe`.
- There is no `Plex Media Server` Windows service currently installed.
- `D:\PlexTools\bin\nssm.exe` is available, but running Plex as `LocalSystem` could use the wrong profile/appdata path and risk Plex seeing a different library configuration.
- A user-context scheduled watchdog preserves the same context Plex already uses while restoring it quickly if the process exits.

## Active Protection

Worker:

- `D:\PlexTools\Foundry\workers\JasonOS_Prime_PlexWatchdog.js`

Scheduled tasks:

- `JasonOS_Prime_PlexWatchdog`
  - Runs every 1 minute.
  - Starts Plex only if `Plex Media Server` is absent.
- `JasonOS_Prime_PlexWatchdog_Logon`
  - Runs at user logon.
  - Same safe start-only behavior.

Status:

- `D:\PlexTools\public\latest\scarflix_v2\jasonos_prime_plex_watchdog_status.json`
- `D:\PlexTools\public\latest\scarflix_v2\jasonos_prime_plex_watchdog_status.md`
- `D:\PlexTools\logs\jasonos_prime\jasonos_prime_plex_watchdog.log`

Safety:

- Does not kill Plex.
- Does not restart Plex if it is already running.
- Does not modify Plex preferences, ScarFLIX state, symlinks, `webdav_map.json`, or publication flags.

## NSSM Service Option

NSSM service mode is still a valid stronger option, but only if it is configured to run under the same Windows user account that owns the existing Plex profile.

Do not install Plex as a `LocalSystem` service unless the Plex profile path and library database location have been deliberately migrated or proven safe.

Required preconditions before NSSM service conversion:

1. Confirm the exact Plex data directory currently used by the desktop app.
2. Confirm the service account can access that same directory.
3. Confirm no duplicate Plex instance will start.
4. Back up Plex Preferences and the Plex database.
5. Install NSSM service with restart-on-exit policy.
6. Verify Plex identity, libraries, and Section 5 after service start.
7. Keep rollback path to desktop app/watchdog mode.

Recommended NSSM service name if promoted later:

- `PlexMediaServer_UserContext`

Current status:

- Held for review. Not installed in this run.
- Current watchdog mode is the active safe mitigation.
