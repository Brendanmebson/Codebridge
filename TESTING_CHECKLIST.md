# CodeBridge Frontend Testing Checklist

## 1) Setup / Environment readiness
- Run `npm install`
- Run `npm run build`
- Verify the frontend env vars are present:
  - `VITE_SUPABASE_URL`
  - `VITE_SUPABASE_ANON_KEY`
- Verify the server/runtime env vars are present:
  - `SUPABASE_URL`
  - `SUPABASE_SERVICE_ROLE_KEY`
  - `APP_URL` or `SITE_URL` or `VERCEL_URL`
- Confirm the admin endpoint is accessible at `/api/approve-application`

## 2) Supabase dashboard / backend readiness
- Confirm required tables exist:
  - `membership_applications`
  - `members`
  - `business_submissions`
  - `newsletter_subscribers`
- Confirm storage bucket exists if membership applications upload files
- Confirm Supabase Auth settings:
  - invite email enabled
  - redirect URL configured
  - sender branding configured if needed
- Confirm RLS policies allow expected anonymous and authenticated access
- Confirm the `members` table has expected fields: `email`, `auth_id`, `role`, `status`, etc.

## 3) Public site sanity checks
- Open the homepage and confirm the primary CTA goes to `/apply`
- Confirm public CTAs/navigation consistency on:
  - `/about`
  - `/services`
  - `/membership`
  - `/contact`
  - `/businesses`
  - `/loan-calculator`
  - `/loan-policy`
  - `/terms-and-conditions`
- Confirm `Submit Your Business` navigates to `/business-submission`

## 4) Membership application flow
- Visit `/apply`
- Complete the membership application form
- Upload required documents, if applicable
- Submit the application
- Confirm success feedback displays
- Verify in Supabase:
  - a row exists in `membership_applications`
  - status is `pending` or expected initial value
  - uploaded file links are recorded if applicable

## 5) Contact form flow
- Visit `/contact`
- Submit a test enquiry with name, email, phone, and message
- Confirm the browser launches a `mailto:` link
- Confirm the recipient is `brendanmebson@gmail.com`
- Confirm the subject/body include the form inputs

## 6) Business submission flow
- Visit `/businesses`
- Click the submission CTA
- Fill the `/business-submission` form
- Submit and confirm the success state appears
- Verify in Supabase:
  - a row exists in `business_submissions`
  - fields match the submitted values

## 7) Newsletter signup flow
- Submit a newsletter email in the public flow
- Confirm success feedback
- Verify in Supabase:
  - a row exists in `newsletter_subscribers`
  - duplicate emails are handled gracefully

## 8) Admin invite / approval flow
- Log in as an admin user
- Visit the admin member management page
- Confirm pending membership applications appear
- Approve a pending application
- Confirm the admin UI reports the invite was sent
- Verify in Supabase:
  - `membership_applications.status` changes to `approved`
  - `members` row is created or updated for the email
  - `members.email` and other fields are populated
- Confirm Supabase Auth has created an invite for the email

## 9) Invite email / redirect verification
- Open the invite email
- Confirm the invite link uses the deployed app URL, not `localhost:3000`
- Confirm the link lands on the correct sign-in/invite flow page
- Confirm email content and sender branding are acceptable

## 10) Member onboarding + login
- Complete the invite sign-up/password setup flow
- Log in as the invited member
- Confirm access to the member dashboard
- Confirm member pages load successfully
- Verify the `members.auth_id` field is populated after login

## 11) Authorization checks
- Confirm admin-only pages are blocked for guests and regular members
- Confirm dashboard pages are blocked for guests
- Confirm public pages are accessible without login

## 12) Resend / recovery checks
- Re-run approval for the same pending email if needed
- Confirm the invite endpoint can send another invitation
- Confirm password reset is required if the user already accepted the invite

## 13) Edge case validation
- Submit incomplete forms and confirm validation blocks submission
- Submit duplicate business or newsletter entries and confirm handling
- Attempt login before approval and confirm it is not allowed
- Verify the app handles a missing `members` row gracefully if possible

## 14) Deployment / production verification
- Confirm production runtime env vars are set correctly
- Confirm `SUPABASE_SERVICE_ROLE_KEY` is only available server-side
- Confirm the frontend bundle does not expose service-role credentials
- Confirm `/api/approve-application` works in production
- Confirm `APP_URL`/`SITE_URL`/`VERCEL_URL` govern invite redirect behavior

## 15) Final end-to-end smoke test
- Start at the public homepage
- Apply for membership
- Approve the application via admin
- Open the invite email and accept the invite
- Complete signup and log in as the member
- Confirm the full cycle works from public application to member access
