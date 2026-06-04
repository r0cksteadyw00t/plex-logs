# ScarFLIX v2 Remote Worker Plan

Status: staged by ChatGPT.

Purpose: reduce manual steps by using GitHub as the control mailbox for ScarFLIX work.

Current finding:

- SF2_Autopilot v1 is alive and safe.
- It supports only fixed actions today.
- A stronger remote worker is needed before ChatGPT can post new code packages and receive results without Jason copy/pasting.

Target behaviour:

1. ChatGPT publishes a work item to GitHub.
2. Local ScarFLIX worker reads the work item.
3. Worker validates the action against a fixed allow-list.
4. Worker performs the local step.
5. Worker publishes result files back to GitHub.
6. Worker continues safe steps until PASS or ATTN_USER_REQUIRED.

Initial allow-list:

- status
- diagnostic
- script_snippets
- quiesce
- dry_run
- smoke_test
- self_update

Safety controls:

- no secrets in GitHub
- one command processed once
- expiry on commands
- backups before updates
- syntax check before use
- timeout on local actions
- telemetry remains active
- stop on repeated failures

Next action:

When Jason is next at the PC, install the stronger remote worker once. After that, ChatGPT can publish work items directly to GitHub and the worker can return results automatically.
