'use client';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import Input from '@/components/Input';
import TextArea from '@/components/TextArea';
import Field from '@/components/Field';
import Button from '@/components/Button';

export default function NewJobPage() {
  const router = useRouter();
  const params = useSearchParams();
  const editId = params.get('id');
  const [session, setSession] = useState<any>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data }) => {
      const session = data.session;
      if (!session) {
        router.push('/auth');
        return;
      }
      const { data: profile } = await supabase.from('profiles').select('role').eq('id', session.user.id).single();
      if (profile?.role !== 'grandparent') router.push('/dashboard/student');
      setSession(session);
      if (editId) {
        const { data: job } = await supabase.from('jobs').select('*').eq('id', editId).single();
        if (job) {
          setTitle(job.title);
          setDescription(job.description);
          setLocation(job.location);
        }
      }
    });
  }, [router, editId]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session) return;
    if (editId) {
      await supabase.from('jobs').update({ title, description, location }).eq('id', editId);
    } else {
      await supabase.from('jobs').insert({ title, description, location, posted_by: session.user.id });
    }
    router.push('/dashboard/employer');
  };

  return (
    <form onSubmit={submit} className="max-w-md space-y-6">
      <Field label="Title" htmlFor="title">
        <Input id="title" value={title} onChange={e => setTitle(e.target.value)} required />
      </Field>
      <Field label="Description" htmlFor="description">
        <TextArea id="description" value={description} onChange={e => setDescription(e.target.value)} required />
      </Field>
      <Field label="Location" htmlFor="location">
        <Input id="location" value={location} onChange={e => setLocation(e.target.value)} required />
      </Field>
      <Button type="submit" className="w-full">{editId ? 'Save' : 'Create'}</Button>
    </form>
  );
}
