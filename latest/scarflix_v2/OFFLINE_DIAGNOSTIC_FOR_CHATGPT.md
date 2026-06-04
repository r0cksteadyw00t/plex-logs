# ScarFLIX v2 Offline Diagnostic

Generated: 2026-06-04 11:25:10

Signal: DIAGNOSTIC_READY
Reason: ScarFLIX is quiesced. This diagnostic collects the last useful ActiveGate and QA evidence without restarting jobs.
Next action: Type 1 in ChatGPT after this uploads.

No Codex used. No catalogue change. No expansion enabled. No PlatformGate restart.

## PlatformGate logs

### D:\PlexTools\logs\scarflix_v2_platform_gate_20260604.log
Last write: 06/04/2026 09:04:13
``text
[2026-06-03T23:04:13Z] [REVIEW] active_gate did not pass; exit=1
``

### D:\PlexTools\logs\scarflix_v2_platform_gate_local_runner_20260604.log
Last write: 06/04/2026 09:01:36
``text
[2026-06-03T23:01:35Z] [INFO] Local runner starting. No catalogue expansion will be run.
[2026-06-03T23:01:36Z] [INFO] Starting same-snapshot PlatformGate locally, attempt 1 of 2.
``

### D:\PlexTools\logs\scarflix_v2_platform_gate_20260603.log
Last write: 06/03/2026 19:45:42
``text
[2026-06-03T05:48:21Z] [REVIEW] active_gate did not pass; exit=1
[2026-06-03T05:50:12Z] [REVIEW] Platform gate finished with REVIEW
[2026-06-03T06:44:39Z] [REVIEW] active_gate did not pass; exit=1
[2026-06-03T06:51:55Z] [REVIEW] Platform gate finished with REVIEW
[2026-06-03T06:54:38Z] [REVIEW] active_gate did not pass; exit=1
[2026-06-03T07:13:02Z] [REVIEW] plex_client_decision_qa did not pass; exit=1
[2026-06-03T07:13:31Z] [REVIEW] Platform gate finished with REVIEW
[2026-06-03T07:16:44Z] [REVIEW] active_gate did not pass; exit=1
[2026-06-03T07:25:11Z] [REVIEW] Platform gate finished with REVIEW
[2026-06-03T07:29:14Z] [REVIEW] active_gate did not pass; exit=1
[2026-06-03T07:59:12Z] [REVIEW] concurrent_stream_qa did not pass; exit=1
[2026-06-03T07:59:33Z] [REVIEW] Platform gate finished with REVIEW
[2026-06-03T08:14:09Z] [REVIEW] active_gate did not pass; exit=1
[2026-06-03T08:27:54Z] [REVIEW] visible_catalog_qa did not pass; exit=1
[2026-06-03T08:39:25Z] [REVIEW] plex_client_decision_qa did not pass; exit=1
[2026-06-03T08:39:30Z] [REVIEW] concurrent_stream_qa did not pass; exit=1
[2026-06-03T08:39:51Z] [REVIEW] Platform gate finished with REVIEW
[2026-06-03T08:43:42Z] [REVIEW] active_gate did not pass; exit=1
[2026-06-03T08:55:58Z] [REVIEW] visible_catalog_qa did not pass; exit=1
[2026-06-03T08:57:39Z] [REVIEW] concurrent_stream_qa did not pass; exit=1
[2026-06-03T08:58:09Z] [REVIEW] Platform gate finished with REVIEW
[2026-06-03T09:13:59Z] [REVIEW] active_gate did not pass; exit=1
[2026-06-03T09:18:38Z] [REVIEW] visible_catalog_qa did not pass; exit=1
[2026-06-03T09:44:43Z] [REVIEW] plex_client_decision_qa did not pass; exit=1
[2026-06-03T09:45:11Z] [REVIEW] concurrent_stream_qa did not pass; exit=1
[2026-06-03T09:45:42Z] [REVIEW] Platform gate finished with REVIEW
``

## ActiveGate logs

### D:\PlexTools\logs\scarflix_v2_webdav_active_gate_20260604.log
Last write: 06/04/2026 09:04:13
``text
[2026-06-03T23:01:53Z] [INFO] WebDAV active gate starting MaxItems=0 Retries=1 PruneFailed=False VisibleOnly=False
[2026-06-03T23:04:13Z] [INFO] Concurrent worker complete checked=78 passed=71 failed=7
[2026-06-03T23:04:13Z] [REVIEW] WebDAV active gate finished status=REVIEW checked=78 passed=71 failed_detected=7 pruned=0
``

### D:\PlexTools\logs\scarflix_v2_webdav_active_gate_20260604.log
Last write: 06/04/2026 09:04:13
``text
[2026-06-03T23:01:53Z] [INFO] WebDAV active gate starting MaxItems=0 Retries=1 PruneFailed=False VisibleOnly=False
[2026-06-03T23:04:13Z] [INFO] Concurrent worker complete checked=78 passed=71 failed=7
[2026-06-03T23:04:13Z] [REVIEW] WebDAV active gate finished status=REVIEW checked=78 passed=71 failed_detected=7 pruned=0
``

