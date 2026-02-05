'use client';

import { useUtilsStore } from '@/hooks/store/utils.store';
import { configService } from '@/util/config';
import { CreatorApprovalStatus } from '@workspace/gql/generated/graphql';
import { Button } from '@workspace/ui/components/button';
import { cn } from '@workspace/ui/lib/utils';
import { CheckCircle2, Clock, ExternalLink, LogOut, Mail, Search, ShieldAlert, XCircle } from 'lucide-react';
import { CreatorApplicationForm } from './CreatorApplicationForm';
import { LogoutModal } from './modals/LogoutModal';

interface Props {
  status: CreatorApprovalStatus;
}

export const CreatorStatusLayout = ({ status }: Props) => {
  const { setOpenLogoutModal } = useUtilsStore();

  if (status === CreatorApprovalStatus.Review) {
    return <CreatorApplicationForm />;
  }

  const STATUS_CONFIG = {
    [CreatorApprovalStatus.Requested]: {
      icon: Clock,
      title: 'Under Review',
      subtitle: 'Creator Application',
      description:
        'Your submission is currently being processed. We are verifying your profile to ensure compliance with our creator quality standards.',
      details: [
        { icon: Search, label: 'Identity Verification' },
        { icon: CheckCircle2, label: 'Content Audit' },
        { icon: Clock, label: 'ETA: 24-72 Hours' }
      ],
      color: 'text-amber-500',
      bgColor: 'bg-amber-500/10',
      borderColor: 'border-amber-500/20',
      actionLabel: 'Enter as Fan'
    },
    [CreatorApprovalStatus.Rejected]: {
      icon: XCircle,
      title: 'Account Status',
      subtitle: 'Eligibility Notice',
      description:
        'Your creator application was not approved at this time as it does not meet our current eligibility criteria or community guidelines.',
      details: [
        { icon: XCircle, label: 'Requirement Mismatch' },
        { icon: CheckCircle2, label: 'Guidelines Check' },
        { icon: Mail, label: 'Feedback via Email' }
      ],
      color: 'text-rose-500',
      bgColor: 'bg-rose-500/10',
      borderColor: 'border-rose-500/20',
      actionLabel: 'Switch to Fan'
    },
    [CreatorApprovalStatus.Accepted]: {
      icon: ShieldAlert,
      title: 'Active Status',
      subtitle: 'Verified Creator',
      description: 'Your account is verified and fully operational.',
      details: [],
      color: 'text-emerald-500',
      bgColor: 'bg-emerald-500/10',
      borderColor: 'border-emerald-500/20',
      actionLabel: 'Launch Dashboard'
    }
  };

  const config = STATUS_CONFIG[status] || STATUS_CONFIG[CreatorApprovalStatus.Requested];
  const Icon = config.icon;

  const handleGoToFanApp = () => {
    window.location.href = configService.NEXT_PUBLIC_FAN_URL || 'https://meowfans.app';
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center p-6 bg-background selection:bg-primary/20">
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div
          className={cn(
            'absolute top-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full blur-[120px] opacity-20 transition-colors duration-1000',
            status === CreatorApprovalStatus.Rejected ? 'bg-rose-500' : 'bg-amber-500'
          )}
        />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[120px]" />
      </div>

      <div className="w-full max-w-md flex flex-col items-center">
        <div className="flex flex-col items-center text-center space-y-4 mb-8">
          <div
            className={cn(
              'relative p-6 rounded-3xl border transition-all duration-700 animate-in fade-in zoom-in slide-in-from-bottom-8',
              config.bgColor,
              config.borderColor
            )}
          >
            <div className="absolute inset-0 bg-white/5 dark:bg-black/5 rounded-3xl blur-sm -z-1" />
            <Icon className={cn('w-12 h-12 transition-all duration-500', config.color)} strokeWidth={1.5} />
          </div>

          <div className="space-y-1 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
            <p className={cn('text-xs font-semibold tracking-[0.2em] uppercase opacity-70', config.color)}>{config.subtitle}</p>
            <h1 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-linear-to-b from-foreground to-foreground/80">
              {config.title}
            </h1>
          </div>

          <p className="text-muted-foreground text-base leading-relaxed max-w-xs mx-auto animate-in fade-in slide-in-from-bottom-2 duration-700 delay-300">
            {config.description}
          </p>
        </div>

        {config.details.length > 0 && (
          <div className="w-full max-w-xs grid gap-3 mb-8 animate-in fade-in slide-in-from-bottom-2 duration-700 delay-400">
            {config.details.map((detail, idx) => (
              <div key={idx} className="flex items-center gap-3 p-3 rounded-xl bg-muted/20 border border-muted/40">
                <detail.icon className={cn('w-4 h-4', config.color)} />
                <span className="text-xs font-semibold text-foreground/70 uppercase tracking-tight">{detail.label}</span>
              </div>
            ))}
          </div>
        )}

        <div className="flex flex-col gap-2 w-full max-w-xs animate-in fade-in slide-in-from-bottom-2 duration-700 delay-500">
          <Button
            size="lg"
            className="h-14 rounded-xl text-base font-semibold shadow-lg shadow-primary/10 hover:shadow-primary/20 transition-all active:scale-[0.98] group"
            onClick={handleGoToFanApp}
          >
            <ExternalLink className="mr-2 w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            {config.actionLabel}
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="h-12 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground transition-all active:scale-[0.98]"
            onClick={() => setOpenLogoutModal(true)}
          >
            <LogOut className="mr-2 w-4 h-4" />
            Sign Out
          </Button>
        </div>

        <div className="mt-10 flex items-center gap-2 text-[10px] sm:text-xs text-muted-foreground animate-in fade-in duration-1000 delay-700">
          <span className="uppercase tracking-widest opacity-60">Need assistance?</span>
          <a
            href="mailto:support@meowfans.app"
            className="flex items-center gap-1 text-primary hover:underline font-bold decoration-2 underline-offset-4"
          >
            <Mail className="w-3 h-3" />
            Support Desk
          </a>
        </div>
      </div>

      <LogoutModal />
    </div>
  );
};
