# ScarFLIX Canary

Updated UTC: 2026-06-07T09:56:08.314Z
Status: STAGING_CANDIDATES
Milestone: CANARY_STAGING_STARTED
PlatformGate: REVIEW
Actual .strm: movies=1, tv=0, total=1
Staged candidates: 3
Baseline .strm: movies=1, tv=0, total=1
New .strm since canary start: 0
Pipeline PID: 
Next action: Stage-only candidate generation started; candidates remain outside Plex visibility.

Policy:
- This is a controlled canary, not broad catalogue expansion.
- It uses the existing safe WebDAV expansion pipeline.
- It does not treat PlatformGate row counts as delivered catalogue.
- Actual user outcome is new .strm output plus Plex client playback verification.