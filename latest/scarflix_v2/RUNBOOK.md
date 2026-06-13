# Runbook

Last updated: 2026-06-13 12:46 Australia/Sydney.

## Plex Availability Watchdog

Worker:

- `D:\PlexTools\Foundry\workers\JasonOS_Prime_PlexWatchdog.js`

Hidden launcher:

- `D:\PlexTools\Scripts\scarflix_v2\hidden_tasks\JasonOS_Prime_PlexWatchdog.vbs`

Scheduled task:

- `JasonOS_Prime_PlexWatchdog`
- Runs every 1 minute.
- `JasonOS_Prime_PlexWatchdog_Logon` also runs once at user logon.

Status files:

- `D:\PlexTools\public\latest\scarflix_v2\jasonos_prime_plex_watchdog_status.json`
- `D:\PlexTools\public\latest\scarflix_v2\jasonos_prime_plex_watchdog_status.md`
- `D:\PlexTools\logs\jasonos_prime\jasonos_prime_plex_watchdog.log`

Correct interpretation:

- `PASS` means Plex is running and `/identity` returned HTTP 200.
- `started_plex_media_server` means Plex was absent and the watchdog started it.
- `REVIEW_PLEX_PROCESS_RUNNING_HTTP_UNREACHABLE` means the process exists but the local identity endpoint did not respond; do not kill Plex automatically.

Safety:

- The watchdog starts Plex only if absent.
- It never kills or restarts a running Plex server.
- It does not touch ScarFLIX publication state, sources, symlinks, or `webdav_map.json`.
- NSSM service conversion is held unless Plex can be run under the same user/profile context. See `docs/PLEX_AVAILABILITY_STRATEGY.md`.

## Mission 002 IPTV Live Phase 0

Design:

- `docs/MISSION_002_IPTV_LIVE_DESIGN.md`

Initial safe implementation order:

1. Create isolated IPTV status/model scaffolding.
2. Add `iptv_channel_mappings` and explicit override model.
3. Seed a small Channel 7 / AFL mapping set in held status only.
4. Add validator and generator dry-run outputs.
5. Allow Plex-facing `master.m3u` / `master.xml` only after Guardian validation passes.

Boundaries:

- IPTV must not modify ScarFLIX Path 2 aliases, `webdav_map.json`, or `PAUSE_PUBLICATION`.
- Paid sources, credentials, or major source-strategy choices require Jason approval.
- Reflector proposals are advisory until explicitly promoted.

Last updated: 2026-06-08 20:17 Australia/Sydney.

## Controlled Materialized/WebDAV Batch Flow

Current approved publishing path:

1. Stage candidate `.strm` files privately under `D:\PlexTools\state\scarflix_v2\staged_raw_strm\pending`.
2. Run hidden task `ScarFLIX_v2_MaterializedExpansionBatch`.
3. Publisher creates Plex-visible materialized/WebDAV symlink directories only after HEAD and HLS/transcoder probe pass.
4. Run `ScarFLIX_v2_MaterializedPlexDecisionQA` on demand.
5. Keep only links that pass targeted Plex decision QA visible.
6. Hide/quarantine partial, stuck, or unverified links.

Status files:

- `D:\PlexTools\public\latest\scarflix\catalog_symlink_publisher_status.json`
- `D:\PlexTools\public\latest\scarflix_v2\materialized_canary_decision_qa_status.json`
- `D:\PlexTools\public\latest\scarflix_v2\materialized_visibility_cleanup_status.json`
- `D:\PlexTools\public\latest\scarflix_v2\playback_architecture_status.json`

Known current result:

- Batch 1 targeted Plex decision QA: `10/10` PASS.
- Batch 2 targeted Plex decision QA: `8/8` PASS.
- Verified visible materialized items: `18`.
- Legacy direct resolver `.strm` publishing remains paused.

## Targeted Materialized Plex Decision QA

Primary script:

- `D:\PlexTools\Scripts\scarflix_v2\ScarFLIX_v2_MaterializedPlexDecisionQA.ps1`

Scheduled task:

- `ScarFLIX_v2_MaterializedPlexDecisionQA`
- Runs hidden on demand as `SYSTEM`.

Status files:

- `D:\PlexTools\public\latest\scarflix_v2\materialized_canary_decision_qa_status.json`
- `D:\PlexTools\public\latest\scarflix_v2\materialized_canary_decision_qa_status.md`
- `D:\PlexTools\public\latest\scarflix_v2\playback_architecture_status.json`

Correct interpretation:

- This is the authoritative Plex decision QA for the materialized/WebDAV canary.
- It reads `ScarFLIX_part-*` hashes from `D:\PlexTools\public\latest\scarflix\catalog_symlink_publisher_status.json`.
- It then checks Plex DB media parts for those exact hashes and calls Plex HLS decision for matching metadata.
- `REVIEW_PLEX_SCAN_PENDING` means the canary file exists but Plex has not scanned/profiled every target yet.
- Current known result at `2026-06-08 18:28`: target `2`, checked `1`, passed `1`, failed `0`; `The Green Mile` passed and the TV canary is scan-pending.
- If scan-pending persists for more than two task cycles, inspect Plex section `6` scanning and the path `ScarFLIX_part-23f3fa0fd9dba040`.

## Legacy Resolver Visibility Quarantine

Worker:

- `D:\PlexTools\Foundry\workers\ScarFLIX_v2_LegacyResolverVisibilityQuarantine.js`

Status:

- `D:\PlexTools\public\latest\scarflix_v2\legacy_resolver_visibility_quarantine_status.json`

Quarantine root:

- `D:\PlexTools\state\scarflix_v2\legacy_resolver_visibility_quarantine`

Correct interpretation:

- Legacy `18788/live` resolver `.strm` entries are hidden from Plex visibility because they repeatedly failed Plex HTTP playback/decision.
- The move is reversible through the manifest, but entries must not be restored until a fallback-specific Plex decision proof exists.
- Current result: `113` entries moved, `0` failed, Plex scans requested for sections `5` and `6`.

## Public Mirror Publishing

Worker:

- `D:\PlexTools\Foundry\workers\JasonOS_Prime_PublicMirrorPublisher.js`

Current behavior:

- Publishes the rendered dashboard plus materialized canary QA, playback architecture, legacy resolver quarantine, and expansion pause status files.
- Latest known status: `PASS`, pushed files `120`, failed files `0`.

## Materialized/WebDAV Playback Canary

Primary script:

- `D:\PlexTools\Scripts\scarflix_v2\ScarFLIX_v2_MaterializedPlaybackCanary.ps1`

Scheduled task:

- `ScarFLIX_v2_MaterializedPlaybackCanary`

Status files:

- `D:\PlexTools\public\latest\scarflix_v2\playback_architecture_status.json`
- `D:\PlexTools\public\latest\scarflix_v2\playback_architecture_status.md`

Supporting publisher:

- `D:\PlexTools\Scripts\scarflix_v2\ScarFLIX_v2_CatalogSymlinkPublisher.ps1`
- `D:\PlexTools\public\latest\scarflix\catalog_symlink_publisher_status.json`

Correct interpretation:

- This canary is allowed while broad expansion is paused.
- It targets only two items.
- It uses WebDAV-backed symlink `stream.mkv` files and Plex Transcoder HLS probing.
- HLS pass is not final playback success. Detached Plex decision QA must also pass.
- Do not re-enable broad catalogue publishing until the canary has passed.

Legacy direct resolver:

