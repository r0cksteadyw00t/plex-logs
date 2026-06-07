# JasonOS Prime / ScarFLIX v2 As-Built Forensic Inventory

Last updated: 2026-06-07 14:15 Australia/Sydney.

## Target Outcome

The intended outcome remains full JasonOS Prime, with ScarFLIX as Mission 001.

JasonOS Prime target:

- Private local AI Command Centre that feels like Jason's own ChatGPT/Grok.
- Conversational UI at `8791`.
- Local AI/backend brain around `8805`.
- Local execution tools, worker orchestration, persistent memory, mission control, project tracking, and status dashboard.
- Local-first operation that minimizes Codex/token use.
- Self-healing and autonomous progression where technically possible.
- Cross-device/phone access.
- ScarFLIX is the proving ground for all of this.

ScarFLIX Mission 001 target:

- Plex-first, Stremio-like user experience.
- Plex is the playback front end.
- Real-Debrid/Torrentio/debrid-backed sources where possible.
- Only Plex-safe, playable, correct-title content becomes visible.
- Failed source/release is quarantined; title remains wanted/retryable.
- English-first catalogue.
- No porn/adult content.
- No CAM/TS/TC/HDCAM/telesync/telecine releases.
- Prefer Plex-safe 4K, then 1080p, then lower if required.
- Support Plex Web, iOS, Fire TV/Amazon, and normal Plex clients.
- Prove 5+ concurrent streams.

## Fixed Environment Anchors

- OS: Windows 11.
- Shell target for scripts: Windows PowerShell 5.1.
- Token/config vault: `C:\Users\jason\OneDrive\Public\TOKENS`.
- Logs: `D:\PlexTools\logs`.
- Ledger: `D:\PlexTools\logs\job_ledger.csv`.
- Local publish base v1/legacy: `D:\PlexTools\public\latest\scarflix`.
- Local publish base v2: `D:\PlexTools\public\latest\scarflix_v2`.
- GitHub mirror: `r0cksteadyw00t/plex-logs`, branch `main`.
- Public status base: `https://r0cksteadyw00t.github.io/plex-logs/latest/scarflix_v2/`.
- Plex request movies: `D:\ScarFLIX\Wishlist\Movies`.
- Plex request TV: `D:\ScarFLIX\Wishlist\TV`.
- Streaming movies: `D:\StremioCatalog\_Hybrid\Movies`.
- Streaming TV: `D:\StremioCatalog\_Hybrid\Shows`.

## Observed Local Services

- `8791`: HTTP 200, Command Centre/UI reachable.
- `8805`: HTTP 200, AI/backend page reachable.
- `8805/health`: HTTP 200, but returned HTML shell rather than a clear JSON health contract.
- `11434`: Ollama API reachable; `/api/tags` returned HTTP 200.

## Current Frozen Outcome Counts

Captured during forensic pause:

- Streaming movie `.strm`: `1`.
- Streaming TV `.strm`: `0`.
- ScarFLIX movie request JSON files: `0`.
- ScarFLIX TV request JSON files: `1`.
- Source quarantine records: `24`.
- PlatformGate visible snapshot under test: `65`.
- PlatformGate visible movies: `45`.
- PlatformGate visible TV: `20`.

## Current Pause State

Progression was paused on 2026-06-07 after Jason requested forensic review.

Disabled tasks:

- `ScarFLIX_v2_AutonomousController`.
- `ScarFLIX_v2_DurablePlatformGateRunner`.
- `JasonOS_Prime_OutcomeDashboard`.
- `JasonOS_Prime_PublicMirrorPublisher`.

Stopped active PIDs:

- PlatformGate child PID observed before pause: `17968`.
- PlatformGate owner PID observed before pause: `44104`.

Pause/status evidence:

- `D:\PlexTools\public\latest\scarflix_v2\forensic_pause_status.json`.
- `D:\PlexTools\public\latest\scarflix_v2\forensic_evidence_snapshot.json`.
- `D:\PlexTools\public\latest\scarflix_v2\forensic_task_state.json`.
- `D:\PlexTools\public\latest\scarflix_v2\forensic_dependency_probes.json`.
- `D:\PlexTools\public\latest\scarflix_v2\project_truth.json`.
- `D:\PlexTools\public\latest\scarflix_v2\project_truth.md`.

## Public Evidence Links

- Forensic review:
  - `https://raw.githubusercontent.com/r0cksteadyw00t/plex-logs/main/latest/scarflix_v2/forensic_review_20260607.md`
- Project truth:
  - `https://raw.githubusercontent.com/r0cksteadyw00t/plex-logs/main/latest/scarflix_v2/project_truth.md`
  - `https://raw.githubusercontent.com/r0cksteadyw00t/plex-logs/main/latest/scarflix_v2/project_truth.json`
