import { Schema, model, type InferSchemaType } from 'mongoose';

export const GAME_CATEGORIES = [
  'Multiplayer Games',
  'Card Games',
  'Board Games',
  'Casual Games',
  'Game Engines',
  'Custom Games',
] as const;

export const GAME_PLATFORMS = [
  'Web (HTML5/Canvas)',
  'Android',
  'iOS',
  'Desktop SDK',
  'React Native/Flutter',
] as const;

export const GAME_STATUSES = ['Production Ready', 'SDK Ready', 'Custom Engine'] as const;

const gameSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    title: { type: String, required: true, trim: true },
    tagline: { type: String, default: '', trim: true },
    category: { type: String, enum: GAME_CATEGORIES, required: true },
    thumbnail: { type: String, default: '' },
    bannerImage: { type: String, default: '' },
    screenshots: { type: [String], default: [] },
    videoUrl: { type: String, default: '' },
    shortDescription: { type: String, default: '' },
    fullOverview: { type: String, default: '' },
    gameplaySummary: { type: String, default: '' },
    features: { type: [String], default: [] },
    platforms: { type: [String], default: [] },
    multiplayer: { type: Boolean, default: false },
    maxPlayers: { type: String, default: '' },
    syncLatency: { type: String, default: '' },
    customizationOptions: { type: [String], default: [] },
    architectureHighlights: { type: [String], default: [] },
    adminCapabilities: { type: [String], default: [] },
    apiIntegrationPoints: { type: [String], default: [] },
    isFeatured: { type: Boolean, default: false, index: true },
    published: { type: Boolean, default: true, index: true },
    status: { type: String, enum: GAME_STATUSES, default: 'Production Ready' },
    sortOrder: { type: Number, default: 0 },
  },
  { timestamps: true },
);

gameSchema.index({ category: 1, published: 1 });

export type GameDocument = InferSchemaType<typeof gameSchema> & { _id: Schema.Types.ObjectId };
export const Game = model('Game', gameSchema);
