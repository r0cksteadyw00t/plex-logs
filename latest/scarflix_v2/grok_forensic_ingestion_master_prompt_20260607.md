# Grok Forensic Ingestion Master Prompt - JasonOS Prime / ScarFLIX v2

Copy/paste this whole prompt into Grok. If Grok can open links, ask it to ingest every public link below before answering. If it cannot open links, paste the linked raw Markdown/JSON contents manually.

## Prompt To Grok

You are acting as a senior forensic technical reviewer and architecture peer reviewer for JasonOS Prime and ScarFLIX v2.

Do not reduce the target product scope. The intended outcome remains JasonOS Prime: a local-first, high-autonomy AI command and control operating layer with ScarFLIX Mission 001 as the proving ground. The desired user experience is:

- Jason can use a private ChatGPT/Grok-like interface from PC and phone.
- The system can execute local tasks, coordinate workers, publish truthful progress, and continue without repeated Codex prompting.
- ScarFLIX should reproduce the Stremio-like experience inside Plex as far as Plex allows: Plex remains the required playback client, only playable content should appear, bad sources/releases should be retried or quarantined, and catalogue expansion must not create visible broken Plex items.

Perform a forensic review from the start of the project history through the current state. Treat the current implementation as a failed delivery so far, because Jason still does not have the requested user outcomes:

- no reliable private ChatGPT/Grok clone in daily use,
- no working ScarFLIX/Stremio-like Plex experience,
- no proven self-healing project controller,
- no reliable autonomous progress without Codex,
- no dashboard that previously showed truthful user outcomes rather than task activity,
- repeated stalls around PlatformGate/retry/quarantine logic.

Your job:

1. Ingest all evidence links below.
2. Reconstruct the current as-built architecture.
3. Identify root-cause design failures, not just individual bugs.
4. Identify what has been solved versus what remains outstanding.
5. Recommend a corrected architecture and implementation sequence that can actually achieve the full JasonOS Prime / ScarFLIX goals.
6. Be specific: name scripts/files, state machines, data contracts, scheduler changes, UI/backend changes, and acceptance tests.
7. Do not assume "task running" is success. Judge only verified user outcomes.
8. Give a direct verdict: can this be delivered on the current architecture with targeted repairs, or does it require a controlled rebuild of specific subsystems?

## Public Evidence Links

Current post-patch forensic snapshot, containing the latest PlatformGate checkpoint JSON and JasonOS dashboard JSON:

- https://raw.githubusercontent.com/r0cksteadyw00t/plex-logs/main/latest/scarflix_v2/current_forensic_state_after_patch_20260607.json

Latest dashboard JSON:

- https://raw.githubusercontent.com/r0cksteadyw00t/plex-logs/main/latest/scarflix_v2/jasonos_prime_outcome_dashboard.json

Latest PlatformGate checkpoint JSON:

- https://raw.githubusercontent.com/r0cksteadyw00t/plex-logs/main/latest/scarflix_v2/platform_gate_checkpoint.json

Project truth / pause-state forensic status:

- https://raw.githubusercontent.com/r0cksteadyw00t/plex-logs/main/latest/scarflix_v2/project_truth.json
- https://raw.githubusercontent.com/r0cksteadyw00t/plex-logs/main/latest/scarflix_v2/project_truth.md

Forensic review and reset plan:

- https://raw.githubusercontent.com/r0cksteadyw00t/plex-logs/main/latest/scarflix_v2/forensic_review_20260607.md

As-built architecture document:

- https://raw.githubusercontent.com/r0cksteadyw00t/plex-logs/main/latest/scarflix_v2/jasonos_scarflix_as_built_forensic_20260607.md

Prior god-mode forensic peer review prompt/context:

- https://raw.githubusercontent.com/r0cksteadyw00t/plex-logs/main/latest/scarflix_v2/grok_godmode_forensic_peer_review_prompt_20260607.md

Human-readable dashboard:

- https://raw.githack.com/r0cksteadyw00t/plex-logs/main/latest/scarflix_v2/index.html

## Latest Known Current State

Captured around `2026-06-07T05:51Z`.

Durable PlatformGate Runner:

- Status: `REVIEW`
- Owner PID: `41708`
- Child PID: none
- Heartbeat UTC: `2026-06-07T05:50:07Z`
- Heartbeat age at capture: about `2.1` minutes
- Current step: `platform_gate_review`
- Last progress UTC: `2026-06-07T05:50:07Z`
- Child QA last progress UTC: `2026-06-07T05:40:23Z`
- Child QA stale minutes: `9.6`
- Bounded orphan kill threshold: `5` minutes

Actual ScarFLIX Streaming library output:

- Movies `.strm`: `1`
- TV `.strm`: `0`
- Total delivered `.strm`: `1`
- This is the real user outcome count. Visible QA rows are not delivery.

