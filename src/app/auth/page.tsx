'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import Input from '@/components/Input';
import Button from '@/components/Button';
import Field from '@/components/Field';

export default function AuthPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  const [sessionEmail, setSessionEmail] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSessionEmail(data.session?.user.email ?? null);
    });
  }, []);

  const signIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: window.location.origin }
    });
    if (error) setError(error.message); else setSent(true);
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setSessionEmail(null);
  };

  if (sessionEmail) {
    return (
      <div className="space-y-4">
        <p>You are signed in as {sessionEmail}</p>
        <Button onClick={signOut}>Sign out</Button>
      </div>
    );
  }

  return (
    <form onSubmit={signIn} className="max-w-md space-y-6">
      {sent ? (
        <p className="text-green-600">Check your email for a magic link.</p>
      ) : (
        <>
          <Field label="Email" htmlFor="email">
            <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
          </Field>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <Button type="submit" className="w-full">Send magic link</Button>
        </>
      )}
    </form>
  );
}
