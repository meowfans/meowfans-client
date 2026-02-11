'use client';

import { Button } from '@workspace/ui/components/button';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface CategoryHeaderProps {
  label: string;
}

export function CategoryHeader({ label }: CategoryHeaderProps) {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={() => router.back()} className="h-8 w-8">
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-bold capitalize">{label}</h1>
      </div>
      <p className="text-sm text-muted-foreground">
        Discover vaults related to <span className="font-medium text-foreground">{label}</span>
      </p>
    </div>
  );
}
