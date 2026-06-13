# ScarFLIX / JasonOS Prime Project Plan

## Active Priority - Quality and Playback Stability

**Updated UTC:** 2026-06-13T08:36:00Z  
**Status:** PASS_LIGHTWEIGHT_STABILITY_GUARD_CREATED_PLAYBACK_VERIFICATION_STILL_REQUIRED

Jason redirected the project to quality, stability, QA evidence, issue investigation, and problem solving. Catalogue expansion is not the active priority while Plex movie playback is unreliable.

## Current Decision

Do not continue Path 2 scaling or catalogue expansion until Plex-client playback is proven reliable on a small Watch Now lane. Indexed Plex metadata, Section 5 visibility, Plex identity PASS, and WebDAV health PASS are not sufficient user-outcome success criteria.

## Current Findings

- Command launch recovered briefly (`81ms`, `46ms`, `33ms`) then degraded again under live load.
- Sentinel and core infrastructure are PASS/LOW or healthy.
- Playback path recovery reports PASS, but it is still mostly infrastructure readiness.
- Materialized QA remains REVIEW: `119/229` passed, `110` failed.
- Dashboard playback sample remains REVIEW and reports no verified Plex playback sample.
- Non-critical ScarFLIX QA/expansion/campaign tasks are disabled and holding.
- Plex background scanner/analyzer/thumbnail/credit jobs were active and consuming media paths.
- rclone/WebDAV logs show repeated upstream/cache failures for specific `ScarFLIX_part-*` paths.

## Engineering Action Taken

Created a dedicated playback-first stability guard:

- `D:\PlexTools\Scripts\scarflix_v2\JasonOS_Prime_PlaybackFirstStabilityGuard.ps1`
- `D:\PlexTools\Scripts\scarflix_v2\hidden_tasks\JasonOS_Prime_PlaybackFirstStabilityGuard.vbs`

The first full guard version timed out. The final default guard was simplified to avoid `cmd.exe`, WMI command-line scans, and log-tail analysis by default. It stops only `Plex Media Scanner` processes during playback-first mode and does not stop Plex Media Server or all Plex transcoders.

Confirmed: the simplified guard completed once successfully and wrote local status.

Unconfirmed: scheduled task registration was attempted but timed out before confirmation. Verify later before treating the guard as recurring.

## Next Safe Sequence

1. Keep QA/expansion/campaign workers disabled.
2. Verify or install `JasonOS_Prime_PlaybackFirstStabilityGuard` as a hidden scheduled task when launch health is stable.
3. Wait 2-5 minutes for Plex scanner/analyzer load and rclone/WebDAV pressure to drop.
4. Verify one small Plex-client Watch Now lane end-to-end.
5. If one title still fails, isolate it through Plex metadata row, local path, WebDAV range, and Plex logs.
6. Resume expansion only after Plex-client playback is proven stable.

## Public Handoff

- Grok handoff: https://raw.githubusercontent.com/r0cksteadyw00t/plex-logs/main/latest/scarflix_v2/GROK_HANDOFF_FOR_GROK.md
- Stability guard status: https://raw.githubusercontent.com/r0cksteadyw00t/plex-logs/main/latest/scarflix_v2/playback_first_stability_guard_status.md
- Playback status: https://raw.githubusercontent.com/r0cksteadyw00t/plex-logs/main/latest/scarflix_v2/playback_recovery_mode_status.md
- Codex status: https://raw.githubusercontent.com/r0cksteadyw00t/plex-logs/main/latest/scarflix_v2/CODEX_STATUS_FOR_GROK.md
