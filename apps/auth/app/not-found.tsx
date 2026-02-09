'use client';

import { AuthVisual } from '@/components/AuthVisual';
import { Button } from '@workspace/ui/components/button';
import { Logo } from '@workspace/ui/globals/Logo';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background text-foreground">
      <div className="absolute inset-0 opacity-20">
        <AuthVisual />
      </div>

      <div className="absolute left-4 top-4 md:left-8 md:top-8 z-50 flex items-center gap-2">
        <Logo className="h-8 w-8" />
        <span className="text-lg font-bold tracking-tight">MeowFans</span>
      </div>

      <div className="z-10 container mx-auto flex flex-col items-center justify-center px-4 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="space-y-6">
          <div className="relative">
            <h1 className="text-[150px] font-black leading-none tracking-tighter sm:text-[200px] text-transparent bg-clip-text bg-gradient-to-b from-foreground to-foreground/20">
              404
            </h1>
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-primary/10 blur-3xl rounded-full w-64 h-64"
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Page not found</h2>
            <p className="text-muted-foreground max-w-[600px] mx-auto text-lg">
              Sorry, we couldn't find the page you're looking for. It might have been moved, deleted, or never existed.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button asChild size="lg" className="group">
              <Link href="/login">
                <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                Go Back
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-8 text-xs text-muted-foreground">
        &copy;2025-{new Date().getFullYear()} MeowFans. All rights reserved.
      </div>
    </div>
  );
}
