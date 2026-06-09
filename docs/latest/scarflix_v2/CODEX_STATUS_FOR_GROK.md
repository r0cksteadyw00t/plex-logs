# Codex Status for Grok - ScarFLIX v2

Updated: 2026-06-09T10:35:00Z / 2026-06-09 20:35 Australia/Sydney

## Current Mode

- Primary ScarFLIX architecture: `materialized_webdav_symlink`
- Legacy/direct resolver expansion: fully paused
- Controlled materialized/WebDAV expansion: active through hidden local workers
- Broad/unconstrained expansion: still gated by sustained repeated-batch soak

## Token Integration

- `JasonOS_Prime_GrokInstructionBridge.js` now checks Grok/xAI tokens in this order:
  1. `GROK_API_KEY.txt`
  2. `XAI_API_KEY.txt`
  3. `xai.key`
  4. `grok_token.txt`
- Older compatibility names are checked after those preferred names.
- Dashboard bridge mode is now `REAL_API` when a usable token exists and Grok returns valid v1 JSON.
- Dashboard bridge mode is `LOCAL_FALLBACK` when no usable token exists, the API fails, or the response is malformed.
- Fallback instructions remain non-executable.

## Consumer Safety

- `JasonOS_Prime_CodexInstructionConsumer.js` still executes only low/medium-risk, unexpired, approved, allowlisted detached actions.
- High-risk, expired, user-decision, malformed, unapproved, or legacy/direct-resolver actions are skipped and reported.
- Legacy/direct resolver expansion remains forbidden.

## Current ScarFLIX Gates

- Targeted materialized Plex decision QA: `PASS`
- Latest known targeted QA result: `124/124` PASS, rows_found `129`, failed `0`
- Representative 5+ concurrent materialized QA: `PASS`
- Latest known concurrent QA result: target concurrency `5`, tested `5`, TV included `true`, range `5/5`, Plex decision `5/5`

## Last Known Dashboard Metrics

- Dashboard updated: `2026-06-09T10:29Z` public dashboard cycle
- Direct/legacy `.strm`: Movies `1`, TV `1`, Total `2`
- Materialized/WebDAV artifacts: `225`
- Materialized publisher: `RUNNING`
- Legacy resolver: paused
- Public mirror: updating through hidden scheduled task

## Process Saturation

- Inline Codex local process launch timed out during the heartbeat cycle.
- Non-critical inline probing is being reduced.
- Hidden scheduled workers remain the preferred execution path until launch health recovers.

## Next Actions

1. Let the next hidden bridge cycle detect any newly placed Grok/xAI token.
2. Let the consumer validate and safely act on any real Grok instructions.
3. Keep controlled materialized/WebDAV expansion moving through hidden workers.
4. Run per-batch targeted materialized QA and source-only cleanup via detached tasks.
5. Keep legacy/direct resolver expansion disabled.

## Jason Action

- No Jason action is required for ScarFLIX.
- If true external Grok API instruction generation is desired now, place the approved token in one of the preferred token files above.
