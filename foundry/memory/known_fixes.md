# JasonOS Foundry Known Fixes

## Dashboard reverting
Cause: recurring Run-FoundryCycle.ps1 republished older phase templates.
Fix: recurring cycle must read/preserve latest phase state and not hardcode older phase output.

## Static ETA
Cause: placeholder progress values were static.
Fix: show phase states and confidence-based ETA; do not fake countdowns.

## AiderExit
Cause: Aider command path/interactive behaviour was unstable.
Fix: use no-redirect probe and direct local Ollama fallback if Aider CLI fails.

## Runner false positive
Cause: watchdog matched unrelated run.cmd.
Fix: match Runner.Listener, Runner.Worker, or explicit D:\PlexTools\actions-runner path.
