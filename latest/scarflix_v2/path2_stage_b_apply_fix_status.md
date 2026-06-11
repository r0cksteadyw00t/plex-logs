# Path 2 Stage B Apply Fix + Fresh Baseline Status

Updated UTC: 2026-06-11T00:45:27.615Z
Status: `STOPPED_BEFORE_PILOT_BASELINE_REGRESSED_AND_NO_PROTECTED_MIGRATION_RUNNER`

## Summary

The staged Orchestrator dispatch fix was activated successfully. The service was restarted, /healthz returned HTTP 200/PASS, and the fresh uncapped Section 5 snapshot updated correctly. This confirms the previous stale-artifact failure is fixed.

Stage B live migration was not executed. The fresh baseline regressed from Stage A 83/105 visible (22 missing) to 74/105 visible (31 missing). No protected Path 2 migration runner exists, and the existing Stage B plan already recorded a live path-mechanics timeout during preflight.

## Results

- Orchestrator restart: PASS
- /healthz: PASS / HTTP 200
- Patch active: PASS (`markMaterializedProbeRequestsHeld`)
- Fresh baseline job: PASS (`job_7a3dd06c7990fdaf`)
- Fresh baseline: 74/105 visible (70.5%), 31 missing
- Delta vs Stage A: -9 visible, +9 missing
- Pilot migration: NOT ATTEMPTED

## Safety Decision

Do not create aliases, edit `webdav_map.json`, move folders, create symlinks, or trigger Plex refresh until a protected pilot runner exists and current visibility stabilizes or the lower baseline is explicitly accepted as the migration reference.

## Required Before Retry

1. Create a dedicated protected Path 2 pilot migration runner with backup, additive-only mutation, per-title rollback, and read-only pre/post verification.
2. Run two consecutive fresh uncapped baselines showing stable or improving visibility, or obtain explicit architecture approval to use the lower 74/105 baseline.
3. Keep PAUSE_PUBLICATION active and pilot only 3-5 visible titles.

## Safety Confirmations

- PAUSE_PUBLICATION active: true
- No publication started: true
- No expansion started: true
- No refresh/cache clear run by this Stage B apply-fix step: true
- No cleanup/deletion/source mutation/folder move/symlink change/map change: true

## Raw Handoff URL

https://raw.githubusercontent.com/r0cksteadyw00t/plex-logs/main/latest/scarflix_v2/GROK_HANDOFF_FOR_GROK.md
