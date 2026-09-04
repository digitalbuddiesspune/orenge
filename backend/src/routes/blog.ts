import { Router } from 'express';
import { BlogPost } from '../models/BlogPost.js';
import { toId } from '../utils/serialize.js';

export const blogPublicRouter = Router();

blogPublicRouter.get('/', async (req, res) => {
  try {
    const { category, tag } = req.query;
    const filter: Record<string, unknown> = { published: true };
    if (typeof category === 'string' && category) filter.category = category;
    if (typeof tag === 'string' && tag) filter.tags = tag;

    const posts = await BlogPost.find(filter).sort({ publishedDate: -1 }).lean();
    res.json({
      success: true,
      data: posts.map((p) => ({
        ...p,
        id: p._id.toString(),
        _id: undefined,
        publishedDate: p.publishedDate
          ? new Date(p.publishedDate).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })
          : '',
      })),
    });
  } catch (err) {
    console.error('[blog]', err);
    res.status(500).json({ success: false, message: 'Failed to load posts' });
  }
});

blogPublicRouter.get('/:slug', async (req, res) => {
  try {
    const post = await BlogPost.findOne({ slug: req.params.slug, published: true });
    if (!post) {
      res.status(404).json({ success: false, message: 'Post not found' });
      return;
    }
    const data = toId(post) as Record<string, unknown>;
    if (data.publishedDate instanceof Date) {
      data.publishedDate = data.publishedDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    }
    res.json({ success: true, data });
  } catch (err) {
    console.error('[blog/:slug]', err);
    res.status(500).json({ success: false, message: 'Failed to load post' });
  }
});
