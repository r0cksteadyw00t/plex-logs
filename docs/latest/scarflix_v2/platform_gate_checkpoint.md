# ScarFLIX v2 Platform Gate Checkpoint

Generated UTC: 2026-06-07T09:53:16Z

Status: REVIEW
Started UTC: 2026-06-07T09:52:06Z
Ended UTC: 2026-06-07T09:53:15Z
Snapshot ID: 20260607T095221Z
Snapshot hash: 058f950154467c3b4c340fae6596d61c2af94ec7e6954655a7b4f040850e581b
Same-snapshot confirmed: False
Checkpoint JSON: D:\PlexTools\public\latest\scarflix_v2\platform_gate_checkpoint.json

## Visible Catalogue
- visible: 47
- movies: 37
- tv: 10

## QA
- WebDAV active gate: PASS, checked=47
- Plex visible/HLS QA: FAIL, checked=47
- Plex client decision QA: UNKNOWN, checked=-1
- 5-concurrent stream QA: UNKNOWN, target=, map_tested=, visible_tested=
- Health: UNKNOWN

## Source Handling
- quarantined/rejected sources: 714
- transient/retry-held count: 598
- prunable/permanent count: 116
- seeder rejected-stage skipped: 8
- publisher rejected-stage skipped: 0
- top reason codes:
  - PROVIDER_503: 433
  - PROVIDER_TIMEOUT: 128
  - PLEX_INVISIBLE_AFTER_SCAN: 107
  - PROVIDER_503_RETRYABLE: 30
  - PLEX_HLS_TIMEOUT: 7
  - PLEX_CODEC_BLOCKED: 3
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
- visible_catalog_qa status=FAIL