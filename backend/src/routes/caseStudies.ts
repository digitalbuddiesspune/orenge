import { Router } from 'express';
import { CaseStudy } from '../models/CaseStudy.js';
import { toId } from '../utils/serialize.js';

export const caseStudiesPublicRouter = Router();

caseStudiesPublicRouter.get('/', async (_req, res) => {
  try {
    const items = await CaseStudy.find({ published: true }).sort({ sortOrder: 1, createdAt: -1 }).lean();
    res.json({
      success: true,
      data: items.map((c) => ({ ...c, id: c._id.toString(), _id: undefined })),
    });
  } catch (err) {
    console.error('[case-studies]', err);
    res.status(500).json({ success: false, message: 'Failed to load case studies' });
  }
});

caseStudiesPublicRouter.get('/:slug', async (req, res) => {
  try {
    const item = await CaseStudy.findOne({ slug: req.params.slug, published: true });
    if (!item) {
      res.status(404).json({ success: false, message: 'Case study not found' });
      return;
    }
    res.json({ success: true, data: toId(item) });
  } catch (err) {
    console.error('[case-studies/:slug]', err);
    res.status(500).json({ success: false, message: 'Failed to load case study' });
  }
});
