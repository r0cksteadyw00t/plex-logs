# TV-First Additive Publication Adapter

Updated UTC: 2026-06-18T06:07:51Z
Status: PASS_TV_FIRST_ADDITIVE_PUBLICATION_CANARY_ROLLBACK_COMPLETE
Gate status: PASS_TV_PUBLICATION_GATE_FULL_SEASON_ACCEPTED_HELD
Expected episodes: 28
Accepted episodes: 28
Mutated entries: 1
Rollback performed: true

## Safety
- additive_only: true
- canary_partial_visibility_rolls_back_on_pass: true
- episode_link_mode: strm
- full_season_required: true
- heavy_work_single_flight_required: true
- no_generic_publisher_called: true
- no_legacy_direct_resolver_called: true
- no_source_url_written_to_public_status: true
- rollback_manifest_before_mutation: true
- strm_targets_local_webdav_materialized_path: true
- tv_section_only_refresh: true

Next safe action: Canary indexed through the .strm template and rolled back. If the gate is still 28/28 and playback canary evidence is acceptable, rerun without JASONOS_TV_PUBLICATION_CANARY to publish the full 28.
