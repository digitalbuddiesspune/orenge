import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export type AuthPayload = {
  sub: string;
  email: string;
  role: string;
};

export type AuthedRequest = Request & { admin?: AuthPayload };

export function requireAuth(req: AuthedRequest, res: Response, next: NextFunction): void {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) {
    res.status(401).json({ success: false, message: 'Authentication required' });
    return;
  }

  const token = header.slice(7);
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    res.status(500).json({ success: false, message: 'JWT not configured' });
    return;
  }

  try {
    const payload = jwt.verify(token, secret) as AuthPayload;
    req.admin = payload;
    next();
  } catch {
    res.status(401).json({ success: false, message: 'Invalid or expired token' });
  }
}
