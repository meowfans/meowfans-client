'use client';

import {
  CircleDollarSign,
  Gem,
  LoaderIcon,
  LucideIcon,
  MessageCircle,
  NetworkIcon,
  ShieldQuestionIcon,
  TableOfContents,
  UserRoundCheck
} from 'lucide-react';
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

const contents: Contents[] = [
  { label: 'How It Works?', icon: NetworkIcon, id: '1' },
  { label: 'Why PayView?', icon: ShieldQuestionIcon, id: '2' },
  { label: 'For Creators', icon: Gem, id: '3' },
  { label: 'For Viewers', icon: UserRoundCheck, id: '4' },
  { label: 'What People Say?', icon: MessageCircle, id: '5' },
  { label: 'Pricing plans', icon: CircleDollarSign, id: '6' },
  { label: 'FAQ', icon: TableOfContents, id: '8' }
];

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

            <ExplorePagePayRights />
          </div>
        </div>
      </div>
    </Suspense>
  );
};
