import { cn } from '@/utils/cn';

export default function Badge({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span className={cn('inline-block rounded-full bg-accent/10 text-accent px-3 py-1 text-xs font-medium', className)} {...props} />
  );
}
