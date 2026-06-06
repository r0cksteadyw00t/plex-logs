# Grok Peer Review Pack - ScarFLIX v2 PlatformGate Stale Loop

Updated UTC: 2026-06-06T11:19:00Z

## Reason For Peer Review

The self-healing layer is detecting and attempting recovery, but the same PlatformGate stale checkpoint loop repeated twice after the Node sentinel fix.

Recovery launches succeed, but `platform_gate_checkpoint.json` does not advance.

## Current Snapshot

- Sentinel: `REVIEW` / `MEDIUM`
- Sentinel repeat count: `2`
- Jason action required: `false`
- Codex action required: `false`
- Controller: `RUNNING`
- Controller milestone: `PLATFORM_GATE_RUNNING`
- Controller step: `PLATFORM_GATE_CHILD_ACTIVE`
- PlatformGate checkpoint: `RUNNING`
- PlatformGate step: `running_platform_gate_attempt_1`
- PlatformGate last progress UTC: `2026-06-06T11:06:11Z`
- ActiveGate: `REVIEW`
- Transient failures: `8`
- Prunable failures: `0`

## Exact Loop

1. Sentinel sees PlatformGate checkpoint stale beyond 5 minutes.
2. Sentinel launches watchdog, controller, and detached PlatformGate runner.
3. All detached launches report `PASS`.
4. Controller reports `PLATFORM_GATE_CHILD_ACTIVE`.
5. PlatformGate checkpoint remains `RUNNING / running_platform_gate_attempt_1`.
6. `last_progress_utc` does not advance.
7. The same recovery signature repeats.

## Key Files

```text
D:\PlexTools\public\latest\scarflix_v2\jasonos_prime_sentinel_status.json
D:\PlexTools\public\latest\scarflix_v2\autonomous_controller_status.json
D:\PlexTools\public\latest\scarflix_v2\platform_gate_checkpoint.json
D:\PlexTools\public\latest\scarflix\webdav_active_gate_status.json
D:\PlexTools\logs\scarflix_v2_platform_gate_local_runner_20260606.log
D:\PlexTools\logs\scarflix_v2_autonomous_controller_20260606.log
D:\PlexTools\logs\jasonos_prime_sentinel_node.log
```

## Peer Review Questions

1. Is the controller/watchdog/runner model creating overlapping child states where `PLATFORM_GATE_CHILD_ACTIVE` appears healthy while checkpoint progress is frozen?
2. Should PlatformGate expose a live heartbeat file updated by every QA sub-stage?
3. Should stale recovery kill known orphaned PlatformGate child processes before relaunch?
4. Should this be collapsed into one durable local state machine with one lock owner and child PID tracking?
5. Should transient WebDAV/source failures be moved out of PlatformGate into source-level retry/quarantine so platform health can PASS independently?

## Proposed Direction

Replace the current multi-task PlatformGate orchestration with one durable local runner:

- one lock owner,
- one heartbeat file,
- explicit child PID tracking,
- bounded orphan-child kill/relaunch,
- separate transient-source retry queue from platform-health gate.
