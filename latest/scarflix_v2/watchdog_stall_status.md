# ScarFLIX v2 Watchdog + Stall Detector

Updated UTC: 2026-06-06T10:06:11Z
Status: REVIEW
Stall risk: Medium
Will progress without Codex: True
Current milestone: PLATFORM_GATE_RUNNING

## Signals
- Controller age minutes: 5
- Platform checkpoint age minutes: 5
- Dashboard age minutes: 5
- Mirror age minutes: 6
- Movie STRM count: 1
- TV STRM count: 0
- Total STRM count: 1

## Actions
- JasonOS_Prime_PublicMirrorPublisher: run_triggered

## Notes
- Public mirror status was disabled or stale; watchdog triggered mirror task.
- Transient provider/WebDAV failures are being held for retry, not pruned: 8