- Local resolver `18788` is fallback-only.
- `ScarFLIX_v2_DirectStrmMirror` is disabled as the default path unless `SCARFLIX_ENABLE_DIRECT_RESOLVER_FALLBACK=1`.

## Expansion Pause For Playback Fix

Pause flag:

- `D:\PlexTools\state\scarflix_v2\expansion_paused_until_playback_fix.json`

Public status:

- `D:\PlexTools\public\latest\scarflix_v2\expansion_pause_status.json`

Paused producer tasks:

- `JasonOS_Prime_ScarFLIX_Canary`
- `JasonOS_Prime_ScarFLIX_Canary_StageOnly`
- `ScarFLIX_v2_StagedCandidatePublisher`
- `ScarFLIX_v2_SafeWebDavExpansionPipeline`
- `ScarFLIX_v2_DirectStrmMirror`
- `ScarFLIX_v2_LiveCatalogSeeder`
- `ScarFLIX_v2_WebDavVirtualCatalogPublisher`

Allowed diagnostic tasks:

- `ScarFLIX_v2_DirectStrmAdmissionGate`
- `JasonOS_Prime_PlaybackQA_Controller`
- `ScarFLIX_v2_ConcurrentStreamQA`
- `JasonOS_Prime_NodeWatchdog_5min`
- `JasonOS_Prime_OutcomeDashboard`
- `JasonOS_Prime_PublicMirrorPublisher`

Correct interpretation:

- `PAUSED_PLAYBACK_FIX` is intentional, not a stall.
- Do not re-enable expansion tasks until the direct Plex playback model is fixed.
- If direct `.strm` count grows while paused, inspect for an unguarded producer path.

## PlatformGate Core Gate Contract

PlatformGate publishing readiness now uses core snapshot gates only.

Blocking gates:

- `active_gate`
- `visible_catalog_qa`
- `plex_client_decision_qa`

Non-blocking capability verification:

- `concurrent_stream_qa`

Correct interpretation:

- `snapshot_scoped_health.status=PASS` and `health_contract.blocked_by=none` means PlatformGate may PASS.
- `concurrent_stream_qa.status=REVIEW` is not a PlatformGate blocker when `concurrent_stream_qa.blocking=false`.
- 5-concurrent QA should continue to run periodically on larger sets as the catalogue grows.
- Do not block Canary/staged publishing solely because the current PlatformGate snapshot is too small for 5-concurrent validation.

Status fields:

- `D:\PlexTools\public\latest\scarflix_v2\platform_gate_checkpoint.json`
- `platform_gate.qa.concurrent_stream_qa.blocking`
- `platform_gate.qa.concurrent_stream_qa.scope`
- `platform_gate.snapshot_scoped_health.status`
- `platform_gate.health_contract.blocked_by`

## Staged Candidate Publisher Core Gate

Task:

- `ScarFLIX_v2_StagedCandidatePublisher`

Runner:

- `"C:\Program Files\nodejs\node.exe" "D:\PlexTools\Foundry\workers\ScarFLIX_v2_StagedCandidatePublisher.js"`

Status file:

- `D:\PlexTools\public\latest\scarflix_v2\staged_candidate_publisher_status.json`

Publishing dependency:

- `D:\PlexTools\public\latest\scarflix_v2\platform_gate_checkpoint.json`
- `D:\PlexTools\public\latest\scarflix\platform_gate_status.json`

Required state before publishing visible direct `.strm` files:

- core PlatformGate gates pass:
  - `active_gate`
  - `visible_catalog_qa`
  - `plex_client_decision_qa`
- no core blockers remain.
- `concurrent_stream_qa` is ignored as a publishing blocker.

If the required core PlatformGate state is not present:

- Publisher must write `WAITING_CORE_PLATFORM_GATE`.
- Publisher must not process pending candidates.
- Publisher must not write new visible `.strm` files.
- Pending staged candidates remain staged; titles are not rejected.

Current behavior:

- Publisher still probes each staged candidate with HEAD and `Range: bytes=0-1`.
- Candidates with retryable `429`, `503`, or provider timeout failures move to retry-held source queue.
- Candidates that pass individual admission can be written even while 5-concurrent QA continues in the background.

## Direct STRM Admission Gate

Task:

- `ScarFLIX_v2_DirectStrmAdmissionGate`

Runner:

- `"C:\Program Files\nodejs\node.exe" "D:\PlexTools\Foundry\workers\ScarFLIX_v2_DirectStrmAdmissionGate.js"`

Schedule:

- Every 5 minutes as `SYSTEM`.

Status files:

- `D:\PlexTools\public\latest\scarflix_v2\direct_strm_admission_gate_status.json`
- `D:\PlexTools\public\latest\scarflix_v2\direct_strm_admission_gate_status.md`
- `D:\PlexTools\public\latest\scarflix_v2\direct_strm_retry_queue.json`

Quarantine:

- Retry-held visible removals live under `D:\PlexTools\state\scarflix_v2\direct_strm_quarantine\retry_visible_removed`.
- Metadata records live under `D:\PlexTools\state\scarflix_v2\direct_strm_quarantine\records`.

Behavior:

- Scans visible `.strm` files in the Streaming Movies and Shows libraries.
- Probes each URL with HEAD and `Range: bytes=0-1`.
- Keeps passing entries visible.
- Moves failed visible entries out of Plex visibility and records a source-only quarantine reason.
- Transient failures such as `429`, `503`, and provider timeout become retry-held source failures.
- The title remains wanted/retryable.
- Plex scanner sections `5` and `6` are triggered after visible files are moved or restored.
- The gate is also launched by `JasonOS_Prime_NodeWatchdog_5min.js` when stale or non-PASS.

Important interpretation:

- `direct_strm_admission_gate_status.json.status=PASS` means currently visible direct `.strm` entries passed the direct URL admission probe.
- `REVIEW_RETRY_HELD` means visible entries may be safe, but one or more hidden failed sources are waiting for retry.
- `REVIEW_QUARANTINED_VISIBLE_FAILURES` means the latest run found visible failures and moved them out of Plex visibility; wait for Plex scan and the next admission run before treating direct playback QA as clean.
- `plex_client_decision_qa_status.json` may still be legacy WebDAV-scoped. Do not treat it as direct `.strm` playback proof unless the playback controller also reports direct admission PASS or retry-held-safe.

## PlatformGate Snapshot Health Contract

PlatformGate PASS is snapshot-scoped.

Blocking gates:

- `active_gate`
- `visible_catalog_qa`
- `plex_client_decision_qa`

Non-blocking capability verification:

- `concurrent_stream_qa`

Visibility-only global health:

- `scarflix_v2_health.json`

Expected status fields:

- `platform_gate_status.json.status`
- `platform_gate_status.json.snapshot_scoped_health.status`
- `platform_gate_status.json.global_health.status`
- `platform_gate_status.json.global_health.blocking`
- `platform_gate_status.json.health_contract.blocked_by`

Correct interpretation:

- `snapshot_scoped_health.status=PASS` and `health_contract.blocked_by=none` means PlatformGate may PASS.
- `global_health.status=REVIEW` is not a PlatformGate blocker when `global_health.blocking=false`.
- `concurrent_stream_qa.status=REVIEW` is not a PlatformGate blocker when `concurrent_stream_qa.blocking=false`.
- Canary may start the safe expansion pipeline when PlatformGate status is `PASS`, even if global health is still `REVIEW` for legacy/non-snapshot reasons.

## ScarFLIX Canary Controller

Task:

- `JasonOS_Prime_ScarFLIX_Canary`

Runner:

