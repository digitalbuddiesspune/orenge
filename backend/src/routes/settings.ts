import { Router, type Request, type Response } from 'express';
import { SiteSetting } from '../models/SiteSetting.js';

export const settingsPublicRouter = Router();

settingsPublicRouter.get('/home-assets', async (_req: Request, res: Response) => {
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
