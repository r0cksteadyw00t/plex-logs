# TV-First Additive Publication Adapter

Updated UTC: 2026-06-18T19:54:01Z
Status: HELD_FIRST_TV_PUBLICATION_ALREADY_COMPLETE
Gate status: PASS_TV_PUBLICATION_GATE_FULL_SEASON_ACCEPTED_HELD
Expected episodes: 28
Accepted episodes: 47
Mutated entries: 0
Rollback performed: false

## Safety
- additive_only: true
- canary_partial_visibility_rolls_back_on_pass: false
- episode_link_mode: strm
- full_season_required: true
- heavy_work_single_flight_required: true
- no_generic_publisher_called: true
- no_legacy_direct_resolver_called: true
- no_source_url_written_to_public_status: true
- rollback_manifest_before_mutation: true
- strm_targets_local_webdav_materialized_path: true
- tv_section_only_refresh: true

Next safe action: Do not republish the completed first TV pilot unless JASONOS_TV_FORCE_REPUBLISH=1 is explicitly set after a fresh rollback/snapshot decision.
