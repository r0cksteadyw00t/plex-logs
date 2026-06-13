# Decisions

## 2026-06-13 - Mission 002 IPTV Live design constraints

- Plex remains the required front end for IPTV Live.
- Mission 002 outputs are `master.m3u`, `master.xml`, and trace/decision manifests; no alternate playback UI is the target product.
- Plex does not provide reliable seamless mid-stream failover, so the system will optimize source ordering and regeneration rather than promising in-player automatic fallback.
- Explicit Command Centre feedback is mandatory from Phase 0. Plex implicit feedback is not sufficient.
- Channel mapping and `tvg-id` override support are foundational requirements.
- Early optimization will be rule/statistical scoring. Multi-agent swarm behavior and self-modifying code are deferred.
- Reflector/self-improvement may write proposals only until explicitly promoted.

## 2026-06-13 - Plex availability should be guarded without service conversion

- The immediate mitigation for Plex being absent is a lightweight watchdog scheduled task, not converting Plex to an NSSM service.
- The watchdog may start Plex if the `Plex Media Server` process is absent.
- The watchdog must not kill or restart a running Plex server.
- This avoids changing Plex's user-context library assumptions while preventing stale `REVIEW_PLEX_INDEX_QUERY_FAILED` loops.
- On 2026-06-13 the watchdog cadence was tightened to 1 minute and an on-logon watchdog task was added.
- NSSM remains available at `D:\PlexTools\bin\nssm.exe`, but Plex service conversion is held until the service can be configured under the same user/profile context, not `LocalSystem`.

## 2026-06-09 - Grok API token detection and bridge mode

- `JasonOS_Prime_GrokInstructionBridge` checks tokens in this priority order: `GROK_API_KEY.txt`, `XAI_API_KEY.txt`, `xai.key`, `grok_token.txt`, then older compatibility names.
- Dashboard mode is `REAL_API` when a usable token is found and Grok returns valid `grok_codex_instruction.v1` JSON.
- Dashboard mode is `LOCAL_FALLBACK` when no usable token exists, the API call fails, or Grok returns malformed JSON.
- Fallback instructions are non-executable.
- `JasonOS_Prime_CodexInstructionConsumer` remains restricted to low/medium-risk, unexpired, approved, allowlisted detached actions.

## 2026-06-09 - Structured Grok-Codex instruction contract v1

- Grok-to-Codex autonomous instructions must use `grok_codex_instruction.v1`.
- Codex may execute only explicit, low/medium-risk, unexpired, allowlisted instructions with `approved_for_codex_execution=true` and `requires_user_decision=false`.
- The instruction bridge and consumer run every 15 minutes through hidden scheduled tasks.
- Current bridge mode is `LOCAL_ONLY_NO_TOKEN`; schema-valid local fallback instructions are intentionally non-executable.
- External Grok API invocation requires an approved Grok/xAI token in `C:\Users\jason\OneDrive\Public\TOKENS`.

## 2026-06-09 - Controlled materialized/WebDAV scaling is unlocked

- Targeted materialized Plex decision QA recovered to `PASS 124/124`.
- Representative 5+ concurrent materialized QA passed with range `5/5`, Plex decision `5/5`, and TV included.
- Controlled 30-50 item materialized/WebDAV batches are allowed under per-batch targeted QA.
- Full/unconstrained expansion remains blocked until sustained soak proves repeatability.
- Legacy/direct resolver expansion remains paused.

## 2026-06-09 - Repo privacy migration deferred

- The public mirror must not be made private until authenticated raw access is proven for Grok/Codex.
- The current lockstep path still depends on public raw URLs for status and forensic partner reads.

Last updated: 2026-06-08 20:17 Australia/Sydney.

## Controlled Materialized/WebDAV Expansion Is Allowed

Decision:

- Broad legacy direct resolver expansion remains paused.
- Controlled materialized/WebDAV expansion is allowed when each candidate is published as a Plex-visible materialized symlink and passes HLS/transcoder probing plus targeted Plex decision QA.
- Any materialized symlink that has not passed targeted Plex decision QA must be hidden from Plex visibility.
- Slow/stuck provider candidates must not block a whole batch; they are skipped/quarantined while passing candidates continue.

Evidence:

- Batch 1: `10/10` publisher HLS PASS and `10/10` targeted Plex decision PASS.
- Batch 2: `8/10` publisher HLS PASS and `8/8` targeted Plex decision PASS; one stuck partial symlink removed.
- Current verified visible materialized total: `18`.

## Materialized Decision QA Must Not Overlap

Decision:

- `ScarFLIX_v2_MaterializedPlexDecisionQA` is now an on-demand/non-repeating task.
- It must be triggered by the controller/publisher after a materialized batch, not as an unconditional 5-minute repeating schedule.
- This prevents duplicate hidden PowerShell runs, stale status churn, and desktop/resource pressure.

## Legacy Resolver Entries Stay Hidden Until Proven Safe

Decision:

- Visible `18788/live` resolver `.strm` entries are not Plex-decision-safe based on repeated Jason playback failures.
- They must stay out of `D:\StremioCatalog\_Hybrid\Movies` and `D:\StremioCatalog\_Hybrid\Shows` until a future fallback-specific proof exists.
- The legacy resolver inventory has been moved to reversible quarantine rather than destructively deleted.
- Current known hidden legacy resolver total is `113`.
- Current primary path is materialized/WebDAV symlink playback.
- Dashboard must report `legacy_resolver_strm_count=0` as a quality protection state, not as lost progress.

## Targeted Materialized Decision QA Is Required

Decision:

