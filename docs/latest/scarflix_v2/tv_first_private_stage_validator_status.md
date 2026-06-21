# TV-First Private Stage Validator

Updated UTC: 2026-06-21T23:20:35Z
Status: REVIEW_PRIVATE_STAGE_VALIDATION_PARTIAL
Checked: 2
Passed: 1
Review: 1

## Results
- The Owl House: PASS_PRIVATE_STAGE_VALIDATED; head=405; range=206; type=application/force-download; reason=PASS_PRIVATE_STAGE_URL_VALIDATED
- The Owl House: REVIEW_PRIVATE_STAGE_VALIDATION_FAILED; head=200; range=; type=application/vnd.apple.mpegurl; reason=HLS_PLAYLIST_TIMEOUT_OR_ERROR; hls_segment=; hls_bytes=0

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
