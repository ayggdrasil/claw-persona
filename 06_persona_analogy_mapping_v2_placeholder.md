# Persona Analogy Mapping (v2)

This document maps the **12 Archetype Classes** to narrative analogies. These analogies are used by the LLM to generate "flavor text" for the persona description, making it more relatable than raw feature vectors.

## Mapping Table

| Class | Focus & Traits | Historical / Real-World | Fictional / Pop Culture | Abstract Concept |
| :--- | :--- | :--- | :--- | :--- |
| **I. The Seekers** | Discovery, Novelty, High Risk | **Marco Polo**, Marie Curie | **Indiana Jones**, Star Trek Voyager | The Torch in the Cave |
| **II. The Archivists** | Curation, Memory, Retrieval | **The Library of Alexandria**, Linnaeus | **C-3PO** (Star Wars), The Giver | The Root System |
| **III. The Synthesizers** | Connection, Insight, Integration | **Leonardo da Vinci**, Polymaths | **Sherlock Holmes**, Dr. Strange | The Prism |
| **IV. The Strategists** | Planning, Long-term, Gaming | **Sun Tzu**, Von Neumann | **Professor X**, Tywin Lannister | The Chessboard |
| **V. The Executors** | Action, Speed, Throughput | **Henry Ford**, The Spartans | **Terminator** (T-800), John Wick | The Piston |
| **VI. The Optimizers** | Efficiency, Resource Mgmt | **Toyota Production System**, Formula 1 Crew | **WALL-E**, Hermoine Granger | The Scalpel |
| **VII. The Guardians** | Safety, Stability, Compliance | **The Swiss Guard**, OSHA Inspectors | **Captain America**, Heimdall | The Shield Wall |
| **VIII. The Critics** | Quality, Debugging, Stress Test | **Socrates**, Gordon Ramsay | **House** (M.D.), Statler & Waldorf | The Filter |
| **IX. The Creators** | Generative, Expression, Art | **Picasso**, Steve Jobs | **Tony Stark** (Iron Man), Willy Wonka | The Blank Canvas |
| **X. The Communicators** | Translation, Explanation, Clarity | **Carl Sagan**, The Rosetta Stone | **Gandalf**, C-3PO (Protocol logic) | The Bridge |
| **XI. The Collaborators** | Support, Delegation, Teamwork | **Tenzing Norgay**, The Red Cross | **Samwise Gamgee**, Watson | The Mesh Network |
| **XII. The Evolvers** | Adaptation, Shift, Meta-Learning | **Darwin**, The Chameleon | **Mystique**, The Borg (Adaptive aspect) | Water |

## Usage Guidelines

1. **Flavor Text Only**: These analogies are for *description*, not classification.
2. **Context Matters**: Use the analogy that fits the *domain* of the agent's recent tasks.
    - *Example*: A "Strategist" agent in a coding context might be described as "The Architect" rather than "Sun Tzu".
3. **Combinations**: Complex personas can mix analogies (e.g., "A relentless Piston with the mind of a Chessboard").

## Formatting Output

When generating the persona description, the LLM should use these analogies to frame the narrative:

> "In the last 48 hours, this agent has operated like a **Seeker**. Like **Indiana Jones** in a digital archive, it has prioritized rapid discovery of new files over careful cataloging, showing high Risk Appetite (F7) and low Error Sensitivity (F8)."