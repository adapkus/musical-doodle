'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import Card, { CardHeader } from '@/components/Card';
import Empty from '@/components/Empty';
import Input from '@/components/Input';

export default function JobsPage() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    supabase.from('jobs').select('*').then(({ data }) => setJobs(data ?? []));
  }, []);

  const filtered = jobs.filter(job =>
    job.location.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <Input placeholder="Search by community" value={query} onChange={e => setQuery(e.target.value)} />
      {filtered.length === 0 ? (
        <Empty>No jobs found.</Empty>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {filtered.map(job => (
            <Card key={job.id}>
              <CardHeader title={job.title} subtitle={job.location} />
              <p className="mb-4">{job.description}</p>
              <a href={`/jobs/${job.id}`} className="text-accent hover:underline">View</a>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
