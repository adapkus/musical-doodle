'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import Field from '@/components/Field';
import Input from '@/components/Input';
import Button from '@/components/Button';

export default function ProfilePage() {
  const router = useRouter();
  const [session, setSession] = useState<any>(null);
  const [fullName, setFullName] = useState('');
  const [community, setCommunity] = useState('');

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data }) => {
      const session = data.session;
      if (!session) {
        router.push('/auth');
        return;
      }
      setSession(session);
      const { data: profile } = await supabase.from('profiles').select('full_name, community').eq('id', session.user.id).single();
      setFullName(profile?.full_name ?? '');
      setCommunity(profile?.community ?? '');
    });
  }, [router]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session) return;
    await supabase.from('profiles').update({ full_name: fullName, community }).eq('id', session.user.id);
    router.push('/');
  };

  return (
    <form onSubmit={submit} className="max-w-md space-y-6">
      <Field label="Full name" htmlFor="full_name">
        <Input id="full_name" value={fullName} onChange={e => setFullName(e.target.value)} required />
      </Field>
      <Field label="Community" htmlFor="community">
        <Input id="community" value={community} onChange={e => setCommunity(e.target.value)} required />
      </Field>
      <Button type="submit" className="w-full">Save</Button>
    </form>
  );
}
