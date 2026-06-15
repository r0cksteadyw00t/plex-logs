# TV-First Private Stage Adapter

Updated UTC: 2026-06-15T04:54:32Z
Status: PASS_PRIVATE_STAGED_TV_PILOT
Prepared: 3
Staged: 3
Review: 0
TV scoped gate: PASS_TV_SCOPE_MATERIALIZED_QA

## Results
- Haunted Hotel: PASS_PRIVATE_STAGED_HELD; stage_id=tv_haunted_hotel_255752_ad579d8d7244; reason=Cached Plex-compatible stream privately staged outside generic publisher queue.
- MobLand: PASS_PRIVATE_STAGED_HELD; stage_id=tv_mobland_247718_b69de58f7532; reason=Cached Plex-compatible stream privately staged outside generic publisher queue.
- The Institute: PASS_PRIVATE_STAGED_HELD; stage_id=tv_the_institute_253372_66e7acbb58d4; reason=Cached Plex-compatible stream privately staged outside generic publisher queue.

## Safety
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

Next safe action: Build the TV-specific publication gate to admit only these private-stage TV candidates after post-stage URL/playback verification.
