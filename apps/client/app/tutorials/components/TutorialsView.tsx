'use client';

import { BlurImage } from '@/components/BlurImage';
import { Badge } from '@workspace/ui/components/badge';
import { Button } from '@workspace/ui/components/button';
import { Card, CardContent } from '@workspace/ui/components/card';
import { Input } from '@workspace/ui/components/input';
import { motion } from 'framer-motion';
import { ChevronRight, Clock, GraduationCap, Play, Search } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { TUTORIALS } from '../constants';

export function TutorialsView() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Basics', 'Discovery', 'Payments', 'Social', 'Security', 'For Creators'];

  const filteredTutorials = TUTORIALS.filter(
    (t) =>
      (activeCategory === 'All' || t.category === activeCategory) &&
      (t.title.toLowerCase().includes(searchTerm.toLowerCase()) || t.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="flex flex-1 flex-col bg-background min-h-screen pb-20">
      {/* Header Section */}
      <div className="relative overflow-hidden bg-secondary/10 py-16 md:py-24 border-b border-white/5">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-64 h-64 bg-purple-500/10 rounded-full blur-[100px]" />

        <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6 mx-auto">
            <GraduationCap className="h-4 w-4 text-primary" />
            <span className="text-[10px] font-black uppercase tracking-widest text-primary">MeowFans Academy</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black tracking-tight uppercase italic bg-gradient-to-r from-foreground to-foreground/50 bg-clip-text text-transparent mb-6">
            Explore Tutorials
          </h1>
          <p className="text-muted-foreground text-sm md:text-lg uppercase tracking-[0.2em] font-medium max-w-2xl mx-auto leading-relaxed">
            Master the platform with our comprehensive guides and video walkthroughs
          </p>
        </div>
      </div>

      {/* Controls Area */}
      <div className="sticky top-0 z-20 bg-background/80 backdrop-blur-xl border-b border-white/5 py-6">
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex flex-col md:flex-row gap-6 items-center justify-between">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 w-full md:w-auto">
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={activeCategory === cat ? 'secondary' : 'ghost'}
                size="sm"
                onClick={() => setActiveCategory(cat)}
                className="rounded-full px-5 text-[10px] font-black uppercase tracking-widest h-9"
              >
                {cat}
              </Button>
            ))}
          </div>

          <div className="relative group w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <Input
              placeholder="Search guides..."
              className="pl-12 h-11 rounded-full border-white/5 bg-secondary/20 focus-visible:ring-primary/20"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Grid Display */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {filteredTutorials.map((tutorial, idx) => (
            <motion.div key={tutorial.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }}>
              <Link href={`/tutorials/${tutorial.slug}`}>
                <Card className="group relative overflow-hidden border-none bg-secondary/10 hover:bg-secondary/20 transition-all duration-500 rounded-[2.5rem] p-0 shadow-none hover:shadow-2xl hover:shadow-primary/5 cursor-pointer h-full">
                  <div className="aspect-[16/10] overflow-hidden relative">
                    <BlurImage
                      src={tutorial.image}
                      alt={tutorial.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="h-16 w-16 rounded-full bg-primary text-white flex items-center justify-center shadow-2xl shadow-primary/40 transform scale-90 group-hover:scale-100 transition-transform">
                        <Play className="h-6 w-6 fill-white" />
                      </div>
                    </div>
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-background/60 backdrop-blur-md border-white/10 text-foreground font-black uppercase text-[8px] tracking-widest px-3 py-1 rounded-full">
                        {tutorial.category}
                      </Badge>
                    </div>
                  </div>

                  <CardContent className="p-8 space-y-4">
                    <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">
                      <div className="flex items-center gap-2">
                        <Clock className="h-3 w-3" />
                        {tutorial.duration}
                      </div>
                      <div className="flex items-center gap-2">
                        <tutorial.icon className="h-3 w-3" />
                        {tutorial.level}
                      </div>
                    </div>

                    <h3 className="text-xl font-black uppercase italic tracking-tight group-hover:text-primary transition-colors leading-tight">
                      {tutorial.title}
                    </h3>

                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">{tutorial.description}</p>

                    <div className="pt-4 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary group-hover:gap-4 transition-all">
                      Start Tutorial <ChevronRight className="h-3 w-3" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        {filteredTutorials.length === 0 && (
          <div className="text-center py-24">
            <Search className="h-12 w-12 text-muted-foreground/20 mx-auto mb-6" />
            <h2 className="text-2xl font-black uppercase italic italic">No tutorials found</h2>
            <p className="text-muted-foreground uppercase tracking-widest text-xs mt-2">Try adjusting your filters or search term</p>
          </div>
        )}
      </div>

      {/* Help Section */}
      <div className="max-w-4xl mx-auto px-6 md:px-10 py-20 text-center">
        <div className="p-12 rounded-[3rem] bg-secondary/15 border border-white/5 space-y-6">
          <h2 className="text-3xl font-black uppercase italic">Need More Help?</h2>
          <p className="text-muted-foreground uppercase tracking-widest text-sm font-medium">
            Join our community forum or contact our support experts available 24/7.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button className="rounded-full bg-primary text-white font-black uppercase text-[10px] tracking-widest h-12 px-10 shadow-lg shadow-primary/20">
              Contact Support
            </Button>
            <Button
              variant="outline"
              className="rounded-full border-white/10 text-foreground font-black uppercase text-[10px] tracking-widest h-12 px-10"
            >
              Community Forum
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