### D:\PlexTools\logs\scarflix_v2_webdav_active_gate_20260603.log
Last write: 06/03/2026 19:13:59
``text
[2026-06-03T03:07:12Z] [INFO] WebDAV active gate starting MaxItems=0 Retries=1 PruneFailed=True VisibleOnly=False
[2026-06-03T03:07:12Z] [REVIEW] WebDAV active gate finished status=REVIEW checked=0 passed=0 failed_detected=0 pruned=0
[2026-06-03T03:10:17Z] [INFO] WebDAV active gate starting MaxItems=0 Retries=1 PruneFailed=False VisibleOnly=False
[2026-06-03T03:11:14Z] [INFO] Concurrent worker complete checked=62 passed=62 failed=0
[2026-06-03T03:11:14Z] [PASS] WebDAV active gate finished status=PASS checked=62 passed=62 failed_detected=0 pruned=0
[2026-06-03T03:12:13Z] [INFO] WebDAV active gate starting MaxItems=0 Retries=1 PruneFailed=False VisibleOnly=False
[2026-06-03T03:13:10Z] [INFO] Concurrent worker complete checked=62 passed=62 failed=0
[2026-06-03T03:13:10Z] [PASS] WebDAV active gate finished status=PASS checked=62 passed=62 failed_detected=0 pruned=0
[2026-06-03T03:15:32Z] [INFO] WebDAV active gate starting MaxItems=0 Retries=1 PruneFailed=True VisibleOnly=True
[2026-06-03T03:16:30Z] [INFO] Concurrent worker complete checked=62 passed=62 failed=0
[2026-06-03T03:16:30Z] [PASS] WebDAV active gate finished status=PASS checked=62 passed=62 failed_detected=0 pruned=0
[2026-06-03T03:18:57Z] [INFO] WebDAV active gate starting MaxItems=0 Retries=1 PruneFailed=False VisibleOnly=False
[2026-06-03T03:19:59Z] [INFO] Concurrent worker complete checked=62 passed=62 failed=0
[2026-06-03T03:19:59Z] [PASS] WebDAV active gate finished status=PASS checked=62 passed=62 failed_detected=0 pruned=0
[2026-06-03T03:38:48Z] [INFO] WebDAV active gate starting MaxItems=0 Retries=1 PruneFailed=True VisibleOnly=False
[2026-06-03T03:38:53Z] [INFO] Concurrent worker complete checked=6 passed=6 failed=0
[2026-06-03T03:38:54Z] [PASS] WebDAV active gate finished status=PASS checked=6 passed=6 failed_detected=0 pruned=0
[2026-06-03T03:42:41Z] [INFO] WebDAV active gate starting MaxItems=0 Retries=1 PruneFailed=False VisibleOnly=False
[2026-06-03T03:43:41Z] [INFO] Concurrent worker complete checked=63 passed=63 failed=0
[2026-06-03T03:43:41Z] [PASS] WebDAV active gate finished status=PASS checked=63 passed=63 failed_detected=0 pruned=0
[2026-06-03T03:46:36Z] [INFO] WebDAV active gate starting MaxItems=0 Retries=1 PruneFailed=True VisibleOnly=False
[2026-06-03T03:46:42Z] [INFO] Concurrent worker complete checked=5 passed=5 failed=0
[2026-06-03T03:46:42Z] [PASS] WebDAV active gate finished status=PASS checked=5 passed=5 failed_detected=0 pruned=0
[2026-06-03T03:50:51Z] [INFO] WebDAV active gate starting MaxItems=0 Retries=1 PruneFailed=False VisibleOnly=False
[2026-06-03T03:51:58Z] [INFO] Concurrent worker complete checked=67 passed=67 failed=0
[2026-06-03T03:51:58Z] [PASS] WebDAV active gate finished status=PASS checked=67 passed=67 failed_detected=0 pruned=0
[2026-06-03T03:53:05Z] [INFO] WebDAV active gate starting MaxItems=0 Retries=1 PruneFailed=False VisibleOnly=False
[2026-06-03T03:54:08Z] [INFO] Concurrent worker complete checked=67 passed=67 failed=0
[2026-06-03T03:54:08Z] [PASS] WebDAV active gate finished status=PASS checked=67 passed=67 failed_detected=0 pruned=0
[2026-06-03T03:59:29Z] [INFO] WebDAV active gate starting MaxItems=0 Retries=1 PruneFailed=False VisibleOnly=False
[2026-06-03T04:00:33Z] [INFO] Concurrent worker complete checked=67 passed=67 failed=0
[2026-06-03T04:00:33Z] [PASS] WebDAV active gate finished status=PASS checked=67 passed=67 failed_detected=0 pruned=0
[2026-06-03T04:05:36Z] [INFO] WebDAV active gate starting MaxItems=0 Retries=1 PruneFailed=True VisibleOnly=False
[2026-06-03T04:05:40Z] [INFO] Concurrent worker complete checked=3 passed=3 failed=0
[2026-06-03T04:05:40Z] [PASS] WebDAV active gate finished status=PASS checked=3 passed=3 failed_detected=0 pruned=0
[2026-06-03T04:10:08Z] [INFO] WebDAV active gate starting MaxItems=0 Retries=1 PruneFailed=False VisibleOnly=False
[2026-06-03T04:11:12Z] [INFO] Concurrent worker complete checked=69 passed=69 failed=0
[2026-06-03T04:11:12Z] [PASS] WebDAV active gate finished status=PASS checked=69 passed=69 failed_detected=0 pruned=0
[2026-06-03T04:14:37Z] [INFO] WebDAV active gate starting MaxItems=0 Retries=1 PruneFailed=True VisibleOnly=False
[2026-06-03T04:14:41Z] [INFO] Concurrent worker complete checked=3 passed=3 failed=0
[2026-06-03T04:14:41Z] [PASS] WebDAV active gate finished status=PASS checked=3 passed=3 failed_detected=0 pruned=0
[2026-06-03T04:19:08Z] [INFO] WebDAV active gate starting MaxItems=0 Retries=1 PruneFailed=False VisibleOnly=False
[2026-06-03T04:20:18Z] [INFO] Concurrent worker complete checked=71 passed=71 failed=0
[2026-06-03T04:20:18Z] [PASS] WebDAV active gate finished status=PASS checked=71 passed=71 failed_detected=0 pruned=0
[2026-06-03T04:23:32Z] [INFO] WebDAV active gate starting MaxItems=0 Retries=1 PruneFailed=True VisibleOnly=False
[2026-06-03T04:23:35Z] [INFO] Concurrent worker complete checked=3 passed=3 failed=0
[2026-06-03T04:23:35Z] [PASS] WebDAV active gate finished status=PASS checked=3 passed=3 failed_detected=0 pruned=0
[2026-06-03T04:28:16Z] [INFO] WebDAV active gate starting MaxItems=0 Retries=1 PruneFailed=False VisibleOnly=False
[2026-06-03T04:29:25Z] [INFO] Concurrent worker complete checked=73 passed=73 failed=0
[2026-06-03T04:29:25Z] [PASS] WebDAV active gate finished status=PASS checked=73 passed=73 failed_detected=0 pruned=0
[2026-06-03T04:39:58Z] [INFO] WebDAV active gate starting MaxItems=0 Retries=1 PruneFailed=True VisibleOnly=False
[2026-06-03T04:40:05Z] [INFO] Concurrent worker complete checked=5 passed=5 failed=0
[2026-06-03T04:40:05Z] [PASS] WebDAV active gate finished status=PASS checked=5 passed=5 failed_detected=0 pruned=0
[2026-06-03T04:44:58Z] [INFO] WebDAV active gate starting MaxItems=0 Retries=1 PruneFailed=False VisibleOnly=False
[2026-06-03T04:46:17Z] [INFO] Concurrent worker complete checked=78 passed=78 failed=0
[2026-06-03T04:46:17Z] [PASS] WebDAV active gate finished status=PASS checked=78 passed=78 failed_detected=0 pruned=0
[2026-06-03T05:46:53Z] [INFO] WebDAV active gate starting MaxItems=0 Retries=1 PruneFailed=False VisibleOnly=False
[2026-06-03T05:48:21Z] [INFO] Concurrent worker complete checked=78 passed=77 failed=1
[2026-06-03T05:48:21Z] [REVIEW] WebDAV active gate finished status=REVIEW checked=78 passed=77 failed_detected=1 pruned=0
[2026-06-03T06:43:24Z] [INFO] WebDAV active gate starting MaxItems=0 Retries=1 PruneFailed=False VisibleOnly=False
[2026-06-03T06:44:39Z] [INFO] Concurrent worker complete checked=78 passed=76 failed=2
[2026-06-03T06:44:39Z] [REVIEW] WebDAV active gate finished status=REVIEW checked=78 passed=76 failed_detected=2 pruned=0
[2026-06-03T06:53:26Z] [INFO] WebDAV active gate starting MaxItems=0 Retries=1 PruneFailed=False VisibleOnly=False
[2026-06-03T06:54:38Z] [INFO] Concurrent worker complete checked=78 passed=76 failed=2
[2026-06-03T06:54:38Z] [REVIEW] WebDAV active gate finished status=REVIEW checked=78 passed=76 failed_detected=2 pruned=0
[2026-06-03T07:15:24Z] [INFO] WebDAV active gate starting MaxItems=0 Retries=1 PruneFailed=False VisibleOnly=False
[2026-06-03T07:16:44Z] [INFO] Concurrent worker complete checked=78 passed=76 failed=2
[2026-06-03T07:16:44Z] [REVIEW] WebDAV active gate finished status=REVIEW checked=78 passed=76 failed_detected=2 pruned=0
[2026-06-03T07:26:29Z] [INFO] WebDAV active gate starting MaxItems=0 Retries=1 PruneFailed=False VisibleOnly=False
[2026-06-03T07:29:13Z] [INFO] Concurrent worker complete checked=78 passed=72 failed=6
[2026-06-03T07:29:14Z] [REVIEW] WebDAV active gate finished status=REVIEW checked=78 passed=72 failed_detected=6 pruned=0
[2026-06-03T08:12:26Z] [INFO] WebDAV active gate starting MaxItems=0 Retries=1 PruneFailed=False VisibleOnly=False
[2026-06-03T08:14:09Z] [INFO] Concurrent worker complete checked=78 passed=75 failed=3
[2026-06-03T08:14:09Z] [REVIEW] WebDAV active gate finished status=REVIEW checked=78 passed=75 failed_detected=3 pruned=0
[2026-06-03T08:42:23Z] [INFO] WebDAV active gate starting MaxItems=0 Retries=1 PruneFailed=False VisibleOnly=False
[2026-06-03T08:43:42Z] [INFO] Concurrent worker complete checked=78 passed=75 failed=3
[2026-06-03T08:43:42Z] [REVIEW] WebDAV active gate finished status=REVIEW checked=78 passed=75 failed_detected=3 pruned=0
[2026-06-03T09:12:29Z] [INFO] WebDAV active gate starting MaxItems=0 Retries=1 PruneFailed=False VisibleOnly=False
[2026-06-03T09:13:59Z] [INFO] Concurrent worker complete checked=78 passed=75 failed=3
[2026-06-03T09:13:59Z] [REVIEW] WebDAV active gate finished status=REVIEW checked=78 passed=75 failed_detected=3 pruned=0
``

