# Grok God-Mode Forensic Peer Review Prompt - JasonOS Prime / ScarFLIX v2

Copy/paste this entire prompt into Grok.

---

Grok, perform a full forensic peer review of JasonOS Prime / ScarFLIX v2 from project start to current pause.

Important correction: do not reduce scope.

The target outcome is still full JasonOS Prime / god-mode local AI Command Centre, with ScarFLIX as Mission 001 and the primary proving ground. The forensic review is not asking whether ambition should be reduced. It is asking why execution has failed to deliver the intended outcomes so far and what architecture/plan can actually reach the full target.

## Target Outcome Remains God-Mode

JasonOS Prime target:

- Jason's own private ChatGPT/Grok-like local AI.
- Command Centre at `8791`.
- AI/backend brain around `8805`.
- Persistent chat history.
- Streaming responses.
- Tool calls and visible tool traces.
- Local execution power.
- Mission control across projects.
- Worker mesh and plugin system once the core is reliable.
- Self-healing and autonomous progression.
- Phone/multi-device access.
- Minimal dependence on Codex/API tokens.
- Dashboard showing live, truthful product progress.

ScarFLIX Mission 001 target:

- Plex-first Stremio-like experience.
- Plex is the required playback client.
- Real-Debrid/Torrentio/debrid-backed sources where possible.
- Only Plex-safe, playable, correct-title content appears.
- Failed source/release is quarantined; title remains wanted/retryable.
- No raw live `.strm` entries visible in Plex.
- No placeholders, fake titles, wrong-title playback, porn/adult, CAM/TS/TC/HDCAM/telesync/telecine releases.
- English-first catalogue.
- Plex-safe 4K preferred, then 1080p, then lower.
- Plex Web, iOS, Fire TV/Amazon support.
- 5+ concurrent stream QA.

## Review Mode

Be forensic and critical.

Do not give a hype response. Do not merely say "build more agents". Diagnose why the current system did not deliver. Recommend the architecture and implementation order most likely to achieve the full god-mode target.

You should explicitly separate:

- full long-term target,
- current as-built reality,
- delivery failures,
- solved issues,
- outstanding issues,
- architecture correction,
- next implementation sequence,
- acceptance tests.

## Public Evidence Links

Use these public evidence files:

- Current as-built forensic inventory:
  - https://raw.githubusercontent.com/r0cksteadyw00t/plex-logs/main/latest/scarflix_v2/jasonos_scarflix_as_built_forensic_20260607.md
- Forensic review and reset plan:
  - https://raw.githubusercontent.com/r0cksteadyw00t/plex-logs/main/latest/scarflix_v2/forensic_review_20260607.md
- Current project truth:
  - https://raw.githubusercontent.com/r0cksteadyw00t/plex-logs/main/latest/scarflix_v2/project_truth.md
  - https://raw.githubusercontent.com/r0cksteadyw00t/plex-logs/main/latest/scarflix_v2/project_truth.json
- Pause status:
  - https://raw.githubusercontent.com/r0cksteadyw00t/plex-logs/main/latest/scarflix_v2/forensic_pause_status.json

If public links are inaccessible, use the self-contained summary below.

## Current Outcome Failure

Treat progress so far as failed against user outcomes:

- Private ChatGPT/Grok-like daily AI: not delivered.
- ScarFLIX Plex/Stremio-like experience: not delivered.
- Local no-Codex autonomy: not delivered.
- Dashboard: partially delivered but misleading.
- Current catalogue result:
  - Streaming movie `.strm`: `1`
  - Streaming TV `.strm`: `0`
  - Current visible gate rows: `65`
  - Visible split: `45` movies / `20` TV
  - Source quarantine records: `24`

The project is paused for forensic review. Background progression has been stopped.

## Current Frozen State

Disabled tasks:

- `ScarFLIX_v2_AutonomousController`
- `ScarFLIX_v2_DurablePlatformGateRunner`
- `JasonOS_Prime_OutcomeDashboard`
- `JasonOS_Prime_PublicMirrorPublisher`

Stopped active PlatformGate PIDs:

- child `17968`
- owner `44104`

Local dependency probes:

- `8791`: HTTP 200, UI reachable.
- `8805`: HTTP 200, AI/backend page reachable.
- `8805/health`: HTTP 200 but returned HTML shell, not clear JSON health.
- `11434`: Ollama reachable.

## Historic Thread Summary

The project started as ScarFLIX request lane automation:

- intake request stubs,
- placeholder files,
- state machine,
- debrid-first resolver,
- qBittorrent/Prowlarr fallback,
- strict admission gate,
- `.strm` publishing into Plex Streaming libraries,
- status/ledger/GitHub mirror.

It expanded into JasonOS Prime:

- local AI command centre,
- 8791 UI,
- 8805 backend,
- local tools,
- worker mesh,
- watchdog/sentinel,
- self-healing,
- dashboards,
- public mirror,
- ScarFLIX as Mission 001.

Major observed failures:

