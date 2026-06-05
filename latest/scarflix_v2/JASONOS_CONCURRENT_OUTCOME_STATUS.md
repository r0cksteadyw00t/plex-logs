# JasonOS Prime Concurrent Outcome Status

Generated: 2026-06-06 07:30:51

Overall: GREEN_CORE_AND_PIPELINE_SANITY_COMPLETE

## Access
- PC/LAN 8791: http://192.168.1.184:8791
- PC/LAN fallback 8794: http://192.168.1.184:8794
- Tailscale 8791: http://100.69.97.7:8791
- Tailscale fallback 8793: http://100.69.97.7:8793

## Lanes
- Core runtime: 8790=True, 8791=True, 8792=True | Next: Keep alive and monitor
- Docker / Foundry: docker_ready=True, compose_ok=1 | Next: Autostart and compose are active
- Phone / LAN access: LAN=http://192.168.1.184:8794, Tailscale=http://100.69.97.7:8793 | Next: Try LAN fallback from phone on WiFi first
- ScarFLIX output: movies=1, shows=0 | Next: If only sanity item exists, resolver/admission still needs content work
- Project tasks: 22 tasks started OK | Next: Scheduled workers should continue hidden
- Local AI: Ollama=True | Next: Use for local-first reasoning and summaries
- Telemetry: Local dashboard and JSON generated | Next: GitHub publish attempted
- Popup/noise: hidden_launcher=True | Next: No visible windows expected except manual run