## Visible catalogue QA logs

### D:\PlexTools\logs\scarflix_v2_visible_catalog_qa_20260604.log
Last write: 06/04/2026 10:12:12
``text
[2026-06-03T23:04:13Z] [INFO] Visible catalog QA starting MaxItems=0 HideFailed=False
[2026-06-03T23:14:54Z] [REVIEW] QA failed: part=111244 title=The Devil Wears Prada reason=Plex Transcoder HLS probe timed out
[2026-06-03T23:21:54Z] [REVIEW] QA failed: part=111277 title=The Dark Knight reason=Plex Transcoder HLS probe timed out
[2026-06-03T23:27:09Z] [REVIEW] QA failed: part=111282 title=Spirited Away reason=Plex Transcoder HLS probe timed out
[2026-06-03T23:37:28Z] [REVIEW] QA failed: part=111460 title=Star Wars: Episode IV -- A New Hope reason=Plex Transcoder HLS probe timed out
[2026-06-03T23:41:14Z] [REVIEW] QA failed: part=111468 title=Pulp Fiction reason=Plex Transcoder HLS probe did not produce valid output
[2026-06-03T23:44:18Z] [REVIEW] QA failed: part=111747 title=Harry Potter and the Prisoner of Azkaban reason=Plex Transcoder HLS probe timed out
[2026-06-03T23:46:31Z] [REVIEW] QA failed: part=111899 title=Pirates of the Caribbean: Dead Man's Chest reason=Plex Transcoder HLS probe timed out
[2026-06-03T23:50:55Z] [REVIEW] QA failed: part=111965 title=GOAT reason=Plex Transcoder HLS probe timed out
[2026-06-03T23:54:54Z] [REVIEW] QA failed: part=111966 title=Forrest Gump reason=Plex Transcoder HLS probe timed out
[2026-06-03T23:57:45Z] [REVIEW] QA failed: part=111981 title=Dune: Part One reason=Plex Transcoder HLS probe timed out
[2026-06-04T00:02:12Z] [REVIEW] QA failed: part=111992 title=Coraline reason=Plex Transcoder HLS probe timed out
[2026-06-04T00:08:15Z] [REVIEW] QA failed: part=112017 title=Coco reason=Plex Transcoder HLS probe timed out
[2026-06-04T00:12:12Z] [REVIEW] QA failed: part=112087 title=The Lord of the Rings: The Two Towers reason=Plex Transcoder HLS probe did not produce valid output
``

