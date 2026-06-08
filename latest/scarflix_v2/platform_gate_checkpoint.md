# ScarFLIX v2 Platform Gate Checkpoint

Generated UTC: 2026-06-08T01:01:35Z

Status: REVIEW
Started UTC: 2026-06-08T01:01:03Z
Ended UTC: 2026-06-08T01:01:34Z
Snapshot ID: 20260608T010119Z
Snapshot hash: 4a623f46f7ec74fe5e1aac7956f0d075b9ae0bce84ca544f1301555e747b7ec2
Same-snapshot confirmed: False
Checkpoint JSON: D:\PlexTools\public\latest\scarflix_v2\platform_gate_checkpoint.json

## Visible Catalogue
- visible: 1
- movies: 0
- tv: 1

## QA
- WebDAV active gate: PASS, checked=1
- Plex visible/HLS QA: PASS, checked=1
- Plex client decision QA: PASS, checked=1
- 5-concurrent stream QA: REVIEW, target=5, map_tested=5, visible_tested=5
- Health: UNKNOWN

## Source Handling
- quarantined/rejected sources: 833
- transient/retry-held count: 685
- prunable/permanent count: 148
- seeder rejected-stage skipped: 45
- publisher rejected-stage skipped: 0
- top reason codes:
  - PROVIDER_503: 495
  - PROVIDER_TIMEOUT: 153
  - PLEX_INVISIBLE_AFTER_SCAN: 136
  - PROVIDER_503_RETRYABLE: 30
  - PLEX_HLS_TIMEOUT: 7
  - PLEX_CODEC_BLOCKED: 4
  - PLEX_PROFILE_FAILED: 4
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
- concurrent_stream_qa status=REVIEW