# TV-First Private Stage Validator

Updated UTC: 2026-06-20T16:40:16Z
Status: REVIEW_PRIVATE_STAGE_VALIDATION_PARTIAL
Checked: 3
Passed: 1
Review: 2

## Results
- FAIRY TAIL 100 YEARS QUEST: REVIEW_PRIVATE_STAGE_VALIDATION_FAILED; head=405; range=200; type=application/vnd.apple.mpegurl; reason=RANGE_NOT_206
- FAIRY TAIL 100 YEARS QUEST: PASS_PRIVATE_STAGE_VALIDATED; head=405; range=206; type=application/force-download; reason=PASS_PRIVATE_STAGE_URL_VALIDATED
- FAIRY TAIL 100 YEARS QUEST: REVIEW_PRIVATE_STAGE_VALIDATION_FAILED; head=405; range=200; type=application/vnd.apple.mpegurl; reason=RANGE_NOT_206

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
