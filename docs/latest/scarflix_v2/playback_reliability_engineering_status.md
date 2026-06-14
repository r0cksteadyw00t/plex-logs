# Playback Reliability Engineering Status

## Current Update - 2026-06-14T05:40:42Z

**Status:** ACTUAL_DELIVERY_CONTINUES_SOURCE_BACKLOG_TRACKED  
**Publication allowed:** false  
**Broad expansion allowed:** false  
**PAUSE_PUBLICATION:** must remain active

Latest evidence:

- Extended delivery runner cycle 145.
- Launch health 23 ms; post-QA launch check 24 ms; Sentinel PASS / LOW; Plex identity healthy (HTTP 200); active sessions were 0.
- Bounded Materialized QA skip 57, limit 5: 1/4 PASS, 3 REVIEW.
- Passed title: Man on Fire.
- Review titles: Maleficent: Mistress of Evil (timeout); Million Dollar Baby (timeout); Ladybug & Cat Noir Awakening (timeout).
- Retry ledger: tracked 18, held 0, threshold 3. Current review sources are below hold threshold: Maleficent: Mistress of Evil 2/3; Million Dollar Baby 1/3; Ladybug & Cat Noir Awakening 1/3; held remains 0.

Current gate:

- Source retry backlog remains below hold threshold. Publication and expansion remain blocked until the delivery gate explicitly passes.

