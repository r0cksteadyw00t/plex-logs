# ScarFLIX v2 Platform Gate Checkpoint

Generated UTC: 2026-06-07T05:50:03Z

Status: REVIEW
Started UTC: 2026-06-07T04:56:33Z
Ended UTC: 2026-06-07T05:48:56Z
Snapshot ID: 20260607T045648Z
Snapshot hash: c5319cf869ee95f79cb7760c67ef5e4974f0a6890801529f556d82e3da3990ca
Same-snapshot confirmed: False
Checkpoint JSON: D:\PlexTools\public\latest\scarflix_v2\platform_gate_checkpoint.json

## Visible Catalogue
- visible: 65
- movies: 45
- tv: 20

## QA
- WebDAV active gate: PASS, checked=65
- Plex visible/HLS QA: FAIL, checked=65
- Plex client decision QA: UNKNOWN, checked=-1
- 5-concurrent stream QA: UNKNOWN, target=, map_tested=, visible_tested=
- Health: UNKNOWN

## Source Handling
- quarantined/rejected sources: 697
- transient/retry-held count: 582
- prunable/permanent count: 115
- seeder rejected-stage skipped: 8
- publisher rejected-stage skipped: 0
- top reason codes:
  - PROVIDER_503: 433
  - PROVIDER_TIMEOUT: 128
  - PLEX_INVISIBLE_AFTER_SCAN: 107
  - PROVIDER_503_RETRYABLE: 21
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
- visible_catalog_qa status=FAIL