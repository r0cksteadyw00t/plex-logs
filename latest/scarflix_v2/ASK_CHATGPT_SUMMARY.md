ScarFLIX v2 QA policy audit for ChatGPT.

Generated: 2026-06-04 13:41:11
Signal: QA_AUDIT_READY
No Codex used. No restart. No catalogue change. No expansion.

Purpose: classify whether the current blocker is WebDAV source availability, Plex transcoder/HLS probe behaviour, or stale runner state.

## WebDAV ActiveGate

### D:\PlexTools\logs\scarflix_v2_webdav_active_gate_20260604.log
LastWrite: 06/04/2026 09:04:13
- [2026-06-03T23:01:53Z] [INFO] WebDAV active gate starting MaxItems=0 Retries=1 PruneFailed=False VisibleOnly=False
- [2026-06-03T23:04:13Z] [INFO] Concurrent worker complete checked=78 passed=71 failed=7
- [2026-06-03T23:04:13Z] [REVIEW] WebDAV active gate finished status=REVIEW checked=78 passed=71 failed_detected=7 pruned=0

### D:\PlexTools\logs\scarflix_v2_webdav_active_gate_20260603.log
LastWrite: 06/03/2026 19:13:59
- [2026-06-03T03:07:12Z] [INFO] WebDAV active gate starting MaxItems=0 Retries=1 PruneFailed=True VisibleOnly=False
- [2026-06-03T03:07:12Z] [REVIEW] WebDAV active gate finished status=REVIEW checked=0 passed=0 failed_detected=0 pruned=0
- [2026-06-03T03:10:17Z] [INFO] WebDAV active gate starting MaxItems=0 Retries=1 PruneFailed=False VisibleOnly=False
- [2026-06-03T03:11:14Z] [INFO] Concurrent worker complete checked=62 passed=62 failed=0
- [2026-06-03T03:11:14Z] [PASS] WebDAV active gate finished status=PASS checked=62 passed=62 failed_detected=0 pruned=0
- [2026-06-03T03:12:13Z] [INFO] WebDAV active gate starting MaxItems=0 Retries=1 PruneFailed=False VisibleOnly=False
- [2026-06-03T03:13:10Z] [INFO] Concurrent worker complete checked=62 passed=62 failed=0
- [2026-06-03T03:13:10Z] [PASS] WebDAV active gate finished status=PASS checked=62 passed=62 failed_detected=0 pruned=0
- [2026-06-03T03:15:32Z] [INFO] WebDAV active gate starting MaxItems=0 Retries=1 PruneFailed=True VisibleOnly=True
- [2026-06-03T03:16:30Z] [INFO] Concurrent worker complete checked=62 passed=62 failed=0
- [2026-06-03T03:16:30Z] [PASS] WebDAV active gate finished status=PASS checked=62 passed=62 failed_detected=0 pruned=0
- [2026-06-03T03:18:57Z] [INFO] WebDAV active gate starting MaxItems=0 Retries=1 PruneFailed=False VisibleOnly=False
- [2026-06-03T03:19:59Z] [INFO] Concurrent worker complete checked=62 passed=62 failed=0
- [2026-06-03T03:19:59Z] [PASS] WebDAV active gate finished status=PASS checked=62 passed=62 failed_detected=0 pruned=0
- [2026-06-03T03:38:48Z] [INFO] WebDAV active gate starting MaxItems=0 Retries=1 PruneFailed=True VisibleOnly=False
- [2026-06-03T03:38:53Z] [INFO] Concurrent worker complete checked=6 passed=6 failed=0
- [2026-06-03T03:38:54Z] [PASS] WebDAV active gate finished status=PASS checked=6 passed=6 failed_detected=0 pruned=0
- [2026-06-03T03:42:41Z] [INFO] WebDAV active gate starting MaxItems=0 Retries=1 PruneFailed=False VisibleOnly=False
- [2026-06-03T03:43:41Z] [INFO] Concurrent worker complete checked=63 passed=63 failed=0
- [2026-06-03T03:43:41Z] [PASS] WebDAV active gate finished status=PASS checked=63 passed=63 failed_detected=0 pruned=0
- [2026-06-03T03:46:36Z] [INFO] WebDAV active gate starting MaxItems=0 Retries=1 PruneFailed=True VisibleOnly=False
- [2026-06-03T03:46:42Z] [INFO] Concurrent worker complete checked=5 passed=5 failed=0
- [2026-06-03T03:46:42Z] [PASS] WebDAV active gate finished status=PASS checked=5 passed=5 failed_detected=0 pruned=0
- [2026-06-03T03:50:51Z] [INFO] WebDAV active gate starting MaxItems=0 Retries=1 PruneFailed=False VisibleOnly=False
- [2026-06-03T03:51:58Z] [INFO] Concurrent worker complete checked=67 passed=67 failed=0
- [2026-06-03T03:51:58Z] [PASS] WebDAV active gate finished status=PASS checked=67 passed=67 failed_detected=0 pruned=0
- [2026-06-03T03:53:05Z] [INFO] WebDAV active gate starting MaxItems=0 Retries=1 PruneFailed=False VisibleOnly=False
- [2026-06-03T03:54:08Z] [INFO] Concurrent worker complete checked=67 passed=67 failed=0
- [2026-06-03T03:54:08Z] [PASS] WebDAV active gate finished status=PASS checked=67 passed=67 failed_detected=0 pruned=0
- [2026-06-03T03:59:29Z] [INFO] WebDAV active gate starting MaxItems=0 Retries=1 PruneFailed=False VisibleOnly=False
- [2026-06-03T04:00:33Z] [INFO] Concurrent worker complete checked=67 passed=67 failed=0
- [2026-06-03T04:00:33Z] [PASS] WebDAV active gate finished status=PASS checked=67 passed=67 failed_detected=0 pruned=0
- [2026-06-03T04:05:36Z] [INFO] WebDAV active gate starting MaxItems=0 Retries=1 PruneFailed=True VisibleOnly=False
- [2026-06-03T04:05:40Z] [INFO] Concurrent worker complete checked=3 passed=3 failed=0
- [2026-06-03T04:05:40Z] [PASS] WebDAV active gate finished status=PASS checked=3 passed=3 failed_detected=0 pruned=0
- [2026-06-03T04:10:08Z] [INFO] WebDAV active gate starting MaxItems=0 Retries=1 PruneFailed=False VisibleOnly=False
- [2026-06-03T04:11:12Z] [INFO] Concurrent worker complete checked=69 passed=69 failed=0
- [2026-06-03T04:11:12Z] [PASS] WebDAV active gate finished status=PASS checked=69 passed=69 failed_detected=0 pruned=0
- [2026-06-03T04:14:37Z] [INFO] WebDAV active gate starting MaxItems=0 Retries=1 PruneFailed=True VisibleOnly=False
- [2026-06-03T04:14:41Z] [INFO] Concurrent worker complete checked=3 passed=3 failed=0
- [2026-06-03T04:14:41Z] [PASS] WebDAV active gate finished status=PASS checked=3 passed=3 failed_detected=0 pruned=0
- [2026-06-03T04:19:08Z] [INFO] WebDAV active gate starting MaxItems=0 Retries=1 PruneFailed=False VisibleOnly=False
- [2026-06-03T04:20:18Z] [INFO] Concurrent worker complete checked=71 passed=71 failed=0
- [2026-06-03T04:20:18Z] [PASS] WebDAV active gate finished status=PASS checked=71 passed=71 failed_detected=0 pruned=0
- [2026-06-03T04:23:32Z] [INFO] WebDAV active gate starting MaxItems=0 Retries=1 PruneFailed=True VisibleOnly=False
- [2026-06-03T04:23:35Z] [INFO] Concurrent worker complete checked=3 passed=3 failed=0
- [2026-06-03T04:23:35Z] [PASS] WebDAV active gate finished status=PASS checked=3 passed=3 failed_detected=0 pruned=0
- [2026-06-03T04:28:16Z] [INFO] WebDAV active gate starting MaxItems=0 Retries=1 PruneFailed=False VisibleOnly=False
- [2026-06-03T04:29:25Z] [INFO] Concurrent worker complete checked=73 passed=73 failed=0
- [2026-06-03T04:29:25Z] [PASS] WebDAV active gate finished status=PASS checked=73 passed=73 failed_detected=0 pruned=0
- [2026-06-03T04:39:58Z] [INFO] WebDAV active gate starting MaxItems=0 Retries=1 PruneFailed=True VisibleOnly=False
- [2026-06-03T04:40:05Z] [INFO] Concurrent worker complete checked=5 passed=5 failed=0
- [2026-06-03T04:40:05Z] [PASS] WebDAV active gate finished status=PASS checked=5 passed=5 failed_detected=0 pruned=0
- [2026-06-03T04:44:58Z] [INFO] WebDAV active gate starting MaxItems=0 Retries=1 PruneFailed=False VisibleOnly=False
- [2026-06-03T04:46:17Z] [INFO] Concurrent worker complete checked=78 passed=78 failed=0
- [2026-06-03T04:46:17Z] [PASS] WebDAV active gate finished status=PASS checked=78 passed=78 failed_detected=0 pruned=0
- [2026-06-03T05:46:53Z] [INFO] WebDAV active gate starting MaxItems=0 Retries=1 PruneFailed=False VisibleOnly=False
- [2026-06-03T05:48:21Z] [INFO] Concurrent worker complete checked=78 passed=77 failed=1
- [2026-06-03T05:48:21Z] [REVIEW] WebDAV active gate finished status=REVIEW checked=78 passed=77 failed_detected=1 pruned=0
- [2026-06-03T06:43:24Z] [INFO] WebDAV active gate starting MaxItems=0 Retries=1 PruneFailed=False VisibleOnly=False
- [2026-06-03T06:44:39Z] [INFO] Concurrent worker complete checked=78 passed=76 failed=2
- [2026-06-03T06:44:39Z] [REVIEW] WebDAV active gate finished status=REVIEW checked=78 passed=76 failed_detected=2 pruned=0
- [2026-06-03T06:53:26Z] [INFO] WebDAV active gate starting MaxItems=0 Retries=1 PruneFailed=False VisibleOnly=False
- [2026-06-03T06:54:38Z] [INFO] Concurrent worker complete checked=78 passed=76 failed=2
- [2026-06-03T06:54:38Z] [REVIEW] WebDAV active gate finished status=REVIEW checked=78 passed=76 failed_detected=2 pruned=0
- [2026-06-03T07:15:24Z] [INFO] WebDAV active gate starting MaxItems=0 Retries=1 PruneFailed=False VisibleOnly=False
- [2026-06-03T07:16:44Z] [INFO] Concurrent worker complete checked=78 passed=76 failed=2
- [2026-06-03T07:16:44Z] [REVIEW] WebDAV active gate finished status=REVIEW checked=78 passed=76 failed_detected=2 pruned=0
- [2026-06-03T07:26:29Z] [INFO] WebDAV active gate starting MaxItems=0 Retries=1 PruneFailed=False VisibleOnly=False
- [2026-06-03T07:29:13Z] [INFO] Concurrent worker complete checked=78 passed=72 failed=6
- [2026-06-03T07:29:14Z] [REVIEW] WebDAV active gate finished status=REVIEW checked=78 passed=72 failed_detected=6 pruned=0
- [2026-06-03T08:12:26Z] [INFO] WebDAV active gate starting MaxItems=0 Retries=1 PruneFailed=False VisibleOnly=False
- [2026-06-03T08:14:09Z] [INFO] Concurrent worker complete checked=78 passed=75 failed=3
- [2026-06-03T08:14:09Z] [REVIEW] WebDAV active gate finished status=REVIEW checked=78 passed=75 failed_detected=3 pruned=0
- [2026-06-03T08:42:23Z] [INFO] WebDAV active gate starting MaxItems=0 Retries=1 PruneFailed=False VisibleOnly=False
- [2026-06-03T08:43:42Z] [INFO] Concurrent worker complete checked=78 passed=75 failed=3
- [2026-06-03T08:43:42Z] [REVIEW] WebDAV active gate finished status=REVIEW checked=78 passed=75 failed_detected=3 pruned=0
- [2026-06-03T09:12:29Z] [INFO] WebDAV active gate starting MaxItems=0 Retries=1 PruneFailed=False VisibleOnly=False
- [2026-06-03T09:13:59Z] [INFO] Concurrent worker complete checked=78 passed=75 failed=3
- [2026-06-03T09:13:59Z] [REVIEW] WebDAV active gate finished status=REVIEW checked=78 passed=75 failed_detected=3 pruned=0

