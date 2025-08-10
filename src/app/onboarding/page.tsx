'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import Input from '@/components/Input';
import Button from '@/components/Button';
import Field from '@/components/Field';

export default function OnboardingPage() {
  const router = useRouter();
  const [session, setSession] = useState<any>(null);
  const [role, setRole] = useState<'student' | 'grandparent'>('student');
  const [fullName, setFullName] = useState('');
  const [community, setCommunity] = useState('');

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) router.push('/auth');
      else setSession(data.session);
    });
  }, [router]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const user = session?.user;
    if (!user) return;
    await supabase.from('profiles').upsert({
      id: user.id,
      email: user.email,
      role,
      full_name: fullName,
      community
    });
    router.push(role === 'grandparent' ? '/dashboard/employer' : '/dashboard/student');
  };

  return (
    <form onSubmit={submit} className="max-w-md space-y-6">
      <div className="flex gap-4">
        <label className="flex items-center gap-2">
          <input type="radio" name="role" value="student" checked={role === 'student'} onChange={() => setRole('student')} />
          Student
        </label>
        <label className="flex items-center gap-2">
          <input type="radio" name="role" value="grandparent" checked={role === 'grandparent'} onChange={() => setRole('grandparent')} />
          Grandparent
        </label>
      </div>
      <Field label="Full name" htmlFor="full_name">
        <Input id="full_name" value={fullName} onChange={e => setFullName(e.target.value)} required />
      </Field>
      <Field label="Community" htmlFor="community">
        <Input id="community" value={community} onChange={e => setCommunity(e.target.value)} required />
      </Field>
      <Button type="submit" className="w-full">Continue</Button>
    </form>
  );
}
