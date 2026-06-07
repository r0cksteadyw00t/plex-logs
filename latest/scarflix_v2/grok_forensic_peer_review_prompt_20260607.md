# Grok Forensic Peer Review Prompt - JasonOS Prime / ScarFLIX v2

Copy/paste everything below into Grok.

---

Grok, perform a forensic peer review of JasonOS Prime / ScarFLIX v2.

This is not a hype/ambition review. Treat current progress as a failed delivery checkpoint. The goal is to diagnose why the project has not produced user outcomes and produce a practical reset architecture and plan.

## Required Review Mode

Be direct and technical. Prioritize:

- actual user outcomes over infrastructure activity,
- root-cause analysis over optimism,
- a small deliverable reset plan over broad automation,
- Plex playback reality over Stremio-like assumptions,
- deterministic architecture over self-healing theater.

Do not recommend more broad "god-mode" layers unless they directly deliver a user outcome.

## Public Evidence Links

Use these public files as source evidence:

- Forensic review and reset plan:
  - https://raw.githubusercontent.com/r0cksteadyw00t/plex-logs/main/latest/scarflix_v2/forensic_review_20260607.md
- Current project truth:
  - https://raw.githubusercontent.com/r0cksteadyw00t/plex-logs/main/latest/scarflix_v2/project_truth.md
  - https://raw.githubusercontent.com/r0cksteadyw00t/plex-logs/main/latest/scarflix_v2/project_truth.json
- Pause status:
  - https://raw.githubusercontent.com/r0cksteadyw00t/plex-logs/main/latest/scarflix_v2/forensic_pause_status.json

If links are unavailable, use the self-contained evidence summary below.

## Project Goal

Jason ultimately wants:

1. A Plex-first, Stremio-like ScarFLIX experience.
   - Plex is the only required playback client.
   - Users browse/play content in Plex.
   - Content should be debrid-backed where possible.
   - Nothing should appear in Plex unless it is playable and Plex-safe.
   - Failed source/release candidates should be quarantined without rejecting the title.
   - No raw live `.strm` entries should be visible.
   - No porn/adult content.
   - No CAM/TS/TC/HDCAM/telesync/telecine releases.
   - Prefer 4K only after Plex compatibility, otherwise 1080p, then lower.
   - Support Plex Web, iOS, Fire TV/Amazon, and normal Plex clients.
   - Prove at least 5 concurrent streams.

2. A local private AI/command centre.
   - A ChatGPT/Grok-like interface at `8791`.
   - Backend/brain around `8805`.
   - Local tools, persistent history, streaming responses, and clear tool traces.
   - Eventually able to control ScarFLIX and other local missions.
   - Should reduce dependence on Codex/API tokens, not increase it.

3. An autonomous local system.
   - Runs on Jason's Windows 11 Plex PC.
   - Does not need Jason to manually run commands.
   - Does not need Codex intervention for routine work.
   - Provides a truthful dashboard showing user-visible outcomes, not just script activity.
   - Self-heals routine operational failures, but clearly escalates engineering defects.

## Current Outcome State

Current state is a failure against requested outcomes:

- Private ChatGPT/Grok-like daily AI: not delivered.
- ScarFLIX Plex/Stremio-like experience: not delivered.
- Local no-Codex autonomy: not delivered.
- Dashboard: partially delivered but misleading.
- Catalogue result:
  - Streaming movie `.strm`: `1`
  - Streaming TV `.strm`: `0`
  - Current visible gate rows: `65`
  - Visible split: `45` movies / `20` TV
  - Source quarantine records: `24`

The project is paused for forensic review. Background progression has been stopped.

## Pause / Freeze Evidence

Codex paused progression after Jason requested forensic review.

Disabled tasks:

- `ScarFLIX_v2_AutonomousController`
- `ScarFLIX_v2_DurablePlatformGateRunner`
- `JasonOS_Prime_OutcomeDashboard`
- `JasonOS_Prime_PublicMirrorPublisher`

Stopped active PlatformGate owner/child processes:

- PlatformGate child PID previously observed: `17968`
- PlatformGate owner PID previously observed: `44104`

Pause status file:

- `D:\PlexTools\public\latest\scarflix_v2\forensic_pause_status.json`

## Key Technical Timeline

1. Project began as ScarFLIX request lane for Plex/Stremio/Real-Debrid style automation.
2. Scope expanded into JasonOS Prime: local AI command centre, autonomous workers, dashboards, watchdogs, self-healing, worker mesh, etc.
3. Important infrastructure was created:
   - Dashboard/status files.
   - Autonomous controller.
   - Durable PlatformGate runner.
   - Sentinel/watchdog.
   - Public mirror publisher.
   - 8791 UI reachable.
   - 8805 backend reachable.
   - Ollama reachable on 11434.
