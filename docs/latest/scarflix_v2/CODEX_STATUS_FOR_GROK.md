# Codex Status For Grok

- Updated UTC: 2026-06-10T07:02:00Z
- Operating model: `TRUE_HANDS_OFF_ACTIVE_PERMANENT`.
- Primary operator: `JasonOS_Prime_Orchestrator`.
- Orchestrator health: PASS.
- Sentinel: PASS/LOW.
- Publication: held; `PAUSE_PUBLICATION=true`.
- Legacy/direct resolver expansion: disabled.
- Materialized QA: REVIEW 119/229, failed 110.
- Active incident: `INC-MQA-HYBRID-MOVIES-LIVE-TIMEOUT-20260610`.
- Corrected timing probe: `PASS_TINY_TIMING_PROBE_COMPLETE`.
- PMS note: first Plex metadata failure was explained by Plex Media Server being down; PMS is now reachable.
- Corrected sample result: service context inaccessible `8/8`, user context OK `8/8`, WebDAV HEAD `7/8` 2xx and `0` timeouts, Plex metadata `8/8` 2xx and `0` timeouts, Plex metadata matching `ScarFLIX_part-*` paths `0/8`.
- Leading hypothesis: Plex metadata/path visibility or indexing/cache mismatch, not missing files and not current raw WebDAV timeout.
- Worker patch: `JasonOS_Prime_MaterializedQaDecisionTimingProbe.js` now uses Plex base fallback so `127.0.0.1` library API 401 does not mask LAN API success.
- Grok/report jobs queued after corrected evidence: `autonomous_incident_manager`, `generate_grok_cycle_report`, `deliver_grok_cycle_report`, `sync_public_status`.
- No publication, expansion, cleanup, deletion, path rewrite, source mutation, broad QA retry, PlatformGate, PlexDecisionQA, ConcurrentQA, AutoGate, or publisher job was run.
- Next safe action: same-sample, read-only Plex metadata path comparison against `webdav_map.json`; keep publication held until Materialized QA recovers or a reviewed mitigation plan is accepted.
