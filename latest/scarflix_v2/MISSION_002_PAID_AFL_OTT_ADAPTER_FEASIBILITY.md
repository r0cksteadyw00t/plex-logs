# Mission 002 Paid AFL OTT Adapter Feasibility

Updated: 2026-06-15

## Problem

Plex Live TV now has the corrected Melbourne/Sydney-only FTA IPTV lineup plus 7plus AFL. That does not provide complete AFL coverage. Official AFL/Kayo material indicates every-game AFL coverage requires Fox Footy / Foxtel / Kayo.

The currently configured legal M3U/XMLTV inputs do not expose Fox Footy, Fox Sports, or Kayo as Plex-compatible channels.

## Current Active Plex Surface

- 7 Melbourne
- 7 Sydney
- 7mate Melbourne
- 7mate Sydney
- 7plus AFL Live

## Held Paid Sources

- Fox Footy
- Kayo Sports AFL live events
- Foxtel / Fox Sports AFL live events

Status: `HELD_PAID_OTT_ADAPTER_REQUIRED`

## Constraints

- Plex remains the playback front end.
- IPTV-only remains the project direction; no TV tuner will be used.
- Do not publish fake Fox/Kayo channel rows.
- Do not add unsupported or unstable streams into Plex.
- Do not use regional FTA channels as paid-AFL substitutes.
- Any adapter must be subscription-backed, legally sourced, and validated before appearing in Plex.

## Feasible Adapter Paths To Investigate

1. **Official Plex-compatible M3U/XMLTV provider**
   - Best outcome if available.
   - Current configured sources do not provide it.
   - Action: keep source discovery held and repeat only against explicit legal provider candidates.

2. **HDHomeRun-compatible bridge from a legal paid OTT session**
   - Possible architecture: paid OTT session -> local controlled player/receiver -> MPEG-TS/HLS bridge -> Threadfin/Plex.
   - Risk: DRM, ToS, fragility, audio/video sync, single-session limits.
   - Must be validated as a bounded technical spike before Plex exposure.

3. **Event-aware launcher outside Plex Live TV**
   - Not preferred because Plex is required front end.
   - Could be held as fallback only if Plex-compatible bridge is impossible.

## Current Decision

Do not add Fox/Kayo/Foxtel channels to Plex until a legal Plex-compatible source adapter exists. Keep them represented as held requirements so project planning does not mistake the 7plus/FTA lineup for complete AFL coverage.

## Next Engineering Action

Run a paid OTT adapter feasibility spike:

- inventory local subscriptions/apps/browsers without exposing credentials;
- determine whether Kayo/Foxtel can produce a legal local stream suitable for Threadfin/Plex;
- if DRM prevents bridging, document as a hard limitation and keep Fox/Kayo held;
- if a bridge is feasible, build a single-channel hidden test adapter first and verify in Threadfin before touching Plex DVR mappings.
