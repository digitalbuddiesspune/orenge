import { Schema, model, type InferSchemaType } from 'mongoose';

const siteSettingSchema = new Schema(
  {
    key: { type: String, required: true, unique: true, trim: true },
    value: { type: Schema.Types.Mixed, required: true },
  },
  { timestamps: true }
);

export type SiteSettingDocument = InferSchemaType<typeof siteSettingSchema> & { _id: Schema.Types.ObjectId };
export const SiteSetting = model('SiteSetting', siteSettingSchema);
