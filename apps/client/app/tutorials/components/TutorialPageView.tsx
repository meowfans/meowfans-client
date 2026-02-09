'use client';

import { BlurImage } from '@/components/BlurImage';
import { Badge } from '@workspace/ui/components/badge';
import { Button } from '@workspace/ui/components/button';
import { motion } from 'framer-motion';
import { ChevronLeft, Clock, Play, Share2 } from 'lucide-react';
import Link from 'next/link';
import { ReactNode } from 'react';

interface TutorialPageViewProps {
  title: string;
  category: string;
  duration: string;
  level: string;
  image: string;
  children: ReactNode;
}

export function TutorialPageView({ title, category, duration, level, image, children }: TutorialPageViewProps) {
  return (
    <div className="flex flex-1 flex-col bg-background min-h-screen">
      {/* Tutorial Header */}
      <div className="relative overflow-hidden bg-secondary/10 pt-12 pb-20 border-b border-white/5">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-64 h-64 bg-purple-500/10 rounded-full blur-[100px]" />

        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <Link
            href="/tutorials"
            className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors mb-8 group"
          >
            <ChevronLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Back to Academy
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <Badge className="bg-primary/10 text-primary border-primary/20 font-black uppercase text-[10px] tracking-widest px-4 py-1.5 rounded-full">
                  {category}
                </Badge>
                <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">
                  <div className="flex items-center gap-2">
                    <Clock className="h-3 w-3" />
                    {duration}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-1 w-1 rounded-full bg-muted-foreground/30" />
                    {level}
                  </div>
                </div>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight uppercase italic bg-gradient-to-r from-foreground to-foreground/50 bg-clip-text text-transparent leading-[1.1]">
                {title}
              </h1>

              <div className="flex items-center gap-4 pt-4">
                <Button className="rounded-full bg-primary text-white font-black uppercase text-[10px] tracking-widest h-12 px-8 shadow-lg shadow-primary/20">
                  <Play className="h-4 w-4 mr-2 fill-white" /> Watch Video
                </Button>
                <Button variant="outline" size="icon" className="rounded-full border-white/10 text-foreground h-12 w-12">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative aspect-video rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl group cursor-pointer"
            >
              <BlurImage
                src={image}
                alt={title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <div className="h-20 w-20 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center transform group-hover:scale-110 transition-transform">
                  <Play className="h-8 w-8 text-white fill-white" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Tutorial Content */}
      <div className="max-w-4xl mx-auto px-6 py-16 md:py-24 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="prose prose-invert prose-headings:uppercase prose-headings:italic prose-headings:font-black prose-p:text-muted-foreground prose-p:leading-relaxed prose-strong:text-foreground prose-strong:font-black prose-img:rounded-[2rem] max-w-none"
        >
          {children}
        </motion.div>

        {/* Footer Navigation */}
        <div className="mt-24 pt-12 border-t border-white/5 flex flex-col items-center text-center space-y-6">
          <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">Finished this tutorial?</p>
          <Link href="/tutorials">
            <Button
              variant="outline"
              className="rounded-full border-white/10 text-foreground font-black uppercase text-[10px] tracking-widest h-14 px-12 hover:bg-white/5"
            >
              Explore More Tutorials
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
