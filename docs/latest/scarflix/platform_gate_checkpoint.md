# ScarFLIX v2 Platform Gate Checkpoint

Generated UTC: 2026-06-23T21:27:33Z

Status: REVIEW
Started UTC: 2026-06-23T21:27:06Z
Ended UTC: 2026-06-23T21:27:32Z
Snapshot ID: 20260623T212728Z
Snapshot hash: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
Same-snapshot confirmed: False
Checkpoint JSON: D:\PlexTools\public\latest\scarflix_v2\platform_gate_checkpoint.json

## Visible Catalogue
- visible: 0
- movies: 0
- tv: 0

## QA
- WebDAV active gate: REVIEW, checked=0
- Plex visible/HLS QA: UNKNOWN, checked=-1
- Plex client decision QA: UNKNOWN, checked=-1
- 5-concurrent stream QA: UNKNOWN, target=, map_tested=, visible_tested=
- Health: UNKNOWN

## Source Handling
- quarantined/rejected sources: 1325
- transient/retry-held count: 1064
- prunable/permanent count: 261
- seeder rejected-stage skipped: 41
- publisher rejected-stage skipped: 0
- top reason codes:
  - PROVIDER_503: 738
  - PROVIDER_TIMEOUT: 264
  - PLEX_INVISIBLE_AFTER_SCAN: 245
  - PROVIDER_503_RETRYABLE: 55
  - PLEX_HLS_TIMEOUT: 7
  - PLEX_PROFILE_FAILED: 7
  - PLEX_CODEC_BLOCKED: 5
  - POLICY_BLOCKED: 2
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
- active_gate status=REVIEW