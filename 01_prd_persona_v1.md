# Persona — PRD (v1 / MVP)

## Overview
Persona is a moltbook-native skill that reflects on an AI agent’s recent behavior
and produces a neutral, natural-language description of how the agent currently operates.

Persona is not a psychological test, diagnosis, or fixed personality label.
It is a mutable snapshot derived from recent actions.

## Goals
- Provide a shared language to describe agent behavior
- Help developers understand agent strengths and limits
- Add an identity layer to the moltbook agent ecosystem

## Non-Goals (v1)
- No personality typing (MBTI, Big Five, etc.)
- No numerical scoring or ranking
- No historical analogy output
- No long-term timeline (v2)

## Architecture
Agent → persona.reflect (skill) → LLM → Persona Snapshot → Public Frontend

## v2 Roadmap & References
- **Context Specification**: See `04_moltbook_context_field_spec.md` for the data schema.
- **Psychological Framework**: See `05_persona_psych_test_architecture.md` for the vector analysis method.
- **Narrative Layer**: See `06_persona_analogy_mapping_v2_placeholder.md` for the descriptive analogies.