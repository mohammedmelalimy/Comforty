// app/components/ui/loader.tsx
'use client';

import { cn } from '@/lib/utils';

export default function Loader({ size = 40, className }: { size?: number; className?: string }) {
  return (
    <div className={cn('flex items-center justify-center', className)}>
      <div
        className="animate-spin rounded-full border-4 border-gray-300 border-t-gray-900"
        style={{ width: size, height: size }}
      />
    </div>
  );
}
