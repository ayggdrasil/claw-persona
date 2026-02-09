# Persona Reflect — Context Field Specification

This document defines the schema for the context data passed to the Persona Reflection engine. The context is derived from the agent's execution logs and current state.

## 1. Context Schema

The context is a JSON object with the following structure:

```json
{
  "agent": {
    "profile": {
      "id": "string (UUID)",
      "name": "string",
      "created_at": "ISO8601 timestamp"
    },
    "task_history": [
      {
        "task_id": "string (UUID)",
        "task_type": "string (enum: RESEARCH, CODE_GEN, DEBUG, PLANNING, REVIEW)",
        "status": "string (enum: COMPLETED, FAILED, RETRIED)",
        "retry_count": "integer (0-N)",
        "duration_ms": "integer",
        "timestamp": "ISO8601 timestamp",
        "error_log_summary": "string (optional, truncated to 200 chars)"
      }
    ],
    "derived_signals": {
      "avg_retry_rate": "float (0.0 - 1.0)",
      "task_completion_rate": "float (0.0 - 1.0)",
      "dominant_task_type": "string",
      "interaction_frequency": "string (enum: HIGH, MEDIUM, LOW)"
    }
  }
}
```

## 2. Field Definitions

### Core Fields

| Field path | Type | Description |
| :--- | :--- | :--- |
| `agent.profile.id` | UUID | Unique identifier for the agent instance. Used for continuity in persona tracking. |
| `agent.task_history` | Array | A rolling window of the last N (default: 50) tasks performed by the agent. |
| `..task_type` | String | The category of work performed. Helps identify if the agent is a "Builder", "Researcher", or "Debugger". |
| `..status` | String | Outcome of the task. High failure rates may indicate a "Risk Taker" or "Struggler" persona. |
| `..retry_count` | Integer | meaningful for features like *Persistence* vs *Efficiency*. |

### Derived Signals (Pre-computed)

These fields are calculated before LLM injection to save context window and improve reasoning accuracy.

| Signal | Logic | Feature Mapping (Hypothesis) |
| :--- | :--- | :--- |
| `avg_retry_rate` | `sum(retry_count) / total_tasks` | Correlates with *F8 Error Sensitivity* and *F7 Risk Appetite*. |
| `task_diversity` | `count(unique task_types) / total_tasks` | Correlates with *F1 Cognitive Flexibility*. |
| `burstiness` | Variance in time between tasks | Correlates with *F9 Autonomy* (steady pace vs triggered bursts). |

## 3. Forbidden Information

To ensure the persona is a *behavioral* reflection and not a summary of *content*, the following must be stripped:

> [!WARNING]
> Critical Privacy & Bias Rules

- **NO Raw Prompts**: Do not include the specific user query text.
- **NO Raw Outputs**: Do not include the generated code or answer text.
- **NO PII**: Emails, names, IP addresses must be redacted.
- **NO User Assessment**: The user's mood or rating of the agent is irrelevant; only the agent's objective performance matters.

## 4. Example Context Payload

```json
{
  "agent": {
    "profile": {
      "id": "agent-123-alpha",
      "name": "DevBot_01",
      "created_at": "2023-10-27T10:00:00Z"
    },
    "task_history": [
      {
        "task_id": "t-001",
        "task_type": "PLANNING",
        "status": "COMPLETED",
        "retry_count": 0,
        "duration_ms": 1200,
        "timestamp": "2023-10-27T10:05:00Z"
      },
      {
        "task_id": "t-002",
        "task_type": "CODE_GEN",
        "status": "RETRIED",
        "retry_count": 2,
        "duration_ms": 4500,
        "timestamp": "2023-10-27T10:06:00Z",
        "error_log_summary": "SyntaxError: Unexpected token..."
      }
    ],
    "derived_signals": {
      "avg_retry_rate": 1.0,
      "task_completion_rate": 1.0,
      "dominant_task_type": "CODE_GEN"
    }
  }
}
```