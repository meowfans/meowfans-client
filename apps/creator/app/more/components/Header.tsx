'use client';

import { SectionHeader } from '@/components/SectionHeader';
import { Settings, Sparkles } from 'lucide-react';

export const Header = () => {
  return (
    <div className="mb-8">
      <SectionHeader
        title="Settings & More"
        description="Customize your experience and manage your account"
        icon={Settings}
        badge={<Sparkles className="h-4 w-4 text-muted-foreground" />}
      />
    </div>
  );
};