- Generic `ScarFLIX_v2_PlexClientDecisionQA` is not sufficient proof for the materialized/WebDAV canary when it tests unrelated rows.
- The authoritative canary decision proof is `ScarFLIX_v2_MaterializedPlexDecisionQA.ps1`.
- The targeted QA must match `ScarFLIX_part-*` hashes from `catalog_symlink_publisher_status.json` to Plex DB media parts.
- Publishing may resume only when targeted materialized canary decision QA reaches the required pass count for the canary.

## Materialized/WebDAV Playback Is Primary Architecture

Decision:

- The old direct `.strm` plus local resolver URL model is no longer the primary delivery method.
- Primary playback architecture is now `materialized_webdav_symlink`.
- Local resolver `18788` remains fallback-only for specific cases.
- New broad publication may resume only after the two-title materialized/WebDAV canary passes HLS/transcoder probing and detached Plex decision QA.
- `ScarFLIX_v2_StagedCandidatePublisher` must wait for the materialized/WebDAV canary before writing more visible entries.
- `ScarFLIX_v2_DirectStrmMirror` must remain disabled as a default publisher unless explicitly enabled for fallback testing.
- Dashboard must report legacy resolver count separately from materialized/WebDAV-backed playback success.

## Expansion Paused Until Plex Playback Is Fixed

Decision:

- Do not add more ScarFLIX titles while direct Plex playback is failing with HTTP `400` decision errors.
- Direct `.strm` count growth is no longer a useful Phase 0 success metric until playback works.
- Expansion producers must honor `D:\PlexTools\state\scarflix_v2\expansion_paused_until_playback_fix.json`.
- Canary, staged publisher, safe WebDAV expansion, direct mirror, stage-only seeder, and legacy expansion publisher tasks are disabled while paused.
- Diagnostic tasks may continue: direct admission, playback QA, dashboard, mirror, watchdog status, and forensic evidence collection.
- Expansion may resume only after the playback model is fixed and representative Plex decision QA passes.

## 5-Concurrent QA Is Capability Verification, Not Publishing Gate

Decision:

- PlatformGate and Canary publishing no longer require 5-concurrent QA.
- PlatformGate/Canary publishing require these core snapshot gates:
  - ActiveGate `PASS`
  - VisibleCatalogQA `PASS`
  - PlexClientDecisionQA `PASS`
  - Snapshot-scoped health `PASS`
- `concurrent_stream_qa` remains valuable and should continue running periodically.
- `concurrent_stream_qa` must be recorded as `capability_verification` with `blocking=false`.
- A small PlatformGate snapshot must not fail solely because it cannot satisfy 5-concurrent testing.
- Canary and staged publishing may proceed when core gates pass, while concurrent QA continues in the background.

## Partially Superseded: Direct STRM URL Admission Is Necessary But Not Sufficient

Superseded at `2026-06-08 11:20 Australia/Sydney` as a hard publishing blocker. This remains forensic guidance and dashboard interpretation, but 5-concurrent/direct sample playback QA is no longer a PlatformGate/Canary publishing gate.

Decision:

- A direct `.strm` URL passing HEAD and range probes does not prove Plex playback compatibility.
- Direct `.strm` publication requires core PlatformGate gates plus individual source admission. Direct-mode playback QA remains diagnostic/capability verification.
- Current proof before visible direct `.strm` publication is:
  - core PlatformGate snapshot gates pass,
  - snapshot-scoped health passes,
  - the individual candidate passes source admission,
  - no core PlatformGate blockers remain.
- `ScarFLIX_v2_StagedCandidatePublisher` must not pause solely because direct-mode 5-concurrent playback QA is `REVIEW`.
- Direct `.strm` counts remain useful inventory, but they must not be reported as playable content until Plex playback QA passes.
- The likely durable direction is WebDAV/materialized media presentation or a Plex-compatible local materializer/proxy, because Plex can scan a bare `.strm` file as metadata while still failing client HLS decision.

## Direct STRM Publication Requires Direct Admission

Decision:

- A `.strm` file in `D:\StremioCatalog\_Hybrid\Movies` or `D:\StremioCatalog\_Hybrid\Shows` is user-visible Plex delivery and must be treated as a primary outcome surface.
- WebDAV visible QA and PlatformGate snapshot QA are not sufficient proof that direct `.strm` files are playable.
- Before a direct `.strm` is written or kept visible, its URL must pass direct admission:
  - HEAD succeeds,
  - range probe `bytes=0-1` returns `206`,
  - byte-range support is present,
  - HLS/DASH content types are rejected,
  - content type is in the Plex-safe allow-list,
  - content length is usable.
- A local live resolver URL such as `http://127.0.0.1:18788/live?...` is not proof of delivery by itself. It may only remain visible when the current admission probe passes.
- If a visible `.strm` fails due transient `429`, `503`, or provider timeout, move that source out of Plex visibility into retry-held quarantine. Do not reject the title.
- Future direct mirror writes must refuse unadmitted URLs instead of publishing first and relying on later QA to catch failures.
- Dashboard playback status must distinguish direct `.strm` admission from legacy WebDAV QA.

## PlatformGate Uses Snapshot-Scoped Health, Not Global Health, For PASS

Decision:

- PlatformGate final PASS is controlled by the QA gates that actually ran against the current visible snapshot.
- Required snapshot gates are `ActiveGate`, `VisibleCatalogQA`, `PlexClientDecisionQA`, and `ConcurrentStreamQA`.
- Broad/global `scarflix_v2_health.json` remains published for visibility and diagnostics, but it must not block PlatformGate PASS when the snapshot-scoped QA gates passed.
- Dashboard must show both values separately:
  - `snapshot_scoped_health_status`
  - `global_health_status`
  - `global_health_blocking`
  - `platform_gate_blocked_by`
- If global health is `REVIEW` due legacy/non-snapshot issues but `global_health_blocking=false`, Canary and other safe next steps may proceed from PlatformGate `PASS`.

## Canary Uses Hidden Scheduled Task For Safe Pipeline Launch

Decision:

