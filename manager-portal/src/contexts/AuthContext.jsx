import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      setLoading(false);

      if (event === 'SIGNED_IN' && currentUser) {
        // Set online status to true
        await supabase.from('managers').update({ is_online: true }).eq('id', currentUser.id);
      } else if (event === 'SIGNED_OUT') {
        // Note: we might not have currentUser here, so doing this on signout function directly is safer
      }
    });

    return () => {
      subscription.unsubscribe();
      // On unmount/close, maybe set offline? Difficult to track tab close reliably without beacon API.
    };
  }, []);

  const signIn = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data;
  };

  const signOut = async () => {
    if (user) {
      // Set offline before logging out
      await supabase.from('managers').update({ is_online: false }).eq('id', user.id);
    }
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
