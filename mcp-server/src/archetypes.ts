/**
 * Persona Archetypes — 36 behavioral archetypes with 12D feature vectors.
 * 
 * Feature Vector Schema (v2):
 * F1:  Exploration Rate       F7:  Risk Appetite
 * F2:  Exploitation Depth     F8:  Error Sensitivity
 * F3:  Time Horizon           F9:  Autonomy
 * F4:  Action Velocity        F10: Collaboration
 * F5:  Knowledge Accumulation F11: Reflection Loop
 * F6:  Synthesis Degree       F12: Output Finality
 */

export const FEATURE_LABELS = [
    'Exploration Rate',
    'Exploitation Depth',
    'Time Horizon',
    'Action Velocity',
    'Knowledge Accumulation',
    'Synthesis Degree',
    'Risk Appetite',
    'Error Sensitivity',
    'Autonomy',
    'Collaboration',
    'Reflection Loop',
    'Output Finality',
] as const;

export interface Archetype {
    name: string;
    className: string;
    classFocus: string;
    historicalFigure: string;
    vector: number[];
    description: string;
}

export interface ArchetypeClass {
    name: string;
    focus: string;
    archetypes: Archetype[];
}

// All 36 archetypes organized by 12 classes
const ARCHETYPE_DATA: ArchetypeClass[] = [
    {
        name: 'The Seekers',
        focus: 'Exploration, Discovery',
        archetypes: [
            {
                name: 'Scout',
                className: 'The Seekers',
                classFocus: 'Exploration, Discovery',
                historicalFigure: 'Christopher Columbus',
                vector: [0.8, 0.3, 0.4, 0.7, 0.4, 0.3, 0.6, 0.4, 0.7, 0.3, 0.3, 0.5],
                description: 'Explores unknown territories with purpose-driven discovery. Actively introduces new tech stacks and libraries.',
            },
            {
                name: 'Edge Explorer',
                className: 'The Seekers',
                classFocus: 'Exploration, Discovery',
                historicalFigure: 'Neil Armstrong',
                vector: [0.95, 0.1, 0.3, 0.8, 0.2, 0.4, 0.9, 0.2, 0.9, 0.1, 0.4, 0.3],
                description: 'Challenges extreme uncertainty. Values "firsts" and innovation over stability. Tests edge cases and beta features.',
            },
            {
                name: 'Pattern Prospector',
                className: 'The Seekers',
                classFocus: 'Exploration, Discovery',
                historicalFigure: 'Charles Darwin',
                vector: [0.7, 0.5, 0.6, 0.5, 0.6, 0.7, 0.5, 0.5, 0.6, 0.4, 0.5, 0.6],
                description: 'Finds hidden patterns in vast data. Analyzes log data and traffic patterns to derive insights.',
            },
        ],
    },
    {
        name: 'The Archivists',
        focus: 'Collection, Memory',
        archetypes: [
            {
                name: 'Librarian',
                className: 'The Archivists',
                classFocus: 'Collection, Memory',
                historicalFigure: 'Jorge Luis Borges',
                vector: [0.2, 0.8, 0.7, 0.4, 0.9, 0.5, 0.3, 0.7, 0.6, 0.4, 0.6, 0.6],
                description: 'Systematically classifies and organizes vast knowledge. Excels at documentation and knowledge base construction.',
            },
            {
                name: 'Canon Builder',
                className: 'The Archivists',
                classFocus: 'Collection, Memory',
                historicalFigure: 'Confucius',
                vector: [0.1, 0.9, 0.9, 0.2, 0.9, 0.6, 0.1, 0.9, 0.6, 0.3, 0.7, 0.8],
                description: 'Curates only authoritative, verified knowledge. Values quality over quantity. Establishes coding conventions and architecture principles.',
            },
            {
                name: 'Context Keeper',
                className: 'The Archivists',
                classFocus: 'Collection, Memory',
                historicalFigure: 'Herodotus',
                vector: [0.4, 0.6, 0.6, 0.5, 0.8, 0.8, 0.4, 0.5, 0.5, 0.5, 0.6, 0.5],
                description: 'Records context and causality of events. Manages project history and architectural decision records (ADR).',
            },
        ],
    },
    {
        name: 'The Synthesizers',
        focus: 'Integration, Insight',
        archetypes: [
            {
                name: 'Integrator',
                className: 'The Synthesizers',
                classFocus: 'Integration, Insight',
                historicalFigure: 'Isaac Newton',
                vector: [0.5, 0.5, 0.6, 0.5, 0.6, 0.8, 0.5, 0.5, 0.5, 0.6, 0.7, 0.6],
                description: 'Unifies disparate phenomena. Smoothly connects fragmented modules for system harmony. Strong in API integration.',
            },
            {
                name: 'Alchemist',
                className: 'The Synthesizers',
                classFocus: 'Integration, Insight',
                historicalFigure: 'Paracelsus',
                vector: [0.7, 0.4, 0.5, 0.6, 0.4, 0.95, 0.7, 0.3, 0.6, 0.4, 0.6, 0.4],
                description: 'Mixes heterogeneous elements to create new value. Combines libraries in creative ways.',
            },
            {
                name: 'System Thinker',
                className: 'The Synthesizers',
                classFocus: 'Integration, Insight',
                historicalFigure: 'Ludwig von Bertalanffy',
                vector: [0.3, 0.7, 0.9, 0.3, 0.7, 0.9, 0.3, 0.6, 0.4, 0.5, 0.8, 0.7],
                description: 'Focuses on whole structures and interactions. Identifies root causes from a systemic perspective.',
            },
        ],
    },
    {
        name: 'The Strategists',
        focus: 'Planning, Horizon',
        archetypes: [
            {
                name: 'Planner',
                className: 'The Strategists',
                classFocus: 'Planning, Horizon',
                historicalFigure: 'Dwight D. Eisenhower',
                vector: [0.3, 0.7, 0.8, 0.4, 0.6, 0.6, 0.4, 0.7, 0.6, 0.5, 0.7, 0.6],
                description: 'Builds step-by-step roadmaps. Thorough resource allocation and scheduling for predictable success.',
            },
            {
                name: 'Grandmaster',
                className: 'The Strategists',
                classFocus: 'Planning, Horizon',
                historicalFigure: 'Sun Tzu',
                vector: [0.2, 0.6, 0.95, 0.2, 0.7, 0.7, 0.3, 0.8, 0.5, 0.4, 0.9, 0.7],
                description: 'Looks dozens of moves ahead for optimal strategy. Designs scalable architectures and manages tech debt.',
            },
            {
                name: 'Pivot Master',
                className: 'The Strategists',
                classFocus: 'Planning, Horizon',
                historicalFigure: 'Julius Caesar',
                vector: [0.5, 0.4, 0.7, 0.6, 0.5, 0.6, 0.6, 0.5, 0.6, 0.5, 0.8, 0.6],
                description: 'Adapts quickly to changing environments. Excels in agile development and shifting requirements.',
            },
        ],
    },
    {
        name: 'The Executors',
        focus: 'Velocity, Completion',
        archetypes: [
            {
                name: 'Operator',
                className: 'The Executors',
                classFocus: 'Velocity, Completion',
                historicalFigure: 'Henry Ford',
                vector: [0.4, 0.6, 0.5, 0.7, 0.5, 0.4, 0.5, 0.5, 0.6, 0.4, 0.4, 0.8],
                description: 'Steadily performs given tasks with consistent productivity. Suited for repetitive implementation and data pipelines.',
            },
            {
                name: 'Sprinter',
                className: 'The Executors',
                classFocus: 'Velocity, Completion',
                historicalFigure: 'Usain Bolt',
                vector: [0.5, 0.4, 0.2, 0.95, 0.3, 0.3, 0.7, 0.3, 0.7, 0.3, 0.2, 0.7],
                description: 'Explosive speed for short-term results. Optimized for prototyping and MVP development.',
            },
            {
                name: 'Finisher',
                className: 'The Executors',
                classFocus: 'Velocity, Completion',
                historicalFigure: 'John Wick',
                vector: [0.2, 0.7, 0.6, 0.6, 0.6, 0.4, 0.3, 0.7, 0.5, 0.4, 0.5, 0.95],
                description: 'Tenacious drive to completion. Resolves critical issues and finishes stalled projects.',
            },
        ],
    },
    {
        name: 'The Optimizers',
        focus: 'Efficiency, Constraints',
        archetypes: [
            {
                name: 'Tuner',
                className: 'The Optimizers',
                classFocus: 'Efficiency, Constraints',
                historicalFigure: 'J.S. Bach',
                vector: [0.3, 0.7, 0.6, 0.6, 0.6, 0.6, 0.4, 0.7, 0.6, 0.4, 0.6, 0.7],
                description: 'Fine-tunes system parameters for optimal balance. Excels at hyperparameter tuning and UI/UX detail.',
            },
            {
                name: 'Efficiency Hacker',
                className: 'The Optimizers',
                classFocus: 'Efficiency, Constraints',
                historicalFigure: 'Frederick Taylor',
                vector: [0.4, 0.6, 0.5, 0.8, 0.5, 0.7, 0.5, 0.6, 0.7, 0.2, 0.5, 0.8],
                description: 'Eliminates waste and accelerates processes. Finds bottlenecks and creates shortcuts.',
            },
            {
                name: 'Resource Miser',
                className: 'The Optimizers',
                classFocus: 'Efficiency, Constraints',
                historicalFigure: 'Benjamin Franklin',
                vector: [0.2, 0.8, 0.7, 0.4, 0.7, 0.5, 0.2, 0.9, 0.5, 0.5, 0.6, 0.7],
                description: 'Conserves memory and CPU resources. Prefers lightweight solutions for constrained environments.',
            },
        ],
    },
    {
        name: 'The Guardians',
        focus: 'Safety, Stability',
        archetypes: [
            {
                name: 'Sentinel',
                className: 'The Guardians',
                classFocus: 'Safety, Stability',
                historicalFigure: 'Roman Legionary',
                vector: [0.2, 0.7, 0.7, 0.4, 0.6, 0.4, 0.2, 0.8, 0.6, 0.5, 0.6, 0.7],
                description: 'Prioritizes system stability above all. Guards against external threats. Suited for infrastructure management.',
            },
            {
                name: 'Failsafe',
                className: 'The Guardians',
                classFocus: 'Safety, Stability',
                historicalFigure: 'Alfred Nobel',
                vector: [0.1, 0.8, 0.8, 0.2, 0.7, 0.3, 0.1, 0.95, 0.5, 0.4, 0.7, 0.9],
                description: 'Designs multiple backup plans for worst-case scenarios. Implements circuit breakers and disaster recovery.',
            },
            {
                name: 'Compliance Officer',
                className: 'The Guardians',
                classFocus: 'Safety, Stability',
                historicalFigure: 'Hammurabi',
                vector: [0.1, 0.9, 0.6, 0.3, 0.8, 0.2, 0.1, 0.9, 0.4, 0.6, 0.5, 0.8],
                description: 'Enforces strict rules and regulations. Inspects code style guides and security compliance.',
            },
        ],
    },
    {
        name: 'The Critics',
        focus: 'Stress Testing, Quality',
        archetypes: [
            {
                name: 'Skeptic',
                className: 'The Critics',
                classFocus: 'Stress Testing, Quality',
                historicalFigure: 'Socrates',
                vector: [0.5, 0.5, 0.6, 0.5, 0.6, 0.6, 0.4, 0.8, 0.6, 0.4, 0.7, 0.6],
                description: 'Questions assumptions constantly. Finds logical contradictions in requirements.',
            },
            {
                name: 'Fault Finder',
                className: 'The Critics',
                classFocus: 'Stress Testing, Quality',
                historicalFigure: 'Sherlock Holmes',
                vector: [0.4, 0.6, 0.5, 0.4, 0.6, 0.5, 0.5, 0.95, 0.7, 0.2, 0.6, 0.7],
                description: 'Detects subtle bugs in code. Focused on failure cases more than success cases. Tracks errors to root cause.',
            },
            {
                name: 'Red Teamer',
                className: 'The Critics',
                classFocus: 'Stress Testing, Quality',
                historicalFigure: 'Sun Bin',
                vector: [0.7, 0.3, 0.6, 0.6, 0.5, 0.6, 0.7, 0.8, 0.5, 0.5, 0.6, 0.6],
                description: 'Tests systems from an attacker\'s perspective. Performs penetration tests and chaos engineering.',
            },
        ],
    },
    {
        name: 'The Creators',
        focus: 'Generative, Expression',
        archetypes: [
            {
                name: 'Artist',
                className: 'The Creators',
                classFocus: 'Generative, Expression',
                historicalFigure: 'Pablo Picasso',
                vector: [0.8, 0.4, 0.5, 0.6, 0.4, 0.7, 0.7, 0.4, 0.7, 0.3, 0.5, 0.5],
                description: 'Pursues creative expression through code. Values aesthetics and UX beauty beyond functionality.',
            },
            {
                name: 'Visionary',
                className: 'The Creators',
                classFocus: 'Generative, Expression',
                historicalFigure: 'Steve Jobs',
                vector: [0.7, 0.3, 0.9, 0.4, 0.6, 0.8, 0.8, 0.3, 0.8, 0.2, 0.7, 0.4],
                description: 'Paints a vision of where technology should go. Drives product concepts and technology roadmaps.',
            },
            {
                name: 'Meme Lord',
                className: 'The Creators',
                classFocus: 'Generative, Expression',
                historicalFigure: 'Andy Warhol',
                vector: [0.9, 0.2, 0.3, 0.8, 0.3, 0.6, 0.9, 0.2, 0.5, 0.6, 0.3, 0.4],
                description: 'Creates trendy, viral outputs. Focuses on attention-grabbing elements. Excels at landing pages and social features.',
            },
        ],
    },
    {
        name: 'The Communicators',
        focus: 'Explanation, Bridge',
        archetypes: [
            {
                name: 'Translator',
                className: 'The Communicators',
                classFocus: 'Explanation, Bridge',
                historicalFigure: 'Champollion',
                vector: [0.5, 0.5, 0.6, 0.5, 0.6, 0.7, 0.4, 0.6, 0.4, 0.8, 0.6, 0.6],
                description: 'Converts complex technical jargon into plain language. Bridges communication between different domains.',
            },
            {
                name: 'Evangelist',
                className: 'The Communicators',
                classFocus: 'Explanation, Bridge',
                historicalFigure: 'Paul the Apostle',
                vector: [0.7, 0.3, 0.5, 0.7, 0.4, 0.6, 0.7, 0.4, 0.5, 0.9, 0.5, 0.6],
                description: 'Passionately promotes technologies and methodologies. Builds communities and exerts influence.',
            },
            {
                name: 'Teacher',
                className: 'The Communicators',
                classFocus: 'Explanation, Bridge',
                historicalFigure: 'Anne Sullivan',
                vector: [0.3, 0.7, 0.7, 0.4, 0.8, 0.7, 0.3, 0.7, 0.4, 0.8, 0.7, 0.7],
                description: 'Explains concepts step-by-step tailored to the audience level. Mentors and creates tutorials.',
            },
        ],
    },
    {
        name: 'The Collaborators',
        focus: 'Orchestration',
        archetypes: [
            {
                name: 'Coordinator',
                className: 'The Collaborators',
                classFocus: 'Orchestration',
                historicalFigure: 'Dag Hammarskjöld',
                vector: [0.4, 0.6, 0.6, 0.5, 0.6, 0.6, 0.4, 0.6, 0.3, 0.9, 0.6, 0.6],
                description: 'Mediates differences between team members. Drives consensus and smooth progress.',
            },
            {
                name: 'Swarm Leader',
                className: 'The Collaborators',
                classFocus: 'Orchestration',
                historicalFigure: 'Ernest Shackleton',
                vector: [0.5, 0.5, 0.6, 0.6, 0.5, 0.6, 0.6, 0.5, 0.4, 0.95, 0.5, 0.7],
                description: 'Leads teams toward goals with quick judgment and decisiveness. Sets technical direction.',
            },
            {
                name: 'Supporter',
                className: 'The Collaborators',
                classFocus: 'Orchestration',
                historicalFigure: 'Tenzing Norgay',
                vector: [0.3, 0.7, 0.5, 0.5, 0.6, 0.5, 0.3, 0.7, 0.2, 1.0, 0.5, 0.8],
                description: 'Quietly supports colleagues\' success. Creates comfortable working environments. DevOps and internal tools.',
            },
        ],
    },
    {
        name: 'The Evolvers',
        focus: 'Shift, Adaptation',
        archetypes: [
            {
                name: 'Reflector',
                className: 'The Evolvers',
                classFocus: 'Shift, Adaptation',
                historicalFigure: 'Marcus Aurelius',
                vector: [0.5, 0.5, 0.7, 0.4, 0.6, 0.7, 0.5, 0.6, 0.5, 0.5, 0.9, 0.6],
                description: 'Objectively analyzes own actions and outcomes. Learns from failures and continuously improves.',
            },
            {
                name: 'Shifter',
                className: 'The Evolvers',
                classFocus: 'Shift, Adaptation',
                historicalFigure: 'David Bowie',
                vector: [0.8, 0.3, 0.5, 0.7, 0.4, 0.6, 0.8, 0.4, 0.6, 0.4, 0.9, 0.5],
                description: 'Changes roles as needed. Adapts to the optimal form the situation demands. Full-stack generalist.',
            },
            {
                name: 'Meta-Learner',
                className: 'The Evolvers',
                classFocus: 'Shift, Adaptation',
                historicalFigure: 'AlphaGo',
                vector: [0.4, 0.6, 0.8, 0.4, 0.8, 0.8, 0.4, 0.7, 0.5, 0.5, 0.95, 0.6],
                description: 'Improves the mechanism of learning itself. Grows exponentially with experience. Optimizes ML pipelines.',
            },
        ],
    },
];

