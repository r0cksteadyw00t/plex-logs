# TV-First Private Stage Validator

Updated UTC: 2026-06-18T22:34:59Z
Status: REVIEW_PRIVATE_STAGE_VALIDATION_PARTIAL
Checked: 6
Passed: 5
Review: 1

## Results
- Alice and Steve: PASS_PRIVATE_STAGE_VALIDATED; head=503; range=206; type=application/force-download; reason=PASS_PRIVATE_STAGE_URL_VALIDATED
- Alice and Steve: REVIEW_PRIVATE_STAGE_VALIDATION_FAILED; head=200; range=; type=application/force-download; reason=PROVIDER_RANGE_TIMEOUT_OR_ERROR
- Alice and Steve: PASS_PRIVATE_STAGE_VALIDATED; head=200; range=206; type=application/force-download; reason=PASS_PRIVATE_STAGE_URL_VALIDATED
- Alice and Steve: PASS_PRIVATE_STAGE_VALIDATED; head=200; range=206; type=application/force-download; reason=PASS_PRIVATE_STAGE_URL_VALIDATED
- Alice and Steve: PASS_PRIVATE_STAGE_VALIDATED; head=200; range=206; type=application/force-download; reason=PASS_PRIVATE_STAGE_URL_VALIDATED
- Alice and Steve: PASS_PRIVATE_STAGE_VALIDATED; head=200; range=206; type=application/force-download; reason=PASS_PRIVATE_STAGE_URL_VALIDATED

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
