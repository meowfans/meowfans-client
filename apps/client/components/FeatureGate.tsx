'use client';

import { useFeaturePath } from '@/hooks/client/useFeaturePath';
import { APP_PATHS } from '@/lib/constants/feature-paths';
import { Button } from '@workspace/ui/components/button';
import { Card } from '@workspace/ui/components/card';
import { ArrowLeft, Construction, Home } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

interface FeatureGateProps {
  children: React.ReactNode;
}

export function FeatureGate({ children }: FeatureGateProps) {
  const { isEnabled, pathname, router } = useFeaturePath();

  if (!isEnabled) {
    return (
      <div className="flex flex-1 items-center justify-center p-6 min-h-[70vh]">
        <Card className="max-w-md w-full p-8 text-center space-y-6 border-primary/10 bg-card/50 backdrop-blur-xl shadow-2xl shadow-primary/5 animate-in fade-in zoom-in duration-500">
          <div className="mx-auto w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
            <Construction className="h-10 w-10 text-primary animate-pulse" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-black italic uppercase tracking-tight text-foreground">Under Construction</h2>
            <p className="text-muted-foreground text-sm font-medium">
              We&apos;re currently fine-tuning this page to give you the best experience. API integration for{' '}
              <span className="text-primary font-bold">@{pathname.split('/')[1]}</span> is in progress.
            </p>
          </div>

          <div className="flex flex-col gap-3 pt-4">
            <Button asChild className="w-full h-12  shadow-lg shadow-primary/20">
              <Link href={APP_PATHS.HOME}>
                <Home className="mr-2 h-4 w-4" />
                Back to Dashboard
              </Link>
            </Button>

            <Button
              variant="ghost"
              onClick={() => router.back()}
              className="w-full h-12 font-bold uppercase tracking-widest text-xs hover:bg-primary/5"
            >
              <ArrowLeft className="mr-2 h-3 w-3" />
              Go Back
            </Button>
          </div>

          <p className="text-[10px] text-muted-foreground/50 uppercase font-bold tracking-[0.2em]">MeowFans Alpha Build</p>
        </Card>
      </div>
    );
  }

  return <>{children}</>;
}
