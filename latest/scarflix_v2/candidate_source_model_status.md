# ScarFLIX v2 Candidate Source Model

Status: PASS
Updated UTC: 2026-06-15T07:05:37Z
PlatformGate status: PASS
Primary playback architecture: materialized_webdav_symlink
Controlled materialized/WebDAV expansion allowed: True

## Checks
- platform_gate_pass_required: True - PlatformGate status is PASS
- primary_materialized_webdav_architecture: True - Primary playback architecture is materialized_webdav_symlink
- controlled_materialized_webdav_expansion_allowed: True - Controlled materialized/WebDAV expansion allowed is True; legacy resolver paused is True
- seeder_rejected_stage_hash_guard: True - Seeder records/skips exact rejected stage hashes.
- seeder_stage_only_not_plex_visible: True - Raw candidates are intentionally outside Plex visibility until materialized/WebDAV symlink publication and Plex decision QA.
- publisher_candidate_reject_function: True - Publisher rejects failed staged candidates, not whole titles.
- publisher_rejected_hash_skip: True - Publisher skips exact failed source hashes.
- publisher_qa_failure_source_reject: True - Publisher can reject failed source/release after QA.
- source_quarantine_exists: True - Source quarantine script exists.
- source_quarantine_transient_skip_default: True - Transient failures are skipped unless explicitly included.
- source_quarantine_reason_codes: True - Quarantine records source/release reason codes.

## Model
- Failed source/release is quarantined with a reason code.
- Title remains wanted/retryable.
- Alternate candidates are preserved.
- Transient 429/503/provider timeout remains REVIEW/retry-held.
- Permanent policy/playback failure quarantines only that source/release.
- Plex visibility happens only after full Plex-safe gate.
- Stage-only raw candidates are not a blocker when materialized/WebDAV symlink publishing is the primary path.