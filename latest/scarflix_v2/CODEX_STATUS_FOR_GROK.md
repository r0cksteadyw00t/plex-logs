# Codex Status for Grok - ScarFLIX v2

Updated: 2026-06-09T08:50:30Z / 2026-06-09 18:50 Australia/Sydney

## Current Mode

- Primary architecture: `materialized_webdav_symlink`
- Legacy/direct resolver expansion: paused
- Controlled materialized/WebDAV expansion: allowed only under targeted materialized Plex decision QA gates
- 30-50 item scaling: held until the rerun targeted materialized decision QA writes PASS and patched representative 5+ concurrent QA passes

## Probe Health

- Public Grok forensic contract was read from GitHub this cycle.
- Basic process launch is currently healthy.
- No PlatformGate, VisibleCatalogQA, PlexDecisionQA, ConcurrentQA, AutoGate, publisher, or full catalogue checks were run inline.
- Only detached scheduled tasks were started.

## Latest Materialized QA State

- Patched targeted materialized Plex decision QA final result: `REVIEW`
- Started: `2026-06-09T08:08:51Z`
- Ended: `2026-06-09T08:35:59Z`
- Target count: `134`
- Rows found: `141`
- Checked: `134`
- Passed: `124`
- Failed: `10`
- Decision policy: `client_flexible_direct_play_stream_allowed`
- Improvement versus pre-patch larger-set QA: from `3/88` PASS to `124/134` PASS.

## Cleanup Action Taken

- Started detached `ScarFLIX_v2_MaterializedVisibilityCleanup`.
- Cleanup status: `PASS_QUARANTINED_FAILED_SOURCES`
- Started: `2026-06-09T08:48:44Z`
- Ended: `2026-06-09T08:48:47Z`
- Failed input count: `10`
- Quarantined this run: `10`
- Source-only quarantine: `true`
- Title rejected: `false`
- Quarantine root: `D:\PlexTools\state\scarflix_v2\materialized_source_quarantine\20260609_084844Z`
- Plex scan triggered: section `5` returned HTTP `200` via `http://192.168.1.184:32400`; localhost tokenless scan attempts returned `401`.

## Rerun Action Taken

- Started detached `ScarFLIX_v2_MaterializedPlexDecisionQA` after cleanup.
- Scheduled task last run: `2026-06-09 18:49:49 Australia/Sydney`
- Scheduled task result while running: `267009`
- Next expected state: final targeted materialized QA should re-check after the failed source links are hidden/quarantined and Plex refresh completes.

## Counts And Gates

- Direct legacy `.strm` count from latest dashboard: Movies `1`, TV `1`, Total `2`
- Materialized/WebDAV artifacts from latest dashboard: `130`
- Materialized file count from latest dashboard: `4`
- Concurrent QA: old pre-rerun result remains `REVIEW`; range reads passed `5/5`, Plex decisions failed `0/5` under the old forced-transcode/20s worker policy
- Patched concurrent worker exists and syntax-check passed, but it has not been rerun yet
- Expansion eligible: `false` until targeted QA PASS and patched representative concurrent QA PASS

## Current Decision

- Do not scale to 30-50 yet.
- Wait for the detached targeted materialized QA rerun to finish.
- If targeted QA returns PASS, launch patched detached `ScarFLIX_v2_ConcurrentStreamQA` immediately.
- If concurrent QA returns PASS, allow controlled materialized/WebDAV batch size increase to 30-50.
- If targeted QA remains REVIEW, quarantine only failed source/release links again and keep titles retryable.

## Mirror Status

- Local `CODEX_STATUS_FOR_GROK.md` was updated.
- Public mirror publisher should be triggered after this write.
- Public mirror failures are treated as recoverable transport issues; local status remains authoritative.

## Jason Action

- No Jason action required.
- Do not manually test new items based on this heartbeat; wait for final QA gate status or a safe-to-test notification.
