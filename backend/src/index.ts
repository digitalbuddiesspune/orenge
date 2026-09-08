import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { connectDb } from './config/db.js';
import { seedAdmin } from './config/seedAdmin.js';
import { leadsRouter } from './routes/leads.js';
import { gamesPublicRouter } from './routes/games.js';
import { caseStudiesPublicRouter } from './routes/caseStudies.js';
import { blogPublicRouter } from './routes/blog.js';
import { settingsPublicRouter } from './routes/settings.js';
import { adminRouter } from './routes/admin/index.js';
import { uploadsDir } from './routes/admin/uploads.js';

const PORT = Number(process.env.PORT || 5000);
const MONGODB_URI = process.env.MONGODB_URI;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

async function main() {
  if (!MONGODB_URI) {
    console.error('[boot] MONGODB_URI is required. Copy .env.example to .env');
    process.exit(1);
  }

  if (!process.env.JWT_SECRET) {
    console.warn('[boot] JWT_SECRET is missing — admin auth will fail');
  }

  await connectDb(MONGODB_URI);
  await seedAdmin();

  const app = express();

  app.use(
    cors({
      origin: [FRONTEND_URL, 'http://localhost:5173', 'http://127.0.0.1:5173'],
      credentials: true,
    }),
  );
  app.use(express.json({ limit: '2mb' }));
  app.use('/uploads', express.static(uploadsDir));

  app.get('/api/health', (_req, res) => {
    res.json({
      success: true,
      data: {
        service: 'orenge-api',
        time: new Date().toISOString(),
      },
    });
  });

  app.use('/api/leads', leadsRouter);
  app.use('/api/games', gamesPublicRouter);
  app.use('/api/case-studies', caseStudiesPublicRouter);
  app.use('/api/blog', blogPublicRouter);
  app.use('/api/settings', settingsPublicRouter);
  app.use('/api/admin', adminRouter);

  app.use((_req, res) => {
    res.status(404).json({ success: false, message: 'Not found' });
  });

  app.use(
    (
      err: Error,
      _req: express.Request,
      res: express.Response,
      _next: express.NextFunction,
    ) => {
      console.error('[error]', err);
      res.status(500).json({ success: false, message: err.message || 'Internal server error' });
    },
  );

  app.listen(PORT, () => {
    console.log(`[api] Oreng backend listening on http://localhost:${PORT}`);
    console.log(`[api] Uploads directory: ${uploadsDir}`);
  });
}

main().catch((err) => {
  console.error('[boot] Failed to start', err);
  process.exit(1);
});