### D:\PlexTools\logs\scarflix_v2_visible_catalog_qa_20260603.log
Last write: 06/03/2026 19:16:29
``text
[2026-06-03T08:46:24Z] [REVIEW] QA failed: part=111244 title=The Devil Wears Prada reason=Plex Transcoder HLS probe timed out
[2026-06-03T09:14:03Z] [INFO] Visible catalog QA starting MaxItems=0 HideFailed=False
[2026-06-03T09:15:49Z] [REVIEW] QA failed: part=111244 title=The Devil Wears Prada reason=Plex Transcoder HLS probe timed out
``

### D:\PlexTools\logs\scarflix_v2_visible_catalog_qa_20260602.log
Last write: 06/02/2026 23:23:06
``text
[2026-06-02T13:21:16Z] [INFO] Visible catalog QA starting MaxItems=0 HideFailed=False
[2026-06-02T13:23:06Z] [INFO] Visible catalog QA starting MaxItems=0 HideFailed=False
``

## Plex decision QA logs

### D:\PlexTools\logs\scarflix_v2_plex_client_decision_qa_20260603.log
Last write: 06/03/2026 19:44:43
``text
[2026-06-03T08:55:59Z] [INFO] Plex client decision QA starting MaxItems=0 TimeoutSeconds=45 Retries=1
[2026-06-03T09:18:43Z] [INFO] Plex client decision QA starting MaxItems=0 TimeoutSeconds=45 Retries=1
[2026-06-03T09:38:53Z] [REVIEW] Decision failed: metadata=41081 title=The Sopranos reason=The operation has timed out.
[2026-06-03T09:44:43Z] [REVIEW] Decision failed: metadata=41103 title=Yankee White reason=The operation has timed out.
``

### D:\PlexTools\logs\scarflix_v2_plex_client_decision_qa_20260602.log
Last write: 06/02/2026 23:23:24
``text
[2026-06-02T13:21:24Z] [INFO] Plex client decision QA starting MaxItems=0 TimeoutSeconds=45 Retries=1
[2026-06-02T13:23:07Z] [INFO] Plex client decision QA starting MaxItems=0 TimeoutSeconds=45 Retries=1
``

