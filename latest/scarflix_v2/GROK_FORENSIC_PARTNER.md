# Grok Forensic Partner

Last updated: 2026-06-09 20:05 Australia/Sydney.

## Role

Grok is the project manager, forensic investigator, and technical architect for JasonOS Prime / ScarFLIX Mission 001.

Codex remains the implementation engineer. Codex must read this file before technical decisions that affect architecture, gates, publishing, QA, dashboard truth, or autonomy.

## Current Phase

Phase 0 - Stabilisation & Foundation.

Target window: 48-72 hours.

Goal: stop repeated loops and establish a productive ScarFLIX delivery pipeline. Broad legacy/direct-resolver expansion remains paused; controlled materialized/WebDAV-backed batches are allowed when each batch passes targeted materialized Plex decision QA.

## Current Baseline

As of 2026-06-09T10:02Z:

- Direct `.strm` output visible in Plex libraries: movies `1`, TV `1`, total `2`; this is legacy/fallback telemetry, not the primary metric.
- Materialized/WebDAV dashboard artifact count: `213`.
- Current materialized expansion state: controlled materialized publishing is active through detached hidden workers; latest dashboard publisher cycle selected `20`, published `4`, retry-held `16`.
- Repaired controlled materialized publisher cycles after wrapper fix published `25` candidates total across seven completed cycles: `2`, `3`, `3`, `5`, `4`, `4`, and `4`.
- Staged pending status drift: lightweight/FastTrack reports `6`; dashboard staged-candidate field reports `26`.
- PlatformGate: `PASS`.
- Snapshot-scoped health: `PASS`.
- Global health: `REVIEW`, non-blocking.
- 5-concurrent materialized QA: representative detached run is `PASS`; WebDAV/range reads `5/5`, Plex decision checks `5/5`, representative TV included.
- Materialized Plex decision QA: `PASS`, target `124`, rows_found `129`, checked `124`, passed `124`, failed `0`.
- Candidate-source model after patch: `PASS`, blockers `[]`.
- Canary/autonomous status after patch: `CANDIDATE_SOURCE_MODEL_PASS`; FastTrack is `CONTROLLED_MATERIALIZED_EXPANSION_ALLOWED`.
- Public mirror: latest local status is `REVIEW_RECOVERABLE` after a mirror transport/throttle window; local status remains authoritative and hidden mirror publisher continues retrying.
- Expansion pause: `LEGACY_RESOLVER_PAUSED_CONTROLLED_MATERIALIZED_ALLOWED`.
- Legacy `ScarFLIX_v2_SafeWebDavExpansionPipeline` is disabled after XML backup; controlled materialized publishing uses `ScarFLIX_v2_MaterializedCandidateStageOnly` plus `ScarFLIX_v2_MaterializedExpansionBatch`.
- Legacy user-visible failures include `The Maze Runner (2014)`, `Saw (2004)`, and `The Green Mile (1999)` when played through old resolver `.strm` URLs.
- Jason manual playback evidence for materialized/WebDAV path includes `Aladdin`, `Casino Royale`, `Black Panther`, and `MacGyver S01E01`.
- New Jason manual client-canary evidence includes PC+phone PASS for movie `A Beautiful Mind` and TV show `Margot Got Money Problems`.
- New Fire TV evidence includes `Kaiju No. 8` PASS and `Four Seasons` FAIL.
- 8791/8805 daily AI smoke status: `PASS`; 8791 routes to the 8805 JasonOS Prime chat/tool backend with streaming/tool-trace support.
- Grok-Codex structured instruction bridge: installed as hidden 15-minute tasks. Current mode is `LOCAL_ONLY_NO_TOKEN`; instruction JSON is schema-valid but not approved for execution. Codex consumer status is `PASS` and executed `0` actions.

## Architecture Rules

- Plex remains the required playback front end.
- Primary delivery metric is materialized/WebDAV-backed playback success through Plex.
- Primary playback architecture is `materialized_webdav_symlink`.
- Direct resolver `.strm` files are legacy/fallback only and must not be the default publication route.
- Direct `.strm` counts are supporting compatibility/legacy telemetry, not the primary outcome metric.
- PlatformGate PASS is snapshot-scoped.
- Blocking gates for controlled materialized/WebDAV publishing:
  - ActiveGate `PASS`
  - VisibleCatalogQA `PASS`
  - Targeted materialized Plex decision QA `PASS`
  - Snapshot-scoped health `PASS`
  - HLS/path durability probe `PASS`
