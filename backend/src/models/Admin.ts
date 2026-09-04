import { Schema, model, type InferSchemaType } from 'mongoose';

const adminSchema = new Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    name: { type: String, required: true, trim: true },
    role: { type: String, enum: ['admin'], default: 'admin' },
  },
  { timestamps: true },
);

export type AdminDocument = InferSchemaType<typeof adminSchema> & { _id: Schema.Types.ObjectId };
export const Admin = model('Admin', adminSchema);