- `wscript.exe "D:\PlexTools\Foundry\workers\Run_Node_Hidden.vbs" "D:\PlexTools\Foundry\workers\JasonOS_Prime_ScarFLIX_Canary.js"`

Schedule:

- Every 10 minutes.

Status files:

- `D:\PlexTools\public\latest\scarflix_v2\scarflix_canary_status.json`
- `D:\PlexTools\public\latest\scarflix_v2\scarflix_canary_status.md`

Behavior:

- Counts actual Streaming `.strm` files.
- Waits while PlatformGate is not PASS.
- Starts the existing safe expansion pipeline detached only after PlatformGate PASS.
- Uses the existing hidden scheduled task `ScarFLIX_v2_SafeWebDavExpansionPipeline` for publish runs. Do not use direct Node-spawned PowerShell for this pipeline unless the scheduled task is unavailable.
- Treats the safe pipeline internal lock `D:\PlexTools\state\scarflix_v2\safe_webdav_expansion_pipeline.lock` as running evidence because Task Scheduler may report `Ready` after its wrapper spawns the hidden child process.
- Records baseline `.strm` counts and new `.strm` delta.
- Does not treat visible QA rows as delivered catalogue.

## Forensic Investigator Patch - 2026-06-07 15:51

Current evidence artifact:

- Local: `D:\PlexTools\public\latest\scarflix_v2\current_forensic_state_after_patch_20260607.json`
- Public: `https://raw.githubusercontent.com/r0cksteadyw00t/plex-logs/main/latest/scarflix_v2/current_forensic_state_after_patch_20260607.json`

Dashboard links:

- Canonical v2 HTML: `https://raw.githack.com/r0cksteadyw00t/plex-logs/main/latest/scarflix_v2/index.html`
- Raw v2 JSON: `https://raw.githubusercontent.com/r0cksteadyw00t/plex-logs/main/latest/scarflix_v2/jasonos_prime_outcome_dashboard.json`

Runner behavior:

- Durable PlatformGate heartbeat interval: `30` seconds.
- Child progress stale threshold: `5` minutes.
- Bounded orphan kill threshold: `5` minutes.
- Do not run PlatformGate inline in Codex.

Transient queue:

- Retryable provider/source failures are written to `D:\PlexTools\state\scarflix_v2\source_quarantine_queue\transient_source_quarantine_queue.json`.
- Transient queue entries must keep `title_not_rejected=true` and `source_not_destructively_pruned=true`.
- The next PlatformGate/controller patch must consume this queue so retry-held provider failures are visible as retry work, not product health.

8805 AI backend:

- Health: `http://127.0.0.1:8805/api/health`
- Status: `http://127.0.0.1:8805/api/status`
- Streaming chat: `POST http://127.0.0.1:8805/api/send-stream`
- The streaming chat endpoint uses server-sent events and local Ollama streaming.

## Forensic Pause Mode

Current pause status:

- `D:\PlexTools\public\latest\scarflix_v2\forensic_pause_status.json`
- `D:\PlexTools\public\latest\scarflix_v2\project_truth.json`

Disabled progression tasks:

- `ScarFLIX_v2_AutonomousController`
- `ScarFLIX_v2_DurablePlatformGateRunner`
- `JasonOS_Prime_OutcomeDashboard`
- `JasonOS_Prime_PublicMirrorPublisher`

Do not re-enable these until an explicit reset milestone is selected.

Current forensic review:

- `docs/FORENSIC_REVIEW_AND_RESET_PLAN_20260607.md`

## VisibleCatalogQA Source Quarantine

Symptom:

- PlatformGate reaches `VisibleCatalogQA`.
- ActiveGate is `PASS`.
- VisibleCatalogQA logs `Plex Transcoder HLS probe timed out` or `Plex Transcoder HLS probe did not produce valid output` for specific titles.
- PlatformGate would otherwise stop as `REVIEW`.

Expected controller behavior:

- Detect failed VisibleCatalogQA `results`.
- Start `ScarFLIX_v2_SourceQuarantine.ps1` with `-ReasonStatusFile D:\PlexTools\public\latest\scarflix\visible_catalog_qa_status.json`.
- Quarantine only the failed source/release.
- Keep the title wanted/retryable.
- Relaunch detached `ScarFLIX_v2_DurablePlatformGateRunner` after fresh quarantine completes.

Reason codes:

- `PLEX_HLS_TIMEOUT`
- `PLEX_HLS_PROBE_FAILED`
- `RAW_STRM_VISIBLE`

Do not manually fix individual titles unless the failure proves a new systemic rule failure.

## PlatformGate Child Argument Forwarding

If VisibleCatalogQA logs:

```text
Visible catalog QA starting MaxItems=0 HideFailed=False PathListFile=
Visible rows selected for QA: 66
```

while PlatformGate expected a `65`-row snapshot, inspect `Invoke-ChildPs`.

Correct behavior:

- The function parameter must be `$ChildArgs`, not `$Args`.
- The child invocation must splat `@ChildArgs`.
- The call site must use `-ChildArgs $step.args`.

This prevents PowerShell automatic `$args` behavior from dropping `-PathListFile`.

## Same-Snapshot VisibleCatalogQA

Current rule:

- PlatformGate must pass the snapshot path list to VisibleCatalogQA:

```powershell
powershell.exe -NoProfile -ExecutionPolicy Bypass -File "D:\PlexTools\Scripts\scarflix_v2\ScarFLIX_v2_VisibleCatalogQA.ps1" -MaxItems 0 -PathListFile "<snapshot_paths_file>"
```

Expected behavior:

- `VisibleCatalogQA` filters live Plex rows to the supplied snapshot paths.
- `checked` should equal the PlatformGate snapshot visible count unless a listed path is no longer visible, which should be treated as snapshot drift.
- Do not manually fix the extra/missing title; fix the snapshot handoff or visibility drift path.

## Canonical Dashboard Links

Use:

- `https://r0cksteadyw00t.github.io/plex-logs/latest/scarflix_v2/`
- `https://r0cksteadyw00t.github.io/plex-logs/latest/scarflix_v2/jasonos_prime_outcome_dashboard.json`

Compatibility alias:

- `https://raw.githack.com/r0cksteadyw00t/plex-logs/main/latest/scarflix/index.html`

If the compatibility alias looks stale, verify the canonical v2 JSON first.

## Unmapped Visible Failure Quarantine

Symptom:

- WebDAV ActiveGate reports failed visible paths, but `D:\PlexTools\state\scarflix_v2\webdav_map.json` already contains only passing entries.
- Source quarantine previously returned `REVIEW` with candidates but `quarantined=0` because it only acted on matching map entries.

Expected behavior now:

- `ScarFLIX_v2_SourceQuarantine.ps1` records unmatched visible failures as source/release quarantine evidence.
- It keeps the title wanted/retryable.
- It uses the failed `rclone_path` as the Plex row hide target.
- If ActiveGate is already `PASS` with zero candidates, source quarantine reports PASS/no-op.

Do not manually fix individual titles. Let the controller/durable runner rerun the same-snapshot gate detached.

## Repeated Transient-Only REVIEW Handling

Current controller rule:

- Retry transient-only PlatformGate REVIEW with backoff up to `3` cycles.
- Use a sorted failure-set signature, not the first failed row, to detect repeated loops.
- If the same transient-only WebDAV/provider failure set repeats after the cap, start:

