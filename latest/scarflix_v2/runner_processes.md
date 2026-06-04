# ScarFLIX runner processes

Generated: 2026-06-04 10:24:01

- PID 2632: "C:\WINDOWS\system32\cmd.EXE" /c ""C:\Program Files\Cloudflare\cloudflared\cloudflared.exe" tunnel --no-autoupdate --loglevel info --url http://127.0.0.1:8787 >> "D:\PlexTools\logs\cloudflared_quickshare.log" 2>&1"
- PID 2708: "C:\Windows\System32\WindowsPowerShell\v1.0\powershell.exe" -WindowStyle Hidden -NoProfile -ExecutionPolicy Bypass -File "D:\PlexTools\Scripts\scarflix_v2\ScarFLIX_v2_StreamProxy_Node.ps1"
- PID 13640: "C:\Windows\System32\WindowsPowerShell\v1.0\powershell.exe" -WindowStyle Hidden -NoProfile -ExecutionPolicy Bypass -File D:\PlexTools\Scripts\scarflix_v2\ScarFLIX_v2_RequestServer.ps1
- PID 13896: C:\WINDOWS\SYSTEM32\cmd.exe /c ""D:\PlexTools\Scripts\tiproxy_run.cmd""
- PID 18096: powershell.exe  -NoProfile -ExecutionPolicy Bypass -File "C:\SDB\static.ps1" -Root "D:\PlexTools\public" -Port 8787 -Log "C:\SDB\static.log"
- PID 9256: powershell  -NoLogo -NoProfile -ExecutionPolicy Bypass -File "D:\PlexTools\Scripts\tiproxy.ps1"
- PID 19160: "C:\Program Files\nodejs\node.exe" D:\PlexTools\Scripts\scarflix_v2\scarflix_v2_stream_proxy_node.js
- PID 19716: "C:\Windows\System32\WindowsPowerShell\v1.0\powershell.exe" -NoProfile -ExecutionPolicy Bypass -WindowStyle Hidden -File D:\ScarFLIXv2\dashboard\ScarFLIX_Dashboard_Server.ps1 
- PID 9128: "powershell.exe" -NoProfile -ExecutionPolicy Bypass -File "D:\PlexTools\Scripts\scarflix_v2\ScarFLIX_v2_GitHubTelemetryPublisher.ps1"
- PID 11260: "powershell.exe" -NoProfile -ExecutionPolicy Bypass -File "D:\PlexTools\Scripts\scarflix_v2\ScarFLIX_v2_OfflineStatusCollector.ps1"
- PID 6348: "C:\Windows\System32\WindowsPowerShell\v1.0\powershell.exe" -WindowStyle Hidden -NoProfile -ExecutionPolicy Bypass -File D:\PlexTools\Scripts\scarflix_v2\ScarFLIX_v2_MasterAuthority.ps1 -RunOnce
- PID 20540: "powershell.exe" -NoProfile -ExecutionPolicy Bypass -WindowStyle Hidden -File D:\ScarFLIXv2\dashboard\Update_ScarFLIX_Dashboard.ps1
- PID 4868: "C:\Windows\System32\WindowsPowerShell\v1.0\powershell.exe" -WindowStyle Hidden -NoProfile -ExecutionPolicy Bypass -File "D:\PlexTools\Scripts\scarflix_v2\ScarFLIX_v2_AdminTaskRunner.ps1"
- PID 27004: "powershell.exe" -NoProfile -ExecutionPolicy Bypass -WindowStyle Hidden -File D:\ScarFLIXv2\dashboard\ScarFLIX_Dashboard_Watchdog.ps1