- `JasonOS_Prime_ScarFLIX_Canary.js` must launch the safe expansion pipeline through `ScarFLIX_v2_SafeWebDavExpansionPipeline`.
- Direct Node-spawned PowerShell produced short-lived PIDs with no internal pipeline log, so it is not the reliable launcher for this pipeline on the Plex PC.
- Canary status should use the safe pipeline internal lock/log freshness as running evidence, because Task Scheduler can show `Ready` while its hidden wrapper child is still active.
- Dashboard must not show canary `RUNNING` from a stale PID alone.

## Grok Forensic Review Is Adopted As The Correction Brief

Decision:

- Treat the current state as failed delivery until user-visible outcomes are proven.
- Infrastructure components are not success by themselves.
- The immediate ScarFLIX path is a controlled canary, not broad catalogue expansion.
- The canary may start the existing safe expansion pipeline only after PlatformGate is PASS.
- Dashboard must expose the canary state and actual `.strm` delta.
- The daily AI path must prove usable chat and tool execution, not only port reachability.

## Dashboard Progress Must Be Outcome-Based

Decision:

- Dashboard progress must report actual user outcomes first.
- Actual ScarFLIX delivery is the `.strm` count in `D:\StremioCatalog\_Hybrid\Movies` and `D:\StremioCatalog\_Hybrid\Shows`, not the number of rows being tested by PlatformGate.
- AI usability is not proven by port reachability alone. It requires a working chat endpoint, JSON health, streaming response support, and tool-trace visibility.
- Dashboard fields must explicitly mark visible QA row counts as non-delivery evidence.

## Transient Provider Failures Are Retry Queue Items

Decision:

- Transient `429`, `503`, and provider-timeout source failures must be queued for retry in a dedicated transient source queue.
- They must not destructively prune titles or sources.
- The title remains wanted/retryable.
- Permanent policy/playback failures remain source/release quarantine candidates.

## Durable PlatformGate Child Stale Threshold Is Five Minutes

Decision:

- Durable PlatformGate active heartbeat remains every `30` seconds.
- Child progress stale detection and bounded orphan kill threshold are `5` minutes by default.
- The previous effective `15` minute child-stale threshold was too slow for Jason's expected stall detection.

## Project Progression Paused For Forensic Reset

Decision:

- ScarFLIX v2 / JasonOS Prime progression is paused after user-outcome failure.
- Infrastructure activity is not considered progress unless it produces a verified user outcome.
- The next implementation milestone must be a small, explicit product outcome rather than another broad automation layer.
- Background progression tasks should remain disabled until the reset plan is accepted or revised.

## VisibleCatalogQA Plex HLS Failures Are Source-Level Failures

Decision:

- Repeated Plex HLS probe failures from `VisibleCatalogQA` must be treated as failed source/release candidates, not title-level rejection and not an architecture stop.
- The source/release should be quarantined with a reason code such as `PLEX_HLS_TIMEOUT` or `PLEX_HLS_PROBE_FAILED`.
- The title remains wanted/retryable so alternate candidates can be attempted later.
- After visible-HLS source quarantine completes, the autonomous controller must relaunch detached PlatformGate on the reduced visible snapshot.
- This keeps the Plex-first requirement intact: content stays hidden unless it passes Plex-safe gates, but one bad source does not kill the title.

## Do Not Use `$Args` As A Named PowerShell Parameter

Decision:

- ScarFLIX PowerShell functions must not define a named parameter called `$Args`.
- `$args` is an automatic PowerShell variable and case-insensitive collisions can silently break child argument forwarding.
- Use explicit names such as `$ChildArgs` or `$ProcessArgs`.
- This matters for PlatformGate because a broken argument splat can remove `-PathListFile`, causing same-snapshot QA drift.

## Same-Snapshot QA Must Pass Snapshot Path List To Every Row-Based Gate

Decision:

- PlatformGate same-snapshot checks must not mix snapshot-scoped QA with live Plex row scans.
- `WebDavActiveGate`, `VisibleCatalogQA`, and future row-based gates must receive the same snapshot path list or equivalent immutable snapshot input.
- If a gate checks more or fewer rows than the snapshot, that is a platform orchestration defect, not a content-title defect.
- `VisibleCatalogQA` now accepts `-PathListFile` and filters rows to that snapshot.

## RawGithack Dashboard Is A Compatibility Alias, Not The Canonical Status Source

Decision:

- Canonical local dashboard status is under `D:\PlexTools\public\latest\scarflix_v2`.
- Canonical public dashboard status is `https://r0cksteadyw00t.github.io/plex-logs/latest/scarflix_v2/`.
- RawGithack `/latest/scarflix/index.html` remains a compatibility alias and must fetch canonical v2 live JSON.
- Public mirror must publish JSON aliases under both `/latest/scarflix_v2` and `/latest/scarflix` so the compatibility page can self-refresh.

## Source Quarantine Must Handle Unmapped Visible Failures

Decision:

- A failed Plex/WebDAV path can remain visible even after `webdav_map.json` has already been reduced to passing entries.
- Source quarantine must not require a map-entry match before taking action.
- If ActiveGate reports a failing `rclone_path` or `webdav_path` and no map entry matches, record an unmatched source/release quarantine and use the failing `rclone_path` as the Plex row hide target.
- This is still source-level handling. The title remains wanted/retryable for alternate candidates.
- If the upstream ActiveGate already has `PASS` with zero failures, source quarantine should report PASS/no-op, not REVIEW.

## Short Workers Must Not Bypass Source Quarantine

Decision:

- FastTrack and WorkerMesh may refresh status and trigger safe next steps, but they must not relaunch the durable PlatformGate runner ahead of the autonomous controller when repeated transient-only REVIEW has already reached the retry cap.
- In that state, they should trigger or defer to the controller/source-quarantine path.
- WorkerMesh must not clear the controller retry state during this repeated-transient loop because that hides the repeat count and recreates the stall.

