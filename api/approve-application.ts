import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || '';
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const appUrl = (process.env.APP_URL || process.env.SITE_URL || '').replace(/\/$/, '');
const vercelUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : '';
const invitedRedirectUrl = `${appUrl || vercelUrl || 'https://codebridgetest.vercel.app/login'}`;

const adminSupabase = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});

const createMemberNumber = () => `CB-${Date.now().toString().slice(-8)}`;

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!supabaseUrl || !supabaseServiceRoleKey) {
    return res.status(500).json({
      error: 'Server-side Supabase configuration is missing. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in your deployment environment.',
    });
  }

  const payload = req.body ?? {};
  const email = typeof payload.email === 'string' ? payload.email.trim() : '';

  if (!email) {
    return res.status(400).json({ error: 'Application email is required.' });
  }

  try {
    const { error: inviteError } = await adminSupabase.auth.admin.inviteUserByEmail(email, {
      data: {
        firstName: payload.first_name ?? '',
        lastName: payload.last_name ?? '',
        phone: payload.phone ?? '',
        address: payload.address ?? '',
        dateOfBirth: payload.date_of_birth ?? '',
        role: 'member',
      },
      redirectTo: invitedRedirectUrl,
    });

    if (inviteError) {
      throw inviteError;
    }

    const { data: existingMember, error: existingMemberError } = await adminSupabase
      .from('members')
      .select('*')
      .eq('email', email)
      .maybeSingle();

    if (existingMemberError) {
      throw existingMemberError;
    }

    const memberPayload = {
      email,
      first_name: (payload.first_name ?? existingMember?.first_name ?? '').toString(),
      last_name: (payload.last_name ?? existingMember?.last_name ?? '').toString(),
      phone: (payload.phone ?? existingMember?.phone ?? '').toString(),
      address: (payload.address ?? existingMember?.address ?? '').toString(),
      date_of_birth: payload.date_of_birth ?? existingMember?.date_of_birth ?? null,
      member_number: existingMember?.member_number ?? createMemberNumber(),
      role: 'member',
      status: 'inactive',
      registration_date: existingMember?.registration_date ?? new Date().toISOString(),
    };

    const { error: memberUpsertError } = await adminSupabase
      .from('members')
      .upsert(memberPayload, { onConflict: 'email' });

    if (memberUpsertError) {
      throw memberUpsertError;
    }

    const { error: applicationUpdateError } = await adminSupabase
      .from('membership_applications')
      .update({ status: 'approved' })
      .eq('id', payload.id);

    if (applicationUpdateError) {
      throw applicationUpdateError;
    }

    return res.status(200).json({
      message: `Invitation sent to ${email}. They will set their own password via the link.`,
    });
  } catch (error: any) {
    console.error('approve-application handler error:', error);
    return res.status(400).json({
      error: error?.message || 'Failed to approve application.',
    });
  }
}
