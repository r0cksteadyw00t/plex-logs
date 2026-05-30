# ScarFLIX v2 Status

Last refresh UTC: 2026-05-30T11:40:24Z

## Overall
- Status: PASS
- Primary UX: Plex Streaming-library live catalog backed by Torrentio/Real-Debrid through the ScarFLIX live proxy
- Request/materialize lane: fallback only

## Verified Live Playback
- Live self-test: PASS
- Checked: 35
- Passed: 35
- Failed: 0
- Plex indexed live `.strm`: 35
- Old `_ScarFLIXv2` / `_ScarFLIXv2_Direct` active Plex parts: 0
- 12 Angry Men (1957): PASS, 734077147 bytes, Range 206
- Night of the Living Dead (1968): PASS, 59472710133 bytes, Range 206

## Current Guardrails
- Only cached Debrid streams are admitted.
- RD download/static placeholder clips are rejected.
- Minimum live media size is enforced.
- `application/force-download` from RD is normalized to `application/octet-stream` for Plex.
- Source ranking prefers 720p/1080p H.264-style sources before 4K/HEVC/remux/DV/HDR.
- Failed live catalog entries are archived by the validator.

## NEED JASON
- None.