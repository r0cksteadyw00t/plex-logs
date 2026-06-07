# ScarFLIX v2 / JasonOS Prime Forensic Review And Reset Plan

Last updated: 2026-06-07 13:36 Australia/Sydney.

## Executive Finding

Progress so far has failed the user-outcome test.

The system has produced a large amount of infrastructure, scripts, runners, dashboards, and status files, but it has not delivered the requested product outcomes:

- Jason does not yet have a dependable private ChatGPT/Grok-like daily AI at `8791`.
- ScarFLIX has not delivered a Stremio-like Plex experience.
- Catalogue growth is not working as a user-visible capability.
- The local autonomous system still depends on Codex intervention for diagnosis and patching.
- The dashboard reports activity, but not enough actionable outcome progress.
- Self-healing has been mostly relaunch/retry, not reliable root-cause remediation.

Current work is paused for forensic review. No catalogue expansion, long PlatformGate run, or autonomous progression should resume until the reset plan is accepted and the first milestone is redefined as a small, testable user outcome.

## Current Frozen State

Pause action:

- Status file: `D:\PlexTools\public\latest\scarflix_v2\forensic_pause_status.json`
- Main active PlatformGate owner/child were stopped.
- Disabled tasks:
  - `ScarFLIX_v2_AutonomousController`
  - `ScarFLIX_v2_DurablePlatformGateRunner`
  - `JasonOS_Prime_OutcomeDashboard`
  - `JasonOS_Prime_PublicMirrorPublisher`

Task names that were requested but did not exist under those exact names:

- `JasonOS_Prime_Sentinel_Node`
- `ScarFLIX_v2_WatchdogStallDetector`

Evidence snapshot:

- `D:\PlexTools\public\latest\scarflix_v2\forensic_evidence_snapshot.json`
- `D:\PlexTools\public\latest\scarflix_v2\forensic_task_state.json`
- `D:\PlexTools\public\latest\scarflix_v2\forensic_dependency_probes.json`

Observed counts:

- Streaming movie `.strm`: `1`
- Streaming TV `.strm`: `0`
- ScarFLIX movie request JSON files: `0`
- ScarFLIX TV request JSON files: `1`
- Source quarantine records: `24`
- PlatformGate visible snapshot under test: `65` rows
- Visible split from PlatformGate: `45` movies / `20` TV

Dependency probes:

- `http://127.0.0.1:8791/`: HTTP `200`
- `http://127.0.0.1:8805/`: HTTP `200`
- `http://127.0.0.1:8805/health`: HTTP `200`, but returned the same HTML shell rather than a clear JSON health object.
- `http://127.0.0.1:11434/api/tags`: HTTP `200`, Ollama reachable.

## Why Progress Stalled At 65 Visible Rows

The 65-row number is not a catalogue target. It is the current reduced visible Plex/WebDAV safety snapshot after previous quarantine and pruning attempts.

The system stayed around 65 because expansion was intentionally blocked behind the PlatformGate. That was consistent with the Plex-safe requirement, but the implementation then failed to get the platform gate to a stable PASS.

Sequence of technical blockers:

1. ActiveGate found transient WebDAV/provider failures, mainly `503`.
2. Controller retried too broadly and repeatedly instead of escalating failed sources cleanly.
3. Visible count moved from the stale 78 baseline to 65 visible rows.
4. Same-snapshot QA drift appeared: PlatformGate expected 65 rows, VisibleCatalogQA checked 66.
5. Root cause was not initially fixed correctly. `PlatformGate` passed snapshot paths to the step object, but the child invocation lost the `-PathListFile` value.
6. Final root cause found: `Invoke-ChildPs` used a parameter named `$Args`, colliding with PowerShell automatic `$args` behavior. Child scripts received `PathListFile=` empty.
7. After patching `$Args` to `$ChildArgs`, VisibleCatalogQA finally logged a correct non-empty path list and selected 65 rows.
8. The run was still not complete when paused; several Plex HLS probe failures remained.

The direct reason the project did not progress beyond 65 is that the system was designed to block catalogue expansion until the safety gate passed, and the safety gate repeatedly failed due orchestration bugs and Plex HLS compatibility failures.