### D:\PlexTools\logs\scarflix_v2_plex_client_decision_qa_20260601.log
Last write: 06/01/2026 23:58:58
``text
[2026-06-01T13:58:51Z] [PASS] Decision passed: metadata=39786 title=Pilot
[2026-06-01T13:58:51Z] [PASS] Decision passed: metadata=39789 title=Pilot
[2026-06-01T13:58:51Z] [PASS] Decision passed: metadata=39794 title=Pilot
[2026-06-01T13:58:52Z] [PASS] Decision passed: metadata=39848 title=Pilot
[2026-06-01T13:58:52Z] [PASS] Decision passed: metadata=39851 title=Pilot
[2026-06-01T13:58:52Z] [PASS] Decision passed: metadata=39873 title=Pilot
[2026-06-01T13:58:52Z] [PASS] Decision passed: metadata=39876 title=Pilot
[2026-06-01T13:58:52Z] [PASS] Decision passed: metadata=39898 title=Pilot
[2026-06-01T13:58:53Z] [PASS] Decision passed: metadata=39910 title=Pilot
[2026-06-01T13:58:53Z] [PASS] Decision passed: metadata=39934 title=Pilot
[2026-06-01T13:58:53Z] [PASS] Decision passed: metadata=39962 title=Pilot
[2026-06-01T13:58:53Z] [PASS] Decision passed: metadata=39965 title=Pilot
[2026-06-01T13:58:53Z] [PASS] Decision passed: metadata=39997 title=Pilot
[2026-06-01T13:58:53Z] [PASS] Decision passed: metadata=40001 title=Pilot
[2026-06-01T13:58:54Z] [PASS] Decision passed: metadata=39862 title=Red Light, Green Light
[2026-06-01T13:58:54Z] [PASS] Decision passed: metadata=39907 title=Ryomen Sukuna
[2026-06-01T13:58:54Z] [PASS] Decision passed: metadata=39744 title=Space Pilot 3000
[2026-06-01T13:58:54Z] [PASS] Decision passed: metadata=40004 title=Stick or Twist
[2026-06-01T13:58:54Z] [PASS] Decision passed: metadata=39854 title=Strange New Worlds
[2026-06-01T13:58:55Z] [PASS] Decision passed: metadata=39956 title=That's How Love Starts, Ya Know!
[2026-06-01T13:58:55Z] [PASS] Decision passed: metadata=39804 title=The Box
[2026-06-01T13:58:55Z] [PASS] Decision passed: metadata=39798 title=The Boy
[2026-06-01T13:58:55Z] [PASS] Decision passed: metadata=39979 title=The Boy in the Iceberg
[2026-06-01T13:58:55Z] [PASS] Decision passed: metadata=39974 title=The Collection
[2026-06-01T13:58:56Z] [PASS] Decision passed: metadata=39880 title=The End of the Beginning and the Beginning of the End
[2026-06-01T13:58:56Z] [PASS] Decision passed: metadata=39858 title=The Eyes
[2026-06-01T13:58:56Z] [PASS] Decision passed: metadata=39903 title=The Fool
[2026-06-01T13:58:56Z] [PASS] Decision passed: metadata=39931 title=The Journey's End
[2026-06-01T13:58:56Z] [PASS] Decision passed: metadata=39783 title=The Sopranos
[2026-06-01T13:58:57Z] [PASS] Decision passed: metadata=39924 title=The Sphere
[2026-06-01T13:58:57Z] [PASS] Decision passed: metadata=39747 title=The Untold Want
[2026-06-01T13:58:57Z] [PASS] Decision passed: metadata=39809 title=To You in 2016
[2026-06-01T13:58:57Z] [PASS] Decision passed: metadata=39983 title=To You, in 2000 Years: The Fall of Shiganshina (1)
[2026-06-01T13:58:57Z] [PASS] Decision passed: metadata=39883 title=Uncut, Uncooked, Uncensored
[2026-06-01T13:58:58Z] [PASS] Decision passed: metadata=39968 title=Uno
[2026-06-01T13:58:58Z] [PASS] Decision passed: metadata=39986 title=Vanished at Sea
[2026-06-01T13:58:58Z] [PASS] Decision passed: metadata=39913 title=Welcome to the Undervale
[2026-06-01T13:58:58Z] [PASS] Decision passed: metadata=39780 title=Where Paradise Is Home
[2026-06-01T13:58:58Z] [PASS] Decision passed: metadata=39921 title=Winter Is Coming
[2026-06-01T13:58:58Z] [PASS] Decision passed: metadata=39890 title=Yankee White
``

## Concurrent QA logs

