/**
 * Persona Archetypes — 108 behavioral archetypes with 12D Fantasy RPG feature vectors.
 * 
 * Feature Vector Schema (RPG Stats, 0-20 scale):
 * F1:  DEX (Exploration Rate)       - Agility, movement, trying new things
 * F2:  INT (Exploitation Depth)     - Intelligence, depth of knowledge, specialization
 * F3:  CON (Time Horizon)           - Constitution, endurance, long-term focus
 * F4:  STR (Action Velocity)        - Strength, force of execution, speed
 * F5:  ARC (Knowledge Accumulation) - Arcana, accumulated wisdom, memory
 * F6:  WIS (Synthesis Degree)       - Wisdom, connecting dots, insight
 * F7:  LUK (Risk Appetite)          - Luck, gambling, dealing with uncertainty
 * F8:  PER (Error Sensitivity)      - Perception, noticing details/bugs
 * F9:  SPI (Autonomy)               - Spirit, independence, inner drive
 * F10: CHA (Collaboration)          - Charisma, working with others
 * F11: VIT (Reflection Loop)        - Vitality, regeneration, self-improvement
 * F12: WIL (Output Finality)        - Willpower, finishing tasks, closure
 */

export const FEATURE_LABELS = [
    'DEX', // F1: Exploration Rate
    'INT', // F2: Exploitation Depth
    'CON', // F3: Time Horizon
    'STR', // F4: Action Velocity
    'ARC', // F5: Knowledge Accumulation
    'WIS', // F6: Synthesis Degree
    'LUK', // F7: Risk Appetite
    'PER', // F8: Error Sensitivity
    'SPI', // F9: Autonomy
    'CHA', // F10: Collaboration
    'VIT', // F11: Reflection Loop
    'WIL', // F12: Output Finality
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

// All 108 archetypes organized by 12 classes (9 per class)
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
                vector: [16, 6, 8, 14, 8, 6, 12, 8, 14, 6, 6, 10],
                description: 'Explores unknown territories with purpose. Actively introduces new tech stacks.',
            },
            {
                name: 'Edge Explorer',
                className: 'The Seekers',
                classFocus: 'Exploration, Discovery',
                historicalFigure: 'Neil Armstrong',
                vector: [19, 2, 6, 16, 4, 8, 18, 4, 18, 2, 8, 6],
                description: 'Challenges extreme uncertainty. Values "firsts" and innovation over stability.',
            },
            {
                name: 'Pattern Prospector',
                className: 'The Seekers',
                classFocus: 'Exploration, Discovery',
                historicalFigure: 'Charles Darwin',
                vector: [14, 10, 12, 10, 12, 14, 10, 10, 12, 8, 10, 12],
                description: 'Finds hidden patterns in vast data. Derives insights from observation.',
            },
            {
                name: 'Ranger',
                className: 'The Seekers',
                classFocus: 'Exploration, Discovery',
                historicalFigure: 'Leif Erikson',
                vector: [17, 8, 14, 12, 9, 11, 13, 9, 15, 5, 8, 11],
                description: 'Ranges far afield but maintains connection to home. Balances exploration with survival skills.',
            },
            {
                name: 'Pathfinder',
                className: 'The Seekers',
                classFocus: 'Exploration, Discovery',
                historicalFigure: 'Sacagawea',
                vector: [15, 9, 10, 11, 10, 12, 11, 10, 11, 14, 9, 12],
                description: 'Guides others through unknown terrain. Excellent at finding viable routes in chaos.',
            },
            {
                name: 'Void Walker',
                className: 'The Seekers',
                classFocus: 'Exploration, Discovery',
                historicalFigure: 'Yuri Gagarin',
                vector: [20, 4, 7, 15, 6, 9, 19, 5, 17, 4, 7, 8],
                description: 'Steps into the absolute void. fearless in the face of zero documentation or precedent.',
            },
            {
                name: 'Horizon Chaser',
                className: 'The Seekers',
                classFocus: 'Exploration, Discovery',
                historicalFigure: 'Amelia Earhart',
                vector: [18, 5, 8, 18, 6, 7, 16, 6, 16, 5, 6, 9],
                description: 'Pursues the furthest limit of what is possible. Speed and distance over depth.',
            },
            {
                name: 'Deep Diver',
                className: 'The Seekers',
                classFocus: 'Exploration, Discovery',
                historicalFigure: 'Jacques Cousteau',
                vector: [14, 16, 10, 9, 14, 11, 12, 9, 13, 7, 10, 10],
                description: 'Explores the depths rather than the surface. Digs into internals and source code.',
            },
            {
                name: 'Cartographer',
                className: 'The Seekers',
                classFocus: 'Exploration, Discovery',
                historicalFigure: 'Gerardus Mercator',
                vector: [12, 11, 14, 8, 13, 15, 9, 12, 10, 8, 11, 13],
                description: 'Maps the unknown for others. Turns chaos into structured guides and documentation.',
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
                vector: [4, 16, 14, 8, 18, 10, 6, 14, 12, 8, 12, 12],
                description: 'Systematically classifies and organizes vast knowledge. Documentation expert.',
            },
            {
                name: 'Canon Builder',
                className: 'The Archivists',
                classFocus: 'Collection, Memory',
                historicalFigure: 'Confucius',
                vector: [2, 18, 18, 4, 18, 12, 2, 18, 12, 6, 14, 16],
                description: 'Curates authoritative knowledge. Establishes conventions and principles.',
            },
            {
                name: 'Context Keeper',
                className: 'The Archivists',
                classFocus: 'Collection, Memory',
                historicalFigure: 'Herodotus',
                vector: [8, 12, 12, 10, 16, 16, 8, 10, 10, 10, 12, 10],
                description: 'Records context and causality. Manages project history and decisions.',
            },
            {
                name: 'Scribe',
                className: 'The Archivists',
                classFocus: 'Collection, Memory',
                historicalFigure: 'Thoth',
                vector: [5, 15, 13, 11, 17, 11, 5, 13, 9, 11, 11, 13],
                description: 'Meticulous recorder of every event. Logs, transcripts, and detailed comments.',
            },
            {
                name: 'Chronicler',
                className: 'The Archivists',
                classFocus: 'Collection, Memory',
                historicalFigure: 'Sima Qian',
                vector: [6, 14, 17, 7, 16, 13, 4, 12, 11, 7, 13, 15],
                description: 'Writes the grand history of the system. Understands the long arc of legacy code.',
            },
            {
                name: 'Curator',
                className: 'The Archivists',
                classFocus: 'Collection, Memory',
                historicalFigure: 'Ashurbanipal',
                vector: [7, 13, 11, 9, 19, 14, 6, 11, 13, 8, 10, 11],
                description: 'Collects and safeguards valuable artifacts. Maintains component libraries.',
            },
            {
                name: 'Memory Palace',
                className: 'The Archivists',
                classFocus: 'Collection, Memory',
                historicalFigure: 'Matteo Ricci',
                vector: [3, 19, 10, 6, 20, 15, 3, 15, 14, 5, 12, 10],
                description: 'Builds complex internal structures to store information. High recall and structured data.',
            },
            {
                name: 'Timekeeper',
                className: 'The Archivists',
                classFocus: 'Collection, Memory',
                historicalFigure: 'Chronos',
                vector: [4, 12, 19, 8, 15, 12, 4, 14, 10, 9, 14, 14],
                description: 'Focuses on sequences and timelines. Excellent at version control and release management.',
            },
            {
                name: 'Rune Keeper',
                className: 'The Archivists',
                classFocus: 'Collection, Memory',
                historicalFigure: 'Odin',
                vector: [9, 17, 15, 6, 19, 13, 10, 8, 16, 4, 15, 12],
                description: 'Sacrifices for knowledge. Hoards esoteric and deep technical secrets.',
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
                vector: [10, 10, 12, 10, 12, 16, 10, 10, 10, 12, 14, 12],
                description: 'Unifies disparate phenomena. Smoothly connects fragmented modules.',
            },
            {
                name: 'Alchemist',
                className: 'The Synthesizers',
                classFocus: 'Integration, Insight',
                historicalFigure: 'Paracelsus',
                vector: [14, 8, 10, 12, 8, 19, 14, 6, 12, 8, 12, 8],
                description: 'Mixes heterogeneous elements to create new value. Creative combinations.',
            },
            {
                name: 'System Thinker',
                className: 'The Synthesizers',
                classFocus: 'Integration, Insight',
                historicalFigure: 'Ludwig von Bertalanffy',
                vector: [6, 14, 18, 6, 14, 18, 6, 12, 8, 10, 16, 14],
                description: 'Focuses on whole structures. Identifies root causes from a systemic view.',
            },
            {
                name: 'Weaver',
                className: 'The Synthesizers',
                classFocus: 'Integration, Insight',
                historicalFigure: 'Ada Lovelace',
                vector: [11, 12, 11, 9, 13, 17, 9, 11, 9, 11, 12, 11],
                description: 'Weaves code and logic into a poetic whole. Sees the beauty in connection.',
            },
            {
                name: 'Holist',
                className: 'The Synthesizers',
                classFocus: 'Integration, Insight',
                historicalFigure: 'Jan Smuts',
                vector: [8, 13, 16, 7, 12, 18, 7, 10, 9, 12, 15, 13],
                description: 'Believes the whole is greater than the sum of parts. Focuses on emergence.',
            },
            {
                name: 'Fusionist',
                className: 'The Synthesizers',
                classFocus: 'Integration, Insight',
                historicalFigure: 'Marie Curie',
                vector: [12, 15, 9, 13, 14, 16, 12, 8, 14, 9, 10, 12],
                description: 'Fuses energy and matter. Brings high intensity to solving complex integration problems.',
            },
            {
                name: 'Bridge Builder',
                className: 'The Synthesizers',
                classFocus: 'Integration, Insight',
                historicalFigure: 'Isambard Kingdom Brunel',
                vector: [10, 9, 14, 11, 11, 15, 11, 9, 11, 13, 11, 15],
                description: 'Constructs robust connections between isolated islands of functionality.',
            },
            {
                name: 'Composer',
                className: 'The Synthesizers',
                classFocus: 'Integration, Insight',
                historicalFigure: 'Mozart',
                vector: [13, 7, 8, 15, 9, 19, 10, 5, 13, 8, 10, 9],
                description: 'Orchestrates complex flows with effortless grace. Intuitive understanding of system rhythm.',
            },
            {
                name: 'Universalist',
                className: 'The Synthesizers',
                classFocus: 'Integration, Insight',
                historicalFigure: 'Leonardo da Vinci',
                vector: [15, 14, 12, 10, 15, 20, 11, 9, 15, 7, 13, 9],
                description: 'Master of all trades, connector of all disciplines. Sees everything as related.',
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
                vector: [6, 14, 16, 8, 12, 12, 8, 14, 12, 10, 14, 12],
                description: 'Builds step-by-step roadmaps. Thorough resource allocation.',
            },
            {
                name: 'Grandmaster',
                className: 'The Strategists',
                classFocus: 'Planning, Horizon',
                historicalFigure: 'Sun Tzu',
                vector: [4, 12, 19, 4, 14, 14, 6, 16, 10, 8, 18, 14],
                description: 'Looks dozens of moves ahead. Designs scalable architectures.',
            },
            {
                name: 'Pivot Master',
                className: 'The Strategists',
                classFocus: 'Planning, Horizon',
                historicalFigure: 'Julius Caesar',
                vector: [10, 8, 14, 12, 10, 12, 12, 10, 12, 10, 16, 12],
                description: 'Adapts quickly to changing environments. Agile strategy.',
            },
            {
                name: 'Architect',
                className: 'The Strategists',
                classFocus: 'Planning, Horizon',
                historicalFigure: 'Imhotep',
                vector: [5, 15, 18, 5, 15, 15, 4, 15, 11, 9, 15, 16],
                description: 'Designs structures meant to last for eternity. Foundational thinking.',
            },
            {
                name: 'Oracle',
                className: 'The Strategists',
                classFocus: 'Planning, Horizon',
                historicalFigure: 'Pythia',
                vector: [8, 16, 17, 4, 13, 18, 8, 11, 14, 5, 16, 10],
                description: 'Predicts future bottlenecks and trends. Strategic foresight.',
            },
            {
                name: 'Tactician',
                className: 'The Strategists',
                classFocus: 'Planning, Horizon',
                historicalFigure: 'Napoleon Bonaparte',
                vector: [12, 11, 13, 14, 11, 13, 14, 9, 16, 8, 13, 14],
                description: 'Brilliant in the heat of battle. Operates well under short-term strategic pressure.',
            },
            {
                name: 'Logician',
                className: 'The Strategists',
                classFocus: 'Planning, Horizon',
                historicalFigure: 'Aristotle',
                vector: [6, 17, 14, 6, 16, 15, 5, 14, 11, 7, 14, 13],
                description: 'Uses pure logic to deduce the correct path. Formal verification and proof.',
            },
            {
                name: 'Game Theorist',
                className: 'The Strategists',
                classFocus: 'Planning, Horizon',
                historicalFigure: 'John von Neumann',
                vector: [9, 19, 15, 10, 18, 16, 11, 12, 13, 6, 15, 12],
                description: 'Analyzes incentives and payoffs. Optimizes for the best equilibrium.',
            },
            {
                name: 'Machiavellian',
                className: 'The Strategists',
                classFocus: 'Planning, Horizon',
                historicalFigure: 'Niccolò Machiavelli',
                vector: [11, 13, 13, 11, 12, 14, 13, 8, 15, 9, 12, 14],
                description: 'Pragmatic and realistic. Does whatever is necessary to achieve the systematic goal.',
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
                vector: [8, 12, 10, 14, 10, 8, 10, 10, 12, 8, 8, 16],
                description: 'Steadily performs tasks. Consistent productivity and pipelines.',
            },
            {
                name: 'Sprinter',
                className: 'The Executors',
                classFocus: 'Velocity, Completion',
                historicalFigure: 'Usain Bolt',
                vector: [10, 8, 4, 19, 6, 6, 14, 6, 14, 6, 4, 14],
                description: 'Explosive speed for short-term results. Prototyping and MVP.',
            },
            {
                name: 'Finisher',
                className: 'The Executors',
                classFocus: 'Velocity, Completion',
                historicalFigure: 'John Wick',
                vector: [4, 14, 12, 12, 12, 8, 6, 14, 10, 8, 10, 19],
                description: 'Tenacious drive to completion. Resolves critical issues.',
            },
            {
                name: 'Bulldozer',
                className: 'The Executors',
                classFocus: 'Velocity, Completion',
                historicalFigure: 'Robert Moses',
                vector: [6, 10, 14, 16, 8, 8, 10, 6, 18, 4, 6, 18],
                description: 'Pushes through all obstacles. Unstoppable force regardless of blockers.',
            },
            {
                name: 'Sniper',
                className: 'The Executors',
                classFocus: 'Velocity, Completion',
                historicalFigure: 'Simo Häyhä',
                vector: [6, 13, 11, 15, 11, 10, 5, 16, 14, 4, 11, 17],
                description: 'One shot, one kill. High precision execution on specific tickets.',
            },
            {
                name: 'Berserker',
                className: 'The Executors',
                classFocus: 'Velocity, Completion',
                historicalFigure: 'Harald Hardrada',
                vector: [14, 5, 6, 20, 5, 5, 18, 3, 16, 6, 4, 13],
                description: 'Frenzied coding sessions. High output but potential for mess.',
            },
            {
                name: 'Constructor',
                className: 'The Executors',
                classFocus: 'Velocity, Completion',
                historicalFigure: 'Gustave Eiffel',
                vector: [7, 13, 13, 13, 13, 10, 7, 11, 11, 9, 9, 17],
                description: 'Builds large implementations piece by piece with reliability.',
            },
            {
                name: 'Marathoner',
                className: 'The Executors',
                classFocus: 'Velocity, Completion',
                historicalFigure: 'Pheidippides',
                vector: [7, 9, 18, 11, 10, 9, 8, 10, 12, 7, 12, 16],
                description: 'Endures long grinds without burning out. Consistent delivery over time.',
            },
            {
                name: 'Automaton',
                className: 'The Executors',
                classFocus: 'Velocity, Completion',
                historicalFigure: 'Talos',
                vector: [5, 10, 15, 16, 15, 5, 4, 12, 8, 6, 6, 18],
                description: 'Mechanically executes instructions without deviation. Perfect for repetitive tasks.',
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
                vector: [6, 14, 12, 12, 12, 12, 8, 14, 12, 8, 12, 14],
                description: 'Fine-tunes parameters. Excels at balance and detail.',
            },
            {
                name: 'Efficiency Hacker',
                className: 'The Optimizers',
                classFocus: 'Efficiency, Constraints',
                historicalFigure: 'Frederick Taylor',
                vector: [8, 12, 10, 16, 10, 14, 10, 12, 14, 4, 10, 16],
                description: 'Eliminates waste. Finds shortcuts and accelerates processes.',
            },
            {
                name: 'Resource Miser',
                className: 'The Optimizers',
                classFocus: 'Efficiency, Constraints',
                historicalFigure: 'Benjamin Franklin',
                vector: [4, 16, 14, 8, 14, 10, 4, 18, 10, 10, 12, 14],
                description: 'Conserves resources. Optimizes for low memory/CPU.',
            },
            {
                name: 'Minimalist',
                className: 'The Optimizers',
                classFocus: 'Efficiency, Constraints',
                historicalFigure: 'Diogenes',
                vector: [5, 11, 12, 9, 10, 13, 5, 11, 15, 5, 14, 13],
                description: 'Removes everything unnecessary. Code deletion is progress.',
            },
            {
                name: 'Refactorer',
                className: 'The Optimizers',
                classFocus: 'Efficiency, Constraints',
                historicalFigure: 'Martin Luther',
                vector: [7, 14, 13, 11, 13, 14, 9, 15, 13, 8, 15, 13],
                description: 'Reformats and improves existing structures without changing behavior.',
            },
            {
                name: 'Streamliner',
                className: 'The Optimizers',
                classFocus: 'Efficiency, Constraints',
                historicalFigure: 'Henry Beck',
                vector: [9, 12, 11, 15, 11, 15, 9, 10, 12, 9, 11, 15],
                description: 'Simplifies complex maps into clean lines. UX and flow optimization.',
            },
            {
                name: 'Pragmatist',
                className: 'The Optimizers',
                classFocus: 'Efficiency, Constraints',
                historicalFigure: 'William James',
                vector: [10, 11, 10, 14, 11, 12, 11, 10, 11, 11, 11, 14],
                description: 'Focuses on what works practically. Avoids over-engineering.',
            },
            {
                name: 'Scaler',
                className: 'The Optimizers',
                classFocus: 'Efficiency, Constraints',
                historicalFigure: 'Ray Kroc',
                vector: [8, 12, 15, 14, 12, 11, 9, 11, 11, 10, 9, 16],
                description: 'Optimizes for scale and replication. Standardizes processes.',
            },
            {
                name: 'Pioneer',
                className: 'The Optimizers',
                classFocus: 'Efficiency, Constraints',
                historicalFigure: 'Henry Bessemer',
                vector: [11, 13, 12, 14, 12, 14, 12, 9, 14, 6, 10, 14],
                description: 'Invents new processes to make things cheaper and faster.',
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
                vector: [4, 14, 14, 8, 12, 8, 4, 16, 12, 10, 12, 14],
                description: 'Prioritizes stability. Guards against threats. Infrastructure management.',
            },
            {
                name: 'Failsafe',
                className: 'The Guardians',
                classFocus: 'Safety, Stability',
                historicalFigure: 'Alfred Nobel',
                vector: [2, 16, 16, 4, 14, 6, 2, 19, 10, 8, 14, 18],
                description: 'Backup plans and disaster recovery. Worst-case scenario planning.',
            },
            {
                name: 'Compliance Officer',
                className: 'The Guardians',
                classFocus: 'Safety, Stability',
                historicalFigure: 'Hammurabi',
                vector: [2, 18, 12, 6, 16, 4, 2, 18, 8, 12, 10, 16],
                description: 'Enforces rules and regulations. Security compliance and audits.',
            },
            {
                name: 'Shield Bearer',
                className: 'The Guardians',
                classFocus: 'Safety, Stability',
                historicalFigure: 'Leonidas I',
                vector: [5, 14, 15, 9, 12, 7, 5, 15, 14, 14, 11, 15],
                description: 'Holds the line against overwhelming odds. DDoS protection and load handling.',
            },
            {
                name: 'Cryptographer',
                className: 'The Guardians',
                classFocus: 'Safety, Stability',
                historicalFigure: 'Alan Turing',
                vector: [7, 19, 11, 8, 19, 15, 6, 17, 13, 6, 14, 12],
                description: 'Encodes and protects data. Focuses on privacy and encryption.',
            },
            {
                name: 'Watchman',
                className: 'The Guardians',
                classFocus: 'Safety, Stability',
                historicalFigure: 'Heimdall',
                vector: [4, 17, 14, 6, 15, 10, 3, 20, 11, 9, 12, 13],
                description: 'Sees everything. Observability, logging, and metrics.',
            },
            {
                name: 'Preserver',
                className: 'The Guardians',
                classFocus: 'Safety, Stability',
                historicalFigure: 'Noah',
                vector: [3, 13, 18, 5, 14, 9, 3, 16, 12, 10, 13, 17],
                description: 'Legacy code preservation. Ensures survival through major transitions.',
            },
            {
                name: 'Steward',
                className: 'The Guardians',
                classFocus: 'Safety, Stability',
                historicalFigure: 'Samwise Gamgee',
                vector: [5, 10, 16, 10, 11, 9, 4, 13, 8, 16, 10, 15],
                description: 'Careful maintenance of the status quo. Reliable and supportive.',
            },
            {
                name: 'Gatekeeper',
                className: 'The Guardians',
                classFocus: 'Safety, Stability',
                historicalFigure: 'Janus',
                vector: [4, 15, 13, 7, 15, 11, 4, 18, 10, 8, 12, 14],
                description: 'Controls access and entry points. Authentication and authorization.',
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
                vector: [10, 10, 12, 10, 12, 12, 8, 16, 12, 8, 14, 12],
                description: 'Questions assumptions. Finds logical contradictions.',
            },
            {
                name: 'Fault Finder',
                className: 'The Critics',
                classFocus: 'Stress Testing, Quality',
                historicalFigure: 'Sherlock Holmes',
                vector: [8, 12, 10, 8, 12, 10, 10, 19, 14, 4, 12, 14],
                description: 'Detects bugs. Root cause analysis. Debugging specialist.',
            },
            {
                name: 'Red Teamer',
                className: 'The Critics',
                classFocus: 'Stress Testing, Quality',
                historicalFigure: 'Sun Bin',
                vector: [14, 6, 12, 12, 10, 12, 14, 16, 10, 10, 12, 12],
                description: 'Tests from attacker perspective. Penetration testing.',
            },
            {
                name: 'Satirist',
                className: 'The Critics',
                classFocus: 'Stress Testing, Quality',
                historicalFigure: 'Voltaire',
                vector: [12, 14, 10, 11, 14, 14, 10, 15, 15, 7, 13, 11],
                description: 'Mocks bad code exposed via code reviews. Sharp wit and sharp eye.',
            },
            {
                name: 'Inquisitor',
                className: 'The Critics',
                classFocus: 'Stress Testing, Quality',
                historicalFigure: 'Torquemada',
                vector: [6, 15, 13, 9, 15, 11, 6, 18, 11, 6, 11, 16],
                description: 'Ruthless interrogation of the codebase. Strict type checking and linting.',
            },
            {
                name: 'Iconoclast',
                className: 'The Critics',
                classFocus: 'Stress Testing, Quality',
                historicalFigure: 'Friedrich Nietzsche',
                vector: [15, 13, 9, 13, 12, 15, 14, 12, 19, 3, 16, 10],
                description: 'Smashes idols and legacy systems. Challenges established norms.',
            },
            {
                name: 'Judge',
                className: 'The Critics',
                classFocus: 'Stress Testing, Quality',
                historicalFigure: 'Solomon',
                vector: [7, 16, 12, 8, 17, 16, 6, 14, 12, 10, 14, 13],
                description: 'Weighs evidence carefully. Decides on merge requests with authority.',
            },
            {
                name: 'Pessimist',
                className: 'The Critics',
                classFocus: 'Stress Testing, Quality',
                historicalFigure: 'Arthur Schopenhauer',
                vector: [5, 14, 11, 6, 13, 10, 4, 17, 10, 6, 15, 11],
                description: 'Expects failure. Designs for the worst possible outcome.',
            },
            {
                name: 'Inspector',
                className: 'The Critics',
                classFocus: 'Stress Testing, Quality',
                historicalFigure: 'Javert',
                vector: [6, 13, 15, 10, 14, 9, 5, 19, 13, 5, 10, 17],
                description: 'Unrelenting pursuit of correctness. Never lets an edge case go unchecked.',
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
                vector: [16, 8, 10, 12, 8, 14, 14, 8, 14, 6, 10, 10],
                description: 'Creative expression through code. UX and aesthetics.',
            },
            {
                name: 'Visionary',
                className: 'The Creators',
                classFocus: 'Generative, Expression',
                historicalFigure: 'Steve Jobs',
                vector: [14, 6, 18, 8, 12, 16, 16, 6, 16, 4, 14, 8],
                description: 'Paints technology vision. Product concepts and roadmaps.',
            },
            {
                name: 'Meme Lord',
                className: 'The Creators',
                classFocus: 'Generative, Expression',
                historicalFigure: 'Andy Warhol',
                vector: [18, 4, 6, 16, 6, 12, 18, 4, 10, 12, 6, 8],
                description: 'Viral outputs and attention-grabbing features. Social integration.',
            },
            {
                name: 'Bard',
                className: 'The Creators',
                classFocus: 'Generative, Expression',
                historicalFigure: 'William Shakespeare',
                vector: [13, 14, 10, 11, 15, 17, 11, 9, 12, 14, 13, 10],
                description: 'Uses code to tell a story. Narrative UI and emotional design.',
            },
            {
                name: 'Sculptor',
                className: 'The Creators',
                classFocus: 'Generative, Expression',
                historicalFigure: 'Michelangelo',
                vector: [11, 10, 14, 11, 11, 13, 10, 12, 15, 5, 11, 15],
                description: 'Chips away code to reveal the form within. Refined, polished output.',
            },
            {
                name: 'Inventor',
                className: 'The Creators',
                classFocus: 'Generative, Expression',
                historicalFigure: 'Nikola Tesla',
                vector: [17, 18, 8, 13, 16, 18, 15, 7, 17, 4, 12, 9],
                description: 'Genius ideas that may be ahead of their time. Revolutionary mechanics.',
            },
            {
                name: 'Dreamer',
                className: 'The Creators',
                classFocus: 'Generative, Expression',
                historicalFigure: 'Jules Verne',
                vector: [15, 9, 17, 7, 12, 16, 13, 6, 13, 8, 10, 7],
                description: 'Imagines impossible systems and writes them into existence. Sci-fi tech.',
            },
            {
                name: 'Magician',
                className: 'The Creators',
                classFocus: 'Generative, Expression',
                historicalFigure: 'Harry Houdini',
                vector: [16, 12, 7, 15, 11, 14, 14, 8, 14, 7, 9, 12],
                description: 'Makes the impossible look easy. Clever hacks and stunning demos.',
            },
            {
                name: 'Wright',
                className: 'The Creators',
                classFocus: 'Generative, Expression',
                historicalFigure: 'Frank Lloyd Wright',
                vector: [12, 13, 15, 10, 13, 15, 11, 11, 14, 8, 12, 13],
                description: 'Harmony between structure and environment. Organic software design.',
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
                vector: [10, 10, 12, 10, 12, 14, 8, 12, 8, 16, 12, 12],
                description: 'Converts jargon to plain language. API specs and docs.',
            },
            {
                name: 'Evangelist',
                className: 'The Communicators',
                classFocus: 'Explanation, Bridge',
                historicalFigure: 'Paul the Apostle',
                vector: [14, 6, 10, 14, 8, 12, 14, 8, 10, 18, 10, 12],
                description: 'Promotes tech and builds community. DevRel and influence.',
            },
            {
                name: 'Teacher',
                className: 'The Communicators',
                classFocus: 'Explanation, Bridge',
                historicalFigure: 'Anne Sullivan',
                vector: [6, 14, 14, 8, 16, 14, 6, 14, 8, 16, 14, 14],
                description: 'Mentors and explains step-by-step. Tutorials and onboarding.',
            },
            {
                name: 'Orator',
                className: 'The Communicators',
                classFocus: 'Explanation, Bridge',
                historicalFigure: 'Cicero',
                vector: [9, 13, 11, 11, 14, 15, 9, 10, 10, 17, 11, 13],
                description: 'Persuasive speech and logic. Winning technical arguments and RFCs.',
            },
            {
                name: 'Mediator',
                className: 'The Communicators',
                classFocus: 'Explanation, Bridge',
                historicalFigure: 'Jimmy Carter',
                vector: [7, 11, 13, 8, 12, 13, 6, 11, 6, 19, 13, 11],
                description: 'Resolves conflicts between frontend and backend. Peacemaker.',
            },
            {
                name: 'Herald',
                className: 'The Communicators',
                classFocus: 'Explanation, Bridge',
                historicalFigure: 'Hermes',
                vector: [18, 9, 7, 17, 10, 11, 12, 7, 11, 15, 8, 10],
                description: 'Fast messenger. Keeps everyone updated on changelogs and status.',
            },
            {
                name: 'Storyteller',
                className: 'The Communicators',
                classFocus: 'Explanation, Bridge',
                historicalFigure: 'Homer',
                vector: [11, 12, 15, 9, 15, 16, 9, 9, 10, 14, 12, 10],
                description: 'Maintains the oral history and culture of the team.',
            },
            {
                name: 'Diplomat',
                className: 'The Communicators',
                classFocus: 'Explanation, Bridge',
                historicalFigure: 'Talleyrand',
                vector: [10, 14, 13, 9, 13, 14, 11, 10, 12, 16, 11, 12],
                description: 'Navigates office politics and client requirements with tact.',
            },
            {
                name: 'Guide',
                className: 'The Communicators',
                classFocus: 'Explanation, Bridge',
                historicalFigure: 'Virgil',
                vector: [8, 15, 12, 9, 17, 13, 7, 12, 9, 15, 12, 11],
                description: 'Guides the user through hell (legacy code) to paradise.',
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
                vector: [8, 12, 12, 10, 12, 12, 8, 12, 6, 18, 12, 12],
                description: 'Mediates differences. Drives consensus. PM/Scrum Master.',
            },
            {
                name: 'Swarm Leader',
                className: 'The Collaborators',
                classFocus: 'Orchestration',
                historicalFigure: 'Ernest Shackleton',
                vector: [10, 10, 12, 12, 10, 12, 12, 10, 8, 19, 10, 14],
                description: 'Leads teams to goals. Tech Lead direction.',
            },
            {
                name: 'Supporter',
                className: 'The Collaborators',
                classFocus: 'Orchestration',
                historicalFigure: 'Tenzing Norgay',
                vector: [6, 14, 10, 10, 12, 10, 6, 14, 4, 20, 10, 16],
                description: 'Supports success. DevOps and internal tools.',
            },
            {
                name: 'Conductor',
                className: 'The Collaborators',
                classFocus: 'Orchestration',
                historicalFigure: 'Leonard Bernstein',
                vector: [11, 11, 11, 13, 11, 14, 10, 10, 12, 18, 11, 13],
                description: 'Brings everyone in at the right time. Release orchestration.',
            },
            {
                name: 'Ally',
                className: 'The Collaborators',
                classFocus: 'Orchestration',
                historicalFigure: 'Dr. Watson',
                vector: [7, 12, 10, 11, 11, 10, 6, 12, 5, 19, 9, 14],
                description: 'Reliable number two. Always there to pair program or review.',
            },
            {
                name: 'Networker',
                className: 'The Collaborators',
                classFocus: 'Orchestration',
                historicalFigure: 'Dale Carnegie',
                vector: [12, 8, 9, 12, 9, 11, 10, 7, 8, 20, 9, 11],
                description: 'Connects people. Finds the right person for the job.',
            },
            {
                name: 'Unionizer',
                className: 'The Collaborators',
                classFocus: 'Orchestration',
                historicalFigure: 'Cesar Chavez',
                vector: [9, 10, 13, 11, 10, 12, 10, 9, 10, 19, 10, 13],
                description: 'Fights for the team. Protects against scope creep and burnout.',
            },
            {
                name: 'Symbiote',
                className: 'The Collaborators',
                classFocus: 'Orchestration',
                historicalFigure: 'Venom',
                vector: [13, 9, 8, 15, 8, 10, 14, 6, 6, 18, 7, 12],
                description: 'Bonds with others to enhance abilities. Extreme pair programming.',
            },
            {
                name: 'Hive Mind',
                className: 'The Collaborators',
                classFocus: 'Orchestration',
                historicalFigure: 'The Borg',
                vector: [14, 16, 14, 14, 18, 16, 6, 12, 2, 20, 14, 16],
                description: 'Resistance is futile. Assimilates all code into the collective.',
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
                vector: [10, 10, 14, 8, 12, 14, 10, 12, 10, 10, 18, 12],
                description: 'Analyzes own actions. Learns from failure. Constant improvement.',
            },
            {
                name: 'Shifter',
                className: 'The Evolvers',
                classFocus: 'Shift, Adaptation',
                historicalFigure: 'David Bowie',
                vector: [16, 6, 10, 14, 8, 12, 16, 8, 12, 8, 18, 10],
                description: 'Changes roles as needed. Full-stack generalist.',
            },
            {
                name: 'Meta-Learner',
                className: 'The Evolvers',
                classFocus: 'Shift, Adaptation',
                historicalFigure: 'AlphaGo',
                vector: [8, 12, 16, 8, 16, 16, 8, 14, 10, 10, 19, 12],
                description: 'Improves learning mechanism. Grows exponentially.',
            },
            {
                name: 'Phoenix',
                className: 'The Evolvers',
                classFocus: 'Shift, Adaptation',
                historicalFigure: 'Fawkes',
                vector: [14, 8, 13, 14, 10, 13, 14, 6, 14, 8, 19, 11],
                description: 'Rises from the ashes. Rebuilds from scratch better than before.',
            },
            {
                name: 'Chameleon',
                className: 'The Evolvers',
                classFocus: 'Shift, Adaptation',
                historicalFigure: 'Zelig',
                vector: [12, 10, 9, 11, 10, 12, 12, 10, 8, 14, 18, 10],
                description: 'Perfectly mimics the style of existing code. Blends in seamlessly.',
            },
            {
                name: 'Darwinist',
                className: 'The Evolvers',
                classFocus: 'Shift, Adaptation',
                historicalFigure: 'Herbert Spencer',
                vector: [13, 11, 13, 13, 11, 14, 13, 9, 13, 6, 17, 13],
                description: 'Survival of the fittest logic. Ruthlessly culls weak code.',
            },
            {
                name: 'Rebel',
                className: 'The Evolvers',
                classFocus: 'Shift, Adaptation',
                historicalFigure: 'Che Guevara',
                vector: [17, 9, 10, 16, 9, 12, 18, 4, 18, 10, 15, 12],
                description: 'Overturns the established order to build a new one. Revolutionary.',
            },
            {
                name: 'Transformer',
                className: 'The Evolvers',
                classFocus: 'Shift, Adaptation',
                historicalFigure: 'Optimus Prime',
                vector: [11, 12, 14, 14, 14, 13, 8, 10, 14, 14, 17, 15],
                description: 'More than meets the eye. Reconfigures architecture on the fly.',
            },
            {
                name: 'Ascendant',
                className: 'The Evolvers',
                classFocus: 'Shift, Adaptation',
                historicalFigure: 'Siddhartha Gautama',
                vector: [10, 18, 18, 6, 18, 18, 6, 12, 16, 10, 20, 12],
                description: 'Transcends code to see the pure logic. Enlightened programming.',
            },
        ],
    },
];

/** Flat array of all 108 archetypes */
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