- Pause status:
  - `https://raw.githubusercontent.com/r0cksteadyw00t/plex-logs/main/latest/scarflix_v2/forensic_pause_status.json`

## As-Built Scripts And Components

ScarFLIX v2 scripts observed or referenced:

- `D:\PlexTools\Scripts\scarflix_v2\ScarFLIX_v2_PlatformGate.ps1`
- `D:\PlexTools\Scripts\scarflix_v2\ScarFLIX_v2_VisibleCatalogQA.ps1`
- `D:\PlexTools\Scripts\scarflix_v2\ScarFLIX_v2_DurablePlatformGateRunner.ps1`
- `D:\PlexTools\Scripts\scarflix_v2\ScarFLIX_v2_AutonomousController.ps1`
- `D:\PlexTools\Scripts\scarflix_v2\ScarFLIX_v2_SourceQuarantine.ps1`
- `D:\PlexTools\Scripts\scarflix_v2\ScarFLIX_v2_CandidateSourceModel.ps1`
- `D:\PlexTools\Scripts\scarflix_v2\ScarFLIX_v2_RcloneMountKeepalive.ps1`
- `D:\PlexTools\Scripts\scarflix_v2\ScarFLIX_v2_PlatformGate_PublishCheckpoint.ps1`
- `D:\PlexTools\Scripts\scarflix_v2\ScarFLIX_v2_PlatformGate_StatusSummary.ps1`
- `D:\PlexTools\Scripts\scarflix_v2\ScarFLIX_v2_WebDavActiveGate.ps1`
- `D:\PlexTools\Scripts\scarflix_v2\ScarFLIX_v2_PlexClientDecisionQA.ps1`
- `D:\PlexTools\Scripts\scarflix_v2\ScarFLIX_v2_ConcurrentStreamQA.ps1`
- `D:\PlexTools\Scripts\scarflix_v2\ScarFLIX_v2_HealthStatus.ps1`

Worker/status components observed:

- `D:\PlexTools\Foundry\workers\JasonOS_Prime_OutcomeDashboard.js`
- `D:\PlexTools\Foundry\workers\JasonOS_Prime_PublicMirrorPublisher.js`
- `D:\PlexTools\public\latest\scarflix_v2\jasonos_prime_outcome_dashboard.json`
- `D:\PlexTools\public\latest\scarflix_v2\jasonos_prime_public_mirror_status.json`
- `D:\PlexTools\public\latest\scarflix_v2\jasonos_prime_sentinel_status.json`
- `D:\PlexTools\public\latest\scarflix_v2\watchdog_stall_status.json`

Local state roots:

- `D:\PlexTools\state\scarflix_v2`.
- `D:\PlexTools\state\scarflix_v2\platform_gate_snapshots`.
- `D:\PlexTools\state\scarflix_v2\source_quarantine`.
- `D:\PlexTools\state\scarflix_v2\webdav_map.json`.

Backups created during recent forensic patching:

- `D:\PlexTools\backups\scarflix_v2\ScarFLIX_v2_AutonomousController_20260607T021759Z_visibleqa_quarantine.ps1.bak`
- `D:\PlexTools\backups\scarflix_v2\ScarFLIX_v2_SourceQuarantine_20260607T021759Z_visibleqa_quarantine.ps1.bak`
- `D:\PlexTools\backups\scarflix_v2\ScarFLIX_v2_PlatformGate_20260607T025423Z_child_args.ps1.bak`

## Historic Thread Issue Log

This is a condensed history from the start of this Codex thread to the forensic pause.

### 001 Initial ScarFLIX Request Lane Bootstrap

Initial request:

- Build ScarFLIX request lane from intake to resolve to validate to publish.
- Use fixed paths under `D:\ScarFLIX`, `D:\StremioCatalog`, `D:\PlexTools`.
- Create request stubs, placeholder files, state/ledger, scheduled tasks, publisher, GitHub mirror.

Outcome:

- Bootstrap concept and scripts were produced.
- Initial script had PowerShell 7 syntax issues in later patches (`? :` ternary) and parser problems.
- Several generated scripts had to be repaired.

Status:

- Partially solved as scaffolding.
- Not sufficient for user outcome.

### 002 Tokens And Credentials

Jason provided and pointed to token files:

- Real-Debrid token files.
- TMDb token/key files.
- GitHub PAT files.
- qBittorrent credentials and config.
- Prowlarr/Jackett information.

Issues:

- Codex initially behaved as if credentials needed manual confirmation.
- Jason objected that tokens should be discovered automatically.

Status:

- Token vault path is established.
- Need a formal credential discovery contract that never logs secrets and reports only present/missing/invalid.

### 003 qBittorrent / Prowlarr / Decypharr Investigation

History:

