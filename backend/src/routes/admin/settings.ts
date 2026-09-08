import { Router, type Request, type Response } from 'express';
import { SiteSetting } from '../../models/SiteSetting.js';

export const adminSettingsRouter = Router();

adminSettingsRouter.get('/home-assets', async (_req: Request, res: Response) => {
  try {
    const setting = await SiteSetting.findOne({ key: 'homeAssets' }).lean();
    res.json({
      success: true,
      data: setting ? setting.value : null,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err instanceof Error ? err.message : 'Failed to fetch settings',
    });
  }
});

adminSettingsRouter.put('/home-assets', async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    if (!payload || typeof payload !== 'object') {
      res.status(400).json({ success: false, message: 'Invalid home assets payload' });
      return;
    }

    const updated = await SiteSetting.findOneAndUpdate(
      { key: 'homeAssets' },
      { key: 'homeAssets', value: payload },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    ).lean();

    res.json({
      success: true,
      data: updated.value,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err instanceof Error ? err.message : 'Failed to update settings',
    });
  }
});

adminSettingsRouter.delete('/home-assets', async (_req: Request, res: Response) => {
  try {
    await SiteSetting.deleteOne({ key: 'homeAssets' });
    res.json({
      success: true,
      message: 'Home assets reset to defaults',
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err instanceof Error ? err.message : 'Failed to reset settings',
    });
  }
});
