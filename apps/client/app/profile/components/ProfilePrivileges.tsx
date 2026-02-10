import { useFan } from '@/hooks/context/UserContextWrapper';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@workspace/ui/components/card';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

export const ProfilePrivileges = () => {
  const { fan } = useFan();
  return (
    <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
        <Card className="border-none bg-secondary/10 shadow-xl shadow-primary/5 backdrop-blur-md ring-1 ring-white/5 h-full rounded-[2rem] flex flex-col">
          <CardHeader className="px-8 pt-8 text-center md:text-left">
            <CardTitle className="text-xl font-bold">Fan Status</CardTitle>
            <CardDescription>Verified account privileges.</CardDescription>
          </CardHeader>
          <CardContent className="px-8 pb-8 flex-1 flex flex-col justify-center gap-6">
            <div className="p-6 rounded-[1.5rem] bg-primary/10 border border-primary/20 flex items-start gap-4 transition-transform hover:scale-[1.02] duration-300">
              <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0 shadow-inner">
                <Check className="h-5 w-5 text-primary" />
              </div>
              <div className="space-y-1.5">
                <h4 className="text-base font-bold text-foreground">Active Subscription Access</h4>
                <p className="text-xs text-muted-foreground leading-relaxed font-medium">
                  You are eligible to subscribe to premium creators, unlock exclusive vaults, and engage in direct messaging.
                </p>
              </div>
            </div>

            <div className="text-center px-4">
              <p className="text-[10px] md:text-xs text-muted-foreground font-medium uppercase tracking-[0.2em] opacity-40">
                MeowFans Member Since {new Date(fan?.appliedAt).getFullYear()}
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};