### D:\PlexTools\logs\scarflix_v2_concurrent_stream_qa_wrapper_20260603.log
Last write: 06/03/2026 19:45:11
``text
[2026-06-02T22:00:58Z] [INFO] Range passed=5 failed=0
[2026-06-02T22:00:58Z] [INFO] Decision passed=5 failed=0
[2026-06-03T00:57:40Z] [INFO] Range passed=5 failed=0
[2026-06-03T00:57:40Z] [INFO] Decision passed=5 failed=0
[2026-06-03T01:04:30Z] [INFO] Range passed=5 failed=0
[2026-06-03T01:04:30Z] [INFO] Decision passed=5 failed=0
[2026-06-03T01:07:18Z] [INFO] Range passed=5 failed=0
[2026-06-03T01:07:18Z] [INFO] Decision passed=5 failed=0
[2026-06-03T01:10:03Z] [INFO] Range passed=5 failed=0
[2026-06-03T01:10:03Z] [INFO] Decision passed=5 failed=0
[2026-06-03T01:26:43Z] [INFO] Range passed=5 failed=0
[2026-06-03T01:26:43Z] [INFO] Decision passed=5 failed=0
[2026-06-03T01:29:35Z] [INFO] Range passed=5 failed=0
[2026-06-03T01:29:35Z] [INFO] Decision passed=5 failed=0
[2026-06-03T01:56:46Z] [INFO] Range passed=5 failed=0
[2026-06-03T01:56:46Z] [INFO] Decision passed=5 failed=0
[2026-06-03T01:58:44Z] [INFO] Range passed=5 failed=0
[2026-06-03T01:58:44Z] [INFO] Decision passed=5 failed=0
[2026-06-03T02:03:53Z] [INFO] Range passed=5 failed=0
[2026-06-03T02:03:53Z] [INFO] Decision passed=5 failed=0
[2026-06-03T02:07:40Z] [INFO] Range passed=5 failed=0
[2026-06-03T02:07:40Z] [INFO] Decision passed=5 failed=0
[2026-06-03T02:19:38Z] [INFO] Range passed=5 failed=0
[2026-06-03T02:19:38Z] [INFO] Decision passed=5 failed=0
[2026-06-03T02:25:47Z] [INFO] Range passed=5 failed=0
[2026-06-03T02:25:47Z] [INFO] Decision passed=5 failed=0
[2026-06-03T02:27:51Z] [INFO] Range passed=5 failed=0
[2026-06-03T02:27:51Z] [INFO] Decision passed=5 failed=0
[2026-06-03T02:34:53Z] [INFO] Range passed=5 failed=0
[2026-06-03T02:34:53Z] [INFO] Decision passed=5 failed=0
[2026-06-03T02:40:22Z] [INFO] Range passed=5 failed=0
[2026-06-03T02:40:22Z] [INFO] Decision passed=5 failed=0
[2026-06-03T02:46:46Z] [INFO] Range passed=5 failed=0
[2026-06-03T02:46:46Z] [INFO] Decision passed=5 failed=0
[2026-06-03T03:01:57Z] [INFO] Range passed=5 failed=0
[2026-06-03T03:01:57Z] [INFO] Decision passed=5 failed=0
[2026-06-03T03:04:23Z] [INFO] Range passed=5 failed=0
[2026-06-03T03:04:23Z] [INFO] Decision passed=5 failed=0
[2026-06-03T03:11:36Z] [INFO] Range passed=5 failed=0
[2026-06-03T03:11:36Z] [INFO] Decision passed=5 failed=0
[2026-06-03T03:14:19Z] [INFO] Range passed=5 failed=0
[2026-06-03T03:14:19Z] [INFO] Decision passed=5 failed=0
[2026-06-03T03:20:22Z] [INFO] Range passed=5 failed=0
[2026-06-03T03:20:22Z] [INFO] Decision passed=5 failed=0
[2026-06-03T03:44:02Z] [INFO] Range passed=5 failed=0
[2026-06-03T03:44:02Z] [INFO] Decision passed=5 failed=0
[2026-06-03T03:52:29Z] [INFO] Range passed=5 failed=0
[2026-06-03T03:52:29Z] [INFO] Decision passed=5 failed=0
[2026-06-03T03:55:18Z] [INFO] Range passed=5 failed=0
[2026-06-03T03:55:18Z] [INFO] Decision passed=5 failed=0
[2026-06-03T04:02:55Z] [INFO] Range passed=5 failed=0
[2026-06-03T04:02:55Z] [INFO] Decision passed=5 failed=0
[2026-06-03T04:11:38Z] [INFO] Range passed=5 failed=0
[2026-06-03T04:11:38Z] [INFO] Decision passed=5 failed=0
[2026-06-03T04:20:42Z] [INFO] Range passed=5 failed=0
[2026-06-03T04:20:42Z] [INFO] Decision passed=5 failed=0
[2026-06-03T04:29:48Z] [INFO] Range passed=5 failed=0
[2026-06-03T04:29:48Z] [INFO] Decision passed=5 failed=0
[2026-06-03T04:46:44Z] [INFO] Range passed=5 failed=0
[2026-06-03T04:46:44Z] [INFO] Decision passed=5 failed=0
[2026-06-03T05:49:41Z] [INFO] Range passed=5 failed=0
[2026-06-03T05:49:41Z] [INFO] Decision passed=5 failed=0
[2026-06-03T06:51:28Z] [INFO] Range passed=5 failed=0
[2026-06-03T06:51:28Z] [INFO] Decision passed=5 failed=0
[2026-06-03T07:13:07Z] [INFO] Range passed=5 failed=0
[2026-06-03T07:13:07Z] [INFO] Decision passed=5 failed=0
[2026-06-03T07:24:50Z] [INFO] Range passed=5 failed=0
[2026-06-03T07:24:50Z] [INFO] Decision passed=5 failed=0
[2026-06-03T07:59:12Z] [INFO] Range passed=4 failed=1
[2026-06-03T07:59:12Z] [INFO] Decision passed=5 failed=0
[2026-06-03T07:59:12Z] [REVIEW] Final: REVIEW
[2026-06-03T08:39:30Z] [INFO] Range passed=4 failed=1
[2026-06-03T08:39:30Z] [INFO] Decision passed=5 failed=0
[2026-06-03T08:39:30Z] [REVIEW] Final: REVIEW
[2026-06-03T08:57:38Z] [INFO] Range passed=4 failed=1
[2026-06-03T08:57:39Z] [INFO] Decision passed=5 failed=0
[2026-06-03T08:57:39Z] [REVIEW] Final: REVIEW
[2026-06-03T09:45:11Z] [INFO] Range passed=4 failed=1
[2026-06-03T09:45:11Z] [INFO] Decision passed=4 failed=1
[2026-06-03T09:45:11Z] [REVIEW] Final: REVIEW
``

