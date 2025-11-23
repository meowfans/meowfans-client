'use client';

import { redirectToAuthApp } from '@/util/helpers';
import { CornerDownRight, Globe2, ShieldCheck, Sparkles, Star } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';
import ComingSoonWrapper from './ComingSoon';
import { Button } from '@workspace/ui/components/button';
import { toast } from 'sonner';

const whyPayViewContents = [
  { icon: <ShieldCheck className="size-8 text-green-600" />, key: 'Secure &Fair:', value: 'Only pay for what you view.' as const },
  {
    icon: <Sparkles className="size-8 text-purple-600" />,
    key: 'For Creators:',
    value: 'Upload, set your price & earn directly.' as const
  },
  { icon: <Star className="size-8 text-yellow-500" />, key: 'For Viewers:', value: 'Quick checkout, instant image unlock.' as const },
  { icon: <Globe2 className="size-8 text-blue-600" />, key: 'Global Platform:', value: 'Creators & collectors in one place.' as const }
];
const howItWorksContents = [
  'Browse → Discover thousands of exclusive images.',
  'Preview → View watermarked previews for free.',
  'Unlock → Pay securely and get instant full-quality access.',
  'Own the Moment → Save your unlocked images forever.'
];
interface Props {
  highLightedId: string | null;
  divRefs: React.RefObject<Record<string, HTMLDivElement | null>>;
}
const ExplorePageContent: React.FC<Props> = ({ highLightedId, divRefs }) => {
  const router = useRouter();
  return (
    <div className="flex flex-col space-y-12 p-6 md:p-12 mt-10 md:mt-0 w-full">
      <div className="flex flex-col space-y-3">
        <div className="flex flex-row justify-between items-center content-center ">
          {/* HEADER BANNER */}
          <div className="flex flex-col text-center md:text-left  bg-linear-to-r from-blue-600 to-sky-400 rounded-2xl">
            <p className="font-extrabold text-7xl md:text-9xl animate-pulse text-amber-50 drop-shadow-[0_0_10px_#00f] ">START</p>
            <p className="font-extrabold text-6xl md:text-8xl animate-pulse text-amber-100 drop-shadow-[0_0_10px_#00f]">CREATING</p>
            <p className="font-extrabold text-7xl md:text-9xl animate-pulse text-amber-200 drop-shadow-[0_0_10px_#00f]">WITH</p>
            <p className="font-extrabold text-7xl md:text-9xl animate-pulse text-amber-500 drop-shadow-[0_0_10px_#00f]">MEOW</p>
            <div className="font-bold shadow-accent-foreground md:hidden">
              <Button
                variant={'outline'}
                className="shadow accent-accent-foreground bg-linear-to-r from-blue-600 to-sky-400 "
                onClick={() => toast.success('This feature is not yet enabled!')}
              >
                BECOME A CREATOR
              </Button>
            </div>
            <div className="flex justify-center md:justify-start space-x-4 mt-6">
              <Button size="lg" className="shadow-accent-foreground" onClick={() => toast.success('This feature is not yet enabled!')}>
                🚀 Get Started
              </Button>
              <Button variant="outline" className="shadow-accent-foreground" size="lg" onClick={() => router.push('/dashboard')}>
                Explore Images
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* HERO SECTION */}
      <div className="text-center space-y-3">
        <h2 className="font-extrabold text-4xl">Unlock Premium Images with One Click</h2>
        <p className="text-lg text-gray-600">Browse. Preview for free. Pay only when you want full access.</p>
      </div>

      {/* HOW IT WORKS */}
      <div
        ref={(el: HTMLDivElement | null) => {
          divRefs.current['1'] = el;
        }}
        className={`space-y-6 rounded-xl bg-accent hover:scale-105 transition-transform p-8`}
        id="1"
      >
        <h3 className="font-extrabold text-4xl">How It Works?</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {howItWorksContents.map((content, idx) => (
            <div key={idx} className="flex items-start space-x-2">
              <CornerDownRight className="size-10 text-amber-500" />
              <p className="font-medium">{content}</p>
            </div>
          ))}
        </div>
      </div>

      {/* WHY PAYVIEW */}
      <div
        ref={(el: HTMLDivElement | null) => {
          divRefs.current['2'] = el;
        }}
        className={`space-y-6 bg-gray-50 dark:bg-gray-700 rounded-2xl hover:scale-105 transition-transform p-8`}
        id="2"
      >
        <h3 className="font-extrabold text-4xl text-center">Why PayView?</h3>
        <div className="grid md:grid-cols-2 gap-6">
          {whyPayViewContents.map((content, idx) => (
            <div key={idx} className="flex items-start space-x-3">
              {content.icon}
              <p>
                <span className="font-semibold">{content.key}</span> {content.value}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CREATOR SECTION */}
      <ComingSoonWrapper>
        <div
          ref={(el: HTMLDivElement | null) => {
            divRefs.current['3'] = el;
          }}
          className={`text-center bg-amber-50 dark:bg-gray-600 rounded-2xl p-8 hover:scale-105 transition-transform shadow-lg ${
            highLightedId === '3' ? 'bg-indigo-50' : 'bg-accent'
          }`}
          id="3"
        >
          <h3 className="font-extrabold text-4xl mb-3">For Creators</h3>
          <p className="text-lg mb-6">
            Start creating with us. Upload your best work, set your price, and get paid every time someone views your image.
          </p>
          <Button size="lg" onClick={() => router.push(redirectToAuthApp({ pathname: '/creator-signup' }))}>
            🎨 Become a Creator
          </Button>
        </div>
      </ComingSoonWrapper>

      {/* VIEWER SECTION */}
      <div
        ref={(el: HTMLDivElement | null) => {
          divRefs.current['4'] = el;
        }}
        className={`text-center bg-indigo-50 dark:bg-gray-500 rounded-2xl p-8 shadow-lg hover:scale-105 transition-transform ${
          highLightedId === '4' ? 'bg-indigo-50' : 'bg-accent'
        }`}
        id="4"
      >
        <h3 className="font-extrabold text-4xl mb-3">For Viewers</h3>
        <p className="text-lg mb-6">Stop paying for subscriptions you don&apos;t use. Pay only for the images you love.</p>
        <Button variant="default" size="lg">
          🔎 Start Exploring
        </Button>
      </div>

      {/* TESTIMONIALS */}
      <div
        ref={(el: HTMLDivElement | null) => {
          divRefs.current['5'] = el;
        }}
        className={`space-y-6 rounded-2xl p-8 hover:scale-105 transition-transform ${highLightedId === '5' ? 'bg-indigo-50' : 'bg-accent'}`}
        id="5"
      >
        <h3 className="font-extrabold text-4xl text-center">What People Say</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 rounded-xl shadow bg-white dark:bg-gray-400 border">
            ⭐⭐⭐⭐⭐
            <p>“Finally a platform where creators are valued, and viewers get control. I doubled my earnings in 3 months.”</p>
            <p className="font-semibold mt-2">— John, Photographer</p>
          </div>
          <div className="p-6 rounded-xl shadow bg-white dark:bg-gray-400 border">
            ⭐⭐⭐⭐⭐
            <p>“The pay-per-view model is genius. I only pay for the images I need — no wasted subscriptions.”</p>
            <p className="font-semibold mt-2">— Chris, Designer</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExplorePageContent;
