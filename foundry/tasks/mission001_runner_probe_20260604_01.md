# Mission 001 Runner Probe

Purpose: trigger ScarFLIX Foundry workflow after runner watchdog installation.

Expected behaviour:
1. GitHub push trigger starts .github/workflows/scarflix-foundry.yml.
2. Self-hosted runner with labels self-hosted, Windows, X64, scarflix, foundry picks up the job.
3. MEDIASERVER executes D:\PlexTools\Foundry\Run-FoundryCycle.ps1.
4. FOUNDRY_STATUS.json refreshes after this file timestamp.
5. Dashboard refreshes.

No catalogue expansion. No destructive action. No Codex.
