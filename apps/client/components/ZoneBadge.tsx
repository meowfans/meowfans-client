'use client';

import { useFan } from '@/hooks/context/UserContextWrapper';
import { ZoneTypes } from '@workspace/gql/generated/graphql';
import { Badge } from '@workspace/ui/components/badge';
import { Calendar, Crown, DollarSign, FerrisWheel, Trophy, Zap } from 'lucide-react';

type ExtendedZoneTypes = ZoneTypes | 'Free';

const styles: Record<ExtendedZoneTypes, { className: string; icon: React.ReactNode }> = {
  Onetime: {
    className: 'bg-yellow-100 text-yellow-800 border-yellow-300 dark:bg-yellow-900/30 dark:text-yellow-300',
    icon: <Zap className="h-4 w-4" />
  },
  Monthly: {
    className: 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-900/30 dark:text-blue-300',
    icon: <Calendar className="h-4 w-4" />
  },
  Quarterly: {
    className: 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-900/30 dark:text-amber-300',
    icon: <Trophy className="h-4 w-4" />
  },
  Yearly: {
    className: 'bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-900/30 dark:text-purple-300',
    icon: <Crown className="h-4 w-4" />
  },
  Free: {
    className: 'bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-900/30 dark:text-purple-300',
    icon: <FerrisWheel className="h-4 w-4" />
  }
};

export const ZoneBadge = () => {
  const { fan } = useFan();
  const type = fan?.currentZone?.zoneType || 'Free';

  if (!type)
    return (
      <Badge>
        <DollarSign />
      </Badge>
    );

  const { className, icon } = styles[type];

  return (
    <Badge variant="secondary" className={`flex items-center gap-1 px-2.5 py-1 rounded-full font-medium border ${className}`}>
      {icon}
      {type}
    </Badge>
  );
};
