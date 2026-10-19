import { cn } from '@/lib/utils';

interface RichContentProps {
  html?: string | null;
  className?: string;
}

export function RichContent({ html, className }: RichContentProps) {
  if (!html) return null;
  return (
    <div
      className={cn('content prose max-w-none', className)}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
