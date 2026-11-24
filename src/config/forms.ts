// Inbox that receives website form submissions (membership applications, contact messages).
export const FORM_RECIPIENT_EMAIL = 'codebridgecoop@gmail.com';

// FormSubmit.co turns a plain HTML form POST into an email, attachments included.
// The very first submission triggers a one-time activation email to the inbox above.
export const FORM_ENDPOINT = `https://formsubmit.co/${FORM_RECIPIENT_EMAIL}`;
