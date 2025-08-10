import { cn } from '@/utils/cn';

export default function Toast({ children, type = 'info' }: { children: React.ReactNode; type?: 'info' | 'error' }) {
  const classes = type === 'error' ? 'bg-red-500 text-white' : 'bg-accent text-white';
  return <div className={cn('rounded-md px-4 py-2 shadow-md', classes)}>{children}</div>;
}
