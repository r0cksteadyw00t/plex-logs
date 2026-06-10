# Section 5 Fresh Baseline + Current Missing Correlation

- Updated UTC: 2026-06-10T23:31:54.684Z
- Status: `PASS_FRESH_BASELINE_CORRELATION_COMPLETE`
- Current baseline: 83/105 visible (79%)
- Current missing: 22
- Plex exact rows among current missing: 0/22
- DB rows among current missing: 0/22
- Log matches: 160

## Recommendation

Controlled expansion of the currently visible 83 hashes is reasonable only behind a verification gate: rerun focused Section 5 QA against visible-only hashes, require high pass rate and zero publication side effects, keep the 22 missing hashes held/retryable, and leave PAUSE_PUBLICATION active until the gate is explicitly passed. Waiting one more natural drift cycle may reduce residual misses further and is lower risk; proceeding visible-only is moderate risk but bounded if the gate is enforced.

No refresh, cache clear, publication, expansion, cleanup, deletion, source mutation, or path rewrite was performed.