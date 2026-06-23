# TV-First Private Stage Validator

Updated UTC: 2026-06-23T18:55:51Z
Status: REVIEW_PRIVATE_STAGE_VALIDATION_PARTIAL
Checked: 4
Passed: 2
Review: 2

## Results
- Better Call Saul: PASS_PRIVATE_STAGE_VALIDATED; head=200; range=200; type=application/vnd.apple.mpegurl; reason=PASS_PRIVATE_STAGE_HLS_PLAYLIST_VALIDATED; hls_segment=200; hls_bytes=65536
- Better Call Saul: PASS_PRIVATE_STAGE_VALIDATED; head=200; range=200; type=application/vnd.apple.mpegurl; reason=PASS_PRIVATE_STAGE_HLS_PLAYLIST_VALIDATED; hls_segment=200; hls_bytes=65536
- Better Call Saul: REVIEW_PRIVATE_STAGE_VALIDATION_FAILED; head=502; range=502; type=text/html; reason=PROVIDER_5XX_RETRYABLE
- Better Call Saul: REVIEW_PRIVATE_STAGE_VALIDATION_FAILED; head=502; range=502; type=text/html; reason=PROVIDER_5XX_RETRYABLE

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
