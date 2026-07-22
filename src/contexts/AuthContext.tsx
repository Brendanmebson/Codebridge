import React, { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { supabase } from '../config/supabase';
import type { Member } from '../types';

interface AuthContextType {
  user: string | null;
  member: Member | null;
  userRole: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<string | null>(null);
  const [member, setMember] = useState<Member | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async (authId: string): Promise<Member | null> => {
    try {
      const { data, error } = await supabase
        .from('members')
        .select('*')
        .eq('auth_id', authId)
        .maybeSingle();

      if (error) {
        console.error('Profile fetch error:', error);
        return null;
      }

      return data ?? null;
    } catch (error: unknown) {
      console.error('Fetch profile error:', error);
      return null;
    }
  };

  const applyMemberState = (memberData: Member) => {
    setUser(memberData.member_number);
    setMember(memberData);
    setUserRole(memberData.role || 'member');
  };

  const clearMemberState = () => {
    setUser(null);
    setMember(null);
    setUserRole(null);
  };

  const isAbortError = (error: unknown) => {
    return (
      error instanceof Error &&
      (error.name === 'AbortError' || error.message.toLowerCase().includes('abort'))
    );
  };

  useEffect(() => {
    const restoreSession = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error || !data?.session?.user) {
          return;
        }

        const memberData = await fetchProfile(data.session.user.id);
        if (memberData) {
          applyMemberState(memberData);
        } else {
          await supabase.auth.signOut();
          clearMemberState();
        }
      } catch (error: unknown) {
        if (isAbortError(error)) {
          console.warn('Session restore was aborted by React Strict Mode. Retrying on next load.');
        } else {
          console.error('Session restore error:', error);
        }
      } finally {
        setLoading(false);
      }
    };

    restoreSession();
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;

      if (!data?.user) {
        throw new Error('Login did not return a valid user session. Please try again.');
      }

      const memberData = await fetchProfile(data.user.id);
      if (!memberData) {
        await supabase.auth.signOut();
        throw new Error('Member profile not found. Please contact support.');
      }

      applyMemberState(memberData);
    } catch (error: unknown) {
      if (isAbortError(error)) {
        throw new Error('Login was interrupted. Please try again.');
      }
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      clearMemberState();
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, member, userRole, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};