# Plex Playback Priority Config Status

**Updated UTC:** 2026-06-13T08:58:53Z  
**Status:** PASS_PRODUCTION_PLAYBACK_PRIORITY_PREFS_APPLIED

Production Plex has been moved to a playback-priority profile:

- FSEventLibraryUpdatesEnabled: 1 -> 0
- FSEventLibraryPartialScanEnabled: 1 -> 0
- ScheduledLibraryUpdatesEnabled: 1 -> 0
- autoEmptyTrash: 1 -> 0
- ScannerLowPriority: 0 -> 1
- BackgroundQueueIdlePaused: 0 -> 1
- ButlerStartHour: 2 -> 2
- ButlerEndHour: 7 -> 6
- ButlerTaskRefreshLibraries: 1 -> 0
- ButlerTaskUpgradeMediaAnalysis: 1 -> 0
- ButlerTaskDeepMediaAnalysis: 1 -> 0
- GenerateBIFBehavior: asap -> scheduled
- GenerateIntroMarkerBehavior: asap -> scheduled
- GenerateCreditsMarkerBehavior: asap -> scheduled
- GenerateChapterThumbBehavior: asap -> scheduled
- LoudnessAnalysisBehavior: asap -> scheduled

Backup: $backupDir

Safety: no publication, no expansion, no source mutation, no path rewrite, and no direct Plex DB edit.