- Many generated scripts had PowerShell parser/syntax issues.
- qBittorrent/Prowlarr/Decypharr integration was investigated but not turned into a reliable user outcome.
- Dashboard/no-exit launchers were inconsistent; files were missing or shells disappeared.
- Pop-up console windows appeared on Jason's desktop.
- Big Buck Bunny and other test playback failed.
- 12 Angry Men played a 5-second Big Buck Bunny clip, proving wrong-title/fake playback risk.
- Night of the Living Dead showed a static "torrent downloading from debrid" screen and returned to menu.
- House MD and Star City caused Plex transcoder crashes.
- iOS produced HLS/transcode decision HTTP failures.
- Fire TV sometimes worked after reboot but not consistently.
- Devil Wears Prada delayed before working.
- City of God produced HLS decision errors.
- Dashboard looked stale for hours.
- Controller/watchdog/sentinel reported PASS/LOW while no user outcome changed.
- PlatformGate looped through RUNNING/REVIEW.
- Catalogue stayed around 65 visible gate rows.
- Only 1 movie `.strm`, 0 TV `.strm` were present at forensic pause.

Important solved issues:

- Environment paths and token vault established.
- Public mirror works.
- ActiveGate can pass a 65-row WebDAV snapshot.
- Durable PlatformGate runner created with lock/PID/heartbeat.
- VisibleCatalogQA accepts snapshot path list.
- PowerShell `$Args` child-argument forwarding bug was found and patched.
- After patch, VisibleCatalogQA logged correct snapshot behavior:
  - non-empty `PathListFile`,
  - `Loaded snapshot path filter: 65`,
  - `Visible rows selected for QA: 65`.
- SourceQuarantine can interpret VisibleCatalogQA results.
- Reason codes added:
  - `PLEX_HLS_TIMEOUT`
  - `PLEX_HLS_PROBE_FAILED`
  - `RAW_STRM_VISIBLE`
- Forensic pause/truth files created.

Outstanding issues:

- No working ScarFLIX user outcome.
- No working daily AI product.
- No proven autonomous controller.
- No truthful outcome dashboard.
- PlatformGate did not reach final PASS before pause.
- Plex HLS probe failures remain.
- Raw `.strm` sanity item was visible during QA.
- Candidate-source retry/quarantine not proven end-to-end.
- 5-concurrent stream QA not achieved.
- Plex Web/iOS/Fire TV canary playback not documented PASS.
- `8805/health` is not a proper JSON contract.
- `8791` is not proven as a persistent streaming chat/tool UI.
- Scheduled task inventory inconsistent; some named watchdog/sentinel tasks did not exist.
- Too many orchestration layers were added before a deterministic canary.

## Key Root Causes Identified By Codex

1. Infrastructure was mistaken for product progress.
2. Broad PlatformGate validation was attempted before a tiny canary.
3. Dashboard measured activity, not user-visible outcomes.
4. Controller was not genuinely autonomic; it needed Codex patches.
5. Plex compatibility requirements are harder than raw `.strm` streaming.
6. Same-snapshot QA required serialized Plex visibility changes, conflicting with "everything concurrent".
7. Concurrency should happen in candidate discovery, not in visibility mutation/gating.
8. AI command centre was treated as online when HTTP 200 existed, but not proven as a useful AI product.

## Architecture Questions For Grok

Please answer:

1. Is the diagnosis technically coherent?
2. What did Codex miss?
3. Is Plex-first Stremio-like playback via Real-Debrid feasible as Jason wants?
4. What is the correct ScarFLIX playback architecture?
   - raw `.strm`?
   - WebDAV/rclone materialization?
   - local HTTP middleware/proxy?
   - Plex import with materialized files?
   - hybrid?
5. What should never be visible in Plex?
6. How should candidate source retry/quarantine be represented?
7. How do we retain full god-mode ambition while sequencing delivery correctly?
8. Should the next milestone be:
   - truth dashboard + AI MVP, or
   - truth dashboard + ScarFLIX canary playback, or
   - both in one narrow combined milestone?
9. What should the 8791/8805 AI MVP architecture be?
10. What local model/tool strategy should be used to minimize Codex/token dependence?
11. How should self-healing distinguish:
   - provider transient,
   - source failure,
   - Plex compatibility failure,
   - engineering bug,
   - missing credential,
   - user decision?
12. How should dashboard truth be structured so Jason never has to infer progress from logs?
13. What should be deleted/ignored from the current overbuilt system?
14. What should be kept?
15. What are the top 10 risks?
16. What is the realistic 1-day, 3-day, and 7-day implementation plan?

## Output Requested

Produce:

1. Forensic verdict.
2. Corrected god-mode architecture.
3. ScarFLIX playback architecture recommendation.
4. AI command centre architecture recommendation.
5. What to stop doing.
6. What to keep.
7. What to rebuild.
8. Detailed issue matrix:
   - solved,
   - partially solved,
   - outstanding,
   - false progress.
9. Dashboard truth contract.
10. Candidate-source state model.
11. Autonomous controller state model.
12. Acceptance tests.
13. 1-day, 3-day, 7-day plan.
14. Exact next Codex implementation order.

Be critical and specific. The ambition remains maximum. The execution plan must be practical enough to finally deliver the full target.