## Design Constraints That Still Matter

These constraints are non-negotiable if Plex is the playback frontend:

- Plex-safe playback must be proven before a title becomes visible.
- No raw live `.strm` entries should be visible.
- No placeholders, fake titles, wrong-title playback, porn/adult content, CAM/TS/TC/HDCAM/telesync/telecine releases.
- Cached Real-Debrid sources are preferred.
- Quality comes after Plex compatibility: 4K if Plex-safe, otherwise 1080p, then lower.
- Plex Web, iOS, Fire TV/Amazon, and normal Plex clients must work.
- At least 5 concurrent stream QA must pass before claiming the system is stable.
- Transient provider errors should not destructively reject a title.
- Failed source/release must be quarantined without rejecting the title.
- PowerShell scripts must remain Windows PowerShell 5.1-compatible.
- Long jobs must run detached locally, not inline in Codex.
- Background work must be hidden and quiet.

There is also a major design tension:

- Jason wants aggressive concurrent progress.
- ScarFLIX requires no overlap between publisher, AutoGate, VisibleCatalogQA, PlexDecisionQA, ConcurrentQA, and PlatformGate to avoid false visibility and moving-snapshot errors.

That contradiction must be resolved by parallelizing candidate discovery and metadata work, not by overlapping Plex visibility gates.

## Technical Dependencies

Core local runtime:

- Windows 11
- Windows PowerShell 5.1
- Node.js for dashboard/sentinel/mirror workers
- Ollama at `11434`
- Plex Media Server and Plex SQLite
- Plex Transcoder
- rclone/WebDAV mount exposed under `S:\media`

ScarFLIX content stack:

- Real-Debrid token from `C:\Users\jason\OneDrive\Public\TOKENS`
- Torrentio/Stremio resolver endpoint
- TMDb token/key files from the same vault
- Optional qBittorrent/Prowlarr/Arr integration
- WebDAV map: `D:\PlexTools\state\scarflix_v2\webdav_map.json`
- Source quarantine store: `D:\PlexTools\state\scarflix_v2\source_quarantine`

Status and publication:

- Local status root: `D:\PlexTools\public\latest\scarflix_v2`
- Legacy status root: `D:\PlexTools\public\latest\scarflix`
- GitHub mirror repository: `r0cksteadyw00t/plex-logs`
- Public dashboard: `https://r0cksteadyw00t.github.io/plex-logs/latest/scarflix_v2/`

Known weak dependency points:

- Status is split between `scarflix` and `scarflix_v2`.
- Dashboard can show fresh heartbeat activity while the actual product outcome is unchanged.
- `8805/health` does not currently prove a real JSON API/agent health contract.
- PowerShell launch from the Codex tool became unreliable/hung during this work, so Node-only probes were used.

## Root Cause Analysis

### 1. Infrastructure Was Mistaken For Outcome

Installing controllers, watchdogs, dashboards, and runners was treated as progress. It was not product progress unless it produced visible, working user outcomes.

Outcome metrics should have been:

- Can Jason open `8791` and have a useful private AI conversation with working local tools?
- Can Jason open Plex and play new ScarFLIX content reliably on Web, iOS, and Fire TV?
- Did the catalogue safely grow?
- Did the system recover without Codex intervention?

Most status pages measured activity rather than these outcomes.

### 2. The Gate Became A Bottleneck Without A Small Canary

The system tried to gate a 65-to-78 item visible set instead of proving a tiny canary path first.

Correct first user outcome should have been:

- 1 known movie and 1 known TV episode.
- Real debrid-backed source.
- Plex-safe materialized/WebDAV playback.
- Web/iOS/Fire TV tested.
- Dashboard shows a simple PASS.

Only after that should expansion resume.

### 3. The Controller Was Not A True Autonomic Controller

The controller could:

- launch a runner,
- observe status files,
- retry on some transient states.

It could not reliably:

- classify every failure class,
- patch orchestration defects,
- detect stale status semantics,
- move from repeated REVIEW to correct quarantine/remediation without Codex,
- distinguish “dashboard fresh” from “outcome progressing”.

