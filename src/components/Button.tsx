'use client';
import { ButtonHTMLAttributes } from 'react';
import { cn } from '@/utils/cn';

type Variant = 'primary' | 'secondary' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

const variants: Record<Variant, string> = {
  primary: 'bg-accent text-white hover:bg-accent/90',
  secondary: 'bg-surface text-text border border-accent hover:bg-surface/80',
  ghost: 'text-text hover:bg-surface'
};

const sizes: Record<Size, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2',
  lg: 'px-6 py-3 text-lg'
};

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
}

export default function Button({ variant = 'primary', size = 'md', fullWidth, className, ...props }: Props) {
  return (
    <button
      className={cn(
        'rounded-lg transition-colors duration-[var(--transition)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent',
        variants[variant],
        sizes[size],
        fullWidth && 'w-full',
        className
      )}
      {...props}
    />
  );
}