## PlatformGate

### D:\PlexTools\logs\scarflix_v2_platform_gate_20260604.log
LastWrite: 06/04/2026 09:04:13
- [2026-06-03T23:04:13Z] [REVIEW] active_gate did not pass; exit=1

### D:\PlexTools\logs\scarflix_v2_platform_gate_local_runner_20260604.log
LastWrite: 06/04/2026 09:01:36
- No matching failure lines found.

## Visible Catalog QA

### D:\PlexTools\logs\scarflix_v2_visible_catalog_qa_20260604.log
LastWrite: 06/04/2026 10:12:12
- [2026-06-03T23:04:13Z] [INFO] Visible catalog QA starting MaxItems=0 HideFailed=False
- [2026-06-03T23:14:54Z] [REVIEW] QA failed: part=111244 title=The Devil Wears Prada reason=Plex Transcoder HLS probe timed out
- [2026-06-03T23:21:54Z] [REVIEW] QA failed: part=111277 title=The Dark Knight reason=Plex Transcoder HLS probe timed out
- [2026-06-03T23:27:09Z] [REVIEW] QA failed: part=111282 title=Spirited Away reason=Plex Transcoder HLS probe timed out
- [2026-06-03T23:37:28Z] [REVIEW] QA failed: part=111460 title=Star Wars: Episode IV -- A New Hope reason=Plex Transcoder HLS probe timed out
- [2026-06-03T23:41:14Z] [REVIEW] QA failed: part=111468 title=Pulp Fiction reason=Plex Transcoder HLS probe did not produce valid output
- [2026-06-03T23:44:18Z] [REVIEW] QA failed: part=111747 title=Harry Potter and the Prisoner of Azkaban reason=Plex Transcoder HLS probe timed out
- [2026-06-03T23:46:31Z] [REVIEW] QA failed: part=111899 title=Pirates of the Caribbean: Dead Man's Chest reason=Plex Transcoder HLS probe timed out
- [2026-06-03T23:50:55Z] [REVIEW] QA failed: part=111965 title=GOAT reason=Plex Transcoder HLS probe timed out
- [2026-06-03T23:54:54Z] [REVIEW] QA failed: part=111966 title=Forrest Gump reason=Plex Transcoder HLS probe timed out
- [2026-06-03T23:57:45Z] [REVIEW] QA failed: part=111981 title=Dune: Part One reason=Plex Transcoder HLS probe timed out
- [2026-06-04T00:02:12Z] [REVIEW] QA failed: part=111992 title=Coraline reason=Plex Transcoder HLS probe timed out
- [2026-06-04T00:08:15Z] [REVIEW] QA failed: part=112017 title=Coco reason=Plex Transcoder HLS probe timed out
- [2026-06-04T00:12:12Z] [REVIEW] QA failed: part=112087 title=The Lord of the Rings: The Two Towers reason=Plex Transcoder HLS probe did not produce valid output

