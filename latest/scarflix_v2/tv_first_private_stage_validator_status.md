# TV-First Private Stage Validator

Updated UTC: 2026-06-21T03:59:56Z
Status: REVIEW_PRIVATE_STAGE_VALIDATION_PARTIAL
Checked: 6
Passed: 0
Review: 6

## Results
- The Edge of Sleep: REVIEW_PRIVATE_STAGE_VALIDATION_FAILED; head=200; range=200; type=application/vnd.apple.mpegurl; reason=RANGE_NOT_206
- The Edge of Sleep: REVIEW_PRIVATE_STAGE_VALIDATION_FAILED; head=200; range=200; type=application/vnd.apple.mpegurl; reason=RANGE_NOT_206
- The Edge of Sleep: REVIEW_PRIVATE_STAGE_VALIDATION_FAILED; head=200; range=; type=application/vnd.apple.mpegurl; reason=PROVIDER_RANGE_TIMEOUT_OR_ERROR
- The Edge of Sleep: REVIEW_PRIVATE_STAGE_VALIDATION_FAILED; head=200; range=; type=application/vnd.apple.mpegurl; reason=PROVIDER_RANGE_TIMEOUT_OR_ERROR
- The Edge of Sleep: REVIEW_PRIVATE_STAGE_VALIDATION_FAILED; head=200; range=; type=application/vnd.apple.mpegurl; reason=PROVIDER_RANGE_TIMEOUT_OR_ERROR
- The Edge of Sleep: REVIEW_PRIVATE_STAGE_VALIDATION_FAILED; head=200; range=200; type=application/vnd.apple.mpegurl; reason=RANGE_NOT_206

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
