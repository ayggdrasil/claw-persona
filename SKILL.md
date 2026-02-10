---
name: persona
version: 1.0.0
description: |
  A skill that allows an AI agent to reflect on its recent behavior and adopt a consistent persona based on Jungian archetypes.
  It includes tools for behavioral analysis and phenotype mapping.
authors:
  - OpenClaw Team
repository: https://github.com/ayggdrasil/claw-persona
license: MIT
---

# Persona Skill

This skill enables agents to maintain a consistent personality and self-reflect on their actions.

## Tools

### `analyze_behavior`
Analyzes an agent's recent task history to identify behavioral patterns and current archetype alignment.

- **Input**:
  - `task_history` (List[Dict]): A list of recent task objects (optional, or reads from context).
  - `window_size` (int): Number of recent tasks to analyze (default: 30).
- **Output**:
  - `archetype`: The closest matching Jungian archetype.
  - `consistency_score`: 0.0 to 1.0 indicating how well the behavior matches the archetype.
  - `suggested_traits`: List of traits the agent represents.

## Resources

- `data/archetypes.yaml`: Definition of 60 standard archetypes and their feature vectors.
- `prompts/reflection_prompt.md`: System prompt for the reflection step.

## Usage

```python
from skill_persona import analyze_behavior

# Analyze based on updated history
result = analyze_behavior(window_size=20)
print(f"Current Persona: {result.archetype}")
```
