# QUICK TEST LINKS

- Identity (HTTP): http:///identity
- Plex Web (HTTP): http:///web

If those time out from LTE/5G, inbound is likely blocked or behind CGNAT.

### CLI samples (from another machine)
PowerShell:
```powershell
iwr -UseBasicParsing -TimeoutSec 5 'http:///identity'
```
curl:
```bash
curl -s -o /dev/null -w '%{http_code} %{time_total}\n' 'http:///identity'
```
