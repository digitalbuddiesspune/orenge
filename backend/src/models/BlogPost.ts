import { Schema, model, type InferSchemaType } from 'mongoose';

const authorSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    role: { type: String, default: '', trim: true },
    avatar: { type: String, default: '' },
  },
  { _id: false },
);

const blogPostSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    title: { type: String, required: true, trim: true },
    excerpt: { type: String, default: '' },
    publishedDate: { type: Date, default: Date.now },
    readTime: { type: String, default: '5 min read' },
    category: { type: String, default: 'General', trim: true },
    author: { type: authorSchema, required: true },
    content: { type: [String], default: [] },
    tags: { type: [String], default: [] },
    coverImage: { type: String, default: '' },
    published: { type: Boolean, default: false, index: true },
    metaTitle: { type: String, default: '' },
    metaDescription: { type: String, default: '' },
  },
  { timestamps: true },
);

blogPostSchema.index({ published: 1, publishedDate: -1 });

export type BlogPostDocument = InferSchemaType<typeof blogPostSchema> & {
  _id: Schema.Types.ObjectId;
};
export const BlogPost = model('BlogPost', blogPostSchema);
