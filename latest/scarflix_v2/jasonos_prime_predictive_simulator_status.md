# JasonOS Prime Predictive Simulator

Status: REVIEW
Updated UTC: 2026-06-08T03:47:01.933Z
Expansion eligible: false
Visible count: 8 movies=2 tv=6
Pending candidates: 0
Rejected sources: 1128

## Gate
- checkpoint: PASS
- platform: PASS
- active gate: PASS
- visible QA: PASS
- candidate model: REVIEW
- rclone: PASS

## Simulations
- gate_first_hold: continue_detached_gate_or_repair_systemic_failure
- controlled_small_batch: blocked_until_gate_pass
- provider_retry_backoff: retry_transient_sources_later
- candidate_pool_growth: stage_candidates_without_publishing_after_gate_status_known