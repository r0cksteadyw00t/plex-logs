# ScarFLIX v2 Platform Gate Checkpoint

Generated UTC: 2026-06-19T22:58:46Z

Status: PASS
Started UTC: 2026-06-08T04:25:44Z
Ended UTC: 2026-06-08T04:26:57Z
Snapshot ID: 20260608T042559Z
Snapshot hash: b8aea5514e0ee28986a1ac39db603371544823deda3180a2a9ce2e0479b64798
Same-snapshot confirmed: True
Checkpoint JSON: D:\PlexTools\public\latest\scarflix_v2\platform_gate_checkpoint.json

## Visible Catalogue
- visible: 1
- movies: 1
- tv: 0

## QA
- WebDAV active gate: PASS, checked=1
- Plex visible/HLS QA: PASS, checked=1
- Plex client decision QA: PASS, checked=1
- 5-concurrent stream QA: REVIEW, target=5, map_tested=5, visible_tested=5
- Health: REVIEW

## Source Handling
- quarantined/rejected sources: 1275
- transient/retry-held count: 1023
- prunable/permanent count: 252
- seeder rejected-stage skipped: 41
- publisher rejected-stage skipped: 0
- top reason codes:
  - PROVIDER_503: 724
  - PROVIDER_TIMEOUT: 262
  - PLEX_INVISIBLE_AFTER_SCAN: 236
  - PROVIDER_503_RETRYABLE: 30
  - PLEX_HLS_TIMEOUT: 7
  - PLEX_PROFILE_FAILED: 7
  - PLEX_CODEC_BLOCKED: 5
  - POLICY_BLOCKED: 2
  - RELEASE_WINDOW_BLOCKED: 1
  - PLEX_HLS_PROBE_FAILED: 1

## Schedules
- schedules safely re-enabled by PlatformGate: True
- ScarFLIX_v2_SafeWebDavExpansionPipeline: Ready
- ScarFLIX_v2_LiveCatalogSeeder: Disabled
- ScarFLIX_v2_WebDavVirtualCatalogPublisher: Disabled
- ScarFLIX_v2_AutoGate: Disabled
- ScarFLIX_v2_SafeCatalogOrchestrator: Disabled
- ScarFLIX_v2_CatalogPromoter: Disabled
- ScarFLIX_v2_CatalogVisibilityGate: Disabled

## Blockers
- none