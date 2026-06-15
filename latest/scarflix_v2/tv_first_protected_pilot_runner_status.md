# TV-First Protected Pilot Runner

Updated UTC: 2026-06-15T04:49:27Z
Status: PASS_PROTECTED_TV_PILOT_REQUEST_PREPARED
Mode: prepare_only
Prepared requests: 3
TV scoped gate: PASS_TV_SCOPE_MATERIALIZED_QA
Full Materialized QA: REVIEW

## Prepared Titles
- Haunted Hotel (tmdb 255752): PREPARED_HELD_FOR_PROTECTED_TV_STAGING_ADAPTER
- MobLand (tmdb 247718): PREPARED_HELD_FOR_PROTECTED_TV_STAGING_ADAPTER
- The Institute (tmdb 253372): PREPARED_HELD_FOR_PROTECTED_TV_STAGING_ADAPTER

## Safety
- generic_publisher_not_called: true
- no_broad_expansion_started: true
- no_legacy_direct_resolver_called: true
- no_path_rewrite_performed: true
- no_plex_refresh_performed: true
- no_publication_started: true
- no_real_debrid_mutation_performed: true
- no_webdav_map_write_performed: true

Next safe action: Review prepared 3-show TV pilot manifest, then execute only through an additive TV-specific staging adapter with rollback and post-wave verification.
