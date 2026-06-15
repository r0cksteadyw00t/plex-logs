# Mission 2 Plex Account Opt-Out Chrome Status

**Updated UTC:** 2026-06-15T05:33:23Z  
**Status:** PASS_ACCOUNT_ONLINE_MEDIA_SOURCES_DISABLED

## Result

The Codex Chrome Extension bridge connected after a clean reset. Plex Web was opened through the local Plex session and the official account-level **Online Media Sources** settings were updated.

## Applied Account Settings

- Live TV: Disabled
- Movies & Shows: Disabled
- Discover Source: Disabled
- Display "More Ways to Watch" search results: Disabled
- Display availabilities from other streaming services on detail pages: Disabled

## Verification

After reloading Plex Home, the page no longer showed Live TV, Movies & Shows, Discover, Crunchyroll, Available on Plex, or More Ways to Watch indicators in the captured visible text.

## Safety

- IPTV only: true
- Physical tuner used: false
- Plex database touched: false
- Plex restarted: false
- Metadata/sign-in/account domains blocked: false
- Existing hosts suppression remains active as defense in depth only.

## Next Safe Action

Relaunch Plex clients. If a client still shows Plex Channels, verify it is signed into the same 0cksteady account and has refreshed its sidebar cache.