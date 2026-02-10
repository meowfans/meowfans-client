'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@workspace/ui/components/card';
import { cn } from '@workspace/ui/lib/utils';
import { motion } from 'framer-motion';
import { Book, Mail } from 'lucide-react';

export function SupportQuickActions() {
  const items = [
    { title: 'Knowledge Base', icon: Book, desc: 'Browse detailed guides', color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { title: 'Email Us', icon: Mail, desc: 'Get localized help', color: 'text-purple-500', bg: 'bg-purple-500/10' }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto w-full">
      {items.map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
        >
          <Card className="border-none bg-secondary/10 hover:bg-secondary/20 transition-all cursor-pointer group">
            <CardHeader className="flex flex-col items-center text-center gap-2 pb-2">
              <div
                className={cn(
                  'h-12 w-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 duration-300',
                  item.bg
                )}
              >
                <item.icon className={cn('h-6 w-6', item.color)} />
              </div>
              <CardTitle className="font-bold text-lg">{item.title}</CardTitle>
            </CardHeader>
            <CardContent className="text-center pb-6">
              <p className="text-muted-foreground text-sm font-medium">{item.desc}</p>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
