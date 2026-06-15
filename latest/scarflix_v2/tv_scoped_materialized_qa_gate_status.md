# TV-Scoped Materialized QA Gate

Updated UTC: 2026-06-15T04:39:05Z
Status: PASS_TV_SCOPE_MATERIALIZED_QA
Basis: Derived from latest full Materialized QA artifact; no new heavy QA job was run.

Full Materialized QA: REVIEW, checked 117/229, passed 117, failed 0
TV checked/pass/fail/missing: 4/4/0/0
Movie targets missing in Plex DB: 112

Interpretation: Current tested TV materialized rows passed Plex decision plus WebDAV/range validation; full QA REVIEW is caused by movie-only Plex DB visibility gaps.
Expansion policy: TV-first source/staging planning may proceed; Plex-visible TV publication still requires protected runner and post-wave verification.

Next safe action: Prepare protected TV-first execution batches from the active/returning 2026 whole-show wave; keep movie remediation separate.
