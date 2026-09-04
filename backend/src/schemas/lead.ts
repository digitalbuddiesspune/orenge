import { z } from 'zod';
import { LEAD_STATUSES } from '../models/Lead.js';

export const contactLeadSchema = z.object({
  fullName: z.string().min(1, 'Name is required').max(120),
  businessEmail: z.string().email('Invalid email address').max(200),
  phone: z.string().max(40).optional().default(''),
  companyName: z.string().max(160).optional().default(''),
  companyWebsite: z.string().max(300).optional().default(''),
  country: z.string().max(100).optional().default(''),
  lookingFor: z.string().max(200).optional().default('Custom Game Development'),
  hasPlatform: z.string().max(100).optional().default('No'),
  budget: z.string().max(100).optional().default(''),
  timeline: z.string().max(100).optional().default('Exploring'),
  projectDescription: z.string().max(5000).optional().default(''),
  source: z.string().max(120).optional().default('Contact Page'),
});

export const demoLeadSchema = z.object({
  fullName: z.string().min(1, 'Name is required').max(120),
  businessEmail: z.string().email('Invalid email address').max(200),
  phone: z.string().max(40).optional().default(''),
  companyName: z.string().max(160).optional().default(''),
  companyWebsite: z.string().max(300).optional().default(''),
  country: z.string().max(100).optional().default(''),
  gameSlug: z.string().max(120).optional().default(''),
  gameTitle: z.string().max(200).optional().default(''),
  preferredDate: z.string().max(80).optional().default(''),
  message: z.string().max(5000).optional().default(''),
  source: z.string().max(120).optional().default('Request Demo'),
});

export const leadStatusSchema = z.object({
  status: z.enum(LEAD_STATUSES),
  notes: z.string().max(5000).optional(),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(200),
});
