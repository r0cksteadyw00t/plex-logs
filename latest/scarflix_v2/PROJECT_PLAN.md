# ScarFLIX / JasonOS Prime Project Plan

## Active Priority - Playback First Recovery

**Updated UTC:** 2026-06-13T07:23:19Z  
**Status:** PLAYBACK_FIRST_RECOVERY_ACTIVE_COMMAND_LAUNCH_DEGRADED

Jason reports Plex movie playback is still returning `Playback Error: Content is unavailable`. This overrides catalogue expansion as the active priority.

## Current Decision

Do not continue Path 2 scaling or catalogue expansion until Plex-client playback is proven reliable on a small Watch Now lane. Indexed Plex metadata and Section 5 visibility are not sufficient success criteria.

## Evidence

- Local command launch is degraded: `cmd /c echo alive` timed out after 5 seconds.
- A targeted playback-first task-pause retry did not return within 120 seconds.
- Previous recovery established that Plex/WebDAV/rclone can become healthy while playback still remains unreliable due to latency/source failures and automation pressure.
- Earlier WebDAV range/HEAD checks identified a small candidate lane, but that is not equivalent to Plex-client verified playback.
- Public dashboard may show Sentinel/Orchestrator PASS while materialized playback decision and sample playback remain REVIEW/FAIL.

## Safety Rails

- Keep `PAUSE_PUBLICATION=true`.
- Do not run broad QA, PlatformGate, VisibleCatalogQA, PlexDecisionQA, ConcurrentQA, AutoGate, publisher, full catalogue checks, broad cleanup, deletion, source mutation, path rewrite, Plex DB mutation, or expansion.
- Keep only core services alive: Plex, rclone mount keepalive, WebDAV/stream bridge, PlexWatchdog, PlaybackPathRecovery, Sentinel, Orchestrator, and minimal status.
- Hold non-critical QA/probe/Path2/campaign/FastTrack/public mirror embellishment workers until playback stabilizes.

## Immediate Plan

1. Enforce watching-first quiet mode through local workers once command launch recovers.
2. Let rclone/WebDAV settle without automated playback probes competing for streams.
3. Verify a tiny Plex-client Watch Now lane end-to-end.
4. If the lane still fails, isolate one title through Plex metadata, local path, WebDAV range, and Plex session/transcode logs.
5. Only after verified Plex-client playback should Path 2 or catalogue expansion resume.

## Watch Now Candidates For Next Verification

Previously WebDAV-responsive candidates: Gremlins, Anna, Annabelle, Annihilation, Armageddon, and Battleship. These are not yet cleared as fully Plex-client verified in the current degraded window.

## Public Handoff

- Grok handoff: https://raw.githubusercontent.com/r0cksteadyw00t/plex-logs/main/latest/scarflix_v2/GROK_HANDOFF_FOR_GROK.md
- Playback status: https://raw.githubusercontent.com/r0cksteadyw00t/plex-logs/main/latest/scarflix_v2/playback_recovery_mode_status.md
- Codex status: https://raw.githubusercontent.com/r0cksteadyw00t/plex-logs/main/latest/scarflix_v2/CODEX_STATUS_FOR_GROK.md
