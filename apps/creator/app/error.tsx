'use client';

import { Button } from '@workspace/ui/components/button';
import { Card } from '@workspace/ui/components/card';
import { AnimatedLogo } from '@workspace/ui/globals/AnimatedLogo';
import { AlertTriangle, Home, RefreshCw } from 'lucide-react';
import { useEffect } from 'react';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(var(--primary-rgb,255,145,77),0.05),_transparent_70%)]" />

      <Card className="relative z-10 max-w-2xl w-full p-8 sm:p-12 text-center space-y-8 border-none bg-card/50 backdrop-blur-xl shadow-2xl">
        {/* Logo */}
        <div className="flex justify-center">
          <AnimatedLogo className="h-24 w-24 sm:h-32 sm:w-32" loop={false} />
        </div>

        {/* Error Icon */}
        <div className="flex justify-center">
          <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-full bg-destructive/10 flex items-center justify-center">
            <AlertTriangle className="h-8 w-8 sm:h-10 sm:w-10 text-destructive" />
          </div>
        </div>

        {/* Title */}
        <div className="space-y-3">
          <h1 className="text-3xl sm:text-4xl md:text-5xl ">Maintenance Break</h1>
          <p className="text-sm sm:text-base text-muted-foreground font-medium max-w-md mx-auto">
            We&apos;re experiencing some technical difficulties. Our team has been notified and we&apos;re working to fix this as quickly as
            possible.
          </p>
        </div>

        {/* Error Details (Development Only) */}
        {process.env.NEXT_PUBLIC_NODE_ENV === 'development' && (
          <Card className="p-4 bg-muted/50 text-left">
            <p className="text-xs font-mono text-muted-foreground break-all">{error.message}</p>
          </Card>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
          <Button onClick={reset} size="lg" className="rounded-full font-black uppercase tracking-widest gap-2 shadow-lg shadow-primary/20">
            <RefreshCw className="h-4 w-4" />
            Try Again
          </Button>
          <Button
            onClick={() => (window.location.href = '/dashboard')}
            variant="outline"
            size="lg"
            className="rounded-full font-black uppercase tracking-widest gap-2"
          >
            <Home className="h-4 w-4" />
            Go Home
          </Button>
        </div>

        {/* Support Info */}
        <div className="pt-8 border-t border-border/50">
          <p className="text-xs text-muted-foreground/60 font-medium">If this problem persists, please contact our support team</p>
        </div>
      </Card>
    </div>
  );
}
