import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || '';
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

const adminSupabase = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});

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
    });

    if (inviteError) {
      throw inviteError;
    }

    const { error: memberUpdateError } = await adminSupabase
      .from('members')
      .update({ status: 'inactive' })
      .eq('email', email);

    if (memberUpdateError) {
      throw memberUpdateError;
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
