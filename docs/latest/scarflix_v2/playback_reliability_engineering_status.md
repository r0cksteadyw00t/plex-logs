# Playback Reliability Engineering Status

**Updated UTC:** 2026-06-13T21:03:55Z  
**Status:** ACTIVE_PLAYBACK_RELIABILITY_PUSH  
**Publication allowed:** false  
**Broad expansion allowed:** false  
**PAUSE_PUBLICATION:** must remain active

## Current Problem

Plex is running and its identity endpoint is healthy, but ScarFLIX playback is still hit-and-miss. The current failure pattern is not a single offline service. It is a reliability chain problem across:

- WebDAV bridge upstream access.
- rclone / WinFsp `S:\media\catalog` path readiness.
- Plex metadata/database visibility.
- Plex client decision endpoint stability.
- Windows process launch saturation when too many short-lived workers run.

The go-live campaign runner is active, but go-live remains blocked until repeatable Plex playback confidence is proven.

## Immediate Engineering Changes Applied

1. `ScarFLIX_v2_RcloneMountKeepalive.ps1`
   - Replaced unbounded `Test-Path` readiness checks with bounded path probes.
   - Status now records `media_path_timed_out`, `catalog_path_timed_out`, and detailed initial/final mount probes.
   - This prevents a stalled `S:` path from hanging the health worker or falsely looking healthy.
   - Added explicit `-AllowRestartStalledMount` mode. The normal keepalive remains non-disruptive; the go-live runner can request a rclone mount restart only after it has already confirmed no active Plex sessions.

2. `ScarFLIX_v2_MaterializedPlexDecisionQA_Node.js`
   - Plex decision QA now prefers `http://127.0.0.1:32400` before the LAN address.
   - Added keep-alive HTTP agents with one socket to reduce connection churn.
   - Added bounded retry/fallback for transient `timeout`, `socket hang up`, `ECONNRESET`, HTTP `0`, `408`, `429`, and `5xx` decision failures.
   - Results now include `decision_attempts` so reviewers can see whether loopback or fallback succeeded.

3. `JasonOS_Prime_GoLive16hCampaignRunner.js`
   - Playback path recovery is now a hard precondition before bounded Materialized QA.
   - If playback path recovery is not `PASS`, the runner holds QA and stops the QA worker instead of adding pressure.
   - QA hold states are now written explicitly so stale `RUNNING_PLEX_DECISION_PROBES` files do not mislead dashboards.
   - Publication and broad expansion remain blocked.

## Larger Solution Space Under Review

These are the candidate strategies being actively considered or prepared:

- Make production Plex strictly playback-first: pause scans/indexing/background QA while active sessions exist.
- Keep Plex as the required front end, but route all automation through a verified `Watch Now` lane first.
- Treat WebDAV/rclone as a reliability layer with independent health gates before Plex QA.
- Prefer loopback Plex API calls from local automation; avoid LAN IP for local decision probes where possible.
- Add failed-source quarantine for repeated `socket hang up` / timeout rows while keeping titles wanted and retryable.
- Consider second Plex or Docker Plex only as isolated staging/indexing, never as a shared production database writer.
- Consider a user-session Plex watchdog / restart policy rather than LocalSystem Plex service, because `S:` and Plex profile visibility depend on the user context.
- Continue using GitHub/Grok peer review after each meaningful change.

## Current Go-Live Position

Not go-live ready yet.

Plex process health is good, Sentinel is low, and command launch is currently healthy. A fresh controlled recovery at `2026-06-13T21:13Z` returned `PASS`: `S:\media` and `S:\media\catalog` were responsive, and Watch Now HEAD probes for Gremlins and Anna returned HTTP 200. The correct next local action is to let the patched runner continue bounded recovery/QA cycles, then review whether loopback-first retries increase pass rate and reduce socket failures.

## Reviewer Questions

1. Should Plex decision endpoint success remain the go-live gate, or should it be supplemented by a smaller set of actual playback/range canaries?
2. Is rclone-on-`S:` still the right production playback path, or should WebDAV UNC / direct WebDAV filesystem presentation become primary?
3. Should repeated socket/timeout rows be quarantined immediately as source failures, or retried over multiple idle cycles first?
4. Would a staging Plex instance materially reduce production instability, provided it never writes to or shares the production Plex database?
5. What is the safest restart policy for Plex given that production Plex requires the interactive user profile and mounted media context?