- Non-blocking visibility/capability signals:
  - Global `scarflix_v2_health.json`
  - 5-concurrent QA for small controlled batches only; it becomes blocking before 30-50 batch scaling or full/unconstrained expansion
  - Direct-mode Plex playback sample QA
- Raw/staged candidates are intentionally outside Plex visibility until published as materialized/WebDAV-backed paths and QA passes.
- The candidate-source blocker `seeder_stage_only_not_plex_visible` is non-blocking when `primary_playback_architecture=materialized_webdav_symlink` and controlled materialized expansion is allowed.
- New publication requires materialized/WebDAV candidates to pass HLS/transcoder probing and detached targeted Plex decision QA.
- If targeted materialized QA is `REVIEW` because Plex rows_found is below target, FastTrack must hold expansion until Plex indexing catches up and QA returns `PASS`.
- Broad legacy/direct-resolver catalogue expansion remains paused.
- Controlled materialized/WebDAV catalogue expansion is allowed in small batches.
- Full/unconstrained expansion and 30-50 item scaling remain blocked until targeted materialized decision QA returns PASS and representative 5+ concurrent materialized Plex decision QA passes.
- PC+phone client evidence is strong positive proof for the materialized/WebDAV path, but Fire TV/Amazon remains required before the client canary is complete.
- Fire TV is now proven viable by `Kaiju No. 8`, but `Four Seasons` must be investigated as an isolated source/path/client failure before scaling. Its legacy direct resolver row has been quarantined; the title remains retryable through materialized paths.
- Direct resolver candidates still require source admission when used as legacy fallback.
- Transient `429`, `503`, and provider timeout failures go to source-level retry/quarantine. Do not reject the title because one source failed.
- Permanent policy/playback failures quarantine only the failed source/release.
- Do not run long PlatformGate, VisibleCatalogQA, PlexDecisionQA, ConcurrentQA, AutoGate, publisher, or full catalogue jobs inline in Codex. Use detached local scheduled tasks.
- Dashboard must report user outcomes first: materialized/WebDAV visible count, targeted Plex decision pass rate, legacy direct count/quarantine, staged/retry counts, playback QA status, daily AI usability, and public mirror state.

## Structured Grok-Codex Instruction Contract

Instruction schema: `grok_codex_instruction.v1`.

Canonical repo schema: `schemas/grok_codex_instruction.schema.v1.json`.

Public instruction files:

- `D:\PlexTools\public\latest\scarflix_v2\GROK_INSTRUCTIONS_FOR_CODEX.json`
- `D:\PlexTools\public\latest\scarflix_v2\GROK_INSTRUCTIONS_FOR_CODEX.md`

Status files:

- `D:\PlexTools\public\latest\scarflix_v2\jasonos_prime_grok_instruction_bridge_status.json`
- `D:\PlexTools\public\latest\scarflix_v2\jasonos_prime_codex_instruction_consumer_status.json`

Codex may execute a Grok instruction only when all conditions are true:

- `approved_for_codex_execution=true`
- `requires_user_decision=false`
- `risk_level` is `low` or `medium`
- `expires_at` is still in the future
- `target_component` is allowlisted
- actions are allowlisted and detached when long-running

Codex must skip, report, and not execute high/critical, expired, malformed, user-decision, or unapproved instructions.

Explicitly forbidden autonomous actions:

- Re-enable broad legacy/direct resolver expansion.
- Run long ScarFLIX validation inline in Codex.
- Run PlatformGate, VisibleCatalogQA, PlexClientDecisionQA, AutoGate, legacy DirectStrmMirror, legacy StagedCandidatePublisher, SafeWebDavExpansion, or SF2_Autopilot from the instruction consumer.
- Change repo visibility/private-public state until authenticated Grok/Codex access to private raw status is proven.

## Forensic Trigger Rules

Produce a handoff when any of these occur:

- Repeated failure or stall more than twice.
- No meaningful progress on major outcomes for 30+ minutes of real work.
- A loop or repeating pattern is detected.
- Root cause or architecture decision is uncertain.
- Watchdog, Sentinel, Durable Runner, Canary, or publisher reports repeated issues.

## Forensic Handoff Format

### FORENSIC HANDOFF FOR GROK

