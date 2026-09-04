import { Router } from 'express';
import { Game } from '../../models/Game.js';
import { validate } from '../../middleware/validate.js';
import { gameBodySchema, gameUpdateSchema } from '../../schemas/game.js';
import { toId } from '../../utils/serialize.js';

export const adminGamesRouter = Router();

adminGamesRouter.get('/', async (_req, res) => {
  try {
    const games = await Game.find().sort({ sortOrder: 1, createdAt: -1 });
    res.json({ success: true, data: games.map(toId) });
  } catch (err) {
    console.error('[admin/games]', err);
    res.status(500).json({ success: false, message: 'Failed to load games' });
  }
});

adminGamesRouter.get('/:id', async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);
    if (!game) {
      res.status(404).json({ success: false, message: 'Game not found' });
      return;
    }
    res.json({ success: true, data: toId(game) });
  } catch (err) {
    console.error('[admin/games/:id]', err);
    res.status(500).json({ success: false, message: 'Failed to load game' });
  }
});

adminGamesRouter.post('/', validate(gameBodySchema), async (req, res) => {
  try {
    const exists = await Game.findOne({ slug: req.body.slug });
    if (exists) {
      res.status(409).json({ success: false, message: 'Slug already exists' });
      return;
    }
    const game = await Game.create(req.body);
    res.status(201).json({ success: true, data: toId(game) });
  } catch (err) {
    console.error('[admin/games POST]', err);
    res.status(500).json({ success: false, message: 'Failed to create game' });
  }
});

adminGamesRouter.put('/:id', validate(gameUpdateSchema), async (req, res) => {
  try {
    if (req.body.slug) {
      const clash = await Game.findOne({ slug: req.body.slug, _id: { $ne: req.params.id } });
      if (clash) {
        res.status(409).json({ success: false, message: 'Slug already exists' });
        return;
      }
    }
    const game = await Game.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!game) {
      res.status(404).json({ success: false, message: 'Game not found' });
      return;
    }
    res.json({ success: true, data: toId(game) });
  } catch (err) {
    console.error('[admin/games PUT]', err);
    res.status(500).json({ success: false, message: 'Failed to update game' });
  }
});

adminGamesRouter.delete('/:id', async (req, res) => {
  try {
    const game = await Game.findByIdAndDelete(req.params.id);
    if (!game) {
      res.status(404).json({ success: false, message: 'Game not found' });
      return;
    }
    res.json({ success: true, message: 'Game deleted' });
  } catch (err) {
    console.error('[admin/games DELETE]', err);
    res.status(500).json({ success: false, message: 'Failed to delete game' });
  }
});
