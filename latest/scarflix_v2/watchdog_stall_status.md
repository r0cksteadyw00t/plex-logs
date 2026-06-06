# ScarFLIX v2 Watchdog + Stall Detector

Updated UTC: 2026-06-06T11:56:08Z
Status: REVIEW
Stall risk: Medium
Will progress without Codex: True
Current milestone: PLATFORM_GATE_RUNNING

## Signals
- Controller age minutes: 6
- Platform checkpoint age minutes: 0
- Dashboard age minutes: 0
- Mirror age minutes: 6
- Movie STRM count: 1
- TV STRM count: 0
- Total STRM count: 1

## Actions
- ScarFLIX_v2_AutonomousController: run_triggered
- JasonOS_Prime_PublicMirrorPublisher: run_triggered

## Notes
- Controller status is stale or missing; watchdog triggered controller task.
- Public mirror status was disabled or stale; watchdog triggered mirror task.
- Transient provider/WebDAV failures are being held for retry, not pruned: 8
