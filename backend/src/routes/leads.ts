import { Router } from 'express';
import { Lead } from '../models/Lead.js';
import { publicFormLimiter } from '../middleware/rateLimit.js';
import { validate } from '../middleware/validate.js';
import { contactLeadSchema, demoLeadSchema } from '../schemas/lead.js';
import { notifySalesOfLead } from '../services/email.js';
import { toId } from '../utils/serialize.js';

export const leadsRouter = Router();

leadsRouter.post(
  '/contact',
  publicFormLimiter,
  validate(contactLeadSchema),
  async (req, res) => {
    try {
      const lead = await Lead.create({
        ...req.body,
        type: 'contact',
        status: 'New',
      });

      void notifySalesOfLead({
        type: 'contact',
        fullName: lead.fullName,
        businessEmail: lead.businessEmail,
        phone: lead.phone,
        companyName: lead.companyName,
        country: lead.country,
        lookingFor: lead.lookingFor,
        projectDescription: lead.projectDescription,
      }).catch((err) => console.error('[email] contact notify failed', err));

      res.status(201).json({ success: true, data: toId(lead) });
    } catch (err) {
      console.error('[leads/contact]', err);
      res.status(500).json({ success: false, message: 'Failed to submit enquiry' });
    }
  },
);

leadsRouter.post('/demo', publicFormLimiter, validate(demoLeadSchema), async (req, res) => {
  try {
    const lead = await Lead.create({
      ...req.body,
      type: 'demo',
      lookingFor: req.body.gameTitle || 'Game Demo',
      projectDescription: req.body.message || '',
      status: 'New',
    });

    void notifySalesOfLead({
      type: 'demo',
      fullName: lead.fullName,
      businessEmail: lead.businessEmail,
      phone: lead.phone,
      companyName: lead.companyName,
      country: lead.country,
      gameTitle: lead.gameTitle,
      message: lead.message,
    }).catch((err) => console.error('[email] demo notify failed', err));

    res.status(201).json({ success: true, data: toId(lead) });
  } catch (err) {
    console.error('[leads/demo]', err);
    res.status(500).json({ success: false, message: 'Failed to submit demo request' });
  }
});
