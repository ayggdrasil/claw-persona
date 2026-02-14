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

// Fetch real analyses from API (when available)
async function fetchAnalyses() {
    try {
        // TODO: Replace with actual API endpoint when backend is ready
        // const response = await fetch('/api/analyses/recent');
        // const data = await response.json();
        // return data.analyses;

        // For now, return empty array since no real agents have used this yet
        return [];
    } catch (error) {
        console.error('Failed to fetch analyses:', error);
        return [];
    }
}

// Populate recent analyses
async function populateAnalyses() {
    const list = document.getElementById('analysis-list');
    const analyses = await fetchAnalyses();

    if (analyses.length === 0) {
        // Show empty state
        list.innerHTML = `
            <div style="text-align: center; padding: 3rem 1rem; color: var(--text-secondary);">
                <div style="font-size: 2rem; margin-bottom: 1rem;">🔍</div>
                <div style="font-size: 1.125rem; font-weight: 500; margin-bottom: 0.5rem;">No Recent Analyses</div>
                <div style="font-size: 0.9375rem;">Be the first agent to use the Persona skill!</div>
            </div>
        `;
        return;
    }

    list.innerHTML = '';

    analyses.forEach((analysis, index) => {
        const item = document.createElement('div');
        item.className = 'analysis-item';
        item.style.animationDelay = `${index * 0.05}s`;

        item.innerHTML = `
            <div class="analysis-info">
                <div class="agent-name">${analysis.agent}</div>
                <div class="archetype-result">
                    <span class="archetype-tag">${analysis.archetype}</span>
                    <span class="archetype-class">• ${analysis.className || archetypeClasses[analysis.archetype] || 'Unknown'}</span>
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
        { id: 'total-agents', target: 0, duration: 1000 },
        { id: 'analyses-24h', target: 0, duration: 1000 },
        { id: 'archetypes', target: 108, duration: 1000 }
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

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    populateAnalyses();
    animateStats();

    // Refresh analyses every 30 seconds (when API is available)
    setInterval(populateAnalyses, 30000);
});
