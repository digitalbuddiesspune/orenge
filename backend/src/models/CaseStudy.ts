import { Schema, model, type InferSchemaType } from 'mongoose';

const resultSchema = new Schema(
  {
    metric: { type: String, required: true },
    label: { type: String, required: true },
  },
  { _id: false },
);

const caseStudySchema = new Schema(
  {
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    title: { type: String, required: true, trim: true },
    clientName: { type: String, required: true, trim: true },
    clientIndustry: { type: String, default: '', trim: true },
    timeline: { type: String, default: '', trim: true },
    challenge: { type: String, default: '' },
    requirement: { type: String, default: '' },
    solution: { type: String, default: '' },
    results: { type: [resultSchema], default: [] },
    techStack: { type: [String], default: [] },
    featuresDelivered: { type: [String], default: [] },
    coverImage: { type: String, default: '' },
    screenshots: { type: [String], default: [] },
    published: { type: Boolean, default: true, index: true },
    sortOrder: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export type CaseStudyDocument = InferSchemaType<typeof caseStudySchema> & {
  _id: Schema.Types.ObjectId;
};
export const CaseStudy = model('CaseStudy', caseStudySchema);
