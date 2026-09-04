import { z } from 'zod';

const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const blogBodySchema = z.object({
  slug: z.string().min(2).max(200).regex(slugRegex),
  title: z.string().min(2).max(300),
  excerpt: z.string().max(1000).optional().default(''),
  publishedDate: z.coerce.date().optional(),
  readTime: z.string().max(40).optional().default('5 min read'),
  category: z.string().max(100).optional().default('General'),
  author: z.object({
    name: z.string().min(1).max(120),
    role: z.string().max(120).optional().default(''),
    avatar: z.string().max(1000).optional().default(''),
  }),
  content: z.array(z.string().max(20000)).optional().default([]),
  tags: z.array(z.string().max(60)).optional().default([]),
  coverImage: z.string().max(1000).optional().default(''),
  published: z.boolean().optional().default(false),
  metaTitle: z.string().max(200).optional().default(''),
  metaDescription: z.string().max(320).optional().default(''),
});

export const blogUpdateSchema = blogBodySchema.partial();
