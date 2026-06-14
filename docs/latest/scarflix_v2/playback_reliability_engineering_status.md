# Playback Reliability Engineering Status

## Current Update - 2026-06-14T05:54:33Z

**Status:** ACTUAL_DELIVERY_CONTINUES_SOURCE_BACKLOG_TRACKED  
**Publication allowed:** false  
**Broad expansion allowed:** false  
**PAUSE_PUBLICATION:** must remain active

Latest evidence:

- Extended delivery runner cycle 147.
- Launch health 20 ms; post-QA launch check 26 ms; Sentinel PASS / LOW; Plex identity healthy (HTTP 200); active sessions were 0.
- Bounded Materialized QA skip 65, limit 4: 3/4 PASS, 1 REVIEW.
- Passed titles: Night at the Museum; 9½ Weeks; Ninja Assassin.
- Review title: Nacho Libre (Layered streaming validation blocked Plex decision: webdav_head_upstream_server_error).
- Retry ledger: tracked 18, held 0, threshold 3. Latest tracked source is Nacho Libre at failure count 2/3; held remains 0.

Current gate:

- Source retry backlog remains below hold threshold. Publication and expansion remain blocked until the delivery gate explicitly passes.

