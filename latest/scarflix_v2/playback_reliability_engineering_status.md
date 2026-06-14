# Playback Reliability Engineering Status

## Current Update - 2026-06-14T00:36:58Z

**Status:** ACTUAL_GO_LIVE_DELIVERY_WINDOW_EXTENDED_AND_RUNNING  
**Publication allowed:** false  
**Broad expansion allowed:** false  
**PAUSE_PUBLICATION:** must remain active

Action taken:

- Extended local go-live campaign runner to match Jason's additional 24-hour exclusive Plex window.
- Runner restarted safely between bounded QA batches; Plex was not stopped.
- New end time: `2026-06-15T00:36:58Z`.
- New runner PID: `12560`.

Latest evidence:

- Cycle `102`: launch health `23 ms`; Sentinel `PASS / LOW`; Plex sessions `0`; Plex identity healthy.
- Bounded Materialized QA skip `35`, limit `4`: `3/4 PASS`, `1/4 REVIEW`.
- Retry ledger: tracked `9`, held `0`, threshold `3`.

## Current Update - 2026-06-14T00:20:27Z

**Status:** BOUNDED_QA_CONTINUES_SOURCE_UPSTREAM_503_TRACKED  
**Publication allowed:** false  
**Broad expansion allowed:** false  
**PAUSE_PUBLICATION:** must remain active

Latest bounded batch:

- Go-live runner cycle `100`.
- Launch health `17 ms`; Sentinel `PASS / LOW`; active Plex sessions `0`; Plex identity healthy.
- Materialized QA skip `27`, limit `5`: `4/5 PASS`, `1` source/upstream REVIEW.
- Newly tracked source: Escape Plan 2: Hades, reason `webdav_head_upstream_server_error`.
- Retry ledger now tracks `8` sources, holds `0`, threshold `3`.

Current gate:

- Keep running bounded batches. If any source reaches threshold, source-quarantine only and keep the title wanted/retryable.

## Current Update - 2026-06-14T00:06:03Z

**Status:** BOUNDED_PLAYBACK_QA_PASS_STREAK_RESUMED_NOT_GO_LIVE_READY  
**Publication allowed:** false  
**Broad expansion allowed:** false  
**PAUSE_PUBLICATION:** must remain active

Latest bounded batch:

- Go-live runner cycle `98`.
- Launch health `18 ms`; Sentinel `PASS / LOW`; active Plex sessions `0`; Plex identity healthy.
- Materialized QA skip `20`, limit `3`: `3/3 PASS`, `0` failed.
- Retry ledger: tracked `7`, held `0`, threshold `3`.

Current gate:

- Positive pass streak evidence resumed, but go-live remains `REVIEW_NOT_GO_LIVE_READY`. Continue bounded runner batches and source-retry policy only.

## Current Update - 2026-06-13T23:58:17Z

**Status:** PLAYBACK_DECISION_PATH_FIX_HOLDS_UPSTREAM_SOURCE_RELIABILITY_REMAINS  
**Publication allowed:** false  
**Broad expansion allowed:** false  
**PAUSE_PUBLICATION:** must remain active

Latest bounded batch:

- Batch skip `16`, limit `4`: `3/4 PASS`, `1/4 REVIEW`.
- Crank, Creed, and Dances with Wolves passed WebDAV/range layers and Plex decision HTTP `200`.
- Commando failed at WebDAV layer with HTTP `503 upstream_server_error`; fallback range also returned HTTP `503`.

Current blocker:

- Plex decision path/auth routing is now validated on additional rows.
- Remaining failures are specific source/upstream availability problems. They should be retried, source-quarantined after threshold, and replaced by alternate candidates without rejecting the title.
- Public retry ledger status is now exported as `materialized_qa_retry_held_status.*`; current first export is `TRACKING_RETRY_SOURCES`, tracked `7`, held `0`.

## Current Update - 2026-06-13T23:53:44Z

**Status:** PLAYBACK_DECISION_PATH_FIX_VALIDATED_PARTIAL_PASS  
**Publication allowed:** false  
**Broad expansion allowed:** false  
**PAUSE_PUBLICATION:** must remain active

Validated fixes:

- Plex registry LAN network parse issue fixed and backed up.
- Plex restarted after becoming unresponsive; identity endpoint is healthy.
- Materialized Plex Decision QA now uses tokenized full LAN metadata URL for Plex decision calls when token auth is available.
- Layered WebDAV validator now includes bounded HEAD retry and tiny range fallback for transient WebDAV stalls.

Latest evidence:

- Go-live campaign cycle 96 completed a bounded Materialized QA batch: `3/3 PASS`, `0` failed.
- Casino, Cloverfield, and Clueless passed symlink metadata, WebDAV HEAD, 4 MB range warmup, and Plex decision HTTP `200`.
- Decision path mode for all three: `tokenized_full_base_metadata_url`.

Current gate:

- Go-live remains blocked until repeated bounded batches pass and retry-held/transient rows are resolved. No publication or expansion is allowed yet.

**Updated UTC:** 2026-06-13T22:24:00Z  
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

Latest bounded QA evidence:

- Layered prechecks: `3/3 PASS`
- WebDAV HEAD: `3/3 HTTP 200`
- Temporary range warmup: `3/3 HTTP 206`, `4 MB` read and discarded per item
- Plex decision: `2/3 PASS`, `1/3` REVIEW/FAIL
- Current narrowed blocker: Plex decision auth/routing/endpoint behavior, not WebDAV delivery for this sample.

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
   - Added layered pre-decision validation for selected bounded QA candidates: WebDAV HEAD and a 4 MB discard-only range warmup must pass before Plex decision is called.
   - Service-context local checks are symlink/readlink metadata only; LocalSystem does not force-dereference `S:\media`.
   - Plex access selection now tries token-auth on all configured bases before no-auth fallback. Current evidence: loopback token auth returns HTTP `401`, LAN token auth returns HTTP `200`.

3. `JasonOS_Prime_GoLive16hCampaignRunner.js`
   - Playback path recovery is now a hard precondition before bounded Materialized QA.
   - If playback path recovery is not `PASS`, the runner holds QA and stops the QA worker instead of adding pressure.
   - QA hold states are now written explicitly so stale `RUNNING_PLEX_DECISION_PROBES` files do not mislead dashboards.
   - Publication and broad expansion remain blocked.

4. `ScarFLIX_v2_StreamingLayeredValidator.js`
   - New bounded read-only validator module for Materialized QA.
   - Writes `materialized_qa_layered_status.*` for peer review.
   - Does not persist media bytes and does not start publication, expansion, cache clearing, or path mutation.

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

Plex process health is good, Sentinel is low, and command launch is currently healthy. A fresh controlled recovery at `2026-06-13T21:13Z` returned `PASS`: `S:\media` and `S:\media\catalog` were responsive, and Watch Now HEAD probes for Gremlins and Anna returned HTTP 200. The correct next local action is to let the patched runner continue bounded recovery/QA cycles, then review whether token-auth LAN reduces Plex decision failures while layered WebDAV/range checks continue to pass.

## Reviewer Questions

1. Should Plex decision endpoint success remain the go-live gate, or should it be supplemented by a smaller set of actual playback/range canaries?
2. Is rclone-on-`S:` still the right production playback path, or should WebDAV UNC / direct WebDAV filesystem presentation become primary?
3. Should repeated socket/timeout rows be quarantined immediately as source failures, or retried over multiple idle cycles first?
4. Would a staging Plex instance materially reduce production instability, provided it never writes to or shares the production Plex database?
5. What is the safest restart policy for Plex given that production Plex requires the interactive user profile and mounted media context?
