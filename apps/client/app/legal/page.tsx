'use client';

import { motion } from 'framer-motion';
import { ChevronRight, FileText, HelpCircle, Scale, ScrollText, ShieldCheck, Sparkles, Users } from 'lucide-react';
import Link from 'next/link';

export default function LegalIndexPage() {
  const sections = [
    { title: 'Terms of Service', href: '/legal/terms', icon: ScrollText, description: 'Standard platform usage terms' },
    { title: 'Privacy Policy', href: '/legal/privacy', icon: ShieldCheck, description: 'How we handle your data' },
    { title: 'Fan Terms', href: '/legal/fan-terms', icon: Users, description: 'Rules for subscribers and fans' },
    { title: 'Creator Terms', href: '/legal/creator-terms', icon: Sparkles, description: 'Rules for content producers' },
    { title: '2257 Compliance', href: '/legal/2257', icon: Scale, description: 'Regulatory record-keeping' },
    { title: 'General Terms', href: '/legal/general-terms', icon: FileText, description: 'Global network conditions' },
    { title: 'FAQ', href: '/legal/faq', icon: HelpCircle, description: 'Commonly asked questions' }
  ];

  return (
    <div className="flex flex-1 flex-col bg-background min-h-screen p-6 md:p-12 lg:p-20">
      <div className="max-w-4xl mx-auto w-full space-y-12">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-black tracking-tight uppercase italic bg-gradient-to-r from-foreground to-foreground/50 bg-clip-text text-transparent">
            Legal Center
          </h1>
          <p className="text-muted-foreground text-sm md:text-base uppercase tracking-[0.2em] font-medium">
            Essential information and platform regulations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {sections.map((section, i) => (
            <motion.div key={section.href} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <Link href={section.href}>
                <div className="group p-6 rounded-[2rem] bg-secondary/15 border border-white/5 hover:bg-secondary/25 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/5 flex items-center justify-between">
                  <div className="flex items-center gap-5">
                    <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20 group-hover:scale-110 transition-transform">
                      <section.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-black uppercase italic tracking-tight group-hover:text-primary transition-colors">
                        {section.title}
                      </h3>
                      <p className="text-[10px] uppercase font-bold text-muted-foreground/50 tracking-widest mt-0.5">
                        {section.description}
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground/20 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
