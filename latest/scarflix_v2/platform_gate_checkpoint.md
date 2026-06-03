# ScarFLIX v2 Platform Gate Checkpoint

Generated UTC: 2026-06-03T08:39:57Z

Status: REVIEW
Started UTC: 2026-06-03T08:12:10Z
Ended UTC: 2026-06-03T08:39:50Z
Snapshot ID: 20260603T081222Z
Snapshot hash: af0a861a6baaf7ff181e444c4dbefa505c8c294bdc13b9a2bc574517ef268f64
Same-snapshot confirmed: True
Checkpoint JSON: D:\PlexTools\public\latest\scarflix_v2\platform_gate_checkpoint.json

## Visible Catalogue
- visible: 78
- movies: 53
- tv: 25

## QA
- WebDAV active gate: REVIEW, checked=78
- Plex visible/HLS QA: FAIL, checked=78
- Plex client decision QA: FAIL, checked=78
- 5-concurrent stream QA: REVIEW, target=5, map_tested=5, visible_tested=5
- Health: REVIEW

## Source Handling
- quarantined/rejected sources: 684
- transient/retry-held count: 569
- prunable/permanent count: 115
- seeder rejected-stage skipped: 8
- publisher rejected-stage skipped: 0
- top reason codes:
  - PROVIDER_503: 433
  - PROVIDER_TIMEOUT: 128
  - PLEX_INVISIBLE_AFTER_SCAN: 107
  - PROVIDER_503_RETRYABLE: 8
  - PLEX_CODEC_BLOCKED: 3
  - POLICY_BLOCKED: 2
  - PLEX_PROFILE_FAILED: 2
  - RELEASE_WINDOW_BLOCKED: 1

## Schedules
- schedules safely re-enabled by PlatformGate: False
- ScarFLIX_v2_SafeWebDavExpansionPipeline: Disabled
- ScarFLIX_v2_LiveCatalogSeeder: Disabled
- ScarFLIX_v2_WebDavVirtualCatalogPublisher: Disabled
- ScarFLIX_v2_AutoGate: Disabled
- ScarFLIX_v2_SafeCatalogOrchestrator: Disabled
- ScarFLIX_v2_CatalogPromoter: Disabled
- ScarFLIX_v2_CatalogVisibilityGate: Disabled

## Blockers
- active_gate status=REVIEW
- visible_catalog_qa status=FAIL
- plex_client_decision_qa status=FAIL
- concurrent_stream_qa status=REVIEW
- health status=REVIEW