```powershell
powershell.exe -NoProfile -ExecutionPolicy Bypass -WindowStyle Hidden -File "D:\PlexTools\Scripts\scarflix_v2\ScarFLIX_v2_SourceQuarantine.ps1" -ReasonStatusFile "D:\PlexTools\public\latest\scarflix\webdav_active_gate_status.json" -IncludeTransient
```

Important:

- This is source/release quarantine, not title rejection.
- It removes the failed visible source/release and keeps the title wanted/retryable for alternate candidates.
- `ScarFLIX_v2_SourceQuarantine.ps1` backs up the WebDAV map and Plex DB before map/Plex visibility changes.
- Codex should not run PlatformGate inline after this. Let the controller/durable runner relaunch detached verification.

## Key Paths

- Scripts: `D:\PlexTools\Scripts\scarflix_v2`
- Logs: `D:\PlexTools\logs`
- Public status: `D:\PlexTools\public\latest\scarflix`
- State: `D:\PlexTools\state\scarflix_v2`
- WebDAV map: `D:\PlexTools\state\scarflix_v2\webdav_map.json`
- Rejected stage history: `D:\PlexTools\state\scarflix_v2\staged_raw_strm\rejected`
- Pending stage candidates: `D:\PlexTools\state\scarflix_v2\staged_raw_strm\pending`
- Plex DB: `C:\Users\jason\AppData\Local\Plex Media Server\Plug-in Support\Databases\com.plexapp.plugins.library.db`

## Current Authoritative Status Files

- Platform gate: `D:\PlexTools\public\latest\scarflix\platform_gate_status.json`
- Durable PlatformGate runner: `D:\PlexTools\logs\scarflix_v2_durable_platform_gate_runner_status.json`
- Durable PlatformGate heartbeat: `D:\PlexTools\state\scarflix_v2\platform_gate_durable_heartbeat.json`
- Local PlatformGate checkpoint summary: `D:\PlexTools\public\latest\scarflix_v2\platform_gate_checkpoint.md`
- Local PlatformGate checkpoint JSON: `D:\PlexTools\public\latest\scarflix_v2\platform_gate_checkpoint.json`
- Local PlatformGate status checker: `D:\PlexTools\Scripts\scarflix_v2\ScarFLIX_v2_PlatformGate_CheckStatus.ps1`
- Autonomous controller status JSON: `D:\PlexTools\public\latest\scarflix_v2\autonomous_controller_status.json`
- Autonomous controller status markdown: `D:\PlexTools\public\latest\scarflix_v2\autonomous_controller_status.md`
- Candidate source model status JSON: `D:\PlexTools\public\latest\scarflix_v2\candidate_source_model_status.json`
- Candidate source model status markdown: `D:\PlexTools\public\latest\scarflix_v2\candidate_source_model_status.md`
- Infrastructure keepalive status JSON: `D:\PlexTools\public\latest\scarflix_v2\scarflix_v2_infra_keepalive_status.json`
- Rclone mount keepalive status JSON: `D:\PlexTools\public\latest\scarflix_v2\scarflix_v2_rclone_mount_keepalive_status.json`
- JasonOS 8805 AI keepalive status JSON: `D:\PlexTools\public\latest\scarflix_v2\jasonos_real_ai_8805_keepalive_status.json`
- JasonOS worker mesh status JSON: `D:\PlexTools\public\latest\scarflix_v2\jasonos_prime_worker_mesh_status.json`
- JasonOS worker mesh status markdown: `D:\PlexTools\public\latest\scarflix_v2\jasonos_prime_worker_mesh_status.md`
- JasonOS predictive simulator status JSON: `D:\PlexTools\public\latest\scarflix_v2\jasonos_prime_predictive_simulator_status.json`
- JasonOS predictive simulator markdown: `D:\PlexTools\public\latest\scarflix_v2\jasonos_prime_predictive_simulator_status.md`
- JasonOS self-evolution status JSON: `D:\PlexTools\public\latest\scarflix_v2\jasonos_prime_self_evolution_status.json`
- JasonOS self-evolution markdown: `D:\PlexTools\public\latest\scarflix_v2\jasonos_prime_self_evolution_status.md`
- JasonOS public mirror status JSON: `D:\PlexTools\public\latest\scarflix_v2\jasonos_prime_public_mirror_status.json`
- JasonOS public mirror markdown: `D:\PlexTools\public\latest\scarflix_v2\jasonos_prime_public_mirror_status.md`
- JasonOS outcome dashboard JSON: `D:\PlexTools\public\latest\scarflix_v2\jasonos_prime_outcome_dashboard.json`
- JasonOS outcome dashboard markdown: `D:\PlexTools\public\latest\scarflix_v2\jasonos_prime_outcome_dashboard.md`
- JasonOS recent updates JSON: `D:\PlexTools\public\latest\scarflix_v2\jasonos_prime_recent_updates.json`
- JasonOS recent updates markdown: `D:\PlexTools\public\latest\scarflix_v2\jasonos_prime_recent_updates.md`
- JasonOS public mirror publisher: `D:\PlexTools\Foundry\workers\JasonOS_Prime_PublicMirrorPublisher.js`
- JasonOS FastTrack accelerator JSON: `D:\PlexTools\public\latest\scarflix_v2\jasonos_prime_fast_track_accelerator_status.json`
- JasonOS FastTrack accelerator markdown: `D:\PlexTools\public\latest\scarflix_v2\jasonos_prime_fast_track_accelerator_status.md`
- JasonOS quiet scheduled-task status JSON: `D:\PlexTools\public\latest\scarflix_v2\jasonos_prime_quiet_tasks_status.json`
- JasonOS quiet scheduled-task markdown: `D:\PlexTools\public\latest\scarflix_v2\jasonos_prime_quiet_tasks_status.md`
- JasonOS Prime inspection report: `D:\PlexTools\public\latest\scarflix_v2\JASONOS_PRIME_INSPECTION_REPORT.md`
- WebDAV publisher: `D:\PlexTools\public\latest\scarflix\webdav_virtual_catalog_status.json`
- Live seeder: `D:\PlexTools\public\latest\scarflix\live_catalog_status.json`
- Health: `D:\PlexTools\public\latest\scarflix\scarflix_v2_health.json`
- Active gate: `D:\PlexTools\public\latest\scarflix\webdav_active_gate_status.json`
- Visible QA: `D:\PlexTools\public\latest\scarflix\visible_catalog_qa_status.json`
- Plex decision QA: `D:\PlexTools\public\latest\scarflix\plex_client_decision_qa_status.json`
- Concurrent QA: `D:\PlexTools\public\latest\scarflix\concurrent_stream_qa_status.json`

## Legacy Task Containment

- `SF2_Autopilot` is disabled and should remain disabled during the modern ScarFLIX v2 controller era.
- Script backup: `D:\PlexTools\backups\scarflix_v2\SF2_Autopilot_2026-06-06_172215677Z.ps1.bak`
- Task XML backup: `D:\PlexTools\backups\scarflix_v2\tasks\SF2_Autopilot_2026-06-06_172537904Z.xml.bak`
- If `SF2_Autopilot` is re-enabled, first rebuild it to launch through `wscript.exe` hidden wrappers and confirm its `Quiesce` logic cannot disable `ScarFLIX_v2_AutonomousController`, `ScarFLIX_v2_DurablePlatformGateRunner`, `ScarFLIX_v2_Watchdog_StallDetector`, `JasonOS_Prime_Sentinel`, dashboard, mirror, FastTrack, or STRM resolver tasks.

## Launch Same-Snapshot Platform Gate Detached

Codex must not run this job inline or wait for completion. Codex may create/update the detached scheduled task, start it, verify launch, and stop.