### D:\PlexTools\logs\scarflix_v2_visible_catalog_qa_20260603.log
LastWrite: 06/03/2026 19:16:29
- [2026-06-03T08:43:43Z] [INFO] Visible catalog QA starting MaxItems=0 HideFailed=False
- [2026-06-03T08:46:24Z] [REVIEW] QA failed: part=111244 title=The Devil Wears Prada reason=Plex Transcoder HLS probe timed out
- [2026-06-03T09:14:03Z] [INFO] Visible catalog QA starting MaxItems=0 HideFailed=False
- [2026-06-03T09:15:49Z] [REVIEW] QA failed: part=111244 title=The Devil Wears Prada reason=Plex Transcoder HLS probe timed out

## Plex Client Decision QA

### D:\PlexTools\logs\scarflix_v2_plex_client_decision_qa_20260603.log
LastWrite: 06/03/2026 19:44:43
- [2026-06-03T08:29:39Z] [REVIEW] Decision failed: metadata=40387 title=The Devil Wears Prada reason=The operation has timed out.
- [2026-06-03T08:31:11Z] [REVIEW] Decision failed: metadata=41192 title=The Gangster, the Cop, the Devil reason=The operation has timed out.
- [2026-06-03T08:32:43Z] [REVIEW] Decision failed: metadata=41147 title=The Godfather reason=The operation has timed out.
- [2026-06-03T08:34:15Z] [REVIEW] Decision failed: metadata=41040 title=The Godfather Part II reason=The operation has timed out.
- [2026-06-03T08:35:47Z] [REVIEW] Decision failed: metadata=41148 title=The Good, the Bad and the Ugly reason=The operation has timed out.
- [2026-06-03T08:55:59Z] [INFO] Plex client decision QA starting MaxItems=0 TimeoutSeconds=45 Retries=1
- [2026-06-03T09:18:43Z] [INFO] Plex client decision QA starting MaxItems=0 TimeoutSeconds=45 Retries=1
- [2026-06-03T09:38:53Z] [REVIEW] Decision failed: metadata=41081 title=The Sopranos reason=The operation has timed out.
- [2026-06-03T09:44:43Z] [REVIEW] Decision failed: metadata=41103 title=Yankee White reason=The operation has timed out.

