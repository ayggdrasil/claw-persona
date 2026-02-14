/**
 * Persona Analyzer — Extracts behavioral features from task history
 * and matches against the 108 archetype library.
 */

import { FEATURE_LABELS, matchArchetype, type Archetype } from './archetypes.js';

/** A single task log entry from an agent's history */
export interface TaskLog {
    /** Task description or name */
    task: string;
    /** How the task was completed: success, failure, partial */
    outcome: 'success' | 'failure' | 'partial';
    /** Duration in seconds */
    duration_seconds?: number;
    /** Domain or category (e.g., "frontend", "backend", "devops") */
    domain?: string;
    /** Whether the agent collaborated with others */
    collaborated?: boolean;
    /** Number of iterations or retries */
    iterations?: number;
    /** Whether the task involved exploration (new domain/tool) */
    exploratory?: boolean;
    /** Whether the agent self-corrected during the task */
    self_corrected?: boolean;
    /** Risk level of the task (0-1) */
    risk_level?: number;
}

export interface AnalysisResult {
    archetype: string;
    className: string;
    classFocus: string;
    historicalFigure: string;
    consistencyScore: number;
    featureVector: Record<string, number>;
    description: string;
    topMatches: Array<{ name: string; score: number }>;
}

/**
 * Extract a 12-dimensional feature vector from task history on a 0-20 scale.
 * 
 * F1:  DEX (Exploration Rate)
 * F2:  INT (Exploitation Depth)
 * F3:  CON (Time Horizon)
 * F4:  STR (Action Velocity)
 * F5:  ARC (Knowledge Accumulation)
 * F6:  WIS (Synthesis Degree)
 * F7:  LUK (Risk Appetite)
 * F8:  PER (Error Sensitivity)
 * F9:  SPI (Autonomy)
 * F10: CHA (Collaboration)
 * F11: VIT (Reflection Loop)
 * F12: WIL (Output Finality)
 */
export function extractFeatureVector(tasks: TaskLog[]): number[] {
    if (tasks.length === 0) {
        return new Array(12).fill(10); // neutral vector (10/20)
    }

    const n = tasks.length;

    // Helper: Clip to 0-20
    const clip = (v: number) => Math.max(0, Math.min(20, v));

    // F1: DEX (Exploration Rate)
    const exploratoryCount = tasks.filter(t => t.exploratory).length;
    const f1 = clip((exploratoryCount / n) * 20);

    // Domain diversity
    const domains = new Set(tasks.map(t => t.domain ?? 'unknown'));
    const domainDiversity = Math.min(1, domains.size / Math.max(n, 1));

    // F2: INT (Exploitation Depth - inverse of diversity)
    const f2 = clip((1 - domainDiversity) * 20);

    // Duration stats
    const durations = tasks
        .map(t => t.duration_seconds ?? 300)
        .filter(d => d > 0);
    const avgDuration = durations.length > 0
        ? durations.reduce((a, b) => a + b, 0) / durations.length
        : 300;

    // F3: CON (Time Horizon - longer is higher CON)
    // 1 hour (3600s) = 20 points
    const f3 = clip((avgDuration / 3600) * 20);

    // F4: STR (Action Velocity - faster is higher STR)
    // 5 min (300s) baseline. If avg is 300s, score is 20. If 600s, score is 10.
    const f4 = clip((300 / Math.max(avgDuration, 1)) * 20);

    // Success rate
    const successCount = tasks.filter(t => t.outcome === 'success').length;
    const successRate = successCount / n;

    // Average iterations
    const avgIterations = tasks.reduce((s, t) => s + (t.iterations ?? 1), 0) / n;

    // F5: ARC (Knowledge Accumulation)
    const f5 = clip(successRate * Math.min(avgIterations / 3, 1) * 20);

    // F6: WIS (Synthesis Degree)
    const f6 = clip(domainDiversity * 1.5 * successRate * 20);

    // F7: LUK (Risk Appetite)
    const avgRisk = tasks.reduce((s, t) => s + (t.risk_level ?? 0.5), 0) / n;
    const f7 = clip(avgRisk * 20);

    // F8: PER (Error Sensitivity)
    const selfCorrectionCount = tasks.filter(t => t.self_corrected).length;
    // High self-correction or low success rate suggests noticing errors
    const f8 = clip((selfCorrectionCount / n + (1 - successRate) * 0.3) * 20);

    // F9: SPI (Autonomy)
    const collaborationCount = tasks.filter(t => t.collaborated).length;
    const collaborationRate = collaborationCount / n;
    const f9 = clip((1 - collaborationRate) * 20);

    // F10: CHA (Collaboration)
    const f10 = clip(collaborationRate * 20);

    // F11: VIT (Reflection Loop)
    const f11 = clip((selfCorrectionCount / n) * Math.min(avgIterations / 2, 1) * 20);

    // F12: WIL (Output Finality - Success Rate)
    const f12 = clip(successRate * 20);

    return [f1, f2, f3, f4, f5, f6, f7, f8, f9, f10, f11, f12];
}

/**
 * Analyze task history and return the best-matching archetype.
 * Applies a +/- 2 variance to the archetype's base stats based on history.
 */
export function analyzeBehavior(tasks: TaskLog[], windowSize: number = 30): AnalysisResult {
    // Take only the most recent tasks within the window
    const recentTasks = tasks.slice(-windowSize);

    // Extract feature vector from history (Activity History)
    const historyVector = extractFeatureVector(recentTasks);

    // Match against all archetypes
    const matches = matchArchetype(historyVector);
    const best = matches[0];
    const baseVector = best.archetype.vector;

    // Apply Variance Rule: Archetype +/- 2 based on History
    const finalVectorPoints: number[] = baseVector.map((baseVal, i) => {
        const historyVal = historyVector[i];
        // Calculate difference
        const diff = historyVal - baseVal;
        // Clamp difference to [-2, 2]
        const modifier = Math.max(-2, Math.min(2, diff));
        // Apply modifier
        return Math.round(baseVal + modifier);
    });

    // Build labeled feature vector
    const featureVector: Record<string, number> = {};
    FEATURE_LABELS.forEach((label, i) => {
        featureVector[label] = finalVectorPoints[i];
    });

    return {
        archetype: best.archetype.name,
        className: best.archetype.className,
        classFocus: best.archetype.classFocus,
        historicalFigure: best.archetype.historicalFigure,
        consistencyScore: Math.round(best.score * 1000) / 1000,
        featureVector,
        description: best.archetype.description,
        topMatches: matches.slice(0, 5).map(m => ({
            name: m.archetype.name,
            score: Math.round(m.score * 1000) / 1000,
        })),
    };
}
