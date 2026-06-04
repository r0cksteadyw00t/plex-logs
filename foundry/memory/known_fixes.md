# JasonOS Foundry Known Fixes

## Runner false positive
Issue: watchdog matched unrelated run.cmd process.
Fix: match Runner.Listener, Runner.Worker, or D:\PlexTools\actions-runner path.

## Static dashboard progress
Issue: progress/ETA was static and did not reflect phase advancement.
Fix: phase closure logic added and Phase 3 readiness introduced.
