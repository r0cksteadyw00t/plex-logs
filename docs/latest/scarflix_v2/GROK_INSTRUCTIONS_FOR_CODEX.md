# Grok Instructions For Codex

Schema: `grok_codex_instruction.v1`
Updated UTC: 2026-06-28T06:57:50Z
Source: local_status_fallback

## Summary

GROK_API_KEY.txt did not produce a valid Grok response; bridge wrote a non-executable local fallback.

## Validation

PASS

## Instructions

### local-only-no-token-20260628065750

- Target: `grok_codex_bridge`
- Risk: `low`
- Requires user decision: `false`
- Approved for Codex execution: `false`
- Expires: `2026-06-28T07:57:50Z`
- Summary: No Grok/xAI token is available. Codex must not execute this as a Grok-approved instruction.
