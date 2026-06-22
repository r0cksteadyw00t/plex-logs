# TV-First Private Stage Validator

Updated UTC: 2026-06-22T03:22:49Z
Status: REVIEW_PRIVATE_STAGE_VALIDATION_PARTIAL
Checked: 5
Passed: 2
Review: 3

## Results
- Servant: REVIEW_PRIVATE_STAGE_VALIDATION_FAILED; head=405; range=; type=application/json; reason=PROVIDER_RANGE_TIMEOUT_OR_ERROR
- Servant: PASS_PRIVATE_STAGE_VALIDATED; head=200; range=206; type=application/force-download; reason=PASS_PRIVATE_STAGE_URL_VALIDATED
- Servant: REVIEW_PRIVATE_STAGE_VALIDATION_FAILED; head=405; range=; type=application/json; reason=PROVIDER_RANGE_TIMEOUT_OR_ERROR
- Servant: REVIEW_PRIVATE_STAGE_VALIDATION_FAILED; head=405; range=; type=application/json; reason=PROVIDER_RANGE_TIMEOUT_OR_ERROR
- Servant: PASS_PRIVATE_STAGE_VALIDATED; head=405; range=206; type=application/force-download; reason=PASS_PRIVATE_STAGE_URL_VALIDATED

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
