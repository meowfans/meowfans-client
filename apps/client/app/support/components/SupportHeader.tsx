'use client';

import { motion } from 'framer-motion';
import { LifeBuoy } from 'lucide-react';

export function SupportHeader() {
  return (
    <div className="text-center space-y-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex justify-center"
      >
        <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20 mb-4">
          <LifeBuoy className="h-8 w-8 text-primary" />
        </div>
      </motion.div>
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="text-4xl md:text-5xl"
      >
        Help & Support
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-muted-foreground text-lg max-w-2xl mx-auto"
      >
        Have questions? We&apos;re here to help. Search our knowledge base or get in touch with our support team.
      </motion.p>
    </div>
  );
}