4. But user outcomes did not materialize:
   - no usable private AI product,
   - no working ScarFLIX catalogue,
   - no reliable autonomous execution.
5. PlatformGate became the blocking path for catalogue expansion.
6. Visible baseline moved from stale `78` to `65` rows after quarantine/pruning attempts.
7. ActiveGate transient/provider failures appeared, mainly HTTP `503`.
8. Controller retried/relaunched instead of resolving every failure class.
9. Same-snapshot QA drift appeared:
   - PlatformGate expected `65` rows.
   - VisibleCatalogQA checked `66`.
10. Codex initially patched `VisibleCatalogQA` to accept `-PathListFile`.
11. But the child still received `PathListFile=` empty.
12. Root cause later found:
   - `PlatformGate.ps1` function `Invoke-ChildPs` used a parameter named `$Args`.
   - PowerShell has automatic `$args` behavior and is case-insensitive.
   - The child process lost forwarded arguments.
   - `VisibleCatalogQA` re-queried all visible rows and checked `66` instead of snapshot `65`.
13. Patch applied:
   - renamed `$Args` to `$ChildArgs`.
   - updated call site to `-ChildArgs`.
14. After patch, `VisibleCatalogQA` logged correct snapshot behavior:
   - `PathListFile=D:\PlexTools\state\scarflix_v2\platform_gate_snapshots\platform_gate_snapshot_paths_20260607T025524Z.txt`
   - `Loaded snapshot path filter: 65`
   - `Visible rows selected for QA: 65`
15. However, PlatformGate still had Plex HLS probe failures before the project was paused.

## Key Technical Failures Found

### Infrastructure Mistaken For Outcome

Installing controllers, dashboards, runners, and watchdogs was repeatedly treated as progress, but none of those delivered the product outcome.

Correct outcome metrics should have been:

- Can Jason open `8791` and have a useful AI conversation with local tools?
- Can Jason open Plex and play new ScarFLIX content reliably?
- Did the catalogue safely grow?
- Did the system recover without Codex intervention?

### Gate Bottleneck Without Canary

The system tried to validate a broad visible set instead of proving one movie and one TV episode first.

Recommended canary should be:

- one known movie,
- one known TV episode,
- real debrid-backed source,
- Plex-safe materialized/WebDAV playback,
- playback tested on Web/iOS/Fire TV,
- dashboard says PASS only for this canary.

### Controller Not Truly Autonomic

The controller could launch and monitor tasks, but could not reliably:

- classify every failure class,
- detect stale status semantics,
- remediate source-level failures,
- separate transient provider issues from engineering bugs,
- detect that dashboard freshness did not mean user-outcome progress.

### Dashboard Misleading

Dashboard showed fresh PASS/LOW sentinel states while:

- catalogue count did not grow,
- PlatformGate was looping,
- user outcomes were absent,
- automation still depended on Codex intervention.

Dashboard needs separate top-level truth:

- product outcome status,
- automation heartbeat,
- current blocker,
- last material user-visible change,
- next autonomous action,
- whether Codex/Jason is required.

### Architecture Drift

ScarFLIX moved between:

- direct `.strm`,
- WebDAV/rclone-backed materialization,
- Plex HLS/transcoder compatibility gates.

Need a clear architectural answer:

- Can Plex realistically replicate Stremio live debrid streaming?
- Should ScarFLIX be a Plex-safe virtual/materialized debrid catalogue instead?
- What middleware is needed?
- What should never be visible in Plex?

### Concurrency Contradiction

Jason wanted everything concurrent and fast.

But Plex visibility QA requires non-overlap between:

- publisher,
- AutoGate,
- VisibleCatalogQA,
- PlexDecisionQA,
- ConcurrentQA,
- PlatformGate.

The right design probably parallelizes candidate discovery and source analysis, while serializing Plex visibility changes and same-snapshot QA.

## Current Technical Dependencies

Local:

- Windows 11
- Windows PowerShell 5.1
- Node.js
- Plex Media Server
- Plex SQLite
- Plex Transcoder
- Ollama at `11434`
- rclone/WebDAV mount at `S:\media`

Tokens/config:

- `C:\Users\jason\OneDrive\Public\TOKENS`
- Real-Debrid token
- TMDb token/key
- GitHub PAT
- qBittorrent/Prowlarr config where applicable

Important status roots:

- `D:\PlexTools\public\latest\scarflix_v2`
- `D:\PlexTools\public\latest\scarflix`

