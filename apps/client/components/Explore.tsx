'use client';

import { LoaderIcon, LucideIcon } from 'lucide-react';
import dynamic from 'next/dynamic';
import { Suspense, useRef, useState } from 'react';

export interface Contents {
  label: string;
  icon: LucideIcon;
  id: string;
}

const ExplorePageContent = dynamic(() => import('@/components/Content'), { ssr: false });
const ExplorePagePricing = dynamic(() => import('@/components/Pricing'), { ssr: false });
const ExplorePagePayRights = dynamic(() => import('@/components/PayRights'), { ssr: false });

export const Explore = () => {
  const [highLightedId, setHighLightedId] = useState<string | null>(null);
  const divRefs = useRef<Record<string, HTMLDivElement | null>>({});

  return (
    <Suspense fallback={<LoaderIcon className="animate-spin" />}>
      <div className="relative flex items-center justify-center w-full">
        <div className="relative z-10 w-full h-full overflow-y-auto flex flex-col items-center">
          <div className="shadow accent-accent-foreground">
            <ExplorePageContent highLightedId={highLightedId} divRefs={divRefs} />
            <ExplorePagePricing highLightedId={highLightedId} divRefs={divRefs} />
            <p className="text-xs">
              Having problems with payment related issues or something else?{' '}
              <a href="mailto:support@meowfans.app" className="font-medium text-blue-600 underline hover:text-blue-700">
                Email us
              </a>
            </p>
            <ExplorePagePayRights />
          </div>
        </div>
      </div>
    </Suspense>
  );
};
