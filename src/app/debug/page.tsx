'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function DebugPage() {
  const [loaded, setLoaded] = useState(false);
  const [ping, setPing] = useState<string | null>(null);
  const [sessionEmail, setSessionEmail] = useState<string | null>(null);

  useEffect(() => {
    setLoaded(!!process.env.NEXT_PUBLIC_SUPABASE_URL);
    supabase.auth.getSession().then(({ data }) => setSessionEmail(data.session?.user.email ?? null));
    supabase.from('profiles').select('id').limit(1).then(res => setPing(res.error ? res.error.message : 'ok'));
  }, []);

  return (
    <div className="space-y-4">
      <div>Env loaded: {loaded ? 'yes' : 'no'}</div>
      <div>Supabase ping: {ping}</div>
      <div>Session email: {sessionEmail ?? 'none'}</div>
    </div>
  );
}
