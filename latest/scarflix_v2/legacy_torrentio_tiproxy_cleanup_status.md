# Legacy Torrentio Tiproxy Cleanup Status

**Updated UTC:** 2026-06-13T08:45:53Z  
**Status:** PASS_LEGACY_TIPROXY_DISABLED

TorrentioTorznabProxy was the source of the visible reboot console:

powershell -NoLogo -NoProfile -ExecutionPolicy Bypass -File "D:\PlexTools\Scripts\tiproxy.ps1"

Action taken: stopped and disabled the scheduled task. No files were deleted. Backup/export path: D:\PlexTools\Backups\task_cleanup_20260613T084340Z.

Rationale: 	iproxy.ps1 is a legacy Torrentio Torznab proxy on port 9788 and is not part of the current Plex-first materialized/WebDAV playback path. Disabling it is reversible and reduces visible startup noise/background process pressure.

Verification:

- Scheduled task state: Disabled
- Runtime process check: NO_TIPROXY_RUNTIME_PROCESSES
- Registry startup check: NO_REGISTRY_TIPROXY_HITS
- Startup folder check: NO_STARTUP_FOLDER_TIPROXY_HITS
- Command launch check: cmd /c echo alive = 254ms
- PAUSE_PUBLICATION: preserved