Jason should not be asked to run or paste anything for this checkpoint. Codex reads these status files directly and uses the public mirror when remote viewing is needed.

Primary detached task name:

```text
ScarFLIX_v2_DurablePlatformGateRunner
```

Compatibility detached task name:

```text
ScarFLIX_v2_PlatformGate_LocalRunner_Detached
```

Task action:

```text
C:\Windows\System32\wscript.exe D:\PlexTools\Scripts\scarflix_v2\hidden_tasks\ScarFLIX_v2_DurablePlatformGateRunner.vbs
```

If `ScarFLIX_v2_DurablePlatformGateRunner` is found using direct `cmd.exe`, inspect and repair `D:\PlexTools\Scripts\scarflix_v2\ScarFLIX_v2_AutonomousController.ps1` before recreating the task. The controller must use the hidden wrapper path when it calls `schtasks.exe /Create`.

The durable runner:

- owns one durable lock and heartbeat;
- tracks owner and child PIDs;
- adopts a fresh existing PlatformGate child instead of starting a duplicate;
- kills only stale orphan PlatformGate children before relaunch;
- prevents overlap with publisher, AutoGate, VisibleCatalogQA, PlexDecisionQA, and ConcurrentQA;
- handles stale locks;
- runs same-snapshot PlatformGate without catalogue expansion;
- writes progress/final JSON to `D:\PlexTools\logs\scarflix_v2_durable_platform_gate_runner_status.json`;
- writes the checkpoint summary to `D:\PlexTools\public\latest\scarflix_v2\platform_gate_checkpoint.md`;
- writes public latest status JSON to `D:\PlexTools\public\latest\scarflix_v2\platform_gate_checkpoint.json`;
- publishes checkpoint markdown/json to the GitHub `plex-logs` mirror when a valid local GitHub PAT exists.
- retries a transient-only WebDAV ActiveGate REVIEW once inside the detached runner without pruning or expanding the catalogue.
- tracks child QA log freshness separately from runner heartbeat freshness.
- writes `child_qa_last_progress_utc`, `child_qa_last_progress_path`, `child_qa_stale_minutes`, and `child_qa_stale_threshold_minutes` to status/heartbeat.
- stops and retries a live child process when child QA logs are stale beyond threshold, because a fresh durable heartbeat alone can mask a hung child QA job.

PlatformGate stage behavior:

- PlatformGate should stop after the first non-PASS QA stage because the same snapshot cannot pass after that point.
- Do not continue into Plex decision QA or ConcurrentQA after ActiveGate or VisibleCatalogQA has already invalidated the snapshot.
- A non-PASS stage should become REVIEW/FAIL output for the controller to retry/backoff or source-quarantine.
- PlatformGate invokes Plex client decision QA with `-TimeoutSeconds 20 -Retries 0` so slow HLS decision failures do not block the entire system for hours.
- Plex client decision QA writes progressive `RUNNING` status after each row. Check `D:\PlexTools\public\latest\scarflix\plex_client_decision_qa_status.json` for live checked/passed/failed counts.

Dashboard child progress:

- The rendered/public dashboard includes `child_qa_progress`.
- If the parent milestone remains `PLATFORM_GATE_RUNNING`, inspect child stage, last child QA line, and child QA age before declaring a stall.
- The `Recent achievements` panel is rebuilt by `JasonOS_Prime_OutcomeDashboard.js` from live status each run.
- If `Recent achievements` appears stale, inspect `jasonos_prime_recent_updates.json` and confirm `source` is `live status merge`.
- A stale stored recent-updates file must not override fresher child QA, Durable PlatformGate, checkpoint, controller, or current-state doc updates.
- The rendered dashboard HTML also fetches live Pages JSON every 30 seconds and updates recent achievements/status client-side.
- Browser live source: `https://r0cksteadyw00t.github.io/plex-logs/latest/scarflix/jasonos_prime_outcome_dashboard.json`.
- If the static HTML timestamp looks old but the live JSON field is current, this is a Pages/static shell lag and not a PlatformGate stall.
- Raw path: `D:\PlexTools\public\latest\scarflix_v2\jasonos_prime_outcome_dashboard.json`.
- Rendered path: `D:\PlexTools\public\latest\scarflix_v2\jasonos_prime_outcome_dashboard.html`.

Relevant child QA log patterns:

```text
D:\PlexTools\logs\scarflix_v2_webdav_active_gate_*.log
D:\PlexTools\logs\scarflix_v2_visible_catalog_qa_*.log
D:\PlexTools\logs\scarflix_v2_plex_client_decision_qa_*.log
D:\PlexTools\logs\scarflix_v2_concurrent_stream_qa*.log
D:\PlexTools\logs\scarflix_v2_health*.log
```

If PowerShell parser checks time out from Codex, do not keep retrying them inline. Record the timeout, rely on static patch review, and let the local hidden scheduled runner validate on its next cycle.

Check detached status without running validation:

```powershell
powershell.exe -NoProfile -ExecutionPolicy Bypass -File "D:\PlexTools\Scripts\scarflix_v2\ScarFLIX_v2_PlatformGate_CheckStatus.ps1"
```

Remote raw URLs, if the GitHub mirror is available:

- `https://raw.githubusercontent.com/r0cksteadyw00t/plex-logs/main/latest/scarflix_v2/platform_gate_checkpoint.md`
- `https://raw.githubusercontent.com/r0cksteadyw00t/plex-logs/main/latest/scarflix_v2/platform_gate_checkpoint.json`

Phone-facing rendered dashboard URLs:

- `https://r0cksteadyw00t.github.io/plex-logs/latest/scarflix/`
- `https://r0cksteadyw00t.github.io/plex-logs/latest/scarflix_v2/`

GitHub Pages source:

```text
main:/docs
```

The public mirror publisher must publish rendered dashboard/status artifacts to both:

```text
latest/scarflix_v2
docs/latest/scarflix_v2
docs/latest/scarflix
```

If raw GitHub status is current but the phone-facing Pages dashboard is stale, check the `/docs/latest/...` copy and the GitHub Pages build status. A root-level `latest/...` push alone does not update Pages because Pages is configured to serve from `/docs`.

## Autonomous Controller

The Plex PC owns routine ScarFLIX v2 execution through:

```text
ScarFLIX_v2_AutonomousController
```

Task action:

```text
C:\Windows\System32\wscript.exe D:\PlexTools\Scripts\scarflix_v2\hidden_tasks\ScarFLIX_v2_AutonomousController.vbs
```

Schedule: every 15 minutes.

The controller:

- reads `docs/NEXT_ACTIONS.md` and current status JSON;
- ensures PlatformGate detached runner is active when the same-snapshot checkpoint is incomplete;
- retries transient-only PlatformGate REVIEW with backoff;
- does not expand the catalogue before PlatformGate PASS;
- after PlatformGate PASS, runs `D:\PlexTools\Scripts\scarflix_v2\ScarFLIX_v2_CandidateSourceModel.ps1` to verify the blanket source retry/quarantine model;
- starts source/release quarantine for permanent/prunable failures only;
- never destructively prunes transient 429/503/provider-timeout failures;
- publishes local and GitHub-mirrored controller status.
- treats recent child QA log activity as live PlatformGate progress when the checkpoint timestamp is stale.
- records `PLATFORM_GATE_CHILD_ACTIVE` instead of `BLOCKED_LOOP` when PlatformGate child logs are fresh.

## Quiet Scheduled Task Hygiene

