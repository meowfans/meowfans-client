import { cn } from '@workspace/ui/lib/utils';
import type { LucideIcon } from 'lucide-react';

interface Props {
  title: string;
  description?: string;
  icon?: LucideIcon;
  badge?: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
}

export const SectionHeader: React.FC<Props> = ({ title, description, icon: Icon, badge, actions, className }) => {
  return (
    <div className={cn('flex flex-col gap-4 md:flex-row md:items-start md:justify-between', className)}>
      <div className="flex min-w-0 items-start gap-3">
        {Icon ? (
          <div className="rounded-lg border bg-background/70 p-2 backdrop-blur">
            <Icon className="h-4 w-4" />
          </div>
        ) : null}

        <div className="min-w-0 space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">{title}</h1>
            {badge}
          </div>

          {description ? <p className="max-w-xl text-sm text-muted-foreground">{description}</p> : null}
        </div>
      </div>

      {actions ? <div className="flex flex-wrap items-center gap-2">{actions}</div> : null}
    </div>
  );
};
