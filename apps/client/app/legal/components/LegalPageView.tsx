'use client';

import { Button } from '@workspace/ui/components/button';
import { motion } from 'framer-motion';
import { ChevronLeft, FileText } from 'lucide-react';
import Link from 'next/link';
import { ReactNode } from 'react';

interface LegalPageViewProps {
  title: string;
  lastUpdated?: string;
  icon?: any;
  children: ReactNode;
}

export function LegalPageView({ title, lastUpdated, icon: Icon = FileText, children }: LegalPageViewProps) {
  return (
    <div className="flex flex-1 flex-col bg-background min-h-screen">
      {/* Decorative Header */}
      <div className="relative overflow-hidden bg-secondary/10 py-12 md:py-20 border-b border-white/5">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-64 h-64 bg-purple-500/10 rounded-full blur-[100px]" />

        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors mb-8 group"
          >
            <ChevronLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Back to Dashboard
          </Link>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-4">
              <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20 shadow-2xl shadow-primary/10">
                <Icon className="h-7 w-7 text-primary" />
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight uppercase italic bg-gradient-to-r from-foreground to-foreground/50 bg-clip-text text-transparent">
                {title}
              </h1>
              {lastUpdated && (
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/60 flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  Last Updated: {lastUpdated}
                </p>
              )}
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                className="rounded-full px-6 font-black uppercase text-[10px] tracking-widest border-white/10 hover:bg-white/5"
                onClick={() => window.print()}
              >
                Print Version
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="max-w-4xl mx-auto px-6 py-12 md:py-20 w-full mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="prose prose-invert prose-headings:uppercase prose-headings:italic prose-headings:font-black prose-p:text-muted-foreground prose-p:leading-relaxed prose-strong:text-foreground prose-strong:font-black"
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
}
