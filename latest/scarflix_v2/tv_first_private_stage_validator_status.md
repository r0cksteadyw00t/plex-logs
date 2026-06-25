# TV-First Private Stage Validator

Updated UTC: 2026-06-25T01:35:59Z
Status: REVIEW_PRIVATE_STAGE_VALIDATION_PARTIAL
Checked: 2
Passed: 1
Review: 1

## Results
- The Owl House: PASS_PRIVATE_STAGE_VALIDATED; head=200; range=200; type=application/vnd.apple.mpegurl; reason=PASS_PRIVATE_STAGE_HLS_PLAYLIST_VALIDATED; hls_segment=200; hls_bytes=65536
- The Owl House: REVIEW_PRIVATE_STAGE_VALIDATION_FAILED; head=; range=; type=; reason=PROVIDER_RANGE_TIMEOUT_OR_ERROR

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