Important scripts:

- `D:\PlexTools\Scripts\scarflix_v2\ScarFLIX_v2_PlatformGate.ps1`
- `D:\PlexTools\Scripts\scarflix_v2\ScarFLIX_v2_VisibleCatalogQA.ps1`
- `D:\PlexTools\Scripts\scarflix_v2\ScarFLIX_v2_AutonomousController.ps1`
- `D:\PlexTools\Scripts\scarflix_v2\ScarFLIX_v2_DurablePlatformGateRunner.ps1`
- `D:\PlexTools\Scripts\scarflix_v2\ScarFLIX_v2_SourceQuarantine.ps1`

AI/UI:

- `8791` returned HTTP 200.
- `8805` returned HTTP 200.
- `8805/health` returned HTML shell, not a clear JSON health contract.
- Ollama `/api/tags` returned HTTP 200.

## Proposed Reset Plan From Codex

Codex proposed:

### Phase 0: Freeze And Baseline

- Stop progression.
- Disable background tasks.
- Capture evidence.
- Document reality.

### Phase 1: Status Truth Contract

Create one `project_truth.json` with:

- `product_status`
- `scarflix_user_outcome`
- `ai_user_outcome`
- `automation_status`
- `blocked_reason`
- `last_material_change_utc`
- `last_catalogue_added_count`
- `last_playback_verified_title`
- `requires_codex`
- `requires_jason`

Dashboard must not show overall PASS if product outcomes are absent.

### Phase 2: AI MVP First

Deliver:

- usable chat UI at `8791`,
- `8805/health` JSON endpoint,
- streaming chat endpoint,
- persistent conversation history,
- tool trace display,
- tool to read ScarFLIX truth status,
- tool to create canary ScarFLIX request.

### Phase 3: ScarFLIX Canary Delivery

Deliver:

- one movie,
- one TV episode,
- one optional anime episode,
- Plex Web playback PASS,
- iOS playback PASS,
- Fire TV playback PASS,
- no raw `.strm` visible,
- exact dashboard PASS with title and timestamp.

### Phase 4: Candidate Source Retry/Quarantine

Deliver:

- title remains wanted,
- failed source/release quarantined,
- alternate candidate tried,
- title-level rejection only after all candidates fail.

### Phase 5: Controlled Expansion

Deliver:

- batch size starts at 5,
- English-first,
- no porn/adult,
- no CAM/TS/TC/HDCAM/telesync/telecine,
- Plex-safe 4K preferred, else 1080p/lower.

### Phase 6: 5-Concurrent Stream QA

Deliver:

- at least 5 simultaneous verified streams,
- failure reason tied to source/client profile,
- no destructive title rejection.

### Phase 7: Autonomy Rebuild

Deliver:

- controller owns only proven actions,
- emits `ENGINEERING_BUG` for impossible states,
- watchdog tracks material progress,
- no silent loops,
- no PASS dashboard while user outcomes are absent.

## Questions For Grok

Please answer these as a forensic peer reviewer:

1. Is the diagnosis above technically coherent?
2. What did Codex miss?
3. Is Plex-first Stremio-like playback via Real-Debrid feasible in the way Jason wants?
4. Should ScarFLIX use:
   - raw `.strm`,
   - WebDAV/rclone materialization,
   - a local HTTP middleware/proxy,
   - Plex library import with materialized files,
   - another architecture?
5. What is the simplest architecture that can actually deliver the Plex user experience?
6. What should be deleted, paused, or ignored from the current overbuilt system?
7. What is the correct first user-visible milestone?
8. Should the next milestone be:
   - truthful dashboard + AI MVP, or
   - truthful dashboard + ScarFLIX canary playback?
9. How should same-snapshot Plex QA be designed so it does not stall the whole project?
10. How should candidate source retry/quarantine be represented as state?
11. What should the controller do when it detects an engineering bug vs provider transient vs permanent source failure?
12. What should a real dashboard show so Jason does not have to infer progress from raw logs?
13. What is the realistic 1-day, 3-day, and 7-day plan?
14. What are the top 10 technical risks?
15. What exact implementation order should Codex follow next?

## Output Requested From Grok

Please produce:

1. Forensic verdict.
2. Corrected architecture diagram in text.
3. What to stop doing.
4. What to keep.
5. Recommended next milestone.
6. Implementation plan with acceptance tests.
7. Concrete dashboard truth contract.
8. ScarFLIX playback architecture recommendation.
9. AI MVP architecture recommendation.
10. Risks and blockers.

Be critical. The goal is to make this deliver real outcomes, not preserve sunk-cost architecture.

