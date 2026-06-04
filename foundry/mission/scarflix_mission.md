# ScarFLIX Mission 001

## Mission
Deliver a Plex-front-end, Stremio-like ScarFLIX experience using a local autonomous Foundry stack.

## Definition of Done
1. Plex visible catalogue is stable and playable.
2. Source failures quarantine the source or release, not the whole title.
3. Transient WebDAV, Real-Debrid, provider, Plex and HLS probe failures are classified as retry or review, not permanent title failure.
4. English-first curation is enforced.
5. Dashboard fits on one phone screen and clearly states whether Jason is required.
6. Agent loop can observe, act, verify and publish results without Jason pressing 1.
7. Escalation occurs only for genuine external blockers or high-risk decisions.

## Operating Principle
Do not run scripts as the main experience. Run the mission.