Routine background tasks should not create visible console windows.

Installer:

```powershell
powershell.exe -NoProfile -ExecutionPolicy Bypass -File "D:\PlexTools\Scripts\scarflix_v2\JasonOS_Prime_QuietTasks_InstallOrUpdate.ps1" -StartShortWorkers
```

Status:

```text
D:\PlexTools\public\latest\scarflix_v2\jasonos_prime_quiet_tasks_status.json
D:\PlexTools\public\latest\scarflix_v2\jasonos_prime_quiet_tasks_status.md
```

The installer creates short per-task wrappers under:

```text
D:\PlexTools\Scripts\scarflix_v2\hidden_tasks
```

Expected task action pattern:

```text
C:\Windows\System32\wscript.exe D:\PlexTools\Scripts\scarflix_v2\hidden_tasks\<TaskName>.vbs
```

Current covered tasks include the durable PlatformGate runner, compatibility PlatformGate runner, autonomous controller, watchdog, rclone keepalive, infrastructure keepalive, Sentinel, FastTrack, OutcomeDashboard, PublicMirrorPublisher, WorkerMesh, 8805 keepalive, predictive simulator, self-evolution cycle, and `PlexTools_STRM_Resolver`.

Do not replace hidden-wrapper task actions with direct `cmd.exe`, `node.exe`, `powershell.exe`, or `pwsh.exe` actions.

Remote raw URLs, if the GitHub mirror is available:

- `https://raw.githubusercontent.com/r0cksteadyw00t/plex-logs/main/latest/scarflix_v2/jasonos_prime_quiet_tasks_status.json`
- `https://raw.githubusercontent.com/r0cksteadyw00t/plex-logs/main/latest/scarflix_v2/jasonos_prime_quiet_tasks_status.md`

## FastTrack Accelerator

Task:

```text
JasonOS_Prime_FastTrackAccelerator
```

Worker:

```text
D:\PlexTools\Foundry\workers\JasonOS_Prime_FastTrackAccelerator.js
```

Schedule: every 5 minutes.

FastTrack is a short worker. It does not run long validation inline. It:

- refreshes predictive simulator, self-evolution, worker mesh, outcome dashboard, public mirror, and 8805 keepalive;
- records actual `.strm` counts;
- ensures the durable PlatformGate runner is active while PlatformGate is not PASS;
- runs candidate-source model detached after PlatformGate PASS;
- launches controlled safe WebDAV expansion detached after candidate-source model PASS;
- writes current next-four-hour actions to its status JSON/markdown.

Milestone states:

```text
PLATFORM_GATE_RUNNING
PLATFORM_GATE_PASS
PLATFORM_GATE_REVIEW_TRANSIENT_RETRY_SCHEDULED
PLATFORM_GATE_FAIL_SOURCE_QUARANTINE_REQUIRED
CANDIDATE_SOURCE_MODEL_PENDING
CANDIDATE_SOURCE_MODEL_RUNNING
CANDIDATE_SOURCE_MODEL_PASS
BLOCKED_LOOP
BLOCKED_DECISION
BLOCKED_CREDENTIALS
BLOCKED_PERMISSION
```

Status check command:

```powershell
powershell.exe -NoProfile -ExecutionPolicy Bypass -File "D:\PlexTools\Scripts\scarflix_v2\ScarFLIX_v2_AutonomousController_Status.ps1"
```

Remote URLs:

- `https://raw.githubusercontent.com/r0cksteadyw00t/plex-logs/main/latest/scarflix_v2/autonomous_controller_status.json`
- `https://raw.githubusercontent.com/r0cksteadyw00t/plex-logs/main/latest/scarflix_v2/autonomous_controller_status.md`

## ScarFLIX Infrastructure Keepalive

The infrastructure keepalive is safe to keep enabled. It only maintains server health for:

- request server: `http://127.0.0.1:18787/health`
- stream proxy: `http://127.0.0.1:18788/health`
- WebDAV node bridge: `http://127.0.0.1:18789/health`

Task:

```text
ScarFLIX_v2_InfrastructureKeepalive
```

Script:

```text
D:\PlexTools\Scripts\scarflix_v2\ScarFLIX_v2_InfrastructureKeepalive.ps1
```

The keepalive does not run PlatformGate, expand the catalogue, publish new Plex items, or mutate the Plex DB.

## ScarFLIX Rclone Mount Keepalive

The WebDAV-backed Plex-safe catalogue depends on `S:\media\catalog` resolving locally.

Task:

```text
ScarFLIX_v2_RcloneMountKeepalive
```

Script:

```text
D:\PlexTools\Scripts\scarflix_v2\ScarFLIX_v2_RcloneMountKeepalive.ps1
```

Status:

```text
D:\PlexTools\public\latest\scarflix_v2\scarflix_v2_rclone_mount_keepalive_status.json
```

This task is safe to keep enabled. It only checks the local WebDAV bridge and rclone mount. It does not expand the catalogue or mutate Plex DB.

## JasonOS 8805 Real AI Backend

Active runtime:

```text
D:\PlexTools\Foundry\workers\JasonOS_Prime_Real_AI_8805_Node.js
```

Keepalive task:

```text
JasonOS_Prime_Real_AI_8805_Keepalive
```

Keepalive script:

```text
D:\PlexTools\Foundry\workers\JasonOS_Prime_Real_AI_8805_Keepalive.js
```

Status:

```text
D:\PlexTools\public\latest\scarflix_v2\jasonos_real_ai_8805_keepalive_status.json
```

Local endpoints:

```text
http://127.0.0.1:8805/
http://127.0.0.1:8805/api/status
http://127.0.0.1:8805/api/tools
http://127.0.0.1:8805/api/send
http://127.0.0.1:8805/api/send-stream
```

The Node backend reads local status files, writes the Foundry inbox/queue, calls local Ollama, and renders streaming-style browser responses with tool traces.

## JasonOS Prime Worker Mesh

Task:

```text
JasonOS_Prime_WorkerMesh
```

Worker:

```text
D:\PlexTools\Foundry\workers\JasonOS_Prime_WorkerMesh.js
```

Plugin registry:

```text
D:\PlexTools\Foundry\plugins\registry.json
```

Status:

```text
D:\PlexTools\public\latest\scarflix_v2\jasonos_prime_worker_mesh_status.json
D:\PlexTools\public\latest\scarflix_v2\jasonos_prime_worker_mesh_status.md
```

The worker mesh consumes JSON commands from:

```text
D:\PlexTools\Foundry\inbox
```

It writes command results to:

```text
D:\PlexTools\Foundry\outbox
```

It moves processed commands to:

```text
D:\PlexTools\Foundry\processed
```

It is allowed to repair safe orchestration drift, re-enable safe keepalive/controller tasks, clear stale PlatformGate/controller locks when no corresponding process is alive, and relaunch detached PlatformGate through:

```text
D:\PlexTools\Scripts\scarflix_v2\ScarFLIX_v2_PlatformGate_LocalRunner_Task.cmd
```

It is not allowed to bypass ScarFLIX publication gates. Catalogue expansion is allowed only after same-snapshot PlatformGate and candidate-source model are PASS.

## JasonOS Prime Predictive Simulator

Task:

```text
JasonOS_Prime_PredictiveSimulator
```

Worker:

```text
D:\PlexTools\Foundry\workers\JasonOS_Prime_PredictiveSimulator.js
```

Status:

```text
D:\PlexTools\public\latest\scarflix_v2\jasonos_prime_predictive_simulator_status.json
D:\PlexTools\public\latest\scarflix_v2\jasonos_prime_predictive_simulator_status.md
```

