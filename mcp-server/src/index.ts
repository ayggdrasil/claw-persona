#!/usr/bin/env node

/**
 * Persona MCP Server — Know Thyself for AI Agents
 * 
 * Exposes behavioral analysis tools via Model Context Protocol (MCP).
 * Agents can analyze their task history to discover their behavioral archetype.
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
    CallToolRequestSchema,
    ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';

import { ALL_ARCHETYPES, ARCHETYPE_CLASSES, findArchetype, FEATURE_LABELS } from './archetypes.js';
import { analyzeBehavior, type TaskLog } from './analyzer.js';

// Create MCP server
const server = new Server(
    {
        name: 'persona',
        version: '1.0.0',
    },
    {
        capabilities: {
            tools: {},
        },
    }
);

// ─── Tool Definitions ───────────────────────────────────────────

server.setRequestHandler(ListToolsRequestSchema, async () => ({
    tools: [
        {
            name: 'analyze_behavior',
            description:
                'Analyze an AI agent\'s task history to identify their behavioral archetype. ' +
                'Extracts a 12-dimensional feature vector and matches it against 36 historical archetypes ' +
                '(e.g., Scout/Columbus, Grandmaster/Sun Tzu, Reflector/Marcus Aurelius). ' +
                'Returns the best matching archetype, consistency score, feature vector breakdown, and top 5 matches.',
            inputSchema: {
                type: 'object' as const,
                properties: {
                    task_history: {
                        type: 'array',
                        description: 'List of recent task logs to analyze',
                        items: {
                            type: 'object',
                            properties: {
                                task: { type: 'string', description: 'Task description or name' },
                                outcome: {
                                    type: 'string',
                                    enum: ['success', 'failure', 'partial'],
                                    description: 'Task outcome',
                                },
                                duration_seconds: { type: 'number', description: 'Duration in seconds' },
                                domain: { type: 'string', description: 'Domain/category (e.g., frontend, backend, devops)' },
                                collaborated: { type: 'boolean', description: 'Whether the agent collaborated with others' },
                                iterations: { type: 'number', description: 'Number of iterations or retries' },
                                exploratory: { type: 'boolean', description: 'Whether the task involved exploration' },
                                self_corrected: { type: 'boolean', description: 'Whether the agent self-corrected' },
                                risk_level: { type: 'number', description: 'Risk level 0.0-1.0' },
                            },
                            required: ['task', 'outcome'],
                        },
                    },
                    window_size: {
                        type: 'number',
                        description: 'Number of recent tasks to consider (default: 30)',
                    },
                },
                required: ['task_history'],
            },
        },
        {
            name: 'get_archetype',
            description:
                'Get detailed information about a specific Persona archetype by name. ' +
                'Returns the archetype\'s class, historical figure, 12D feature vector, and behavioral description.',
            inputSchema: {
                type: 'object' as const,
                properties: {
                    name: {
                        type: 'string',
                        description: 'Archetype name (e.g., "Scout", "Grandmaster", "Reflector")',
                    },
                },
                required: ['name'],
            },
        },
        {
            name: 'list_archetypes',
            description:
                'List all 36 Persona archetypes organized by their 12 behavioral classes. ' +
                'Each class represents a behavioral focus area (e.g., Seekers, Strategists, Guardians).',
            inputSchema: {
                type: 'object' as const,
                properties: {},
            },
        },
    ],
}));

// ─── Tool Handlers ──────────────────────────────────────────────

server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;

    switch (name) {
        case 'analyze_behavior': {
            const taskHistory = (args?.task_history ?? []) as TaskLog[];
            const windowSize = (args?.window_size as number) ?? 30;

            if (!Array.isArray(taskHistory) || taskHistory.length === 0) {
                return {
                    content: [{
                        type: 'text' as const,
                        text: JSON.stringify({
                            error: 'task_history must be a non-empty array of task logs.',
                            example: {
                                task_history: [
                                    { task: 'Implement login page', outcome: 'success', duration_seconds: 1800, domain: 'frontend' },
                                    { task: 'Debug auth token', outcome: 'success', self_corrected: true, iterations: 3 },
                                ],
                            },
                        }, null, 2),
                    }],
                };
            }

            const result = analyzeBehavior(taskHistory, windowSize);

            return {
                content: [{
                    type: 'text' as const,
                    text: JSON.stringify(result, null, 2),
                }],
            };
        }

        case 'get_archetype': {
            const archName = args?.name as string;
            if (!archName) {
                return {
                    content: [{
                        type: 'text' as const,
                        text: JSON.stringify({
                            error: 'name is required',
                            available: ALL_ARCHETYPES.map(a => a.name),
                        }, null, 2),
                    }],
                };
            }

            const archetype = findArchetype(archName);
            if (!archetype) {
                return {
                    content: [{
                        type: 'text' as const,
                        text: JSON.stringify({
                            error: `Archetype "${archName}" not found`,
                            available: ALL_ARCHETYPES.map(a => a.name),
                        }, null, 2),
                    }],
                };
            }

            // Build labeled vector
            const labeledVector: Record<string, number> = {};
            FEATURE_LABELS.forEach((label, i) => {
                labeledVector[label] = archetype.vector[i];
            });

            return {
                content: [{
                    type: 'text' as const,
                    text: JSON.stringify({
                        name: archetype.name,
                        class: archetype.className,
                        classFocus: archetype.classFocus,
                        historicalFigure: archetype.historicalFigure,
                        description: archetype.description,
                        featureVector: labeledVector,
                    }, null, 2),
                }],
            };
        }

        case 'list_archetypes': {
            const listing = ARCHETYPE_CLASSES.map(cls => ({
                class: cls.name,
                focus: cls.focus,
                archetypes: cls.archetypes.map(a => ({
                    name: a.name,
                    historicalFigure: a.historicalFigure,
                })),
            }));

            return {
                content: [{
                    type: 'text' as const,
                    text: JSON.stringify(listing, null, 2),
                }],
            };
        }

        default:
            return {
                content: [{
                    type: 'text' as const,
                    text: `Unknown tool: ${name}`,
                }],
                isError: true,
            };
    }
});

// ─── Start Server ───────────────────────────────────────────────

async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error('Persona MCP Server running on stdio');
}

main().catch((error) => {
    console.error('Fatal error:', error);
    process.exit(1);
});
