'use client';
import { Vortex } from '@workspace/ui/components/shadcn-io/vortex';
import { ForgotPassword } from './components/ForgotPassword';

export default function ForgotPasswordPage() {
  return (
    <div className="relative h-dvh w-full overflow-hidden bg-black text-white">
      <Vortex
        backgroundColor="black"
        rangeY={800}
        particleCount={400}
        baseHue={260}
        className="h-full w-full overflow-y-auto overflow-x-hidden scrollbar-hide flex items-center justify-center"
      >
        <div className="z-10 w-full px-6 py-8 md:px-12">
          <ForgotPassword />
        </div>
      </Vortex>
    </div>
  );
}
