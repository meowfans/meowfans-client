'use client';

import { formatText } from '../lib';

interface StatItemProps {
  icon?: React.ReactNode;
  value: number;
  label: string;
}

export const StatItem = ({ icon, value, label }: StatItemProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-1 p-1 text-center">
      {icon && <div className="p-2 bg-muted/30 rounded-full">{icon}</div>}
      <span className="text-sm font-semibold">{value}</span>
      <span className="text-[10px] text-muted-foreground uppercase tracking-wide">{formatText(value, label)}</span>
    </div>
  );
};
