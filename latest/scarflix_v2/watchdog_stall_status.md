# ScarFLIX v2 Watchdog + Stall Detector

Updated UTC: 2026-06-06T18:37:45Z
Status: PASS
Stall risk: Low
Will progress without Codex: True
Current milestone: PLATFORM_GATE_RUNNING

## Signals
- Controller age minutes: 10
- Platform checkpoint age minutes: 0
- Dashboard age minutes: 1
- Mirror age minutes: 0
- Movie STRM count: 1
- TV STRM count: 0
- Total STRM count: 1

## Actions
- No recovery actions required.

## Notes
- Controller status is stale, but PlatformGate durable progress is fresh; no recovery action required.
- Transient provider/WebDAV failures are being held for retry, not pruned: 10
