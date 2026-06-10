# Materialized QA Incident Hypothesis Ledger

- Updated UTC: 2026-06-10T23:31:54.684Z
- Current status: `PASS_FRESH_BASELINE_CORRELATION_COMPLETE`
- Current hypothesis: The affected Section 5 set is still naturally converging: current visibility improved to 83/105. The remaining 22 items remain absent from exact Plex metadata/API rows in this bounded check, and Plex DB rows mirror that absence for the probed hash/title terms.
- Recommendation: Controlled expansion of the currently visible 83 hashes is reasonable only behind a verification gate: rerun focused Section 5 QA against visible-only hashes, require high pass rate and zero publication side effects, keep the 22 missing hashes held/retryable, and leave PAUSE_PUBLICATION active until the gate is explicitly passed. Waiting one more natural drift cycle may reduce residual misses further and is lower risk; proceeding visible-only is moderate risk but bounded if the gate is enforced.

No refresh, cache clear, publication, expansion, cleanup, deletion, source mutation, or path rewrite was performed.