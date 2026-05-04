# React Email SMTP Starter

A small, practical starter project for writing responsive HTML emails with React components and sending them through any SMTP account with Nodemailer.

This project is powered by [React Email](https://github.com/resend/react-email), an open-source email component library by Resend. It was created as a minimal standalone starter after experimenting with the `resend/react-email` project.

## What This Project Does

- Write email templates as React components.
- Render templates to email-ready HTML and plain text.
- Send the rendered email through SMTP with Nodemailer.
- Keep sender credentials in local environment files instead of source code.
- Generate a local preview before sending.

## Project Structure

```txt
react-email-smtp-starter
├── .env.example
├── .gitignore
├── README.md
├── package.json
├── tsconfig.json
└── src
    ├── emails
    │   └── react-email-trial.tsx
    └── send.tsx
```

## Requirements

- Node.js 20 or newer
- npm
- An SMTP-enabled email account

For many email providers, the SMTP password is not your normal login password. You may need to enable SMTP/IMAP service and generate an app password or authorization code.

## Installation

```sh
npm install
```

## Configure Environment Variables

Create a local environment file:

```sh
cp .env.example .env.local
```

Then edit `.env.local`:

```txt
SMTP_HOST=smtp.vip.163.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=your-sender@example.com
SMTP_PASS=your-smtp-password-or-authorization-code

MAIL_FROM=your-sender@example.com
MAIL_TO=recipient@example.com
MAIL_SUBJECT="React Email SMTP Starter Test"
```

`MAIL_TO` supports multiple recipients separated by commas:

```txt
MAIL_TO=first@example.com,second@example.com
```

Do not commit `.env.local`. It contains private credentials and is already ignored by `.gitignore`.

## Edit the Email Template

The starter template lives here:

```txt
src/emails/react-email-trial.tsx
```

You can edit it like a normal React component:

- Change headings, copy, buttons, and links.
- Adjust inline styles.
- Add more React Email components.
- Create additional templates under `src/emails`.

Template-specific content such as the example recipient name and CTA URL is kept in source code, not in `.env.local`. The environment file is reserved for SMTP credentials, sender/recipient addresses, and the email subject.

The current send script imports this template:

```ts
import { ReactEmailTrial as EmailTemplateSource } from './emails/react-email-trial';
```

If you create a new template, update `src/send.tsx` to import and render that component instead.

## Preview Without Sending

Render the email to local files:

```sh
npm run render
```

This creates:

```txt
out/preview.html
out/preview.txt
```

Open `out/preview.html` in a browser to inspect the rendered email before sending.

## Send an Email

After `.env.local` is configured:

```sh
npm run send
```

On success, the script prints SMTP delivery metadata similar to:

```json
{
  "accepted": ["recipient@example.com"],
  "messageId": "...",
  "rejected": [],
  "response": "250 Mail OK queued ..."
}
```

## Type Check

```sh
npm run check
```

## Useful Scripts

```txt
npm run render  Render HTML/text preview files without sending.
npm run send    Send the email using SMTP settings from .env.local.
npm run check   Run TypeScript type checking.
```

## Security Notes

- Never commit `.env.local`.
- Prefer provider-generated SMTP authorization codes over account passwords.
- Rotate credentials if they were shared or exposed.
- For production or bulk sending, consider a dedicated provider such as Resend, Amazon SES, SendGrid, Mailgun, or Postmark.
- For better deliverability, configure SPF, DKIM, and DMARC for your sending domain.

## Attribution

Built with [React Email](https://github.com/resend/react-email). React Email is maintained by Resend and licensed separately under its own project license.

This starter is a small standalone project that depends on the published `react-email` package and uses Nodemailer for SMTP delivery.
