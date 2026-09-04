import { Router } from 'express';
import { requireAuth } from '../../middleware/auth.js';
import { adminAuthRouter } from './auth.js';
import { adminDashboardRouter } from './dashboard.js';
import { adminLeadsRouter } from './leads.js';
import { adminGamesRouter } from './games.js';
import { adminCaseStudiesRouter } from './caseStudies.js';
import { adminBlogRouter } from './blog.js';
import { adminUploadsRouter } from './uploads.js';

export const adminRouter = Router();

adminRouter.use('/auth', adminAuthRouter);

adminRouter.use(requireAuth);
adminRouter.use('/dashboard', adminDashboardRouter);
adminRouter.use('/leads', adminLeadsRouter);
adminRouter.use('/games', adminGamesRouter);
adminRouter.use('/case-studies', adminCaseStudiesRouter);
adminRouter.use('/blog', adminBlogRouter);
adminRouter.use('/uploads', adminUploadsRouter);
