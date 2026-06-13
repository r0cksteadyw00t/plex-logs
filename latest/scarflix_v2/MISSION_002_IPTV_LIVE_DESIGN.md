# Mission 002 - IPTV Live Plex Feed Design

Last updated: 2026-06-13 12:46 Australia/Sydney.

## Objective

Build a Plex-first IPTV Live lane that generates clean, stable Plex-compatible outputs:

- `master.m3u`
- `master.xml`
- decision and trace manifests

The target user experience is simple: Australian free-to-air and sports channels appear cleanly in Plex, with the best currently known stream first in each Plex channel group. Jason should not need to manage source churn manually.

## Grok Pressure-Test Decisions Incorporated

- Plex remains the product and playback front end. Middleware exists only to improve Plex behavior.
- Do not promise true seamless mid-stream failover inside Plex. Plex does not provide reliable in-player automatic fallback between stream variants.
- The system should instead recover quickly by regenerating Plex-safe source order and keeping the best stream at the top of the channel group.
- Explicit Command Centre feedback is Phase 0. Plex implicit feedback is weak and should not be treated as the main learning signal.
- Channel mapping and `tvg-id` reconciliation are foundational, not polish.
- The first implementation must be simple: source ingestion, validation, mapping, generator, basic optimizer, and traceability.
- Reflector/self-improvement may produce analysis and proposals only. It must not auto-modify code or publication state in early phases.
- Incremental regeneration and caching are required before large live lineups.

## Phase 0 Scope

Priority channels:

- Australian free-to-air baseline.
- Channel 7 and related 7 channels.
- AFL-focused sports coverage where available.

Required outputs:

- Plex-compatible M3U with stable channel identity.
- XMLTV output with reliable `tvg-id` mapping.
- Decision manifest explaining source choice, score, and fallback ordering.
- Command Centre feedback commands.

Non-goals for Phase 0:

- No multi-agent swarm.
- No automatic code rewriting.
- No broad provider purchase or paid-plan action without Jason approval.
- No publication into Plex unless generated outputs pass validation.

## Core Components

### IPTV Source Manager

Aggregates M3U and XMLTV sources and stores source instances with provenance.

Initial source classes:

- Public/free sources such as iptv-org.
- User-provided commercial sources only when credentials and licensing are explicit.

### Validator

Performs bounded stream checks and records reachability, startup latency, short-window stability, resolution/codec where available, and HTTP/playlist errors.

### Channel Mapping Service

Maintains canonical channel IDs and override-friendly mapping:

- Canonical channel identity.
- Display name.
- Region.
- Plex group.
- `tvg-id`.
- XMLTV source.
- Explicit manual overrides.

### Optimizer

Starts rule/statistical, not ML-heavy:

`score = availability * 0.35 + stability * 0.30 + quality * 0.20 + historical * 0.15`

During AFL/event windows, raise stability weighting before raw quality.

### Generator

Produces:

- `master.m3u`
- `master.xml`
- `iptv_generation_run.json`
- `iptv_decision_manifest.json`

Generator must support incremental rebuilds so unchanged channels are not regenerated unnecessarily.

### Guardian

Blocks bad output before Plex sees it:

- Empty M3U/XMLTV.
- Missing required channels.
- Broken `tvg-id` references.
- Duplicate canonical channels without explicit reason.
- Adult/porn/ad spam.
- Excessive unstable streams.

### Command Centre Feedback

Minimum commands:

- `iptv status`
- `iptv regenerate`
- `iptv feedback bad <channel>`
- `iptv explain <channel>`
- `iptv mapping override <canonical_id> <new_tvg_id>`

## Suggested Data Model

SQLite tables:

- `iptv_channel_mappings`
- `iptv_source_instances`
- `iptv_health_reports`
- `iptv_decisions`
- `iptv_explicit_feedback`
- `iptv_improvement_proposals`
- `iptv_generation_runs`

Key records:

- `PlexChannel`
- `PlexPlaylistVariant`
- `StreamHealthReport`
- `IptvDecision`
- `ChannelMapping`

## Directory Plan

Initial implementation should live beside JasonOS but stay separate from ScarFLIX publication paths:

```text
jasonos/iptv/
  models/
  core/
  mapping/
  telemetry/
  feedback/
  scripts/
  status/
shared/
command_centre/
```

Do not reuse ScarFLIX Materialized QA state files for IPTV. IPTV should have its own status, manifests, and rollback notes.

## Safety Model

- IPTV generation must not modify ScarFLIX sources, `webdav_map.json`, Path 2 aliases, or `PAUSE_PUBLICATION`.
- Generated IPTV outputs are held until validator and Guardian status are PASS.
- Explicit feedback can lower a stream score or hold a variant, but destructive deletion requires review.
- Paid provider setup, credential changes, and major source strategy changes require Jason approval.

## Current Recommended Next Step

Create the Phase 0 scaffold and read-only source/mapping model only after ScarFLIX Plex availability is guarded and the current Section 5 baseline is trustworthy. The first coding target should be `iptv_channel_mappings` plus a small static Channel 7/AFL mapping seed, not live provider ingestion.
