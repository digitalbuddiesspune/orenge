import { Router } from 'express';
import { BlogPost } from '../../models/BlogPost.js';
import { validate } from '../../middleware/validate.js';
import { blogBodySchema, blogUpdateSchema } from '../../schemas/blog.js';
import { toId } from '../../utils/serialize.js';

export const adminBlogRouter = Router();

adminBlogRouter.get('/', async (_req, res) => {
  try {
    const posts = await BlogPost.find().sort({ publishedDate: -1, createdAt: -1 });
    res.json({ success: true, data: posts.map(toId) });
  } catch (err) {
    console.error('[admin/blog]', err);
    res.status(500).json({ success: false, message: 'Failed to load posts' });
  }
});

adminBlogRouter.post('/', validate(blogBodySchema), async (req, res) => {
  try {
    const exists = await BlogPost.findOne({ slug: req.body.slug });
    if (exists) {
      res.status(409).json({ success: false, message: 'Slug already exists' });
      return;
    }
    const post = await BlogPost.create(req.body);
    res.status(201).json({ success: true, data: toId(post) });
  } catch (err) {
    console.error('[admin/blog POST]', err);
    res.status(500).json({ success: false, message: 'Failed to create post' });
  }
});

adminBlogRouter.put('/:id', validate(blogUpdateSchema), async (req, res) => {
  try {
    if (req.body.slug) {
      const clash = await BlogPost.findOne({ slug: req.body.slug, _id: { $ne: req.params.id } });
      if (clash) {
        res.status(409).json({ success: false, message: 'Slug already exists' });
        return;
      }
    }
    const post = await BlogPost.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!post) {
      res.status(404).json({ success: false, message: 'Post not found' });
      return;
    }
    res.json({ success: true, data: toId(post) });
  } catch (err) {
    console.error('[admin/blog PUT]', err);
    res.status(500).json({ success: false, message: 'Failed to update post' });
  }
});

adminBlogRouter.delete('/:id', async (req, res) => {
  try {
    const post = await BlogPost.findByIdAndDelete(req.params.id);
    if (!post) {
      res.status(404).json({ success: false, message: 'Post not found' });
      return;
    }
    res.json({ success: true, message: 'Post deleted' });
  } catch (err) {
    console.error('[admin/blog DELETE]', err);
    res.status(500).json({ success: false, message: 'Failed to delete post' });
  }
});
