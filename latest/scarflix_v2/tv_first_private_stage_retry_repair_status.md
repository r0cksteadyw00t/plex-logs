# TV-First Private Stage Retry Repair

Updated UTC: 2026-06-17T23:24:32Z
Status: PASS_FAILED_PRIVATE_STAGE_ROWS_RETRY_HELD
Validator status: REVIEW_PRIVATE_STAGE_VALIDATION_PARTIAL
Failed rows found: 2
Moved to retry-held: 2
Ledger failures tracked: 75

## Moved Rows
- Haunted Hotel S01E04: PROVIDER_503_RETRYABLE
- Haunted Hotel S01E06: PROVIDER_503_RETRYABLE

## Safety
- no_broad_expansion_started: true
- no_delete_performed: true
- no_path_rewrite_performed: true
- no_plex_refresh_performed: true
- no_publication_started: true
- no_real_debrid_mutation_performed: true
- no_webdav_map_write_performed: true
- private_stage_only: true
- reversible_move_only: true
- source_urls_not_written_to_public_status: true

Next safe action: Rerun TV whole-show private stage adapter so failed episodes can select alternate sources.
