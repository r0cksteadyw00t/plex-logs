# Foundry Technical Debt Scan

Generated: 2026-06-05 11:39:25

| Finding | Severity | Action |
|---|---|---|
| Dashboard state has previously reverted due to hardcoded cycle scripts | High | centralise phase-state read/write |
| Aider CLI invocation has been unstable | Medium | keep direct Ollama fallback wrapper |
| Status files can be overwritten by multiple publishers | High | introduce single status publisher lock |
| Telemetry lacks schema versioning | Medium | add status schema version field |
| ScarFLIX media logic remains unpromoted to local AI workflow | Medium | create controlled promotion gate later |
