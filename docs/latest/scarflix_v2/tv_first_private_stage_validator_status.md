# TV-First Private Stage Validator

Updated UTC: 2026-06-23T19:58:53Z
Status: REVIEW_PRIVATE_STAGE_VALIDATION_PARTIAL
Checked: 15
Passed: 13
Review: 2

## Results
- Never Have I Ever: PASS_PRIVATE_STAGE_VALIDATED; head=200; range=200; type=application/vnd.apple.mpegurl; reason=PASS_PRIVATE_STAGE_HLS_PLAYLIST_VALIDATED; hls_segment=200; hls_bytes=65536
- Never Have I Ever: PASS_PRIVATE_STAGE_VALIDATED; head=200; range=200; type=application/vnd.apple.mpegurl; reason=PASS_PRIVATE_STAGE_HLS_PLAYLIST_VALIDATED; hls_segment=200; hls_bytes=65536
- Never Have I Ever: PASS_PRIVATE_STAGE_VALIDATED; head=200; range=200; type=application/vnd.apple.mpegurl; reason=PASS_PRIVATE_STAGE_HLS_PLAYLIST_VALIDATED; hls_segment=200; hls_bytes=65536
- Never Have I Ever: PASS_PRIVATE_STAGE_VALIDATED; head=200; range=200; type=application/vnd.apple.mpegurl; reason=PASS_PRIVATE_STAGE_HLS_PLAYLIST_VALIDATED; hls_segment=200; hls_bytes=65536
- Never Have I Ever: PASS_PRIVATE_STAGE_VALIDATED; head=200; range=200; type=application/vnd.apple.mpegurl; reason=PASS_PRIVATE_STAGE_HLS_PLAYLIST_VALIDATED; hls_segment=200; hls_bytes=65536
- Never Have I Ever: PASS_PRIVATE_STAGE_VALIDATED; head=200; range=200; type=application/vnd.apple.mpegurl; reason=PASS_PRIVATE_STAGE_HLS_PLAYLIST_VALIDATED; hls_segment=200; hls_bytes=65536
- Never Have I Ever: REVIEW_PRIVATE_STAGE_VALIDATION_FAILED; head=502; range=502; type=text/html; reason=PROVIDER_5XX_RETRYABLE
- Never Have I Ever: PASS_PRIVATE_STAGE_VALIDATED; head=200; range=200; type=application/vnd.apple.mpegurl; reason=PASS_PRIVATE_STAGE_HLS_PLAYLIST_VALIDATED; hls_segment=200; hls_bytes=65536
- Never Have I Ever: PASS_PRIVATE_STAGE_VALIDATED; head=200; range=200; type=application/vnd.apple.mpegurl; reason=PASS_PRIVATE_STAGE_HLS_PLAYLIST_VALIDATED; hls_segment=200; hls_bytes=65536
- Never Have I Ever: PASS_PRIVATE_STAGE_VALIDATED; head=200; range=200; type=application/vnd.apple.mpegurl; reason=PASS_PRIVATE_STAGE_HLS_PLAYLIST_VALIDATED; hls_segment=200; hls_bytes=65536
- Never Have I Ever: PASS_PRIVATE_STAGE_VALIDATED; head=200; range=200; type=application/vnd.apple.mpegurl; reason=PASS_PRIVATE_STAGE_HLS_PLAYLIST_VALIDATED; hls_segment=200; hls_bytes=65536
- Never Have I Ever: PASS_PRIVATE_STAGE_VALIDATED; head=200; range=200; type=application/vnd.apple.mpegurl; reason=PASS_PRIVATE_STAGE_HLS_PLAYLIST_VALIDATED; hls_segment=200; hls_bytes=65536
- Never Have I Ever: PASS_PRIVATE_STAGE_VALIDATED; head=200; range=200; type=application/vnd.apple.mpegurl; reason=PASS_PRIVATE_STAGE_HLS_PLAYLIST_VALIDATED; hls_segment=200; hls_bytes=65536
- Never Have I Ever: REVIEW_PRIVATE_STAGE_VALIDATION_FAILED; head=200; range=; type=application/vnd.apple.mpegurl; reason=HLS_PLAYLIST_TIMEOUT_OR_ERROR; hls_segment=; hls_bytes=0
- Never Have I Ever: PASS_PRIVATE_STAGE_VALIDATED; head=200; range=200; type=application/vnd.apple.mpegurl; reason=PASS_PRIVATE_STAGE_HLS_PLAYLIST_VALIDATED; hls_segment=200; hls_bytes=65536

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
