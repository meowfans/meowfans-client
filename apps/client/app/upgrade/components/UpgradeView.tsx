'use client';

import { useZones } from '@/hooks/useZones';
import { Button } from '@workspace/ui/components/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@workspace/ui/components/card';
import { Separator } from '@workspace/ui/components/separator';
import { Loading } from '@workspace/ui/globals/Loading';
import { cn } from '@workspace/ui/lib/utils';
import { motion } from 'framer-motion';
import { Check, Crown, Sparkles, Zap } from 'lucide-react';

export function UpgradeView() {
  const { zonePlans, loading } = useZones();

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background/50 backdrop-blur-xl">
        <Loading />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex flex-col items-center justify-center p-4 py-20 md:p-8">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/20 rounded-full blur-[120px] opacity-40 animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-500/20 rounded-full blur-[120px] opacity-40 animate-pulse delay-700" />
      </div>

      <div className="relative z-10 max-w-5xl w-full text-center space-y-12">
        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="badge inline-flex items-center justify-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-200/20 to-yellow-400/20 border border-amber-200/30 text-amber-300 text-xs mb-4"
          >
            <Crown className="h-4 w-4 fill-amber-300" />
            Upgrade Your Experience
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-4xl md:text-6xl text-foreground"
          >
            Unlock Full Potential
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed"
          >
            Choose a plan that suits your needs and get access to exclusive content, features, and benefits.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch justify-center">
          {zonePlans.map((planData, index) => {
            const plan = planData;
            const type = plan.zoneType;
            const price = plan.unlockPrice;
            const isOneTime = type === 'Onetime';
            const isYearly = type === 'Yearly';
            const isBestValue = isYearly;

            let name = 'Pro Monthly';
            let description = 'Flexible monthly access';
            let period = '/mo';

            if (isOneTime) {
              name = 'Ad-Free Access';
              description = 'Remove ads forever';
              period = '/one-time';
            } else if (isYearly) {
              name = 'Pro Annual';
              description = 'Best value for year-round access';
              period = '/yr';
            }

            const features = isOneTime
              ? ['No advertisements', 'Support content creators', 'One-time payment']
              : isYearly
                ? ['All Monthly features', 'Save significantly', 'Priority support', 'Exclusive badge', 'Full content access']
                : ['Access to premium content', 'HD video streaming', 'Cancel anytime', 'Standard support'];

            return (
              <motion.div
                key={plan.id || index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                className={cn(isBestValue ? 'lg:-mt-8' : '')}
              >
                <Card
                  className={cn(
                    'h-full border-none relative overflow-hidden flex flex-col bg-secondary/10 backdrop-blur-md rounded-[2.5rem] transition-all duration-300 hover:scale-[1.02]',
                    isBestValue ? 'ring-2 ring-primary bg-secondary/20 shadow-2xl shadow-primary/10' : 'hover:bg-secondary/20',
                    isOneTime ? 'ring-1 ring-purple-500/50' : ''
                  )}
                >
                  {isBestValue && <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-primary via-purple-500 to-primary" />}
                  {isOneTime && (
                    <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500" />
                  )}

                  <CardHeader className="text-center pb-2 pt-10">
                    {isBestValue && (
                      <div className="absolute top-6 right-6">
                        <span className="flex items-center justify-center p-2 rounded-full bg-primary/20 text-primary animate-spin-slow">
                          <Sparkles className="h-5 w-5" />
                        </span>
                      </div>
                    )}
                    <CardTitle className="text-2xl flex items-center justify-center gap-2">
                      {isBestValue && <Zap className="h-6 w-6 text-primary fill-primary" />}
                      {isOneTime && <Crown className="h-6 w-6 text-purple-500 fill-purple-500" />}
                      {name}
                    </CardTitle>
                    <CardDescription className="text-muted-foreground font-medium text-sm pt-2 uppercase tracking-widest">
                      {description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="flex-1 flex flex-col items-center gap-6 py-8">
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-5xl font-black tracking-tighter">${price}</span>
                      <span className="text-muted-foreground font-bold text-sm uppercase">{period}</span>
                    </div>

                    <Separator className="w-1/2 bg-white/5" />

                    <ul className="space-y-4 text-left w-full px-4">
                      {features.map((feature: string, i: number) => (
                        <li key={i} className="flex items-start gap-3 text-sm font-medium text-muted-foreground/90">
                          <div
                            className={cn(
                              'mt-0.5 rounded-full p-0.5',
                              isBestValue ? 'bg-primary/20' : isOneTime ? 'bg-purple-500/20' : 'bg-white/10'
                            )}
                          >
                            <Check
                              className={cn(
                                'h-3 w-3',
                                isBestValue ? 'text-primary' : isOneTime ? 'text-purple-500' : 'text-muted-foreground'
                              )}
                            />
                          </div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>

                  <CardFooter className="pb-10 px-8">
                    <Button
                      className={cn(
                        'w-full h-14 rounded-2xl font-black uppercase tracking-widest text-sm transition-all hover:scale-[1.02] shadow-xl',
                        isBestValue
                          ? 'bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-white shadow-primary/25'
                          : 'bg-secondary hover:bg-secondary/80 text-foreground'
                      )}
                      onClick={() => {
                        console.log('Subscribe to', plan);
                      }}
                    >
                      {isBestValue ? 'Get Pro Access' : isOneTime ? 'Buy Once' : 'Choose Plan'}
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            );
          })}

          {zonePlans.length === 0 && !loading && (
            <div className="col-span-full py-20 text-center text-muted-foreground">
              <p>No subscription plans available at the moment.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
