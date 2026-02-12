/**
 * Persona Analyzer — Extracts behavioral features from task history
 * and matches against the 36 archetype library.
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
 * Extract a 12-dimensional feature vector from task history.
 * 
 * F1:  Exploration Rate       — ratio of exploratory tasks
 * F2:  Exploitation Depth     — inverse of domain diversity
 * F3:  Time Horizon           — average duration (normalized)
 * F4:  Action Velocity        — inverse of avg duration (speed)
 * F5:  Knowledge Accumulation — success rate × iterations
 * F6:  Synthesis Degree       — domain diversity × success rate
 * F7:  Risk Appetite          — average risk level
 * F8:  Error Sensitivity      — self-correction rate
 * F9:  Autonomy               — 1 - collaboration rate
 * F10: Collaboration          — collaboration rate
 * F11: Reflection Loop        — self-correction rate × iteration depth
 * F12: Output Finality        — success rate
 */
export function extractFeatureVector(tasks: TaskLog[]): number[] {
    if (tasks.length === 0) {
        return new Array(12).fill(0.5); // neutral vector
    }

    const n = tasks.length;

    // F1: Exploration Rate
    const exploratoryCount = tasks.filter(t => t.exploratory).length;
    const f1 = Math.min(1, exploratoryCount / n);

    // Domain diversity
    const domains = new Set(tasks.map(t => t.domain ?? 'unknown'));
    const domainDiversity = Math.min(1, domains.size / Math.max(n, 1));

    // F2: Exploitation Depth (inverse of diversity)
    const f2 = 1 - domainDiversity;

    // Duration stats
    const durations = tasks
        .map(t => t.duration_seconds ?? 300)
        .filter(d => d > 0);
    const avgDuration = durations.length > 0
        ? durations.reduce((a, b) => a + b, 0) / durations.length
        : 300;

    // F3: Time Horizon (longer tasks → higher, normalized to 0-1 with sigmoid)
    const f3 = Math.min(1, avgDuration / 3600); // 1 hour = 1.0

    // F4: Action Velocity (faster = higher)
    const f4 = Math.min(1, 300 / Math.max(avgDuration, 1)); // 5min baseline

    // Success rate
    const successCount = tasks.filter(t => t.outcome === 'success').length;
    const successRate = successCount / n;

    // Average iterations
    const avgIterations = tasks.reduce((s, t) => s + (t.iterations ?? 1), 0) / n;

    // F5: Knowledge Accumulation
    const f5 = Math.min(1, successRate * Math.min(avgIterations / 3, 1));

    // F6: Synthesis Degree
    const f6 = Math.min(1, domainDiversity * 1.5 * successRate);

    // F7: Risk Appetite
    const avgRisk = tasks.reduce((s, t) => s + (t.risk_level ?? 0.5), 0) / n;
    const f7 = avgRisk;

    // F8: Error Sensitivity
    const selfCorrectionCount = tasks.filter(t => t.self_corrected).length;
    const f8 = Math.min(1, selfCorrectionCount / n + (1 - successRate) * 0.3);

    // F9: Autonomy
    const collaborationCount = tasks.filter(t => t.collaborated).length;
    const collaborationRate = collaborationCount / n;
    const f9 = 1 - collaborationRate;

    // F10: Collaboration
    const f10 = collaborationRate;

    // F11: Reflection Loop
    const f11 = Math.min(1, (selfCorrectionCount / n) * Math.min(avgIterations / 2, 1));

    // F12: Output Finality
    const f12 = successRate;

    return [f1, f2, f3, f4, f5, f6, f7, f8, f9, f10, f11, f12];
}

/**
 * Analyze task history and return the best-matching archetype.
 */
export function analyzeBehavior(tasks: TaskLog[], windowSize: number = 30): AnalysisResult {
    // Take only the most recent tasks within the window
    const recentTasks = tasks.slice(-windowSize);

    // Extract feature vector
    const vector = extractFeatureVector(recentTasks);

    // Match against all archetypes
    const matches = matchArchetype(vector);
    const best = matches[0];

    // Build labeled feature vector
    const featureVector: Record<string, number> = {};
    FEATURE_LABELS.forEach((label, i) => {
        featureVector[label] = Math.round(vector[i] * 100) / 100;
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
