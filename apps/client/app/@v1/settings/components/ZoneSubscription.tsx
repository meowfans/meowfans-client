'use client';

import { ZoneBadge } from '@/components/ZoneBadge';
import { useFan } from '@/hooks/context/UserContextWrapper';
import { useZonesStore } from '@/hooks/store/zones.store';
import { Button } from '@workspace/ui/components/button';
import { Card, CardContent, CardHeader, CardTitle } from '@workspace/ui/components/card';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import { AlarmClock, Calendar, Gem } from 'lucide-react';

export const ZoneSubscription = () => {
  const { fan } = useFan();
  const { setOpenZone } = useZonesStore();
  const subscribedZone = fan?.currentZone;

  if (!subscribedZone)
    return (
      <Card className="p-6 rounded-2xl shadow-lg border border-border/50">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">No Active Zone</CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground text-sm">You haven’t subscribed to any zones yet.</CardContent>
      </Card>
    );

  const { zoneType, startedAt, endsAt } = subscribedZone;

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
      <Card className="rounded-2xl border border-border/40 shadow-xl bg-linear-to-br from-background to-muted/30 backdrop-blur-md hover:shadow-2xl transition">
        <CardHeader className="flex flex-row justify-between items-center">
          <div>
            <CardTitle className="text-xl font-semibold flex items-center gap-2">
              <Gem className="h-5 w-5 text-primary" />
              Active Zone
            </CardTitle>
            <ZoneBadge />
          </div>
        </CardHeader>

        <CardContent className="space-y-4 pt-4">
          <div className="flex items-center gap-3 text-sm">
            <Calendar className="h-4 w-4 text-primary" />
            <span>
              Started: <strong>{format(new Date(startedAt), 'dd MMM yyyy, hh:mm a')}</strong>
            </span>
          </div>

          <div className="flex items-center gap-3 text-sm">
            <AlarmClock className="h-4 w-4 text-destructive" />
            <span>
              Ends: <strong>{format(new Date(endsAt), 'dd MMM yyyy, hh:mm a')}</strong>
            </span>
          </div>

          <Button className="w-full mt-4 rounded-xl" variant="default" onClick={() => setOpenZone(true)}>
            Manage Subscription
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};
