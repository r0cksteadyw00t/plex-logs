# ScarFLIX Foundry Phase 1 Runner Diagnostic

Generated: 2026-06-04 19:11:32

## Summary
Runner root exists: True
Runner .runner exists: True
Runner run.cmd exists: True
Runner config.cmd exists: True

## Processes
``text
ProcessId   : 13896
Name        : cmd.exe
CommandLine : C:\WINDOWS\SYSTEM32\cmd.exe /c ""D:\PlexTools\Scripts\tiproxy_run.cmd""
``

## Task: ScarFLIX_Foundry_RunnerWatchdog
``text
Folder: \
HostName:                             MEDIASERVER
TaskName:                             \ScarFLIX_Foundry_RunnerWatchdog
Next Run Time:                        4/06/2026 7:12:00 PM
Status:                               Ready
Logon Mode:                           Interactive only
Last Run Time:                        4/06/2026 7:11:01 PM
Last Result:                          0
Author:                               MEDIASERVER\jason
Task To Run:                          powershell.exe -NoProfile -WindowStyle Hidden -ExecutionPolicy Bypass -File D:\PlexTools\Foundry\Start-GitHubRunner.ps1
Start In:                             N/A
Comment:                              N/A
Scheduled Task State:                 Enabled
Idle Time:                            Disabled
Power Management:                     Stop On Battery Mode, No Start On Batteries
Run As User:                          jason
Delete Task If Not Rescheduled:       Disabled
Stop Task If Runs X Hours and X Mins: 72:00:00
Schedule:                             Scheduling data is not available in this format.
Schedule Type:                        One Time Only, Minute 
Start Time:                           6:42:00 PM
Start Date:                           4/06/2026
End Date:                             N/A
Days:                                 N/A
Months:                               N/A
Repeat: Every:                        0 Hour(s), 1 Minute(s)
Repeat: Until: Time:                  None
Repeat: Until: Duration:              Disabled
Repeat: Stop If Still Running:        Disabled
``

## Task: ScarFLIX_Foundry_LocalHeartbeat
``text
Folder: \
HostName:                             MEDIASERVER
TaskName:                             \ScarFLIX_Foundry_LocalHeartbeat
Next Run Time:                        4/06/2026 7:22:00 PM
Status:                               Ready
Logon Mode:                           Interactive only
Last Run Time:                        4/06/2026 7:07:01 PM
Last Result:                          0
Author:                               MEDIASERVER\jason
Task To Run:                          powershell.exe -NoProfile -WindowStyle Hidden -ExecutionPolicy Bypass -File D:\PlexTools\Foundry\Run-FoundryCycle.ps1
Start In:                             N/A
Comment:                              N/A
Scheduled Task State:                 Enabled
Idle Time:                            Disabled
Power Management:                     Stop On Battery Mode, No Start On Batteries
Run As User:                          jason
Delete Task If Not Rescheduled:       Disabled
Stop Task If Runs X Hours and X Mins: 72:00:00
Schedule:                             Scheduling data is not available in this format.
Schedule Type:                        One Time Only, Minute 
Start Time:                           6:37:00 PM
Start Date:                           4/06/2026
End Date:                             N/A
Days:                                 N/A
Months:                               N/A
Repeat: Every:                        0 Hour(s), 15 Minute(s)
Repeat: Until: Time:                  None
Repeat: Until: Duration:              Disabled
Repeat: Stop If Still Running:        Disabled
``

## Runner stdout
``text
Missing: D:\PlexTools\logs\github_runner_stdout.log
``

## Runner stderr
``text
Missing: D:\PlexTools\logs\github_runner_stderr.log
``

## Runner watchdog
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
``

## Recent Foundry logs
``text
4/06/2026 6:42:39 PM | D:\PlexTools\logs\foundry_runner_online_fix_20260604_184227.log
4/06/2026 6:37:31 PM | D:\PlexTools\logs\foundry_runner_repair_20260604_183701.log
4/06/2026 6:22:04 PM | D:\PlexTools\logs\foundry_bootstrap_20260604_182018.log
``