**Trigger Reason:**  
**Current State Summary:** (include PIDs, heartbeat, .strm counts, milestone status, blockers)  
**What I have already tried:**  
**My hypothesis on root cause:**  
**Proposed next steps (for Grok review):**  
**Data/files to review:**

## Key Files

- `PROJECT_PLAN.md`
- `TASKS.md`
- `OUTCOMES.md`
- `RISKS_ISSUES.md`
- `docs/CURRENT_STATE.md`
- `docs/DECISIONS.md`
- `docs/NEXT_ACTIONS.md`
- `D:\PlexTools\public\latest\scarflix_v2\jasonos_prime_outcome_dashboard.json`
- `D:\PlexTools\public\latest\scarflix_v2\platform_gate_checkpoint.json`
- `D:\PlexTools\public\latest\scarflix_v2\scarflix_canary_status.json`
- `D:\PlexTools\public\latest\scarflix_v2\staged_candidate_publisher_status.json`
- `D:\PlexTools\public\latest\scarflix_v2\direct_strm_admission_gate_status.json`
- `D:\PlexTools\public\latest\scarflix_v2\jasonos_prime_playback_qa_controller_status.json`
# 2026-06-09 14:20 Australia/Sydney - Forensic Partner Update

Architecture remains `materialized_webdav_symlink` with materialized/WebDAV-backed Plex playback success as the primary delivery metric. Legacy/direct resolver expansion must remain paused.

Forensic guidance added:

- Treat GitHub mirror `403` as a mirror transport/throttle issue unless local status files are stale or credentials are missing. Local status remains authoritative during mirror-only failures.
- Heartbeat probes must be bounded and Node-only where possible. Avoid recursive `_ScarFLIXLive` / WebDAV-backed filesystem scans, process enumeration, `wmic`, and repeated `schtasks` reads unless a true blocker requires them.
- Do not mark ScarFLIX stalled solely because public mirror is in `REVIEW`; check local materialized QA, FastTrack, and publisher status first.

# 2026-06-09 17:40 Australia/Sydney - Gate Update

The materialized/WebDAV architecture remains primary. The current blocker is not direct resolver playback. Latest detached representative concurrent QA proved concurrent WebDAV/range reads (`5/5` HTTP `206`) but failed Plex decision concurrency (`0/5` due to decision timeouts). Latest targeted materialized decision QA is also `REVIEW` on the larger set (`3/88` checked pass rate).

Guidance:

- Keep legacy/direct resolver expansion paused.
- Continue only bounded controlled materialized batches under targeted QA gates.
- Do not increase to 30-50 item batches until targeted materialized decision QA and 5+ concurrent Plex decision QA pass.
- Treat Four Seasons legacy row cleanup as source-only quarantine, not title rejection.
- Investigate Plex decision timeout/failure rows through detached cleanup/quarantine workers; keep titles retryable.

# 2026-06-09 20:05 Australia/Sydney - Structured Autonomy Update

# 2026-06-09 20:35 Australia/Sydney - Grok API Token Integration Update

`JasonOS_Prime_GrokInstructionBridge` now reports bridge mode as `REAL_API` or `LOCAL_FALLBACK`.

Token detection order:

1. `GROK_API_KEY.txt`
2. `XAI_API_KEY.txt`
3. `xai.key`
4. `grok_token.txt`

Older lowercase/compatibility token filenames are still checked after those four names. If a usable token is present and Grok returns valid `grok_codex_instruction.v1` JSON, the bridge writes Grok-sourced instructions and reports `REAL_API`. If no usable token exists, the API call fails, or Grok returns malformed JSON, the bridge reports `LOCAL_FALLBACK` and writes a non-executable fallback instruction. This protects ScarFLIX from unsafe or ambiguous autonomous actions.

Dashboard fields to check:

- `truth_metrics.grok_instruction_bridge_mode`
- `truth_metrics.grok_instruction_bridge_last_successful_grok_instruction_utc`
- `grok_codex_instruction_loop.bridge_mode`
- `grok_codex_instruction_loop.last_successful_grok_instruction_utc`

The earlier materialized QA regression has been cleared. Current gates:

- Targeted materialized Plex decision QA: `PASS`, `124/124`, failed `0`.
- Representative 5+ concurrent materialized QA: `PASS`, range `5/5`, Plex decision `5/5`, TV included.
- Controlled materialized/WebDAV expansion: unlocked for 30-50 item batches under per-batch targeted QA.
- Latest materialized artifact count: `213`.
- Legacy/direct resolver expansion: still paused.

