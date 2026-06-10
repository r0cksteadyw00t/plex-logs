# Grok Instructions For Codex

Schema: `grok_codex_instruction.v1`
Updated UTC: 2026-06-10T00:39:34Z
Source: local_status_fallback

## Summary

Grok/xAI token file exists but is empty or invalid length; bridge wrote a non-executable local fallback.

## Validation

PASS

## Instructions

### local-only-no-token-20260610003934

- Target: `grok_codex_bridge`
- Risk: `low`
- Requires user decision: `false`
- Approved for Codex execution: `false`
- Expires: `2026-06-10T01:39:34Z`
- Summary: No Grok/xAI token is available. Codex must not execute this as a Grok-approved instruction.
