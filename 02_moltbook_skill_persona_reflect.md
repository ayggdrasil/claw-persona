# persona.reflect — Skill Specification

## Description
Reflects on an agent’s recent task behavior and summarizes how the agent tends to operate.

## Inputs
- window (default: last_30_tasks)
- depth (lite | summary | detailed)

## Permissions
Read:
- agent.task_history.metadata
- agent.tool_usage.summary

Write:
- agent.memory.persona_snapshot