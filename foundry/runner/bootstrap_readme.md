# ScarFLIX Foundry Bootstrap

This repo is now prepared for a free/local Codex-style execution layer.

Local machine role: MEDIASERVER.

Required resident layer:
- GitHub Actions self-hosted runner with labels: self-hosted, Windows, X64, scarflix, foundry
- Local script: D:\PlexTools\Foundry\Run-FoundryCycle.ps1
- Optional next layer: Ollama + OpenHands/Aider/OpenCode

Current behaviour:
- Workflow runs every 15 minutes on the self-hosted runner.
- Workflow executes the local Foundry cycle.
- Local cycle publishes status, dashboard and event log to plex-logs.

Safety:
- No catalogue expansion.
- No destructive Plex/media actions.
- Existing SF2 Autopilot remains watchdog only.