- qBittorrent details existed under tokens.
- Prowlarr showed a Jackett index.
- Decypharr inspection packages were created.
- First inspection package had quoting/parser bugs with embedded shell `$f`.
- Fixed inspection package showed Decypharr, Radarr, Sonarr, Prowlarr, Jellyseerr reachable and Decypharr qBittorrent mock login working.

Status:

- Some connectivity was proven.
- No clear final integrated resolver outcome was delivered.

### 004 GitHub Mirror / Dashboard / NoExit Scripts

History:

- GitHub PAT details were provided.
- User complained instructions were not step-by-step.
- Scripts disappeared/closed shells.
- `scarflix_dashboard.cmd` was missing.
- Several no-exit / dashboard launcher files were attached or generated.
- Pop-up consoles became a recurring problem.

Status:

- Public mirror publishing exists.
- Quiet/hidden execution became a formal requirement.
- Dashboard exists but was misleading and sometimes stale/confusing across canonical vs legacy URLs.

### 005 Early Playback Failures

User observed:

- Big Buck Bunny playback error `s1001 (Network)`.
- 12 Angry Men played a 5-second Big Buck Bunny clip.
- Night of the Living Dead showed a static “torrent downloading from debrid” screen then returned to menu.
- Sintel did not stream.

Interpretation:

- Raw `.strm` / placeholder / wrong-title flows were unsafe.
- Plex client behavior was not being replicated by simple URL/HEAD tests.

Status:

- Led to Plex-safe gate concept.
- Wrong-title and placeholder visibility became hard blockers.

### 006 Plex Client Compatibility Failures

User observed:

- House MD and Star City failed with Plex transcoder crashes.
- iOS got HLS/transcode decision HTTP errors.
- Fire TV sometimes worked after reboot.
- Movies such as Devil Wears Prada had delayed availability.
- City of God produced HLS decision HTTP errors.

Interpretation:

- Plex client profile/transcode/HLS behavior is central.
- WebDAV HEAD/range is necessary but not sufficient.
- Need Plex HLS/transcoder probes and client decision QA.

Status:

- VisibleCatalogQA and PlexDecisionQA concepts were added.
- Not yet stable enough to claim outcome.

### 007 No Porn / No CAM / English-First Catalogue

Jason clarified:

- No porn.
- No cam versions.
- English-first catalogue.
- Anime allowed, dub preferred, subtitles acceptable.
- Foreign-language content allowed when culturally/critically significant, not filler.

Status:

- Incorporated into requirements.
- Needs enforcement in candidate source model and catalogue curation.

### 008 Concurrency Requirement

Jason requested:

- Plex should handle more than one concurrent stream, ideally 5+.

Status:

- ConcurrentStreamQA exists conceptually.
- 5-concurrent acceptance was not achieved.

### 009 Desktop Pop-Ups

Jason reported:

- Lots of shell popups on desktop.
- Wanted background work hidden/invisible/quiet, possibly Desktop 2.

Status:

- Quiet hidden tasks became a requirement.
- Some tasks still used scheduled processes and shell wrappers.
- Need enforce hidden launcher design consistently.

### 010 Autonomous Controller And Heartbeat Monitoring

History:

- Codex created/updated autonomous controller and scheduled tasks.
- Heartbeat `scarflix-stall-recovery-retry` monitored progress.
- User objected that Codex kept stopping and controller install was treated as completion.
- Controller was supposed to progress milestones without Jason.

Status:

- Controller existed and ran.
- It was not truly autonomous; Codex repeatedly had to diagnose and patch.

### 011 PlatformGate Stale Loop

Problem:

- Dashboard showed repeated PlatformGate RUNNING/REVIEW.
- ActiveGate had transient 503 failures.
- Controller retried repeatedly.
- Peer-review pack was created for Grok.

Solved:

- Durable PlatformGate runner implemented with single owner, lock, heartbeat, PID tracking, stale/orphan handling.
- ActiveGate eventually passed `65/65`.

Outstanding:

- Durable runner did not solve all orchestration bugs.

### 012 Dashboard Staleness / Legacy URL Confusion

Problem:

- User watched `https://raw.githack.com/r0cksteadyw00t/plex-logs/main/latest/scarflix/index.html`.
- Dashboard appeared unchanged for hours.
- Canonical v2 dashboard had fresher status, but user surface was confusing.

Solved:

- Canonical dashboard set to `https://r0cksteadyw00t.github.io/plex-logs/latest/scarflix_v2/`.
- Legacy alias JSON was patched.

Outstanding:

- Dashboard semantics still misleading because it showed activity rather than product outcomes.

### 013 Same-Snapshot Drift

Problem:

- PlatformGate snapshot expected `65`.
- VisibleCatalogQA checked `66`.

Partial fix:

- VisibleCatalogQA patched to accept `-PathListFile`.
- PlatformGate step definition patched to include snapshot path list.

Later root cause:

