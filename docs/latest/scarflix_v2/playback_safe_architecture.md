# Playback-Safe Architecture

Created: 2026-06-13  
Status: design ready, not applied during active playback

Production Plex remains the user-facing playback server. Background indexing, generated manifests, and future staging work must not compete with active streaming.

## Current Position

- Production Plex is playback-first.
- Stream-aware guarding is external to Plex and based on the Plex session API.
- Heavy indexing/analyzer activity is suppressed during active viewing.
- A second Plex instance is viable only as an isolated staging/indexing environment, not as a live production replacement.

## Practical Design

1. Keep production Plex focused on playback.
2. Use `JasonOS_Prime_PlaybackFirstStabilityGuard` to suppress background scanner/analyzer pressure.
3. Use `JasonOS_Prime_PlaybackQuietResume` to resume minimal work only after active sessions reach zero.
4. Use a future Docker/staging Plex instance only with separate config, ports, claim state, and read-only source mounts.
5. Promote only verified manifests/paths into production through existing gates.

## Not Applied During Playback

- No Plex restart.
- No Threadfin cutover.
- No Docker/staging Plex start.
- No Plex scan or refresh.
- No ScarFLIX QA, expansion, publication, deletion, cleanup, or path mutation.

## References

- https://support.plex.tv/articles/201553286-scheduled-tasks/
- https://support.plex.tv/articles/200289526-library/
- https://support.plex.tv/articles/201105343-advanced-hidden-server-settings/
- https://support.plex.tv/articles/201697383-why-is-plex-using-my-cpu/
- https://support.plex.tv/articles/204059436-finding-an-authentication-token-x-plex-token/
