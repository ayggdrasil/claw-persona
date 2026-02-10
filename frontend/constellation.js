// Archetype shape definitions (simplified silhouettes)
const archetypeShapes = {
    general: [
        // Helmet and armor outline (general/warrior)
        [-0.3, 0.8], [0, 0.9], [0.3, 0.8],  // Helmet top
        [-0.5, 0.6], [-0.3, 0.5], [0.3, 0.5], [0.5, 0.6],  // Helmet sides
        [-0.4, 0.3], [0.4, 0.3],  // Shoulders
        [-0.3, 0], [0.3, 0],  // Chest
        [-0.4, -0.3], [0.4, -0.3],  // Waist
        [-0.5, -0.7], [-0.2, -0.9], [0.2, -0.9], [0.5, -0.7],  // Legs/base
        [0, 0.2], [0, -0.2]  // Center markers
    ],
    scout: [
        // Agile, lean figure with forward posture
        [0, 0.8], [-0.2, 0.7], [0.2, 0.7],  // Head
        [-0.3, 0.4], [0.3, 0.4],  // Shoulders
        [-0.2, 0.1], [0.2, 0.1],  // Torso
        [-0.3, -0.2], [0.3, -0.2],  // Hips
        [-0.4, -0.6], [-0.1, -0.9],  // Left leg (forward)
        [0.2, -0.5], [0.5, -0.8],  // Right leg (back)
        [0.4, 0.2], [0.6, 0.4],  // Extended arm (pointing)
        [-0.4, 0.1], [-0.5, 0]  // Other arm
    ],
    scientist: [
        // Figure hunched over/studying
        [0, 0.7], [-0.2, 0.65], [0.2, 0.65],  // Head (tilted down)
        [-0.4, 0.4], [0.4, 0.4],  // Shoulders
        [-0.3, 0.2], [0.3, 0.2],  // Upper torso
        [0, 0], [-0.2, -0.1], [0.2, -0.1],  // Desk/table level
        [-0.5, 0], [-0.6, -0.2],  // Left arm on desk
        [0.5, 0], [0.6, -0.2],  // Right arm on desk
        [-0.3, -0.4], [0.3, -0.4],  // Lower body
        [-0.2, -0.8], [0.2, -0.8]  // Seat/base
    ],
    reflector: [
        // Meditation pose
        [0, 0.8], [-0.15, 0.75], [0.15, 0.75],  // Head
        [-0.35, 0.5], [0.35, 0.5],  // Shoulders
        [-0.3, 0.2], [0.3, 0.2],  // Upper torso
        [-0.25, -0.1], [0.25, -0.1],  // Center
        [-0.5, -0.3], [-0.6, -0.5],  // Left arm (crossed)
        [0.5, -0.3], [0.6, -0.5],  // Right arm (crossed)
        [-0.4, -0.6], [0.4, -0.6],  // Legs (crossed)
        [0, -0.8]  // Base
    ],
    strategist: [
        // Standing with map/planning
        [0, 0.85], [-0.2, 0.8], [0.2, 0.8],  // Head
        [-0.45, 0.55], [0.45, 0.55],  // Shoulders (wide stance)
        [-0.35, 0.3], [0.35, 0.3],  // Upper torso
        [0, 0.1], [-0.3, 0], [0.3, 0],  // Holding map/document
        [-0.4, -0.3], [0.4, -0.3],  // Waist
        [-0.3, -0.7], [-0.2, -0.9],  // Left leg
        [0.2, -0.7], [0.3, -0.9],  // Right leg
        [-0.5, 0.2], [0.5, 0.2]  // Extended arms
    ]
};

// Convert shape coords to 3D points (spread in Z for depth)
function shapeToParticles(shapeCoords, particleCount = 300) {
    const points = [];
    const scale = 3;  // Size of the shape

    // Add multiple particles per constellation point for denser shapes
    shapeCoords.forEach(([x, y]) => {
        // Add 3-4 particles around each key point
        for (let i = 0; i < 4; i++) {
            points.push({
                x: x * scale + (Math.random() - 0.5) * 0.15,
                y: y * scale + (Math.random() - 0.5) * 0.15,
                z: (Math.random() - 0.5) * 0.3  // Slight depth variation
            });
        }
    });

    // Fill in extra particles to reach desired count
    while (points.length < particleCount) {
        const randomPoint = shapeCoords[Math.floor(Math.random() * shapeCoords.length)];
        const [x, y] = randomPoint;
        points.push({
            x: (x + (Math.random() - 0.5) * 0.4) * scale,
            y: (y + (Math.random() - 0.5) * 0.4) * scale,
            z: (Math.random() - 0.5) * 0.8
        });
    }

    return points;
}

