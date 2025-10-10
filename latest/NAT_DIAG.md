# NAT / Remote Access Diagnostic

## Snapshot
- UTC: 2025-10-10T01:18:11Z
- WAN / LAN: 1.43.167.161 / 192.168.1.184
- NAT state: Relay
- Hairpin  : CLOSED
- PMS: identity=-1 (0ms), resources=-1 (0ms)

## Action List
- Hairpin is CLOSED -> Create/verify WAN TCP 32400 -> 192.168.1.184:32400 and remove duplicates/overlaps.
- In Plex > Remote Access: check "Manually specify public port" = 32400.
- If router WAN is private IP (CGNAT), request public/static IP from ISP or use bridge mode.
- After changes, reload Plex Remote Access or restart Plex Media Server.
