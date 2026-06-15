# TV-First Publication Gate

Updated UTC: 2026-06-15T14:36:30Z
Status: PASS_TV_PUBLICATION_GATE_ACCEPTED_HELD
Accepted private-stage episodes: 19
Held/missing episodes: 9
Validator: PASS_PRIVATE_STAGE_VALIDATED
TV scoped gate: PASS_TV_SCOPE_MATERIALIZED_QA
Sentinel: PASS/LOW

## Accepted Counts
- Haunted Hotel: 5
- MobLand: 9
- The Institute: 5

## Held Counts
- Haunted Hotel: 5
- MobLand: 1
- The Institute: 3

## Safety
- gate_only: true
- no_broad_expansion_started: true
- no_generic_pending_write: true
- no_legacy_direct_resolver_called: true
- no_path_rewrite_performed: true
- no_plex_refresh_performed: true
- no_publication_started: true
- no_real_debrid_mutation_performed: true
- no_webdav_map_write_performed: true
- source_urls_not_written_to_public_status: true

Next safe action: Build/run an additive TV publication adapter for accepted private candidates only, with rollback and post-publication Plex/WebDAV verification.
