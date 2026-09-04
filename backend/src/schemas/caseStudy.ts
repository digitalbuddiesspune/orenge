import { z } from 'zod';

const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const caseStudyBodySchema = z.object({
  slug: z.string().min(2).max(160).regex(slugRegex),
  title: z.string().min(2).max(300),
  clientName: z.string().min(2).max(200),
  clientIndustry: z.string().max(200).optional().default(''),
  timeline: z.string().max(120).optional().default(''),
  challenge: z.string().max(10000).optional().default(''),
  requirement: z.string().max(10000).optional().default(''),
  solution: z.string().max(10000).optional().default(''),
  results: z
    .array(z.object({ metric: z.string().max(80), label: z.string().max(120) }))
    .optional()
    .default([]),
  techStack: z.array(z.string().max(100)).optional().default([]),
  featuresDelivered: z.array(z.string().max(500)).optional().default([]),
  coverImage: z.string().max(1000).optional().default(''),
  screenshots: z.array(z.string().max(1000)).optional().default([]),
  published: z.boolean().optional().default(true),
  sortOrder: z.number().int().optional().default(0),
});

export const caseStudyUpdateSchema = caseStudyBodySchema.partial();
