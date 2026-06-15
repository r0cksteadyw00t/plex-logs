# Mission 2 Plex Account Opt-Out Chrome Status

**Updated UTC:** 2026-06-15T05:23:32Z  
**Status:** BLOCKED_CHROME_EXTENSION_DISABLED

## Result

The Codex Chrome Extension is installed in Chrome's selected Default profile, but it is disabled. The native host manifest is correct and Chrome is running.

## Impact

The official Plex account-level Online Media Sources opt-out cannot be applied through the logged-in browser session until the extension is enabled.

## Current Protection

The reversible local hosts suppression for pg.provider.plex.tv remains active, so the Plex host is still blocking the Plex-owned free Live TV provider endpoint locally.

## Next Safe Action

Enable the Codex Chrome Extension in Chrome, then retry the account opt-out path.