### D:\PlexTools\logs\scarflix_v2_plex_client_decision_qa_20260602.log
LastWrite: 06/02/2026 23:23:24
- [2026-06-02T13:19:22Z] [INFO] Plex client decision QA starting MaxItems=0 TimeoutSeconds=45 Retries=1
- [2026-06-02T13:21:24Z] [INFO] Plex client decision QA starting MaxItems=0 TimeoutSeconds=45 Retries=1
- [2026-06-02T13:23:07Z] [INFO] Plex client decision QA starting MaxItems=0 TimeoutSeconds=45 Retries=1

## Concurrent Stream QA

### D:\PlexTools\logs\scarflix_v2_concurrent_stream_qa_wrapper_20260603.log
LastWrite: 06/03/2026 19:45:11
- [2026-06-02T22:00:58Z] [INFO] Range passed=5 failed=0
- [2026-06-02T22:00:58Z] [INFO] Decision passed=5 failed=0
- [2026-06-03T00:57:40Z] [INFO] Range passed=5 failed=0
- [2026-06-03T00:57:40Z] [INFO] Decision passed=5 failed=0
- [2026-06-03T01:04:30Z] [INFO] Range passed=5 failed=0
- [2026-06-03T01:04:30Z] [INFO] Decision passed=5 failed=0
- [2026-06-03T01:07:18Z] [INFO] Range passed=5 failed=0
- [2026-06-03T01:07:18Z] [INFO] Decision passed=5 failed=0
- [2026-06-03T01:10:03Z] [INFO] Range passed=5 failed=0
- [2026-06-03T01:10:03Z] [INFO] Decision passed=5 failed=0
- [2026-06-03T01:26:43Z] [INFO] Range passed=5 failed=0
- [2026-06-03T01:26:43Z] [INFO] Decision passed=5 failed=0
- [2026-06-03T01:29:35Z] [INFO] Range passed=5 failed=0
- [2026-06-03T01:29:35Z] [INFO] Decision passed=5 failed=0
- [2026-06-03T01:56:46Z] [INFO] Range passed=5 failed=0
- [2026-06-03T01:56:46Z] [INFO] Decision passed=5 failed=0
- [2026-06-03T01:58:44Z] [INFO] Range passed=5 failed=0
- [2026-06-03T01:58:44Z] [INFO] Decision passed=5 failed=0
- [2026-06-03T02:03:53Z] [INFO] Range passed=5 failed=0
- [2026-06-03T02:03:53Z] [INFO] Decision passed=5 failed=0
- [2026-06-03T02:07:40Z] [INFO] Range passed=5 failed=0
- [2026-06-03T02:07:40Z] [INFO] Decision passed=5 failed=0
- [2026-06-03T02:19:38Z] [INFO] Range passed=5 failed=0
- [2026-06-03T02:19:38Z] [INFO] Decision passed=5 failed=0
- [2026-06-03T02:25:47Z] [INFO] Range passed=5 failed=0
- [2026-06-03T02:25:47Z] [INFO] Decision passed=5 failed=0
- [2026-06-03T02:27:51Z] [INFO] Range passed=5 failed=0
- [2026-06-03T02:27:51Z] [INFO] Decision passed=5 failed=0
- [2026-06-03T02:34:53Z] [INFO] Range passed=5 failed=0
- [2026-06-03T02:34:53Z] [INFO] Decision passed=5 failed=0
- [2026-06-03T02:40:22Z] [INFO] Range passed=5 failed=0
- [2026-06-03T02:40:22Z] [INFO] Decision passed=5 failed=0
- [2026-06-03T02:46:46Z] [INFO] Range passed=5 failed=0
- [2026-06-03T02:46:46Z] [INFO] Decision passed=5 failed=0
- [2026-06-03T03:01:57Z] [INFO] Range passed=5 failed=0
- [2026-06-03T03:01:57Z] [INFO] Decision passed=5 failed=0
- [2026-06-03T03:04:23Z] [INFO] Range passed=5 failed=0
- [2026-06-03T03:04:23Z] [INFO] Decision passed=5 failed=0
- [2026-06-03T03:11:36Z] [INFO] Range passed=5 failed=0
- [2026-06-03T03:11:36Z] [INFO] Decision passed=5 failed=0
- [2026-06-03T03:14:19Z] [INFO] Range passed=5 failed=0
- [2026-06-03T03:14:19Z] [INFO] Decision passed=5 failed=0
- [2026-06-03T03:20:22Z] [INFO] Range passed=5 failed=0
- [2026-06-03T03:20:22Z] [INFO] Decision passed=5 failed=0
- [2026-06-03T03:44:02Z] [INFO] Range passed=5 failed=0
- [2026-06-03T03:44:02Z] [INFO] Decision passed=5 failed=0
- [2026-06-03T03:52:29Z] [INFO] Range passed=5 failed=0
- [2026-06-03T03:52:29Z] [INFO] Decision passed=5 failed=0
- [2026-06-03T03:55:18Z] [INFO] Range passed=5 failed=0
- [2026-06-03T03:55:18Z] [INFO] Decision passed=5 failed=0
- [2026-06-03T04:02:55Z] [INFO] Range passed=5 failed=0
- [2026-06-03T04:02:55Z] [INFO] Decision passed=5 failed=0
- [2026-06-03T04:11:38Z] [INFO] Range passed=5 failed=0
- [2026-06-03T04:11:38Z] [INFO] Decision passed=5 failed=0
- [2026-06-03T04:20:42Z] [INFO] Range passed=5 failed=0
- [2026-06-03T04:20:42Z] [INFO] Decision passed=5 failed=0
- [2026-06-03T04:29:48Z] [INFO] Range passed=5 failed=0
- [2026-06-03T04:29:48Z] [INFO] Decision passed=5 failed=0
- [2026-06-03T04:46:44Z] [INFO] Range passed=5 failed=0
- [2026-06-03T04:46:44Z] [INFO] Decision passed=5 failed=0
- [2026-06-03T05:49:41Z] [INFO] Range passed=5 failed=0
- [2026-06-03T05:49:41Z] [INFO] Decision passed=5 failed=0
- [2026-06-03T06:51:28Z] [INFO] Range passed=5 failed=0
- [2026-06-03T06:51:28Z] [INFO] Decision passed=5 failed=0
- [2026-06-03T07:13:07Z] [INFO] Range passed=5 failed=0
- [2026-06-03T07:13:07Z] [INFO] Decision passed=5 failed=0
- [2026-06-03T07:24:50Z] [INFO] Range passed=5 failed=0
- [2026-06-03T07:24:50Z] [INFO] Decision passed=5 failed=0
- [2026-06-03T07:59:12Z] [INFO] Range passed=4 failed=1
- [2026-06-03T07:59:12Z] [INFO] Decision passed=5 failed=0
- [2026-06-03T07:59:12Z] [REVIEW] Final: REVIEW
- [2026-06-03T08:39:30Z] [INFO] Range passed=4 failed=1
- [2026-06-03T08:39:30Z] [INFO] Decision passed=5 failed=0
- [2026-06-03T08:39:30Z] [REVIEW] Final: REVIEW
- [2026-06-03T08:57:38Z] [INFO] Range passed=4 failed=1
- [2026-06-03T08:57:39Z] [INFO] Decision passed=5 failed=0
- [2026-06-03T08:57:39Z] [REVIEW] Final: REVIEW
- [2026-06-03T09:45:11Z] [INFO] Range passed=4 failed=1
- [2026-06-03T09:45:11Z] [INFO] Decision passed=4 failed=1
- [2026-06-03T09:45:11Z] [REVIEW] Final: REVIEW

### D:\PlexTools\logs\scarflix_v2_concurrent_stream_qa_node.log
LastWrite: 06/03/2026 19:45:10
- [2026-06-03T07:59:12.503Z] end status=REVIEW range=4/5 decisions=5/5
- [2026-06-03T08:39:30.168Z] end status=REVIEW range=4/5 decisions=5/5
- [2026-06-03T08:57:38.810Z] end status=REVIEW range=4/5 decisions=5/5
- [2026-06-03T09:45:10.994Z] end status=REVIEW range=4/5 decisions=4/5