## Repeated Transient Source Loops Escalate To Source Quarantine

Decision:

- Transient-only PlatformGate REVIEW is retried with backoff, but it must not retry indefinitely.
- The autonomous controller retry cap is `3` cycles by default.
- Repeated transient-only WebDAV/provider failures after the cap are treated as failed source/release evidence, not title rejection evidence.
- The controller starts `ScarFLIX_v2_SourceQuarantine.ps1 -IncludeTransient` so the failed source/release is quarantined with a reason code and removed from visible/retry-loop state.
- The title remains wanted/retryable for alternate candidate sources.
- This preserves the Plex-first rule: no visible item should remain if the current source repeatedly fails WebDAV/Plex-safe admission, while alternate releases for the same title can still be tried.
- Failure-loop signatures must represent the sorted failure set, not only the first failed row, so row ordering cannot hide repeated loops.

## Phone Dashboard Must Fetch Live Pages JSON

Decision:

- The rendered dashboard should not rely only on the timestamp baked into the static HTML file.
- GitHub raw URLs and GitHub Pages HTML can both lag behind local/dashboard source updates.
- The phone-facing dashboard HTML must fetch the Pages-served dashboard JSON every 30 seconds and update recent achievements/status client-side.
- Use `https://r0cksteadyw00t.github.io/plex-logs/latest/scarflix/jasonos_prime_outcome_dashboard.json` as the browser live source because it is same-site for the rendered Pages dashboard and avoids raw.githubusercontent CDN staleness.
- This is a visibility improvement only. It does not run validation inline, publish unsafe catalogue entries, or change PlatformGate gating.

## Public Pages Mirror Must Publish To Docs Source

Decision:

- GitHub Pages for `r0cksteadyw00t/plex-logs` publishes from `main:/docs`.
- JasonOS Prime public dashboard publishing must write rendered dashboard/status artifacts under `docs/latest/...` as well as the root `latest/...` raw mirror.
- The root `latest/scarflix_v2` mirror remains useful for raw GitHub URLs.
- The phone-facing rendered dashboard is served from `docs/latest/scarflix` and `docs/latest/scarflix_v2` through GitHub Pages.
- A successful raw/API mirror update is not sufficient proof that the phone-facing Pages dashboard updated; verify Pages source or rendered URL when dashboard freshness is questioned.

## Recent Updates Must Be Rebuilt From Live Status

Decision:

- `jasonos_prime_recent_updates.json` is not an authoritative source by itself.
- The dashboard must rebuild recent updates from live child QA progress, Durable PlatformGate runner status, PlatformGate checkpoint status, autonomous controller status, and the top current-state doc entry.
- Stored recent updates may be merged as history, but they must not prevent newer live status from appearing first.
- The rendered dashboard should not show a stale achievement as the latest item when active runner/checkpoint/child QA data is fresher.
- This is a reporting fix only; it does not run long validation inline, expand the catalogue, or bypass Plex-safe publication gates.

## PlatformGate Must Fail Fast After First Non-PASS Stage

Decision:

- PlatformGate should stop downstream QA after the first non-PASS stage.
- If ActiveGate, VisibleCatalogQA, Plex client decision QA, or ConcurrentQA does not pass, the same snapshot cannot pass.
- Continuing later stages after an earlier failure wastes hours and hides the real blocker.
- This does not weaken Plex compatibility: a snapshot still requires all stages to pass before publication or expansion.
- Transient failures remain retry-held; permanent source/release failures should feed source-level quarantine, not title-level rejection.

## Dashboard Must Show Child QA Progress

Decision:

- A stable parent milestone such as `PLATFORM_GATE_RUNNING` is not enough for Jason-facing status.
- The dashboard must show active child QA stage, latest child QA log mtime, latest child QA line, and child QA age.
- Heartbeat/sentinel `PASS/LOW` can remain quiet only when child QA activity is fresh and visible on the dashboard.
- Long-running detached jobs should publish intermediate progress so a raw unchanged headline state is not interpreted as a stall.

## Plex Decision QA Should Be Bounded

Decision:

- PlatformGate should call Plex client decision QA with bounded timeout/retry settings.
- Current PlatformGate bound: `-TimeoutSeconds 20 -Retries 0`.
- A source that cannot get a timely Plex HLS decision is not considered Plex-safe for publication.
- Slow or timed-out decision failures should move into retry/quarantine handling instead of blocking the entire platform gate for hours.

## Durable Child QA Progress Is Required

Decision:

- Durable PlatformGate runner heartbeat freshness is not sufficient proof that PlatformGate is progressing.
- The durable runner must also track real child QA progress through the newest relevant QA log mtime.
- Relevant child logs include WebDAV ActiveGate, VisibleCatalogQA, Plex client decision QA, ConcurrentQA, and health logs under `D:\PlexTools\logs`.
- If the PlatformGate child process remains alive but those child QA logs are stale beyond the configured threshold, the durable runner should stop that child and allow the existing retry/backoff path to continue.
- This recovery must not expand the catalogue, prune transient failures, or reject a title because one source/release failed.
- This decision prevents false `PASS/LOW` watchdog states caused by runner heartbeat updates that do not reflect actual QA movement.

## Durable Runner Task Must Stay Hidden

Decision:

- `ScarFLIX_v2_AutonomousController` must recreate `ScarFLIX_v2_DurablePlatformGateRunner` through the hidden `wscript.exe` wrapper path, not direct `cmd.exe`.
- The durable runner task action should point at `D:\PlexTools\Scripts\scarflix_v2\hidden_tasks\ScarFLIX_v2_DurablePlatformGateRunner.vbs`.
- Direct `cmd.exe /c "...DurablePlatformGateRunner.cmd --task"` is legacy drift and should be repaired when detected.
- This does not change PlatformGate ownership or run long validation inline; it only prevents desktop popups on future detached starts.

