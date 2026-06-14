# Playback Reliability Engineering Status

## Current Update - 2026-06-14T02:29:38Z

**Status:** ACTUAL_DELIVERY_BOUNDED_QA_CLEAN_PASS_CONTINUES  
**Publication allowed:** false  
**Broad expansion allowed:** false  
**PAUSE_PUBLICATION:** must remain active

Latest evidence:

- Extended delivery runner cycle 118.
- Launch health 32 ms; post-QA launch check 21 ms; Sentinel PASS / LOW; active Plex sessions 0; Plex identity healthy (HTTP 200).
- Bounded Materialized QA skip 94, limit 5: 5/5 PASS, 0 failed.
- Passed titles: The Big Short; The Boy and the Heron; The Boy in the Striped Pyjamas; The Cabin in the Woods; The Count of Monte Cristo.
- Retry ledger: tracked 16, held 0, threshold 3.

Current gate:

- Positive cycle. Publication and expansion remain blocked until the delivery gate explicitly passes.

