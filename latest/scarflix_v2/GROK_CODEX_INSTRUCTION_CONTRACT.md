# Grok-Codex Instruction Contract

Last updated: 2026-06-09 20:05 Australia/Sydney.

## Purpose

This contract turns Grok guidance into a machine-readable instruction stream that Codex can validate every 15 minutes without requiring Jason to paste handoffs manually.

ScarFLIX Mission 001 remains the priority. Legacy/direct resolver expansion stays paused. Materialized/WebDAV-backed playback remains the primary architecture.

## Files

- Schema: `schemas/grok_codex_instruction.schema.v1.json`
- Public instruction JSON: `D:\PlexTools\public\latest\scarflix_v2\GROK_INSTRUCTIONS_FOR_CODEX.json`
- Public instruction summary: `D:\PlexTools\public\latest\scarflix_v2\GROK_INSTRUCTIONS_FOR_CODEX.md`
- Bridge status: `D:\PlexTools\public\latest\scarflix_v2\jasonos_prime_grok_instruction_bridge_status.json`
- Consumer status: `D:\PlexTools\public\latest\scarflix_v2\jasonos_prime_codex_instruction_consumer_status.json`

## Required Instruction Fields

Every instruction must include:

- `instruction_id`
- `created_at`
- `expires_at`
- `target_component`
- `risk_level`
- `requires_user_decision`
- `approved_for_codex_execution`
- `success_criteria`
- `retry_policy`

## Codex Execution Rules

Codex may execute an instruction only when all of these are true:

- `approved_for_codex_execution` is `true`.
- `requires_user_decision` is `false`.
- `risk_level` is `low` or `medium`.
- `expires_at` is still in the future.
- `target_component` is on the allowlist.
- Every action is on the action allowlist.

Codex must skip and report, not execute, instructions that are high/critical risk, expired, missing required fields, require Jason, or are not explicitly approved.

## Safe Action Allowlist

Allowed action types:

- `status_only`
- `publish_status_summary`
- `start_detached_task`

Allowed detached tasks:

- `JasonOS_Prime_OutcomeDashboard`
- `JasonOS_Prime_PublicMirrorPublisher`
- `JasonOS_Prime_GrokInstructionBridge`
- `JasonOS_Prime_CodexInstructionConsumer`
- `JasonOS_Prime_FastTrackAccelerator`
- `ScarFLIX_v2_MaterializedCandidateStageOnly`
- `ScarFLIX_v2_MaterializedExpansionBatch`
- `ScarFLIX_v2_MaterializedPlexDecisionQA`
- `ScarFLIX_v2_MaterializedVisibilityCleanup`
- `ScarFLIX_v2_ConcurrentStreamQA`

Forbidden task/action classes:

- PlatformGate, VisibleCatalogQA, PlexClientDecisionQA, AutoGate, legacy DirectStrmMirror, legacy StagedCandidatePublisher, SafeWebDavExpansion, SF2_Autopilot.
- Any direct/legacy resolver expansion enablement.
- Any destructive delete, credential exposure, or repo privacy change without the authenticated bridge path and explicit approval.

## Current Implementation

- `JasonOS_Prime_GrokInstructionBridge` runs every 15 minutes through a hidden `wscript.exe` wrapper.
- `JasonOS_Prime_CodexInstructionConsumer` runs every 15 minutes through a hidden `wscript.exe` wrapper.
- With no Grok/xAI token in `C:\Users\jason\OneDrive\Public\TOKENS`, the bridge writes a schema-valid, non-executable local-only fallback instruction.
- When a Grok/xAI token exists, the bridge asks Grok to return a JSON-only `grok_codex_instruction.v1` envelope and writes it to the public mirror path.
- The consumer validates every envelope and executes only safe, approved, unexpired, allowlisted detached actions.

## Example Safe Instruction

```json
{
  "instruction_id": "grok-20260609-status-refresh",
  "created_at": "2026-06-09T10:05:00Z",
  "expires_at": "2026-06-09T11:05:00Z",
  "target_component": "status_dashboard",
  "risk_level": "low",
  "requires_user_decision": false,
  "approved_for_codex_execution": true,
  "actions": [
    {
      "action_type": "start_detached_task",
      "task_name": "JasonOS_Prime_OutcomeDashboard",
      "reason": "Refresh public status after a verified ScarFLIX batch."
    }
  ],
  "success_criteria": [
    "Dashboard status JSON updates.",
    "Public mirror publisher is triggered separately."
  ],
  "retry_policy": {
    "max_attempts": 1,
    "backoff_seconds": 900,
    "escalate_after_attempts": 1,
    "escalation_target": "grok_handoff"
  }
}
```

## 2026-06-09 Token Integration Update

Bridge mode is explicit:

- `REAL_API`: a usable Grok/xAI token was found, the API call succeeded, and Grok returned valid `grok_codex_instruction.v1` JSON.
- `LOCAL_FALLBACK`: no usable token was found, the API call failed, or the response was not valid v1 JSON. Fallback instructions are non-executable unless explicitly approved by a real Grok response.

Token detection order:

1. `GROK_API_KEY.txt`
2. `XAI_API_KEY.txt`
3. `xai.key`
4. `grok_token.txt`

The bridge also keeps older lowercase/compatibility names after those four preferred names.
# 2026-06-09 21:20 Australia/Sydney - v2 Bridge/Consumer Extension

The v1 envelope remains canonical, but it now explicitly supports richer planner output:

- `instructions`: strict executable instruction candidates.
- `strategy_recommendations`: high-level ScarFLIX expansion strategy and planning guidance.
- `autonomy_suggestions`: loop/process improvement suggestions.
- `quality_metrics`: bridge-side instruction quality, generated/executable counts, and validation status.

Codex execution remains intentionally narrow. The consumer may execute only approved, non-expired, low/medium-risk, allowlisted actions. It may write status/strategy notes or queue detached-task requests for local worker review. It must not run PlatformGate, VisibleCatalogQA, PlexDecisionQA, ConcurrentQA, AutoGate, publishers, or full catalogue checks inline, and it must not re-enable legacy/direct resolver expansion.
