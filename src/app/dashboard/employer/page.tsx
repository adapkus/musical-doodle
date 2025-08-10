'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import Button from '@/components/Button';
import Card, { CardHeader } from '@/components/Card';
import Empty from '@/components/Empty';

export default function EmployerDashboard() {
  const router = useRouter();
  const [jobs, setJobs] = useState<any[]>([]);

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data }) => {
      const session = data.session;
      if (!session) {
        router.push('/auth');
        return;
      }
      const { data: jobs } = await supabase.from('jobs').select('*').eq('posted_by', session.user.id);
      setJobs(jobs ?? []);
    });
  }, [router]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">My Jobs</h1>
        <Button onClick={() => router.push('/jobs/new')}>Create Job</Button>
      </div>
      {jobs.length === 0 ? (
        <Empty>No jobs yet.</Empty>
      ) : (
        <div className="space-y-4">
          {jobs.map(job => (
            <Card key={job.id}>
              <CardHeader title={job.title} subtitle={job.location} />
              <p>{job.description}</p>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