This is why Jason had to keep complaining and why Codex had to keep patching.

### 4. Dashboard Semantics Were Misleading

The dashboard had fresh timestamps and PASS/LOW sentinel states even when:

- catalogue count was not growing,
- product outcomes were absent,
- PlatformGate remained in a loop,
- current visible QA had not reached a meaningful user milestone.

The dashboard needs separate lanes:

- system heartbeat,
- active job progress,
- product outcomes,
- blockers requiring engineering,
- user-visible deliverables.

### 5. ScarFLIX Architecture Drifted Between Direct `.strm`, WebDAV, And Plex Compatibility

The original Stremio-like ask was live debrid-backed playback in Plex.

Plex does not behave like Stremio for arbitrary remote URLs. It often routes through transcode/HLS decisions and client profiles. That created the move toward WebDAV/materialized Plex-safe media.

This is likely the right direction for Plex compatibility, but it must be explicit:

- ScarFLIX is not raw Torrentio `.strm` streaming.
- ScarFLIX should be a Plex-safe debrid-backed virtual/materialized catalogue.
- Candidate sources are tried until one passes Plex gates.
- Only passing sources become visible.

### 6. Too Many Concurrent Systems Were Added Before A Deterministic Core

Controller, watchdog, sentinel, mirror, dashboard, fast-track accelerator, predictive simulator, worker mesh, and self-evolution were added around an unstable core.

This increased moving parts without increasing delivered value.

The reset must invert this:

1. deterministic single-title path,
2. stable local status,
3. then automation,
4. then expansion,
5. then AI/worker abstraction.

## Current State By Major Goal

### Daily AI / Private ChatGPT-Grok Clone

Status: not delivered.

Evidence:

- `8791` responds HTTP 200.
- `8805` responds HTTP 200.
- `8805/health` returns an HTML shell, not a clear health JSON contract.
- No evidence in this review that the UI provides robust streaming, durable chat history, tool execution, permissioned local actions, or mission orchestration.

Required reset:

- Define a minimal AI MVP:
  - chat UI at `8791`,
  - backend JSON health at `8805/health`,
  - streaming chat endpoint,
  - persistent conversation file/store,
  - one safe local tool: “show ScarFLIX status”,
  - one safe local tool: “run canary request”.

### ScarFLIX / Plex-Stremio Experience

Status: not delivered.

Evidence:

- Only `1` movie `.strm` in Streaming Movies.
- `0` TV `.strm` in Streaming TV.
- Current visible gate snapshot stuck around 65 rows.
- Multiple Plex HLS probe failures remain.
- Raw `.strm` sanity item was still visible during QA.

Required reset:

- Do not resume broad expansion.
- Build a canary lane:
  - one movie,
  - one TV episode,
  - one anime episode if needed,
  - prove Web/iOS/Fire TV playback,
  - only then re-enable expansion.

### Local Autonomy / No Codex Dependency

Status: not delivered.

Evidence:

- Codex repeatedly patched controller failure modes.
- Self-healing did not fix the `$Args` PowerShell argument bug.
- Controller status could remain `RUNNING` while the actual job needed code changes.

Required reset:

- Controller must produce `ENGINEERING_BUG` when it detects impossible/stale semantics, instead of pretending progress is healthy.
- Controller should not attempt infinite self-repair of code defects.
- Dashboard should clearly say “blocked on engineering defect” when automation cannot make forward progress.

### Live Dashboard / Regular Updates

Status: partially delivered but misleading.

Evidence:

- Public/local status files updated frequently.
- Dashboard showed fresh RUNNING/PASS while user-visible outcomes did not change.
- RawGithack/legacy status caused confusion.

Required reset:

- One canonical dashboard URL.
- Dashboard top line must show:
  - `Product outcome status`,
  - `Last visible user outcome`,
  - `Current blocker`,
  - `Next autonomous action`,
  - `Last material catalogue change`.

## Reset Plan

### Phase 0: Freeze And Baseline

Goal: stop changing state and document reality.

Status: in progress.

Acceptance:

