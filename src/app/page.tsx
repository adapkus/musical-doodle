import Link from 'next/link';
import Button from '@/components/Button';
import Card, { CardHeader } from '@/components/Card';

export default function HomePage() {
  return (
    <div className="space-y-16">
      <section className="text-center space-y-6">
        <h1 className="text-4xl font-semibold">Neighborhood Jobs</h1>
        <p className="text-lg text-text/60">Connecting grandparents with eager students for small, local jobs.</p>
        <div className="flex justify-center gap-4">
          <Link href="/jobs"><Button size="lg">Browse Jobs</Button></Link>
          <Link href="/jobs/new"><Button size="lg" variant="secondary">Post a Job</Button></Link>
        </div>
      </section>
      <section className="grid gap-8 md:grid-cols-3">
        <Card>
          <CardHeader title="Easy Posting" subtitle="Grandparents post in minutes" />
        </Card>
        <Card>
          <CardHeader title="Local Students" subtitle="Students lend a hand" />
        </Card>
        <Card>
          <CardHeader title="Safe & Simple" subtitle="Magic link sign-in with Supabase" />
        </Card>
      </section>
    </div>
  );
}
