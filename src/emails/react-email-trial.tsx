import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from 'react-email';

export interface ReactEmailTrialProps {
  name?: string;
  ctaUrl?: string;
}

export const ReactEmailTrial = ({
  name = 'Developer',
  ctaUrl = 'https://react.email',
}: ReactEmailTrialProps) => (
  <Html lang="en">
    <Head />
    <Preview>Your React Email SMTP Starter test email is ready.</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={hero}>
          <Text style={eyebrow}>React Email SMTP Starter</Text>
          <Heading style={heading}>Hello, {name}</Heading>
          <Text style={lead}>
            This message was created with React components, rendered into
            email-ready HTML and plain text, then sent through SMTP with
            Nodemailer.
          </Text>
          <Button href={ctaUrl} style={button}>
            View React Email
          </Button>
        </Section>

        <Section style={content}>
          <Heading as="h2" style={subheading}>
            What this starter includes
          </Heading>
          <Text style={paragraph}>
            1. A React Email template you can edit in `src/emails`.
          </Text>
          <Text style={paragraph}>
            2. Environment-based SMTP configuration in `.env.local`.
          </Text>
          <Text style={paragraph}>
            3. A dry-run preview flow with `npm run render`.
          </Text>
          <Text style={paragraph}>
            4. A one-command send flow with `npm run send`.
          </Text>
        </Section>

        <Hr style={hr} />
        <Text style={footer}>Sent from React Email SMTP Starter.</Text>
      </Container>
    </Body>
  </Html>
);

const main = {
  backgroundColor: '#f5f7fb',
  color: '#17202a',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', Arial, sans-serif",
  margin: '0',
  padding: '0',
};

const container = {
  margin: '0 auto',
  maxWidth: '560px',
  padding: '32px 20px',
  width: '100%',
};

const hero = {
  backgroundColor: '#ffffff',
  border: '1px solid #e5e7eb',
  borderRadius: '8px',
  padding: '34px 32px',
};

const eyebrow = {
  color: '#2563eb',
  fontSize: '13px',
  fontWeight: '700',
  lineHeight: '20px',
  margin: '0 0 12px',
};

const heading = {
  color: '#111827',
  fontSize: '28px',
  fontWeight: '700',
  lineHeight: '36px',
  margin: '0 0 16px',
};

const lead = {
  color: '#4b5563',
  fontSize: '16px',
  lineHeight: '26px',
  margin: '0 0 28px',
};

const button = {
  backgroundColor: '#111827',
  borderRadius: '6px',
  color: '#ffffff',
  display: 'inline-block',
  fontSize: '15px',
  fontWeight: '700',
  lineHeight: '20px',
  padding: '13px 18px',
  textDecoration: 'none',
};

const content = {
  backgroundColor: '#ffffff',
  border: '1px solid #e5e7eb',
  borderRadius: '8px',
  marginTop: '16px',
  padding: '26px 32px',
};

const subheading = {
  color: '#111827',
  fontSize: '18px',
  fontWeight: '700',
  lineHeight: '26px',
  margin: '0 0 16px',
};

const paragraph = {
  color: '#374151',
  fontSize: '14px',
  lineHeight: '22px',
  margin: '0 0 10px',
};

const hr = {
  borderColor: '#d8dbe5',
  margin: '24px 0',
};

const footer = {
  color: '#6b7280',
  fontSize: '12px',
  lineHeight: '18px',
  margin: '0',
  textAlign: 'center' as const,
};