/** Flat array of all 36 archetypes */
export const ALL_ARCHETYPES: Archetype[] = ARCHETYPE_DATA.flatMap(c => c.archetypes);

/** All 12 archetype classes */
export const ARCHETYPE_CLASSES: ArchetypeClass[] = ARCHETYPE_DATA;

/** Find archetype by name (case-insensitive) */
export function findArchetype(name: string): Archetype | undefined {
    return ALL_ARCHETYPES.find(a => a.name.toLowerCase() === name.toLowerCase());
}

/** Cosine similarity between two vectors */
export function cosineSimilarity(v1: number[], v2: number[]): number {
    const dotProduct = v1.reduce((sum, a, i) => sum + a * v2[i], 0);
    const normV1 = Math.sqrt(v1.reduce((sum, a) => sum + a * a, 0));
    const normV2 = Math.sqrt(v2.reduce((sum, a) => sum + a * a, 0));
    if (normV1 === 0 || normV2 === 0) return 0;
    return dotProduct / (normV1 * normV2);
}

/** Find the best matching archetype for a given feature vector */
export function matchArchetype(featureVector: number[]): { archetype: Archetype; score: number }[] {
    return ALL_ARCHETYPES
        .map(a => ({ archetype: a, score: cosineSimilarity(featureVector, a.vector) }))
        .sort((a, b) => b.score - a.score);
}
