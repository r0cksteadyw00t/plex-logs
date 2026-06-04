# ScarFLIX Foundry Agent Roles

## Mission Controller
Owns mission state, next-action selection, stop conditions and escalation.

## Code Agent
Edits scripts, proposes patches, runs syntax checks and prepares commits.

## Ops Agent
Controls safe local operations, tasks, Docker/Plex checks and quiesce actions.

## QA Agent
Runs dry-runs, smoke tests, playback/probe checks, and regression checks.

## Catalogue Curator
Applies English-first curation and excludes low-value/non-compatible items.

## Source Reliability Agent
Maintains candidate-source memory, provider health and source quarantine state.

## Release Agent
Commits outputs, publishes telemetry, updates dashboard and writes issue/PR comments.

## Safety Agent
Blocks destructive actions, redacts logs, enforces guardrails and triggers rollback.

## Escalation Rule
Escalate to Jason only when a stop state is reached or when a required external decision exists.