- Background progression tasks paused.
- Active long jobs stopped.
- Evidence snapshot written.
- Current state and plan documented.

### Phase 1: Status Truth Contract

Goal: status must not lie.

Implement:

- A single `project_truth.json` generated locally.
- Explicit fields:
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
- Dashboard must read this as the top-level truth source.

Acceptance:

- Dashboard cannot show overall PASS if product outcomes are absent.
- Stale job activity cannot mask zero product progress.

### Phase 2: AI MVP First

Goal: deliver Jason a usable private AI surface before more automation complexity.

Implement:

- `8791` chat UI with persistent history.
- `8805/health` JSON endpoint.
- `8805/chat` streaming endpoint.
- Tool trace display.
- Tool: read ScarFLIX truth status.
- Tool: create a canary ScarFLIX request.

Acceptance:

- Jason can open `8791`, type “what is ScarFLIX status?”, and receive accurate status from local files.
- Jason can ask “create a canary movie request” and see the queued action.

### Phase 3: ScarFLIX Canary Delivery

Goal: prove the end-to-end Plex playback experience with a tiny set.

Implement:

- Canary set:
  - one movie,
  - one TV episode,
  - one known anime episode if needed.
- Candidate source attempts isolated from visible catalogue.
- Materialize only Plex-safe source.
- Hide all failed candidates.

Acceptance:

- Plex Web playback PASS.
- iOS playback PASS.
- Fire TV playback PASS.
- No raw `.strm` visible.
- Dashboard says exactly which title passed and when.

### Phase 4: Candidate Source Retry/Quarantine Model

Goal: one bad source cannot reject a title.

Implement:

- Candidate table/state:
  - title id,
  - source id,
  - release name,
  - quality,
  - codec/container/audio,
  - debrid cache state,
  - Plex gate result,
  - reason code,
  - retry eligibility.
- Quarantine source/release only.
- Keep title wanted until candidate budget exhausted.

Acceptance:

- A failed HLS/codec/source availability candidate gets quarantined.
- Same title tries alternate candidate.
- Title-level failure occurs only after all candidate classes fail.

### Phase 5: Controlled Expansion

Goal: expand catalogue safely after canary and candidate model pass.

Implement:

- Batch size starts at 5 titles.
- English-first curation.
- No porn/adult.
- No CAM/TS/TC/HDCAM/telesync/telecine.
- 4K preferred only when Plex-safe.
- 1080p fallback.

Acceptance:

- Batch dashboard shows:
  - added,
  - verified,
  - quarantined sources,
  - titles still wanted,
  - user-visible additions.

### Phase 6: 5-Concurrent Stream QA

Goal: prove Plex can handle at least 5 simultaneous ScarFLIX streams.

Implement:

- Run only on canary plus verified batch.
- Track CPU/transcoder stress, HLS decision, and client-safe profiles.

Acceptance:

- 5 concurrent streams pass.
- Failures are tied to source/client profile, not title deletion.

### Phase 7: Autonomy Rebuild

Goal: rebuild self-healing around proven workflows.

Implement:

- Controller owns only proven actions.
- Controller emits `ENGINEERING_BUG` when it sees impossible state.
- Watchdog tracks material progress, not just heartbeats.
- Sentinel escalates if no user-visible progress after threshold.

Acceptance:

- A stall creates a clear blocker with evidence.
- No silent loops.
- No “PASS” dashboard while outcomes remain absent.

## Immediate Stop Rules

Do not resume:

- catalogue expansion,
- PlatformGate loops,
- candidate simulations,
- self-evolution,
- worker mesh escalation,
- dashboard PASS claims,
- public “all good” updates.

Resume only after:

- this review is accepted or revised,
- Phase 1 truth contract is implemented,
- Phase 2 AI MVP or Phase 3 ScarFLIX canary is selected as the next explicit milestone.

## Recommended Next Milestone

Recommended: Phase 1 plus Phase 2.

Reason:

- Jason needs a reliable local command interface and truthful status before more background automation.
- ScarFLIX canary work can then be driven through that interface and reported honestly.

The alternative is Phase 1 plus Phase 3 if ScarFLIX playback remains the only priority.

