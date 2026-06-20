# ScarFLIX v2 Watchdog + Stall Detector

Updated UTC: 2026-06-20T03:40:12Z
Status: REVIEW
Stall risk: Medium
Will progress without Codex: True
Current milestone: PLATFORM_GATE_RUNNING

## Signals
- Controller age minutes: 5
- Platform checkpoint age minutes: 0
- Dashboard age minutes: 0
- Mirror age minutes: 2
- Movie STRM count: 44
- TV STRM count: 0
- Total STRM count: 44

## Actions
- JasonOS_Prime_PublicMirrorPublisher: skipped_orchestrator_owned

## Notes
- Public mirror status was disabled or stale; watchdog triggered mirror task.
- Transient provider/WebDAV failures are being held for retry, not pruned: 1