- PlatformGate child argument forwarding used `$Args`.
- PowerShell automatic `$args` collision caused child to receive `PathListFile=` empty.

Solved:

- Renamed `$Args` to `$ChildArgs`.
- Updated call site to `-ChildArgs`.
- Verified later log:
  - `PathListFile=D:\PlexTools\state\scarflix_v2\platform_gate_snapshots\platform_gate_snapshot_paths_20260607T025524Z.txt`
  - `Loaded snapshot path filter: 65`
  - `Visible rows selected for QA: 65`

Outstanding:

- PlatformGate did not reach final PASS before pause.

### 014 VisibleCatalogQA Plex HLS Failures

Problem:

- Multiple releases timed out or failed Plex HLS probes.
- Example failures included:
  - The Godfather Part II
  - Harry Potter and the Goblet of Fire
  - Unfaithful
  - Parasite
  - The Lord of the Rings entries
  - Oldboy
  - Pilot episodes
  - JasonOS Pipeline Sanity Check visible raw `.strm`

Solved:

- SourceQuarantine patched to understand VisibleCatalogQA `results`.
- Added reason codes:
  - `PLEX_HLS_TIMEOUT`
  - `PLEX_HLS_PROBE_FAILED`
  - `RAW_STRM_VISIBLE`
- Controller patched to launch source/release quarantine from VisibleCatalogQA failures.

Outstanding:

- Did not run to completion after patch before pause.

### 015 AI Command Centre Outcome

Observed:

- `8791` is reachable.
- `8805` is reachable.
- `8805/health` returned HTML shell, not JSON.
- Ollama reachable.

Failure:

- No evidence that Jason has a usable private ChatGPT/Grok-like AI with streaming, persistent history, tools, memory, and mission control.

Outstanding:

- Define and deliver AI MVP.

### 016 Forensic Pause

Jason requested:

- Stop project progress.
- Perform forensic technical review.
- Consider progress so far a failure.
- Document current state, design constraints, dependencies, issues, and plan.

Actions:

- Disabled progression tasks.
- Killed active PlatformGate owner/child.
- Captured forensic evidence.
- Created reset plan.
- Published project truth and forensic review.
- Deleted heartbeat automation after pause to avoid conflicting relaunches.

## Solved Issues

The following issues have at least a concrete fix or documented mitigation:

1. Canonical paths and environment anchors established.
2. Token vault path established.
3. GitHub public mirror can publish files.
4. Command/dashboard status roots created.
5. Quiet/hidden task requirement documented.
6. ActiveGate can pass a 65-row WebDAV snapshot.
7. Durable PlatformGate runner implemented with owner/child PID and heartbeat.
8. Same-snapshot path list support added to VisibleCatalogQA.
9. PowerShell `$Args` child-forwarding bug found and patched.
10. VisibleCatalogQA source failures can be normalized for source quarantine.
11. Reason codes added for Plex HLS timeout/probe failure and raw `.strm` visibility.
12. Forensic pause and truth status created.
13. Public forensic review and Grok prompt publishing works.

## Outstanding Issues

These remain unresolved:

1. ScarFLIX user outcome not delivered.
2. Daily AI/Grok clone not delivered.
3. No reliable local no-Codex autonomy.
4. Dashboard not outcome-truthful by default.
5. Only `1` movie `.strm`, `0` TV `.strm`.
6. Broad catalogue expansion blocked and should remain blocked until canary succeeds.
7. PlatformGate did not reach final PASS before pause.
8. Plex HLS failures still need candidate-source quarantine and alternate selection.
9. Raw `.strm` sanity item was visible during QA.
10. Candidate source retry/quarantine model not proven end-to-end.
11. 5-concurrent stream QA not achieved.
12. Plex Web/iOS/Fire TV canary playback not achieved in a documented PASS.
13. `8805/health` lacks a proper JSON health contract.
14. `8791` does not yet prove persistent streaming chat/tool UX.
15. Local controller cannot reliably classify engineering bug vs transient provider issue vs source failure.
16. Scheduled task inventory is inconsistent; some named sentinel/watchdog tasks did not exist.
17. Public dashboard had canonical/legacy confusion.
18. Project accumulated too many orchestration layers before a deterministic canary.

## Core Architecture Question For Peer Review

The key question is not whether the target should be reduced. It should not be reduced.

The question is how to architect the path to the full JasonOS Prime outcome without confusing infrastructure activity for delivered product.

Peer review should evaluate:

- Whether Plex can realistically provide a Stremio-like experience with Real-Debrid.
- Whether WebDAV/rclone materialization is the correct middleware.
- Whether a local HTTP proxy/middleware is needed.
- How to make candidate-source retry/quarantine deterministic.
- How to build a truthful dashboard.
- Whether to deliver AI MVP first, ScarFLIX canary first, or both in a narrow sequence.

