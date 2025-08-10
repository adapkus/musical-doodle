'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import Card, { CardHeader } from '@/components/Card';
import Empty from '@/components/Empty';

export default function StudentDashboard() {
  const router = useRouter();
  const [jobs, setJobs] = useState<any[]>([]);
  const [apps, setApps] = useState<any[]>([]);

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data }) => {
      const session = data.session;
      if (!session) {
        router.push('/auth');
        return;
      }
      const { data: jobs } = await supabase.from('jobs').select('*');
      setJobs(jobs ?? []);
      const { data: apps } = await supabase.from('applications').select('*, jobs(title)').eq('applicant_id', session.user.id);
      setApps(apps ?? []);
    });
  }, [router]);

  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <h1 className="text-2xl font-semibold">Open Jobs</h1>
        {jobs.length === 0 ? (
          <Empty>No jobs found.</Empty>
        ) : (
          <div className="space-y-4">
            {jobs.map(job => (
              <Card key={job.id} onClick={() => router.push(`/jobs/${job.id}`)} className="cursor-pointer hover:shadow-lg transition-shadow duration-[var(--transition)]">
                <CardHeader title={job.title} subtitle={job.location} />
                <p>{job.description}</p>
              </Card>
            ))}
          </div>
        )}
      </section>
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">My Applications</h2>
        {apps.length === 0 ? (
          <Empty>No applications yet.</Empty>
        ) : (
          <div className="space-y-4">
            {apps.map(app => (
              <Card key={app.id}>
                <CardHeader title={app.jobs.title} subtitle={new Date(app.created_at).toLocaleDateString()} />
                <p>{app.message}</p>
              </Card>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
