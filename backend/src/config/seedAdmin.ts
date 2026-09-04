import bcrypt from 'bcryptjs';
import { Admin } from '../models/Admin.js';

export async function seedAdmin(): Promise<void> {
  const email = (process.env.ADMIN_EMAIL || 'admin@oreng.com').toLowerCase().trim();
  const password = process.env.ADMIN_PASSWORD || 'changeme123';
  const name = process.env.ADMIN_NAME || 'Oreng Admin';

  const existing = await Admin.findOne({ email });
  if (existing) {
    console.log(`[seed] Admin already exists: ${email}`);
    return;
  }

  const hash = await bcrypt.hash(password, 12);
  await Admin.create({ email, password: hash, name, role: 'admin' });
  console.log(`[seed] Admin created: ${email}`);
}
