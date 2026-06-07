# Grok Forensic Partner Operating Contract

JasonOS Prime / ScarFLIX v2 uses Grok as the ongoing Forensic Investigator, Technical Architect, and QA Partner.

## Scope

- Preserve the full JasonOS Prime ambition.
- ScarFLIX Mission 001 remains the primary proving ground.
- Treat current delivery as failed until verified user outcomes exist:
  - usable daily AI at 8791/8805,
  - ScarFLIX playable in Plex,
  - truthful live dashboard,
  - local autonomy that progresses without repeated Codex prompting.

## Codex Operating Rule

Before meaningful JasonOS Prime / ScarFLIX engineering work, Codex should read this file or the public mirror copy:

`https://raw.githubusercontent.com/r0cksteadyw00t/plex-logs/main/latest/scarflix_v2/GROK_FORENSIC_PARTNER.md`

Codex should use Grok review as a forensic architecture checkpoint when repeated loops, unclear root causes, or major architecture decisions appear.

## Mandatory Handoff Triggers

Codex must prepare a clearly marked Grok handoff when any of these occur:

1. Repeated failure or stall more than twice.
2. No meaningful progress on major outcomes for 30-60 minutes of real work.
3. A loop or repeating pattern is detected.
4. Root cause or architecture direction is unclear.
5. Watchdog, Sentinel, or Durable Runner reports repeated issues.

Do not make major architectural changes after a handoff until Grok has reviewed it. Simple low-risk fixes are allowed.

## Handoff Format

```markdown
### FORENSIC HANDOFF FOR GROK

**Trigger Reason:** [e.g. Repeated PlatformGate REVIEW loop, slow/no expansion progress, unclear root cause]

**Current State Summary:**
- Durable PlatformGate Runner: owner PID, child PID, heartbeat age, current step, last progress UTC
- Actual .strm counts right now (Movies / TV)
- Dashboard / milestone status
- Any recent errors, loops, or drift observed

**What I have already tried:**
- [list key attempts and patches]

**My current hypothesis on root cause:**
- [best analysis]

**Proposed next steps (for Grok review):**
1.
2.
3.

**Data / logs / files I recommend Grok reviews:**
- [specific files or outputs]
```

## Current Known Evidence Links

- Current forensic snapshot: `https://raw.githubusercontent.com/r0cksteadyw00t/plex-logs/main/latest/scarflix_v2/current_forensic_state_after_patch_20260607.json`
- Dashboard JSON: `https://raw.githubusercontent.com/r0cksteadyw00t/plex-logs/main/latest/scarflix_v2/jasonos_prime_outcome_dashboard.json`
- PlatformGate checkpoint: `https://raw.githubusercontent.com/r0cksteadyw00t/plex-logs/main/latest/scarflix_v2/platform_gate_checkpoint.json`
- Canary status: `https://raw.githubusercontent.com/r0cksteadyw00t/plex-logs/main/latest/scarflix_v2/scarflix_canary_status.json`
- As-built forensic doc: `https://raw.githubusercontent.com/r0cksteadyw00t/plex-logs/main/latest/scarflix_v2/jasonos_scarflix_as_built_forensic_20260607.md`
