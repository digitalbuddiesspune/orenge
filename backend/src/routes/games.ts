import { Router } from 'express';
import { Game } from '../models/Game.js';
import { toId } from '../utils/serialize.js';

export const gamesPublicRouter = Router();

gamesPublicRouter.get('/', async (req, res) => {
  try {
    const { category, featured } = req.query;
    const filter: Record<string, unknown> = { published: true };

    if (typeof category === 'string' && category && category !== 'All') {
      filter.category = category;
    }
    if (featured === 'true') {
      filter.isFeatured = true;
    }

    const games = await Game.find(filter).sort({ sortOrder: 1, createdAt: -1 }).lean();
    res.json({
      success: true,
      data: games.map((g) => ({ ...g, id: g._id.toString(), _id: undefined })),
    });
  } catch (err) {
    console.error('[games]', err);
    res.status(500).json({ success: false, message: 'Failed to load games' });
  }
});

gamesPublicRouter.get('/:slug', async (req, res) => {
  try {
    const game = await Game.findOne({ slug: req.params.slug, published: true });
    if (!game) {
      res.status(404).json({ success: false, message: 'Game not found' });
      return;
    }
    res.json({ success: true, data: toId(game) });
  } catch (err) {
    console.error('[games/:slug]', err);
    res.status(500).json({ success: false, message: 'Failed to load game' });
  }
});
