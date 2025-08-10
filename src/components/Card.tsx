import { cn } from '@/utils/cn';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  padding?: 'sm' | 'md' | 'lg';
}

const paddings = {
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8'
};

export default function Card({ padding = 'md', className, ...props }: Props) {
  return <div className={cn('rounded-2xl bg-surface shadow-md', paddings[padding], className)} {...props} />;
}

export function CardHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-4">
      <h3 className="font-semibold">{title}</h3>
      {subtitle && <p className="text-sm text-text/60">{subtitle}</p>}
    </div>
  );
}
