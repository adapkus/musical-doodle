'use client';
import { forwardRef, TextareaHTMLAttributes } from 'react';
import { cn } from '@/utils/cn';

const TextArea = forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement>>(function TextArea(
  { className, ...props },
  ref
) {
  return (
    <textarea
      ref={ref}
      className={cn('w-full rounded-lg border border-surface bg-bg px-4 py-2 text-text shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent', className)}
      {...props}
    />
  );
});

export default TextArea;
