# JasonOS Foundry Max Baseline

Status: authoritative compact baseline for ScarFLIX Mission 001.

JasonOS Foundry Max is the target free/local first agent platform. ScarFLIX is Mission 001.

Mission: deliver a Plex front end, Stremio like ScarFLIX experience that can request media, find candidate sources, expose compatible playable items in Plex, remember source reliability, publish phone first status, and continue work without Jason repeatedly driving the loop.

Owner posture: maximum autonomy accepted. Project progress is prioritised. Stop only for genuine blocker, missing credential, external login requirement, irrecoverable loop, or explicit owner decision.

Target planes:

1. Mission Control
2. Agent Mesh
3. Execution Fabric
4. Model Fabric
5. GitHub Control Plane
6. Memory Plane
7. Recovery and Verification

Execution baseline:

- MEDIASERVER is the execution fabric.
- GitHub is the control plane.
- GitHub self hosted runner is the primary execution spine.
- D:\PlexTools\Foundry\ScarFLIX_Foundry_Worker.ps1 is the local worker.
- SF2_Autopilot is a watchdog, not the final engine.
- SF2_ClosedLoopSupervisor is transitional.

Agent baseline:

- Mission Controller
- Planner Agent
- Code Agent
- Ops Agent
- QA Agent
- Source Reliability Agent
- Catalogue Agent
- Dashboard Agent
- Memory Agent
- Recovery Agent
- Release Agent

Model baseline:

- deterministic local rules first
- Ollama local models
- OpenHands primary Codex like layer
- Aider or OpenCode fallback
- optional free external tools where available
- paid token services only when explicitly enabled

ScarFLIX baseline rules:

- bad source is not a bad title
- source level handling before title level rejection
- transient provider, WebDAV, Plex, HLS and probe failures are review or retry unless proven permanent
- English first curation
- phone dashboard must fit one screen
- results must be published to GitHub telemetry

Current mission sequence:

1. confirm Foundry worker runs on MEDIASERVER
2. confirm GitHub runner runs on MEDIASERVER
3. publish Foundry diagnostics
4. repair command handoff
5. patch QA policy
6. restore PlatformGate safely
7. implement source level handling
8. build phone dashboard
9. activate local agent layer
10. expand catalogue under English first curation

Authoritative instruction: do not downscope to a simple script runner. Use Foundry architecture as the baseline unless Jason explicitly supersedes it.
