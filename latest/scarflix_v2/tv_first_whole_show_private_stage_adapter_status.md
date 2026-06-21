# TV-First Whole-Show Private Stage Adapter

Updated UTC: 2026-06-21T02:54:24Z
Status: PASS_WHOLE_SHOW_ALREADY_STAGED
Shows requested: 1
Episodes enumerated: 6
Episodes already staged: 6
Episodes newly staged: 0
Review: 0
TV scoped gate: PASS_TV_SCOPE_MATERIALIZED_QA
Prior validator: REVIEW_PRIVATE_STAGE_VALIDATION_PARTIAL

## Shows
- SAS Rogue Heroes: enumerated=6; staged=0; already=6; review=0; source=request_episode_targets

## Safety
- current_retry_held_hashes_block_restage: true
- generic_publisher_not_called: true
- no_broad_expansion_started: true
- no_generic_pending_write: true
- no_legacy_direct_resolver_called: true
- no_path_rewrite_performed: true
- no_plex_refresh_performed: true
- no_publication_started: true
- no_real_debrid_mutation_performed: true
- no_webdav_map_write_performed: true
- private_stage_only: true
- source_urls_not_written_to_public_status: true
- whole_show_intent: true

Next safe action: Run TV-first private stage validator across the expanded whole-show private stage set, then keep candidates held until a TV-specific publication gate exists and passes.
