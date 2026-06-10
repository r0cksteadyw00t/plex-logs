# Section 5 Fresh Baseline + Current Missing Correlation

- Updated UTC: 2026-06-10T23:16:15.710Z
- Status: `PASS_FRESH_BASELINE_CORRELATION_COMPLETE`
- Current baseline: 95/105 visible (90.5%)
- Current missing: 10
- Plex exact rows among current missing: 3/10
- DB rows among current missing: 3/10
- Log matches: 62

## Recommendation

Controlled expansion of the currently visible 95 hashes is reasonable only behind a verification gate: rerun focused Section 5 QA against visible-only hashes, require high pass rate and zero publication side effects, keep the 10 missing hashes held/retryable, and leave PAUSE_PUBLICATION active until the gate is explicitly passed. Waiting one more natural drift cycle may reduce residual misses further and is lower risk; proceeding visible-only is moderate risk but bounded if the gate is enforced.

No refresh, cache clear, publication, expansion, cleanup, deletion, source mutation, or path rewrite was performed.