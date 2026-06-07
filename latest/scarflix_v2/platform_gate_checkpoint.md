# ScarFLIX v2 Platform Gate Checkpoint

Generated UTC: 2026-06-07T06:27:16Z

Status: REVIEW
Started UTC: 2026-06-07T06:25:07Z
Ended UTC: 2026-06-07T06:27:16Z
Snapshot ID: 20260607T062521Z
Snapshot hash: 8c0fdf90608a65e79dd0b2e9181da5bd0706cca7ad9bc5823ff373b1b0e100c0
Same-snapshot confirmed: True
Checkpoint JSON: D:\PlexTools\public\latest\scarflix_v2\platform_gate_checkpoint.json

## Visible Catalogue
- visible: 56
- movies: 38
- tv: 18

## QA
- WebDAV active gate: PASS, checked=56
- Plex visible/HLS QA: PASS, checked=56
- Plex client decision QA: PASS, checked=56
- 5-concurrent stream QA: PASS, target=5, map_tested=5, visible_tested=5
- Health: REVIEW

## Source Handling
- quarantined/rejected sources: 705
- transient/retry-held count: 589
- prunable/permanent count: 116
- seeder rejected-stage skipped: 8
- publisher rejected-stage skipped: 0
- top reason codes:
  - PROVIDER_503: 433
  - PROVIDER_TIMEOUT: 128
  - PLEX_INVISIBLE_AFTER_SCAN: 107
  - PROVIDER_503_RETRYABLE: 21
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
- health status=REVIEW