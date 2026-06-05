# JasonOS Foundry Architecture Snapshot

Generated: 2026-06-05 11:39:25

## Platform model
JasonOS Foundry is a local-first, mission-based autonomous operations platform. ScarFLIX is Mission 001.

## Control split
- ChatGPT: planner, architect, reviewer, status interpreter.
- Foundry: control plane, task queue, dashboards, guardrails, reusable services.
- ScarFLIX: media workflow source of truth.
- Aider/Ollama: local implementation engine.
- GitHub: source control and telemetry publication.

## Enabled now
- Low-risk local AI implementation lane.
- Backlog/memory/runbook scaffolds.
- Architecture and technical-debt reporting.

## Locked now
- Media logic.
- Catalogue expansion.
- Plex library mutation.
