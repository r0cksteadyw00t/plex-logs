# TV-First Private Stage Validator

Updated UTC: 2026-06-19T01:30:31Z
Status: REVIEW_PRIVATE_STAGE_VALIDATION_PARTIAL
Checked: 7
Passed: 6
Review: 1

## Results
- Good Omens: PASS_PRIVATE_STAGE_VALIDATED; head=200; range=206; type=application/force-download; reason=PASS_PRIVATE_STAGE_URL_VALIDATED
- Good Omens: PASS_PRIVATE_STAGE_VALIDATED; head=200; range=206; type=application/force-download; reason=PASS_PRIVATE_STAGE_URL_VALIDATED
- Good Omens: REVIEW_PRIVATE_STAGE_VALIDATION_FAILED; head=200; range=503; type=text/html; reason=PROVIDER_503_RETRYABLE
- Good Omens: PASS_PRIVATE_STAGE_VALIDATED; head=200; range=206; type=application/force-download; reason=PASS_PRIVATE_STAGE_URL_VALIDATED
- Good Omens: PASS_PRIVATE_STAGE_VALIDATED; head=200; range=206; type=application/force-download; reason=PASS_PRIVATE_STAGE_URL_VALIDATED
- Good Omens: PASS_PRIVATE_STAGE_VALIDATED; head=200; range=206; type=application/force-download; reason=PASS_PRIVATE_STAGE_URL_VALIDATED
- Good Omens: PASS_PRIVATE_STAGE_VALIDATED; head=200; range=206; type=application/force-download; reason=PASS_PRIVATE_STAGE_URL_VALIDATED

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
