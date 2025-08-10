'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/utils/cn';

export default function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  const pathname = usePathname();
  const active = pathname === href;
  return (
    <Link
      href={href}
      className={cn('transition-colors duration-[var(--transition)] hover:text-accent', active && 'text-accent')}
    >
      {children}
    </Link>
  );
}