## Legacy SF2 Autopilot Containment

Decision:

- `SF2_Autopilot` is legacy and should stay disabled while ScarFLIX v2 is owned by the autonomous controller, durable PlatformGate runner, watchdog, sentinel, FastTrack, dashboard, and mirror workers.
- The old `SF2_Autopilot` `Quiesce` behavior must not disable modern controller/watchdog/durable/sentinel/dashboard/mirror tasks.
- If the legacy autopilot is ever reintroduced, it must be rebuilt into the hidden-wrapper scheduled-task model and must use an explicit allow/deny list that preserves modern controller infrastructure.
- Modern status publishing should use the existing JasonOS Prime mirror/dashboard workers instead of `SF2_Autopilot`.

## Hidden / Quiet Scheduled Task Execution

Decision:

- Routine JasonOS Prime, ScarFLIX v2, and PlexTools background tasks must not flash command windows on Jason's desktop.
- Scheduled tasks should launch through short `wscript.exe` wrappers under `D:\PlexTools\Scripts\scarflix_v2\hidden_tasks`.
- The wrapper files run the real `powershell.exe`, `pwsh.exe`, or `node.exe` command with window style `0` and no user interaction.
- `D:\PlexTools\Scripts\scarflix_v2\JasonOS_Prime_QuietTasks_InstallOrUpdate.ps1` is the current task-hygiene installer.
- Future task creators, including worker mesh, FastTrack, durable PlatformGate installer, watchdog installer, and sentinel installer, should preserve hidden-wrapper scheduling.
- Hidden execution is not a replacement for logging. Scripts still write status JSON/Markdown and logs under `D:\PlexTools\logs` or `D:\PlexTools\public\latest\scarflix_v2`.

## Fast-Track Acceleration Without Unsafe Publication

Decision:

- JasonOS Prime may run a 5-minute fast-track accelerator to push short autonomous work continuously.
- FastTrack may refresh predictive simulation, self-evolution, worker mesh, dashboard, public mirror, 8805 keepalive, PlatformGate supervision, candidate-source verification, and controlled safe expansion triggers.
- FastTrack must not publish Plex-visible catalogue entries until PlatformGate and candidate-source model eligibility are satisfied.
- The point of FastTrack is to remove manual stop/start behavior and reduce idle time between safe milestones, not to bypass the Plex-safe publication standard.
- Current worker: `D:\PlexTools\Foundry\workers\JasonOS_Prime_FastTrackAccelerator.js`.
- Current task: `JasonOS_Prime_FastTrackAccelerator`.

## Durable PlatformGate Single Owner

Decision:

- PlatformGate execution must be owned by `ScarFLIX_v2_DurablePlatformGateRunner`.
- The previous fragmented loop of controller, watchdog, sentinel, worker mesh, and one-shot local runner all trying to recover PlatformGate directly is collapsed into one durable owner path.
- Controller, watchdog, sentinel, worker mesh, and the legacy `ScarFLIX_v2_PlatformGate_LocalRunner_Detached` task now trigger the durable runner.
- The durable runner owns one lock: `D:\PlexTools\state\scarflix_v2\platform_gate_durable.lock`.
- It writes one heartbeat: `D:\PlexTools\state\scarflix_v2\platform_gate_durable_heartbeat.json`.
- It tracks owner PID and child PID in status JSON.
- It adopts a fresh existing `ScarFLIX_v2_PlatformGate.ps1` child process instead of duplicating or killing it.
- It kills only stale orphan PlatformGate child processes before relaunch.
- It writes the authoritative local progress/final checkpoint to `D:\PlexTools\public\latest\scarflix_v2\platform_gate_checkpoint.json` and `.md`.
- It does not expand catalogue.

## PlatformGate Stale Detection

Decision:

- A stale `platform_gate_checkpoint.json` timestamp alone is not sufficient to mark PlatformGate as `BLOCKED_LOOP`.
- PlatformGate can run child QA scripts for a long time while the parent checkpoint remains unchanged.
- The autonomous controller must treat recent child QA log activity as live progress and keep the milestone at `PLATFORM_GATE_RUNNING`.
- If the checkpoint is stale but child QA logs are fresh, the controller records `PLATFORM_GATE_CHILD_ACTIVE` and does not relaunch PlatformGate.
- Avoid broad process/command-line WMI scans in the controller path; use log timestamp activity for this check because the controller must remain short and reliable.

## JasonOS Prime Outcome Dashboard

JasonOS Prime must maintain a generated local Outcome Dashboard so progress is tracked by the Plex PC rather than manually reconstructed in Codex responses.

Worker:

```text
D:\PlexTools\Foundry\workers\JasonOS_Prime_OutcomeDashboard.js
```

Task:

```text
JasonOS_Prime_OutcomeDashboard
```

Status:

```text
D:\PlexTools\public\latest\scarflix_v2\jasonos_prime_outcome_dashboard.json
D:\PlexTools\public\latest\scarflix_v2\jasonos_prime_outcome_dashboard.md
```

Decision:

- The dashboard is generated from local status JSON and 8805-visible telemetry.
- It is allowed to run frequently because it is short and read-only.
- It must not run PlatformGate, publish Plex rows, mutate Plex DB, or expose secrets.
- 8805 exposes the dashboard through `/api/status` and `/api/tools`.
- The public mirror publisher includes dashboard JSON/Markdown so remote progress can be checked from phone.

## JasonOS Prime Short-Worker Autonomy

JasonOS Prime may increase autonomy through short local scheduled workers that publish status, generate proposals, and improve command routing.

Active short workers:

