import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { config as loadEnv } from 'dotenv';
import nodemailer from 'nodemailer';
import type { ComponentType } from 'react';
import { createElement } from 'react';
import { render } from 'react-email';
import { ReactEmailTrial as EmailTemplateSource } from './emails/react-email-trial';

const rootDir = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '..',
);

loadEnv({ path: path.join(rootDir, '.env.local') });
loadEnv({ path: path.join(rootDir, '.env') });

const env = (key: string, fallback?: string) => {
  const value = process.env[key] ?? fallback;
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }

  return value;
};

const booleanEnv = (key: string, fallback: boolean) => {
  const value = process.env[key];
  if (value === undefined) {
    return fallback;
  }

  return ['1', 'true', 'yes', 'on'].includes(value.toLowerCase());
};

const splitRecipients = (value: string) =>
  value
    .split(',')
    .map((recipient) => recipient.trim())
    .filter(Boolean);

type EmailProps = Record<string, unknown>;
type EmailComponent = ComponentType<EmailProps> & {
  PreviewProps?: EmailProps;
};
const EmailTemplate = EmailTemplateSource as unknown as EmailComponent;

const smtpHost = env('SMTP_HOST', 'smtp.vip.163.com');
const smtpPort = Number(env('SMTP_PORT', '465'));
const smtpUser = env('SMTP_USER');
const smtpPass = env('SMTP_PASS');
const recipients = splitRecipients(env('MAIL_TO'));
const from = env('MAIL_FROM', smtpUser);
const subject = env('MAIL_SUBJECT', 'React Email SMTP Starter Test');
const dryRun = booleanEnv('MAIL_DRY_RUN', false);

if (recipients.length === 0) {
  throw new Error('MAIL_TO must contain at least one recipient.');
}

const emailElement = createElement(
  EmailTemplate,
  EmailTemplate.PreviewProps ?? {},
);

const [html, text] = await Promise.all([
  render(emailElement),
  render(emailElement, { plainText: true }),
]);

if (dryRun) {
  const outDir = path.join(rootDir, 'out');
  await fs.mkdir(outDir, { recursive: true });
  await Promise.all([
    fs.writeFile(path.join(outDir, 'preview.html'), html),
    fs.writeFile(path.join(outDir, 'preview.txt'), text),
  ]);

  console.log(
    JSON.stringify(
      {
        dryRun: true,
        html: path.join(outDir, 'preview.html'),
        text: path.join(outDir, 'preview.txt'),
      },
      null,
      2,
    ),
  );
  process.exit(0);
}

const transporter = nodemailer.createTransport({
  auth: {
    pass: smtpPass,
    user: smtpUser,
  },
  host: smtpHost,
  port: smtpPort,
  secure: booleanEnv('SMTP_SECURE', smtpPort === 465),
});

const result = await transporter.sendMail({
  from,
  html,
  subject,
  text,
  to: recipients,
});

console.log(
  JSON.stringify(
    {
      accepted: result.accepted,
      messageId: result.messageId,
      rejected: result.rejected,
      response: result.response,
    },
    null,
    2,
  ),
);
