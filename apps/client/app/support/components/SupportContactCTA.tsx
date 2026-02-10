'use client';

import { Button } from '@workspace/ui/components/button';
import { motion } from 'framer-motion';

export function SupportContactCTA() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.5 }}
      className="bg-primary/5 rounded-[2rem] border border-primary/10 p-8 md:p-12 text-center space-y-6 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 p-32 bg-primary/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 p-32 bg-primary/20 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="relative z-10 space-y-4">
        <h2 className="text-3xl">Still need help?</h2>
        <p className="text-muted-foreground max-w-xl mx-auto font-medium">
          Our support team is available 24/7 to assist you with any issues you may have. Don&apos;t hesitate to reach out!
        </p>
        <Button
          size="lg"
          className="rounded-full px-8 font-black uppercase tracking-widest bg-primary text-white shadow-lg shadow-primary/25 hover:scale-105 transition-transform h-14"
        >
          Contact Support
        </Button>
      </div>
    </motion.div>
  );
}
