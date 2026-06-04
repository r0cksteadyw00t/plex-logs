# ScarFLIX Foundry Phase 1 runner false-positive fix

Generated: 2026-06-04 19:13:54

Issue fixed: watchdog was falsely treating tiproxy_run.cmd as GitHub runner because it matched run.cmd.

## Runner processes
``text
ProcessId   : 19348
Name        : cmd.exe
CommandLine : "C:\Windows\system32\cmd.exe" /c cd /d D:\PlexTools\actions-runner && run.cmd 

ProcessId   : 30748
Name        : Runner.Listener.exe
CommandLine : "D:\PlexTools\actions-runner\\bin\Runner.Listener.exe"  run 

ProcessId   : 4324
Name        : Runner.Worker.exe
CommandLine : "D:\PlexTools\actions-runner\bin\Runner.Worker.exe" spawnclient 2332 2320

ProcessId   : 35156
Name        : powershell.exe
CommandLine : "C:\Windows\System32\WindowsPowerShell\v1.0\powershell.EXE" -command ". 'D:\PlexTools\actions-runner\_work\_temp\f879b0e7-4387-4240-82a4-d073adeb90de.ps1'"
``

## Watchdog tail
``text
[2026-06-04 18:42:28] Runner already active: 1
[2026-06-04 18:42:28] Runner already active: 1
[2026-06-04 18:43:02] Runner already active: 1
[2026-06-04 18:44:02] Runner already active: 1
[2026-06-04 18:45:02] Runner already active: 1
[2026-06-04 18:46:02] Runner already active: 1
[2026-06-04 18:47:02] Runner already active: 1
[2026-06-04 18:48:02] Runner already active: 1
[2026-06-04 18:49:02] Runner already active: 1
[2026-06-04 18:50:02] Runner already active: 1
[2026-06-04 18:51:02] Runner already active: 1
[2026-06-04 18:52:02] Runner already active: 1
[2026-06-04 18:53:02] Runner already active: 1
[2026-06-04 18:54:02] Runner already active: 1
[2026-06-04 18:55:02] Runner already active: 1
[2026-06-04 18:56:03] Runner already active: 1
[2026-06-04 18:57:03] Runner already active: 1
[2026-06-04 18:58:02] Runner already active: 1
[2026-06-04 18:59:02] Runner already active: 1
[2026-06-04 19:00:02] Runner already active: 1
[2026-06-04 19:01:02] Runner already active: 1
[2026-06-04 19:02:02] Runner already active: 1
[2026-06-04 19:03:02] Runner already active: 1
[2026-06-04 19:04:03] Runner already active: 1
[2026-06-04 19:05:02] Runner already active: 1
[2026-06-04 19:06:03] Runner already active: 1
[2026-06-04 19:07:02] Runner already active: 1
[2026-06-04 19:08:02] Runner already active: 1
[2026-06-04 19:09:02] Runner already active: 1
[2026-06-04 19:10:02] Runner already active: 1
[2026-06-04 19:11:03] Runner already active: 1
[2026-06-04 19:12:02] Runner already active: 1
[2026-06-04 19:13:02] Runner already active: 1
[2026-06-04 19:13:51] GitHub runner start attempted. Count=2
``
