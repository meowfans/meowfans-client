'use client';

import { Vortex } from '@workspace/ui/components/shadcn-io/vortex';
import { CreatorHero } from './components/CreatorHero';
import { CreatorSignupForm } from './components/CreatorSignupForm';

export default function CreatorSignupPage() {
  return (
    <div className="relative h-dvh w-full overflow-hidden bg-black text-white">
      <Vortex
        backgroundColor="black"
        rangeY={800}
        particleCount={500}
        baseHue={35}
        className="h-full w-full overflow-y-auto overflow-x-hidden scrollbar-hide"
      >
        <div className="z-10 w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 place-content-center items-center mx-auto min-h-full px-6 py-8 md:px-12 lg:py-0">
          <CreatorHero />
          <CreatorSignupForm />
        </div>
      </Vortex>
    </div>
  );
}
