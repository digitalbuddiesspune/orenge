import nodemailer from 'nodemailer';

type LeadMailPayload = {
  type: 'contact' | 'demo';
  fullName: string;
  businessEmail: string;
  phone?: string;
  companyName: string;
  country: string;
  lookingFor?: string;
  gameTitle?: string;
  projectDescription?: string;
  message?: string;
};

function hasSmtp(): boolean {
  return Boolean(process.env.SMTP_USER && process.env.SMTP_PASS);
}

function createTransport() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

export async function notifySalesOfLead(lead: LeadMailPayload): Promise<void> {
  const to = process.env.SALES_EMAIL || 'sales@oreng.com';
  const subject =
    lead.type === 'demo'
      ? `[Demo] ${lead.fullName} — ${lead.gameTitle || lead.companyName}`
      : `[Contact] ${lead.fullName} — ${lead.companyName}`;

  const lines = [
    `Type: ${lead.type}`,
    `Name: ${lead.fullName}`,
    `Email: ${lead.businessEmail}`,
    `Phone: ${lead.phone || '—'}`,
    `Company: ${lead.companyName}`,
    `Country: ${lead.country}`,
    lead.lookingFor ? `Looking for: ${lead.lookingFor}` : '',
    lead.gameTitle ? `Game: ${lead.gameTitle}` : '',
    lead.projectDescription ? `Project: ${lead.projectDescription}` : '',
    lead.message ? `Message: ${lead.message}` : '',
  ].filter(Boolean);

  const text = lines.join('\n');

  if (!hasSmtp()) {
    console.log('[email] SMTP not configured — lead notification:\n', text);
    return;
  }

  const transport = createTransport();
  await transport.sendMail({
    from: process.env.SMTP_FROM || 'Oreng Website <noreply@oreng.com>',
    to,
    replyTo: lead.businessEmail,
    subject,
    text,
  });
}
