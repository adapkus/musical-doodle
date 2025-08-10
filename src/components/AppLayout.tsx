'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import Button from '@/components/Button';
import NavLink from '@/components/NavLink';
import ThemeToggle from '@/components/ThemeToggle';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setEmail(data.session?.user.email ?? null);
    });
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
    setEmail(null);
  };

  return (
    <div className="min-h-screen bg-bg text-text flex flex-col">
      <header className="sticky top-0 z-50 backdrop-blur bg-bg/80 border-b border-surface">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="font-semibold text-lg">Neighborhood Jobs</Link>
          <nav className="hidden md:flex gap-6">
            <NavLink href="/jobs">Jobs</NavLink>
            <NavLink href="/jobs/new">Post a Job</NavLink>
          </nav>
          <div className="flex items-center gap-3">
            {email ? (
              <>
                <span className="text-sm">{email}</span>
                <Button variant="ghost" size="sm" onClick={signOut}>Sign out</Button>
              </>
            ) : (
              <Link href="/auth"><Button variant="ghost" size="sm">Sign in</Button></Link>
            )}
            <ThemeToggle />
          </div>
        </div>
      </header>
      <main className="flex-1 container py-8">{children}</main>
      <footer className="container py-12 text-center text-sm text-text/60">
        © {new Date().getFullYear()} Neighborhood Jobs
      </footer>
    </div>
  );
}
