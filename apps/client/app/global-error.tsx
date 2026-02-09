'use client';

import { Button } from '@workspace/ui/components/button';
import { Card } from '@workspace/ui/components/card';
import { AnimatedLogo } from '@workspace/ui/globals/AnimatedLogo';
import { AlertCircle, Home } from 'lucide-react';
import Link from 'next/link';

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html>
      <body>
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
                <AlertCircle className="h-8 w-8 sm:h-10 sm:w-10 text-destructive" />
              </div>
            </div>

            {/* Title */}
            <div className="space-y-3">
              <h1 className="text-3xl sm:text-4xl md:text-5xl ">System Maintenance</h1>
              <p className="text-sm sm:text-base text-muted-foreground font-medium max-w-md mx-auto">
                We&rsquo;re currently performing essential maintenance. We&rsquo;ll be back online shortly. Thank you for your patience.
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
              <Button asChild size="lg" className="rounded-full font-black uppercase tracking-widest gap-2 shadow-lg shadow-primary/20">
                <Link href="/dashboard">
                  <Home className="h-4 w-4" />
                  Return Home
                </Link>
              </Button>
            </div>

            {/* Support Info */}
            <div className="pt-8 border-t border-border/50">
              <p className="text-xs text-muted-foreground/60 font-medium">Need immediate assistance? Contact support@meowfans.com</p>
            </div>
          </Card>
        </div>
      </body>
    </html>
  );
}