```text
D:\PlexTools\Foundry\workers\JasonOS_Prime_PredictiveSimulator.js
D:\PlexTools\Foundry\workers\JasonOS_Prime_SelfEvolutionCycle.js
D:\PlexTools\Foundry\workers\JasonOS_Prime_PublicMirrorPublisher.js
D:\PlexTools\Foundry\workers\JasonOS_Prime_OutcomeDashboard.js
```

Tasks:

```text
JasonOS_Prime_PredictiveSimulator
JasonOS_Prime_SelfEvolutionCycle
JasonOS_Prime_PublicMirrorPublisher
JasonOS_Prime_OutcomeDashboard
```

Decision:

- Predictive simulation may model next ScarFLIX actions and expansion eligibility, but must not publish Plex rows.
- Self-evolution may write reflective memory and engineering proposals, but direct self-modification remains disabled unless a specific controlled implementation task is created.
- Public mirror publishing may push status JSON/Markdown to `r0cksteadyw00t/plex-logs` using the approved local token vault. It must not print, log, or publish token values.
- These workers are allowed to run hidden and autonomously because they are short, resumable, and status-writing.
- They do not replace the ScarFLIX PlatformGate, candidate-source model, or autonomous controller.
- Catalogue expansion remains blocked unless same-snapshot PlatformGate and candidate-source model are PASS.

## JasonOS Prime Worker Mesh

JasonOS Prime uses a local worker mesh as the execution layer between conversational commands and local automation.

Active worker:

```text
D:\PlexTools\Foundry\workers\JasonOS_Prime_WorkerMesh.js
```

Task:

```text
JasonOS_Prime_WorkerMesh
```

Cadence: every 2 minutes.

Plugin registry:

```text
D:\PlexTools\Foundry\plugins\registry.json
```

Current plugin policy:

- Plugins are local capability descriptors and controlled action routers.
- Generated/scaffolded plugin code is dormant until explicitly wired into the registry.
- The worker mesh may repair safe orchestration drift, consume Foundry inbox commands, write outbox results, and relaunch detached validation tasks.
- The worker mesh now guarantees JasonOS short-worker tasks for predictive simulation, self-evolution planning, and public mirror publishing.
- It must not expose secrets.
- It must not destructively modify Plex databases, delete libraries, or bypass ScarFLIX safety gates.
- ScarFLIX expansion remains blocked unless PlatformGate and candidate-source model are PASS.

This is the current practical foundation for morphogenetic plugin growth and local natural-language action execution.

## JasonOS 8805 Runtime

The real local AI backend on port 8805 now runs through a Node.js worker:

```text
D:\PlexTools\Foundry\workers\JasonOS_Prime_Real_AI_8805_Node.js
```

Reason:

- The previous PowerShell worker became unreliable during restart and hung before listener startup.
- The Node worker provides a simpler HTTP server runtime, streaming-style responses, tool-trace events, local command queue writes, and current ScarFLIX/JasonOS status reads.
- The PowerShell worker backup is retained for reference, but the active runtime should be Node unless a future decision explicitly changes it.

Keepalive:

```text
JasonOS_Prime_Real_AI_8805_Keepalive
```

The keepalive task runs every 5 minutes and starts the Node worker if `/api/status` is unavailable. It does not read secrets.

## Rclone WebDAV Mount Keepalive

The `S:\media\catalog` rclone WebDAV mount is required for Plex local-path resolution of WebDAV-backed virtual MKV items.

Task:

```text
ScarFLIX_v2_RcloneMountKeepalive
```

Script:

```text
D:\PlexTools\Scripts\scarflix_v2\ScarFLIX_v2_RcloneMountKeepalive.ps1
```

Rules:

- It may start only the rclone mount for `scarflix_webdav_bridge:` to `S:`.
- It must not run publisher, PlatformGate, AutoGate, VisibleCatalogQA, PlexDecisionQA, ConcurrentQA, catalogue expansion, Plex scans, or Plex DB rewrites.
- If `S:` exists but is not the ScarFLIX mount, it must fail/review rather than overwrite the drive.

The autonomous controller may run this mount keepalive as a short self-heal step before relaunching detached PlatformGate.

## Playback Architecture

- Plex remains the only required playback client.
- ScarFLIX v2 uses WebDAV-backed virtual MKV paths under `S:\media\catalog`.
- Raw live `.strm` URLs are not published as visible Plex playback rows.
- Plex only sees items that have passed the Plex-safe gate.

## Publication Gate

An item is allowed to remain visible only if all required gates pass from the same snapshot:

1. WebDAV source active gate.
2. Plex visible/HLS safety QA.
3. Plex client decision QA.
4. 5-concurrent stream QA.
5. Health.

Schedules are enabled only after the same-snapshot PlatformGate reports PASS.

## Infrastructure Keepalive

ScarFLIX server infrastructure may be kept alive independently of catalogue expansion.

- `ScarFLIX_v2_InfrastructureKeepalive` is allowed to run every 5 minutes.
- It may start or restart only the request server, stream proxy, and WebDAV node bridge health endpoints.
- It must not run PlatformGate, publisher, AutoGate, VisibleCatalogQA, PlexDecisionQA, ConcurrentQA, catalogue expansion, or Plex DB mutation.
- This is infrastructure availability, not proof that the ScarFLIX outcome is complete.

## Long Validation Execution Boundary

Codex must not execute long ScarFLIX validation jobs directly. Long jobs run locally through resumable scripts/scheduled tasks. Codex reviews generated status JSON and summaries.

- Codex does not run PlatformGate, VisibleCatalogQA, PlexDecisionQA, ConcurrentQA, AutoGate, publisher, or full catalogue checks.
- Codex may create or patch the local runner scripts, perform parser-only syntax checks, update docs, and review the generated outputs after the local PC runs them.
- PlatformGate is run locally through `D:\PlexTools\Scripts\scarflix_v2\ScarFLIX_v2_PlatformGate_LocalRunner.cmd` or the matching `.ps1` runner.

