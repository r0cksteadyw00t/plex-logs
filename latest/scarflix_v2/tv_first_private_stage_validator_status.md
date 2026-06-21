# TV-First Private Stage Validator

Updated UTC: 2026-06-21T02:01:02Z
Status: REVIEW_PRIVATE_STAGE_VALIDATION_PARTIAL
Checked: 3
Passed: 1
Review: 2

## Results
- Joan: PASS_PRIVATE_STAGE_VALIDATED; head=200; range=206; type=application/force-download; reason=PASS_PRIVATE_STAGE_URL_VALIDATED
- Joan: REVIEW_PRIVATE_STAGE_VALIDATION_FAILED; head=200; range=200; type=application/vnd.apple.mpegurl; reason=RANGE_NOT_206
- Joan: REVIEW_PRIVATE_STAGE_VALIDATION_FAILED; head=200; range=; type=application/vnd.apple.mpegurl; reason=PROVIDER_RANGE_TIMEOUT_OR_ERROR

## Safety
- no_broad_expansion_started: true
- no_generic_pending_write: true
- no_path_rewrite_performed: true
- no_plex_refresh_performed: true
- no_publication_started: true
- no_real_debrid_mutation_performed: true
- no_webdav_map_write_performed: true
- read_only_url_validation: true
- source_urls_not_written_to_public_status: true

Next safe action: Keep failed private-stage candidates held and refresh source selection only for failed rows.
