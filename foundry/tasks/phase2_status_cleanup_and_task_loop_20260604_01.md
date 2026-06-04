# Phase 2 Task: Status cleanup and task execution loop

## Objective
Move from Phase 1 runner bootstrap into Phase 2 task execution.

## Required outcome
1. Update local Foundry status script so dashboard reports the real GitHub runner process rather than old task name.
2. Add Foundry task execution loop contract.
3. Publish updated FOUNDRY_STATUS.json and dashboard.
4. Keep catalogue unchanged: visible count 78, expansion off.
5. No Codex.

## Success criteria
- FOUNDRY_STATUS.json shows runner_process_count > 0.
- Dashboard says Phase 2 active.
- Jason action remains NONE.

## Safety
No destructive action. No catalogue expansion. No media deletion.