// Three.js Setup
let scene, camera, renderer, particles, particleGeometry, particleMaterial;
let currentShape = 'general';
let targetPositions = [];
let currentPositions = [];
let transitionProgress = 0;
let twinkleOffsets = [];  // For twinkling effect

const shapeNames = Object.keys(archetypeShapes);
let shapeIndex = 0;

function initConstellation() {
    const canvas = document.getElementById('constellation-bg');
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 8;

    renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);  // Transparent background

    // Create particles (increased count)
    const particleCount = 300;
    particleGeometry = new THREE.BufferGeometry();

    // Initialize random positions
    const positions = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);  // Individual sizes for variety

    for (let i = 0; i < particleCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 20;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 10;

        // Random size variation
        sizes[i] = Math.random() * 0.5 + 0.5;

        // Random twinkle offset for each particle
        twinkleOffsets.push(Math.random() * Math.PI * 2);
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    // Particle material (smaller, glowing dots)
    particleMaterial = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.04,  // Reduced from 0.08
        transparent: true,
        opacity: 0.9,
        sizeAttenuation: true,
        blending: THREE.AdditiveBlending
    });

    particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // Create connecting lines
    const lineMaterial = new THREE.LineBasicMaterial({
        color: 0x6366f1,
        transparent: true,
        opacity: 0.15,
        blending: THREE.AdditiveBlending
    });

    // Set initial target shape
    morphToShape(shapeNames[0]);

    // Start animation
    animate();

    // Change shapes periodically (longer duration for better visibility)
    setInterval(() => {
        shapeIndex = (shapeIndex + 1) % shapeNames.length;
        morphToShape(shapeNames[shapeIndex]);
    }, 7000);  // Changed from 5000 to 7000ms
}

function morphToShape(shapeName) {
    const shapePoints = shapeToParticles(archetypeShapes[shapeName]);
    targetPositions = shapePoints;
    transitionProgress = 0;
    currentShape = shapeName;
}

function animate() {
    requestAnimationFrame(animate);

    const positions = particleGeometry.attributes.position.array;
    const sizes = particleGeometry.attributes.size.array;
    const time = Date.now() * 0.001;

    // Smooth transition to target positions (slower for clearer shapes)
    if (transitionProgress < 1) {
        transitionProgress += 0.005;  // Slower transition (was 0.01)

        for (let i = 0; i < targetPositions.length; i++) {
            const currentX = positions[i * 3];
            const currentY = positions[i * 3 + 1];
            const currentZ = positions[i * 3 + 2];

            const targetX = targetPositions[i].x;
            const targetY = targetPositions[i].y;
            const targetZ = targetPositions[i].z;

            // Ease-in-out interpolation
            const t = easeInOutCubic(transitionProgress);
            positions[i * 3] = currentX + (targetX - currentX) * t;
            positions[i * 3 + 1] = currentY + (targetY - currentY) * t;
            positions[i * 3 + 2] = currentZ + (targetZ - currentZ) * t;
        }

        particleGeometry.attributes.position.needsUpdate = true;
    }

    // Twinkling effect - vary opacity/size of individual particles
    for (let i = 0; i < sizes.length; i++) {
        const twinkle = Math.sin(time * 2 + twinkleOffsets[i]) * 0.3 + 0.7;
        sizes[i] = twinkle;
    }
    particleGeometry.attributes.size.needsUpdate = true;

    // Gentle rotation (slower)
    particles.rotation.y += 0.0005;

    // Slight floating motion
    camera.position.y = Math.sin(time * 0.5) * 0.15;

    renderer.render(scene, camera);
}

function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initConstellation);
} else {
    initConstellation();
}
