import { Router } from 'express';
import { CaseStudy } from '../../models/CaseStudy.js';
import { validate } from '../../middleware/validate.js';
import { caseStudyBodySchema, caseStudyUpdateSchema } from '../../schemas/caseStudy.js';
import { toId } from '../../utils/serialize.js';

export const adminCaseStudiesRouter = Router();

adminCaseStudiesRouter.get('/', async (_req, res) => {
  try {
    const items = await CaseStudy.find().sort({ sortOrder: 1, createdAt: -1 });
    res.json({ success: true, data: items.map(toId) });
  } catch (err) {
    console.error('[admin/case-studies]', err);
    res.status(500).json({ success: false, message: 'Failed to load case studies' });
  }
});

adminCaseStudiesRouter.post('/', validate(caseStudyBodySchema), async (req, res) => {
  try {
    const exists = await CaseStudy.findOne({ slug: req.body.slug });
    if (exists) {
      res.status(409).json({ success: false, message: 'Slug already exists' });
      return;
    }
    const item = await CaseStudy.create(req.body);
    res.status(201).json({ success: true, data: toId(item) });
  } catch (err) {
    console.error('[admin/case-studies POST]', err);
    res.status(500).json({ success: false, message: 'Failed to create case study' });
  }
});

adminCaseStudiesRouter.put('/:id', validate(caseStudyUpdateSchema), async (req, res) => {
  try {
    if (req.body.slug) {
      const clash = await CaseStudy.findOne({ slug: req.body.slug, _id: { $ne: req.params.id } });
      if (clash) {
        res.status(409).json({ success: false, message: 'Slug already exists' });
        return;
      }
    }
    const item = await CaseStudy.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!item) {
      res.status(404).json({ success: false, message: 'Case study not found' });
      return;
    }
    res.json({ success: true, data: toId(item) });
  } catch (err) {
    console.error('[admin/case-studies PUT]', err);
    res.status(500).json({ success: false, message: 'Failed to update case study' });
  }
});

adminCaseStudiesRouter.delete('/:id', async (req, res) => {
  try {
    const item = await CaseStudy.findByIdAndDelete(req.params.id);
    if (!item) {
      res.status(404).json({ success: false, message: 'Case study not found' });
      return;
    }
    res.json({ success: true, message: 'Case study deleted' });
  } catch (err) {
    console.error('[admin/case-studies DELETE]', err);
    res.status(500).json({ success: false, message: 'Failed to delete case study' });
  }
});
