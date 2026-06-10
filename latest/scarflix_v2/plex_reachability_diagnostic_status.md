# Plex Reachability Diagnostic

- Updated UTC: 2026-06-10T22:48:35.855Z
- Status: `PASS_SERVICE_CONTEXT_PLEX_REACHABLE`
- Working base: `http://127.0.0.1:32400`
- Root-cause category: `resolved_or_transient_reachability_recovered`

## Results

- `http://127.0.0.1:32400`: identity 200, root 401
- `http://192.168.1.184:32400`: identity 200, root 200
- `http://localhost:32400`: identity 200, root 401
- `http://mediaserver:32400`: identity 200, root 401

No refresh, cache clear, publication, expansion, cleanup, deletion, source mutation, service-account change, firewall change, or path rewrite was performed.