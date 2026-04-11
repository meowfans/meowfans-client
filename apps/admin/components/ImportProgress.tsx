'use client';

import { useImportStore } from '@/hooks/store/import.store';
import { Card } from '@workspace/ui/components/card';
import { ApplyShadCnChart } from '@workspace/ui/globals/ApplyShadCnChart';
import { ShadCnChartTypes } from '@workspace/ui/lib/enums';
import { Activity, BarChart3, Database, Files, Loader2, User } from 'lucide-react';

interface ImportProgressProps {
  showChart?: boolean;
}

export function ImportProgress({ showChart = false }: ImportProgressProps) {
  const importProcess = useImportStore((s) => s.importProcess);

  if (!importProcess) return null;

  const {
    method,
    username,
    processedBranches,
    totalBranches,
    processedPages,
    totalPages,
    processedUrls,
    totalUrls,
    processedProfiles,
    totalProfiles
  } = importProcess;

  const branchProgress = totalBranches > 0 ? (processedBranches / totalBranches) * 100 : 0;
  const pageProgress = totalPages > 0 ? (processedPages / totalPages) * 100 : 0;
  const urlProgress = totalUrls > 0 ? (processedUrls / totalUrls) * 100 : 0;
  const profileProgress = totalProfiles > 0 ? (processedProfiles / totalProfiles) * 100 : 0;

  const chartData = [
    { label: 'Profiles', count: processedProfiles, total: totalProfiles, percentage: Math.round(profileProgress) },
    { label: 'Branches', count: processedBranches, total: totalBranches, percentage: Math.round(branchProgress) },
    { label: 'Pages', count: processedPages, total: totalPages, percentage: Math.round(pageProgress) },
    { label: 'Objects', count: processedUrls, total: totalUrls, percentage: Math.round(urlProgress) }
  ];

  if (showChart) {
    return (
      <Card className="p-4 bg-primary/5 border-primary/20 shadow-lg animate-in fade-in slide-in-from-top-4 duration-500 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="flex flex-col gap-4 lg:col-span-1">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/20">
                <Activity className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-black italic uppercase tracking-tight flex items-center gap-2">
                  Import Active
                  <Loader2 className="h-3 w-3 animate-spin" />
                </h3>
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">{method}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 px-3 py-2 bg-background/50 rounded-lg border text-xs font-bold w-fit">
              <User className="h-3.5 w-3.5 text-primary" />
              <span className="italic uppercase">@{username}</span>
            </div>

            <div className="space-y-4 mt-2">
              {[
                { label: 'Profiles', val: `${processedProfiles}/${totalProfiles}`, icon: User, p: profileProgress },
                { label: 'Branches', val: `${processedBranches}/${totalBranches}`, icon: Database, p: branchProgress },
                { label: 'Pages', val: `${processedPages}/${totalPages}`, icon: Files, p: pageProgress },
                { label: 'Objects', val: `${processedUrls}/${totalUrls}`, icon: Activity, p: urlProgress }
              ].map((item) => (
                <div key={item.label} className="space-y-1.5">
                  <div className="flex justify-between items-center text-[10px] uppercase font-black italic tracking-tighter">
                    <span className="flex items-center gap-1.5 text-muted-foreground">
                      <item.icon className="h-3 w-3" /> {item.label}
                    </span>
                    <span>{item.val}</span>
                  </div>
                  <div className="h-1.5 w-full bg-primary/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary transition-all duration-1000 ease-out shadow-[0_0_8px_rgba(var(--primary),0.5)]"
                      style={{ width: `${item.p}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2 bg-background/40 rounded-xl border border-primary/10 p-4 relative overflow-hidden group">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-[10px] uppercase font-black italic tracking-widest text-muted-foreground flex items-center gap-2">
                <BarChart3 className="h-3 w-3" />
                Live Analytics
              </h4>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-primary/10 text-primary animate-pulse uppercase">
                Real-time
              </span>
            </div>

            <div className="h-[200px] w-full flex items-center justify-center">
              <ApplyShadCnChart
                chartType={ShadCnChartTypes.RADAR_CHART}
                dataTable={chartData}
                xDataKey="label"
                yDataKey="percentage"
                XDataLabel="Metric"
                yDataLabel="Progress %"
              />
            </div>

            <div className="absolute -bottom-6 -right-6 h-24 w-24 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors" />
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-4 bg-primary/5 border-primary/20 shadow-lg animate-in fade-in slide-in-from-top-4 duration-500">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              <Activity className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold flex items-center gap-2 italic uppercase">
                Import Process
                <Loader2 className="h-3 w-3 animate-spin text-primary" />
              </h3>
              <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">{method}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 bg-background/80 rounded-full border text-[11px] font-bold shadow-sm">
            <User className="h-3 w-3 text-primary" />
            <span className="italic uppercase">@{username}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: 'Profiles', current: processedProfiles, total: totalProfiles, icon: User, p: profileProgress },
            { label: 'Branches', current: processedBranches, total: totalBranches, icon: Database, p: branchProgress },
            { label: 'Pages', current: processedPages, total: totalPages, icon: Files, p: pageProgress },
            { label: 'Objects', current: processedUrls, total: totalUrls, icon: Activity, p: urlProgress }
          ].map((item) => (
            <div
              key={item.label}
              className="space-y-2 bg-background/40 p-3 rounded-xl border border-primary/5 hover:border-primary/20 transition-all"
            >
              <div className="flex justify-between items-center text-[10px] uppercase font-black italic tracking-tighter">
                <span className="flex items-center gap-1.5 text-muted-foreground">
                  <item.icon className="h-3 w-3" /> {item.label}
                </span>
                <span className="text-primary">
                  {item.current} / {item.total}
                </span>
              </div>
              <div className="h-2 w-full bg-primary/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-all duration-1000 ease-out shadow-[0_0_8px_rgba(var(--primary),0.5)]"
                  style={{ width: `${item.p}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
