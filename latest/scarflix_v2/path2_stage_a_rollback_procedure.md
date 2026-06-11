# Path 2 Stage A Rollback Procedure

Created UTC: 2026-06-11T00:00:11.503Z
Backup root: D:/PlexTools/Backups/path2_stage_a_20260610T235616Z

## Scope

Restore the pre-Stage-B hash-based ScarFLIX state captured during Stage A. Stage A itself did not modify webdav_map.json, symlinks, Plex metadata, sources, publication state, or folder structure.

## Preconditions

1. Confirm PAUSE_PUBLICATION is active.
2. Stop any Stage B migration job before restoring files.
3. Confirm no publication, expansion, cleanup, deletion, cache clear, refresh, or source mutation is in progress.

## Restore Files

1. Restore webdav_map.json from the backup copy listed in manifests/backup_manifest.json.
2. Restore Section 5 status artifacts, hypothesis ledger, GROK_HANDOFF_FOR_GROK.md, CODEX_STATUS_FOR_GROK.md, and PROJECT_PLAN.md from the backup copies if Stage B modified them.
3. Use manifests/affected_path_manifest.json to verify every affected title folder, ScarFLIX_part folder, and stream.mkv path identity.

## Restore Orchestrator Work

1. Review manifests/orchestrator_jobs_snapshot.json.
2. Requeue only jobs explicitly cancelled by Stage A and still needed after rollback.
3. Keep FastTrack and incident jobs held until PAUSE_PUBLICATION and Section 5 state are verified.

## Verification

1. Run a read-only uncapped Section 5 snapshot. Expected pre-Stage-B baseline: 83/105 visible, 22 missing.
2. Confirm the restored webdav_map.json SHA-256 matches backup_manifest.json.
3. Confirm PAUSE_PUBLICATION remains active.
4. Confirm no broad publication or expansion job is queued.

## Dry-Run Test Performed

Backup files were copied and hashed; affected path manifest and job snapshot were generated; rollback steps were documented. No restore was executed because Stage A is protective and non-destructive.
