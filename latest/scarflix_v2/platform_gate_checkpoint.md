# ScarFLIX v2 Platform Gate Checkpoint

Generated UTC: 2026-06-07T20:54:45Z

Status: REVIEW
Started UTC: 2026-06-07T20:54:16Z
Ended UTC: 2026-06-07T20:54:44Z
Snapshot ID: 20260607T205433Z
Snapshot hash: d3e68ddb745c20efc0a44417dbd6369d2f15bbaef0bc7ec9d2b7182ae7c66073
Same-snapshot confirmed: False
Checkpoint JSON: D:\PlexTools\public\latest\scarflix_v2\platform_gate_checkpoint.json

## Visible Catalogue
- visible: 3
- movies: 2
- tv: 1

## QA
- WebDAV active gate: PASS, checked=3
- Plex visible/HLS QA: FAIL, checked=3
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
- visible_catalog_qa status=FAIL
- visible snapshot drifted during gate: before=3 after=9