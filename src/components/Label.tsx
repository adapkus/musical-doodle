'use client';
import { cn } from '@/utils/cn';

export default function Label({ className, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return <label className={cn('block text-sm font-medium', className)} {...props} />;
}
