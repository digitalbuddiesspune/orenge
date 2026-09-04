import { z } from 'zod';
import { GAME_CATEGORIES, GAME_PLATFORMS, GAME_STATUSES } from '../models/Game.js';

const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const gameBodySchema = z.object({
  slug: z.string().min(2).max(120).regex(slugRegex),
  title: z.string().min(2).max(200),
  tagline: z.string().max(500).optional().default(''),
  category: z.enum(GAME_CATEGORIES),
  thumbnail: z.string().max(1000).optional().default(''),
  bannerImage: z.string().max(1000).optional().default(''),
  screenshots: z.array(z.string().max(1000)).optional().default([]),
  videoUrl: z.string().max(1000).optional().default(''),
  shortDescription: z.string().max(2000).optional().default(''),
  fullOverview: z.string().max(10000).optional().default(''),
  gameplaySummary: z.string().max(5000).optional().default(''),
  features: z.array(z.string().max(500)).optional().default([]),
  platforms: z.array(z.enum(GAME_PLATFORMS)).optional().default([]),
  multiplayer: z.boolean().optional().default(false),
  maxPlayers: z.string().max(100).optional().default(''),
  syncLatency: z.string().max(100).optional().default(''),
  customizationOptions: z.array(z.string().max(500)).optional().default([]),
  architectureHighlights: z.array(z.string().max(500)).optional().default([]),
  adminCapabilities: z.array(z.string().max(500)).optional().default([]),
  apiIntegrationPoints: z.array(z.string().max(500)).optional().default([]),
  isFeatured: z.boolean().optional().default(false),
  published: z.boolean().optional().default(true),
  status: z.enum(GAME_STATUSES).optional().default('Production Ready'),
  sortOrder: z.number().int().optional().default(0),
});

export const gameUpdateSchema = gameBodySchema.partial();