### D:\PlexTools\logs\scarflix_v2_concurrent_stream_qa_wrapper_20260603.log
Last write: 06/03/2026 19:45:11
``text
[2026-06-02T22:00:58Z] [INFO] Range passed=5 failed=0
[2026-06-02T22:00:58Z] [INFO] Decision passed=5 failed=0
[2026-06-03T00:57:40Z] [INFO] Range passed=5 failed=0
[2026-06-03T00:57:40Z] [INFO] Decision passed=5 failed=0
[2026-06-03T01:04:30Z] [INFO] Range passed=5 failed=0
[2026-06-03T01:04:30Z] [INFO] Decision passed=5 failed=0
[2026-06-03T01:07:18Z] [INFO] Range passed=5 failed=0
[2026-06-03T01:07:18Z] [INFO] Decision passed=5 failed=0
[2026-06-03T01:10:03Z] [INFO] Range passed=5 failed=0
[2026-06-03T01:10:03Z] [INFO] Decision passed=5 failed=0
[2026-06-03T01:26:43Z] [INFO] Range passed=5 failed=0
[2026-06-03T01:26:43Z] [INFO] Decision passed=5 failed=0
[2026-06-03T01:29:35Z] [INFO] Range passed=5 failed=0
[2026-06-03T01:29:35Z] [INFO] Decision passed=5 failed=0
[2026-06-03T01:56:46Z] [INFO] Range passed=5 failed=0
[2026-06-03T01:56:46Z] [INFO] Decision passed=5 failed=0
[2026-06-03T01:58:44Z] [INFO] Range passed=5 failed=0
[2026-06-03T01:58:44Z] [INFO] Decision passed=5 failed=0
[2026-06-03T02:03:53Z] [INFO] Range passed=5 failed=0
[2026-06-03T02:03:53Z] [INFO] Decision passed=5 failed=0
[2026-06-03T02:07:40Z] [INFO] Range passed=5 failed=0
[2026-06-03T02:07:40Z] [INFO] Decision passed=5 failed=0
[2026-06-03T02:19:38Z] [INFO] Range passed=5 failed=0
[2026-06-03T02:19:38Z] [INFO] Decision passed=5 failed=0
[2026-06-03T02:25:47Z] [INFO] Range passed=5 failed=0
[2026-06-03T02:25:47Z] [INFO] Decision passed=5 failed=0
[2026-06-03T02:27:51Z] [INFO] Range passed=5 failed=0
[2026-06-03T02:27:51Z] [INFO] Decision passed=5 failed=0
[2026-06-03T02:34:53Z] [INFO] Range passed=5 failed=0
[2026-06-03T02:34:53Z] [INFO] Decision passed=5 failed=0
[2026-06-03T02:40:22Z] [INFO] Range passed=5 failed=0
[2026-06-03T02:40:22Z] [INFO] Decision passed=5 failed=0
[2026-06-03T02:46:46Z] [INFO] Range passed=5 failed=0
[2026-06-03T02:46:46Z] [INFO] Decision passed=5 failed=0
[2026-06-03T03:01:57Z] [INFO] Range passed=5 failed=0
[2026-06-03T03:01:57Z] [INFO] Decision passed=5 failed=0
[2026-06-03T03:04:23Z] [INFO] Range passed=5 failed=0
[2026-06-03T03:04:23Z] [INFO] Decision passed=5 failed=0
[2026-06-03T03:11:36Z] [INFO] Range passed=5 failed=0
[2026-06-03T03:11:36Z] [INFO] Decision passed=5 failed=0
[2026-06-03T03:14:19Z] [INFO] Range passed=5 failed=0
[2026-06-03T03:14:19Z] [INFO] Decision passed=5 failed=0
[2026-06-03T03:20:22Z] [INFO] Range passed=5 failed=0
[2026-06-03T03:20:22Z] [INFO] Decision passed=5 failed=0
[2026-06-03T03:44:02Z] [INFO] Range passed=5 failed=0
[2026-06-03T03:44:02Z] [INFO] Decision passed=5 failed=0
[2026-06-03T03:52:29Z] [INFO] Range passed=5 failed=0
[2026-06-03T03:52:29Z] [INFO] Decision passed=5 failed=0
[2026-06-03T03:55:18Z] [INFO] Range passed=5 failed=0
[2026-06-03T03:55:18Z] [INFO] Decision passed=5 failed=0
[2026-06-03T04:02:55Z] [INFO] Range passed=5 failed=0
[2026-06-03T04:02:55Z] [INFO] Decision passed=5 failed=0
[2026-06-03T04:11:38Z] [INFO] Range passed=5 failed=0
[2026-06-03T04:11:38Z] [INFO] Decision passed=5 failed=0
[2026-06-03T04:20:42Z] [INFO] Range passed=5 failed=0
[2026-06-03T04:20:42Z] [INFO] Decision passed=5 failed=0
[2026-06-03T04:29:48Z] [INFO] Range passed=5 failed=0
[2026-06-03T04:29:48Z] [INFO] Decision passed=5 failed=0
[2026-06-03T04:46:44Z] [INFO] Range passed=5 failed=0
[2026-06-03T04:46:44Z] [INFO] Decision passed=5 failed=0
[2026-06-03T05:49:41Z] [INFO] Range passed=5 failed=0
[2026-06-03T05:49:41Z] [INFO] Decision passed=5 failed=0
[2026-06-03T06:51:28Z] [INFO] Range passed=5 failed=0
[2026-06-03T06:51:28Z] [INFO] Decision passed=5 failed=0
[2026-06-03T07:13:07Z] [INFO] Range passed=5 failed=0
[2026-06-03T07:13:07Z] [INFO] Decision passed=5 failed=0
[2026-06-03T07:24:50Z] [INFO] Range passed=5 failed=0
[2026-06-03T07:24:50Z] [INFO] Decision passed=5 failed=0
[2026-06-03T07:59:12Z] [INFO] Range passed=4 failed=1
[2026-06-03T07:59:12Z] [INFO] Decision passed=5 failed=0
[2026-06-03T07:59:12Z] [REVIEW] Final: REVIEW
[2026-06-03T08:39:30Z] [INFO] Range passed=4 failed=1
[2026-06-03T08:39:30Z] [INFO] Decision passed=5 failed=0
[2026-06-03T08:39:30Z] [REVIEW] Final: REVIEW
[2026-06-03T08:57:38Z] [INFO] Range passed=4 failed=1
[2026-06-03T08:57:39Z] [INFO] Decision passed=5 failed=0
[2026-06-03T08:57:39Z] [REVIEW] Final: REVIEW
[2026-06-03T09:45:11Z] [INFO] Range passed=4 failed=1
[2026-06-03T09:45:11Z] [INFO] Decision passed=4 failed=1
[2026-06-03T09:45:11Z] [REVIEW] Final: REVIEW
``

### D:\PlexTools\logs\scarflix_v2_concurrent_stream_qa_node.log
Last write: 06/03/2026 19:45:10
``text
[2026-06-03T07:59:12.503Z] end status=REVIEW range=4/5 decisions=5/5
[2026-06-03T08:39:30.168Z] end status=REVIEW range=4/5 decisions=5/5
[2026-06-03T08:57:38.810Z] end status=REVIEW range=4/5 decisions=5/5
[2026-06-03T09:45:10.994Z] end status=REVIEW range=4/5 decisions=4/5
``

## Recent ScarFLIX logs

