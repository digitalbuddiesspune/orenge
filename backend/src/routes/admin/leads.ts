import { Router } from 'express';
import { Lead } from '../../models/Lead.js';
import { validate } from '../../middleware/validate.js';
import { leadStatusSchema } from '../../schemas/lead.js';
import { toId } from '../../utils/serialize.js';

export const adminLeadsRouter = Router();

adminLeadsRouter.get('/', async (req, res) => {
  try {
    const {
      type,
      status,
      q,
      page = '1',
      limit = '50',
    } = req.query as Record<string, string>;

    const filter: Record<string, unknown> = {};
    if (type === 'contact' || type === 'demo') filter.type = type;
    if (status) filter.status = status;
    if (q) {
      filter.$or = [
        { fullName: new RegExp(q, 'i') },
        { businessEmail: new RegExp(q, 'i') },
        { companyName: new RegExp(q, 'i') },
        { country: new RegExp(q, 'i') },
      ];
    }

    const pageNum = Math.max(1, Number(page) || 1);
    const limitNum = Math.min(100, Math.max(1, Number(limit) || 50));
    const skip = (pageNum - 1) * limitNum;

    const [items, total] = await Promise.all([
      Lead.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limitNum),
      Lead.countDocuments(filter),
    ]);

    res.json({
      success: true,
      data: items.map(toId),
      meta: { total, page: pageNum, limit: limitNum, pages: Math.ceil(total / limitNum) },
    });
  } catch (err) {
    console.error('[admin/leads]', err);
    res.status(500).json({ success: false, message: 'Failed to load leads' });
  }
});

adminLeadsRouter.get('/:id', async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);
    if (!lead) {
      res.status(404).json({ success: false, message: 'Lead not found' });
      return;
    }
    res.json({ success: true, data: toId(lead) });
  } catch (err) {
    console.error('[admin/leads/:id]', err);
    res.status(500).json({ success: false, message: 'Failed to load lead' });
  }
});

adminLeadsRouter.patch('/:id/status', validate(leadStatusSchema), async (req, res) => {
  try {
    const update: Record<string, unknown> = { status: req.body.status };
    if (typeof req.body.notes === 'string') update.notes = req.body.notes;

    const lead = await Lead.findByIdAndUpdate(req.params.id, update, { new: true });
    if (!lead) {
      res.status(404).json({ success: false, message: 'Lead not found' });
      return;
    }
    res.json({ success: true, data: toId(lead) });
  } catch (err) {
    console.error('[admin/leads/:id/status]', err);
    res.status(500).json({ success: false, message: 'Failed to update lead' });
  }
});

adminLeadsRouter.delete('/:id', async (req, res) => {
  try {
    const lead = await Lead.findByIdAndDelete(req.params.id);
    if (!lead) {
      res.status(404).json({ success: false, message: 'Lead not found' });
      return;
    }
    res.json({ success: true, message: 'Lead deleted' });
  } catch (err) {
    console.error('[admin/leads DELETE]', err);
    res.status(500).json({ success: false, message: 'Failed to delete lead' });
  }
});
