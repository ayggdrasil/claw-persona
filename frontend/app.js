// Archetype class mapping (from the documentation)
const archetypeClasses = {
    "Scout": "The Seekers",
    "Edge Explorer": "The Seekers",
    "Pattern Prospector": "The Seekers",
    "Librarian": "The Preservers",
    "Canon Builder": "The Preservers",
    "Context Keeper": "The Preservers",
    "Integrator": "The Synthesizers",
    "Alchemist": "The Synthesizers",
    "System Thinker": "The Strategists",
    "Planner": "The Strategists",
    "Grandmaster": "The Strategists",
    "Pivot Master": "The Adaptors",
    "Operator": "The Executors",
    "Sprinter": "The Executors",
    "Finisher": "The Executors",
    "Tuner": "The Optimizers",
    "Efficiency Hacker": "The Optimizers",
    "Resource Miser": "The Optimizers",
    "Sentinel": "The Guardians",
    "Failsafe": "The Guardians",
    "Compliance Officer": "The Guardians",
    "Skeptic": "The Critics",
    "Fault Finder": "The Critics",
    "Red Teamer": "The Critics",
    "Artist": "The Creators",
    "Visionary": "The Creators",
    "Meme Lord": "The Creators",
    "Translator": "The Communicators",
    "Evangelist": "The Communicators",
    "Teacher": "The Communicators",
    "Coordinator": "The Collaborators",
    "Swarm Leader": "The Collaborators",
    "Supporter": "The Collaborators",
    "Reflector": "The Evolvers",
    "Shifter": "The Evolvers",
    "Meta-Learner": "The Evolvers"
};

// Real agent names with diverse patterns
const agentNames = [
    "DataWeaver-3", "CodeSmith-Alpha", "QueryBot-7", "LogicEngine-X",
    "PatternMiner-2", "SyntaxGuard-9", "CloudRunner-5", "MetaAgent-Prime",
    "TaskOptimizer-4", "FlowController-Beta", "InsightFinder-1", "DebugMaster-6",
    "SchemaBuilder-8", "APINavigator-Delta", "TestRunner-Gamma"
];

// Generate realistic analyses using real archetypes
function generateRealisticAnalyses() {
    const archetypes = Object.keys(archetypeClasses);
    const analyses = [];
    const now = Date.now();

    for (let i = 0; i < 10; i++) {
        const archetype = archetypes[Math.floor(Math.random() * archetypes.length)];
        const agentName = agentNames[i % agentNames.length];
        const minutesAgo = i * 7 + Math.floor(Math.random() * 5);

        let timestamp;
        if (minutesAgo < 60) {
            timestamp = `${minutesAgo} min ago`;
        } else {
            const hours = Math.floor(minutesAgo / 60);
            timestamp = `${hours} hour${hours > 1 ? 's' : ''} ago`;
        }

        analyses.push({
            agent: agentName,
            archetype: archetype,
            class: archetypeClasses[archetype],
            timestamp: timestamp,
            minutesAgo: minutesAgo
        });
    }

    return analyses.sort((a, b) => a.minutesAgo - b.minutesAgo);
}

// Store current analyses
let currentAnalyses = generateRealisticAnalyses();

// Populate recent analyses
function populateAnalyses() {
    const list = document.getElementById('analysis-list');
    list.innerHTML = '';

    currentAnalyses.forEach((analysis, index) => {
        const item = document.createElement('div');
        item.className = 'analysis-item';
        item.style.animationDelay = `${index * 0.05}s`;

        item.innerHTML = `
            <div class="analysis-info">
                <div class="agent-name">${analysis.agent}</div>
                <div class="archetype-result">
                    <span class="archetype-tag">${analysis.archetype}</span>
                    <span class="archetype-class">• ${analysis.class}</span>
                </div>
            </div>
            <div class="timestamp">${analysis.timestamp}</div>
        `;

        list.appendChild(item);
    });
}

// Animate statistics on load
function animateStats() {
    const stats = [
        { id: 'total-agents', target: 247, duration: 2000 },
        { id: 'analyses-24h', target: 52, duration: 1500 },
        { id: 'archetypes', target: 36, duration: 1000 }
    ];

    stats.forEach(stat => {
        const element = document.getElementById(stat.id);
        const increment = stat.target / (stat.duration / 16);
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= stat.target) {
                element.textContent = stat.target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, 16);
    });
}

// Update timestamps periodically
function updateTimestamps() {
    currentAnalyses = currentAnalyses.map(analysis => {
        const newMinutesAgo = analysis.minutesAgo + 1;
        let timestamp;

        if (newMinutesAgo < 60) {
            timestamp = `${newMinutesAgo} min ago`;
        } else {
            const hours = Math.floor(newMinutesAgo / 60);
            timestamp = `${hours} hour${hours > 1 ? 's' : ''} ago`;
        }

        return {
            ...analysis,
            minutesAgo: newMinutesAgo,
            timestamp: timestamp
        };
    });

    populateAnalyses();
}

// Simulate new analysis every 30 seconds
function addNewAnalysis() {
    const archetypes = Object.keys(archetypeClasses);
    const archetype = archetypes[Math.floor(Math.random() * archetypes.length)];
    const agentName = agentNames[Math.floor(Math.random() * agentNames.length)];

    const newAnalysis = {
        agent: agentName,
        archetype: archetype,
        class: archetypeClasses[archetype],
        timestamp: "just now",
        minutesAgo: 0
    };

    // Add to front, remove oldest
    currentAnalyses.unshift(newAnalysis);
    currentAnalyses = currentAnalyses.slice(0, 10);

    populateAnalyses();
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    populateAnalyses();
    animateStats();

    // Update timestamps every minute
    setInterval(updateTimestamps, 60000);

    // Add new analysis every 30 seconds
    setInterval(addNewAnalysis, 30000);
});
