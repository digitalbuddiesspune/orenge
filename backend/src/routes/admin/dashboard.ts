import { Router } from 'express';
import { Lead } from '../../models/Lead.js';
import { Game } from '../../models/Game.js';
import { CaseStudy } from '../../models/CaseStudy.js';
import { BlogPost } from '../../models/BlogPost.js';

export const adminDashboardRouter = Router();

adminDashboardRouter.get('/stats', async (_req, res) => {
  try {
    const [
      totalLeads,
      newLeads,
      contactLeads,
      demoLeads,
      statusBreakdown,
      gamesCount,
      featuredGames,
      caseStudiesCount,
      publishedPosts,
      draftPosts,
    ] = await Promise.all([
      Lead.countDocuments(),
      Lead.countDocuments({ status: 'New' }),
      Lead.countDocuments({ type: 'contact' }),
      Lead.countDocuments({ type: 'demo' }),
      Lead.aggregate([{ $group: { _id: '$status', count: { $sum: 1 } } }]),
      Game.countDocuments(),
      Game.countDocuments({ isFeatured: true, published: true }),
      CaseStudy.countDocuments({ published: true }),
      BlogPost.countDocuments({ published: true }),
      BlogPost.countDocuments({ published: false }),
    ]);

    const byStatus = Object.fromEntries(statusBreakdown.map((s) => [s._id, s.count]));

    res.json({
      success: true,
      data: {
        leads: {
          total: totalLeads,
          new: newLeads,
          contact: contactLeads,
          demo: demoLeads,
          byStatus,
        },
        content: {
          games: gamesCount,
          featuredGames,
          caseStudies: caseStudiesCount,
          publishedPosts,
          draftPosts,
        },
      },
    });
  } catch (err) {
    console.error('[admin/dashboard/stats]', err);
    res.status(500).json({ success: false, message: 'Failed to load stats' });
  }
});
