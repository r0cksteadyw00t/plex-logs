# Voice Interface Layer Design

Generated: 2026-06-05 11:56:32

## Purpose
Future hands-free command path for JasonOS Foundry from phone or local desktop.

## Candidate commands
- Check ScarFLIX.
- Show dashboard.
- Continue safe buildout.
- Generate backlog.
- Run dry-run only.
- Prepare promotion gate.

## Architecture
Voice input should translate to GitHub queue/task files or local Foundry command files, not direct live production mutation.
