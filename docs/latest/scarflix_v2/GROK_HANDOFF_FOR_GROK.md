### FORENSIC HANDOFF FOR GROK

**Trigger Reason:**  
End-to-end path visibility decision for Materialized QA incident `INC-MQA-HYBRID-MOVIES-LIVE-TIMEOUT-20260610`.

**Current State Summary:**  
- Phase: Phase 5 controlled prep; publication held.
- Orchestrator: PASS after restart; degraded mode false.
- Sentinel: PASS/LOW at latest checked public status.
- Publication safety: `PAUSE_PUBLICATION=true`; no expansion or publication started.
- Materialized QA: REVIEW, checked 229, passed 119, failed 110, timeout failures 106.
- Incident status: ACTIVE_DIAGNOSE.
- Chosen path strategy: Strategy A - metadata-first Orchestrator service context plus tightly bounded user-context probe for high-value samples only.

**What I have already tried:**  
- Confirmed service-context root cause: `D:\StremioCatalog` materialized `ScarFLIX_part-*` entries are directory symlinks into `S:\media\ScarFLIX_part-*`.
- Confirmed the Orchestrator service context reports as `MEDIASERVER$` / service namespace, while the rclone `S:` mount is maintained in user `jason` context.
- Added metadata-first path resolver and hardened the service-context incident probe so it uses `lstat`, `readlink`, and `webdav_map.json` before target following.
- Ran service-context validation: 20/20 paths classified as `service_context_symlink_target_mount_inaccessible`, not as bad catalogue rows.
- Added `D:\PlexTools\Foundry\workers\JasonOS_Prime_UserContextMaterializedQaTinyProbe.js`.
- Added hidden launcher `D:\PlexTools\Scripts\scarflix_v2\hidden_tasks\JasonOS_Prime_UserContextMaterializedQaTinyProbe.vbs`.
- Registered on-demand task `JasonOS_Prime_UserContextMaterializedQaTinyProbe` under user `jason` with no recurring trigger.
- Ran one tiny user-context diagnostic sample only: 8 paths, max concurrency 1, no read-head, no cleanup, no publication, no source mutation.

**My hypothesis on root cause:**  
The original Materialized QA timeout cluster is no longer plausibly explained by missing files for the sampled rows. The user-context probe successfully followed the materialized symlinks and statted `stream.mkv` for all 8 sampled hybrid movie live timeout rows. Remaining QA REVIEW is more likely Plex decision/indexing/load timing, or a Plex decision-layer timeout pattern, than missing materialized files.

**Diagnostic Results:**  
- Tiny probe status: `PASS_TINY_USER_CONTEXT_PROBE_COMPLETE`.
- Sampled paths: 8.
- Successful target stats: 8.
- Timeout count: 0.
- Layer count: `user_context_target_stat_ok=8`.
- Sample titles: Nine 1/2 Weeks, Annabelle, Anna, Annihilation, Armageddon, Battleship, Crank, Creed.

**Proposed next steps:**  
1. Keep `PAUSE_PUBLICATION` active.
2. Keep Strategy A as the long-term path model for this incident.
3. Do not attempt service/system rclone mount changes unless a separate approved infrastructure change is opened.
4. Run only a tiny bounded Plex decision/indexing timing diagnostic against the already-confirmed sample, or wait for Grok to recommend a narrower timing probe.
5. Do not resume controlled expansion until Materialized QA returns to PASS or a reviewed mitigation plan is accepted.

**Data/files to review:**  
- `D:\PlexTools\Foundry\lib\JasonOS_Prime_PathResolver.js`
- `D:\PlexTools\Foundry\workers\JasonOS_Prime_MaterializedQaIncidentProbe.js`
- `D:\PlexTools\Foundry\workers\JasonOS_Prime_UserContextMaterializedQaTinyProbe.js`
- `D:\PlexTools\public\latest\scarflix_v2\jasonos_prime_materialized_qa_user_context_probe.json`
- `D:\PlexTools\public\latest\scarflix_v2\jasonos_prime_autonomous_incidents.json`
- `D:\PlexTools\public\latest\scarflix_v2\ORCHESTRATOR_GROK_CYCLE_REPORT_DIFF.json`
- `C:\Users\jason\OneDrive\Documents\Plex Project\PROJECT_PLAN.md`
- `C:\Users\jason\OneDrive\Documents\Plex Project\TASKS.md`
