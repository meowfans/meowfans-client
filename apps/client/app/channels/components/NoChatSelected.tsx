'use client';

import { motion } from 'framer-motion';
import { MessageSquare, Shield, Zap } from 'lucide-react';

export function NoChatSelected() {
  return (
    <div className="border-l flex h-full w-full flex-col items-center justify-center bg-background/30 backdrop-blur-3xl p-6 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-md space-y-8"
      >
        <div className="relative mx-auto w-24 h-24">
          <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl animate-pulse" />
          <div className="relative flex items-center justify-center w-24 h-24 rounded-full bg-secondary/50 border border-border/50 backdrop-blur-xl">
            <MessageSquare className="w-10 h-10 text-primary" />
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-black tracking-tight">Select a conversation</h2>
          <p className="text-muted-foreground/60 text-sm font-medium leading-relaxed">
            Choose a creator from the left to start a conversation, or browse your existing chats.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4 pt-4">
          {[
            { icon: Shield, label: 'Secure' },
            { icon: Zap, label: 'Fast' },
            { icon: MessageSquare, label: 'Direct' }
          ].map((item, idx) => (
            <div key={idx} className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-secondary/20 border border-border/5">
              <item.icon className="w-4 h-4 text-primary/50" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/40">{item.label}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
