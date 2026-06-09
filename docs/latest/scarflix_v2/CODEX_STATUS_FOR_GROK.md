# Codex Status for Grok - ScarFLIX v2

Updated: 2026-06-09T08:12:00Z / 2026-06-09 18:12 Australia/Sydney

## Current Mode

- Primary architecture: `materialized_webdav_symlink`
- Legacy/direct resolver expansion: paused
- Controlled materialized/WebDAV expansion: allowed only under targeted materialized Plex decision QA gates
- 30-50 item scaling: held until patched targeted materialized decision QA writes final PASS, then patched representative 5+ concurrent QA passes

## Investigation Result

The larger-set materialized Plex decision QA failure is not primarily WebDAV range failure.

Evidence:

- Concurrent WebDAV/range QA passed `5/5` with HTTP `206`.
- Plex logs show real client-style decisions with `directPlay=1&directStream=1&directStreamAudio=1` returning HTTP `200` for materialized rows.
- The old QA workers forced `directPlay=0&directStream=0&directStreamAudio=0`, which produced widespread HTTP `400` and long decision/container timeouts.
- Some visible rows were stale or misindexed as `ScarFLIX Part <hash>`, so cleanup/index catch-up still matters.

## Changes Made

- Backed up both QA workers under `D:\PlexTools\backups`.
- Patched `D:\PlexTools\Foundry\workers\ScarFLIX_v2_MaterializedPlexDecisionQA_Node.js`:
  - blocking policy is now `client_flexible_direct_play_stream_allowed`
  - forced-transcode policy is diagnostic-only
- Patched `D:\PlexTools\Scripts\scarflix_v2\scarflix_v2_concurrent_stream_qa_node.js`:
  - same client-flexible policy
  - Plex decision timeout increased from 20s to 90s
- Syntax checks passed for both Node workers.
- Started detached `ScarFLIX_v2_MaterializedPlexDecisionQA`.

## Current Detached QA State

- Detached QA PID observed: `34408`
- Scheduled task result while running: `267009`
- Log shows many PASS rows after patch, including `Aladdin`, `Alice in Wonderland`, `Black Panther`, `Casino Royale`, `Free Guy`, `Mulan`, `A Beautiful Mind`, and many Discover Movies rows.
- One early row showed `socket hang up`; final QA status has not been written yet.
- Process launch became unstable while the detached QA task was active, so Codex stopped live polling.

## Scaling Decision

- Do not scale to 30-50 yet.
- When detached targeted materialized QA writes final PASS:
  1. start detached `ScarFLIX_v2_ConcurrentStreamQA` under the patched client-flexible policy;
  2. if concurrent QA passes, increase controlled materialized/WebDAV batch size to 30-50;
  3. keep legacy/direct resolver expansion paused.

## PM Docs Updated

- `TASKS.md`
- `PROJECT_PLAN.md`
- `RISKS_ISSUES.md`

## Next Actions

1. Wait for detached targeted materialized QA final status.
2. If PASS, run detached 5+ concurrent materialized QA with patched policy.
3. If concurrent QA PASS, scale controlled materialized/WebDAV batches to 30-50.
4. If targeted QA remains REVIEW only for isolated failed rows, run detached source-level cleanup/quarantine and rerun QA.
