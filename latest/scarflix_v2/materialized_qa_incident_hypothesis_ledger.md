<!-- PATH2_STAGE_B_PROTECTED_PILOT_RESULT:START -->
## PATH 2 STAGE B PROTECTED PILOT RESULT

**Updated:** 2026-06-11T01:05:16.095Z
**Status:** ROLLED_BACK_PILOT_VERIFICATION_FAILED
**Decision:** Pilot runner created aliases but verification failed; rollback was performed.
**Raw Handoff URL:** https://raw.githubusercontent.com/r0cksteadyw00t/plex-logs/main/latest/scarflix_v2/GROK_HANDOFF_FOR_GROK.md

### Outcome
The dedicated protected Path 2 pilot migration runner was created, registered with the Orchestrator, and exercised against a 3-title additive pilot. The fresh baseline gate passed at 74/105 visible, meeting the minimum threshold of 74.

The pilot did **not** pass verification. The runner created the additive traditional-file aliases, then detected verification failure and performed automatic rollback. No publication, expansion, cleanup, deletion, folder move, source mutation, cache clear, or refresh was performed. PAUSE_PUBLICATION remained active through the Orchestrator safety state.

### Selected Pilot Titles
- scarflix_part-d8b22fb3f498688e: D:\StremioCatalog\_Hybrid\Movies\_ScarFLIXLive\06 Discover Movies\Annihilation (2018)\Annihilation (2018).mkv
- scarflix_part-2eaab8df357724dc: D:\StremioCatalog\_Hybrid\Movies\_ScarFLIXLive\06 Discover Movies\Armageddon (1998)\Armageddon (1998).mkv
- scarflix_part-8aa2235ef7c1e0f6: D:\StremioCatalog\_Hybrid\Movies\_ScarFLIXLive\06 Discover Movies\Battleship (2012)\Battleship (2012).mkv

### Rollback Reasons
- WebDAV HEAD failed for scarflix_part-d8b22fb3f498688e
- WebDAV HEAD failed for scarflix_part-2eaab8df357724dc
- WebDAV HEAD failed for scarflix_part-8aa2235ef7c1e0f6

### Rollback Actions
- removed_alias_symlink: D:\StremioCatalog\_Hybrid\Movies\_ScarFLIXLive\06 Discover Movies\Battleship (2012)\Battleship (2012).mkv
- removed_alias_symlink: D:\StremioCatalog\_Hybrid\Movies\_ScarFLIXLive\06 Discover Movies\Armageddon (1998)\Armageddon (1998).mkv
- removed_alias_symlink: D:\StremioCatalog\_Hybrid\Movies\_ScarFLIXLive\06 Discover Movies\Annihilation (2018)\Annihilation (2018).mkv
- restored_webdav_map_backup: D:\PlexTools\state\scarflix_v2\webdav_map.json

### Verification Assessment
The failure is not a content-migration success. It indicates that the additive alias mechanism is not yet safe to scale because the service-context/local-path/WebDAV verification path could not prove continuity for the pilot titles. The correct next action is to keep Path 2 migration paused, preserve the runner as a protected harness, and diagnose the verification layer before any additional pilot attempt.

### Recommendation
Do not scale Stage B. Next safe focus: diagnose why Orchestrator service-context verification reports legacy path ENOENT/WebDAV HEAD failures for titles that remain represented in webdav_map.json, using read-only checks only. If a future retry is considered, use one title only and require a preflight WebDAV HEAD PASS before creating any alias.

<!-- PATH2_STAGE_B_PROTECTED_PILOT_RESULT:END -->

# Materialized QA Incident Hypothesis Ledger

- Updated UTC: 2026-06-11T01:03:51.557Z
- Incident: `INC-MQA-HYBRID-MOVIES-LIVE-TIMEOUT-20260610`
- Status: PASS_FORMALISED_P0_INCIDENT
- P0: true
- QA: REVIEW 119/229, failed=110
- Timeout failures: 106
- Section 5 failures: 106
- Hybrid movies live failures: 105

## Leading Hypotheses

- `H1_SERVICE_CONTEXT_PATH_VISIBILITY` HIGH (0.9): Keep service diagnostics metadata-first. Use only controlled user-context samples for target-follow evidence; do not attempt service/system rclone mount changes in this incident.
- `H5_PLEX_SECTION_CACHE_OR_METADATA_BEHAVIOR` HIGH (0.86): Plan targeted QA-only mitigation/reconciliation for Plex metadata/path visibility; escalate before cleanup or mutation.

## Hypotheses

### H1_SERVICE_CONTEXT_PATH_VISIBILITY

