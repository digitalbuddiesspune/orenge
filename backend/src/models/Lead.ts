import { Schema, model, type InferSchemaType } from 'mongoose';

export const LEAD_STATUSES = [
  'New',
  'Contacted',
  'Qualified',
  'Demo Scheduled',
  'Proposal Sent',
  'Won',
  'Lost',
] as const;

export const LEAD_TYPES = ['contact', 'demo'] as const;

const leadSchema = new Schema(
  {
    type: { type: String, enum: LEAD_TYPES, required: true, index: true },
    fullName: { type: String, required: true, trim: true },
    businessEmail: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String, default: '', trim: true },
    companyName: { type: String, required: true, trim: true },
    companyWebsite: { type: String, default: '', trim: true },
    country: { type: String, required: true, trim: true },
    lookingFor: { type: String, default: '', trim: true },
    hasPlatform: {
      type: String,
      enum: ['Yes', 'No', 'Under Development', ''],
      default: '',
    },
    budget: { type: String, default: '', trim: true },
    timeline: { type: String, default: '', trim: true },
    projectDescription: { type: String, default: '', trim: true },
    gameSlug: { type: String, default: '', trim: true },
    gameTitle: { type: String, default: '', trim: true },
    preferredDate: { type: String, default: '', trim: true },
    message: { type: String, default: '', trim: true },
    source: { type: String, default: 'Website', trim: true },
    status: { type: String, enum: LEAD_STATUSES, default: 'New', index: true },
    notes: { type: String, default: '' },
  },
  { timestamps: true },
);

leadSchema.index({ businessEmail: 1, createdAt: -1 });
leadSchema.index({ type: 1, status: 1 });

export type LeadDocument = InferSchemaType<typeof leadSchema> & { _id: Schema.Types.ObjectId };
export const Lead = model('Lead', leadSchema);
