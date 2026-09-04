import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Admin } from '../../models/Admin.js';
import { loginLimiter } from '../../middleware/rateLimit.js';
import { validate } from '../../middleware/validate.js';
import { loginSchema } from '../../schemas/lead.js';

export const adminAuthRouter = Router();

adminAuthRouter.post('/login', loginLimiter, validate(loginSchema), async (req, res) => {
  try {
    const email = String(req.body.email).toLowerCase().trim();
    const admin = await Admin.findOne({ email });
    if (!admin) {
      res.status(401).json({ success: false, message: 'Invalid email or password' });
      return;
    }

    const ok = await bcrypt.compare(req.body.password, admin.password);
    if (!ok) {
      res.status(401).json({ success: false, message: 'Invalid email or password' });
      return;
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      res.status(500).json({ success: false, message: 'JWT not configured' });
      return;
    }

    const token = jwt.sign(
      { sub: admin._id.toString(), email: admin.email, role: admin.role },
      secret,
      { expiresIn: (process.env.JWT_EXPIRES_IN || '7d') as jwt.SignOptions['expiresIn'] },
    );

    res.json({
      success: true,
      data: {
        token,
        admin: {
          id: admin._id.toString(),
          email: admin.email,
          name: admin.name,
          role: admin.role,
        },
      },
    });
  } catch (err) {
    console.error('[admin/auth/login]', err);
    res.status(500).json({ success: false, message: 'Login failed' });
  }
});