Structured Grok-Codex instruction contract v1 has been added. `JasonOS_Prime_GrokInstructionBridge` and `JasonOS_Prime_CodexInstructionConsumer` are installed as hidden 15-minute tasks. Current bridge mode is `LOCAL_ONLY_NO_TOKEN`, so no Grok-approved instruction has been executed yet. This is a credential limitation for external Grok invocation, not a ScarFLIX playback failure.
# 2026-06-09 21:20 Australia/Sydney - Deep Grok Integration Update

Grok-Codex loop v2 is staged. Hidden wrappers now target:

- `D:\PlexTools\Foundry\workers\JasonOS_Prime_GrokInstructionBridge_v2.js`
- `D:\PlexTools\Foundry\workers\JasonOS_Prime_CodexInstructionConsumer_v2.js`

Bridge v2 treats Grok as an active planner when a valid token is present. It sends current ScarFLIX metrics, dashboard state, recent Codex/Grok handoff excerpts, bridge/consumer state, and saturation status. Expected Grok output now includes structured Codex instructions, ScarFLIX expansion strategy recommendations, autonomy-loop suggestions, and instruction quality metrics.

Consumer v2 executes only instructions that are approved, non-expired, low/medium-risk, target allowlisted, action allowlisted, and do not require a user decision. It may write status/strategy notes or queue detached-task requests for local workers. It must not run long ScarFLIX validation inline, re-enable legacy/direct resolver expansion, or perform destructive operations.

Current known runtime limitation: Codex inline process launch is saturated, so v2 verification is delegated to hidden scheduled tasks. Latest public dashboard still shows targeted materialized QA `PASS 124/124`, representative concurrent QA `PASS 5/5`, materialized artifacts `225`, and legacy/direct resolver expansion paused.

# 2026-06-09 21:45 Australia/Sydney - Command Centre Update

New primary monitoring surface is staged:

- HTML: `D:\PlexTools\public\latest\scarflix_v2\jasonos_prime_command_center.html`
- JSON: `D:\PlexTools\public\latest\scarflix_v2\jasonos_prime_command_center.json`
- Generator: `D:\PlexTools\Foundry\workers\JasonOS_Prime_CommandCenterDashboard_v1.js`
- Hidden wrapper: `D:\PlexTools\Scripts\scarflix_v2\hidden_tasks\JasonOS_Prime_CommandCenterDashboard.vbs`
- Installer: `D:\PlexTools\Scripts\scarflix_v2\JasonOS_Prime_CommandCenterDashboard_InstallTask.ps1`

Command Centre features:

- 15-minute Staged Report as first view.
- Bridge mode, Grok call status, instruction generated/executed counts, execution success rate, Grok strategy input, ScarFLIX cycle metrics, health score, anomalies, and next actions.
- Native interactive Gantt derived from project plan, task state, and live ScarFLIX/autonomy metrics.
- Observability for 24-hour/7-day trends, hidden task health, process saturation, instruction quality, and ScarFLIX QA gates.
- Project layer for tasks, risks, decisions, next actions, and plan excerpts.

No safety policy changed. Legacy/direct resolver expansion remains paused. Materialized/WebDAV remains primary. Long validation remains detached only.

# 2026-06-09 21:55 Australia/Sydney - Strategic/Remote Access Update

Grok planner output contract is expanded with:

- `risk_mitigations`
- `cycle_commentary`
- `cycle_commentary.batch_recommendation`
- cycle quality/health assessment fields

These fields are planner/dashboard inputs only. The Codex consumer may still execute only explicit `instructions[]` entries that are approved, non-expired, low/medium-risk, allowlisted, and do not require a user decision.

Remote Command Centre access is staged but not enabled:

- Worker: `D:\PlexTools\Foundry\workers\JasonOS_Prime_CommandCenterStaticServer.js`
- Wrapper: `D:\PlexTools\Scripts\scarflix_v2\hidden_tasks\JasonOS_Prime_CommandCenterStaticServer.vbs`
- Installer: `D:\PlexTools\Scripts\scarflix_v2\JasonOS_Prime_CommandCenterStaticServer_InstallTask.ps1`
- Guide: `docs\COMMAND_CENTRE_REMOTE_ACCESS.md`

Safety rule: no unauthenticated public exposure. Preferred remote access is Tailscale if already in use, then UniFi/local VPN, then Cloudflare Tunnel with Access authentication.