Codex should not wait on long ScarFLIX validation jobs. Codex may launch detached local runners/scheduled tasks and then stop. The local PC writes checkpoint/status files that Codex or Jason can review later.

Jason must not be required to take action unless a real decision or blocker exists.

- Do not ask Jason to run local commands, open the Plex PC, paste logs, manually check status files, manually launch scheduled tasks, manually restart services, manually review generated summaries, or manually continue an automatable process.
- Codex should autonomously create/update scripts, launch detached local runners or scheduled tasks, publish status JSON/markdown to the existing public mirror, inspect generated status files, decide the next safe technical step, update docs, and continue to the next safe milestone.
- Codex only asks Jason when credentials are missing and cannot be discovered from the approved TOKENS vault, permissions prevent progress, destructive/irreversible action is required, architecture/end-user experience decisions are needed, the same failure loop occurs twice, paid plan/capacity/usage limits prevent progress, or the local machine/service is unavailable and cannot be self-healed.
- If a long-running job is needed, Codex launches it detached, publishes progress/final checkpoints, later reads local/public status, and continues automatically where possible.

ScarFLIX v2 must operate via a local autonomous controller. Codex should build and improve the controller, but routine execution, retries, checkpoints, and status publishing are owned by the Plex PC. Jason is only asked for decisions or true blockers.

- Scheduled task: `ScarFLIX_v2_AutonomousController`.
- Controller scripts:
  - `D:\PlexTools\Scripts\scarflix_v2\ScarFLIX_v2_AutonomousController.ps1`
  - `D:\PlexTools\Scripts\scarflix_v2\ScarFLIX_v2_AutonomousController_Run.ps1`
  - `D:\PlexTools\Scripts\scarflix_v2\ScarFLIX_v2_AutonomousController_Status.ps1`
- Controller status files:
  - `D:\PlexTools\public\latest\scarflix_v2\autonomous_controller_status.json`
  - `D:\PlexTools\public\latest\scarflix_v2\autonomous_controller_status.md`
- Codex verifies task registration, launch, and status-file writes only, then stops. The controller owns ongoing monitoring.
- Controller installation is not a completed ScarFLIX outcome. It is only infrastructure. The project outcome remains Plex-first, Stremio-like playback where visible Plex content is debrid-backed, Plex-safe, playable, and protected by source-level retry/quarantine.
- The controller must use explicit milestone states:
  - `PLATFORM_GATE_RUNNING`
  - `PLATFORM_GATE_PASS`
  - `PLATFORM_GATE_REVIEW_TRANSIENT_RETRY_SCHEDULED`
  - `PLATFORM_GATE_FAIL_SOURCE_QUARANTINE_REQUIRED`
  - `CANDIDATE_SOURCE_MODEL_PENDING`
  - `CANDIDATE_SOURCE_MODEL_RUNNING`
  - `CANDIDATE_SOURCE_MODEL_PASS`
  - `BLOCKED_LOOP`
  - `BLOCKED_DECISION`
  - `BLOCKED_CREDENTIALS`
  - `BLOCKED_PERMISSION`
- After `PLATFORM_GATE_PASS`, the controller must automatically run the lightweight candidate-source model verification before any catalogue expansion is allowed.

PlatformGate runner status must be fail-open for status publishing and child-active aware.

- `ScarFLIX_v2_PlatformGate_LocalRunner.ps1` must not block QA execution on GitHub/public checkpoint publishing. Checkpoint publishing is bounded and the local runner continues if publishing times out.
- A duplicate local runner that detects an already-running `ScarFLIX_v2_PlatformGate.ps1` child records `RUNNING/platform_gate_child_active`, not `REVIEW/BLOCKED`.
- The autonomous controller treats fresh child QA activity as active PlatformGate work even when the one-shot Task Scheduler wrapper has already returned to `Ready`.
- Stale-progress and stale-lock recovery now use a 5-minute watchdog standard.
- Repeated transient-only PlatformGate REVIEW results stay retry-held/backoff scheduled. They are not `BLOCKED_LOOP` unless a separate true blocker is proven.

## Watchdog And Stall Recovery

- `ScarFLIX_v2_Watchdog_StallDetector` is the persistent 5-minute stall detector for JasonOS Prime / ScarFLIX v2.
- `JasonOS_Prime_Sentinel.js` is the watchdog-of-watchdog. It must be launched by the existing Node dashboard/mirror workers when sentinel status is stale so self-healing does not depend solely on PowerShell task health.
- It may enable/run known safe local scheduled tasks when status files are stale, tasks are disabled, or PlatformGate is blocked by stale locks.
- It writes local/public JSON and Markdown status for phone/dashboard tracking.
- Dashboard generation may invoke the watchdog when watchdog status is stale or missing.
- Dashboard and mirror generation may invoke the Node sentinel when sentinel status is stale or missing.
- A disabled watchdog task is not an acceptable passive state; it must be treated as a recoverable failure and shown in sentinel/watchdog status.
- The watchdog must not expose secrets, delete Plex libraries/databases, or destructively prune transient provider failures.

## Source Failure Handling

- Failed sources are quarantined or rejected at source/release level.
- Failed source does not mean failed title.
- The title remains eligible for alternate sources unless blocked by curation or policy.
- Transient provider failures are retry-held, not destructive title rejections.

## Repeated Source Handling

Repeated exact source loops are blocked by stage hash:

- The seeder reads rejected stage hashes and skips exact failed hashes.
- The publisher also skips pending candidates whose stage hash is already rejected.
- This prevents repeated retries of the same bad source while preserving alternate-source retry for the title.

## Curation Policy

