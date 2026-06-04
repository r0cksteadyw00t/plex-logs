# ScarFLIX runner processes

Generated: 2026-06-04 10:09:40

- PID 34372: "C:\Windows\System32\WindowsPowerShell\v1.0\powershell.exe" -WindowStyle Hidden -NoProfile -ExecutionPolicy Bypass -File D:\PlexTools\Scripts\scarflix_v2\ScarFLIX_v2_RequestServer.ps1
- PID 35624: "C:/Program Files/nodejs/node.exe" D:/PlexTools/Scripts/scarflix_v2/scarflix_v2_webdav_file_bridge_node.js
- PID 39656: "C:\Windows\System32\WindowsPowerShell\v1.0\powershell.exe" -WindowStyle Hidden -NoProfile -ExecutionPolicy Bypass -File "D:\PlexTools\Scripts\scarflix_v2\ScarFLIX_v2_StreamProxy_Node.ps1"
- PID 40456: "C:\Program Files\nodejs\node.exe" D:\PlexTools\Scripts\scarflix_v2\scarflix_v2_stream_proxy_node.js
- PID 35316: "D:\PlexTools\bin\rclone.exe" mount scarflix_webdav_bridge: S: --config D:\PlexTools\config\rclone\scarflix_webdav_bridge.conf --vfs-cache-mode full --dir-cache-time 10s --poll-interval 0 --log-file D:\PlexTools\logs\scarflix_v2_rclone_webdav_mount.log --log-level INFO --no-console 
- PID 12528: "C:\Windows\System32\WindowsPowerShell\v1.0\powershell.exe" -NoProfile -ExecutionPolicy Bypass -WindowStyle Hidden -File D:\ScarFLIXv2\dashboard\ScarFLIX_Dashboard_Server.ps1 
- PID 7564: "powershell.exe" -NoProfile -ExecutionPolicy Bypass -File "D:\PlexTools\Scripts\scarflix_v2\ScarFLIX_v2_PlatformGate_LocalRunner.ps1"
- PID 31380: "C:\WINDOWS\System32\WindowsPowerShell\v1.0\powershell.exe" -NoProfile -ExecutionPolicy Bypass -File D:\PlexTools\Scripts\scarflix_v2\ScarFLIX_v2_PlatformGate.ps1 -Concurrency 5 -Retries 3
- PID 36112: "C:\Windows\System32\WindowsPowerShell\v1.0\powershell.exe" -NoProfile -ExecutionPolicy Bypass -File D:\PlexTools\Scripts\scarflix_v2\ScarFLIX_v2_VisibleCatalogQA.ps1
- PID 31000: "C:\Windows\System32\WindowsPowerShell\v1.0\powershell.exe" -NoProfile -ExecutionPolicy Bypass -File D:\PlexTools\Scripts\scarflix_v2\ScarFLIX_v2_GitHubTelemetryPublisher.ps1
