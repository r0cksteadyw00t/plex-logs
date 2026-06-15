# Mission 002 Transparency Reset

Updated UTC: 2026-06-15T22:11:43Z

Status: PASS_TRANSPARENT_CANDIDATE_REPORTING_ENABLED

## What Changed

- Disabled hidden legality_class / drm_status filtering in the sports source engine.
- Kept legality_class and drm_status as informational annotations only.
- Changed candidate reporting to technical score + evidence + publish state.
- Changed discovery runner so source policy signals and recast/mirror signals are metadata, not hidden exclusions.
- Changed publish runner to require explicit -ApplyApproved; without it, status is HELD_EXPLICIT_APPLY_APPROVAL_REQUIRED and no backend mutation occurs.

## Fresh Evidence

- Active Threadfin channels: 37.
- Sports engine: 100 external candidates, 96 technical-ready candidates, status PASS_EXTERNAL_SPORTS_CANDIDATES_READY_FOR_REVIEW.
- Discovery refresh: 1694 unique candidate channels, 197 relevant candidates, 40 probes, 39 PASS / 1 FAIL, 2 private pending source packages.
- Publishing during reset: false.

## Next Action

Review technical candidate reports and explicitly approve any publish set before Threadfin/Plex apply.