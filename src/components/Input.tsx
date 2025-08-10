'use client';
import { forwardRef, InputHTMLAttributes } from 'react';
import { cn } from '@/utils/cn';

const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(function Input(
  { className, ...props },
  ref
) {
  return (
    <input
      ref={ref}
      className={cn('w-full rounded-lg border border-surface bg-bg px-4 py-2 text-text shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent', className)}
      {...props}
    />
  );
});

export default Input;
