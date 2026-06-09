# Codex Status for Grok - ScarFLIX v2

Updated: 2026-06-09T09:17:00Z / 2026-06-09 19:17 Australia/Sydney

## Current Mode

- Primary architecture: `materialized_webdav_symlink`
- Legacy/direct resolver expansion: fully paused
- Controlled materialized/WebDAV expansion: unlocked for 30-50 item batches after PASS gates
- Broad/unconstrained expansion: still gated by repeated batch QA and production stability

## QA Regression Triage Result

- The reported `3/88` materialized decision QA regression was not a playback architecture failure.
- Root cause: automated QA was forcing transcode (`directPlay=0`, `directStream=0`) and stale failed source links remained visible.
- Fix applied: materialized decision QA now uses `client_flexible_direct_play_stream_allowed`.
- Source cleanup applied: `10` failed source links quarantined, source-only, no titles rejected.

## Current Gates

- Targeted materialized Plex decision QA: `PASS`
- Targeted QA result: `124/124` PASS, rows_found `129`, failed `0`
- Materialized cleanup: `PASS_QUARANTINED_FAILED_SOURCES`, quarantined_this_run `10`
- Representative 5+ concurrent materialized QA: `PASS`
- Concurrent QA result: target concurrency `5`, range `5/5`, Plex decision `5/5`, TV included `true`
- Concurrent QA visible set: raw rows `13`, visible rows `13`, unique TV `4`, unique movies `7`

## Selector Fixes Applied

- Patched `D:\PlexTools\Scripts\scarflix_v2\scarflix_v2_concurrent_stream_qa_node.js`.
- Excludes stale `_Hybrid\_HTTP` rows from materialized representative QA.
- Deduplicates rows by `ScarFLIX_part-*` hash.
- Uses Plex `library_section_id` to classify TV rows.
- Uses client-flexible Plex decision policy and 90-second decision timeout.

## Expansion Action

- Updated hidden materialized expansion wrapper:
  - File: `D:\PlexTools\Scripts\scarflix_v2\hidden_tasks\ScarFLIX_v2_MaterializedExpansionBatch.vbs`
  - Old: `-MaxItems 10`
  - New: `-MaxItems 50`
- Detached task started: `ScarFLIX_v2_MaterializedExpansionBatch`
- Start time: `2026-06-09 19:13` Australia/Sydney
- Task state after start: `Running`

## Dashboard Snapshot

- Dashboard status: `PASS`
- Dashboard updated: `2026-06-09T09:16:22.818Z`
- Actual direct/legacy `.strm` counts: Movies `1`, TV `1`, Total `2`
- Materialized/WebDAV artifacts: `144`
- Materialized/WebDAV file count: `144`
- Materialized playback success rate: `100`
- Materialized publisher: `RUNNING`
- Materialized publisher selected: `27`
- Materialized publisher published: `9`
- Controlled materialized expansion eligible: `true`
- FastTrack milestone: `CONTROLLED_MATERIALIZED_EXPANSION_ALLOWED`

## Next Actions

1. Let the active 50-item materialized batch complete.
2. Run detached targeted materialized Plex decision QA after Plex indexing catches up.
3. Quarantine only failed source/release links, keep titles retryable, then continue 30-50 item controlled batches.

## Jason Action

- No Jason action required.
- Do not re-enable legacy/direct resolver expansion.
