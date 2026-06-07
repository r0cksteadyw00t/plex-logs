# ScarFLIX v2 Platform Gate Checkpoint

Generated UTC: 2026-06-07T20:55:27Z

Status: REVIEW
Started UTC: 2026-06-07T20:55:06Z
Ended UTC: 2026-06-07T20:55:26Z
Snapshot ID: 20260607T205520Z
Snapshot hash: 086065e6f3ae448304dc69f0dc0b995b8f63470ba8d31516cca4a194f16f397f
Same-snapshot confirmed: False
Checkpoint JSON: D:\PlexTools\public\latest\scarflix_v2\platform_gate_checkpoint.json

## Visible Catalogue
- visible: 9
- movies: 4
- tv: 5

## QA
- WebDAV active gate: PASS, checked=3
- Plex visible/HLS QA: FAIL, checked=9
- Plex client decision QA: UNKNOWN, checked=-1
- 5-concurrent stream QA: UNKNOWN, target=, map_tested=, visible_tested=
- Health: UNKNOWN

## Source Handling
- quarantined/rejected sources: 831
- transient/retry-held count: 685
- prunable/permanent count: 146
- seeder rejected-stage skipped: 34
- publisher rejected-stage skipped: 0
- top reason codes:
  - PROVIDER_503: 495
  - PROVIDER_TIMEOUT: 153
  - PLEX_INVISIBLE_AFTER_SCAN: 136
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
- active_gate checked 3, expected snapshot 9
- visible_catalog_qa status=FAIL