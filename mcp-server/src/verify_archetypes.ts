
import { ALL_ARCHETYPES, ARCHETYPE_CLASSES } from './archetypes.js';
import { analyzeBehavior, extractFeatureVector, type TaskLog } from './analyzer.js';

console.log('--- Verifying Archetypes ---');
console.log(`Total Archetypes: ${ALL_ARCHETYPES.length}`);
if (ALL_ARCHETYPES.length !== 108) {
    console.error('ERROR: Expected 108 archetypes, found', ALL_ARCHETYPES.length);
    process.exit(1);
} else {
    console.log('PASS: 108 Archetypes found.');
}

console.log(`Total Classes: ${ARCHETYPE_CLASSES.length}`);
if (ARCHETYPE_CLASSES.length !== 12) {
    console.error('ERROR: Expected 12 classes, found', ARCHETYPE_CLASSES.length);
    process.exit(1);
}

// Check scale
let scaleError = false;
for (const arch of ALL_ARCHETYPES) {
    if (arch.vector.length !== 12) {
        console.error(`ERROR: Archetype ${arch.name} has vector length ${arch.vector.length}`);
        scaleError = true;
    }
    for (const val of arch.vector) {
        if (val < 0 || val > 20) {
            console.error(`ERROR: Archetype ${arch.name} has value ${val} out of range 0-20`);
            scaleError = true;
        }
    }
}
if (!scaleError) {
    console.log('PASS: All archetype vectors are valid (0-20 scale, 12 dimensions).');
}

// Test Analyzer Variance
console.log('\n--- Verifying Analyzer Variance ---');

// Create a fake history that is extremely "Exploratory" (high DEX)
// DEX is F1.
const highDexTasks: TaskLog[] = Array(50).fill({
    task: 'Explore new world',
    outcome: 'success',
    exploratory: true, // This boosts F1 (DEX)
    duration_seconds: 300,
    domain: 'unknown',
});

// Calculate raw vector for this history
const rawVector = extractFeatureVector(highDexTasks);
console.log('Raw History DEX (F1):', rawVector[0]);

// Analyze matching
const result = analyzeBehavior(highDexTasks);
console.log(`Matched Archetype: ${result.archetype}`);
console.log(`Base DEX of matched: ${result.featureVector['DEX']}`); // This is actually the FINAL, need to find base manually

import { findArchetype } from './archetypes.js';
const baseArch = findArchetype(result.archetype);
if (baseArch) {
    console.log(`Base DEX of ${baseArch.name} (from definition): ${baseArch.vector[0]}`);
    console.log(`Final DEX in result: ${result.featureVector['DEX']}`);

    const diff = result.featureVector['DEX'] - baseArch.vector[0];
    console.log(`Variance Applied: ${diff}`);

    if (Math.abs(diff) > 2) {
        console.error('ERROR: Variance exceeds +/- 2 limit!');
        process.exit(1);
    } else {
        console.log('PASS: Variance is within +/- 2 range.');
    }
} else {
    console.error('ERROR: Could not find base archetype for verification.');
}