8791 / 8805:

- `8791` is Docker Open WebUI container `foundry-command-centre`, mapped `0.0.0.0:8791->8080`.
- `8791` is configured for local Ollama with `OLLAMA_BASE_URL=http://host.docker.internal:11434`.
- `8805` Node backend now has JSON health and SSE chat with local Ollama streaming and tool traces.
- `8805` health probe passed after patch.
- Remaining gap: 8791 has not been proven to expose 8805 tool traces/worker execution in the daily user interface.

PowerShell / child argument issue:

- Previous `$Args` child argument bug was fixed by replacing `$Args` with `$ChildArgs`.
- Static scan currently finds no `$Args` hits in current PlatformGate/runner/quarantine scripts.
- PowerShell parser checks timed out from Codex because local `powershell.exe` launches are unreliable; no parser error was returned.

## Historic Playback Failures Reported By Jason

- Big Buck Bunny: Plex Web `s1001 (Network)`.
- 12 Angry Men: wrong-title playback, 5 seconds of Big Buck Bunny.
- Night of the Living Dead: 30-second "torrent downloading from debrid" placeholder, then returned to menu.
- Sintel: placeholder/download message, then no visible playback progress.
- House MD: transcoder crash; later TV library worked after reboot.
- Star City episode 1: transcoder crash / Fire TV connection error; later TV library worked after reboot.
- Devil Wears Prada: movie library initially "content unavailable"; later worked after about 5 minutes; iOS HLS decision URL failure.
- City of God: Plex HLS decision URL failure.
- Frieren: `s1001` retry loop, then worked after about 5 minutes.

## Issues Solved So Far

- Real-Debrid subscription/token path was validated at different points.
- qBittorrent/Arr/Decypharr direction was inspected; Decypharr qBittorrent mock was found reachable in prior runs.
- rclone/WebDAV mount path was repaired enough for PlatformGate to run.
- ActiveGate reached passing state on a 65-row snapshot in prior runs.
- Same-snapshot bug was identified: VisibleCatalogQA was checking 66 rows while snapshot had 65.
- `$Args` child argument bug was identified and fixed.
- VisibleCatalogQA source failures were classified as source/release failures, not title-level failures.
- SourceQuarantine learned reason codes for `PLEX_HLS_TIMEOUT`, `PLEX_HLS_PROBE_FAILED`, and `RAW_STRM_VISIBLE`.
- Durable PlatformGate Runner became the single-owner runner with heartbeat/status files.
- Dashboard was patched to report actual `.strm` counts and AI usability facts instead of activity-only progress.
- 8805 was patched to expose JSON health, SSE streaming, Ollama streaming, tool traces, command queue, and persistent transcript.
- Transient source failures now get a dedicated retry queue rather than immediate destructive prune.

## Outstanding Issues / Suspected Root Causes

- User outcome count is still only one `.strm`; ScarFLIX is not delivered.
- PlatformGate still ends in `REVIEW`, so platform health is not stable.
- Controller/watchdog/sentinel/runner architecture became fragmented and repeatedly reported activity without producing user outcomes.
- Dashboard was previously misleading because "runner active" looked like progress.
- 8791 daily UI is Open WebUI, but 8805 tool traces and local worker execution are not integrated into that UI in a proven way.
- Long-job orchestration has weak acceptance boundaries: jobs run, stall, retry, and publish status, but do not converge on a verified canary outcome.
- Provider/WebDAV transient failures previously blocked platform health loops.
- The project attempted broad autonomy, swarm, self-evolution, and expansion before the basic product canaries were proven.
- PowerShell process launching from Codex has been unreliable; local scheduled tasks may still work, but inspection through Codex frequently timed out.
- No automated Plex-client-equivalent QA has yet been proven for Plex Web, iOS, Fire TV, and 5 concurrent streams as a release gate.
- Plex playback can appear to work after waiting 5 minutes, indicating some sources are being local-cached/prepared rather than delivering the desired immediate Stremio-like direct-stream experience.

## Requested Grok Output

Return a forensic peer-review report with these sections:

1. Executive verdict.
2. Reconstructed current as-built architecture.
3. Root-cause failure analysis.
4. Solved issues versus outstanding issues.
5. Corrected target architecture.
6. ScarFLIX delivery plan from current state to real Plex/Stremio-like MVP.
7. JasonOS Prime daily AI plan from current state to real private Grok/ChatGPT-like MVP.
8. Scheduler/controller/watchdog design that actually self-heals and escalates correctly.
9. Dashboard/status contract that cannot mislead Jason.
10. Exact acceptance tests and canaries.
11. Highest-risk assumptions.
12. Recommended next 10 implementation tasks in order.

Be concrete and critical. The goal is not reassurance; it is a plan that can produce the actual user outcomes.