The simulator reads existing status/state only. It does not publish catalogue items, mutate Plex, or run PlatformGate. It marks expansion eligible only when PlatformGate, candidate-source model, and rclone mount are all PASS.

## JasonOS Prime Self-Evolution Cycle

Task:

```text
JasonOS_Prime_SelfEvolutionCycle
```

Worker:

```text
D:\PlexTools\Foundry\workers\JasonOS_Prime_SelfEvolutionCycle.js
```

Status:

```text
D:\PlexTools\public\latest\scarflix_v2\jasonos_prime_self_evolution_status.json
D:\PlexTools\public\latest\scarflix_v2\jasonos_prime_self_evolution_status.md
```

The self-evolution cycle generates reflective memory and engineering proposals from current telemetry. It does not directly rewrite code or bypass publication gates.

## JasonOS Prime Public Mirror Publisher

Task:

```text
JasonOS_Prime_PublicMirrorPublisher
```

Worker:

```text
D:\PlexTools\Foundry\workers\JasonOS_Prime_PublicMirrorPublisher.js
```

Status:

```text
D:\PlexTools\public\latest\scarflix_v2\jasonos_prime_public_mirror_status.json
D:\PlexTools\public\latest\scarflix_v2\jasonos_prime_public_mirror_status.md
```

The mirror publisher uploads status JSON/Markdown to:

```text
https://raw.githubusercontent.com/r0cksteadyw00t/plex-logs/main/latest/scarflix_v2/
```

It reads the GitHub PAT only from `C:\Users\jason\OneDrive\Public\TOKENS\github_pat.txt` and must never print or log the token value.

It uses a stale-aware local lock at:

```text
D:\PlexTools\state\jasonos_prime_public_mirror.lock
```

The publisher retries transient GitHub/network failures and 409 conflicts before marking REVIEW.

## JasonOS Prime Outcome Dashboard

Task:

```text
JasonOS_Prime_OutcomeDashboard
```

Worker:

```text
D:\PlexTools\Foundry\workers\JasonOS_Prime_OutcomeDashboard.js
```

Status:

```text
D:\PlexTools\public\latest\scarflix_v2\jasonos_prime_outcome_dashboard.json
D:\PlexTools\public\latest\scarflix_v2\jasonos_prime_outcome_dashboard.md
```

Remote URLs:

- `https://raw.githubusercontent.com/r0cksteadyw00t/plex-logs/main/latest/scarflix_v2/jasonos_prime_outcome_dashboard.json`
- `https://raw.githubusercontent.com/r0cksteadyw00t/plex-logs/main/latest/scarflix_v2/jasonos_prime_outcome_dashboard.md`

The dashboard is read-only and generated from current local status JSON. It does not run validation, expand catalogue, or mutate Plex state.

## Run Controlled Safe Expansion

Use this pattern to avoid overlap:

```powershell
schtasks.exe /Change /TN "ScarFLIX_v2_SafeWebDavExpansionPipeline" /DISABLE
powershell.exe -NoProfile -ExecutionPolicy Bypass -File "D:\PlexTools\Scripts\scarflix_v2\ScarFLIX_v2_SafeWebDavExpansionPipeline.ps1" -RunOnce -StageMaxItems 15 -StagePagesPerSource 1 -PublishMaxCandidates 15 -DelayedQaSeconds 60 -Concurrency 5
```

For hidden manual runs, use `Start-Process -WindowStyle Hidden` and write the process id to:

`D:\PlexTools\state\scarflix_v2\safe_expansion_manual.pid`

## Check Latest Status

Instant local status command:

```powershell
powershell.exe -NoProfile -ExecutionPolicy Bypass -File "D:\PlexTools\Scripts\scarflix_v2\JasonOS_Prime_InstantStatus.ps1"
```

Phone-readable dashboard:

```text
https://raw.githack.com/r0cksteadyw00t/plex-logs/main/latest/scarflix/index.html
```

Notes:

- GitHub `raw.githubusercontent.com` URLs show source text. They are useful for Codex/status ingestion, not for normal dashboard viewing.
- GitHub Pages may lag or cache old files. The RawGitHack rendered URL is the current fallback for phone-readable HTML.

```powershell
$j = Get-Content -LiteralPath "D:\PlexTools\public\latest\scarflix\platform_gate_status.json" -Raw | ConvertFrom-Json
$j.status
$j.visible
$j.qa
$j.quarantine
```

## Safety Rules

- Do not enable legacy direct seeder/publisher tasks.
- Do not publish raw live `.strm` rows into Plex.
- Do not run long ScarFLIX validation jobs from Codex.
- Codex may start detached local runner/scheduled task jobs and stop after verifying launch.
- Codex should not keep polling or monitoring controller-owned long work after the controller has launched and status files are being written.
- Do not ask Jason for manual action unless a real blocker or decision exists.
- Do not manually fix individual titles unless it proves a systemic rule failure.
- Do not delete Plex libraries or databases.
- Back up before editing scripts or state.

## PlatformGate Detached Runner Semantics

- The one-shot task `ScarFLIX_v2_PlatformGate_LocalRunner_Detached` can return to `Ready` while a child `ScarFLIX_v2_PlatformGate.ps1` process is still running.
- In that case, use fresh PlatformGate/child QA logs and controller `child_active` status to identify active work.
- Do not mark `BLOCKED_LOOP` solely because the wrapper task is `Ready` or because a duplicate wrapper detected an active PlatformGate child.
- Checkpoint publishing must not block the runner. If the public mirror push times out, the local status files remain authoritative and the runner continues.
- The autonomous controller and watchdog now use a 5-minute stale-progress window. If child QA logs stop moving, the next controller/watchdog cycle should recover or relaunch instead of waiting on a stale orphan.
- The task `ScarFLIX_v2_Watchdog_StallDetector` runs every 5 minutes and writes:
  - `D:\PlexTools\public\latest\scarflix_v2\watchdog_stall_status.json`
  - `D:\PlexTools\public\latest\scarflix_v2\watchdog_stall_status.md`
- PlatformGate runner lock cleanup now treats old `platform_gate.lock` files as stale after 5 minutes.

## Sentinel Recovery Layer

- `D:\PlexTools\Foundry\workers\JasonOS_Prime_Sentinel.js` is the Node watchdog-of-watchdog.
- The dashboard and mirror Node workers launch the sentinel when sentinel status is stale or missing.
- Sentinel status files:
  - `D:\PlexTools\public\latest\scarflix_v2\jasonos_prime_sentinel_status.json`
  - `D:\PlexTools\public\latest\scarflix_v2\jasonos_prime_sentinel_status.md`
- Sentinel clears stale ScarFLIX v2 lock files after 5 minutes by backing them up and removing the live lock.
- Sentinel launches recovery tasks detached and does not wait on PowerShell.
- If sentinel repeats the same unresolved non-PASS signature for three cycles, it records `ALERT` and sets `codex_action_required=true`.
# GrokBuild Forensic Agent

Artifacts:

- Agent: `D:\PlexTools\Foundry\workers\JasonOS_Prime_GrokBuild_Agent.ps1`
- Hidden runner: `D:\PlexTools\Foundry\workers\JasonOS_Prime_GrokBuild_Agent_Run.ps1`
- Scheduled-task installer: `D:\PlexTools\Foundry\workers\JasonOS_Prime_GrokBuild_Agent_InstallTask.ps1`
- Status reader: `D:\PlexTools\Foundry\workers\JasonOS_Prime_GrokBuild_Agent_Status.ps1`

