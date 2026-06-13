# Catalogue Full Expansion Campaign Status

**Updated UTC:** 2026-06-13T03:27:20Z  
**Updated Local:** 2026-06-13 13:27:20 +10:00  
**Status:** RUNNER_ACTIVE_GATED_EXPANSION_IN_PROGRESS

## Current Health

- Sentinel: PASS / LOW
- Orchestrator: PASS
- Launch timeout rate: 0
- PAUSE_PUBLICATION: True
- Plex watchdog: PASS

## Section 5 Baseline

- Expected affected hashes: 105
- Present in Plex Section 5: 105
- Missing: 0
- Present percent: 100
- Plex Section 5 total size: 227
- Parsed video rows: 227
- Unique ScarFLIX_part hashes: 224

## Active Campaign

- Root: D:\PlexTools\JasonOS_Campaigns\path2_catalogue_single_wave_20260613T031256Z
- Runner PID: 14720
- Intended duration: 12 hours
- Max wave size: 1
- Minimum visible gate: 105

## Completed Additive Waves

- Gremlins / scarflix_part-942255f029875306 via wave_20260613T031327165Z

## Held Hashes

- scarflix_part-d2dc1715682f383c - Prior 10-title wave WebDAV preflight returned 503 for Influencers
- scarflix_part-8f866cc77c432167 - WebDAV preflight failed before alias creation for scarflix_part-8f866cc77c432167
- scarflix_part-bf8b8fcb4150df6b - WebDAV preflight failed before alias creation for scarflix_part-bf8b8fcb4150df6b
- scarflix_part-5f2b46ebc01460e6 - WebDAV preflight failed before alias creation for scarflix_part-5f2b46ebc01460e6
- scarflix_part-f075d703d4a5b5aa - WebDAV preflight failed before alias creation for scarflix_part-f075d703d4a5b5aa

## Held Future Waves

- movies_visible_next_25: HELD, candidates=9, reason=Requires successful 10-title wave and explicit stable baseline.
- movies_visible_next_50: HELD, candidates=9, reason=Requires successful 25-title wave and clean regression monitor.
- movies_missing_retryable: HELD, candidates=0, reason=Missing hashes are not eligible for additive mutation until a separate proof gate exists.
- tv_audit_seed: HELD, candidates=0, reason=TV work requires separate audit and low-risk pilot selection.

## Materialized QA

- Current QA status: REVIEW
- Last QA update UTC: 06/09/2026 16:11:20
- Current stale QA numbers: 119/229 passed, 110 failed
- Detached delayed QA refresh task: ScarFLIX_v2_MaterializedPlexDecisionQA_Delayed
- Next run time: 2026-06-13T13:55:55.0000000+10:00

## Decision

Full catalogue expansion is not complete yet. The protected additive campaign is active and safe, but publication and broad expansion remain gated by Materialized QA and a separate TV audit lane.

No publication, broad expansion, cleanup, deletion, source mutation, or path rewrite was performed by this status update.