- English-first catalogue.
- No adult/porn content.
- No CAM/TS/TC/HDCAM/telesync/telecine releases.
- Anime is allowed; English dub preferred where available and Plex-compatible.
- Non-English films/TV are allowed only when culturally significant, highly rated, popular, critically acclaimed, award-winning, or otherwise clearly worth watching.
# 2026-06-07 - GrokBuild forensic support model

- JasonOS Prime should maintain a local GrokBuild forensic agent as a support path for repeated stalls, architecture uncertainty, and root-cause review.
- The agent writes outcome-focused status and a ready-to-send peer-review prompt under `D:\PlexTools\public\latest\scarflix_v2`.
- The agent must not replace real outcome delivery; it is support infrastructure for diagnosis, QA evidence, and peer-review handoff.
- Local long-running work should still use hidden scheduled tasks or detached runners rather than inline Codex execution.
# 2026-06-07 - Node-native control plane for unreliable shell paths

- Use Node-native workers for critical JasonOS Prime control-plane tasks when PowerShell process execution is unstable.
- `JasonOS_Prime_NodeWatchdog_5min` is the current 5-minute autonomous control loop for refreshing GrokBuild, refreshing the Grok peer-review bridge, retriggering the ScarFLIX canary when output is stalled, and publishing/mirroring status.
- Missing Grok/xAI API credentials are non-blocking for local autonomy. The bridge must continue in local-only mode and keep producing forensic prompts/status.
- External Grok review is opportunistic: if a token appears in the approved vault, the bridge sends the structured forensic prompt to xAI and queues the response for local implementation review.

# 2026-06-07 - Direct STRM files are the ScarFLIX primary delivery metric

- Primary ScarFLIX delivery is direct `.strm` files written into:
  - `D:\StremioCatalog\_Hybrid\Movies`
  - `D:\StremioCatalog\_Hybrid\Shows`
- WebDAV visibility remains supporting infrastructure and QA evidence, not the final user-visible success metric.
- When PlatformGate reaches `PASS`, `ScarFLIX_v2_DirectStrmMirror.js` mirrors approved WebDAV-safe snapshot entries into direct `.strm` files.
- The mirror is allowed to run as a short control-plane delivery worker because it does not perform long validation inline.
- The mirror must be idempotent:
  - new files report `PASS`,
  - already-current files report `PASS_IDEMPOTENT`,
  - missing PlatformGate PASS reports `WAITING_PLATFORM_GATE_PASS`.
- The 5-minute Node watchdog must run the mirror when PlatformGate is `PASS` and publish actual `.strm` counts to the outcome dashboard.

# 2026-06-08 - Durable checkpoint PASS overrides legacy PlatformGate REVIEW

- The durable PlatformGate checkpoint is the source of truth for same-snapshot PlatformGate completion.
- If `D:\PlexTools\public\latest\scarflix_v2\platform_gate_checkpoint.json` is `PASS`, controllers and canary workers must treat PlatformGate as `PASS` even if legacy/global `D:\PlexTools\public\latest\scarflix\platform_gate_status.json` is `REVIEW`.
- Legacy/global health remains visible but is non-blocking unless a snapshot-scoped QA gate fails.
- Playback QA after direct `.strm` delivery is owned by `JasonOS_Prime_PlaybackQA_Controller`, which triggers existing QA scheduled tasks detached and one-at-a-time.

# 2026-06-08 - Enabled project tasks must launch through hidden wrappers

- Enabled `JasonOS_Prime_*` and `ScarFLIX_v2_*` scheduled tasks must not launch `node.exe`, `powershell.exe`, or `pwsh.exe` directly from Task Scheduler.
- The standard launcher is:
  - `C:\WINDOWS\System32\wscript.exe`
  - wrapper files under `D:\PlexTools\Scripts\scarflix_v2\hidden_tasks`
- The wrapper runs the actual Node or PowerShell command with window style `0`.
- Direct Task Scheduler launchers are allowed only as a temporary recovery fallback when WSH/VBScript is broken, and must be converted back after VBScript is repaired.
- `D:\PlexTools\Scripts\scarflix_v2\JasonOS_Prime_QuietTasks_InstallOrUpdate.ps1` is the canonical repair script for this launcher state.

# 2026-06-08 - Staged candidates can progress outside a stale PlatformGate snapshot

- A PlatformGate snapshot that has too few visible rows for 5-concurrent QA must not indefinitely block staged candidate evaluation.
- Staged candidates are allowed to progress through a short direct candidate publisher when all of the following are true:
  - the candidate is still outside Plex visibility,
  - the final `.strm` URL passes direct HEAD/range/content-type admission,
  - transient provider errors are retry-held at source/release level,
  - permanent candidate failures are rejected/quarantined at source/release level,
  - only admitted candidates are written into `D:\StremioCatalog\_Hybrid`.
- This is not a relaxation of Plex delivery quality; it is a delivery path that prevents impossible stale snapshots from blocking hidden candidate queues.

# 2026-06-08 - Public mirror must avoid unchanged full-file PUT storms

- The GitHub public mirror should compare remote content before writing.
- If a remote file already matches local content, it should report unchanged and skip the PUT.
- Reason: repeated full mirror writes can trigger GitHub HTTP `403` secondary/rate-limit responses and make the phone dashboard appear stale even when local status is current.
# 2026-06-09 21:20 Australia/Sydney - Grok Planner Integration

- `JasonOS_Prime_GrokInstructionBridge_v2.js` is the active bridge target through the hidden VBS wrapper.
- Grok is expected to produce structured instructions, expansion strategy, and autonomy-loop suggestions when `REAL_API` is available.
- `JasonOS_Prime_CodexInstructionConsumer_v2.js` is the active consumer target through the hidden VBS wrapper.
- Consumer execution remains limited to safe allowlisted actions and detached-task request queuing. It must not run long validation inline or restart legacy/direct resolver expansion.