- Hypothesis: Service-context path visibility or symlink target resolution fails because the Orchestrator service context cannot reliably follow user-session S: rclone mount targets.
- Confidence: HIGH (0.9)
- Next bounded test: Keep service diagnostics metadata-first. Use only controlled user-context samples for target-follow evidence; do not attempt service/system rclone mount changes in this incident.

Evidence for:
- Service-context probe classified 20/20 sampled paths as service/host visibility inaccessible.
- User-context tiny probe statted 8/8 sampled target stream files with 0 timeouts.
- Known path model: D:\StremioCatalog ScarFLIX_part entries are directory symlinks to S:\media, while S: is maintained in user context.
- Timing probe reconfirmed service-context inaccessible paths 8/8 while user-context evidence remained OK for 8/8.

Evidence against:
- This explains service-context diagnostics, but not by itself why Plex/materialized decision QA timed out once Plex-visible rows existed.
- User-context probe confirms sampled files exist, so the Materialized QA failure cannot be reduced to missing files.

### H2_RESOLVER_INDEXING_TIMING_LOAD

- Hypothesis: Resolver, Plex indexing, or decision timing is load-sensitive for hybrid_movies_live paths after files are present.
- Confidence: MEDIUM_HIGH (0.68)
- Next bounded test: Use Plex metadata comparison evidence to plan a QA-only reconciliation diagnostic; do not broaden QA yet.

Evidence for:
- Materialized QA is REVIEW 119/229 failed=110 with 106 timeout-class failures.
- Timeouts are concentrated in Movies section 5 and hybrid_movies_live paths.
- User-context file stat succeeded for sampled rows, moving suspicion toward Plex decision/indexing/load timing.
- Timing probe Plex metadata result: 2xx=8/8, timeouts=0.
- Plex metadata comparison found not-indexed/not-found samples=8/8.

Evidence against:
- Timing probe did not run full Materialized PlexDecisionQA, so this remains a diagnostic signal rather than a gate result.
- Some rows passed in the same QA set, so timing may be path-family-specific rather than globally systemic.

### H3_WEBDAV_RCLONE_LATENCY_UNDER_LOAD

- Hypothesis: WebDAV or rclone latency under load is causing timeout behavior for large or live-path materialized files.
- Confidence: LOW_MEDIUM (0.3)
- Next bounded test: Measure WebDAV HEAD plus optional tiny range timing on the same 8-path sample, concurrency 1, strict timeout, no media read beyond tiny range.

Evidence for:
- Affected paths traverse rclone/WebDAV-backed materialized storage.
- The failure mode is timeout-heavy rather than deterministic wrong-path or missing-file failure.
- File sizes in the confirmed sample include multi-GB streams.
- Timing probe WebDAV HEAD result: 2xx=7/8, timeouts=0.

Evidence against:
- User-context target stat completed quickly for all sampled files.
- WebDAV HEAD did not timeout on the sampled paths.

### H4_QA_HARNESS_TIMEOUT_THRESHOLD_MISMATCH

- Hypothesis: The QA harness timeout threshold is too aggressive for the hybrid_movies_live path family or large-file decision path.
- Confidence: MEDIUM (0.42)
- Next bounded test: Read harness timeout config and compare elapsed timing distributions for pass controls versus confirmed fail samples before changing any timeout.

Evidence for:
- Timeout is the dominant reported reason.
- Affected samples include large files and live-path family rows.
- QA target count is broad enough that a fixed timeout mismatch could create clustered REVIEW results.

Evidence against:
- Timing probe completed without changing QA harness settings; harness tuning remains a planning-only mitigation.
- The current evidence does not separate Plex decision timeout from WebDAV/rclone timeout.

### H5_PLEX_SECTION_CACHE_OR_METADATA_BEHAVIOR

- Hypothesis: Plex section-specific cache freshness or metadata/path extraction behavior is contributing to the timeout cluster.
- Confidence: HIGH (0.86)
- Next bounded test: Plan targeted QA-only mitigation/reconciliation for Plex metadata/path visibility; escalate before cleanup or mutation.

Evidence for:
- Failures are heavily concentrated in Movies section 5.
- Playback QA controller previously triggered Plex scans for sections 5 and 6.
- Smaller TV section 6 involvement suggests section/path cache behavior still needs control comparison.
- Plex metadata vs webdav_map comparison expected ScarFLIX_part matches=0/8, same-section mismatches=0, same-section rows without parts=0, rows with part files=0.

Evidence against:
- Path family concentration may be stronger than section behavior.
- Timing probe Plex path matching result: matching ScarFLIX_part paths=0/8.
- No evidence yet contradicts the Plex metadata/path mapping mismatch hypothesis.

## Safety

- `PAUSE_PUBLICATION` remains required.
- No publication, deletion, cleanup, path rewrite, source mutation, broad retry, or inline full QA is authorized by this ledger.
