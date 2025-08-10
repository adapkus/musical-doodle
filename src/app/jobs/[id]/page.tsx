'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import Card, { CardHeader } from '@/components/Card';
import Button from '@/components/Button';
import TextArea from '@/components/TextArea';
import Field from '@/components/Field';
import Empty from '@/components/Empty';

export default function JobDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const [job, setJob] = useState<any>(null);
  const [session, setSession] = useState<any>(null);
  const [message, setMessage] = useState('');
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    supabase.from('jobs').select('*').eq('id', id).single().then(({ data }) => setJob(data));
    supabase.auth.getSession().then(async ({ data }) => {
      const session = data.session;
      setSession(session);
      if (session) {
        const { data: profile } = await supabase.from('profiles').select('role').eq('id', session.user.id).single();
        setRole(profile?.role ?? null);
      }
    });
  }, [id]);

  const apply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session) {
      router.push('/auth');
      return;
    }
    await supabase.from('applications').insert({ job_id: id, applicant_id: session.user.id, message });
    setMessage('');
    router.push('/dashboard/student');
  };

  const remove = async () => {
    if (!session) return;
    await supabase.from('jobs').delete().eq('id', id);
    router.push('/dashboard/employer');
  };

  if (!job) return <Empty>Job not found.</Empty>;

  const isOwner = session?.user.id === job.posted_by;

  return (
    <Card className="space-y-4">
      <CardHeader title={job.title} subtitle={job.location} />
      <p>{job.description}</p>
      {role === 'student' && (
        <form onSubmit={apply} className="space-y-4">
          <Field label="Message" htmlFor="message">
            <TextArea id="message" value={message} onChange={e => setMessage(e.target.value)} />
          </Field>
          <Button type="submit">Apply</Button>
        </form>
      )}
      {isOwner && (
        <div className="flex gap-2">
          <Button variant="secondary" onClick={() => router.push(`/jobs/new?id=${id}`)}>Edit</Button>
          <Button variant="ghost" onClick={remove}>Delete</Button>
        </div>
      )}
    </Card>
  );
}
