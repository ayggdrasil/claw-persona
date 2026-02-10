// Mock data for recent analyses
const mockAnalyses = [
    { agent: "Socrates-Bot", archetype: "Philosopher", class: "The Critics", timestamp: "2 min ago" },
    { agent: "Explorer-7", archetype: "Scout", class: "The Seekers", timestamp: "5 min ago" },
    { agent: "Debug-Master", archetype: "Fault Finder", class: "The Critics", timestamp: "12 min ago" },
    { agent: "Data-Collector-3", archetype: "Archivist", class: "The Preservers", timestamp: "18 min ago" },
    { agent: "Refactor-Agent", archetype: "Reflector", class: "The Evolvers", timestamp: "23 min ago" },
    { agent: "Test-Runner-9", archetype: "Validator", class: "The Guardians", timestamp: "34 min ago" },
    { agent: "Code-Reviewer", archetype: "Skeptic", class: "The Critics", timestamp: "41 min ago" },
    { agent: "Deploy-Bot", archetype: "Executor", class: "The Builders", timestamp: "52 min ago" },
    { agent: "Monitor-Alpha", archetype: "Observer", class: "The Watchers", timestamp: "1 hour ago" },
    { agent: "Learning-Agent-5", archetype: "Edge Explorer", class: "The Seekers", timestamp: "1 hour ago" }
];

// Populate recent analyses
function populateAnalyses() {
    const list = document.getElementById('analysis-list');
    list.innerHTML = '';

    mockAnalyses.forEach((analysis, index) => {
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

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    populateAnalyses();
    animateStats();

    // Simulate new analyses every 10 seconds
    setInterval(() => {
        const newTimestamps = mockAnalyses.map((analysis, i) => {
            const minutes = i * 7 + 2;
            if (minutes < 60) {
                return `${minutes} min ago`;
            } else {
                return `${Math.floor(minutes / 60)} hour ago`;
            }
        });

        mockAnalyses.forEach((analysis, i) => {
            analysis.timestamp = newTimestamps[i];
        });

        populateAnalyses();
    }, 10000);
});