Operating rule:

- Use this agent for forensic snapshots, root-cause evidence, and Grok peer-review prompt generation.
- Do not use it as proof of ScarFLIX delivery by itself. Real outcomes remain playable Plex catalogue growth and usable daily AI at 8791/8805.
- If Codex shell execution is unavailable, record `BLOCKED_EXECUTION_CHANNEL` and retry task registration on the next responding local run.
# Node-Native Watchdog

Task:

- `JasonOS_Prime_NodeWatchdog_5min`

Script:

- `D:\PlexTools\Foundry\workers\JasonOS_Prime_NodeWatchdog_5min.js`

Cadence:

- Every 5 minutes.

Responsibilities:

- Refresh GrokBuild forensic status.
- Refresh Grok peer-review bridge status.
- Trigger `JasonOS_Prime_ScarFLIX_Canary` when status is stale or direct `.strm` output is still stalled.
- Launch the public mirror publisher.
- Update `D:\PlexTools\public\latest\scarflix_v2\jasonos_prime_node_watchdog_status.json`.

Operating note:

- This is a control-plane watchdog only. It must not run long PlatformGate or catalogue validation inline.

# Direct STRM Mirror

Task:

- `ScarFLIX_v2_DirectStrmMirror`

Script:

- `D:\PlexTools\Foundry\workers\ScarFLIX_v2_DirectStrmMirror.js`

Cadence:

- Every 5 minutes, running as `SYSTEM`.
- Also invoked by `JasonOS_Prime_NodeWatchdog_5min` when PlatformGate is `PASS`.

Inputs:

- `D:\PlexTools\public\latest\scarflix_v2\platform_gate_checkpoint.json`
- `D:\PlexTools\state\scarflix_v2\webdav_map.json`
- latest PlatformGate snapshot JSON referenced by the checkpoint

Outputs:

- Direct `.strm` files under:
  - `D:\StremioCatalog\_Hybrid\Movies`
  - `D:\StremioCatalog\_Hybrid\Shows`
- Status:
  - `D:\PlexTools\public\latest\scarflix_v2\direct_strm_mirror_status.json`
  - `D:\PlexTools\public\latest\scarflix_v2\direct_strm_mirror_status.md`

Status meanings:

- `PASS`: mirror wrote one or more new/updated `.strm` files.
- `PASS_IDEMPOTENT`: all eligible `.strm` files already exist with current content.
- `WAITING_PLATFORM_GATE_PASS`: latest PlatformGate checkpoint is not `PASS`.
- `REVIEW_NO_NEW_WRITES`: PlatformGate is `PASS`, but no eligible entries were mirrored and the reason is not all-files-current.

Operational notes:

- This worker does not run long QA inline.
- It only mirrors entries that are present in the latest PlatformGate PASS snapshot.
- It triggers Plex library scans for sections `5` and `6` only when files are created or updated.

# Playback QA Controller

Task:

- `JasonOS_Prime_PlaybackQA_Controller`

Script:

- `D:\PlexTools\Foundry\workers\JasonOS_Prime_PlaybackQA_Controller.js`

Cadence:

- Every 5 minutes, running as `SYSTEM`.

Responsibilities:

- Count direct `.strm` files in the Streaming libraries.
- Trigger Plex scans for sections `5` and `6`.
- Start `ScarFLIX_v2_PlexClientDecisionQA` when decision QA has not passed.
- Start `ScarFLIX_v2_ConcurrentStreamQA` after decision QA passes and concurrent QA has not passed.
- Avoid starting QA if a known ScarFLIX validation task is already running.

Status:

- `D:\PlexTools\public\latest\scarflix_v2\jasonos_prime_playback_qa_controller_status.json`
- `D:\PlexTools\public\latest\scarflix_v2\jasonos_prime_playback_qa_controller_status.md`

Operating note:

- This worker does not run long QA inline. It starts existing scheduled tasks and exits.

# Staged Candidate Publisher

Task:

- `ScarFLIX_v2_StagedCandidatePublisher`

Script:

- `D:\PlexTools\Foundry\workers\ScarFLIX_v2_StagedCandidatePublisher.js`

Cadence:

- Every 5 minutes through a hidden `wscript.exe` wrapper.

Responsibilities:

- Read staged `.strm` candidates from `D:\PlexTools\state\scarflix_v2\staged_raw_strm\pending`.
- Validate the candidate URL with HEAD and byte-range probes.
- Publish only admitted candidates into:
  - `D:\StremioCatalog\_Hybrid\Movies`
  - `D:\StremioCatalog\_Hybrid\Shows`
- Move completed staged directories to:
  - `D:\PlexTools\state\scarflix_v2\staged_raw_strm\published`
  - `D:\PlexTools\state\scarflix_v2\staged_raw_strm\retry`
  - `D:\PlexTools\state\scarflix_v2\staged_raw_strm\rejected`
- Trigger Plex scans for sections `5` and `6` when files are published.

Status:

- `D:\PlexTools\public\latest\scarflix_v2\staged_candidate_publisher_status.json`
- `D:\PlexTools\public\latest\scarflix_v2\staged_candidate_publisher_status.md`

Operating notes:

- This worker is a short batch publisher, not a long validation job.
- It processes a bounded number of staged candidates per run.
- Transient provider failures are retry-held at source/release level.
- Empty staged directories are rejected as stage hygiene failures so they do not stall every future batch.

# Public Mirror Publisher

Script:

- `D:\PlexTools\Foundry\workers\JasonOS_Prime_PublicMirrorPublisher.js`

Status:

- `D:\PlexTools\public\latest\scarflix_v2\jasonos_prime_public_mirror_status.json`
- `D:\PlexTools\public\latest\scarflix_v2\jasonos_prime_public_mirror_status.md`

Operating notes:

- The mirror compares remote file content before PUT.
- Unchanged files should be reported as status `304` / unchanged rather than rewritten.
- If GitHub returns HTTP `403` after many writes, local status remains authoritative and the mirror should retry on its normal schedule.

# Quiet Scheduled Task Launchers

Canonical repair script:

- `D:\PlexTools\Scripts\scarflix_v2\JasonOS_Prime_QuietTasks_InstallOrUpdate.ps1`

Status files:

- `D:\PlexTools\public\latest\scarflix_v2\jasonos_prime_quiet_tasks_status.json`
- `D:\PlexTools\public\latest\scarflix_v2\jasonos_prime_quiet_tasks_status.md`

Expected state:

- Every enabled `JasonOS_Prime_*` and `ScarFLIX_v2_*` scheduled task launches through `C:\WINDOWS\System32\wscript.exe`.
- Wrapper files live under `D:\PlexTools\Scripts\scarflix_v2\hidden_tasks`.
- No enabled JasonOS/ScarFLIX task should point directly at `node.exe`, `powershell.exe`, or `pwsh.exe`.

Verification command:

```powershell
Get-ScheduledTask | Where-Object { ($_.TaskName -like 'JasonOS_Prime_*' -or $_.TaskName -like 'ScarFLIX_v2_*') -and $_.State -ne 'Disabled' } | ForEach-Object { $a=$_.Actions | Select-Object -First 1; [pscustomobject]@{TaskName=$_.TaskName; State=$_.State; Execute=$a.Execute; Arguments=$a.Arguments} } | Where-Object { $_.Execute -notmatch 'wscript\.exe$' -and $_.Execute -notmatch 'wscript\.exe"$' }
```

Expected output:

```text
No rows.
```
