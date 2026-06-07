# ScarFLIX v2 Platform Gate Checkpoint

Generated UTC: 2026-06-07T10:04:55Z

Status: REVIEW
Started UTC: 2026-06-07T10:03:06Z
Ended UTC: 2026-06-07T10:04:54Z
Snapshot ID: 20260607T100321Z
Snapshot hash: 38ca1324ab9a39327109edd53e09ea161f3e8eeb3d91219919e41d883244c56b
Same-snapshot confirmed: True
Checkpoint JSON: D:\PlexTools\public\latest\scarflix_v2\platform_gate_checkpoint.json

## Visible Catalogue
- visible: 46
- movies: 36
- tv: 10

## QA
- WebDAV active gate: PASS, checked=46
- Plex visible/HLS QA: PASS, checked=46
- Plex client decision QA: PASS, checked=46
- 5-concurrent stream QA: PASS, target=5, map_tested=5, visible_tested=5
- Health: REVIEW

## Source Handling
- quarantined/rejected sources: 715
- transient/retry-held count: 598
- prunable/permanent count: 117
- seeder rejected-stage skipped: 1
- publisher rejected-stage skipped: 0
- top reason codes:
  - PROVIDER_503: 433
  - PROVIDER_TIMEOUT: 128
  - PLEX_INVISIBLE_AFTER_SCAN: 107
  - PROVIDER_503_RETRYABLE: 30
  - PLEX_HLS_TIMEOUT: 7
  - PLEX_CODEC_BLOCKED: 4
  - POLICY_BLOCKED: 2
  - PLEX_PROFILE_FAILED: 2
  - RELEASE_WINDOW_BLOCKED: 1
  - PLEX_HLS_PROBE_FAILED: 1

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
- health status=REVIEW