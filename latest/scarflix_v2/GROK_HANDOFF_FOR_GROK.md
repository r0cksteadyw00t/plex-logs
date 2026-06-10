# FORENSIC HANDOFF FOR GROK

**Updated UTC:** 2026-06-10T00:08:00Z

## Trigger Reason

Phase 2 task ownership cleanup diagnostic completed. The goal was to explain why Batch 1/2 task pauses did not persist, run the Orchestrator reduction script in dry-run mode only, and define the migration plan into Orchestrator-owned scheduling without disabling more tasks or starting ScarFLIX work.

## Current State Summary

- Orchestrator service: `Running`
- Orchestrator `/healthz`: HTTP `200`, status `PASS`
- Echo safety check: `5/5` PASS, elapsed `69ms`, `33ms`, `13ms`, `14ms`, `14ms`
- Sentinel: `PASS/LOW`
- `codex_action_required=false`
- `jason_action_required=false`
- Materialized all-visible QA: `REVIEW 119/229`
- Materialized failures: `110`
- Playback decision QA: `FAIL`
- ScarFLIX expansion eligibility: `false`
- Legacy/direct resolver expansion: paused/blocked

## Re-Enabled Task Findings

The following Batch 1/2 tasks returned to `Ready`:

- `JasonOS_Prime_PredictiveSimulator`
- `JasonOS_Prime_SelfEvolutionCycle`
- `JasonOS_Prime_PublicMirrorPublisher`
- `JasonOS_Prime_CommandCentre_8791_Keepalive`
- `JasonOS_Prime_Real_AI_8805_Keepalive`
- `JasonOS_Prime_FastTrackAccelerator`

The following stayed `Disabled`:

- `JasonOS_Prime_GrokInstructionBridge`
- `JasonOS_Prime_CodexInstructionConsumer`
- `JasonOS_Prime_Grok_PeerReviewBridge`
- `JasonOS_Prime_GrokBuild_ForensicAgent`

## Root Cause

The re-enablement is caused by existing local recovery/hygiene automation:

1. `D:\PlexTools\Foundry\workers\JasonOS_Prime_WorkerMesh.js`
   - `ensureScheduledTasks()` re-creates/enables `JasonOS_Prime_PredictiveSimulator` and `JasonOS_Prime_SelfEvolutionCycle`.
   - `ensureJasonOSPrimeTasks()` re-creates/enables `PredictiveSimulator`, `SelfEvolutionCycle`, `PublicMirrorPublisher`, `OutcomeDashboard`, `FastTrackAccelerator`, and `CommandCentre_8791_Keepalive`.
   - `superviseScarflix()` runs predictive, self-evolution, outcome dashboard, and public mirror tasks.

2. `D:\PlexTools\Scripts\scarflix_v2\JasonOS_Prime_QuietTasks_InstallOrUpdate.ps1`
   - Defines/upserts FastTrack, PublicMirrorPublisher, 8805 keepalive, 8791 keepalive, PredictiveSimulator, SelfEvolutionCycle, Grok bridge/consumer, peer/build tasks, and other short workers.
   - With `-StartShortWorkers`, explicitly starts many of those tasks.

This means ad hoc task disabling is not durable until WorkerMesh/QuietTasks are patched to respect Orchestrator ownership.

## Dry-Run Reduction Result

Ran:

```powershell
powershell.exe -NoProfile -ExecutionPolicy Bypass -File "D:\PlexTools\Scripts\scarflix_v2\JasonOS_Prime_Orchestrator_ReduceScheduledTasks.ps1"
```

Result:

- Exit code: `0`
- Status: `DRY_RUN`
- Apply: `false`
- Orchestrator health URL: `http://127.0.0.1:8815/healthz`

Rows:

- `JasonOS_Prime_GrokInstructionBridge`: exists, state `Disabled`, action `WOULD_DISABLE`
- `JasonOS_Prime_CodexInstructionConsumer`: exists, state `Disabled`, action `WOULD_DISABLE`
- `JasonOS_Prime_CommandCenterDashboard`: missing, action `NOOP_MISSING`
- `JasonOS_Prime_CommandCenterStaticServer`: missing, action `NOOP_MISSING`

Gap:

- The script does not currently include the six re-enabled workers.
- It has `JasonOS_Prime_Real_AI_8805_Keepalive` in the `never_disable` list, so AI keepalive must be migrated to an Orchestrator status-only job before the standalone task can be retired.

## Proposed Migration Plan

1. `JasonOS_Prime_PublicMirrorPublisher`
   - Replace with existing Orchestrator `sync_public_status`
   - Queue: `io`
   - Cadence: `900s`
   - Migration first because mirror churn is non-core and already represented in Orchestrator

2. `JasonOS_Prime_PredictiveSimulator`
   - New Orchestrator job: `run_predictive_simulator`
   - Queue: `control`
   - Cadence: `3600s` or on-demand
   - Guard: skip while Sentinel degraded or materialized QA unstable

3. `JasonOS_Prime_SelfEvolutionCycle`
   - New Orchestrator job: `run_self_evolution`
   - Queue: `control`
   - Cadence: `86400s`
   - Guard: planner/report only, no task mutation

4. `JasonOS_Prime_CommandCentre_8791_Keepalive` and `JasonOS_Prime_Real_AI_8805_Keepalive`
   - New Orchestrator job: `ai_keepalive_check`
   - Queue: `control`
   - Cadence: `900s`
   - Guard: status-only during Phase 2; no service churn without approval

5. `JasonOS_Prime_FastTrackAccelerator`
   - New Orchestrator job: `evaluate_fasttrack_gate`
   - Queue: `control`
   - Cadence: `900s`
   - Guard: never starts expansion unless materialized QA and concurrent QA are PASS
   - Migrate last because it can trigger ScarFLIX work

## Proposed Next Steps

1. Patch WorkerMesh so it does not recreate/enable/run tasks that are marked as Orchestrator-owned.
2. Patch QuietTasks install/update so Orchestrator-owned tasks are excluded or left disabled unless explicitly requested.
3. Expand `JasonOS_Prime_Orchestrator_ReduceScheduledTasks.ps1` dry-run candidate list to include the six re-enabled workers with guards.
4. Implement Orchestrator job handlers for mirror, predictive, self-evolution, AI keepalive status, and FastTrack gate evaluation.
5. Rerun dry-run reduction only.
6. Apply task reduction only after dry-run shows the correct target set and Orchestrator health remains PASS.
7. Keep ScarFLIX expansion blocked until materialized all-visible QA recovers from `REVIEW 119/229`.

## Data/Files To Review

- `D:\PlexTools\Foundry\workers\JasonOS_Prime_WorkerMesh.js`
- `D:\PlexTools\Scripts\scarflix_v2\JasonOS_Prime_QuietTasks_InstallOrUpdate.ps1`
- `D:\PlexTools\Scripts\scarflix_v2\JasonOS_Prime_Orchestrator_ReduceScheduledTasks.ps1`
- `D:\PlexTools\public\latest\scarflix_v2\jasonos_prime_orchestrator_task_reduction_status.json`
- `D:\PlexTools\Foundry\orchestrator\JasonOS_Prime_Orchestrator.js`
- `D:\PlexTools\public\latest\scarflix_v2\jasonos_prime_orchestrator_status.md`
- `C:\Users\jason\OneDrive\Documents\Plex Project\TASKS.md`
- `C:\Users\jason\OneDrive\Documents\Plex Project\PROJECT_PLAN.md`