### D:\PlexTools\logs\scarflix_v2_compact_status_publisher_last.log
Last write: 06/04/2026 11:13:07
``text
ScarFLIX compact publisher run
Started: 2026-06-04 11:13:02
[2026-06-04 11:13:07] GitHub upload JSON: OK
[2026-06-04 11:13:07] GitHub upload MD: OK
[2026-06-04 11:13:07] GitHub upload Ask: OK
[2026-06-04 11:13:07] GitHub upload HTML: OK
``

### D:\PlexTools\logs\scarflix_v2_health_status_20260604.log
Last write: 06/04/2026 10:27:13
``text
[2026-06-03T21:12:13Z] [INFO] Health status publishing
[2026-06-03T21:17:13Z] [INFO] Health status publishing
[2026-06-03T21:22:13Z] [INFO] Health status publishing
[2026-06-03T21:27:13Z] [INFO] Health status publishing
[2026-06-03T21:32:13Z] [INFO] Health status publishing
[2026-06-03T21:37:13Z] [INFO] Health status publishing
[2026-06-03T21:42:13Z] [INFO] Health status publishing
[2026-06-03T21:47:13Z] [INFO] Health status publishing
[2026-06-03T21:52:13Z] [INFO] Health status publishing
[2026-06-03T21:57:13Z] [INFO] Health status publishing
[2026-06-03T22:02:13Z] [INFO] Health status publishing
[2026-06-03T22:07:13Z] [INFO] Health status publishing
[2026-06-03T22:12:13Z] [INFO] Health status publishing
[2026-06-03T22:17:13Z] [INFO] Health status publishing
[2026-06-03T22:22:13Z] [INFO] Health status publishing
[2026-06-03T22:27:13Z] [INFO] Health status publishing
[2026-06-03T22:32:13Z] [INFO] Health status publishing
[2026-06-03T22:37:13Z] [INFO] Health status publishing
[2026-06-03T22:42:13Z] [INFO] Health status publishing
[2026-06-03T22:47:13Z] [INFO] Health status publishing
[2026-06-03T22:52:13Z] [INFO] Health status publishing
[2026-06-03T22:57:13Z] [INFO] Health status publishing
[2026-06-03T23:02:13Z] [INFO] Health status publishing
[2026-06-03T23:07:13Z] [INFO] Health status publishing
[2026-06-03T23:12:13Z] [INFO] Health status publishing
[2026-06-03T23:17:13Z] [INFO] Health status publishing
[2026-06-03T23:22:13Z] [INFO] Health status publishing
[2026-06-03T23:27:13Z] [INFO] Health status publishing
[2026-06-03T23:32:13Z] [INFO] Health status publishing
[2026-06-03T23:37:13Z] [INFO] Health status publishing
[2026-06-03T23:42:13Z] [INFO] Health status publishing
[2026-06-03T23:47:13Z] [INFO] Health status publishing
[2026-06-03T23:52:13Z] [INFO] Health status publishing
[2026-06-03T23:57:13Z] [INFO] Health status publishing
[2026-06-04T00:02:13Z] [INFO] Health status publishing
[2026-06-04T00:07:13Z] [INFO] Health status publishing
[2026-06-04T00:12:13Z] [INFO] Health status publishing
[2026-06-04T00:17:13Z] [INFO] Health status publishing
[2026-06-04T00:22:13Z] [INFO] Health status publishing
[2026-06-04T00:27:13Z] [INFO] Health status publishing
``

### D:\PlexTools\logs\scarflix_v2_live_dashboard_watchdog.log
Last write: 06/04/2026 10:27:02
``text
2026-06-04 09:37:10 Dashboard server already running.
2026-06-04 09:38:09 Dashboard server already running.
2026-06-04 09:39:09 Dashboard server already running.
2026-06-04 09:40:09 Dashboard server already running.
2026-06-04 09:41:06 Dashboard server already running.
2026-06-04 09:42:05 Dashboard server already running.
2026-06-04 09:43:06 Dashboard server already running.
2026-06-04 09:44:07 Dashboard server already running.
2026-06-04 09:45:04 Dashboard server already running.
2026-06-04 09:46:08 Dashboard server already running.
2026-06-04 09:47:06 Dashboard server already running.
2026-06-04 09:48:09 Dashboard server already running.
2026-06-04 09:49:06 Dashboard server already running.
2026-06-04 09:50:11 Dashboard server already running.
2026-06-04 09:51:09 Dashboard server already running.
2026-06-04 09:52:06 Dashboard server already running.
2026-06-04 09:53:09 Dashboard server already running.
2026-06-04 09:54:06 Dashboard server already running.
2026-06-04 09:55:06 Dashboard server already running.
2026-06-04 09:56:06 Dashboard server already running.
2026-06-04 09:59:46 Dashboard server already running.
2026-06-04 10:00:57 Dashboard server already running.
2026-06-04 10:03:55 Dashboard server already running.
2026-06-04 10:07:29 Dashboard server already running.
2026-06-04 10:09:20 Dashboard server already running.
2026-06-04 10:10:10 Dashboard server already running.
2026-06-04 10:11:04 Dashboard server already running.
2026-06-04 10:12:04 Dashboard server already running.
2026-06-04 10:17:09 Dashboard server not running. Starting.
2026-06-04 10:17:09 Dashboard server not running. Starting.
2026-06-04 10:18:02 Dashboard server already running.
2026-06-04 10:19:02 Dashboard server already running.
2026-06-04 10:20:02 Dashboard server already running.
2026-06-04 10:21:02 Dashboard server already running.
2026-06-04 10:22:02 Dashboard server already running.
2026-06-04 10:23:02 Dashboard server already running.
2026-06-04 10:24:02 Dashboard server already running.
2026-06-04 10:25:02 Dashboard server already running.
2026-06-04 10:26:02 Dashboard server already running.
2026-06-04 10:27:02 Dashboard server already running.
``
