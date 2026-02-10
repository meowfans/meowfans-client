'use client';

import { useState } from 'react';
import { SupportContactCTA } from './SupportContactCTA';
import { SupportFAQ } from './SupportFAQ';
import { SupportHeader } from './SupportHeader';
import { SupportQuickActions } from './SupportQuickActions';
import { SupportSearch } from './SupportSearch';

export function Support() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-background p-4 md:p-8 lg:p-12 overflow-y-auto">
      <div className="max-w-4xl mx-auto space-y-12">
        <SupportHeader />

        <SupportSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

        <SupportQuickActions />

        <SupportFAQ searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

        <SupportContactCTA />
      </div>
    </div>
  );
}
